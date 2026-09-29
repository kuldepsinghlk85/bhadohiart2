"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

interface FilterSidebarProps {
  collections: { id: string; name: string; slug: string }[];
}

export function FilterSidebar({ collections }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current selected categories (can be multiple)
  const currentCategories = searchParams.getAll('category');
  const currentPriceRange = searchParams.get('price') || '';

  const handleCategoryChange = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const existing = params.getAll('category');
    
    // Remove all existing category params
    params.delete('category');
    
    // Add back the ones we want to keep
    if (existing.includes(slug)) {
      existing.filter(c => c !== slug).forEach(c => params.append('category', c));
    } else {
      existing.forEach(c => params.append('category', c));
      params.append('category', slug);
    }
    
    router.push(`/collections?${params.toString()}`);
  };

  const handlePriceChange = (range: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentPriceRange === range) {
      params.delete('price');
    } else {
      params.set('price', range);
    }
    router.push(`/collections?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push('/collections');
  };

  // De-duplicate collections by slug or name
  const uniqueCollections = Array.from(
    new Map(collections.map(c => [(c.slug || c.name || c.id).toLowerCase().trim(), c])).values()
  );

  const hasActiveFilters = currentCategories.length > 0 || !!currentPriceRange;

  const collectionDotColors = [
    'bg-amber-500',
    'bg-rose-600',
    'bg-emerald-600',
    'bg-indigo-600',
    'bg-sky-500',
    'bg-purple-600'
  ];

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-xs sticky top-24 overflow-hidden">
        
        {/* Sidebar Header */}
        <div className="bg-gradient-to-r from-[#FAF7F0] via-[#F6F1E7] to-[#FAF7F0] px-4 py-3.5 border-b border-stone-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#990E14] to-[#7B090E] text-white flex items-center justify-center shadow-xs">
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </div>
            <h3 className="font-serif font-bold text-stone-900 text-sm tracking-wider uppercase">
              Filter Rugs
            </h3>
          </div>
          
          {hasActiveFilters && (
            <button 
              onClick={clearAllFilters}
              className="text-[11px] font-bold text-[#990E14] hover:text-[#7B090E] flex items-center gap-1 transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
        
        {/* Categories Section */}
        <div className="p-4 border-b border-stone-100">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-xs text-stone-800 uppercase tracking-wider">
              Categories
            </h4>
            <span className="text-[10px] font-semibold text-stone-400">
              {uniqueCollections.length} available
            </span>
          </div>
          <ul className="space-y-1.5 text-xs">
            {uniqueCollections.map((collection, idx) => {
              const isSelected = currentCategories.includes(collection.slug);
              const dotColor = collectionDotColors[idx % collectionDotColors.length];

              return (
                <li 
                  key={collection.id || collection.slug} 
                  className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-[#FAF7F0] text-[#990E14] font-bold border border-[#DE8B22]/40 shadow-2xs' 
                      : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                  }`} 
                  onClick={() => handleCategoryChange(collection.slug)}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                    <span>{collection.name}</span>
                  </div>
                  <input 
                    type="checkbox" 
                    className="accent-[#990E14] w-4 h-4 rounded cursor-pointer pointer-events-none" 
                    checked={isSelected}
                    readOnly
                  /> 
                </li>
              );
            })}
          </ul>
        </div>

        {/* Price Range Section */}
        <div className="p-4 border-b border-stone-100">
          <h4 className="font-bold text-xs text-stone-800 uppercase tracking-wider mb-3">
            Price Range
          </h4>
          <ul className="space-y-1.5 text-xs">
            {[
              { id: 'under-10k', label: 'Under ₹10,000', dot: 'bg-emerald-500' },
              { id: '10k-25k', label: '₹10,000 - ₹25,000', dot: 'bg-amber-500' },
              { id: 'above-25k', label: 'Above ₹25,000', dot: 'bg-rose-600' },
            ].map(price => {
              const isSelected = currentPriceRange === price.id;
              return (
                <li 
                  key={price.id} 
                  className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-[#FAF7F0] text-[#990E14] font-bold border border-[#DE8B22]/40 shadow-2xs' 
                      : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                  }`} 
                  onClick={() => handlePriceChange(price.id)}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2 h-2 rounded-full ${price.dot}`} />
                    <span>{price.label}</span>
                  </div>
                  <input 
                    type="checkbox" 
                    className="accent-[#990E14] w-4 h-4 rounded cursor-pointer pointer-events-none" 
                    checked={isSelected} 
                    readOnly 
                  /> 
                </li>
              );
            })}
          </ul>
        </div>

        {/* Custom Rug Order CTA Banner */}
        <div className="p-3.5">
          <div className="rounded-xl bg-gradient-to-br from-[#240507] via-[#38080C] to-[#1C0305] text-white p-3.5 text-center relative overflow-hidden shadow-xs border border-[#DE8B22]/30">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay pointer-events-none"
              style={{ backgroundImage: `url('/images/footer-runner-bg.jpg')` }}
            />
            <div className="relative z-10">
              <span className="inline-block text-[9px] font-bold text-[#DE8B22] uppercase tracking-widest mb-1">
                Bespoke Weaving
              </span>
              <p className="text-xs font-serif font-bold text-[#F3E5D8] mb-1">
                Custom Sizes &amp; Colors
              </p>
              <p className="text-[10px] text-[#D8C7B8] mb-3 leading-snug">
                Need a specific size or room dimension? We weave custom carpets on order.
              </p>
              <Link 
                href="/contact" 
                className="inline-block w-full py-2 px-3 rounded-lg bg-gradient-to-r from-[#DE8B22] to-[#c97b1a] text-stone-950 font-bold text-[10px] uppercase tracking-wider shadow-xs hover:opacity-95 transition-opacity"
              >
                Request Custom Quote
              </Link>
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
}
