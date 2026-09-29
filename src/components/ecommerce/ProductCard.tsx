import React from 'react';
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';

export interface ProductType {
  id: string;
  name: string;
  type?: string;
  price: string | number;
  image: string;
  rating?: number;
  slug: string;
  collection?: { name: string; slug?: string } | string;
}

export function ProductCard({ product }: { product: ProductType }) {
  const collectionName = typeof product.collection === 'object' 
    ? product.collection?.name 
    : product.collection || product.type || 'Artisan Carpet';

  const isQuote = !product.price || product.price === 'Request Quote' || typeof product.price !== 'number';

  return (
    <div className="group relative rounded-2xl border border-stone-200/90 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      
      {/* Product Image Container */}
      <div className="w-full aspect-[4/3] overflow-hidden relative bg-[#FAF7F0]">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Top Floating Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold text-[#990E14] uppercase tracking-wider shadow-xs border border-stone-200/60">
            Handcrafted
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#171212]/75 backdrop-blur-xs text-[10px] font-medium text-[#FAF7F0] shadow-xs">
            Bhadohi Weave
          </span>
        </div>

        {/* Subtle bottom gradient on image */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        
        {/* Category Tag & Rating */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-semibold text-[#DE8B22] uppercase tracking-wider truncate max-w-[180px]">
            {collectionName}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-[11px] font-bold text-stone-700">4.9</span>
          </div>
        </div>

        {/* Title */}
        <Link 
          href={`/collections/products/${product.slug}`} 
          className="font-serif font-bold text-base text-stone-900 group-hover:text-[#990E14] transition-colors mb-3 line-clamp-1 after:absolute after:inset-0 z-10"
        >
          {product.name}
        </Link>

        {/* Price & Specs */}
        <div className="mt-auto pt-3 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block leading-tight">
              Pricing
            </span>
            <span className="text-sm font-bold text-stone-900">
              {isQuote ? (
                <span className="text-[#990E14] font-semibold">Request Quote</span>
              ) : (
                `₹${Number(product.price).toLocaleString()}`
              )}
            </span>
          </div>

          <span className="px-2 py-0.5 rounded-md bg-amber-50 text-[#DE8B22] border border-amber-200/80 text-[10px] font-bold tracking-wide">
            Custom Sizes
          </span>
        </div>

        {/* Action Button */}
        <div className="mt-3.5 relative z-0">
          <div className="w-full h-9 rounded-xl bg-stone-100 group-hover:bg-gradient-to-r group-hover:from-[#990E14] group-hover:to-[#7B090E] text-stone-700 group-hover:text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all duration-300 shadow-2xs group-hover:shadow-md">
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>

      </div>
    </div>
  );
}
