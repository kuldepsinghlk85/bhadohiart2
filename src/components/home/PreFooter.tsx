import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export function PreFooter() {
  return (
    <section className="bg-white border-t border-[var(--color-brand-border)]">
      <div className="container mx-auto px-4 py-8 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Logo */}
          <div className="flex-shrink-0 text-center lg:text-left py-4">
            <div className="text-xl font-serif font-bold text-[var(--color-brand-burgundy)] leading-tight">
              BHADOHI<br/>ARTS<br/>WEAVE
            </div>
            <p className="text-[10px] text-[var(--color-brand-muted)] uppercase tracking-widest mt-1">
              Need Custom Carpet?
            </p>
          </div>

          {/* Contact Methods */}
          <div className="flex flex-col sm:flex-row items-center gap-8 md:gap-16">
            <Link href="tel:+918558085579" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full border border-[var(--color-brand-border)] flex items-center justify-center text-[var(--color-brand-burgundy)] group-hover:bg-[var(--color-brand-cream)] transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-[var(--color-brand-muted)] uppercase tracking-widest mb-1">Call Us</p>
                <p className="font-sans font-bold text-lg text-[var(--color-brand-dark)]">8558085579</p>
              </div>
            </Link>

            <Link href="https://wa.me/918558085579" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full border border-[var(--color-brand-border)] flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366]/10 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-[var(--color-brand-muted)] uppercase tracking-widest mb-1">WhatsApp Us</p>
                <p className="font-sans font-bold text-lg text-[var(--color-brand-dark)]">8558085579</p>
              </div>
            </Link>
          </div>

          {/* Image */}
          <div className="hidden lg:block h-32 w-64 overflow-hidden rounded-t-xl lg:rounded-none relative">
             {/* Note: The reference image shows a rolled carpet placed at the bottom right. */}
             <img 
               src="/images/ocean-mist.png" 
               alt="Rolled Premium Carpet" 
               className="w-full h-full object-cover object-bottom"
             />
          </div>

        </div>
      </div>
    </section>
  );
}
