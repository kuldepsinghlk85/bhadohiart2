import { NextResponse } from 'next/server';
import { readJsonStore, upsertJsonItem, deleteJsonItem } from '@/lib/jsonStore';

export async function GET(req: Request) {
  try {
    const quotes = readJsonStore<any>('quotes.json');
    const products = readJsonStore<any>('products.json');
    
    // Reverse sort quotes by date
    quotes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ quotes, products });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch quotes" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, productIds } = body;
    
    if (!customerName || !productIds || productIds.length === 0) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const newQuote = {
      id: `QTE-${Date.now()}`,
      customerName,
      productIds,
      createdAt: new Date().toISOString(),
    };

    upsertJsonItem('quotes.json', newQuote);

    return NextResponse.json({ success: true, quote: newQuote });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create quote" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    deleteJsonItem('quotes.json', id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete quote" }, { status: 500 });
  }
}
