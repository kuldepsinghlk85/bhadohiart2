"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Edit, Eye, Trash2, Archive, CheckSquare, Square } from 'lucide-react';
import { bulkDeleteProducts, bulkArchiveProducts } from './actions';

export function ProductListClient({ products }: { products: any[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleSelectAll = () => {
    if (selectedIds.length === products.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map(p => p.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(itemId => itemId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (confirm(`Are you sure you want to permanently delete ${selectedIds.length} products? This action cannot be undone.`)) {
      setLoading(true);
      await bulkDeleteProducts(selectedIds);
      setSelectedIds([]);
      setLoading(false);
    }
  };

  const handleBulkArchive = async () => {
    if (selectedIds.length === 0) return;
    if (confirm(`Are you sure you want to archive (hide) ${selectedIds.length} products?`)) {
      setLoading(true);
      await bulkArchiveProducts(selectedIds);
      setSelectedIds([]);
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Bulk Actions Header */}
      {selectedIds.length > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-200 p-4 mb-4 rounded-xl flex items-center justify-between sticky top-4 z-10 shadow-md">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#990E14] text-xs uppercase tracking-wider">{selectedIds.length} products selected</span>
          </div>
          <div className="flex gap-2.5">
            <button 
              onClick={handleBulkArchive}
              disabled={loading}
              className="bg-white border border-stone-300 text-stone-700 px-3.5 py-1.5 text-xs font-bold rounded-xl flex items-center gap-1.5 hover:bg-stone-50 transition-colors shadow-2xs disabled:opacity-50"
            >
              <Archive size={15} />
              Archive
            </button>
            <button 
              onClick={handleBulkDelete}
              disabled={loading}
              className="bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-1.5 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs disabled:opacity-50"
            >
              <Trash2 size={15} />
              Delete Selected
            </button>
          </div>
        </div>
      )}

      <div className="border border-stone-200 rounded-xl overflow-hidden shadow-2xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAF7F0] border-b border-stone-200 text-stone-600 uppercase text-[11px] font-bold tracking-wider">
              <th className="p-3.5 pl-4 w-12">
                <button onClick={toggleSelectAll} className="text-stone-400 hover:text-[#990E14] transition-colors">
                  {selectedIds.length === products.length && products.length > 0 ? (
                    <CheckSquare size={18} className="text-[#990E14]" />
                  ) : (
                    <Square size={18} />
                  )}
                </button>
              </th>
              <th className="p-3.5 font-bold">Image &amp; Product</th>
              <th className="p-3.5 font-bold">Collection</th>
              <th className="p-3.5 font-bold">Price Mode</th>
              <th className="p-3.5 font-bold">Status</th>
              <th className="p-3.5 pr-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-xs">
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-stone-500">
                  No products found. Click &quot;Add New Product&quot; to get started!
                </td>
              </tr>
            ) : (
              products.map(product => {
                const mainImage = product.images?.find((img: any) => img.isMain)?.url || product.images?.[0]?.url || '/images/emerald-meadow.png';
                const isVisible = product.isVisible !== false; // default true
                const isSelected = selectedIds.includes(product.id);
                
                return (
                  <tr key={product.id} className={`transition-colors ${isSelected ? 'bg-rose-50/40' : isVisible ? 'hover:bg-[#FAF7F0]/70' : 'bg-stone-50 hover:bg-stone-100 opacity-70'}`}>
                    <td className="p-3.5 pl-4">
                      <button onClick={() => toggleSelect(product.id)} className="text-stone-400 hover:text-[#990E14] transition-colors">
                        {isSelected ? (
                          <CheckSquare size={18} className="text-[#990E14]" />
                        ) : (
                          <Square size={18} />
                        )}
                      </button>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-3.5">
                        <div className="h-12 w-12 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden shrink-0 relative shadow-2xs">
                          <Image 
                            src={mainImage} 
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-stone-800">{product.name}</p>
                          <p className="text-[11px] text-stone-400 font-mono mt-0.5">ID: {product.id.slice(-6).toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {product.collection?.name || 'N/A'}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="text-xs font-semibold text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200">
                        {product.priceMode}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${isVisible ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-stone-100 text-stone-600 border border-stone-200'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isVisible ? 'bg-emerald-500 animate-pulse' : 'bg-stone-400'}`}></span>
                        {isVisible ? 'LIVE' : 'ARCHIVED'}
                      </span>
                    </td>
                    <td className="p-3.5 pr-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/collections/products/${product.slug}`}
                          target="_blank"
                          className="p-1.5 text-sky-600 hover:text-white hover:bg-sky-600 border border-sky-200 rounded-lg transition-all shadow-2xs"
                          title="View on site"
                        >
                          <Eye size={15} />
                        </Link>
                        <Link 
                          href={`/admin/products/${product.id}/edit`} 
                          className="p-1.5 text-[#DE8B22] hover:text-white hover:bg-[#DE8B22] border border-[#DE8B22]/30 rounded-lg transition-all shadow-2xs"
                          title="Edit Product"
                        >
                          <Edit size={15} />
                        </Link>
                        <button 
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this product?')) {
                              bulkDeleteProducts([product.id]);
                            }
                          }}
                          className="p-1.5 text-rose-500 hover:text-white hover:bg-rose-600 border border-rose-200 rounded-lg transition-all shadow-2xs" 
                          title="Delete Product"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
