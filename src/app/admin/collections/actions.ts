"use server";

import prisma from '@/lib/prisma';
import { upsertJsonItem } from '@/lib/jsonStore';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createCollection(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;
  
  // Collect slider images
  const sliderImages: string[] = [];
  for (let i = 0; i < 5; i++) {
    const sImg = formData.get(`sliderImage${i}`) as string;
    if (sImg) sliderImages.push(sImg);
  }

  const data = {
    name,
    slug,
    description,
    image,
    sliderImages, // Requires schema update to work in DB
  };

  try {
    const dbCollection = await prisma.collection.create({
      data
    });
    upsertJsonItem('collections.json', { ...dbCollection, _count: { products: 0 } });
  } catch (e) {
    // Fallback to JSON if DB fails
    console.error("DB Create Failed, using JSON fallback", e);
    const id = `col_${Date.now()}`;
    upsertJsonItem('collections.json', { 
      id, 
      ...data, 
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      _count: { products: 0 }
    });
  }

  revalidatePath('/admin/collections');
  revalidatePath('/collections');
  redirect('/admin/collections');
}
