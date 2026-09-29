import React from 'react';
import { MessageSquare, Image, Settings2, Hammer, SearchCheck, Truck, Wrench } from 'lucide-react';

export function Process() {
  const steps = [
    { name: 'Consultation', icon: <MessageSquare className="w-6 h-6 text-[var(--color-brand-burgundy)]" /> },
    { name: 'Choose Design', icon: <Image className="w-6 h-6 text-[var(--color-brand-burgundy)]" /> },
    { name: 'Customization', icon: <Settings2 className="w-6 h-6 text-[var(--color-brand-burgundy)]" /> },
    { name: 'Production', icon: <Hammer className="w-6 h-6 text-[var(--color-brand-burgundy)]" /> },
    { name: 'Quality Check', icon: <SearchCheck className="w-6 h-6 text-[var(--color-brand-burgundy)]" /> },
    { name: 'Delivery', icon: <Truck className="w-6 h-6 text-[var(--color-brand-burgundy)]" /> },
    { name: 'Installation', icon: <Wrench className="w-6 h-6 text-[var(--color-brand-burgundy)]" /> },
  ];

  return (
    <section className="py-10 md:py-12 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <p className="font-sans font-bold text-sm text-[var(--color-brand-muted)] uppercase tracking-widest mb-2">
            CUSTOM CARPET PROCESS
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-brand-dark)]">
            From Concept to Creation
          </h2>
          <div className="flex justify-center mt-4">
             <div className="flex items-center">
                <span className="h-[1px] w-12 bg-[var(--color-brand-burgundy)]"></span>
                <div className="w-2 h-2 mx-2 rotate-45 bg-[var(--color-brand-burgundy)]"></div>
                <span className="h-[1px] w-12 bg-[var(--color-brand-burgundy)]"></span>
             </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal Line for Desktop */}
          <div className="hidden md:block absolute top-10 left-[7%] right-[7%] h-[1px] bg-[var(--color-brand-border)] z-0" />
          
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-4 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center w-full md:w-auto relative group">
                {/* Vertical Line for Mobile (between items) */}
                {index !== steps.length - 1 && (
                  <div className="block md:hidden absolute top-20 bottom-[-2rem] w-[1px] bg-[var(--color-brand-border)] z-0" />
                )}
                
                {/* Icon Circle */}
                <div className="w-20 h-20 rounded-full bg-white border border-[var(--color-brand-border)] flex items-center justify-center mb-4 transition-colors group-hover:border-[var(--color-brand-burgundy)] group-hover:bg-[var(--color-brand-cream)] z-10 relative">
                  {step.icon}
                </div>
                
                {/* Label */}
                <span className="font-sans font-bold text-sm text-[var(--color-brand-dark)] text-center group-hover:text-[var(--color-brand-burgundy)] transition-colors">
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
