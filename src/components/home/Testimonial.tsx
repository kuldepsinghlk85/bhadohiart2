"use client";

import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, User, MapPin } from 'lucide-react';

export interface TestimonialData {
  id: string | number;
  clientName?: string;
  author?: string;
  role?: string;
  location?: string | null;
  clientType?: string | null;
  quote: string;
  image?: string | null;
  rating?: number | null;
  isVisible?: boolean;
}

interface TestimonialProps {
  testimonials?: TestimonialData[];
}

const FALLBACK_TESTIMONIALS: TestimonialData[] = [
  {
    id: 'test-1',
    clientName: 'Vikram Singh',
    location: 'Homeowner, Bangalore',
    clientType: 'Residential Client',
    rating: 5,
    quote: 'Bhadohi Arts Weave delivered exactly what they promised. The plush texture and deep colors of their Infinity collection completely transformed my living room.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces'
  },
  {
    id: 'test-2',
    clientName: 'Rajiv Oberoi',
    location: 'Luxury Hotel Group, New Delhi',
    clientType: 'Hospitality Partner',
    rating: 5,
    quote: 'The wall-to-wall carpet installation at our luxury hotel was flawless. The quality of Bhadohi Arts Weave is unmatched, bringing a touch of heritage and elegance to our spaces.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=faces'
  },
  {
    id: 'test-3',
    clientName: 'Anita Desai',
    location: 'Interior Designer, Mumbai',
    clientType: 'Design Studio',
    rating: 5,
    quote: 'We ordered custom hand-knotted rugs for our new corporate office. The craftsmanship is extraordinary and the team was incredibly professional throughout the process.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=faces'
  },
  {
    id: 'test-4',
    clientName: 'Elena Rossi',
    location: 'Principal Architect, London',
    clientType: 'International Architect',
    rating: 5,
    quote: 'As an architect, I appreciate attention to detail. The intricate traditional motifs on their heritage carpets are simply breathtaking. Highly recommended.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=faces'
  }
];

export function Testimonial({ testimonials }: TestimonialProps) {
  const activeItems = (testimonials && testimonials.length > 0) ? testimonials : FALLBACK_TESTIMONIALS;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (activeItems.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeItems.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeItems.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % activeItems.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + activeItems.length) % activeItems.length);

  const current = activeItems[currentIndex] || activeItems[0];
  const displayName = current.clientName || current.author || 'Valued Client';
  const displayLocation = current.location || current.role || 'Verified Patron';
  const starCount = current.rating || 5;

  return (
    <section id="testimonials" className="py-14 md:py-18 bg-[#FAF7F0] border-b border-[var(--color-brand-border)] relative overflow-hidden">
      
      {/* Background Subtle Carpet Weave */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: `url('/images/footer-runner-bg.jpg')` }}
      />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header with signature theme */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[var(--color-brand-burgundy)]/10 text-[var(--color-brand-burgundy)] text-xs font-semibold uppercase tracking-wider mb-2.5 border border-[var(--color-brand-burgundy)]/15 shadow-2xs">
            <Quote className="w-3.5 h-3.5" />
            Client Impressions
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[var(--color-brand-dark)] font-normal mb-2.5">
            Words of <span className="text-[var(--color-brand-burgundy)] italic">Appreciation</span>
          </h2>
          <p className="font-sans text-xs md:text-sm text-[var(--color-brand-muted)] max-w-xl mx-auto leading-relaxed">
            Trusted by luxury hotels, interior designers, architects, and discerning homeowners worldwide.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Desktop Prev Button */}
          <button 
            onClick={prevSlide}
            aria-label="Previous testimonial"
            className="hidden md:flex absolute -left-6 lg:-left-12 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-[var(--color-brand-border)] bg-white shadow-md items-center justify-center text-[var(--color-brand-dark)] hover:bg-[var(--color-brand-burgundy)] hover:text-white hover:border-[var(--color-brand-burgundy)] transition-all z-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="bg-white border border-[var(--color-brand-border)] rounded-3xl p-8 md:p-12 text-center relative shadow-sm min-h-[360px] flex flex-col justify-center overflow-hidden">
            
            {/* Top Quote watermark */}
            <div className="absolute top-5 left-8 text-[var(--color-brand-burgundy)]/10 pointer-events-none">
              <Quote className="w-16 h-16" />
            </div>

            <div className="relative z-10 transition-all duration-500 animate-in fade-in" key={String(current.id)}>
              
              {/* Stars */}
              <div className="flex justify-center mb-5">
                {[...Array(starCount)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[var(--color-brand-gold)] text-[var(--color-brand-gold)] mx-0.5" />
                ))}
              </div>
              
              {/* Quote Text */}
              <p className="font-serif text-lg md:text-2xl text-[var(--color-brand-dark)] italic leading-relaxed mb-8 max-w-3xl mx-auto">
                "{current.quote}"
              </p>
              
              {/* Author & Photo Showcase */}
              <div className="flex flex-col items-center justify-center">
                
                {/* Client Photo Frame */}
                <div className="relative mb-3 group">
                  <div className="w-18 h-18 md:w-20 md:h-20 rounded-full p-1 bg-gradient-to-tr from-[var(--color-brand-burgundy)] via-[var(--color-brand-gold)] to-[var(--color-brand-burgundy)] shadow-md">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white border-2 border-white">
                      {current.image ? (
                        <img 
                          src={current.image} 
                          alt={displayName} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-400">
                          <User className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Name */}
                <h4 className="font-serif font-bold text-base md:text-lg text-[var(--color-brand-dark)] tracking-wide">
                  {displayName}
                </h4>

                {/* Location / Role */}
                <p className="font-sans text-xs text-[var(--color-brand-muted)] mt-0.5 flex items-center gap-1.5">
                  <span>{displayLocation}</span>
                  {current.clientType && (
                    <>
                      <span className="text-[var(--color-brand-gold)]">•</span>
                      <span className="text-[var(--color-brand-burgundy)] font-medium">{current.clientType}</span>
                    </>
                  )}
                </p>
              </div>

            </div>

            {/* Slider Dots */}
            {activeItems.length > 1 && (
              <div className="flex justify-center gap-1.5 mt-8 relative z-10">
                {activeItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === idx 
                        ? 'w-6 bg-[var(--color-brand-burgundy)]' 
                        : 'w-2 bg-stone-300 hover:bg-stone-400'
                    }`}
                  />
                ))}
              </div>
            )}

          </div>

          {/* Desktop Next Button */}
          <button 
            onClick={nextSlide}
            aria-label="Next testimonial"
            className="hidden md:flex absolute -right-6 lg:-right-12 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-[var(--color-brand-border)] bg-white shadow-md items-center justify-center text-[var(--color-brand-dark)] hover:bg-[var(--color-brand-burgundy)] hover:text-white hover:border-[var(--color-brand-burgundy)] transition-all z-20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          {/* Mobile Arrows */}
          <div className="flex md:hidden justify-center gap-4 mt-6">
            <button 
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-[var(--color-brand-border)] bg-white shadow-xs flex items-center justify-center text-[var(--color-brand-dark)] hover:bg-[var(--color-brand-burgundy)] hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-[var(--color-brand-border)] bg-white shadow-xs flex items-center justify-center text-[var(--color-brand-dark)] hover:bg-[var(--color-brand-burgundy)] hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
