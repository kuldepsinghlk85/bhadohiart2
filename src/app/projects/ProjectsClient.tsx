"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CategoryData {
  id: string;
  name: string;
  slug: string;
  images: string[];
}

interface ProjectsClientProps {
  categories: CategoryData[];
}

export function ProjectsClient({ categories }: ProjectsClientProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(categories[0]?.id || '');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const activeCategory = categories.find(c => c.id === activeCategoryId) || categories[0];
  const images = activeCategory?.images || [];

  // Reset slide index when category changes
  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [activeCategoryId]);

  // Auto-advance slideshow
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length, activeCategoryId]);

  const nextSlide = () => setCurrentSlideIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentSlideIndex((prev) => (prev - 1 + images.length) % images.length);

  if (!activeCategory) {
    return <div className="p-20 text-center">No categories found.</div>;
  }

  return (
    <div className="bg-[#FAF7F0] min-h-screen pt-6 md:pt-8 pb-10">
      <div className="container mx-auto px-4 max-w-7xl h-[calc(100vh-120px)] min-h-[600px] flex flex-col md:flex-row gap-8">
        
        {/* Left Sidebar: Categories */}
        <div className="w-full md:w-1/4 bg-white border border-[var(--color-brand-border)] p-6 flex flex-col h-full overflow-y-auto">
          <h2 className="font-serif text-2xl text-[var(--color-brand-dark)] mb-6 pb-4 border-b border-[var(--color-brand-border)] uppercase tracking-wider">
            Collections
          </h2>
          <div className="flex flex-col gap-2 flex-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategoryId(category.id)}
                className={`text-left px-4 py-3 font-sans text-sm tracking-wider uppercase transition-all flex items-center justify-between ${
                  activeCategoryId === category.id
                    ? 'bg-[var(--color-brand-burgundy)] text-white font-bold'
                    : 'text-[var(--color-brand-dark)] hover:bg-[#FAF7F0]'
                }`}
              >
                {category.name}
                {activeCategoryId === category.id && <ArrowRight className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>

        {/* Right Area: Slideshow */}
        <div className="w-full md:w-3/4 relative bg-black border border-[var(--color-brand-border)] overflow-hidden group h-full">
          {images.length > 0 ? (
            images.map((img, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlideIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img 
                  src={img} 
                  alt={`${activeCategory.name} image ${index + 1}`}
                  className="w-full h-full object-cover opacity-90"
                />
                
                {/* Overlay Text & CTA */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-12">
                  <h3 className="text-4xl md:text-5xl font-serif text-white mb-6 drop-shadow-lg">
                    {activeCategory.name}
                  </h3>
                  <Link 
                    href={`/collections?category=${activeCategory.name.toLowerCase()}`}
                    className="inline-flex items-center gap-2 bg-[var(--color-brand-burgundy)] text-white px-8 py-4 font-bold tracking-wider hover:bg-white hover:text-[var(--color-brand-dark)] transition-colors w-fit"
                  >
                    <Eye className="w-5 h-5" />
                    EXPLORE COLLECTION
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-[var(--color-brand-cream)] font-serif text-xl">
                More images coming soon...
              </p>
            </div>
          )}

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/30 hover:bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/30 hover:bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlideIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentSlideIndex ? 'bg-[var(--color-brand-burgundy)] scale-125' : 'bg-white/50 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
