import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { readJsonStore, writeJsonStore } from '@/lib/jsonStore';

const DEFAULT_TESTIMONIALS = [
  {
    id: 'test-1',
    clientName: 'Vikram Singh',
    location: 'Homeowner, Bangalore',
    clientType: 'Residential Client',
    rating: 5,
    quote: 'Bhadohi Arts Weave delivered exactly what they promised. The plush texture and deep colors of their Infinity collection completely transformed my living room.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces',
    isVisible: true
  },
  {
    id: 'test-2',
    clientName: 'Rajiv Oberoi',
    location: 'Luxury Hotel Group, New Delhi',
    clientType: 'Hospitality Partner',
    rating: 5,
    quote: 'The wall-to-wall carpet installation at our luxury hotel was flawless. The quality of Bhadohi Arts Weave is unmatched, bringing a touch of heritage and elegance to our spaces.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=faces',
    isVisible: true
  },
  {
    id: 'test-3',
    clientName: 'Anita Desai',
    location: 'Interior Designer, Mumbai',
    clientType: 'Design Studio',
    rating: 5,
    quote: 'We ordered custom hand-knotted rugs for our new corporate office. The craftsmanship is extraordinary and the team was incredibly professional throughout the process.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=faces',
    isVisible: true
  },
  {
    id: 'test-4',
    clientName: 'Elena Rossi',
    location: 'Principal Architect, London',
    clientType: 'International Architect',
    rating: 5,
    quote: 'As an architect, I appreciate attention to detail. The intricate traditional motifs on their heritage carpets are simply breathtaking. Highly recommended.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=faces',
    isVisible: true
  }
];

export async function GET() {
  try {
    let testimonials: any[] = [];
    try {
      testimonials = await prisma.testimonial.findMany({
        where: { isVisible: true },
        orderBy: { createdAt: 'desc' }
      });
    } catch (e) {
      console.warn("Prisma error in public testimonials API", e);
    }

    if (!testimonials || testimonials.length === 0) {
      const items = readJsonStore<any>('testimonials.json');
      if (items.length > 0) {
        testimonials = items.filter((t: any) => t.isVisible !== false);
      } else {
        writeJsonStore('testimonials.json', DEFAULT_TESTIMONIALS);
        testimonials = DEFAULT_TESTIMONIALS;
      }
    }

    return NextResponse.json({ success: true, testimonials });
  } catch (error) {
    console.error('Public testimonials error:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}
