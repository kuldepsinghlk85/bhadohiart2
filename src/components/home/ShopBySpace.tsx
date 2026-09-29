import React from 'react';
import Link from 'next/link';
import { Sofa, BedDouble, Building2, Briefcase, Activity, Wine, Home } from 'lucide-react';

export function ShopBySpace() {
  const spaces = [
    { name: 'Living Room', icon: <Sofa className="w-10 h-10 stroke-1 text-[var(--color-brand-burgundy)]" />, slug: 'living-room' },
    { name: 'Bedroom', icon: <BedDouble className="w-10 h-10 stroke-1 text-[var(--color-brand-burgundy)]" />, slug: 'bedroom' },
    { name: 'Hotel', icon: <Building2 className="w-10 h-10 stroke-1 text-[var(--color-brand-burgundy)]" />, slug: 'hotel' },
    { name: 'Office', icon: <Briefcase className="w-10 h-10 stroke-1 text-[var(--color-brand-burgundy)]" />, slug: 'office' },
    { name: 'Hospital', icon: <Activity className="w-10 h-10 stroke-1 text-[var(--color-brand-burgundy)]" />, slug: 'hospital' },
    { name: 'Banquet Hall', icon: <Wine className="w-10 h-10 stroke-1 text-[var(--color-brand-burgundy)]" />, slug: 'banquet-hall' },
    { name: 'Apartment', icon: <Home className="w-10 h-10 stroke-1 text-[var(--color-brand-burgundy)]" />, slug: 'apartment' },
  ];

  return (
    <section className="pb-20 bg-[var(--color-background)]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h3 className="font-sans font-bold text-sm text-[var(--color-brand-dark)] uppercase tracking-widest">
            SHOP BY SPACE
          </h3>
        </div>

        {/* Space Icons Grid */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {spaces.map((space) => (
            <Link 
              key={space.name} 
              href={`/collections?space=${space.slug}`}
              className="flex flex-col items-center group"
            >
              <div className="mb-4 p-4 transition-transform duration-300 group-hover:-translate-y-1">
                {space.icon}
              </div>
              <span className="font-sans font-bold text-xs text-[var(--color-brand-dark)] group-hover:text-[var(--color-brand-burgundy)] transition-colors">
                {space.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
