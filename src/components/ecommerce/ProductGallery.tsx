"use client";

import React, { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  isZoomable?: boolean;
}

export function ProductGallery({ images, productName, isZoomable = false }: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main Image */}
      <div className="w-full aspect-square md:aspect-[4/3] lg:aspect-square bg-[#FAF7F0] border border-[var(--color-brand-border)] overflow-hidden relative group cursor-crosshair">
        {/* Transparent overlay to prevent right click on some browsers */}
        <div className="absolute inset-0 z-10" onContextMenu={(e) => e.preventDefault()} />
        <img 
          src={mainImage} 
          alt={productName}
          className={`w-full h-full object-cover select-none ${isZoomable ? 'group-hover:scale-[2] transition-transform duration-700 ease-in-out' : 'pointer-events-none'}`}
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-4">
          {images.map((img, i) => (
            <button 
              key={i} 
              onClick={() => setMainImage(img)}
              className={`aspect-square relative border ${mainImage === img ? 'border-[var(--color-brand-burgundy)]' : 'border-[var(--color-brand-border)]'} overflow-hidden`}
            >
              <div className="absolute inset-0 z-10" onContextMenu={(e) => e.preventDefault()} />
              <img 
                src={img} 
                alt={`Thumbnail ${i+1}`} 
                className="w-full h-full object-cover hover:opacity-80 transition-opacity select-none pointer-events-none" 
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
