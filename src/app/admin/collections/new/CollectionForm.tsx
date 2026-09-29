"use client";

import React, { useState } from 'react';
import { createCollection } from '../actions';
import { Upload, X } from 'lucide-react';

export default function CollectionForm() {
  const [sliderImages, setSliderImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isSlider: boolean = false) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsUploading(true);
    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append('images', e.target.files[i]);
    }

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      if (data.urls) {
        if (isSlider) {
          // Add up to 5
          setSliderImages(prev => {
            const newArray = [...prev, ...data.urls];
            return newArray.slice(0, 5); // Max 5 images
          });
        } else {
          // Set main image (we can just use standard uncontrolled input by updating a hidden field, 
          // or we can use state. For simplicity, we'll just set the value of a hidden input via DOM or state)
          const imgInput = document.getElementById('mainImageInput') as HTMLInputElement;
          if (imgInput) imgInput.value = data.urls[0];
          
          const preview = document.getElementById('mainImagePreview') as HTMLImageElement;
          if (preview) {
            preview.src = data.urls[0];
            preview.classList.remove('hidden');
          }
        }
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const removeSliderImage = (index: number) => {
    setSliderImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <form action={createCollection} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Category Name *</label>
          <input 
            type="text" 
            name="name"
            required
            placeholder="e.g. Hand Tufted Carpets"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            onChange={(e) => {
              const slugInput = document.getElementById('slugInput') as HTMLInputElement;
              if (slugInput && !slugInput.value) {
                slugInput.value = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
              }
            }}
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">URL Slug *</label>
          <input 
            type="text" 
            name="slug"
            id="slugInput"
            required
            placeholder="e.g. hand-tufted-carpets"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
        <textarea 
          name="description"
          rows={3}
          placeholder="Brief description of this portfolio..."
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="border-t border-gray-200 pt-6">
        <label className="block text-sm font-bold text-gray-700 mb-4">Main Thumbnail Image</label>
        <div className="flex items-center gap-6">
          <div className="w-32 h-32 bg-gray-100 rounded-md border border-gray-200 overflow-hidden flex items-center justify-center">
            <img id="mainImagePreview" className="w-full h-full object-cover hidden" alt="Preview" />
            <Upload className="text-gray-400 absolute -z-10" />
          </div>
          <div>
            <input type="hidden" name="image" id="mainImageInput" />
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => handleFileUpload(e, false)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
            />
            <p className="text-xs text-gray-500 mt-2">Used as the category thumbnail.</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <label className="block text-sm font-bold text-gray-700 mb-1">Slider Images (Max 5)</label>
        <p className="text-xs text-gray-500 mb-4">These photos will run as a slider at the top of the category portfolio page.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
          {sliderImages.map((url, i) => (
            <div key={i} className="relative aspect-square rounded-md border border-gray-200 overflow-hidden group">
              <img src={url} className="w-full h-full object-cover" alt={`Slider ${i+1}`} />
              <input type="hidden" name={`sliderImage${i}`} value={url} />
              <button 
                type="button"
                onClick={() => removeSliderImage(i)}
                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          
          {sliderImages.length < 5 && (
            <label className="aspect-square rounded-md border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 hover:text-orange-500 hover:border-orange-500 cursor-pointer transition-colors bg-gray-50">
              <Upload size={24} className="mb-2" />
              <span className="text-xs font-medium">Add Photo</span>
              <input 
                type="file" 
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, true)}
                disabled={isUploading}
              />
            </label>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6 flex justify-end">
        <button 
          type="submit"
          disabled={isUploading}
          className="bg-orange-500 text-white px-6 py-2 rounded-md font-bold hover:bg-orange-600 transition-colors disabled:opacity-50"
        >
          {isUploading ? 'Uploading...' : 'Publish Category'}
        </button>
      </div>
    </form>
  );
}
