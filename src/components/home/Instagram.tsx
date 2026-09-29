import React from 'react';
import { FaInstagram as InstaIcon } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Instagram() {
  const images = [
    'https://bhadohiartsweave.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-27-at-11.21.46.jpeg',
    'https://bhadohiartsweave.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-27-at-11.21.44-1.jpeg',
    'https://bhadohiartsweave.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-27-at-11.21.44-2.jpeg',
    'https://bhadohiartsweave.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-27-at-11.21.43-1.jpeg',
    'https://bhadohiartsweave.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-27-at-11.21.45-1.jpeg',
    'https://bhadohiartsweave.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-27-at-11.21.45-2.jpeg',
  ];

  return (
    <section className="py-10 md:py-12 bg-white border-t border-[var(--color-brand-border)]">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="font-serif text-2xl md:text-3xl text-[var(--color-brand-dark)] uppercase tracking-wide">
            FOLLOW US ON INSTAGRAM
          </h2>
          <div className="flex justify-center mt-4">
             <div className="flex items-center">
                <span className="h-[1px] w-8 bg-[var(--color-brand-burgundy)]"></span>
                <div className="w-1.5 h-1.5 mx-2 rotate-45 bg-[var(--color-brand-burgundy)]"></div>
                <span className="h-[1px] w-8 bg-[var(--color-brand-burgundy)]"></span>
             </div>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-10">
          {images.map((src, idx) => (
            <Link key={idx} href="#" className="relative group aspect-square overflow-hidden bg-gray-100">
              <img 
                src={src} 
                alt="Instagram post" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[var(--color-brand-burgundy)]/0 group-hover:bg-[var(--color-brand-burgundy)]/40 transition-colors duration-300 flex items-center justify-center">
                <InstaIcon className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="outline" className="gap-2">
            <InstaIcon className="w-4 h-4" />
            FOLLOW @BHADOHIARTSWEAVE
          </Button>
        </div>

      </div>
    </section>
  );
}
