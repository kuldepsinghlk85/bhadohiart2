import React from 'react';
import { Button } from '@/components/ui/button';

export default function QuotePage() {
  return (
    <div className="bg-[#FAF7F0] min-h-screen pt-8 md:pt-10 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        
        <div className="text-center mb-6">
          <h1 className="font-serif text-3xl md:text-4xl text-[var(--color-brand-dark)] mb-2">
            Request a Custom Quote
          </h1>
          <p className="font-sans text-sm text-[var(--color-brand-muted)]">
            Looking for a custom size, unique design, or bulk order? Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </div>

        <div className="bg-white border border-[var(--color-brand-border)] p-8 md:p-12 shadow-sm">
          <form className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[var(--color-brand-dark)] uppercase tracking-wider mb-2">First Name *</label>
                <input type="text" className="w-full border border-[var(--color-brand-border)] p-3 text-sm outline-none focus:border-[var(--color-brand-burgundy)]" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--color-brand-dark)] uppercase tracking-wider mb-2">Last Name *</label>
                <input type="text" className="w-full border border-[var(--color-brand-border)] p-3 text-sm outline-none focus:border-[var(--color-brand-burgundy)]" required />
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

            <div>
              <label className="block text-xs font-bold text-[var(--color-brand-dark)] uppercase tracking-wider mb-2">Inquiry Type</label>
              <select className="w-full border border-[var(--color-brand-border)] p-3 text-sm outline-none focus:border-[var(--color-brand-burgundy)] bg-white">
                <option>Custom Carpet Design</option>
                <option>Custom Size for Existing Design</option>
                <option>Bulk/Wholesale Order</option>
                <option>Hotel/Hospitality Project</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--color-brand-dark)] uppercase tracking-wider mb-2">Project Details *</label>
              <textarea 
                rows={5} 
                className="w-full border border-[var(--color-brand-border)] p-3 text-sm outline-none focus:border-[var(--color-brand-burgundy)] resize-none"
                placeholder="Please describe your requirements (dimensions, colors, timeline, etc.)"
                required
              ></textarea>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full py-6">
                SUBMIT REQUEST
              </Button>
            </div>
            
            <p className="text-xs text-center text-[var(--color-brand-muted)] mt-4">
              By submitting this form, you agree to our Privacy Policy.
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}
