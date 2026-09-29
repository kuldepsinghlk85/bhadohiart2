import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Clock } from 'lucide-react';

export default function VisitPage() {
  return (
    <div className="bg-[#FAF7F0] min-h-screen pt-8 md:pt-10 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Info Section */}
          <div className="w-full lg:w-5/12">
            <span className="text-[var(--color-brand-burgundy)] font-sans font-bold tracking-widest text-xs uppercase mb-2 block">
              WALL-TO-WALL SOLUTIONS
            </span>
            <h1 className="font-serif text-3xl md:text-4xl text-[var(--color-brand-dark)] leading-tight mb-3">
              Book a Site Visit
            </h1>
            <p className="font-sans text-base text-[var(--color-brand-muted)] mb-6">
              Transform your commercial or residential space with our premium wall-to-wall carpets. Our experts will visit your location to measure, consult, and provide a comprehensive quotation.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-brand-cream)] flex items-center justify-center shrink-0 text-[var(--color-brand-burgundy)]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-brand-dark)] text-sm uppercase tracking-wide">Pan-India Service</h3>
                  <p className="text-sm text-[var(--color-brand-muted)] mt-1">We cater to major cities across India for large scale projects.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-brand-cream)] flex items-center justify-center shrink-0 text-[var(--color-brand-burgundy)]">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-brand-dark)] text-sm uppercase tracking-wide">Flexible Scheduling</h3>
                  <p className="text-sm text-[var(--color-brand-muted)] mt-1">Pick a date that works best for your construction or renovation timeline.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-brand-cream)] flex items-center justify-center shrink-0 text-[var(--color-brand-burgundy)]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-brand-dark)] text-sm uppercase tracking-wide">Quick Turnaround</h3>
                  <p className="text-sm text-[var(--color-brand-muted)] mt-1">Receive a detailed quotation within 48 hours of the site visit.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="w-full lg:w-7/12">
            <div className="bg-white border border-[var(--color-brand-border)] p-8 md:p-10 shadow-sm">
              <form className="space-y-6">
                
                <h3 className="font-serif text-2xl text-[var(--color-brand-dark)] mb-6 pb-2 border-b border-[var(--color-brand-border)]">
                  Your Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-brand-dark)] uppercase tracking-wider mb-2">Name *</label>
                    <input type="text" className="w-full border border-[var(--color-brand-border)] p-3 text-sm outline-none focus:border-[var(--color-brand-burgundy)]" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-brand-dark)] uppercase tracking-wider mb-2">Company / Organization</label>
                    <input type="text" className="w-full border border-[var(--color-brand-border)] p-3 text-sm outline-none focus:border-[var(--color-brand-burgundy)]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-brand-dark)] uppercase tracking-wider mb-2">Email Address *</label>
                    <input type="email" className="w-full border border-[var(--color-brand-border)] p-3 text-sm outline-none focus:border-[var(--color-brand-burgundy)]" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-brand-dark)] uppercase tracking-wider mb-2">Phone Number *</label>
                    <input type="tel" className="w-full border border-[var(--color-brand-border)] p-3 text-sm outline-none focus:border-[var(--color-brand-burgundy)]" required />
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="font-serif text-2xl text-[var(--color-brand-dark)] mb-6 pb-2 border-b border-[var(--color-brand-border)]">
                    Site Details
                  </h3>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--color-brand-dark)] uppercase tracking-wider mb-2">Site Address *</label>
                  <input type="text" className="w-full border border-[var(--color-brand-border)] p-3 text-sm outline-none focus:border-[var(--color-brand-burgundy)] mb-4" placeholder="Street Address" required />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" className="w-full border border-[var(--color-brand-border)] p-3 text-sm outline-none focus:border-[var(--color-brand-burgundy)]" placeholder="City" required />
                    <input type="text" className="w-full border border-[var(--color-brand-border)] p-3 text-sm outline-none focus:border-[var(--color-brand-burgundy)]" placeholder="PIN Code" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-brand-dark)] uppercase tracking-wider mb-2">Project Type</label>
                    <select className="w-full border border-[var(--color-brand-border)] p-3 text-sm outline-none focus:border-[var(--color-brand-burgundy)] bg-white">
                      <option>Hotel / Hospitality</option>
                      <option>Corporate Office</option>
                      <option>Hospital / Healthcare</option>
                      <option>Banquet Hall</option>
                      <option>Luxury Residence</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-brand-dark)] uppercase tracking-wider mb-2">Approx. Area (Sq. Ft.)</label>
                    <input type="text" className="w-full border border-[var(--color-brand-border)] p-3 text-sm outline-none focus:border-[var(--color-brand-burgundy)]" />
                  </div>
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full py-6">
                    REQUEST SITE VISIT
                  </Button>
                </div>
                
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
