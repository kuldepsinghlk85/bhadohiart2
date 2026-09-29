import React from 'react';
import Link from 'next/link';
import { auth, signOut } from '@/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login?callbackUrl=/account');
  }

  const { readJsonStore } = await import('@/lib/jsonStore');
  
  let user: any = {
    email: session.user.email,
    name: session.user.name || session.user.email,
    orders: [],
    quotes: []
  };

  try {
    const orders = readJsonStore<any>('orders.json') || [];
    user.orders = orders.filter((o: any) => o.customerEmail === session.user.email || o.customerName === session.user.name);
    
    const quotes = readJsonStore<any>('quotes.json') || [];
    user.quotes = quotes.filter((q: any) => q.customerEmail === session.user.email || q.customerName === session.user.name);
  } catch (error) {
    console.error("Failed to load JSON data for /account:", error);
  }

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="bg-[#FAF7F0] min-h-[80vh] pt-8 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="font-serif text-4xl text-[var(--color-brand-dark)] mb-2">My Account</h1>
            <p className="text-[var(--color-brand-muted)]">Welcome back, {user.name || user.email}</p>
          </div>
          <form action={async () => {
            "use server"
            await signOut({ redirectTo: '/login' })
          }}>
            <Button variant="outline" className="font-bold">
              Sign Out
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Sidebar Menu */}
          <div className="md:col-span-1 space-y-2">
            <Link href="/account" className="block w-full text-left bg-[var(--color-brand-dark)] text-white px-4 py-3 font-bold text-sm">
              My Dashboard
            </Link>
            <Link href="/cart" className="block w-full text-left bg-white text-[var(--color-brand-dark)] border border-[var(--color-brand-border)] hover:bg-[#FAF7F0] px-4 py-3 font-bold text-sm transition-colors">
              My Cart
            </Link>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-8">
            
            {/* Quotes & Responses */}
            <div className="bg-white border border-[var(--color-brand-burgundy)] shadow-sm">
              <div className="p-6 border-b border-[var(--color-brand-burgundy)] bg-[#FAF7F0]">
                <h2 className="font-bold text-xl text-[var(--color-brand-burgundy)]">Admin Responses & Quotes</h2>
                <p className="text-sm text-[var(--color-brand-muted)] mt-1">Private links specially generated for you by the admin.</p>
              </div>
              
              <div className="p-0">
                {user.quotes.length === 0 ? (
                  <div className="p-8 text-center text-[var(--color-brand-muted)]">
                    <p>No custom quotes or responses received yet.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white text-[var(--color-brand-dark)] border-b border-[var(--color-brand-border)]">
                          <th className="p-4 font-bold text-xs uppercase tracking-wider">Quote ID</th>
                          <th className="p-4 font-bold text-xs uppercase tracking-wider">Date</th>
                          <th className="p-4 font-bold text-xs uppercase tracking-wider">Status</th>
                          <th className="p-4 font-bold text-xs uppercase tracking-wider">Products</th>
                          <th className="p-4 font-bold text-xs uppercase tracking-wider text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {user.quotes.map((quote: any) => (
                          <tr key={quote.id} className="border-b border-[var(--color-brand-border)] hover:bg-[#FAF7F0]">
                            <td className="p-4 font-mono text-sm font-bold text-[var(--color-brand-dark)]">{quote.id}</td>
                            <td className="p-4 text-sm text-[var(--color-brand-dark)]">{format(new Date(quote.createdAt), 'MMM d, yyyy')}</td>
                            <td className="p-4 text-sm text-[var(--color-brand-dark)]">
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">READY</span>
                            </td>
                            <td className="p-4 text-sm text-[var(--color-brand-dark)]">
                              {quote.productIds?.length || 0} items
                            </td>
                            <td className="p-4 text-right">
                              <Link href={`/quote/${quote.id}`}>
                                <Button className="bg-[var(--color-brand-burgundy)] text-white hover:bg-[#5a1b24] h-8 text-xs font-bold">
                                  View Private Link
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Order History */}
            <div className="bg-white border border-[var(--color-brand-border)] shadow-sm">
              <div className="p-6 border-b border-[var(--color-brand-border)]">
                <h2 className="font-bold text-xl text-[var(--color-brand-dark)]">Order / Inquiry History</h2>
              </div>
              
              <div className="p-0">
                {user.orders.length === 0 ? (
                  <div className="p-8 text-center text-[var(--color-brand-muted)]">
                    <p className="mb-4">You haven't placed any orders yet.</p>
                    <Link href="/collections">
                      <Button className="bg-[var(--color-brand-burgundy)] text-white hover:bg-[#5a1b24]">
                        Start Shopping
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#FAF7F0] text-[var(--color-brand-dark)] border-b border-[var(--color-brand-border)]">
                          <th className="p-4 font-bold text-xs uppercase tracking-wider">Order ID</th>
                          <th className="p-4 font-bold text-xs uppercase tracking-wider">Date</th>
                          <th className="p-4 font-bold text-xs uppercase tracking-wider">Status</th>
                          <th className="p-4 font-bold text-xs uppercase tracking-wider text-right">Total</th>
                          <th className="p-4 font-bold text-xs uppercase tracking-wider text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {user.orders.map((order: any) => (
                          <tr key={order.id} className="border-b border-[var(--color-brand-border)] hover:bg-[#FAF7F0]">
                            <td className="p-4 font-mono text-sm text-[var(--color-brand-muted)]">#{order.id.slice(-8).toUpperCase()}</td>
                            <td className="p-4 text-sm text-[var(--color-brand-dark)]">{format(new Date(order.createdAt), 'MMM d, yyyy')}</td>
                            <td className="p-4 text-sm text-[var(--color-brand-dark)]">
                              <span className="font-bold text-[var(--color-brand-burgundy)]">{order.status || 'PENDING'}</span>
                            </td>
                            <td className="p-4 text-sm font-bold text-[var(--color-brand-dark)] text-right">
                              {order.total ? `₹${order.total.toLocaleString()}` : 'N/A'}
                            </td>
                            <td className="p-4 text-right">
                              <Link href={`/account/orders/${order.id}`}>
                                <Button variant="outline" size="sm" className="h-8 text-xs font-bold">
                                  View / Track
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
