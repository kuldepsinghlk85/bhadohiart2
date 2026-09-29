import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { format } from 'date-fns';

export default async function AdminOrdersPage() {
  let orders: any[] = []; 
  try { 
    orders = await prisma.order.findMany({
      include: {
        user: true,
        items: true
      },
      orderBy: { createdAt: 'desc' }
    }); 
  } catch(e) {
    const { readJsonStore } = await import('@/lib/jsonStore');
    orders = readJsonStore<any>('orders.json');
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif text-[var(--color-brand-dark)]">Manage Orders</h1>
      </div>

      <div className="bg-white border border-[var(--color-brand-border)] overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAF7F0] border-b border-[var(--color-brand-border)] text-[var(--color-brand-dark)]">
              <th className="p-4 font-bold text-sm">Order ID</th>
              <th className="p-4 font-bold text-sm">Date</th>
              <th className="p-4 font-bold text-sm">Customer</th>
              <th className="p-4 font-bold text-sm">Items</th>
              <th className="p-4 font-bold text-sm">Total</th>
              <th className="p-4 font-bold text-sm">Status</th>
              <th className="p-4 font-bold text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-[var(--color-brand-muted)]">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map(order => (
                <tr key={order.id} className="border-b border-[var(--color-brand-border)] hover:bg-[#FAF7F0]">
                  <td className="p-4 text-sm font-mono text-[var(--color-brand-muted)]">{order.id.slice(-6).toUpperCase()}</td>
                  <td className="p-4 text-sm">{format(new Date(order.createdAt), 'MMM d, yyyy')}</td>
                  <td className="p-4 text-sm">{order.user.name || order.user.email || 'Guest'}</td>
                  <td className="p-4 text-sm">{order.items.length} items</td>
                  <td className="p-4 text-sm font-bold">
                    {order.total ? `₹${order.total.toLocaleString()}` : 'Request Quote'}
                  </td>
                  <td className="p-4 text-sm">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                      order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                      order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-right">
                    <Link href={`/admin/orders/${order.id}`} className="text-[var(--color-brand-burgundy)] hover:underline font-bold text-xs">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
