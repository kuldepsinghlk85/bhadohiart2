"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, X } from 'lucide-react';
import { MultiImageUploader } from '@/components/admin/MultiImageUploader';

export default function NewProductClient({ collections }: { collections: any[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>(['']);
  const [sizes, setSizes] = useState<{size: string, price: string}[]>([{size: '', price: ''}]);

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const handleSizeChange = (index: number, field: 'size' | 'price', value: string) => {
    const newSizes = [...sizes];
    newSizes[index][field] = value;
    setSizes(newSizes);
  };

  const addFeature = () => setFeatures([...features, '']);
  const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index));
  
  const addSize = () => setSizes([...sizes, {size: '', price: ''}]);
  const removeSize = (index: number) => setSizes(sizes.filter((_, i) => i !== index));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);

      // Add dynamic fields and image URLs to the product creation payload
      const payload = {
        name: formData.get('name'),
        collectionId: formData.get('collectionId'),
        priceMode: formData.get('priceMode'),
        isBestSeller: formData.get('isBestSeller') === 'on',
        isGrandRoomLook: formData.get('isGrandRoomLook') === 'on',
        description: formData.get('description'),
        features: features.filter(f => f.trim() !== ''),
        sizes: sizes.filter(s => s.size.trim() !== ''),
        images: uploadedImages
      };

      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        router.push('/admin/products');
        router.refresh();
      } else {
        alert('Failed to save product');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      
      <div>
        <label className="block text-sm font-bold text-[var(--color-brand-dark)] mb-1">Product Name</label>
        <input 
          name="name" 
          required 
          className="w-full border border-[var(--color-brand-border)] px-4 py-2 focus:border-[var(--color-brand-burgundy)] outline-none"
          placeholder="e.g. Imperial Silk Runner"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-[var(--color-brand-dark)] mb-1">Description</label>
        <textarea 
          name="description" 
          rows={4}
          className="w-full border border-[var(--color-brand-border)] px-4 py-2 focus:border-[var(--color-brand-burgundy)] outline-none"
          placeholder="Describe the product..."
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-[var(--color-brand-dark)] mb-1">Collection</label>
        <select 
          name="collectionId" 
          required
          className="w-full border border-[var(--color-brand-border)] px-4 py-2 focus:border-[var(--color-brand-burgundy)] outline-none"
        >
          <option value="">Select a collection</option>
          {collections.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-[var(--color-brand-dark)] mb-1">Price Mode</label>
        <select 
          name="priceMode" 
          required
          className="w-full border border-[var(--color-brand-border)] px-4 py-2 focus:border-[var(--color-brand-burgundy)] outline-none"
        >
          <option value="ENQUIRE">Enquire Only (Hide Price)</option>
          <option value="FIXED">Fixed Price (Show Price)</option>
          <option value="VARIABLE">Variable Price</option>
        </select>
      </div>
      
      {/* Dynamic Features */}
      <div>
        <label className="block text-sm font-bold text-[var(--color-brand-dark)] mb-1">Features (Bullet Points)</label>
        <div className="space-y-2">
          {features.map((feat, index) => (
            <div key={index} className="flex gap-2">
              <input
                value={feat}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="flex-1 border border-[var(--color-brand-border)] px-4 py-2 focus:border-[var(--color-brand-burgundy)] outline-none"
                placeholder="e.g. Hand-knotted wool"
              />
              <button type="button" onClick={() => removeFeature(index)} className="p-2 border border-[var(--color-brand-border)] hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addFeature} className="mt-2 text-sm text-[var(--color-brand-burgundy)] flex items-center gap-1 font-bold">
          <Plus className="w-4 h-4" /> Add Feature
        </button>
      </div>

      {/* Dynamic Sizes */}
      <div>
        <label className="block text-sm font-bold text-[var(--color-brand-dark)] mb-1">Available Sizes</label>
        <div className="space-y-2">
          {sizes.map((size, index) => (
            <div key={index} className="flex gap-2">
              <input
                value={size.size}
                onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                className="flex-1 border border-[var(--color-brand-border)] px-4 py-2 focus:border-[var(--color-brand-burgundy)] outline-none"
                placeholder="Size (e.g. 5' x 8')"
              />
              <input
                value={size.price}
                onChange={(e) => handleSizeChange(index, 'price', e.target.value)}
                className="flex-1 border border-[var(--color-brand-border)] px-4 py-2 focus:border-[var(--color-brand-burgundy)] outline-none"
                placeholder="Price (Optional if Enquire)"
              />
              <button type="button" onClick={() => removeSize(index)} className="p-2 border border-[var(--color-brand-border)] hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addSize} className="mt-2 text-sm text-[var(--color-brand-burgundy)] flex items-center gap-1 font-bold">
          <Plus className="w-4 h-4" /> Add Size
        </button>
      </div>

      {/* Multiple Images Upload */}
      <div>
        <label className="block text-sm font-bold text-[var(--color-brand-dark)] mb-1">Product Images</label>
        <MultiImageUploader images={uploadedImages} onChange={setUploadedImages} />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2">
           <input type="checkbox" name="isBestSeller" id="isBestSeller" className="accent-[var(--color-brand-burgundy)] w-4 h-4" />
           <label htmlFor="isBestSeller" className="text-sm font-bold text-[var(--color-brand-dark)]">Mark as Best Seller (Shows on Homepage)</label>
        </div>

        <div className="flex items-center gap-2">
           <input type="checkbox" name="isGrandRoomLook" id="isGrandRoomLook" className="accent-[var(--color-brand-burgundy)] w-4 h-4" />
           <label htmlFor="isGrandRoomLook" className="text-sm font-bold text-[var(--color-brand-dark)]">Grand Room Look (Shows in Slideshow page)</label>
        </div>
      </div>

      <button 
        type="submit"
        disabled={loading}
        className="bg-[var(--color-brand-dark)] text-white px-6 py-3 font-bold hover:bg-[var(--color-brand-burgundy)] transition-colors disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Save Product'}
      </button>
    </form>
  );
}
