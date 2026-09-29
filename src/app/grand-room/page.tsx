import React from 'react';
import prisma from '@/lib/prisma';
import { GrandRoomSlider } from './GrandRoomSlider';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grand Room Look | Bhadohi Arts Weave',
  description: 'Experience our finest carpets showcased in grand room settings.',
};

const FALLBACK_SLIDES = [
  {
    id: 'f1',
    name: 'Infinity Collection',
    slug: 'infinity',
    url: '/collections',
    imageUrl: '/images/INFINITY/img_p14_1.png',
    collectionName: 'Infinity'
  },
  {
    id: 'f2',
    name: 'Infinity Collection',
    slug: 'infinity',
    url: '/collections',
    imageUrl: '/images/INFINITY/img_p15_1.png',
    collectionName: 'Infinity'
  },
  {
    id: 'f3',
    name: 'Infinity Collection',
    slug: 'infinity',
    url: '/collections',
    imageUrl: '/images/INFINITY/img_p17_1.png',
    collectionName: 'Infinity'
  },
  {
    id: 'f4',
    name: 'Infinity Collection',
    slug: 'infinity',
    url: '/collections',
    imageUrl: '/images/INFINITY/img_p18_1.png',
    collectionName: 'Infinity'
  },
  {
    id: 'f5',
    name: 'Infinity Collection',
    slug: 'infinity',
    url: '/collections',
    imageUrl: '/images/INFINITY/img_p4_1.png',
    collectionName: 'Infinity'
  },
  {
    id: 'f6',
    name: 'Infinity Collection',
    slug: 'infinity',
    url: '/collections',
    imageUrl: '/images/INFINITY/img_p5_1.png',
    collectionName: 'Infinity'
  },
  {
    id: 'f7',
    name: 'Infinity Collection',
    slug: 'infinity',
    url: '/collections',
    imageUrl: '/images/INFINITY/img_p6_1.png',
    collectionName: 'Infinity'
  },
  {
    id: 'f8',
    name: 'Infinity Collection',
    slug: 'infinity',
    url: '/collections',
    imageUrl: '/images/INFINITY/img_p7_1.png',
    collectionName: 'Infinity'
  }
];

export default async function GrandRoomPage() {
  let products: any[] = [];
  try {
    products = await prisma.product.findMany({
      where: { isGrandRoomLook: true },
      include: {
        images: true,
        collection: true
      },
      orderBy: { createdAt: 'desc' }
    });
  } catch (e) {}

  let slides = products.map(p => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    imageUrl: p.images.find(i => i.isMain)?.url || p.images[0]?.url || '/images/emerald-meadow.png',
    collectionName: p.collection.name
  }));

  if (slides.length === 0) {
    slides = FALLBACK_SLIDES;
  }

  return (
    <main className="w-full h-screen relative bg-black">
      <GrandRoomSlider slides={slides} />
    </main>
  );
}
