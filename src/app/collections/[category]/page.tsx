import React from 'react';
import { ProductGrid } from '@/components/ecommerce/ProductGrid';
import { CollectionSlider } from '@/components/ecommerce/CollectionSlider';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { readJsonStore } from '@/lib/jsonStore';

export default async function CollectionPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  
  // Format the category for display
  const title = category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' Collection';
  
  let displayProducts: any[] = [];
  let sliderImages: string[] = [];

  try {
    const dbCollection = await prisma.collection.findUnique({
      where: { slug: category }
    });
    if (dbCollection && dbCollection.sliderImages) {
      sliderImages = dbCollection.sliderImages;
    }

    const dbProducts = await prisma.product.findMany({
      where: {
        collection: { slug: category },
        isVisible: true
      },
      include: {
        images: true,
        collection: true
      }
    });

    if (dbProducts.length > 0) {
      displayProducts = dbProducts.map(p => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.basePrice || "Request Quote",
        collection: p.collection,
        image: p.images?.find((img: any) => img.isMain)?.url || p.images?.[0]?.url || '/images/emerald-meadow.png',
        images: p.images
      }));
    }
  } catch (e) {
    // Check JSON fallback
    const collections = readJsonStore<any>('collections.json');
    const match = collections.find(c => c.slug === category);
    if (match && match.sliderImages) {
      sliderImages = match.sliderImages;
    }
  }

  if (displayProducts.length === 0) {
    const { readJsonStore } = await import('@/lib/jsonStore');
    const jsonProducts = readJsonStore<any>('products.json');
    const jsonCollections = readJsonStore<any>('collections.json');
    
    displayProducts = jsonProducts.filter(p => {
      let matchSlug = p.collectionId === category || p.slug.includes(category);
      if (!matchSlug && p.collectionId) {
        const c = jsonCollections.find((c: any) => c.id === p.collectionId);
        if (c && c.slug === category) matchSlug = true;
      }
      return matchSlug && p.isVisible !== false;
    }).map(p => {
      const c = jsonCollections.find((c: any) => c.id === p.collectionId);
      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.basePrice || "Request Quote",
        collection: { slug: c?.slug || category, name: c?.name || category },
        image: p.images?.[0]?.url || '/images/emerald-meadow.png',
        images: p.images
      };
    });
  }

  // Include in-memory mock products (for localhost when DB is unreachable)
  const globalAny: any = global;
  if (globalAny.__mockNewProducts && globalAny.__mockNewProducts.length > 0) {
    const { readJsonStore } = await import('@/lib/jsonStore');
    const jsonCollections = readJsonStore<any>('collections.json');
    const newMocks = globalAny.__mockNewProducts
      .filter((p: any) => {
        let matchSlug = p.collection?.slug === category || p.collectionId === category || p.slug.includes(category);
        if (!matchSlug && p.collectionId) {
          const c = jsonCollections.find((c: any) => c.id === p.collectionId);
          if (c && c.slug === category) matchSlug = true;
        }
        return matchSlug && p.isVisible !== false;
      })
      .map((p: any) => {
        const c = jsonCollections.find((c: any) => c.id === p.collectionId);
        return {
          id: p.id,
          name: p.name,
          slug: p.slug,
          description: p.description,
          price: p.basePrice || "Request Quote",
          collection: p.collection || { name: c?.name || 'Mock Collection', slug: c?.slug || category },
          image: p.images?.[0]?.url || '/images/emerald-meadow.png',
          images: p.images
        };
      });
    
    displayProducts = [...newMocks, ...displayProducts];
  }

  // Fetch all collections for the dynamic sidebar
  let allCollections: any[] = [];
  try {
    allCollections = await prisma.collection.findMany({ orderBy: { name: 'asc' } });
  } catch(e) {
    allCollections = readJsonStore<any>('collections.json');
    if (allCollections.length === 0) {
      const { mockCollections } = await import('@/lib/mockData');
      allCollections = mockCollections;
    }
  }

  return (
    <div className="bg-[#FAF7F0] min-h-screen pt-0 pb-12">
      <div className="bg-[var(--color-brand-burgundy)] text-white py-10 md:py-12 mb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-3xl md:text-4xl mb-3">{title}</h1>
          <p className="font-sans text-white/80 text-sm max-w-2xl mx-auto">
            Explore our curated {title.toLowerCase()} crafted to perfection for every space.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* Sidebar / Filters */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white p-6 border border-[var(--color-brand-border)] sticky top-24">
            <div className="mb-4">
               <Link href="/collections" className="text-sm font-bold text-[var(--color-brand-burgundy)] hover:underline flex items-center gap-2">
                 ← Back to All Collections
               </Link>
            </div>
            <h3 className="font-sans font-bold text-[var(--color-brand-dark)] uppercase tracking-widest text-sm mb-6 pb-2 border-b border-[var(--color-brand-border)]">
              Filters
            </h3>
            
            <div className="mb-6">
              <h4 className="font-bold text-xs text-[var(--color-brand-muted)] uppercase mb-3">Categories</h4>
              <ul className="space-y-2 text-sm text-[var(--color-brand-dark)]">
                {allCollections.map(c => (
                  <li key={c.id || c.slug} className="flex items-center gap-2">
                    <Link href={`/collections/${c.slug}`} className={`hover:text-orange-600 ${category === c.slug ? 'font-bold text-orange-600' : ''}`}>
                      <span className="w-3 h-3 inline-block rounded-full border border-gray-400 mr-1" style={{ background: category === c.slug ? 'var(--color-brand-burgundy)' : 'transparent' }}></span>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Product Grid & Slider */}
        <div className="flex-1">
          {sliderImages.length > 0 && (
            <CollectionSlider images={sliderImages} />
          )}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-[var(--color-brand-muted)]">Showing {displayProducts.length} products</p>
            <select className="border border-[var(--color-brand-border)] bg-white px-3 py-1.5 text-sm outline-none focus:border-[var(--color-brand-burgundy)]">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>
          
          <ProductGrid products={displayProducts} />
        </div>
      </div>
    </div>
  );
}
