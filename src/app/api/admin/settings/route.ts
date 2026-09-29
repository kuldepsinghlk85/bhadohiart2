import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET(req: NextRequest) {
  try {
    const key = req.nextUrl.searchParams.get('key');
    if (!key) {
      return NextResponse.json({ error: 'Missing key parameter' }, { status: 400 });
    }

    let setting = null;
    try {
      setting = await prisma.siteSetting.findUnique({ where: { key } });
    } catch (e) {
      const { readJsonStore } = await import('@/lib/jsonStore');
      const settings = readJsonStore<any>('settings.json') || [];
      setting = settings.find((s: any) => s.key === key) || null;
    }

    return NextResponse.json({ success: true, setting });
  } catch (error) {
    console.error('Error fetching setting:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const role = (session?.user as any)?.role;
    const isAdmin = role === 'ADMIN' || role === 'SUPERADMIN' || role === 'admin' || role === 'superadmin';
    
    if (!session || !isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { key, value } = await req.json();

    if (!key || value === undefined) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

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
    console.error('Error saving settings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
