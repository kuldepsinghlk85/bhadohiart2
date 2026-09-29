import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Collections() {
  const collections = [
    {
      name: 'HANDLOOM',
      slug: 'handloom',
      image: '/images/emerald-meadow.png',
    },
    {
      name: 'DESIGNER',
      slug: 'designer',
      image: '/images/royal-amethyst.png',
    },
    {
      name: 'PLUSH',
      slug: 'plush',
      image: '/images/ivory-cloud.png',
    },
    {
      name: 'TEXTURED',
      slug: 'textured',
      image: '/images/cinnamon-earth.png',
    },
    {
      name: 'MODERN',
      slug: 'modern',
      image: '/images/mocha-linea.png',
    },
    {
      name: 'CONTEMPORARY',
      slug: 'contemporary',
      image: '/images/velvet-plum.png',
    },
    {
      name: 'EXCLUSIVE',
      slug: 'exclusive',
      image: '/images/ocean-mist.png',
    }
  ];

  return (
    <section className="py-10 md:py-14 bg-[var(--color-background)]">
      <div className="container mx-auto px-4">
        {/* Section Header with user preferred theme */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[var(--color-brand-burgundy)]/10 text-[var(--color-brand-burgundy)] text-xs font-semibold uppercase tracking-wider mb-2 border border-[var(--color-brand-burgundy)]/15 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            Master Artisan Weaves
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-brand-dark)] font-normal mb-2">
            Explore Our <span className="text-[var(--color-brand-burgundy)] italic">Signature</span> Collections
          </h2>
          <p className="font-sans text-xs md:text-sm text-[var(--color-brand-muted)] max-w-xl mx-auto leading-relaxed">
            From timeless handloom textures to plush royal velvets, each carpet embodies centuries of Bhadohi weaving heritage.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {collections.map((collection) => (
            <Link 
              key={collection.name} 
              href="/collections"
              className="group block rounded-2xl border border-stone-200/90 bg-white hover:border-[#DE8B22]/50 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Image Container */}
              <div className="w-full aspect-[4/3] overflow-hidden relative bg-[#FAF7F0]">
                <img 
                  src={collection.image} 
                  alt={`${collection.name} Collection`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              {/* Content */}
              <div className="p-3.5 text-center">
                <h3 className="font-sans font-bold text-xs tracking-wider text-[var(--color-brand-dark)] mb-0.5">
                  {collection.name}
                </h3>
                <p className="text-[9px] tracking-widest text-[#DE8B22] font-semibold uppercase mb-2">
                  COLLECTION
                </p>
                <div className="flex items-center justify-center text-[11px] font-bold text-[var(--color-brand-dark)] group-hover:text-[var(--color-brand-burgundy)] transition-colors">
                  <span>EXPLORE</span> <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
