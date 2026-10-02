import React from 'react'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { Package, ShoppingCart, TrendingUp, DollarSign } from 'lucide-react'

export default async function AdminDashboardPage() {
  let totalProducts = 0, totalCollections = 0, totalOrders = 0, totalLeads = 0;
  let totalRevenue = 0;
  let recentOrders: any[] = [];
  let recentProducts: any[] = [];

  try {
    totalProducts = await prisma.product.count();
    totalCollections = await prisma.collection.count();
    totalOrders = await prisma.order.count();
    totalLeads = await prisma.lead.count();

    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5
    });
    recentOrders = orders;
  } catch (e) {
    console.error("Database connection failed on dashboard. Using JSON stores.");
    const { readJsonStore } = await import('@/lib/jsonStore');
    
    // Products
    const products = readJsonStore<any>('products.json');
    totalProducts = products.length;
    
    const globalAny: any = global;
    if (globalAny.__mockNewProducts) {
      totalProducts += globalAny.__mockNewProducts.length;
    }

    // Collections
    totalCollections = readJsonStore('collections.json').length;

    // Orders
    const orders = readJsonStore<any>('orders.json');
    totalOrders = orders.length;

    // Sort orders by date descending
    const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    recentOrders = sortedOrders.slice(0, 5);

    // Calculate total revenue (skip Request Quote / null totals)
    totalRevenue = orders.reduce((sum: number, order: any) => {
      if (order.total && typeof order.total === 'number') {
        return sum + order.total;
      }
      return sum;
    }, 0);
  }

  return (
    <div className="pb-8">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-stone-200">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mb-1">
            Admin Dashboard
          </h1>
          <p className="text-xs text-stone-500">
            कैटलॉग, ऑर्डर्स और इन्वेंट्री का लाइव सारांश (Real-time Overview &amp; Control Hub)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            System Operational
          </span>
        </div>
      </div>
      
      {/* 4 Multi-Color Stat Cards (Jewel Tones) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        
        {/* Total Products (Crimson / Burgundy) */}
        <div className="bg-white p-5 rounded-2xl border-t-4 border-rose-600 border-x border-b border-stone-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500 to-[#990E14] text-white flex items-center justify-center shadow-xs">
              <Package className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
              Live Stock
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-black text-stone-900">{totalProducts}</h3>
            <p className="text-xs font-semibold text-stone-500 mt-1 uppercase tracking-wider">Total Products</p>
          </div>
        </div>

        {/* Total Orders (Imperial Amber / Gold) */}
        <div className="bg-white p-5 rounded-2xl border-t-4 border-amber-500 border-x border-b border-stone-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-[#DE8B22] text-white flex items-center justify-center shadow-xs">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              Inquiries &amp; Orders
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-black text-stone-900">{totalOrders}</h3>
            <p className="text-xs font-semibold text-stone-500 mt-1 uppercase tracking-wider">Total Orders</p>
          </div>
        </div>

        {/* Orders this month (Emerald Green) */}
        <div className="bg-white p-5 rounded-2xl border-t-4 border-emerald-600 border-x border-b border-stone-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center shadow-xs">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              This Month
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-black text-stone-900">{totalOrders}</h3>
            <p className="text-xs font-semibold text-stone-500 mt-1 uppercase tracking-wider">Monthly Activity</p>
          </div>
        </div>

        {/* Total Revenue (Sapphire Blue / Indigo) */}
        <div className="bg-white p-5 rounded-2xl border-t-4 border-indigo-600 border-x border-b border-stone-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white flex items-center justify-center shadow-xs">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              Verified Value
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-black text-stone-900">₹{totalRevenue.toLocaleString()}</h3>
            <p className="text-xs font-semibold text-stone-500 mt-1 uppercase tracking-wider">Total Revenue</p>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Multi-Color Quick Management Links */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF7F0]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#990E14] text-white flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-stone-900">Quick Actions &amp; Portals</h2>
            </div>
            <span className="text-xs text-stone-400">Shortcuts</span>
          </div>
          <div className="p-5">
            <ul className="space-y-3">
              <li>
                <Link href="/admin/products" className="group flex items-center justify-between p-3.5 bg-rose-50/40 hover:bg-rose-50 rounded-xl border border-rose-100 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
                      PR
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-stone-900 group-hover:text-rose-700 transition-colors">Manage Products</h3>
                      <p className="text-[11px] text-stone-500">Add, edit, or remove carpet designs</p>
                    </div>
                  </div>
                  <span className="text-rose-600 font-bold group-hover:translate-x-1 transition-transform text-sm">→</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/collections" className="group flex items-center justify-between p-3.5 bg-amber-50/40 hover:bg-amber-50 rounded-xl border border-amber-100 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                      CL
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-stone-900 group-hover:text-amber-800 transition-colors">Manage Categories</h3>
                      <p className="text-[11px] text-stone-500">Organize portfolios &amp; catalog categories</p>
                    </div>
                  </div>
                  <span className="text-amber-700 font-bold group-hover:translate-x-1 transition-transform text-sm">→</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/orders" className="group flex items-center justify-between p-3.5 bg-emerald-50/40 hover:bg-emerald-50 rounded-xl border border-emerald-100 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                      OD
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-stone-900 group-hover:text-emerald-800 transition-colors">View All Orders</h3>
                      <p className="text-[11px] text-stone-500">Check tracking, customer info &amp; dispatch</p>
                    </div>
                  </div>
                  <span className="text-emerald-700 font-bold group-hover:translate-x-1 transition-transform text-sm">→</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/inquiries" className="group flex items-center justify-between p-3.5 bg-indigo-50/40 hover:bg-indigo-50 rounded-xl border border-indigo-100 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-xs">
                      IQ
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-stone-900 group-hover:text-indigo-800 transition-colors">Customer Inquiries</h3>
                      <p className="text-[11px] text-stone-500">Direct inquiries from website contact form</p>
                    </div>
                  </div>
                  <span className="text-indigo-700 font-bold group-hover:translate-x-1 transition-transform text-sm">→</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/users" className="group flex items-center justify-between p-3.5 bg-blue-50/40 hover:bg-blue-50 rounded-xl border border-blue-100 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                      UC
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-stone-900 group-hover:text-blue-800 transition-colors">Users &amp; Contacts</h3>
                      <p className="text-[11px] text-stone-500">View customer logins, emails, phones &amp; addresses</p>
                    </div>
                  </div>
                  <span className="text-blue-700 font-bold group-hover:translate-x-1 transition-transform text-sm">→</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Recent Orders with Color Badges */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF7F0]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-stone-900">हाल के ऑर्डर्स (Recent Orders)</h2>
            </div>
            <Link href="/admin/orders" className="text-xs font-bold text-[#990E14] hover:text-[#7B090E] transition-colors">
              View All →
            </Link>
          </div>
          <div className="p-5">
            <div className="space-y-3">
              {recentOrders.length === 0 ? (
                <div className="text-center py-8 text-stone-400 text-xs">
                  No recent orders yet.
                </div>
              ) : (
                recentOrders.map((order) => (
                  <Link href={`/admin/orders/${order.id}`} key={order.id} className="block group">
                    <div className="flex items-center justify-between p-3.5 bg-stone-50 hover:bg-[#FAF7F0] rounded-xl border border-stone-200/70 transition-all">
                      <div>
                        <h3 className="font-bold text-xs text-[#990E14] group-hover:underline">
                          #{order.id.slice(-8).toUpperCase()}
                        </h3>
                        <p className="text-[11px] text-stone-500 mt-0.5">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xs text-stone-900">
                          {order.total ? `₹${order.total.toLocaleString()}` : 'Quote Request'}
                        </p>
                        <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 capitalize mt-0.5">
                          {order.status || 'Received'}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
