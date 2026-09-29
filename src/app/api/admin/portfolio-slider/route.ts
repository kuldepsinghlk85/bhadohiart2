import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const role = (session?.user as any)?.role;
    const isAdmin = role === 'ADMIN' || role === 'SUPERADMIN' || role === 'admin' || role === 'superadmin';
    
    if (!session || !isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { collectionId, images } = await req.json();

    if (!collectionId || !Array.isArray(images)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const key = `portfolio_slider_${collectionId}`;
    const value = JSON.stringify(images);

    let setting;
    try {
      setting = await prisma.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value }
      });
    } catch (e) {
      console.error("Prisma error, using json fallback", e);
      const { readJsonStore, writeJsonStore } = await import('@/lib/jsonStore');
      const settings = readJsonStore<any>('settings.json') || [];
      const index = settings.findIndex((s: any) => s.key === key);
      
      setting = { key, value, updatedAt: new Date().toISOString() };
      
      if (index !== -1) {
        settings[index] = setting;
      } else {
        settings.push(setting);
      }
      writeJsonStore('settings.json', settings);
    }

    return NextResponse.json({ success: true, setting });
  } catch (error) {
    console.error('Error saving portfolio slider settings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
