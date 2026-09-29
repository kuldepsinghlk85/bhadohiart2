"use server";

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function bulkDeleteProducts(ids: string[]) {
  if (!ids || ids.length === 0) return;
  
  try {
    await prisma.productImage.deleteMany({ where: { productId: { in: ids } } });
    await prisma.product.deleteMany({ where: { id: { in: ids } } });
  } catch (e) {
    const { readJsonStore, writeJsonStore } = await import('@/lib/jsonStore');
    let products = readJsonStore<any>('products.json') || [];
    products = products.filter((p: any) => !ids.includes(p.id));
    writeJsonStore('products.json', products);
    
    // Update global memory mock
    const globalAny: any = global;
    if (globalAny.__mockNewProducts) {
      globalAny.__mockNewProducts = globalAny.__mockNewProducts.filter((p: any) => !ids.includes(p.id));
    }
  }
  revalidatePath('/admin/products');
  revalidatePath('/collections');
}

export async function bulkArchiveProducts(ids: string[]) {
  if (!ids || ids.length === 0) return;
  
  try {
    await prisma.product.updateMany({
      where: { id: { in: ids } },
      data: { isVisible: false }
    });
  } catch (e) {
    const { readJsonStore, writeJsonStore } = await import('@/lib/jsonStore');
    let products = readJsonStore<any>('products.json') || [];
    products = products.map((p: any) => {
      if (ids.includes(p.id)) return { ...p, isVisible: false };
      return p;
    });
    writeJsonStore('products.json', products);

    // Update global memory mock
    const globalAny: any = global;
    if (globalAny.__mockNewProducts) {
      globalAny.__mockNewProducts = globalAny.__mockNewProducts.map((p: any) => {
        if (ids.includes(p.id)) return { ...p, isVisible: false };
        return p;
      });
    }
  }
  revalidatePath('/admin/products');
  revalidatePath('/collections');
}
