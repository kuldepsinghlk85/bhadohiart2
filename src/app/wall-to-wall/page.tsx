import React from 'react';
import Link from 'next/link';
import { Building2, Sparkles, ShieldCheck, Wrench, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WallToWallPage() {
  return (
    <div className="bg-[#FAF7F0] min-h-screen pb-14">
      {/* Top Banner with carpet texture & rich brand color theme */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF5EC] to-[#FAF7F0] pt-8 pb-8 border-b border-[var(--color-brand-border)]">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-multiply pointer-events-none"
          style={{ backgroundImage: `url('/images/footer-runner-bg.jpg')` }}
        />
        <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-brand-burgundy)]/10 text-[var(--color-brand-burgundy)] text-xs font-semibold uppercase tracking-wider mb-2 border border-[var(--color-brand-burgundy)]/15 shadow-2xs">
            <Building2 className="w-3.5 h-3.5" />
            Hospitality &amp; Commercial Solutions
          </span>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[var(--color-brand-dark)] mb-2 font-normal">
            Bespoke <span className="text-[var(--color-brand-burgundy)] italic">Wall-to-Wall</span> Carpets
          </h1>
          <p className="font-sans text-sm md:text-base text-[var(--color-brand-muted)] max-w-2xl mx-auto leading-relaxed">
            Experience seamless luxury with our premium wall-to-wall carpet solutions. We offer Indian customers world-class installations that meet global standards while remaining competitively priced. Perfect for hotels, banquet halls, offices, and luxury residences.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-8 rounded-2xl border border-[var(--color-brand-border)] shadow-xs relative overflow-hidden group hover:border-[var(--color-brand-burgundy)]/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-burgundy)]/10 text-[var(--color-brand-burgundy)] flex items-center justify-center mb-5">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-[var(--color-brand-dark)] mb-3">Professional Installation</h3>
            <p className="font-sans text-sm md:text-base text-[var(--color-brand-muted)] leading-relaxed">
              In addition to manufacturing, we provide professional installation services through our trained and experienced staff, ensuring perfect fitting, acoustic padding, and flawless finishing for every project.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[var(--color-brand-border)] shadow-xs relative overflow-hidden group hover:border-[var(--color-brand-burgundy)]/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-burgundy)]/10 text-[var(--color-brand-burgundy)] flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-[var(--color-brand-dark)] mb-3">Hygiene &amp; Safety Engineered</h3>
            <p className="font-sans text-sm md:text-base text-[var(--color-brand-muted)] leading-relaxed">
              Many of our wall-to-wall products are anti-bacterial and anti-fungal treated with high fire-retardancy ratings, ensuring hygiene, safety, and long-lasting durability for heavy foot-traffic environments.
            </p>
          </div>
        </div>

        {/* CTA Card */}
        <div className="bg-gradient-to-r from-[var(--color-brand-dark)] to-[#3A1B28] text-white p-8 md:p-10 rounded-2xl text-center relative overflow-hidden shadow-lg">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: `url('/images/footer-runner-bg.jpg')` }}
          />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="font-serif text-2xl md:text-3xl font-light mb-3">
              Planning a Project or Site Measurement?
            </h3>
            <p className="font-sans text-white/80 text-sm md:text-base mb-6 leading-relaxed">
              Get direct consultation with our carpet master weavers and installation engineers. We offer customized roll widths, patterns, and on-site assistance.
            </p>
            <Link href="/contact">
              <Button className="bg-[var(--color-brand-burgundy)] hover:bg-[var(--color-brand-burgundy)]/90 text-white px-8 py-5 rounded-full font-sans font-semibold tracking-wide text-sm shadow-md inline-flex items-center gap-2">
                Inquire For Project <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

