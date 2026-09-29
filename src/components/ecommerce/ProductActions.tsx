"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AddToCartButton } from '@/components/ecommerce/AddToCartButton';
import { Ruler } from 'lucide-react';
import { WhatsAppInquiryModal } from './WhatsAppInquiryModal';

interface ProductActionsProps {
  product: {
    id: string;
    name: string;
    price: string;
    image: string;
    slug: string;
    priceMode: string;
    variants?: { size: string; price: number | null }[];
  };
}

const DEFAULT_SIZES = ["4' x 6'", "5' x 8'", "8' x 10'", "9' x 12'"];

export function ProductActions({ product }: ProductActionsProps) {
  const sizes = product.variants && product.variants.length > 0 
    ? product.variants.map(v => v.size)
    : DEFAULT_SIZES;
    
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const whatsappMessage = `Hi, I'm interested in the ${product.name} (Size: ${selectedSize}). Please provide more details.`;

  // Find dynamic price if available
  const activeVariant = product.variants?.find(v => v.size === selectedSize);
  const displayPrice = activeVariant?.price ? `₹${activeVariant.price}` : product.price;

  return (
    <>
      <p className="text-2xl font-bold text-[var(--color-brand-dark)] mb-8">
        {displayPrice}
        <span className="text-sm font-normal text-[var(--color-brand-muted)] ml-2 block sm:inline mt-1 sm:mt-0">
          (Taxes included. Custom size pricing varies.)
        </span>
      </p>

      {/* Customization Options */}
      <div className="mb-8 border-t border-b border-[var(--color-brand-border)] py-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-sans font-bold text-sm uppercase tracking-widest text-[var(--color-brand-dark)]">
            Select Size
          </h3>
          <button className="text-sm text-[var(--color-brand-burgundy)] flex items-center hover:underline">
            <Ruler className="w-4 h-4 mr-1" /> Size Guide
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {sizes.map(size => (
            <button 
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 border text-sm transition-colors ${
                selectedSize === size 
                  ? 'border-[var(--color-brand-burgundy)] bg-[var(--color-brand-cream)] text-[var(--color-brand-burgundy)] font-bold' 
                  : 'border-[var(--color-brand-border)] hover:border-[var(--color-brand-burgundy)]'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        {product.priceMode === 'ENQUIRE' ? (
          <Button 
            size="lg" 
            onClick={() => setIsModalOpen(true)}
            className="flex-1 font-bold"
          >
            REQUEST QUOTE
          </Button>
        ) : (
          <AddToCartButton 
            product={{
              id: product.id,
              name: product.name,
              price: displayPrice,
              image: product.image,
              slug: product.slug
            }}
            size={selectedSize}
          />
        )}
        <div className="flex-1">
          <Button 
            size="lg" 
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-[#25D366] text-white hover:bg-[#128C7E] font-bold"
          >
            BUY ON WHATSAPP
          </Button>
        </div>
      </div>

      <WhatsAppInquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        message={whatsappMessage} 
      />
    </>
  );
}
