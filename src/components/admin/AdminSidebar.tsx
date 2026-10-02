"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Package, ShoppingCart, MessageSquare, Image as ImageIcon, FolderTree, FileUp, Library, Link as LinkIcon, Palette, Video, Quote } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, iconColor: 'text-emerald-400', badgeColor: 'bg-emerald-500/20 text-emerald-300' },
    { name: 'Users & Contacts', href: '/admin/users', icon: Users, iconColor: 'text-blue-400', badgeColor: 'bg-blue-500/20 text-blue-300' },
    { name: 'Testimonials', href: '/admin/testimonials', icon: Quote, iconColor: 'text-rose-400', badgeColor: 'bg-rose-500/20 text-rose-300' },
    { name: 'Header Themes', href: '/admin/appearance', icon: Palette, iconColor: 'text-pink-400', badgeColor: 'bg-pink-500/20 text-pink-300' },
    { name: 'Video & Social', href: '/admin/social-video', icon: Video, iconColor: 'text-red-400', badgeColor: 'bg-red-500/20 text-red-300' },
    { name: 'Products', href: '/admin/products', icon: Package, iconColor: 'text-amber-400', badgeColor: 'bg-amber-500/20 text-amber-300' },
    { name: 'PDF Import', href: '/admin/products/import', icon: FileUp, iconColor: 'text-purple-400', badgeColor: 'bg-purple-500/20 text-purple-300' },
    { name: 'Categories', href: '/admin/collections', icon: FolderTree, iconColor: 'text-rose-400', badgeColor: 'bg-rose-500/20 text-rose-300' },
    { name: 'Homepage Slider', href: '/admin/homepage-slider', icon: ImageIcon, iconColor: 'text-sky-400', badgeColor: 'bg-sky-500/20 text-sky-300' },
    { name: 'Slider Config', href: '/admin/portfolio-slider', icon: ImageIcon, iconColor: 'text-cyan-400', badgeColor: 'bg-cyan-500/20 text-cyan-300' },
    { name: 'Media Library', href: '/admin/media', icon: Library, iconColor: 'text-teal-400', badgeColor: 'bg-teal-500/20 text-teal-300' },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart, iconColor: 'text-yellow-400', badgeColor: 'bg-yellow-500/20 text-yellow-300' },
    { name: 'Custom Quotes', href: '/admin/quotes', icon: LinkIcon, iconColor: 'text-orange-400', badgeColor: 'bg-orange-500/20 text-orange-300' },
    { name: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare, iconColor: 'text-indigo-400', badgeColor: 'bg-indigo-500/20 text-indigo-300' },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-[#1E1114] via-[#160D10] to-[#110A0C] text-stone-200 flex-shrink-0 min-h-screen flex flex-col fixed left-0 top-0 bottom-0 z-20 shadow-2xl border-r border-[#DE8B22]/20">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-5 bg-[#140B0D] border-b border-[#DE8B22]/20">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#990E14] via-[#DE8B22] to-[#7B090E] p-0.5 shadow-md flex items-center justify-center transition-transform group-hover:scale-105">
            <span className="text-white font-serif font-black text-xs tracking-wider">BAW</span>
          </div>
          <div>
            <p className="font-serif text-sm font-bold tracking-wider text-[#FAF7F0] group-hover:text-[#DE8B22] transition-colors">
              BHADOHI ARTS
            </p>
            <p className="text-[10px] text-[#DE8B22] font-semibold tracking-widest uppercase">
              Management Suite
            </p>
          </div>
        </Link>
      </div>

      {/* Nav List */}
      <div className="flex-1 py-5 px-3 space-y-1.5 overflow-y-auto">
        <p className="text-[10px] font-bold text-[#DE8B22] uppercase tracking-widest mb-3 px-3">
          Workspace Navigation
        </p>
        
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-xs ${
                isActive 
                  ? 'bg-gradient-to-r from-[#990E14] via-[#AB1017] to-[#7B090E] text-white font-semibold shadow-lg shadow-red-950/60 border-l-4 border-[#DE8B22]' 
                  : 'text-stone-300 hover:bg-white/8 hover:text-white'
              }`}
            >
              <Icon size={17} className={isActive ? 'text-white' : item.iconColor} />
              <span className="flex-1">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="p-3.5 border-t border-white/10 text-xs text-stone-400 flex items-center justify-between bg-[#120A0C]">
        <span className="text-[11px] text-stone-400">Bhadohi Arts Weave</span>
        <span className="px-2 py-0.5 rounded-full bg-[#DE8B22]/15 text-[#DE8B22] text-[10px] font-bold border border-[#DE8B22]/30">
          v2.0 Deluxe
        </span>
      </div>
    </aside>
  );
}
