import React from 'react';
import { TestimonialsClient } from './TestimonialsClient';
import prisma from '@/lib/prisma';
import { readJsonStore, writeJsonStore } from '@/lib/jsonStore';

export const metadata = {
  title: 'Client Testimonials | Admin Panel',
  description: 'Manage testimonials, ratings, and client photos on the website.'
};

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

export default async function AdminTestimonialsPage() {
  let testimonials: any[] = [];

  try {
    testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (e) {
    console.warn("Prisma error in admin testimonials page", e);
  }

  if (!testimonials || testimonials.length === 0) {
    testimonials = readJsonStore<any>('testimonials.json');
    if (testimonials.length === 0) {
      writeJsonStore('testimonials.json', DEFAULT_TESTIMONIALS);
      testimonials = DEFAULT_TESTIMONIALS;
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <TestimonialsClient initialTestimonials={testimonials} />
    </div>
  );
}
