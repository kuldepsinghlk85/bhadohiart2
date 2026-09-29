"use client";

import React, { useState } from 'react';
import { HEADER_THEMES, DEFAULT_HEADER_THEME, HeaderTheme } from '@/lib/headerThemes';
import { Palette, CheckCircle2, ExternalLink, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AppearanceClientProps {
  initialThemeId: string;
}

export function AppearanceClient({ initialThemeId }: AppearanceClientProps) {
  const [activeThemeId, setActiveThemeId] = useState(initialThemeId || DEFAULT_HEADER_THEME);
  const [selectedThemeId, setSelectedThemeId] = useState(initialThemeId || DEFAULT_HEADER_THEME);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleApplyTheme = async (themeId: string) => {
    setIsSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'header_theme',
          value: themeId
        })
      });

      if (!res.ok) {
        throw new Error('Failed to update theme');
      }

      setActiveThemeId(themeId);
      setSelectedThemeId(themeId);
      setMessage({
        type: 'success',
        text: `Theme "${HEADER_THEMES[themeId]?.name}" has been applied successfully! Changes are live across the website.`
      });
    } catch (err: any) {
      setMessage({
        type: 'error',
        text: err.message || 'Error updating header theme.'
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-[var(--color-brand-border)] shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-[var(--color-brand-burgundy)]/10 text-[var(--color-brand-burgundy)]">
              <Palette className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-burgundy)]">
              Design &amp; Branding Suite
            </span>
          </div>
          <h1 className="font-serif text-2xl md:text-3xl text-[var(--color-brand-dark)]">
            Header &amp; Menu Bar Themes
          </h1>
          <p className="font-sans text-xs md:text-sm text-[var(--color-brand-muted)] max-w-2xl mt-1">
            Customize the color palette, topbar contrast, navigation accents, and quote button styling of your website header. Any change applies instantly across all desktop and mobile pages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a href="/" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="gap-2 text-xs border-[var(--color-brand-border)]">
              <ExternalLink className="w-3.5 h-3.5" />
              View Live Storefront
            </Button>
          </a>
        </div>
      </div>

      {/* Notification Message */}
      {message && (
        <div className={`p-4 rounded-xl text-xs md:text-sm flex items-center justify-between shadow-xs ${
          message.type === 'success' 
            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
            : 'bg-rose-50 text-rose-800 border border-rose-200'
        }`}>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-xs font-bold hover:underline ml-4">
            Dismiss
          </button>
        </div>
      )}

      {/* Theme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.values(HEADER_THEMES).map((theme) => {
          const isCurrentlyActive = activeThemeId === theme.id;
          const isSelected = selectedThemeId === theme.id;

          return (
            <div 
              key={theme.id}
              className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                isCurrentlyActive 
                  ? 'border-[var(--color-brand-burgundy)] ring-2 ring-[var(--color-brand-burgundy)]/20 shadow-md' 
                  : 'border-[var(--color-brand-border)] hover:border-stone-400 shadow-xs'
              }`}
            >
              {/* Theme Header & Status */}
              <div className="p-5 border-b border-[var(--color-brand-border)] flex items-start justify-between bg-stone-50/50">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-lg font-bold text-[var(--color-brand-dark)]">
                      {theme.name}
                    </h3>
                    {isCurrentlyActive && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold tracking-wide uppercase">
                        <CheckCircle2 className="w-3 h-3" /> Active Now
                      </span>
                    )}
                  </div>
                  <p className="font-sans text-xs text-[var(--color-brand-muted)] mt-1">
                    {theme.subtitle}
                  </p>
                </div>

                {/* Color Swatch Dots */}
                <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-full border border-stone-200 shadow-2xs">
                  {theme.previewColors.map((color, idx) => (
                    <span 
                      key={idx} 
                      className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs" 
                      style={{ backgroundColor: color }}
                      title={`Palette Tone ${idx + 1}: ${color}`}
                    />
                  ))}
                </div>
              </div>

              {/* Live Mini Preview Canvas */}
              <div className="p-5 flex-1 flex flex-col justify-center">
                <p className="text-[10px] uppercase font-bold text-stone-400 tracking-wider mb-2">
                  Header Visual Preview
                </p>
                
                <div className="rounded-xl overflow-hidden border border-stone-200 shadow-sm text-left">
                  {/* Top Bar Mockup */}
                  <div className={`${theme.topbarBg} ${theme.topbarText} px-3 py-1.5 text-[9px] flex justify-between items-center font-sans border-b ${theme.topbarBorder}`}>
                    <span>Free Shipping Worldwide</span>
                    <span className="opacity-80">Welcome, Super Admin | Logout</span>
                  </div>

                  {/* Header Bar Mockup */}
                  <div className={`${theme.headerBg} px-4 py-3 flex items-center justify-between border-b ${theme.headerBorder}`}>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-[#990E14] text-white flex items-center justify-center text-[8px] font-bold font-serif">
                        BAW
                      </div>
                      <span className={`text-[11px] font-serif font-bold ${theme.navText}`}>
                        BHADOHI ARTS
                      </span>
                    </div>

                    <div className="hidden sm:flex items-center gap-3 text-[10px] font-sans font-medium">
                      <span className={`${theme.navText} ${theme.navHoverText}`}>HOME</span>
                      <span className={`${theme.navText} ${theme.navHoverText}`}>COLLECTIONS</span>
                      <span className={`${theme.navText} ${theme.navHoverText}`}>WALL-TO-WALL</span>
                      <span className={`${theme.navText} ${theme.navHoverText}`}>ABOUT US</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className={`px-2.5 py-1 rounded-full text-[9px] font-semibold ${theme.quoteBtnClasses}`}>
                        GET QUOTE
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-4 bg-stone-50 border-t border-[var(--color-brand-border)] flex items-center justify-between">
                <span className="text-[11px] text-stone-500 font-mono">
                  ID: {theme.id}
                </span>

                <Button
                  onClick={() => handleApplyTheme(theme.id)}
                  disabled={isCurrentlyActive || isSaving}
                  className={`text-xs px-5 py-2 rounded-full font-sans transition-all ${
                    isCurrentlyActive 
                      ? 'bg-stone-200 text-stone-500 cursor-default' 
                      : 'bg-[var(--color-brand-burgundy)] hover:bg-[var(--color-brand-burgundy)]/90 text-white shadow-xs'
                  }`}
                >
                  {isSaving && selectedThemeId === theme.id ? (
                    <span className="flex items-center gap-1.5">
                      <RefreshCw className="w-3 h-3 animate-spin" /> Applying...
                    </span>
                  ) : isCurrentlyActive ? (
                    'Currently Applied'
                  ) : (
                    'Apply This Theme'
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
