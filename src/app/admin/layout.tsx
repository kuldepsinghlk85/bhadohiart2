import React from 'react';
import Link from 'next/link';
import { getAdminSession } from '@/lib/adminAuth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { adminLogoutAction } from './actions';
import { ShieldCheck, LogOut, ExternalLink } from 'lucide-react';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await getAdminSession();

  // If not authenticated as admin (e.g. on /admin/login), render children directly without admin chrome
  if (!admin) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#F7F4EE] flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64 min-w-0">
        
        {/* Top Header */}
        <header className="h-16 bg-white/95 backdrop-blur-md border-b border-stone-200/80 flex items-center justify-between px-6 md:px-8 sticky top-0 z-10 shadow-xs">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold text-stone-800">Workspace Overview</h2>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Storefront
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#990E14]/10 text-[#990E14] text-[10px] font-bold uppercase tracking-wider border border-[#990E14]/20 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#DE8B22]" />
              {admin.role}
            </span>
          </div>
          
          <div className="flex items-center gap-3.5">
            {/* Quick Link to public site */}
            <Link 
              href="/" 
              target="_blank"
              className="text-xs font-semibold text-[#990E14] hover:text-[#7B090E] bg-[#FAF7F0] hover:bg-[#F3EDE2] border border-[#DE8B22]/30 px-3 py-1.5 rounded-xl transition-all shadow-2xs flex items-center gap-1.5"
            >
              <span>View Website</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <div className="h-4 w-[1px] bg-stone-200" />

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#990E14] via-[#DE8B22] to-[#7B090E] flex items-center justify-center text-white font-bold text-xs shadow-xs">
                {(admin.name || admin.email || 'A').charAt(0).toUpperCase()}
              </div>
              <div className="text-xs hidden md:block">
                <p className="text-stone-800 font-bold leading-none">{admin.name}</p>
                <p className="text-stone-400 text-[10px] mt-0.5">{admin.email}</p>
              </div>
            </div>
            
            {/* Isolated Admin Logout: Does NOT kill storefront customer session! */}
            <form action={adminLogoutAction}>
              <button 
                type="submit"
                className="text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl border border-rose-200 shadow-2xs flex items-center gap-1.5 cursor-pointer"
                title="Log out of Admin Management Suite only"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Admin Logout</span>
              </button>
            </form>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 md:p-8">
          <div className="bg-white rounded-2xl shadow-xs border border-stone-200/80 p-6 md:p-7">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
