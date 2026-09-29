import React from 'react';
import { Mail, Phone, MapPin, MessageSquare, Award } from 'lucide-react';
import { ContactForm } from './ContactForm';

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const resolvedParams = await searchParams;
  const productSlug = resolvedParams.product;
  let defaultMessage = "";
  if (productSlug) {
    const formattedName = productSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    defaultMessage = `I would like to request a quote for the ${formattedName}. Please provide pricing and sizing details.`;
  }

  return (
    <div className="bg-[#FAF7F0] min-h-screen pb-14">
      {/* Top Banner with carpet texture & rich brand color theme */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF5EC] to-[#FAF7F0] pt-8 pb-8 border-b border-[var(--color-brand-border)]">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-multiply pointer-events-none"
          style={{ backgroundImage: `url('/images/footer-runner-bg.jpg')` }}
        />
        <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-brand-burgundy)]/10 text-[var(--color-brand-burgundy)] text-xs font-semibold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5" />
            Direct From Weaver &amp; Artisan Hub
          </span>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[var(--color-brand-dark)] mb-2 font-normal">
            Get In <span className="text-[var(--color-brand-burgundy)] italic">Touch</span>
          </h1>
          <p className="font-sans text-sm md:text-base text-[var(--color-brand-muted)] max-w-xl mx-auto leading-relaxed">
            Have a custom design inquiry, size requirement, or bulk project? Our carpet specialists in Bhadohi &amp; Lucknow are at your service.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <div className="container mx-auto px-4 max-w-5xl mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Information (Left: 5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-2xl border border-[var(--color-brand-border)] shadow-xs relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--color-brand-burgundy)] via-[var(--color-brand-gold)] to-[var(--color-brand-burgundy)]" />
            
            <h2 className="font-serif text-2xl text-[var(--color-brand-dark)] mb-1">
              Direct Contact
            </h2>
            <p className="text-xs text-[var(--color-brand-muted)] mb-6">
              Connect directly with our master weavers and customer support.
            </p>
            
            <div className="flex flex-col gap-5">
              {/* Phone */}
              <div className="flex items-start gap-4 p-3.5 rounded-xl bg-[#FAF7F0] border border-[var(--color-brand-border)]/70 hover:border-[var(--color-brand-burgundy)] transition-colors">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--color-brand-burgundy)] to-[var(--color-brand-burgundy-dark)] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[var(--color-brand-muted)] mb-0.5">Call / WhatsApp</h4>
                  <a href="tel:+918558085579" className="font-semibold text-[var(--color-brand-dark)] hover:text-[var(--color-brand-burgundy)] text-sm transition-colors">
                    +91 8558085579
                  </a>
                  <p className="text-[11px] text-[var(--color-brand-muted)] mt-0.5">Mon - Sat, 9:00 AM - 8:00 PM</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-3.5 rounded-xl bg-[#FAF7F0] border border-[var(--color-brand-border)]/70 hover:border-[var(--color-brand-burgundy)] transition-colors">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--color-brand-burgundy)] to-[var(--color-brand-burgundy-dark)] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[var(--color-brand-muted)] mb-0.5">Email Inquiries</h4>
                  <a href="mailto:atozcarpetlucknow@gmail.com" className="font-semibold text-[var(--color-brand-dark)] hover:text-[var(--color-brand-burgundy)] text-sm break-all transition-colors">
                    atozcarpetlucknow@gmail.com
                  </a>
                  <p className="text-[11px] text-[var(--color-brand-muted)] mt-0.5">Expect response within 2-4 hours</p>
                </div>
              </div>

              {/* Office Address */}
              <div className="flex items-start gap-4 p-3.5 rounded-xl bg-[#FAF7F0] border border-[var(--color-brand-border)]/70 hover:border-[var(--color-brand-burgundy)] transition-colors">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--color-brand-burgundy)] to-[var(--color-brand-burgundy-dark)] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[var(--color-brand-muted)] mb-0.5">Showroom &amp; Office</h4>
                  <p className="text-[var(--color-brand-dark)] text-sm leading-relaxed">
                    Flat No G-1, Awasthi Green Apartment,<br />
                    Prag Narayan Road, Lucknow - 226001,<br />
                    Uttar Pradesh, India
                  </p>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp CTA Card */}
            <div className="mt-6 pt-5 border-t border-[var(--color-brand-border)]">
              <a 
                href="https://wa.me/918558085579?text=Hello%2C%20I%20am%20interested%20in%20custom%20carpets%20from%20Bhadohi%20Arts%20Weave." 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-xs tracking-wider uppercase shadow-xs hover:shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                Chat on WhatsApp Now
              </a>
            </div>
          </div>

          {/* Contact Form (Right: 7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl border border-[var(--color-brand-border)] shadow-xs relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--color-brand-burgundy)] via-[var(--color-brand-gold)] to-[var(--color-brand-burgundy)]" />

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-serif text-2xl text-[var(--color-brand-dark)]">
                  Send an Inquiry
                </h2>
                <p className="text-xs text-[var(--color-brand-muted)] mt-0.5">
                  Fill in your details for custom sizing, quotes or samples.
                </p>
              </div>
              <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-[var(--color-brand-cream)] text-[11px] font-semibold text-[var(--color-brand-burgundy)] border border-[var(--color-brand-border)]">
                Fast Turnaround
              </span>
            </div>
            
            <ContactForm defaultMessage={defaultMessage} />
          </div>

        </div>
      </div>
    </div>
  );
}
