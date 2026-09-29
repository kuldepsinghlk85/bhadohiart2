import React from 'react';
import { BadgeCheck, Move, Sparkles, Truck, ShieldAlert, Wrench, IndianRupee, Package } from 'lucide-react';

export function WhyChooseUs() {
  const benefits = [
    {
      icon: <BadgeCheck className="w-6 h-6 text-[var(--color-brand-burgundy)]" />,
      title: 'Premium Quality',
      description: 'Finest materials & skilled craftsmanship'
    },
    {
      icon: <Move className="w-6 h-6 text-[var(--color-brand-burgundy)]" />,
      title: 'Custom Sizes',
      description: '100% customization as per your space'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[var(--color-brand-burgundy)]" />,
      title: 'Anti-Bacterial',
      description: 'Hygienic & safe for your family'
    },
    {
      icon: <Truck className="w-6 h-6 text-[var(--color-brand-burgundy)]" />,
      title: 'Quick Delivery',
      description: 'On-time delivery within committed time'
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-[var(--color-brand-burgundy)]" />,
      title: 'Anti-Fungal',
      description: 'Treated for better protection'
    },
    {
      icon: <Wrench className="w-6 h-6 text-[var(--color-brand-burgundy)]" />,
      title: 'Installation Service',
      description: 'Trained professionals for perfect fit'
    },
    {
      icon: <IndianRupee className="w-6 h-6 text-[var(--color-brand-burgundy)]" />,
      title: 'Affordable Pricing',
      description: 'Best quality at competitive prices'
    },
    {
      icon: <Package className="w-6 h-6 text-[var(--color-brand-burgundy)]" />,
      title: 'Bulk Orders',
      description: 'Special pricing for large requirements'
    }
  ];

  return (
    <section className="bg-[#F8F5EF] overflow-hidden">
      <div className="flex flex-col lg:flex-row w-full">
        
        {/* Left Side: Image */}
        <div className="w-full lg:w-[40%] h-[400px] lg:h-auto relative">
          <img 
            src="/images/emerald-meadow.png" 
            alt="Carpet Craftsmanship" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Content */}
        <div className="w-full lg:w-[60%] px-8 lg:px-14 py-10 lg:py-14">
          <div className="mb-6">
             <div className="flex items-center gap-4 mb-4">
                <span className="text-[var(--color-brand-burgundy)] font-sans font-bold tracking-widest text-sm uppercase">
                  WHY CHOOSE BHADOHI ARTS WEAVE
                </span>
             </div>
            
            <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-brand-dark)] leading-tight">
              Quality You Can Feel,<br />
              Trust You Can See.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 border border-[var(--color-brand-border)]">
                  {benefit.icon}
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-[var(--color-brand-dark)] mb-1">
                    {benefit.title}
                  </h4>
                  <p className="font-sans text-xs text-[var(--color-brand-muted)] leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
