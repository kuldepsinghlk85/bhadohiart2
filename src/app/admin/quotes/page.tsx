"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, Link as LinkIcon, Plus, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const cust = params.get('customer');
      const prods = params.get('products');
      if (cust) setCustomerName(cust);
      if (prods) {
        setSelectedProducts(prods.split(','));
        // Clean URL to avoid refresh keeping it
        window.history.replaceState(null, '', '/admin/quotes');
      }
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/quotes');
      const data = await res.json();
      setQuotes(data.quotes || []);
      setProducts(data.products || []);
    } catch (e) {
      console.error("Failed to fetch data", e);
    }
    setLoading(false);
  };

  const createQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || selectedProducts.length === 0) return alert("Please enter a customer name and select at least one product.");
    
    try {
      const res = await fetch('/api/admin/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          productIds: selectedProducts
        })
      });
      if (res.ok) {
        setCustomerName('');
        setSelectedProducts([]);
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteQuote = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`/api/admin/quotes?id=${id}`, { method: 'DELETE' });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const toggleProduct = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(p => p !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const copyLink = (id: string) => {
    const link = `${window.location.origin}/quote/${id}`;
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Private Quotation Links</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold mb-4">Create New Private Link</h2>
          <form onSubmit={createQuote}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name / ID</label>
              <input 
                type="text" 
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="e.g. John Doe or CUST-102"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Products to Showcase ({selectedProducts.length} selected)</label>
              <div className="max-h-64 overflow-y-auto border rounded-md p-2 space-y-2">
                {products.length === 0 && <p className="text-sm text-gray-500">No products available.</p>}
                {products.map(p => (
                  <div key={p.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer" onClick={() => toggleProduct(p.id)}>
                    <input 
                      type="checkbox" 
                      checked={selectedProducts.includes(p.id)}
                      readOnly
                      className="h-4 w-4 text-orange-600"
                    />
                    <img src={p.image || p.images?.[0]?.url || '/images/placeholder.png'} className="w-10 h-10 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.collectionId || 'No Category'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
              <Plus className="w-4 h-4 mr-2" /> Generate Private Link
            </Button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 font-bold text-sm text-gray-700">Customer</th>
                <th className="p-4 font-bold text-sm text-gray-700">Date Created</th>
                <th className="p-4 font-bold text-sm text-gray-700">Products</th>
                <th className="p-4 font-bold text-sm text-gray-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="p-8 text-center text-gray-500">Loading...</td></tr>
              ) : quotes.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-gray-500">No private quotation links generated yet.</td></tr>
              ) : (
                quotes.map(quote => (
                  <tr key={quote.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 font-medium">{quote.customerName}</td>
                    <td className="p-4 text-sm text-gray-500">{new Date(quote.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-sm">{quote.productIds.length} items</td>
                    <td className="p-4 text-right flex justify-end gap-2">
                      <Button type="button" variant="outline" size="sm" onClick={() => copyLink(quote.id)}>
                        {copiedId === quote.id ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                      </Button>
                      <Link href={`/quote/${quote.id}`} target="_blank">
                        <Button type="button" variant="outline" size="sm"><LinkIcon className="w-4 h-4" /></Button>
                      </Link>
                      <Button type="button" variant="destructive" size="sm" onClick={() => deleteQuote(quote.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
