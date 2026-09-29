"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import Link from 'next/link';

interface Slide {
  id: string;
  name: string;
  slug: string;
  url?: string;
  imageUrl: string;
  collectionName: string;
}

export function GrandRoomSlider({ slides }: { slides: Slide[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (slides.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F0]">
        <p className="font-serif text-2xl text-[var(--color-brand-muted)]">More Grand Looks Coming Soon.</p>
      </div>
    );
  }

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden group">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img 
            src={slide.imageUrl} 
            alt={slide.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-12 md:p-24 pb-32">
            <p className="text-[var(--color-brand-cream)] font-bold tracking-widest uppercase text-sm md:text-base mb-2 opacity-80">
              {slide.collectionName} Collection
            </p>
            <h2 className="text-4xl md:text-7xl font-serif text-white mb-6 drop-shadow-lg">
              {slide.name}
            </h2>
            <Link 
              href={slide.url || `/collections/products/${slide.slug}`}
              className="inline-flex items-center gap-2 bg-[var(--color-brand-burgundy)] text-white px-8 py-4 font-bold tracking-wider hover:bg-white hover:text-[var(--color-brand-dark)] transition-colors w-fit"
            >
              <Eye className="w-5 h-5" />
              VIEW DETAILS
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-black/30 hover:bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-black/30 hover:bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}
      
      {/* Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? 'bg-[var(--color-brand-burgundy)] scale-125' : 'bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
