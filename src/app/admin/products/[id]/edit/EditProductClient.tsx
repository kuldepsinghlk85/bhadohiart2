"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, X } from 'lucide-react';
import { MultiImageUploader } from '@/components/admin/MultiImageUploader';

export default function EditProductClient({ 
  product, 
  collections 
}: { 
  product: any, 
  collections: any[] 
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>(
    product.images?.map((img: any) => img.url) || []
  );
  
  // Default fallback values
  const defaultFeatures = [
    'Premium quality craftsmanship',
    'Soft, luxurious underfoot feel',
    'Durable and long-lasting material',
    'Easy to clean and maintain'
  ];
  
  const defaultSizes = [
    {size: "4' x 6'", price: ''},
    {size: "5' x 8'", price: ''},
    {size: "8' x 10'", price: ''},
    {size: "9' x 12'", price: ''}
  ];

  // Parse features safely
  let parsedFeatures = defaultFeatures;
  if (product.features && product.features.length > 0) {
    if (typeof product.features === 'string') {
      try { 
        const parsed = JSON.parse(product.features); 
        if (Array.isArray(parsed) && parsed.length > 0) {
          parsedFeatures = parsed;
        } else if (parsed.features && Array.isArray(parsed.features) && parsed.features.length > 0) {
          parsedFeatures = parsed.features;
        }
      } catch(e) { 
        parsedFeatures = [product.features]; 
      }
    } else if (Array.isArray(product.features) && product.features.length > 0) {
      // If it's just [''] (the old default), replace with real defaults
      if (product.features.length === 1 && product.features[0].trim() === '') {
        parsedFeatures = defaultFeatures;
      } else {
        parsedFeatures = product.features;
      }
    }
  }
  const [features, setFeatures] = useState<string[]>(parsedFeatures);
  
  // Initialize sizes
  const initialSizes = product.variants && product.variants.length > 0 
    ? product.variants.map((v: any) => ({ size: v.size, price: v.price?.toString() || '' }))
    : defaultSizes;
  const [sizes, setSizes] = useState<{size: string, price: string}[]>(initialSizes);

  // Default Collection (random if not set)
  const defaultCollectionId = product.collectionId || (collections.length > 0 ? collections[Math.floor(Math.random() * collections.length)].id : "");
  
  // Default Description (auto-generate if missing)
  const defaultDescription = product.description || `Discover the elegance of the ${product.name} carpet. This beautifully crafted piece brings warmth, texture, and sophisticated style to any room.`;

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
      
      const payload = {
        name: formData.get('name'),
        collectionId: formData.get('collectionId'),
        priceMode: formData.get('priceMode'),
        isBestSeller: formData.get('isBestSeller') === 'on',
        isGrandRoomLook: formData.get('isGrandRoomLook') === 'on',
        description: formData.get('description'),
        features: features.filter(f => f.trim() !== ''),
        sizes: sizes.filter(s => s.size.trim() !== ''),
        images: uploadedImages // Always send the current state array
      };

      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        router.push('/admin/products');
        router.refresh();
      } else {
        alert('Failed to update product');
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
          defaultValue={product.name}
          className="w-full border border-[var(--color-brand-border)] px-4 py-2 focus:border-[var(--color-brand-burgundy)] outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-[var(--color-brand-dark)] mb-1">Description</label>
        <textarea 
          name="description" 
          rows={4}
          defaultValue={defaultDescription}
          className="w-full border border-[var(--color-brand-border)] px-4 py-2 focus:border-[var(--color-brand-burgundy)] outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-[var(--color-brand-dark)] mb-1">Collection</label>
        <select 
          name="collectionId" 
          required
          defaultValue={defaultCollectionId}
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
          defaultValue={product.priceMode}
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
           <input type="checkbox" name="isBestSeller" id="isBestSeller" defaultChecked={product.isBestSeller} className="accent-[var(--color-brand-burgundy)] w-4 h-4" />
           <label htmlFor="isBestSeller" className="text-sm font-bold text-[var(--color-brand-dark)]">Mark as Best Seller (Shows on Homepage)</label>
        </div>

        <div className="flex items-center gap-2">
           <input type="checkbox" name="isGrandRoomLook" id="isGrandRoomLook" defaultChecked={product.isGrandRoomLook} className="accent-[var(--color-brand-burgundy)] w-4 h-4" />
           <label htmlFor="isGrandRoomLook" className="text-sm font-bold text-[var(--color-brand-dark)]">Grand Room Look (Shows in Slideshow page)</label>
        </div>
      </div>

      <button 
        type="submit"
        disabled={loading}
        className="bg-[var(--color-brand-dark)] text-white px-6 py-3 font-bold hover:bg-[var(--color-brand-burgundy)] transition-colors disabled:opacity-50"
      >
        {loading ? 'Updating...' : 'Update Product'}
      </button>
    </form>
  );
}
