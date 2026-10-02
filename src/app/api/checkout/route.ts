import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    // const session = await auth();
    const body = await req.json();
    const { items, contactInfo, shippingAddress } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    if (!contactInfo || !shippingAddress) {
      return NextResponse.json({ error: "Missing checkout details" }, { status: 400 });
    }

    let orderId = `ORD-${Math.floor(Math.random() * 1000000)}`;

    try {
      // 1. Find or create user
      let user = await prisma.user.findUnique({
        where: { email: contactInfo.email }
      });
      
      if (!user) {
        user = await prisma.user.create({
          data: {
            email: contactInfo.email,
            name: `${contactInfo.firstName} ${contactInfo.lastName}`,
            role: 'USER',
            password: 'guest_password' // placeholder
          }
        });
      }

      // 2. Create the Order
      const totalAmount = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
      
      const order = await prisma.order.create({
        data: {
          userId: user.id,
          status: 'PENDING',
          total: totalAmount,
          notes: JSON.stringify(shippingAddress),
          items: {
            create: items.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
              size: item.size
            }))
          }
        }
      });
      
      orderId = order.id;
    } catch (dbError) {
      console.error("Prisma error during checkout, falling back to mock:", dbError);
      
      const totalAmount = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
      
      const newOrder = {
        id: orderId,
        userId: 'guest-user',
        status: 'PENDING',
        total: totalAmount,
        createdAt: new Date().toISOString(),
        notes: JSON.stringify(shippingAddress),
        user: { name: `${contactInfo.firstName} ${contactInfo.lastName}`, email: contactInfo.email, phone: contactInfo.phone },
        items: items.map((item: any, idx: number) => ({
          id: `item-${Date.now()}-${idx}`,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          size: item.size,
          productName: item.name || `Product ${item.productId}`,
          productImage: item.image || '/images/placeholder.png'
        }))
      };
      
      const { upsertJsonItem, readJsonStore, writeJsonStore } = await import('@/lib/jsonStore');
      upsertJsonItem('orders.json', newOrder);

      // Sync customer contact details to users.json for instant admin directory visibility
      try {
        const users = readJsonStore<any>('users.json');
        const userEmail = contactInfo.email?.toLowerCase();
        let targetUser = users.find((u: any) => u.email?.toLowerCase() === userEmail);
        const orderSummary = {
          id: orderId,
          date: new Date().toISOString(),
          total: totalAmount,
          status: 'PENDING',
          itemsCount: items.length
        };

        const newAddr = {
          id: `addr-${Date.now()}`,
          type: 'SHIPPING',
          addressLine: shippingAddress.addressLine || shippingAddress.street || '',
          city: shippingAddress.city || '',
          state: shippingAddress.state || '',
          pinCode: shippingAddress.pinCode || shippingAddress.pincode || '',
          country: shippingAddress.country || 'India'
        };

        if (targetUser) {
          if (!targetUser.phone && contactInfo.phone) targetUser.phone = contactInfo.phone;
          targetUser.orders = targetUser.orders || [];
          targetUser.orders.unshift(orderSummary);
          targetUser.ordersCount = targetUser.orders.length;
          targetUser.totalSpent = (targetUser.totalSpent || 0) + totalAmount;
          targetUser.addresses = targetUser.addresses || [];
          if (!targetUser.addresses.some((a: any) => a.pinCode === newAddr.pinCode && a.addressLine === newAddr.addressLine)) {
            targetUser.addresses.push(newAddr);
          }
        } else {
          users.unshift({
            id: `usr-${Date.now()}`,
            name: `${contactInfo.firstName} ${contactInfo.lastName}`.trim(),
            email: contactInfo.email,
            phone: contactInfo.phone || '',
            role: 'USER',
            provider: 'Checkout Guest',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            addresses: [newAddr],
            orders: [orderSummary],
            ordersCount: 1,
            totalSpent: totalAmount
          });
        }
        writeJsonStore('users.json', users);
      } catch (userSyncErr) {
        console.error("Failed to sync customer to users store:", userSyncErr);
      }
    }

    return NextResponse.json({ success: true, orderId: orderId }, { status: 201 });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
