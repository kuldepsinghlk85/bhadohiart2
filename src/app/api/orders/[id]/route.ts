import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  // Clean the ID just in case it came directly through the URL with "ID:" prepended
  const id = resolvedParams.id.replace(/^ID:\s*/i, '').trim();

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: true
              }
            }
          }
        },
        user: true
      }
    });

    if (!order) {
      const globalAny: any = global;
      if (globalAny.__mockNewOrders) {
        const mockOrder = globalAny.__mockNewOrders.find((o: any) => o.id === id);
        if (mockOrder) {
          return NextResponse.json({ order: mockOrder });
        }
      }
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Don't expose sensitive user info to guest trackers
    const safeOrder = {
      id: order.id,
      status: order.status,
      total: order.total,
      createdAt: order.createdAt,
      items: order.items.map(item => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
        productName: item.product.name,
        productImage: item.product.images.find(img => img.isMain)?.url || item.product.images[0]?.url || '/images/emerald-meadow.png'
      }))
    };

    return NextResponse.json({ order: safeOrder });
  } catch (error) {
    console.error("Failed to fetch order:", error);
    
    // Check in-memory mock orders first
    const globalAny: any = global;
    if (globalAny.__mockNewOrders) {
      const mockOrder = globalAny.__mockNewOrders.find((o: any) => o.id === id);
      if (mockOrder) {
        return NextResponse.json({ order: mockOrder });
      }
    }
    
    // FALLBACK to orders.json when DB is unreachable
    try {
      const { readJsonStore } = await import('@/lib/jsonStore');
      const orders = readJsonStore<any>('orders.json');
      const jsonOrder = orders.find((o: any) => o.id === id);
      
      if (jsonOrder) {
        return NextResponse.json({
          order: {
            id: jsonOrder.id,
            status: jsonOrder.status,
            total: jsonOrder.total,
            createdAt: jsonOrder.createdAt,
            items: jsonOrder.items || []
          }
        });
      }
    } catch (err) {
      console.error("Failed to read from JSON store:", err);
    }

    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}
