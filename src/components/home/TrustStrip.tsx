import React from 'react';
import { Crown, PenTool, Globe, Building2, ShieldCheck } from 'lucide-react';

export function TrustStrip() {
  const highlights = [
    { icon: <Crown className="w-4 h-4 text-[var(--color-brand-burgundy)] shrink-0" />, title: '20+ Years', desc: 'Crafting Heritage' },
    { icon: <PenTool className="w-4 h-4 text-[var(--color-brand-burgundy)] shrink-0" />, title: '100% Custom', desc: 'Handmade & Handloom' },
    { icon: <Globe className="w-4 h-4 text-[var(--color-brand-burgundy)] shrink-0" />, title: 'Worldwide', desc: 'Doorstep Delivery' },
    { icon: <Building2 className="w-4 h-4 text-[var(--color-brand-burgundy)] shrink-0" />, title: '1000+ Projects', desc: 'Hotels & Residences' },
    { icon: <ShieldCheck className="w-4 h-4 text-[var(--color-brand-burgundy)] shrink-0" />, title: 'Direct Mill', desc: 'Manufacturer Pricing' },
  ];

  return (
    <div className="border-b border-[var(--color-brand-border)] bg-[#FAF7F0] py-4">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {highlights.map((item, index) => (
            <div key={index} className="flex items-center justify-center gap-2.5 p-2 rounded-xl bg-white/70 backdrop-blur-2xs border border-[var(--color-brand-border)]/60 shadow-2xs hover:bg-white transition-all">
              <div className="w-7 h-7 rounded-lg bg-[var(--color-brand-burgundy)]/10 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="text-xs leading-tight">
                <span className="font-bold text-[var(--color-brand-dark)] block">{item.title}</span>
                <span className="text-[var(--color-brand-muted)] text-[11px] block">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
