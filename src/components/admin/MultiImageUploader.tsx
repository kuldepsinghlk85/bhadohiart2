"use client";

import React, { useState, useRef } from 'react';
import { Upload, Loader2, X } from 'lucide-react';

interface MultiImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export function MultiImageUploader({ images, onChange }: MultiImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.urls && data.urls.length > 0) {
        onChange([...images, ...data.urls]);
      } else {
        alert('Failed to upload image(s)');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading image(s)');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (indexToRemove: number) => {
    onChange(images.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="w-full">
      {/* Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4">
          {images.map((imgUrl, idx) => (
            <div key={idx} className="relative aspect-square border border-gray-200 rounded-md overflow-hidden bg-gray-50 group">
              <img src={imgUrl} alt={`Product image ${idx+1}`} className="w-full h-full object-cover" />
              <button 
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
              >
                <X size={14} />
              </button>
              {idx === 0 && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] text-center py-1">
                  Main Image
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      <div>
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center justify-center gap-2 w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-500 hover:bg-gray-50 hover:border-[var(--color-brand-burgundy)] hover:text-[var(--color-brand-burgundy)] transition-all"
        >
          {uploading ? (
            <>
              <Loader2 className="animate-spin" size={24} />
              <span className="font-medium">Uploading...</span>
            </>
          ) : (
            <>
              <Upload size={24} />
              <span className="font-medium">Click to upload multiple images</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
