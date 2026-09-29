import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#240507] via-[#38080C] to-[#1C0305] text-[#F5EFEB] border-t-2 border-[#DE8B22]">
      {/* Authentic Carpet Texture Background with Full Color Blend */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity pointer-events-none"
        style={{ backgroundImage: `url('/images/footer-runner-bg.jpg')` }}
      />
      {/* Rich Royal Burgundy Gradient Veil */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1C0305]/95 via-[#38080C]/85 to-[#1C0305]/95 pointer-events-none" />

      {/* Decorative Golden Accent Stripe at Top */}
      <div className="relative h-[2px] w-full bg-gradient-to-r from-transparent via-[#DE8B22] to-transparent opacity-90" />

      <div className="relative z-10 container max-w-6xl mx-auto px-4 py-5">
        {/* Top Tier: Brand, Socials & Contact */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 pb-4 border-b border-white/15">
          {/* Brand & Socials */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
            <Link 
              href="/" 
              className="inline-block p-1.5 bg-white rounded-xl border border-[#DE8B22]/50 shadow-md hover:shadow-lg transition-all"
            >
              <img
                src="/logo.png"
                alt="Bhadohi Arts Weave Logo"
                className="h-10 md:h-11 w-auto object-contain"
              />
            </Link>
            <div className="hidden sm:block h-8 w-[1px] bg-white/20" />
            <div>
              <p className="text-xs font-serif font-bold text-[#F3E5D8] tracking-widest uppercase">
                Bhadohi Arts Weave
              </p>
              <p className="text-[11px] text-[#D8C7B8] max-w-xs leading-snug">
                Handcrafted luxury carpets &amp; rugs direct from the carpet capital of India.
              </p>
            </div>
            
            {/* Social Icons with frosted circular badges */}
            <div className="flex items-center gap-2 text-[#F5EFEB]">
              <Link 
                href="#" 
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#DE8B22] hover:text-[#171212] border border-white/20 hover:border-[#DE8B22] flex items-center justify-center transition-all shadow-xs" 
                aria-label="Facebook"
              >
                <FaFacebook className="w-3.5 h-3.5" />
              </Link>
              <Link 
                href="#" 
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#DE8B22] hover:text-[#171212] border border-white/20 hover:border-[#DE8B22] flex items-center justify-center transition-all shadow-xs" 
                aria-label="Instagram"
              >
                <FaInstagram className="w-3.5 h-3.5" />
              </Link>
              <Link 
                href="#" 
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#DE8B22] hover:text-[#171212] border border-white/20 hover:border-[#DE8B22] flex items-center justify-center transition-all shadow-xs" 
                aria-label="YouTube"
              >
                <FaYoutube className="w-3.5 h-3.5" />
              </Link>
              <Link 
                href="#" 
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#DE8B22] hover:text-[#171212] border border-white/20 hover:border-[#DE8B22] flex items-center justify-center transition-all shadow-xs" 
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Quick Contact Bar as Frosted Glass Capsules */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-xs">
            <a 
              href="tel:+918558085579" 
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-[#DE8B22] shadow-xs text-[#FDFBF7] transition-all"
            >
              <div className="w-5 h-5 rounded-full bg-[#DE8B22]/25 text-[#DE8B22] flex items-center justify-center">
                <Phone className="w-3 h-3" />
              </div>
              <span className="font-medium">+91 8558085579</span>
            </a>

            <a 
              href="mailto:atozcarpetlucknow@gmail.com" 
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-[#DE8B22] shadow-xs text-[#FDFBF7] transition-all"
            >
              <div className="w-5 h-5 rounded-full bg-[#DE8B22]/25 text-[#DE8B22] flex items-center justify-center">
                <Mail className="w-3 h-3" />
              </div>
              <span className="font-medium">atozcarpetlucknow@gmail.com</span>
            </a>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xs text-[#D8C7B8]">
              <div className="w-5 h-5 rounded-full bg-[#DE8B22]/25 text-[#DE8B22] flex items-center justify-center">
                <MapPin className="w-3 h-3" />
              </div>
              <span>Lucknow - 226001</span>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Horizontal Links & Copyright */}
        <div className="pt-3 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#C5B7A8]">
          <p>© {new Date().getFullYear()} Bhadohi Arts Weave. All Rights Reserved.</p>
          
          {/* Horizontal Links */}
          <nav className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-medium">
            <Link href="/track-order" className="hover:text-[#DE8B22] text-[#D8C7B8] transition-colors">
              Track Order
            </Link>
            <span className="text-[#DE8B22]/40">•</span>
            <Link href="#" className="hover:text-[#DE8B22] text-[#D8C7B8] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-[#DE8B22]/40">•</span>
            <Link href="#" className="hover:text-[#DE8B22] text-[#D8C7B8] transition-colors">
              Terms &amp; Conditions
            </Link>
            <span className="text-[#DE8B22]/40">•</span>
            <Link href="#" className="hover:text-[#DE8B22] text-[#D8C7B8] transition-colors">
              Shipping &amp; Returns
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
