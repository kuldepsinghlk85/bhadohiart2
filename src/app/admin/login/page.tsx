import React from 'react';
import { getAdminSession } from '@/lib/adminAuth';
import { redirect } from 'next/navigation';
import { AdminLoginForm } from './AdminLoginForm';
import { ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Administrator Portal | Bhadohi Arts Weave',
  description: 'Secure authentication gateway for administrative staff and management.'
};

export default async function AdminLoginPage({
  searchParams
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  // If already logged in as admin, proceed directly to /admin
  const admin = await getAdminSession();
  if (admin) {
    redirect('/admin');
  }

  const resolvedParams = await searchParams;
  const fromParam = resolvedParams?.from;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A0E12] via-[#12090C] to-[#0A0507] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle carpet texture overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url('/images/footer-runner-bg.jpg')` }}
      />

      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Card */}
        <div className="bg-[#1F1216]/90 backdrop-blur-xl border border-[#DE8B22]/30 rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/80">
          
          {/* Top Logo / Shield Badge */}
          <div className="flex flex-col items-center text-center mb-7">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#990E14] via-[#DE8B22] to-[#7B090E] p-0.5 shadow-xl flex items-center justify-center mb-4 border border-[#DE8B22]/50">
              <span className="text-white font-serif font-black text-lg tracking-wider">BAW</span>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DE8B22]/15 text-[#DE8B22] text-[10px] font-bold uppercase tracking-widest border border-[#DE8B22]/30 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Administrative Gateway
            </span>

            <h1 className="font-serif text-2xl md:text-3xl text-[#FAF7F0] font-light">
              Management Portal
            </h1>
            <p className="font-sans text-xs text-stone-400 mt-1 max-w-xs">
              Separate administrative session. Operating independently from storefront customer accounts.
            </p>
          </div>

          {/* Form */}
          <AdminLoginForm fromParam={fromParam} />

        </div>

        {/* Footer info */}
        <p className="text-center text-[11px] text-stone-500 mt-6">
          © {new Date().getFullYear()} Bhadohi Arts Weave • Isolated Secure Infrastructure
        </p>
      </div>
    </div>
  );
}
