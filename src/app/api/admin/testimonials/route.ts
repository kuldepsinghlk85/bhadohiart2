import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { readJsonStore, writeJsonStore, upsertJsonItem, deleteJsonItem } from '@/lib/jsonStore';

// Initial default testimonials to seed if empty
const DEFAULT_TESTIMONIALS = [
  {
    id: 'test-1',
    clientName: 'Vikram Singh',
    location: 'Homeowner, Bangalore',
    clientType: 'Residential Client',
    rating: 5,
    quote: 'Bhadohi Arts Weave delivered exactly what they promised. The plush texture and deep colors of their Infinity collection completely transformed my living room.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces',
    isVisible: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'test-2',
    clientName: 'Rajiv Oberoi',
    location: 'Luxury Hotel Group, New Delhi',
    clientType: 'Hospitality Partner',
    rating: 5,
    quote: 'The wall-to-wall carpet installation at our luxury hotel was flawless. The quality of Bhadohi Arts Weave is unmatched, bringing a touch of heritage and elegance to our spaces.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=faces',
    isVisible: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'test-3',
    clientName: 'Anita Desai',
    location: 'Interior Designer, Mumbai',
    clientType: 'Design Studio',
    rating: 5,
    quote: 'We ordered custom hand-knotted rugs for our new corporate office. The craftsmanship is extraordinary and the team was incredibly professional throughout the process.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=faces',
    isVisible: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'test-4',
    clientName: 'Elena Rossi',
    location: 'Principal Architect, London',
    clientType: 'International Architect',
    rating: 5,
    quote: 'As an architect, I appreciate attention to detail. The intricate traditional motifs on their heritage carpets are simply breathtaking. Highly recommended.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=faces',
    isVisible: true,
    createdAt: new Date().toISOString()
  }
];

export async function GET(req: NextRequest) {
  try {
    let testimonials: any[] = [];
    try {
      testimonials = await prisma.testimonial.findMany({
        orderBy: { createdAt: 'desc' }
      });
    } catch (e) {
      console.warn("Prisma error, using jsonStore fallback", e);
    }

    if (!testimonials || testimonials.length === 0) {
      testimonials = readJsonStore<any>('testimonials.json');
      if (testimonials.length === 0) {
        writeJsonStore('testimonials.json', DEFAULT_TESTIMONIALS);
        testimonials = DEFAULT_TESTIMONIALS;
      }
    }

    return NextResponse.json({ success: true, testimonials });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const role = (session?.user as any)?.role;
    const isAdmin = role === 'ADMIN' || role === 'SUPERADMIN' || role === 'admin' || role === 'superadmin';
    if (!session || !isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { clientName, location, clientType, rating, quote, image, isVisible } = body;

    if (!clientName || !quote) {
      return NextResponse.json({ error: 'Client Name and Quote are required.' }, { status: 400 });
    }

    const id = `test-${Date.now()}`;
    const newTestimonial = {
      id,
      clientName: clientName.trim(),
      location: (location || '').trim(),
      clientType: (clientType || '').trim(),
      rating: Number(rating) || 5,
      quote: quote.trim(),
      image: (image || '').trim(),
      isVisible: isVisible !== false,
      createdAt: new Date()
    };

    let created;
    try {
      created = await prisma.testimonial.create({
        data: newTestimonial
      });
    } catch (e) {
      console.warn("Prisma write error, saving to jsonStore", e);
      created = { ...newTestimonial, createdAt: new Date().toISOString() };
      upsertJsonItem('testimonials.json', created);
    }

    return NextResponse.json({ success: true, testimonial: created });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await auth();
    const role = (session?.user as any)?.role;
    const isAdmin = role === 'ADMIN' || role === 'SUPERADMIN' || role === 'admin' || role === 'superadmin';
    if (!session || !isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, clientName, location, clientType, rating, quote, image, isVisible } = body;

    if (!id) {
      return NextResponse.json({ error: 'Testimonial ID is required.' }, { status: 400 });
    }

    const updateData: any = {};
    if (clientName !== undefined) updateData.clientName = clientName;
    if (location !== undefined) updateData.location = location;
    if (clientType !== undefined) updateData.clientType = clientType;
    if (rating !== undefined) updateData.rating = Number(rating);
    if (quote !== undefined) updateData.quote = quote;
    if (image !== undefined) updateData.image = image;
    if (isVisible !== undefined) updateData.isVisible = isVisible;

    let updated;
    try {
      updated = await prisma.testimonial.update({
        where: { id },
        data: updateData
      });
    } catch (e) {
      console.warn("Prisma update error, saving to jsonStore", e);
      const items = readJsonStore<any>('testimonials.json');
      const idx = items.findIndex((it: any) => it.id === id);
      if (idx !== -1) {
        items[idx] = { ...items[idx], ...updateData, updatedAt: new Date().toISOString() };
        writeJsonStore('testimonials.json', items);
        updated = items[idx];
      }
    }

    return NextResponse.json({ success: true, testimonial: updated });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    const role = (session?.user as any)?.role;
    const isAdmin = role === 'ADMIN' || role === 'SUPERADMIN' || role === 'admin' || role === 'superadmin';
    if (!session || !isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Testimonial ID is required.' }, { status: 400 });
    }

    try {
      await prisma.testimonial.delete({
        where: { id }
      });
    } catch (e) {
      console.warn("Prisma delete error, removing from jsonStore", e);
      deleteJsonItem('testimonials.json', id);
    }

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
