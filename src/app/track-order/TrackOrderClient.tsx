'use client';

import React, { useState } from 'react';
import { Search, Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import Image from 'next/image';
import { format } from 'date-fns';

export default function TrackOrderClient() {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [order, setOrder] = useState<any>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError('');
    setOrder(null);

    try {
      // Clean the order ID (users sometimes copy/paste "ID: ORD-123")
      const cleanId = orderId.trim().replace(/^ID:\s*/i, '');
      const res = await fetch(`/api/orders/${cleanId}`);
      
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('Order not found. Please check your Order ID.');
        }
        throw new Error('Failed to fetch order details.');
      }

      const data = await res.json();
      setOrder(data.order);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'PENDING': return <Clock className="w-8 h-8 text-yellow-500" />;
      case 'PROCESSING': return <Package className="w-8 h-8 text-blue-500" />;
      case 'COMPLETED': return <CheckCircle className="w-8 h-8 text-green-500" />;
      case 'CANCELLED': return <XCircle className="w-8 h-8 text-red-500" />;
      default: return <Package className="w-8 h-8 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-8 border border-[var(--color-brand-border)] mb-8">
        <h2 className="font-serif text-2xl text-[var(--color-brand-dark)] mb-6 text-center">Enter Your Order ID</h2>
        
        <form onSubmit={handleTrack} className="flex gap-4">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="e.g. ORD-123456 or cly..."
            className="flex-1 border border-[var(--color-brand-border)] p-4 outline-none focus:border-[var(--color-brand-burgundy)]"
            required
          />
          <button 
            type="submit" 
            disabled={loading}
            className="bg-[var(--color-brand-burgundy)] text-white px-8 py-4 font-bold tracking-widest hover:bg-[var(--color-brand-dark)] transition-colors disabled:opacity-70 flex items-center gap-2"
          >
            {loading ? 'SEARCHING...' : <><Search className="w-5 h-5" /> TRACK</>}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-700 border border-red-200">
            {error}
          </div>
        )}
      </div>

      {order && (
        <div className="bg-white p-8 border border-[var(--color-brand-border)] animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-8 border-b border-[var(--color-brand-border)] gap-6">
            <div>
              <p className="text-sm text-[var(--color-brand-muted)] uppercase tracking-widest mb-1">Order ID</p>
              <h3 className="font-mono text-xl text-[var(--color-brand-dark)] font-bold">{order.id}</h3>
              <p className="text-sm text-[var(--color-brand-muted)] mt-2">Placed on {format(new Date(order.createdAt), 'MMMM do, yyyy')}</p>
            </div>
            
            <div className="flex items-center gap-4 bg-[#FAF7F0] p-4 pr-8">
              {getStatusIcon(order.status)}
              <div>
                <p className="text-sm text-[var(--color-brand-muted)] uppercase tracking-widest mb-1">Current Status</p>
                <p className="font-bold text-[var(--color-brand-dark)]">{order.status}</p>
              </div>
            </div>
          </div>

          <h4 className="font-bold text-[var(--color-brand-dark)] uppercase tracking-widest text-sm mb-6">Items in this order</h4>
          
          <div className="space-y-6">
            {order.items.map((item: any) => (
              <div key={item.id} className="flex gap-6 items-center">
                <div className="w-20 h-24 relative bg-gray-100 flex-shrink-0">
                  <Image src={item.productImage} alt={item.productName} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h5 className="font-serif text-lg text-[var(--color-brand-dark)]">{item.productName}</h5>
                  <p className="text-sm text-[var(--color-brand-muted)] mb-2">Size: {item.size || 'Standard'}</p>
                  <p className="font-bold text-sm">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[var(--color-brand-dark)]">
                    {typeof item.price === 'number' ? `₹${item.price.toLocaleString()}` : (item.price || 'Request Quote')}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-8 border-t border-[var(--color-brand-border)] flex justify-between items-center">
            <span className="font-bold text-[var(--color-brand-dark)] uppercase tracking-widest">Order Total</span>
            <span className="font-bold text-2xl text-[var(--color-brand-burgundy)]">
              {order.total ? `₹${order.total.toLocaleString()}` : 'Request Quote'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
