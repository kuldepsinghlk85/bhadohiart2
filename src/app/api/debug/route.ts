import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let prismaError = null;
    let productsCount = -1;
    const url = process.env.DATABASE_URL || '';
    
    // Attempt dynamic import to see if initialization crashes
    try {
      const { PrismaClient } = await import('@prisma/client');
      const prisma = new PrismaClient();
      productsCount = await prisma.product.count();
    } catch (e: any) {
      prismaError = {
        message: e.message,
        name: e.name,
        stack: e.stack
      };
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      node_env: process.env.NODE_ENV,
      database_url_set: !!process.env.DATABASE_URL,
      database_url_preview: url.substring(0, 30) + '...',
      pooler_configured: url.includes('pooler.supabase.com'),
      port_6543: url.includes('6543'),
      prisma_error: prismaError,
      products_count: productsCount
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
