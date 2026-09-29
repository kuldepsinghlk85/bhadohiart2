import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { Edit, Eye, PlusCircle } from 'lucide-react';
import { ProductListClient } from './ProductListClient';

async function deleteProduct(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  if (!id) return;
  
  try {
    await prisma.productImage.deleteMany({ where: { productId: id } });
    await prisma.product.delete({ where: { id } });
  } catch (e) {
    const { deleteJsonItem } = await import('@/lib/jsonStore');
    deleteJsonItem('products.json', id);
    
    // Update global memory mock
    const globalAny: any = global;
    if (globalAny.__mockNewProducts) {
      globalAny.__mockNewProducts = globalAny.__mockNewProducts.filter((p: any) => p.id !== id);
    }
  }
  revalidatePath('/admin/products');
  revalidatePath('/collections');
}

async function toggleProductVisibility(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const currentStatus = formData.get("currentStatus") === "true";
  if (!id) return;
  
  try {
    await prisma.product.update({
      where: { id },
      data: { isVisible: !currentStatus }
    });
  } catch (e) {
    // Fallback for mock data (global mutation)
    const globalAny: any = global;
    if (globalAny.__mockNewProducts) {
      const idx = globalAny.__mockNewProducts.findIndex((p: any) => p.id === id);
      if (idx !== -1) {
        globalAny.__mockNewProducts[idx].isVisible = !currentStatus;
      }
    }
  }
  revalidatePath('/admin/products');
  revalidatePath('/collections');
}

export default async function AdminProductsPage() {
  let products: any[] = []; 
  try { 
    products = await prisma.product.findMany({
      include: {
        collection: true,
        images: true
      },
      orderBy: { createdAt: 'desc' }
    });
  } catch (e) {
    const { readJsonStore } = await import('@/lib/jsonStore');
    const jsonProducts = readJsonStore<any>('products.json');
    const jsonCollections = readJsonStore<any>('collections.json');
    const { mockProducts } = await import('@/lib/mockData');
    
    products = [...jsonProducts, ...mockProducts].map(p => {
      let colName = 'N/A';
      if (p.collection?.name) colName = p.collection.name;
      else if (p.collectionId) {
        const found = jsonCollections.find((c: any) => c.id === p.collectionId);
        if (found) colName = found.name;
      }
      
      return {
        ...p,
        collection: { name: colName },
        images: p.images || [{ url: p.image, isMain: true }],
        isVisible: p.isVisible !== undefined ? p.isVisible : true
      };
    });
  }

  const globalAny: any = global;
  if (globalAny.__mockNewProducts && globalAny.__mockNewProducts.length > 0) {
    const { readJsonStore } = await import('@/lib/jsonStore');
    const jsonCollections = readJsonStore<any>('collections.json');
    const mappedMocks = globalAny.__mockNewProducts.map((p: any) => {
      let colName = 'N/A';
      if (p.collectionId) {
        const found = jsonCollections.find((c: any) => c.id === p.collectionId);
        if (found) colName = found.name;
      }
      return {
        ...p,
        collection: { name: colName }
      };
    });
    products = [...mappedMocks, ...products];
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-stone-200">
        <div>
          <h1 className="text-xl md:text-2xl font-serif font-bold text-stone-900 flex items-center gap-2.5">
            Product Manager 
            <span className="text-xs bg-gradient-to-r from-amber-50 to-rose-50 text-[#990E14] border border-[#DE8B22]/30 px-3 py-1 rounded-full font-bold shadow-2xs">
              {products.length} Products
            </span>
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Browse, search, edit and manage handcrafted carpets in your catalogue.
          </p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="bg-gradient-to-r from-[#990E14] via-[#AB1017] to-[#7B090E] hover:from-[#7B090E] hover:to-[#990E14] text-white px-4 py-2.5 text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm hover:shadow-md transition-all tracking-wider uppercase"
        >
          <PlusCircle size={16} className="text-[#DE8B22]" />
          Add New Product
        </Link>
      </div>

      <ProductListClient products={products} />
    </div>
  )
}
