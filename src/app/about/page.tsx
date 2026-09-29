import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Award, 
  ShieldCheck, 
  Clock, 
  Users, 
  Globe2, 
  Layers, 
  Palette, 
  Compass, 
  CheckCircle2, 
  ArrowRight,
  MessageCircle,
  FileDown
} from 'lucide-react';
import { Instagram } from '@/components/home/Instagram';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'About Us | Bhadohi Arts Weave - Heritage Carpet Manufacturers',
  description: 'Discover the heritage of Bhadohi Arts Weave. Over 30 years of generational hand-knotted carpet weaving, global hospitality installations, and bespoke floor art.'
};

export default function AboutPage() {
  const stats = [
    { number: '30+', label: 'Years of Heritage', subtitle: 'Pioneering Bhadohi Weaving' },
    { number: '500+', label: 'Master Artisans', subtitle: 'Generational Craft Families' },
    { number: '10k+', label: 'Installations', subtitle: 'Homes, Hotels & Banquets' },
    { number: '15+', label: 'Export Countries', subtitle: 'International Benchmarks' }
  ];

  const craftSteps = [
    {
      step: '01',
      title: 'Fleece Selection & Hand-Spinning',
      desc: 'Sourcing the finest long-staple New Zealand wool and mulberry silks, spun manually to achieve optimal tensile strength and soft luster.',
      icon: Layers
    },
    {
      step: '02',
      title: 'Botanical & Azo-Free Dyeing',
      desc: 'Formulating rich, permanent pigments using eco-certified dyes to achieve deep jewel tones resistant to fading and sunlight.',
      icon: Palette
    },
    {
      step: '03',
      title: 'Loom Setup & Knotting',
      desc: 'Artisans execute up to 250+ knots per square inch on traditional upright wooden looms, weaving generational stories into every row.',
      icon: Compass
    },
    {
      step: '04',
      title: 'Shearing, Washing & Luster',
      desc: 'Hand-embossed shearing, multiple natural herbal washes, and bevel carving to produce a silken texture and heirloom durability.',
      icon: Sparkles
    }
  ];

  const galleryItems = [
    {
      url: 'https://bhadohiartsweave.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-27-at-11.21.43.jpeg',
      title: 'Knot Density Inspection',
      tag: 'Craft Quality Audit'
    },
    {
      url: 'https://bhadohiartsweave.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-27-at-11.21.41-1.jpeg',
      title: 'Persian Medallion Weave',
      tag: 'Hand-Knotted Silk'
    },
    {
      url: 'https://bhadohiartsweave.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-27-at-11.21.41-2.jpeg',
      title: 'Upright Loom Tensioning',
      tag: 'Traditional Loom'
    },
    {
      url: 'https://bhadohiartsweave.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-27-at-11.21.42-1.jpeg',
      title: 'Pure Wool Dye Samples',
      tag: 'Color Palette Lab'
    },
    {
      url: 'https://bhadohiartsweave.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-27-at-11.21.42.jpeg',
      title: 'Rolled Runner Packaging',
      tag: 'Export Quality Dispatch'
    },
    {
      url: 'https://bhadohiartsweave.in/wp-content/uploads/2025/11/image.jpg',
      title: 'International CEPC Expo',
      tag: 'Global Exhibition'
    }
  ];

  return (
    <div className="bg-[#FAF7F0] min-h-screen pb-16">
      
      {/* 1. Top Banner with Carpet Texture & Royal Burgundy Theme */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF5EC] to-[#FAF7F0] pt-10 pb-12 border-b border-[var(--color-brand-border)]">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-multiply pointer-events-none"
          style={{ backgroundImage: `url('/images/footer-runner-bg.jpg')` }}
        />
        <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--color-brand-burgundy)]/10 text-[var(--color-brand-burgundy)] text-xs font-semibold uppercase tracking-wider mb-3 border border-[var(--color-brand-burgundy)]/15 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            Heritage &amp; Artisan Craftsmanship
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-[var(--color-brand-dark)] mb-3 font-normal leading-tight">
            Crafting Elegance <span className="text-[var(--color-brand-burgundy)] italic">Since Inception</span>
          </h1>
          <p className="font-sans text-sm md:text-base text-[var(--color-brand-muted)] max-w-2xl mx-auto leading-relaxed">
            Headquartered in Bhadohi—the celebrated Carpet Capital of India—Bhadohi Arts Weave bridges timeless weaving traditions with contemporary architectural spaces.
          </p>
        </div>
      </section>

      {/* 2. Key Stats Strip */}
      <section className="relative -mt-6 z-20 container mx-auto px-4 max-w-5xl">
        <div className="bg-white rounded-2xl border border-[var(--color-brand-border)] shadow-md grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[var(--color-brand-border)] overflow-hidden">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-5 md:p-6 text-center hover:bg-[#FAF7F0]/50 transition-colors">
              <span className="font-serif text-2xl md:text-3xl lg:text-4xl text-[var(--color-brand-burgundy)] font-bold block mb-1">
                {stat.number}
              </span>
              <p className="font-serif text-sm font-semibold text-[var(--color-brand-dark)]">
                {stat.label}
              </p>
              <p className="font-sans text-[11px] text-[var(--color-brand-muted)] mt-0.5">
                {stat.subtitle}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl mt-16 space-y-16">

        {/* 3. A Legacy of Craftsmanship Showcase */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Framed Museum Visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
              <img 
                src="https://bhadohiartsweave.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-27-at-11.21.43.jpeg" 
                alt="Carpet Weaving Knot Inspection" 
                className="w-full h-[420px] md:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Floating Quality Badge */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-[var(--color-brand-border)] shadow-lg flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[var(--color-brand-burgundy)] uppercase tracking-wider block">
                    Quality Benchmark
                  </span>
                  <p className="font-serif text-sm font-bold text-[var(--color-brand-dark)]">
                    250+ Knots / Sq. Inch Purity
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[var(--color-brand-burgundy)]/10 text-[var(--color-brand-burgundy)] flex items-center justify-center font-serif font-bold text-xs">
                  ★ 100%
                </div>
              </div>
            </div>

            {/* Subtle decorative background accent */}
            <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-[var(--color-brand-gold)]/10 rounded-3xl -z-10 blur-xl" />
          </div>

          {/* Right: Narrative Details */}
          <div className="lg:col-span-6 space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-brand-burgundy)]/10 text-[var(--color-brand-burgundy)] text-xs font-semibold uppercase tracking-wider border border-[var(--color-brand-burgundy)]/15">
              <Award className="w-3.5 h-3.5" />
              Living Tradition
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-brand-dark)] leading-tight">
              A Legacy of Craftsmanship, <br />
              <span className="text-[var(--color-brand-burgundy)] italic">Thread by Sacred Thread</span>
            </h2>
            <p className="font-sans text-sm md:text-base text-[var(--color-brand-muted)] leading-relaxed">
              Our carpets are hand-fashioned by master artisans who have inherited centuries of Persian and Indian knotting wisdom. By merging ancestral loom techniques with modern interior palettes, we craft floor art that elevates the ambiance of stately residences, boutique hotels, and corporate environments.
            </p>
            <p className="font-sans text-sm md:text-base text-[var(--color-brand-muted)] leading-relaxed">
              Every creation is born from a relationship of respect with our weavers. We champion ethical craftsmanship, ensuring fair wages, safe loom conditions, and preservation of this indigenous heritage.
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Hand-selected New Zealand Wool',
                'Chemical-Free Botanical Dyes',
                'Dual-Weft Reinforced Selvedge',
                'Direct Weaver Pricing Guarantee'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs md:text-sm font-medium text-[var(--color-brand-dark)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-brand-burgundy)] flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. The Craftsmanship Journey (4-step Process) */}
        <section className="bg-white p-8 md:p-12 rounded-3xl border border-[var(--color-brand-border)] shadow-xs relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-burgundy)] mb-1 block">
              The Artisan Process
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-brand-dark)]">
              From Raw Fleece To <span className="text-[var(--color-brand-burgundy)] italic">Heirloom</span>
            </h2>
            <p className="font-sans text-xs md:text-sm text-[var(--color-brand-muted)] mt-2">
              Every Bhadohi Arts Weave carpet passes through an unhurried, multi-week journey of artisan care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {craftSteps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-[#FAF7F0] p-6 rounded-2xl border border-[var(--color-brand-border)] relative group hover:border-[var(--color-brand-burgundy)]/40 hover:bg-white hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-2xl font-bold text-[var(--color-brand-burgundy)]/30 group-hover:text-[var(--color-brand-burgundy)] transition-colors">
                      {step.step}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white group-hover:bg-[var(--color-brand-burgundy)] text-[var(--color-brand-burgundy)] group-hover:text-white flex items-center justify-center border border-[var(--color-brand-border)] shadow-2xs transition-colors">
                      <StepIcon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-serif text-base font-bold text-[var(--color-brand-dark)] mb-2">
                    {step.title}
                  </h3>
                  <p className="font-sans text-xs text-[var(--color-brand-muted)] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Dual Vision Cards: Global & Indian Horizon */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: International Benchmark */}
          <div className="bg-gradient-to-br from-[#1E1114] to-[#120A0C] text-white p-8 md:p-10 rounded-3xl relative overflow-hidden shadow-xl border border-[#DE8B22]/20">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none"
              style={{ backgroundImage: `url('/images/footer-runner-bg.jpg')` }}
            />
            <div className="relative z-10 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DE8B22]/20 text-[#DE8B22] text-xs font-semibold uppercase tracking-wider border border-[#DE8B22]/30">
                <Globe2 className="w-3.5 h-3.5" />
                Global Track Record
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-light">
                Supplying Premium Quality to International Markets
              </h3>
              <p className="font-sans text-xs md:text-sm text-stone-300 leading-relaxed">
                Having catered to luxury hospitality groups, architectural consultancies, and private collectors worldwide, our carpets adhere strictly to international flammability (CRI Green Label), acoustic insulation, and heavy commercial foot-traffic specifications.
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center gap-4 text-xs text-stone-400">
                <span>✓ High CRI Durability</span>
                <span>✓ Custom Export Crating</span>
              </div>
            </div>
          </div>

          {/* Card 2: Domestic Excellence */}
          <div className="bg-white p-8 md:p-10 rounded-3xl relative overflow-hidden shadow-xs border border-[var(--color-brand-border)]">
            <div className="relative z-10 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-brand-burgundy)]/10 text-[var(--color-brand-burgundy)] text-xs font-semibold uppercase tracking-wider border border-[var(--color-brand-burgundy)]/15">
                <ShieldCheck className="w-3.5 h-3.5" />
                Indian Interior Revolution
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-[var(--color-brand-dark)]">
                Bringing Mill-Direct Purity to Indian Spaces
              </h3>
              <p className="font-sans text-xs md:text-sm text-[var(--color-brand-muted)] leading-relaxed">
                With India’s rapid surge in luxury apartments, boutique resorts, and commercial hubs, we are bringing world-class carpet installations directly to domestic patrons—cutting out dealer markups and guaranteeing authentic handmade quality.
              </p>
              <div className="pt-2 border-t border-[var(--color-brand-border)] flex items-center gap-4 text-xs text-[var(--color-brand-muted)] font-medium">
                <span>✓ On-Site Measurements</span>
                <span>✓ Direct Weaver Pricing</span>
              </div>
            </div>
          </div>

        </section>

        {/* 6. Beyond Manufacturing: Wall-to-Wall & Custom Spaces */}
        <section className="bg-white p-8 md:p-10 rounded-3xl border border-[var(--color-brand-border)] shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-burgundy)] block">
                Turnkey Solutions
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-brand-dark)]">
                Beyond Manufacturing: <br />
                <span className="text-[var(--color-brand-burgundy)] italic">Flawless Architectural Installation</span>
              </h2>
              <p className="font-sans text-xs md:text-sm text-[var(--color-brand-muted)] leading-relaxed">
                Our in-house master installation crews travel across India to ensure precise laser measuring, seamless seam matching, and acoustic underlay installation for large-scale wall-to-wall projects.
              </p>
              
              <div className="space-y-2.5 pt-2">
                {[
                  'Anti-bacterial & anti-fungal treatments for high-hygiene spaces',
                  'Precision laser edge trimming with invisible seams',
                  'Custom dyed yarns to match client Pantone/fabric palettes',
                  'Complete post-installation maintenance and care advisory'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-[var(--color-brand-dark)]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-[var(--color-brand-border)] group">
                <img 
                  src="https://bhadohiartsweave.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-27-at-11.21.46.jpeg" 
                  alt="Professional Carpet Installation by Bhadohi Arts Weave" 
                  className="w-full h-[320px] md:h-[360px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                  <p className="text-white text-xs md:text-sm font-sans font-medium drop-shadow-md">
                    Hotel &amp; Commercial Installation Crew on Site
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 7. Curated Bento Workshop Gallery */}
        <section>
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-burgundy)] block mb-1">
              Glimpses of Craft
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-brand-dark)]">
              Inside Our <span className="text-[var(--color-brand-burgundy)] italic">Bhadohi Workshops</span>
            </h2>
            <p className="font-sans text-xs md:text-sm text-[var(--color-brand-muted)] mt-1">
              A visual chronicle of the hands, looms, and threads shaping our floor art.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {galleryItems.map((item, idx) => (
              <div 
                key={idx} 
                className="group relative rounded-2xl overflow-hidden bg-white border border-[var(--color-brand-border)] shadow-xs aspect-[4/3] cursor-pointer"
              >
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity flex flex-col justify-end p-4 md:p-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#DE8B22] mb-1">
                    {item.tag}
                  </span>
                  <h4 className="font-serif text-sm md:text-base text-white font-medium">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Artisan Consultation & Quote CTA */}
        <section className="bg-gradient-to-r from-[var(--color-brand-dark)] to-[#3E1624] text-white p-8 md:p-12 rounded-3xl text-center relative overflow-hidden shadow-xl">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: `url('/images/footer-runner-bg.jpg')` }}
          />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DE8B22]/20 text-[#DE8B22] text-xs font-semibold uppercase tracking-wider border border-[#DE8B22]/30">
              Direct Weaver Access
            </span>
            <h2 className="font-serif text-2xl md:text-4xl font-light">
              Collaborate With Our Master Weavers
            </h2>
            <p className="font-sans text-xs md:text-sm text-white/80 leading-relaxed">
              Whether you require bespoke dimensions, custom color matching, or full turnkey hospitality flooring, our design team in Bhadohi &amp; Lucknow is ready to assist.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Link href="/contact">
                <Button className="bg-[var(--color-brand-burgundy)] hover:bg-[var(--color-brand-burgundy)]/90 text-white px-7 py-5 rounded-full font-sans font-semibold tracking-wide text-xs shadow-md inline-flex items-center gap-2">
                  Request Custom Quote <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
              <a href="https://wa.me/918558085579?text=Hello%20Bhadohi%20Arts%20Weave,%20I%20would%20like%20to%20know%20more%20about%20your%20carpets." target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 px-6 py-5 rounded-full font-sans font-semibold tracking-wide text-xs inline-flex items-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp Specialist
                </Button>
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* 9. Instagram Strip */}
      <div className="mt-16">
        <Instagram />
      </div>

    </div>
  );
}
