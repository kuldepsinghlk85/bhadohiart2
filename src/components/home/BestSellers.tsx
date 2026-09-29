import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';

export async function BestSellers() {
  let products: any[] = [];
  
  try {
    const dbProducts = await prisma.product.findMany({
      where: { isBestSeller: true, isVisible: true },
      include: { collection: true, images: true },
      take: 5
    });
    
    products = dbProducts.map(p => ({
      id: p.id,
      name: p.name,
      type: p.collection?.name || 'Carpet',
      price: p.basePrice || "Request Quote",
      image: p.images?.find((img: any) => img.isMain)?.url || p.images?.[0]?.url || '/images/emerald-meadow.png',
      rating: p.rating || 5,
      slug: p.slug
    }));
  } catch (e) {
    const { readJsonStore } = await import('@/lib/jsonStore');
    const jsonProducts = readJsonStore<any>('products.json');
    const { mockProducts } = await import('@/lib/mockData');
    
    products = [...jsonProducts, ...mockProducts]
      .filter((p: any) => p.isVisible !== false)
      .slice(0, 5).map(p => ({
      id: p.id,
      name: p.name,
      type: p.collection?.name || p.collectionId || 'Carpet',
      price: p.price || p.basePrice || "Request Quote",
      image: p.image || p.images?.[0]?.url || '/images/emerald-meadow.png',
      rating: 5,
      slug: p.slug
    }));
  }
  
  // Append new mock products created in this session that are best sellers
  const globalAny: any = global;
  if (globalAny.__mockNewProducts) {
    const mockBestSellers = globalAny.__mockNewProducts
      .filter((p: any) => p.isBestSeller && p.isVisible !== false)
      .map((p: any) => ({
        id: p.id,
        name: p.name,
        type: p.collection?.name || 'Carpet',
        price: p.basePrice || "Request Quote",
        image: p.images?.[0]?.url || '/images/emerald-meadow.png',
        rating: 5,
        slug: p.slug
      }));
    products = [...mockBestSellers, ...products].slice(0, 5);
  }
  
  // If still empty after DB failure and no mocks, use fallback hardcoded
  if (products.length === 0) {
    products = [
      {
        id: "mock1",
        name: "Emerald Meadow",
        type: "Hand-Knotted",
        price: "₹45,000",
        image: "/images/emerald-meadow.png",
        rating: 5,
        slug: "emerald-meadow"
      },
      {
        id: "mock2",
        name: "Arctic Pearl",
        type: "Hand-Tufted",
        price: "₹25,000",
        image: "/images/arctic-pearl.png",
        rating: 4,
        slug: "arctic-pearl"
      }
    ];
  }

  return (
    <section className="py-12 md:py-16 bg-white border-b border-[var(--color-brand-border)]">
      <div className="container mx-auto px-4 relative">
        
        {/* Header with user preferred theme */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[var(--color-brand-burgundy)]/10 text-[var(--color-brand-burgundy)] text-xs font-semibold uppercase tracking-wider mb-2 border border-[var(--color-brand-burgundy)]/15 shadow-2xs">
            <Award className="w-3.5 h-3.5" />
            Iconic Masterpieces
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-brand-dark)] font-normal mb-2">
            Our Most <span className="text-[var(--color-brand-burgundy)] italic">Loved</span> Carpets
          </h2>
          <p className="font-sans text-xs md:text-sm text-[var(--color-brand-muted)] max-w-xl mx-auto leading-relaxed">
            Handcrafted bestsellers selected by discerning homeowners, architects, and luxury interior designers.
          </p>
        </div>

        {/* Carousel / Cards Grid */}
        <div className="relative px-2 lg:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {products.map((product) => {
              const isQuote = !product.price || product.price === 'Request Quote' || typeof product.price !== 'number';

              return (
                <div key={product.id} className="group rounded-2xl border border-stone-200/90 flex flex-col bg-white overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  
                  {/* Product Image */}
                  <div className="w-full aspect-[4/3] overflow-hidden relative bg-[#FAF7F0]">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[9px] font-bold text-[#990E14] uppercase tracking-wider shadow-2xs border border-stone-200/60">
                        Top Rated
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-semibold text-[#DE8B22] uppercase tracking-wider truncate max-w-[120px]">
                        {product.type}
                      </span>
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-[10px] font-bold text-stone-700">5.0</span>
                      </div>
                    </div>

                    <h3 className="font-serif font-bold text-sm text-[var(--color-brand-dark)] mb-2 line-clamp-1 group-hover:text-[#990E14] transition-colors">
                      {product.name}
                    </h3>

                    <div className="mt-auto pt-2.5 border-t border-stone-100 flex items-center justify-between mb-3">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-stone-400 tracking-wider block">Price</span>
                        <span className="text-xs font-bold text-stone-900">
                          {isQuote ? (
                            <span className="text-[#990E14] font-semibold">Request Quote</span>
                          ) : (
                            `₹${Number(product.price).toLocaleString()}`
                          )}
                        </span>
                      </div>
                      <span className="px-1.5 py-0.5 rounded bg-amber-50 text-[#DE8B22] border border-amber-200/80 text-[9px] font-bold">
                        Bespoke
                      </span>
                    </div>
                    
                    <Link href={`/collections/products/${product.slug}`} className="block">
                      <div className="w-full h-8 rounded-xl bg-stone-100 group-hover:bg-gradient-to-r group-hover:from-[#990E14] group-hover:to-[#7B090E] text-stone-700 group-hover:text-white font-semibold text-[11px] tracking-wider uppercase flex items-center justify-center gap-1 transition-all duration-300 shadow-2xs">
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* View All CTA */}
        <div className="text-center mt-10">
          <Link href="/collections">
            <Button variant="default" size="default" className="rounded-xl px-8 shadow-xs hover:shadow-md">
              VIEW ALL COLLECTIONS
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
