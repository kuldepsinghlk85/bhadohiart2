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
      
      const { upsertJsonItem } = await import('@/lib/jsonStore');
      upsertJsonItem('orders.json', newOrder);
    }

    return NextResponse.json({ success: true, orderId: orderId }, { status: 201 });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
