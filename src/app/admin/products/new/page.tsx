import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import NewProductClient from './NewProductClient';

export default async function NewProductPage() {
  let collections: any[] = [];
  try {
    collections = await prisma.collection.findMany();
  } catch (e) {
    console.error("Failed to load collections for new product page", e);
    const { mockCollections } = await import('@/lib/mockData');
    collections = mockCollections;
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/products" className="text-[var(--color-brand-burgundy)] font-bold">
          ← Back
        </Link>
        <h1 className="text-3xl font-serif text-[var(--color-brand-dark)]">Add New Product</h1>
      </div>

      <div className="bg-white p-6 border border-[var(--color-brand-border)] max-w-2xl">
        <NewProductClient collections={collections} />
      </div>
    </div>
  )
}
