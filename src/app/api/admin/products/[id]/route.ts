import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  let body: any = {};
  try {
    const { id } = await params;
    body = await req.json();
    const { name, collectionId, priceMode, isBestSeller, isGrandRoomLook, description, features, sizes, images } = body;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // First delete existing variants and images if we are providing new ones.
    // For simplicity, we just clear and recreate them.
    await prisma.productVariant.deleteMany({ where: { productId: id } });
    
    // Only delete existing images if new images are uploaded
    if (images && images.length > 0) {
       await prisma.productImage.deleteMany({ where: { productId: id } });
    }

    const updateData: any = {
      name,
      slug,
      collectionId,
      priceMode,
      isBestSeller,
      isGrandRoomLook,
      description,
      features: JSON.stringify(features),
      variants: {
        create: sizes.map((s: any) => ({
          size: s.size,
          price: s.price ? parseFloat(s.price) : null,
          stock: 10
        }))
      }
    };

    if (images && images.length > 0) {
      updateData.images = {
        create: images.map((url: string, idx: number) => ({
          url,
          isMain: idx === 0
        }))
      };
    }

    const product = await prisma.product.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product (falling back to mock):', error);
    
    // FALLBACK for localhost IPv6 issues
    const { id } = await params;
    
    // Save to JSON storage
    const { readJsonStore, upsertJsonItem } = await import('@/lib/jsonStore');
    const existingProducts = readJsonStore<any>('products.json') || [];
    const existingProduct = existingProducts.find((p: any) => p.id === id) || {};

    const finalImages = body.images && body.images.length > 0 
      ? body.images.map((url: string, idx: number) => ({ url, isMain: idx === 0 }))
      : existingProduct.images || [{ url: '/images/emerald-meadow.png', isMain: true }];

    const mockUpdatedProduct = {
      ...existingProduct,
      id,
      name: body.name || 'Updated Product',
      slug: (body.name || 'Updated Product').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: body.description,
      features: body.features || existingProduct.features,
      priceMode: body.priceMode,
      collectionId: body.collectionId,
      isBestSeller: body.isBestSeller,
      isGrandRoomLook: body.isGrandRoomLook,
      isVisible: true,
      images: finalImages,
      collection: { name: 'Mock Collection' }
    };

    // Update global memory if it exists
    const globalAny: any = global;
    if (globalAny.__mockNewProducts) {
      const idx = globalAny.__mockNewProducts.findIndex((p: any) => p.id === id);
      if (idx !== -1) {
        globalAny.__mockNewProducts[idx] = mockUpdatedProduct;
      }
    }
    
    // Save to JSON storage
    upsertJsonItem('products.json', mockUpdatedProduct);
    
    return NextResponse.json(mockUpdatedProduct);
  }
}
