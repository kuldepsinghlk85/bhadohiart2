import React from 'react';
import { readJsonStore } from '@/lib/jsonStore';
import MediaClient from './MediaClient';

export default async function MediaLibraryPage() {
  const mediaFiles = readJsonStore<any>('media.json') || [];
  const products = readJsonStore<any>('products.json') || [];
  
  // Aggregate all unique images
  const allMediaMap = new Map();
  
  // 1. Add uploaded media
  mediaFiles.forEach((file: any) => {
    allMediaMap.set(file.url, file);
  });

  // 2. Add product images
  products.forEach((p: any) => {
    if (p.image && !allMediaMap.has(p.image)) {
      allMediaMap.set(p.image, {
        id: `prod_${p.id}_main`,
        filename: p.image.split('/').pop(),
        url: p.image,
        type: 'image/jpeg',
        createdAt: p.createdAt || new Date().toISOString()
      });
    }
    if (p.images && Array.isArray(p.images)) {
      p.images.forEach((img: any, idx: number) => {
        const url = typeof img === 'string' ? img : img.url;
        if (url && !allMediaMap.has(url)) {
          allMediaMap.set(url, {
            id: `prod_${p.id}_${idx}`,
            filename: url.split('/').pop(),
            url: url,
            type: 'image/jpeg',
            createdAt: p.createdAt || new Date().toISOString()
          });
        }
      });
    }
  });

  // Convert map to array and sort by date
  const aggregatedMedia = Array.from(allMediaMap.values()).sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          Media Library <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">{aggregatedMedia.length} Files</span>
        </h1>
        <p className="text-sm text-gray-500">All uploaded images, product photos, and PDFs.</p>
      </div>

      <MediaClient initialMedia={aggregatedMedia} />
    </div>
  );
}
