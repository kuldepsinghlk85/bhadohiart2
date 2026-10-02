"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingCart, MessageCircle, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { handleSignOut } from '@/actions/authActions';
import { WhatsAppInquiryModal } from '@/components/ecommerce/WhatsAppInquiryModal';
import { HEADER_THEMES, DEFAULT_HEADER_THEME } from '@/lib/headerThemes';

interface HeaderProps {
  user?: {
    id: string;
    role: string;
    name?: string | null;
    email?: string | null;
  } | null;
  admin?: {
    id: string;
    email: string;
    name: string;
    role: 'ADMIN' | 'SUPERADMIN';
  } | null;
  collections?: { name: string; slug: string }[];
  themeId?: string;
}

export function Header({ user, admin, collections = [], themeId = DEFAULT_HEADER_THEME }: HeaderProps) {
  const theme = HEADER_THEMES[themeId] || HEADER_THEMES[DEFAULT_HEADER_THEME];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  const dynamicCollectionLinks = collections.map(c => ({
    label: c.name,
    href: `/collections?category=${c.slug}`
  }));

  const navLinks = [
    { label: 'HOME', href: '/' },
    { 
      label: 'COLLECTIONS', 
      href: '/collections', 
      hasDropdown: true,
      subLinks: [
        { label: 'All Collections', href: '/collections' },
        ...dynamicCollectionLinks
      ]
    },
    { label: 'WALL-TO-WALL', href: '/wall-to-wall' },
    { label: 'ABOUT US', href: '/about' },
    { label: 'CATALOGUE', href: '/catalogue' },
    { label: 'TRACK ORDER', href: '/track-order' },
    { label: 'CONTACT', href: '/contact' },
  ];

  // 1. Customer Navigation Links
  if (user) {
    navLinks.push({ 
      label: 'MY ACCOUNT', 
      href: '/account',
      hasDropdown: true,
      subLinks: [
        { label: 'Dashboard', href: '/account' },
        { label: 'My Orders', href: '/account/orders' }
      ]
    });
  }

  // 2. Admin Workspace Link (Shown if admin session is active)
  if (admin) {
    navLinks.push({ 
      label: 'ADMIN PANEL', 
      href: '/admin',
      hasDropdown: true,
      subLinks: [
        { label: 'Dashboard', href: '/admin' },
        { label: 'Products', href: '/admin/products' },
        { label: 'Orders', href: '/admin/orders' },
        { label: 'Inquiries', href: '/admin/inquiries' },
        { label: 'Testimonials', href: '/admin/testimonials' },
        { label: 'Header Themes', href: '/admin/appearance' }
      ]
    });
  } else if (!user) {
    navLinks.push({ label: 'LOGIN', href: '/login' });
  }

  const { items: cartItems, setIsOpen: setCartOpen } = useCartStore();
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Top Bar for Admin / User Info */}
      <div className={`${theme.topbarBg} ${theme.topbarText} text-xs py-1.5 px-4 w-full z-50 relative flex justify-between items-center border-b ${theme.topbarBorder} transition-colors duration-300`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <span className="hidden sm:inline-block">Free Shipping Worldwide</span>
            <span className="hidden md:inline-block opacity-40">•</span>
            <span className="hidden md:inline-block text-[11px] opacity-80">Direct From Bhadohi Looms</span>
          </div>

          <div className="flex gap-3 sm:gap-4 items-center text-[11px] sm:text-xs">
            {/* Active Admin Workspace Indicator Badge */}
            {admin && (
              <Link 
                href="/admin" 
                className="px-2.5 py-0.5 rounded-full bg-[#DE8B22]/20 text-[#DE8B22] border border-[#DE8B22]/40 font-bold hover:bg-[#DE8B22] hover:text-[#1A0E12] transition-all flex items-center gap-1 shadow-2xs"
                title={`Logged in as ${admin.name} (${admin.role})`}
              >
                <span>👑 Admin Suite</span>
              </Link>
            )}

            {/* Customer Session Display */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link href="/account" className="font-semibold hover:underline">
                  Hi, {user.name || user.email?.split('@')[0] || 'Customer'}
                </Link>
                <span className="opacity-50">|</span>
                <Link href="/account" className="opacity-80 hover:opacity-100 hover:underline">
                  My Orders
                </Link>
                <span className="opacity-50">|</span>
                <form action={handleSignOut} className="inline">
                  <button type="submit" className={`${theme.navHoverText} transition-colors opacity-80 hover:opacity-100 cursor-pointer`}>
                    Sign Out
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className={`${theme.navHoverText} transition-colors font-medium opacity-90 hover:opacity-100`}>
                  Customer Sign In
                </Link>
                <span className="opacity-50">/</span>
                <Link href="/register" className={`${theme.navHoverText} transition-colors opacity-80 hover:opacity-100`}>
                  Register
                </Link>
              </div>
            )}

            {/* If admin is NOT logged in, show small discrete link */}
            {!admin && (
              <>
                <span className="opacity-30">|</span>
                <Link 
                  href="/admin/login" 
                  className="opacity-70 hover:opacity-100 hover:text-[#DE8B22] transition-colors"
                  title="Administrator Portal"
                >
                  Admin
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-50 w-full ${theme.headerBg} border-b ${theme.headerBorder} transition-colors duration-300 shadow-2xs`}>
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* Logo Left */}
          <div className="flex items-center py-2">
            <Link href="/" className="flex items-center">
              <img src="/logo.png" alt="Bhadohi Arts Weave Logo" className="h-14 md:h-16 w-auto object-contain drop-shadow-sm" />
            </Link>
          </div>

        {/* Desktop Navigation Center */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <div key={link.label} className="relative group py-6">
              <Link 
                href={link.href}
                className={`text-sm font-sans font-medium ${theme.navText} ${theme.navHoverText} transition-colors flex items-center gap-1`}
              >
                {link.label}
                {link.hasDropdown && <span className="text-[10px] ml-0.5 opacity-70">▼</span>}
              </Link>
              
              {/* Desktop Dropdown */}
              {link.hasDropdown && link.subLinks && (
                <div className={`absolute top-[100%] left-0 w-56 ${theme.dropdownBg} border ${theme.dropdownBorder} shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col z-50 py-2 rounded-xl overflow-hidden`}>
                  {link.subLinks.map(sub => (
                    <Link 
                      key={sub.label} 
                      href={sub.href} 
                      className={`px-5 py-2.5 text-sm font-sans ${theme.dropdownText} ${theme.dropdownHoverBg} ${theme.dropdownHoverText} transition-colors`}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button className={`${theme.iconColor} ${theme.iconHoverColor} transition-colors`}>
            <Search className="w-5 h-5" />
          </button>
          <button className={`${theme.iconColor} ${theme.iconHoverColor} transition-colors`}>
            <Heart className="w-5 h-5" />
          </button>
          <div className="relative">
            <button onClick={() => setCartOpen(true)} className={`${theme.iconColor} ${theme.iconHoverColor} transition-colors`}>
              <ShoppingCart className="w-5 h-5" />
            </button>
            {cartItemCount > 0 && (
              <span className={`absolute -top-2 -right-2 ${theme.badgeBg} ${theme.badgeText} text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center`}>
                {cartItemCount}
              </span>
            )}
          </div>
          <button className={`${theme.iconColor} ${theme.iconHoverColor} transition-colors`}>
            <MessageCircle className="w-5 h-5" />
          </button>
          <Button variant="default" size="default" className={`ml-2 rounded-full ${theme.quoteBtnClasses}`} onClick={() => setIsInquiryModalOpen(true)}>
            GET QUOTE
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex lg:hidden items-center gap-4">
          <button className={theme.iconColor}>
            <Search className="w-5 h-5" />
          </button>
          <button onClick={() => setCartOpen(true)} className={`${theme.iconColor} relative`}>
            <ShoppingCart className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className={`absolute -top-2 -right-2 ${theme.badgeBg} ${theme.badgeText} text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center`}>
                {cartItemCount}
              </span>
            )}
          </button>
          <button 
            className={theme.iconColor}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-out Menu */}
      {isMobileMenuOpen && (
        <div className={`lg:hidden absolute top-20 left-0 w-full ${theme.mobileMenuBg} border-b ${theme.headerBorder} p-4 shadow-xl z-40 flex flex-col gap-4 h-[calc(100vh-80px)] overflow-y-auto`}>
          <nav className="flex flex-col gap-4 mt-4">
            {navLinks.map((link) => (
              <div key={link.label} className={`border-b ${theme.dropdownBorder}`}>
                <div className="flex justify-between items-center pb-2">
                  <Link 
                    href={link.href}
                    className={`text-base font-sans font-medium ${theme.navText}`}
                    onClick={() => !link.hasDropdown && setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.hasDropdown && (
                    <button 
                      onClick={() => setMobileDropdownOpen(mobileDropdownOpen === link.label ? null : link.label)}
                      className={`p-1 ${theme.iconColor}`}
                    >
                      <span className="text-xs">{mobileDropdownOpen === link.label ? '▲' : '▼'}</span>
                    </button>
                  )}
                </div>
                {link.hasDropdown && mobileDropdownOpen === link.label && link.subLinks && (
                  <div className="flex flex-col gap-3 pb-3 pl-4 pt-2">
                    {link.subLinks.map(sub => (
                      <Link 
                        key={sub.label} 
                        href={sub.href}
                        className={`text-sm font-sans ${theme.dropdownText} ${theme.dropdownHoverText}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="flex gap-4 mt-6">
            <Button variant="outline" className="flex-1 justify-center gap-2 rounded-full" onClick={() => setIsInquiryModalOpen(true)}>
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </Button>
            <Button variant="default" className={`flex-1 justify-center rounded-full ${theme.quoteBtnClasses}`} onClick={() => setIsInquiryModalOpen(true)}>
              GET QUOTE
            </Button>
          </div>
        </div>
      )}
    </header>

      <WhatsAppInquiryModal 
        isOpen={isInquiryModalOpen} 
        onClose={() => setIsInquiryModalOpen(false)}
        message="Hi! I would like to get a quote or make a general inquiry."
      />
    </>
  );
}
