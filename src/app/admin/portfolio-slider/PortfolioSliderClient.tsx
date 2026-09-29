"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Save, Image as ImageIcon } from 'lucide-react';

interface CollectionImages {
  id: string;
  name: string;
  images: string[];
}

export function PortfolioSliderClient({ initialData }: { initialData: CollectionImages[] }) {
  const [data, setData] = useState<CollectionImages[]>(initialData);
  const [activeCollectionId, setActiveCollectionId] = useState<string>(initialData[0]?.id || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const activeCollection = data.find(c => c.id === activeCollectionId);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !activeCollectionId) return;
    
    setIsUploading(true);
    const files = Array.from(e.target.files);
    const newImageUrls: string[] = [];

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Upload failed');
        
        const result = await response.json();
        if (result.urls && result.urls.length > 0) {
          newImageUrls.push(result.urls[0]);
        }
      }

      setData(prev => prev.map(c => {
        if (c.id === activeCollectionId) {
          return { ...c, images: [...c.images, ...newImageUrls] };
        }
        return c;
      }));
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading images');
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const removeImage = (urlToRemove: string) => {
    setData(prev => prev.map(c => {
      if (c.id === activeCollectionId) {
        return { ...c, images: c.images.filter(url => url !== urlToRemove) };
      }
      return c;
    }));
  };

  const handleSave = async () => {
    if (!activeCollectionId) return;
    const collectionData = data.find(c => c.id === activeCollectionId);
    if (!collectionData) return;

    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/portfolio-slider', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          collectionId: activeCollectionId,
          images: collectionData.images
        })
      });

      if (!response.ok) throw new Error('Failed to save');
      
      alert('Slider images saved successfully for ' + collectionData.name);
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  if (!activeCollection) {
    return <div>No collections available.</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 bg-white border border-[var(--color-brand-border)] min-h-[600px]">
      
      {/* Sidebar: Collections */}
      <div className="w-full md:w-1/4 border-r border-[var(--color-brand-border)] p-4 bg-[#FAF7F0]">
        <h3 className="font-sans font-bold text-[var(--color-brand-dark)] mb-4 uppercase text-sm tracking-wider">
          Select Collection
        </h3>
        <div className="flex flex-col gap-2">
          {data.map(collection => (
            <button
              key={collection.id}
              onClick={() => setActiveCollectionId(collection.id)}
              className={`text-left px-4 py-3 text-sm font-medium transition-colors ${
                activeCollectionId === collection.id
                  ? 'bg-[var(--color-brand-burgundy)] text-white'
                  : 'bg-white text-[var(--color-brand-dark)] hover:bg-gray-50 border border-[var(--color-brand-border)]'
              }`}
            >
              {collection.name} ({collection.images.length})
            </button>
          ))}
        </div>
      </div>

      {/* Main Content: Images */}
      <div className="w-full md:w-3/4 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif text-[var(--color-brand-dark)]">
            {activeCollection.name} Slider Images
          </h2>
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        <div className="mb-8">
          <label className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
            <span className="flex items-center space-x-2">
              <Upload className="w-6 h-6 text-gray-600" />
              <span className="font-medium text-gray-600">
                {isUploading ? 'Uploading...' : 'Drop images to add to slider, or click to browse'}
              </span>
            </span>
            <input 
              type="file" 
              name="file_upload" 
              className="hidden" 
              accept="image/*" 
              multiple 
              onChange={handleFileUpload} 
              disabled={isUploading}
            />
          </label>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {activeCollection.images.map((url, idx) => (
            <div key={idx} className="relative group border border-[var(--color-brand-border)] bg-gray-100 aspect-square overflow-hidden">
              <img 
                src={url} 
                alt={`${activeCollection.name} slider image ${idx + 1}`} 
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => removeImage(url)}
                className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {activeCollection.images.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-400">
              <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
              <p>No images uploaded for this collection's slider yet.</p>
              <p className="text-sm mt-2 max-w-md text-center">
                (Note: When no images are configured, the frontend will use default fallback images to prevent an empty display.)
              </p>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
