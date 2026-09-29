"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import { Award } from 'lucide-react';
import { WhatsAppInquiryModal } from '@/components/ecommerce/WhatsAppInquiryModal';

const SLIDE_IMAGES = [
  '/images/products/infinity-01.jpg',
  '/images/products/infinity-02.jpg',
  '/images/products/infinity-03.jpg',
  '/images/products/infinity-04.jpg',
  '/images/products/infinity-05.jpg',
  '/images/products/infinity-06.jpg',
  '/images/products/infinity-07.jpg',
  '/images/products/infinity-08.jpg',
  '/images/products/infinity-09.jpg',
  '/images/products/infinity-10.jpg'
];

export function Hero({ slides }: { slides?: any[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  const activeSlides = slides && slides.length > 0 ? slides : SLIDE_IMAGES.map((img, id) => ({
    id, image: img, title: '', subtitle: '', link: ''
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  return (
    <section className="relative w-full h-[460px] md:h-[520px] lg:h-[580px] bg-[#FAF7F0] overflow-hidden flex items-center border-b border-[var(--color-brand-border)]">
      {/* Background Images */}
      {activeSlides.map((slide, index) => (
        <div 
          key={slide.id || index}
          className={`absolute top-0 right-0 w-full md:w-[75%] h-full bg-cover bg-no-repeat transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
          style={{ 
            backgroundImage: `url('${slide.image}')`,
            backgroundPosition: slide.image.includes('infinity-') ? 'top center' : 'center'
          }}
        />
      ))}
      
      {/* Soft white fade gradient on the left to blend with the text area */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F0] via-[#FAF7F0]/90 to-transparent w-full md:w-[80%] z-10" />

      {/* Subtle authentic oriental carpet weave texture overlay on left text area */}
      <div 
        className="absolute inset-y-0 left-0 w-full md:w-[65%] bg-cover bg-left opacity-15 mix-blend-multiply pointer-events-none z-15"
        style={{ backgroundImage: `url('/images/footer-runner-bg.jpg')` }}
      />

      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-20 pointer-events-none">
        <div className="max-w-2xl pointer-events-auto">
          {/* Eyebrow Pill Badge (from user's preferred theme) */}
          <div className="mb-3 transition-all duration-700">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[var(--color-brand-burgundy)]/10 text-[var(--color-brand-burgundy)] text-xs font-semibold uppercase tracking-wider border border-[var(--color-brand-burgundy)]/15 shadow-2xs">
              <Award className="w-3.5 h-3.5" />
              Direct From Weaver &amp; Artisan Hub
            </span>
          </div>

          {/* Main Heading with Italic Burgundy Accent */}
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[var(--color-brand-dark)] leading-tight mb-3 transition-all duration-500 font-normal">
            {activeSlides[currentSlide]?.title ? activeSlides[currentSlide].title.split(',').map((line:string, i:number) => (
              <React.Fragment key={i}>
                {i === 0 ? (
                  <>Crafting <span className="text-[var(--color-brand-burgundy)] italic">Elegance</span></>
                ) : (
                  line
                )}
                {i === 0 && <br />}
              </React.Fragment>
            )) : (
              <>
                Crafting <span className="text-[var(--color-brand-burgundy)] italic">Elegance</span>,<br />
                Woven for Generations
              </>
            )}
          </h1>

          {/* Supporting Text */}
          <p className="text-[var(--color-brand-muted)] font-sans text-sm md:text-base mb-6 font-normal max-w-lg leading-relaxed transition-all duration-500">
            {activeSlides[currentSlide]?.subtitle || "Handmade • Handloom • Heritage • Custom Tufted • Wall-to-Wall Carpets"}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href={activeSlides[currentSlide]?.link || "/collections"}>
              <Button variant="default" size="lg" className="w-full sm:w-auto rounded-xl shadow-xs hover:shadow-md">
                Explore Collection
              </Button>
            </Link>
            <Button variant="outline" size="lg" onClick={() => setIsInquiryModalOpen(true)} className="rounded-xl border-[var(--color-brand-border)] bg-white/80 hover:bg-white shadow-2xs">
              Request Catalogue
            </Button>
          </div>
        </div>
      </div>

      {/* Slider Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-30">
        {activeSlides.map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-[var(--color-brand-burgundy)] w-8' 
                : 'bg-black/20 hover:bg-black/40'
            }`}
            aria-label={`Go to slide ${index + 1}`} 
          />
        ))}
      </div>

      <WhatsAppInquiryModal 
        isOpen={isInquiryModalOpen} 
        onClose={() => setIsInquiryModalOpen(false)}
        message="Hi! I would like to request the latest catalogue."
      />
    </section>
  );
}
