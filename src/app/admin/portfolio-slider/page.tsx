import React from 'react';
import prisma from '@/lib/prisma';
import { PortfolioSliderClient } from './PortfolioSliderClient';

export default async function PortfolioSliderAdminPage() {
  // Fetch all collections
  let collections: any[] = [];
  let settings: any[] = [];

  try {
    collections = await prisma.collection.findMany({
      orderBy: { name: 'asc' }
    });

    settings = await prisma.siteSetting.findMany({
      where: {
        key: {
          startsWith: 'portfolio_slider_'
        }
      }
    });
  } catch (e) {
    console.error("Failed to load portfolio slider data, using json fallback");
    const { readJsonStore } = await import('@/lib/jsonStore');
    collections = readJsonStore<any>('collections.json');
    settings = readJsonStore<any>('settings.json') || [];
  }

  // Map settings to collections
  const collectionsWithImages = collections.map(collection => {
    const settingKey = `portfolio_slider_${collection.id}`;
    const setting = settings.find(s => s.key === settingKey);
    let images: string[] = [];
    
    if (setting) {
      // If admin has saved settings, use them EXACTLY as they are (even if empty)
      try {
        const parsedImages = JSON.parse(setting.value);
        if (Array.isArray(parsedImages)) {
          images = parsedImages;
        }
      } catch (e) {
        images = [];
      }
    } else {
      // Pre-fill initial data ONLY IF no setting exists yet, so admin sees default fallbacks
      if (collection.name.toLowerCase() === 'infinity') {
        images = [
          '/images/INFINITY/img_p14_1.png',
          '/images/INFINITY/img_p15_1.png',
          '/images/INFINITY/img_p17_1.png',
          '/images/INFINITY/img_p18_1.png',
        ];
      } else {
        images = [
          '/images/emerald-meadow.png',
          '/images/ocean-mist.png',
          '/images/royal-amethyst.png',
          '/images/velvet-plum.png',
        ];
      }
    }

    return {
      id: collection.id,
      name: collection.name,
      images: images
    };
  });

  return (
    <div>
      <h1 className="text-3xl font-serif text-[var(--color-brand-dark)] mb-2">Portfolio Slider Management</h1>
      <p className="text-[var(--color-brand-muted)] mb-8 font-sans">
        Upload and manage images for the portfolio slider on the /projects page.
      </p>

      <PortfolioSliderClient initialData={collectionsWithImages} />
    </div>
  );
}
