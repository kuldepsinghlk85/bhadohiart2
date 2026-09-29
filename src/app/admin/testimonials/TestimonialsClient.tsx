"use client";

import React, { useState, useRef } from 'react';
import { 
  Quote, 
  Star, 
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  Image as ImageIcon,
  User,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface TestimonialItem {
  id: string;
  clientName: string;
  location?: string | null;
  clientType?: string | null;
  rating?: number | null;
  quote: string;
  image?: string | null;
  isVisible?: boolean;
  createdAt?: string;
}

interface TestimonialsClientProps {
  initialTestimonials: TestimonialItem[];
}

export function TestimonialsClient({ initialTestimonials }: TestimonialsClientProps) {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(initialTestimonials || []);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [clientName, setClientName] = useState('');
  const [location, setLocation] = useState('');
  const [clientType, setClientType] = useState('Residential Client');
  const [rating, setRating] = useState<number>(5);
  const [quote, setQuote] = useState('');
  const [image, setImage] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Image Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    setMessage(null);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (!res.ok || !data.urls?.[0]) {
        throw new Error(data.error || 'Failed to upload image');
      }

      setImage(data.urls[0]);
      setMessage({ type: 'success', text: 'Client photo uploaded successfully!' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error uploading photo.' });
    } finally {
      setIsUploadingImage(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setClientName('');
    setLocation('');
    setClientType('Residential Client');
    setRating(5);
    setQuote('');
    setImage('');
    setIsVisible(true);
  };

  const handleStartEdit = (item: TestimonialItem) => {
    setEditingId(item.id);
    setClientName(item.clientName || '');
    setLocation(item.location || '');
    setClientType(item.clientType || 'Residential Client');
    setRating(item.rating || 5);
    setQuote(item.quote || '');
    setImage(item.image || '');
    setIsVisible(item.isVisible !== false);

    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !quote.trim()) {
      setMessage({ type: 'error', text: 'Please fill in Client Name and Testimonial Quote.' });
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      const payload = {
        id: editingId,
        clientName: clientName.trim(),
        location: location.trim(),
        clientType: clientType.trim(),
        rating,
        quote: quote.trim(),
        image: image.trim(),
        isVisible
      };

      const res = await fetch('/api/admin/testimonials', {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save testimonial');
      }

      if (editingId) {
        setTestimonials(prev => prev.map(t => t.id === editingId ? data.testimonial : t));
        setMessage({ type: 'success', text: 'Testimonial updated successfully!' });
      } else {
        setTestimonials(prev => [data.testimonial, ...prev]);
        setMessage({ type: 'success', text: 'New testimonial added successfully!' });
      }

      resetForm();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error saving testimonial.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Failed to delete testimonial');

      setTestimonials(prev => prev.filter(t => t.id !== id));
      if (editingId === id) resetForm();
      setMessage({ type: 'success', text: 'Testimonial deleted successfully.' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error deleting testimonial.' });
    }
  };

  const handleToggleVisibility = async (item: TestimonialItem) => {
    try {
      const newStatus = !item.isVisible;
      const res = await fetch('/api/admin/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: item.id,
          isVisible: newStatus
        })
      });

      if (!res.ok) throw new Error('Failed to update visibility');

      setTestimonials(prev => prev.map(t => t.id === item.id ? { ...t, isVisible: newStatus } : t));
      setMessage({ 
        type: 'success', 
        text: `Testimonial is now ${newStatus ? 'visible' : 'hidden'} on homepage.` 
      });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error updating status.' });
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-[var(--color-brand-border)] shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-[var(--color-brand-burgundy)]/10 text-[var(--color-brand-burgundy)]">
              <Quote className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-burgundy)]">
              Client Reputation Management
            </span>
          </div>
          <h1 className="font-serif text-2xl md:text-3xl text-[var(--color-brand-dark)]">
            Client Testimonials &amp; Reviews
          </h1>
          <p className="font-sans text-xs md:text-sm text-[var(--color-brand-muted)] max-w-2xl mt-1">
            Write authentic client testimonials, upload client portraits or installation photos, and manage star ratings shown on the homepage slider.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a href="/#testimonials" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="gap-2 text-xs border-[var(--color-brand-border)] rounded-full">
              <ExternalLink className="w-3.5 h-3.5" />
              Preview On Homepage
            </Button>
          </a>
        </div>
      </div>

      {/* Notification Toast */}
      {message && (
        <div className={`p-4 rounded-xl text-xs md:text-sm flex items-center justify-between shadow-xs ${
          message.type === 'success' 
            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
            : 'bg-rose-50 text-rose-800 border border-rose-200'
        }`}>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-xs font-bold hover:underline ml-4">
            Dismiss
          </button>
        </div>
      )}

      {/* Add / Edit Form */}
      <div ref={formRef} className="bg-white p-6 md:p-8 rounded-2xl border border-[var(--color-brand-border)] shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[var(--color-brand-border)]">
          <h3 className="font-serif text-xl font-bold text-[var(--color-brand-dark)] flex items-center gap-2">
            {editingId ? (
              <>
                <Edit3 className="w-5 h-5 text-[var(--color-brand-burgundy)]" /> Edit Testimonial
              </>
            ) : (
              <>
                <Plus className="w-5 h-5 text-[var(--color-brand-burgundy)]" /> Add New Client Testimonial
              </>
            )}
          </h3>

          {editingId && (
            <Button variant="ghost" onClick={resetForm} className="text-xs text-stone-500">
              Cancel Edit
            </Button>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Client Name */}
            <div>
              <label className="text-xs font-bold text-[var(--color-brand-dark)] uppercase tracking-wider block mb-1.5">
                Client / Patron Name *
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                placeholder="e.g. Vikram Singh or Rajiv Oberoi"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[var(--color-brand-border)] focus:outline-none focus:border-[var(--color-brand-burgundy)]"
              />
            </div>

            {/* Role & Location */}
            <div>
              <label className="text-xs font-bold text-[var(--color-brand-dark)] uppercase tracking-wider block mb-1.5">
                Role &amp; Location
              </label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g. Homeowner, Bangalore or Hotel Group, Delhi"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[var(--color-brand-border)] focus:outline-none focus:border-[var(--color-brand-burgundy)]"
              />
            </div>

            {/* Client Type */}
            <div>
              <label className="text-xs font-bold text-[var(--color-brand-dark)] uppercase tracking-wider block mb-1.5">
                Client / Project Category
              </label>
              <select
                value={clientType}
                onChange={e => setClientType(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[var(--color-brand-border)] focus:outline-none focus:border-[var(--color-brand-burgundy)] bg-white"
              >
                <option value="Residential Client">Residential Client / Homeowner</option>
                <option value="Hospitality Partner">Hospitality Partner / Hotel</option>
                <option value="Interior Designer">Interior Designer / Studio</option>
                <option value="Principal Architect">Principal Architect</option>
                <option value="Corporate Client">Corporate / Commercial Space</option>
              </select>
            </div>

          </div>

          {/* Star Rating & Visibility */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            <div>
              <label className="text-xs font-bold text-[var(--color-brand-dark)] uppercase tracking-wider block mb-1.5">
                Star Rating: ({rating} Stars)
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star 
                      className={`w-6 h-6 ${
                        star <= rating 
                          ? 'fill-[var(--color-brand-gold)] text-[var(--color-brand-gold)]' 
                          : 'text-stone-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[var(--color-brand-dark)] uppercase tracking-wider block mb-1.5">
                Status On Homepage
              </label>
              <button
                type="button"
                onClick={() => setIsVisible(!isVisible)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isVisible 
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' 
                    : 'bg-stone-100 text-stone-600 border border-stone-300'
                }`}
              >
                {isVisible ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4 text-stone-500" />}
                {isVisible ? 'Visible (Published Live)' : 'Hidden (Draft Only)'}
              </button>
            </div>
          </div>

          {/* Quote Text */}
          <div>
            <label className="text-xs font-bold text-[var(--color-brand-dark)] uppercase tracking-wider block mb-1.5">
              Testimonial Quote *
            </label>
            <textarea
              required
              rows={3}
              value={quote}
              onChange={e => setQuote(e.target.value)}
              placeholder="Write the words of appreciation, experience with the carpet quality, weave, and installation..."
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[var(--color-brand-border)] focus:outline-none focus:border-[var(--color-brand-burgundy)] leading-relaxed"
            />
          </div>

          {/* Photo Upload & Preview */}
          <div className="p-4 rounded-xl border border-[var(--color-brand-border)] bg-[#FAF7F0]/40 space-y-3">
            <label className="text-xs font-bold text-[var(--color-brand-dark)] uppercase tracking-wider block">
              Client Photo / Room Installation Picture
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Photo Preview Frame */}
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-stone-200 border-2 border-[var(--color-brand-border)] shadow-xs flex-shrink-0 flex items-center justify-center">
                {image ? (
                  <img src={image} alt="Client preview" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-8 h-8 text-stone-400" />
                )}
              </div>

              {/* Upload Input & URL option */}
              <div className="flex-1 w-full space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    placeholder="Paste image URL OR upload file using button →"
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-[var(--color-brand-border)] bg-white font-mono"
                  />

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingImage}
                    className="text-xs gap-2 border-[var(--color-brand-border)] rounded-xl"
                  >
                    {isUploadingImage ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                    {isUploadingImage ? 'Uploading...' : 'Upload Photo'}
                  </Button>
                </div>
                <p className="text-[11px] text-stone-500">
                  Tip: Upload either a photo of the client or a picture of their living room / hotel carpet installation.
                </p>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-2">
            {editingId && (
              <Button type="button" variant="outline" onClick={resetForm} className="text-xs rounded-xl">
                Cancel
              </Button>
            )}
            <Button 
              type="submit" 
              disabled={isSaving}
              className="bg-[var(--color-brand-burgundy)] hover:bg-[var(--color-brand-burgundy)]/90 text-white text-xs px-6 py-2.5 rounded-xl gap-2 font-semibold shadow-xs"
            >
              {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
              {editingId ? 'Update Testimonial' : 'Publish Testimonial'}
            </Button>
          </div>
        </form>
      </div>

      {/* Existing Testimonials List */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-[var(--color-brand-border)] shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--color-brand-border)]">
          <h3 className="font-serif text-lg font-bold text-[var(--color-brand-dark)]">
            All Testimonials ({testimonials.length})
          </h3>
          <span className="text-xs text-[var(--color-brand-muted)]">
            Visible on Homepage Slider: {testimonials.filter(t => t.isVisible !== false).length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                item.isVisible !== false 
                  ? 'border-[var(--color-brand-border)] bg-[#FAF7F0]/30 hover:border-stone-400' 
                  : 'border-dashed border-stone-300 bg-stone-50 opacity-70'
              }`}
            >
              <div>
                {/* Header: Photo, Name, Rating */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--color-brand-burgundy)]/30 bg-stone-100 flex-shrink-0 shadow-2xs">
                      {item.image ? (
                        <img src={item.image} alt={item.clientName} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-stone-200 text-stone-500">
                          <User className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-[var(--color-brand-dark)]">
                        {item.clientName}
                      </h4>
                      <p className="font-sans text-xs text-[var(--color-brand-muted)]">
                        {item.location || item.clientType || 'Verified Client'}
                      </p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[var(--color-brand-gold)] text-[var(--color-brand-gold)]" />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <p className="font-serif text-xs md:text-sm text-stone-700 italic leading-relaxed line-clamp-3 mb-4">
                  "{item.quote}"
                </p>
              </div>

              {/* Card Footer: Status & Actions */}
              <div className="pt-3 border-t border-[var(--color-brand-border)] flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  item.isVisible !== false 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-stone-200 text-stone-600'
                }`}>
                  {item.isVisible !== false ? 'Live on Home' : 'Hidden'}
                </span>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleToggleVisibility(item)}
                    className="text-xs p-1.5 h-auto text-stone-600 hover:text-black"
                    title={item.isVisible !== false ? 'Hide from homepage' : 'Show on homepage'}
                  >
                    {item.isVisible !== false ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-emerald-600" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleStartEdit(item)}
                    className="text-xs p-1.5 h-auto text-stone-600 hover:text-[var(--color-brand-burgundy)]"
                    title="Edit testimonial"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(item.id)}
                    className="text-xs p-1.5 h-auto text-rose-600 hover:bg-rose-50"
                    title="Delete testimonial"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
