"use client";

import React, { useState } from 'react';
import { adminLoginAction } from '../actions';
import { Lock, Mail, ShieldAlert, ArrowRight, RefreshCw, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface AdminLoginFormProps {
  fromParam?: string;
}

export function AdminLoginForm({ fromParam }: AdminLoginFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    if (fromParam) {
      formData.set('from', fromParam);
    }

    try {
      const result = await adminLoginAction(formData);
      if (result && result.error) {
        setError(result.error);
        setLoading(false);
      }
    } catch (err: any) {
      // In Next.js, redirect() throws an internal redirect error which is normal
      if (err?.message?.includes('NEXT_REDIRECT')) {
        return;
      }
      setError(err?.message || 'Authentication failed. Please check your credentials.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-start gap-2.5 animate-in fade-in">
          <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
          <span className="leading-relaxed">{error}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
          Admin Email Address
        </label>
        <div className="relative">
          <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="admin@bhadohiartsweave.com"
            className="w-full bg-[#1A0E12] border border-[#DE8B22]/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#DE8B22] focus:ring-1 focus:ring-[#DE8B22]/50 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
          Security Password
        </label>
        <div className="relative">
          <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••••••"
            className="w-full bg-[#1A0E12] border border-[#DE8B22]/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#DE8B22] focus:ring-1 focus:ring-[#DE8B22]/50 transition-all"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-2 bg-gradient-to-r from-[#990E14] via-[#B8121A] to-[#7B090E] hover:from-[#B8121A] hover:to-[#990E14] text-white py-3 px-4 rounded-xl font-sans font-semibold text-xs tracking-wider uppercase shadow-lg shadow-red-950/50 border border-[#DE8B22]/40 transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70"
      >
        {loading ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin text-white" />
            <span>Authenticating Admin...</span>
          </>
        ) : (
          <>
            <ShieldCheck className="w-4 h-4 text-[#DE8B22]" />
            <span>Sign In To Management Suite</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-stone-400">
        <Link href="/" className="hover:text-[#DE8B22] transition-colors flex items-center gap-1">
          ← Back to Storefront
        </Link>
        <Link href="/login" className="hover:text-stone-200 transition-colors">
          Customer Login
        </Link>
      </div>
    </form>
  );
}
