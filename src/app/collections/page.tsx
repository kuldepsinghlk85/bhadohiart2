import React from 'react';
import prisma from '@/lib/prisma';
import { ProductGrid } from '@/components/ecommerce/ProductGrid';
import { FilterSidebar } from './FilterSidebar';
import { CollectionSlider } from '@/components/ecommerce/CollectionSlider';
import { mockCollections, mockProducts } from '@/lib/mockData';

export default async function CollectionsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const categories = params.category ? (Array.isArray(params.category) ? params.category : [params.category]) : [];
  
  let collections = mockCollections;
  let products: any[] = mockProducts;
  let sliderImages: any[] = [];

  try {
    const dbCollections = await prisma.collection.findMany({ orderBy: { name: 'asc' } });
    if (dbCollections.length > 0) collections = dbCollections;

    if (categories.length === 1) {
      const activeCat = dbCollections.find(c => c.slug === categories[0]);
      if (activeCat && activeCat.sliderImages) sliderImages = activeCat.sliderImages as any[];
    }

    const dbProducts = await prisma.product.findMany({
      where: categories.length > 0 ? {
        collection: { slug: { in: categories } },
        isVisible: true
      } : { isVisible: true },
      include: {
        images: true,
        collection: true
      }
    });

    if (dbProducts.length > 0) {
      // Map dbProducts to match the mock format
      products = dbProducts.map(p => ({
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
    const { readJsonStore } = await import('@/lib/jsonStore');
    const jsonCollections = readJsonStore<any>('collections.json');
    if (jsonCollections.length > 0) {
      // De-duplicate by slug or name
      const unique = new Map();
      jsonCollections.forEach((c: any) => unique.set((c.slug || c.name || c.id).toLowerCase().trim(), c));
      collections = Array.from(unique.values());
    }

    if (categories.length === 1) {
      const activeCat = collections.find(c => c.slug === categories[0]);
      if (activeCat && activeCat.sliderImages) sliderImages = activeCat.sliderImages;
    }

    const jsonProducts = readJsonStore<any>('products.json');
    products = jsonProducts.map((p: any) => {
      const c = jsonCollections.find((c: any) => c.id === p.collectionId);
      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.basePrice || "Request Quote",
        collection: { slug: c?.slug || p.collectionId, name: c?.name || p.collectionId },
        image: p.images?.[0]?.url || '/images/emerald-meadow.png',
        images: p.images,
        isVisible: p.isVisible
      };
    });

    products = products.filter((p: any) => p.isVisible !== false);
    if (categories.length > 0) {
      products = products.filter((p: any) => categories.includes(p.collection?.slug));
    }
  }

  // Include in-memory mock products (for localhost when DB is unreachable)
  const globalAny: any = global;
  if (globalAny.__mockNewProducts && globalAny.__mockNewProducts.length > 0) {
    const { readJsonStore } = await import('@/lib/jsonStore');
    const jsonCollections = readJsonStore<any>('collections.json');
    let newMocks = globalAny.__mockNewProducts
      .filter((p: any) => p.isVisible !== false)
      .map((p: any) => {
        const c = jsonCollections.find((c: any) => c.id === p.collectionId);
        return {
          id: p.id,
          name: p.name,
          slug: p.slug,
          description: p.description,
          price: p.basePrice || "Request Quote",
          collection: p.collection || { name: c?.name || p.collectionId, slug: c?.slug || p.collectionId },
          image: p.images?.[0]?.url || '/images/emerald-meadow.png',
          images: p.images
        };
      });
    
    if (categories.length > 0) {
      newMocks = newMocks.filter((p: any) => categories.includes(p.collection?.slug));
    }
    products = [...newMocks, ...products];
  }

  return (
    <div className="bg-[#FAF7F0] min-h-screen pt-0 pb-14">
      
      {/* Page Banner with Oriental Carpet Texture & Royal Color Blend */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#240507] via-[#38080C] to-[#1C0305] text-white py-10 md:py-12 mb-8 border-b-2 border-[#DE8B22]">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity pointer-events-none"
          style={{ backgroundImage: `url('/images/footer-runner-bg.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C0305]/90 via-[#38080C]/80 to-[#1C0305]/90 pointer-events-none" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#DE8B22] text-xs font-semibold uppercase tracking-wider mb-2 border border-white/15 shadow-xs">
            Handcrafted Masterpieces
          </span>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-2 font-normal text-[#FAF7F0]">
            All Collections &amp; Portfolios
          </h1>
          <p className="font-sans text-stone-300 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed">
            Explore our extensive range of premium handmade, handloom, and custom-tufted carpets direct from the weavers of Bhadohi.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 items-start">
        
        {/* Sidebar / Filters */}
        <FilterSidebar collections={collections} />

        {/* Product Grid */}
        <div className="flex-1 min-w-0 w-full">
          {sliderImages.length > 0 && (
            <div className="mb-8">
              <CollectionSlider images={sliderImages} />
            </div>
          )}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 bg-white p-3.5 px-5 rounded-2xl border border-stone-200/80 shadow-2xs">
            <p className="text-xs font-semibold text-stone-600">
              Showing <span className="text-[#990E14] font-bold">{products.length}</span> luxury carpets
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-400 font-medium hidden sm:inline">Sort:</span>
              <select className="border border-stone-200 bg-[#FAF7F0] px-3 py-1.5 rounded-xl text-xs text-stone-800 font-medium outline-none focus:border-[#990E14] cursor-pointer">
                <option>Featured Designs</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
          </div>
          
          <ProductGrid products={products} />
        </div>

      </div>
    </div>
  );
}
