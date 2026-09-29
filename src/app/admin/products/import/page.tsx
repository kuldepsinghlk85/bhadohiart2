import React from 'react';
import PdfImporter from './PdfImporter';
import prisma from '@/lib/prisma';
import { readJsonStore } from '@/lib/jsonStore';

export default async function PdfImportPage() {
  let collections: any[] = [];
  try {
    collections = await prisma.collection.findMany({ select: { id: true, name: true, slug: true }});
  } catch (e) {
    const jsonCols = readJsonStore<any>('collections.json');
    const { mockCollections } = await import('@/lib/mockData');
    const merged = [...jsonCols, ...mockCollections];
    
    // Deduplicate
    const unique = new Map();
    merged.forEach(c => unique.set(c.id, c));
    
    collections = Array.from(unique.values()).map(c => ({ id: c.id, name: c.name, slug: c.slug }));
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">PDF Catalog Importer</h1>
        <p className="text-sm text-gray-500 mt-1">Upload a PDF catalog. The system will automatically extract each page as a product image and attempt to read its description.</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <PdfImporter collections={collections} />
      </div>
    </div>
  );
}
