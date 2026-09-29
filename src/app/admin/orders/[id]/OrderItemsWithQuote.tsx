"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Copy, Check, FileText } from 'lucide-react';

export default function OrderItemsWithQuote({ order }: { order: any }) {
  // Initialize all items as selected by default
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    order.items.forEach((item: any) => {
      initial[item.id] = true;
    });
    return initial;
  });

  const [loading, setLoading] = useState(false);
  const [generatedQuoteId, setGeneratedQuoteId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const toggleItem = (itemId: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const selectedCount = Object.values(selectedItems).filter(Boolean).length;

  const generateQuote = async () => {
    const selectedProductIds = order.items
      .filter((item: any) => selectedItems[item.id])
      .map((item: any) => item.productId);

    if (selectedProductIds.length === 0) {
      alert("Please select at least one item to generate a quote.");
      return;
    }

    setLoading(true);
    try {
      const customerName = order.user?.name || order.user?.email || `Customer from Order ${order.id}`;
      
      const res = await fetch('/api/admin/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          productIds: selectedProductIds
        })
      });
      
      const data = await res.json();
      if (res.ok && data.quote) {
        setGeneratedQuoteId(data.quote.id);
      } else {
        alert("Failed to generate quote.");
      }
    } catch (e) {
      console.error(e);
      alert("Error generating quote.");
    }
    setLoading(false);
  };

  const copyLink = () => {
    if (!generatedQuoteId) return;
    const url = `${window.location.origin}/quote/${generatedQuoteId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column: Order Items */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white border border-[var(--color-brand-border)] p-6">
          <div className="flex justify-between items-center mb-6 border-b border-[var(--color-brand-border)] pb-4">
            <h2 className="text-xl font-bold font-sans text-[var(--color-brand-dark)]">Items ({order.items.length})</h2>
            <div className="text-sm text-[var(--color-brand-muted)] font-bold">
              {selectedCount} Selected for Quote
            </div>
          </div>
          
          <div className="space-y-4">
            {order.items.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center border-b border-[var(--color-brand-border)] pb-4 last:border-0 last:pb-0 gap-4">
                
                {/* Checkbox */}
                <div className="flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    checked={!!selectedItems[item.id]}
                    onChange={() => toggleItem(item.id)}
                    className="w-5 h-5 accent-[var(--color-brand-burgundy)] cursor-pointer"
                  />
                </div>

                {/* Image */}
                <div className="w-20 h-20 relative bg-gray-100 flex-shrink-0 border border-gray-200">
                  {item.productImage || item.product?.images?.[0]?.url ? (
                    <Image 
                      src={item.productImage || item.product?.images?.[0]?.url} 
                      alt={item.productName || item.product?.name || 'Product'} 
                      fill 
                      className="object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Image</div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-[var(--color-brand-dark)] text-lg">{item.productName || item.product?.name || 'Product'}</h3>
                  <div className="text-sm text-[var(--color-brand-muted)] mt-1">
                    Qty: {item.quantity} 
                    {item.size && <span className="ml-2">| Size: {item.size}</span>}
                  </div>
                </div>
                <div className="font-bold text-[var(--color-brand-dark)] text-lg">
                  {typeof item.price === 'number' ? `₹${item.price.toLocaleString()}` : (item.price || 'Request Quote')}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-[var(--color-brand-border)] flex justify-between items-center bg-[#FAF7F0] p-4 rounded-md">
            <span className="font-bold text-[var(--color-brand-dark)] text-lg">Order Total</span>
            <span className="font-bold text-[var(--color-brand-burgundy)] text-xl">
              {order.total ? `₹${order.total.toLocaleString()}` : 'Request Quote'}
            </span>
          </div>
        </div>
      </div>

      {/* Right Column: Quote Generator */}
      <div className="space-y-6">
        <div className="bg-white border border-[var(--color-brand-border)] p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 border-b border-[var(--color-brand-border)] pb-4">
            <FileText className="w-5 h-5 text-[var(--color-brand-burgundy)]" />
            <h2 className="text-xl font-bold font-sans text-[var(--color-brand-dark)]">Custom Quote</h2>
          </div>
          
          <p className="text-sm text-[var(--color-brand-muted)] mb-6">
            Generate a unique quote link for the {selectedCount} selected items on the left.
          </p>

          {!generatedQuoteId ? (
            <button
              onClick={generateQuote}
              disabled={loading || selectedCount === 0}
              className="w-full bg-[var(--color-brand-burgundy)] text-white px-4 py-3 text-sm font-bold hover:bg-[#FAF7F0] hover:text-[var(--color-brand-burgundy)] hover:border hover:border-[var(--color-brand-burgundy)] transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {loading ? 'Generating...' : 'Generate Quote ID'}
            </button>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-800 font-bold mb-2">
                <Check className="w-5 h-5" />
                Quote Generated!
              </div>
              <p className="text-xs text-green-700 mb-4">ID: {generatedQuoteId}</p>
              
              <div className="flex gap-2">
                <button
                  onClick={copyLink}
                  className="flex-1 flex items-center justify-center gap-2 bg-white border border-green-300 text-green-700 py-2 rounded text-sm font-bold hover:bg-green-100 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
                <Link
                  href={`/quote/${generatedQuoteId}`}
                  target="_blank"
                  className="flex-1 flex items-center justify-center bg-green-700 text-white py-2 rounded text-sm font-bold hover:bg-green-800 transition-colors"
                >
                  View Quote
                </Link>
              </div>

              <button
                onClick={() => setGeneratedQuoteId(null)}
                className="w-full mt-3 text-xs text-gray-500 hover:text-gray-700 underline text-center block"
              >
                Generate another quote
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
