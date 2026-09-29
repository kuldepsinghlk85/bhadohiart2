'use client';

import React, { useState } from 'react';
import { Trash2, Plus, Image as ImageIcon, Link as LinkIcon, Type, AlignLeft, RefreshCw, Eye, Save } from 'lucide-react';
import Image from 'next/image';
import { ImageUploader } from '@/components/admin/ImageUploader';

interface Slide {
  id: number;
  image: string;
  link: string;
  title: string;
  subtitle: string;
}

export default function HomepageSliderClient({ initialSlides }: { initialSlides: Slide[] }) {
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [loading, setLoading] = useState(false);

  const addSlide = () => {
    setSlides([
      ...slides, 
      { id: Date.now(), image: '', link: '', title: '', subtitle: '' }
    ]);
  };

  const removeSlide = (id: number) => {
    setSlides(slides.filter(s => s.id !== id));
  };

  const updateSlide = (id: number, field: keyof Slide, value: string) => {
    setSlides(slides.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const saveSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'homepage_slider',
          value: JSON.stringify(slides)
        })
      });
      if (res.ok) {
        alert("Homepage slider updated successfully!");
      } else {
        alert("Failed to save settings.");
      }
    } catch (e) {
      console.error(e);
      alert("Error saving settings.");
    }
    setLoading(false);
  };

  return (
    <div className="pb-12 max-w-5xl mx-auto">
      {/* Header Area */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <ImageIcon className="w-6 h-6 text-green-700" />
            <h1 className="text-2xl font-black text-gray-900">होम पेज स्लाइडर व बैनर प्रबंधन</h1>
          </div>
          <p className="text-gray-500 text-sm">मुख्य स्लाइडर (Left Big Slider) की इमेज व लिंक बदलें। यहाँ जो भी स्लाइड जोड़ेंगे, वह होम पेज के मुख्य स्लाइडर में ऑटोमैटिकली चलेगी।</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => window.open('/', '_blank')}
            className="flex items-center gap-2 px-4 py-2 border border-green-200 text-green-700 rounded-lg hover:bg-green-50 transition-colors text-sm font-bold"
          >
            <Eye className="w-4 h-4" />
            होम पेज देखें
          </button>
          <button 
            onClick={saveSettings}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors text-sm font-bold shadow-md"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : 'बदलाव सुरक्षित करें'}
          </button>
        </div>
      </div>

      {/* Add Button */}
      <div className="flex justify-end mb-6">
        <button 
          onClick={addSlide}
          className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors text-sm font-bold shadow-sm"
        >
          <Plus className="w-4 h-4" />
          + नई स्लाइड जोड़ें
        </button>
      </div>

      {/* Slides List */}
      <div className="space-y-6">
        {slides.map((slide, index) => (
          <div key={slide.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
            
            {/* Image Preview Area */}
            <div className="w-full md:w-1/3 bg-gray-50 flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-gray-100 min-h-[250px] relative">
              {slide.image ? (
                <Image src={slide.image} alt={`Slide ${index+1}`} fill className="object-cover" />
              ) : (
                <div className="text-gray-400 text-center">
                  <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No Image Provided</p>
                </div>
              )}
            </div>
            
            {/* Form Area */}
            <div className="flex-1 p-6 relative">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <span className="bg-green-100 text-green-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">{index + 1}</span>
                  स्लाइड {index + 1}
                </h3>
                <button 
                  onClick={() => removeSlide(slide.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                  title="Remove Slide"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Image URL */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">इमेज URL अथवा नया फोटो अपलोड करें (Image URL)</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <ImageIcon className="text-gray-400 w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={slide.image}
                        onChange={(e) => updateSlide(slide.id, 'image', e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-sm"
                        placeholder="/images/products/infinity-01.jpg"
                      />
                    </div>
                    <ImageUploader 
                      onUploadComplete={(url) => updateSlide(slide.id, 'image', url)} 
                      buttonText="Upload"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Target Link */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">टारगेट लिंक (Target Link)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LinkIcon className="text-gray-400 w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={slide.link}
                        onChange={(e) => updateSlide(slide.id, 'link', e.target.value)}
                        placeholder="/collections/infinity"
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">शीर्षक (Title - optional)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Type className="text-gray-400 w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={slide.title}
                        onChange={(e) => updateSlide(slide.id, 'title', e.target.value)}
                        placeholder="Welcome to Bhadohi Arts Weave"
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Subtitle */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">विवरण (Subtitle - optional)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <AlignLeft className="text-gray-400 w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={slide.subtitle}
                      onChange={(e) => updateSlide(slide.id, 'subtitle', e.target.value)}
                      placeholder="Finest range of Handloom Carpets"
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

              </div>
            </div>

          </div>
        ))}

        {slides.length === 0 && (
          <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center text-gray-500">
            कोई स्लाइड नहीं है। ऊपर "नई स्लाइड जोड़ें" पर क्लिक करें। (No slides available. Click "Add new slide" above.)
          </div>
        )}
      </div>
      
      {/* Bottom Save Button */}
      {slides.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="text-xl">💡</span>
            सभी बदलाव (स्लाइडर बैनर) सुरक्षित करने के लिए <strong>"बदलाव सुरक्षित करें"</strong> पर क्लिक करें।
          </div>
          <button 
            onClick={saveSettings}
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors text-lg font-bold shadow-md"
          >
            <Save className="w-5 h-5" />
            {loading ? 'Saving...' : 'बदलाव सुरक्षित करें (Save All)'}
          </button>
        </div>
      )}
    </div>
  );
}
