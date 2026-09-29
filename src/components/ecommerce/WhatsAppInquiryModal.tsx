"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Loader2 } from 'lucide-react';

interface WhatsAppInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export function WhatsAppInquiryModal({ isOpen, onClose, message }: WhatsAppInquiryModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setLoading(true);
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, message }),
      });

      // Proceed to WhatsApp
      const waUrl = `https://wa.me/918558085579?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
      onClose();
    } catch (error) {
      console.error('Failed to submit inquiry:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-[100] transition-opacity" 
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white p-6 shadow-xl z-[101]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-serif text-2xl text-[var(--color-brand-dark)]">Continue to WhatsApp</h2>
          <button onClick={onClose} className="text-[var(--color-brand-muted)] hover:text-[var(--color-brand-dark)]">
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-sm text-[var(--color-brand-muted)] mb-6">
          Please provide your contact details so our team can follow up with your inquiry if needed.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[var(--color-brand-dark)] uppercase mb-1">
              Your Name
            </label>
            <input 
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-[var(--color-brand-border)] p-3 text-sm outline-none focus:border-[var(--color-brand-burgundy)]"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--color-brand-dark)] uppercase mb-1">
              Phone Number
            </label>
            <input 
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-[var(--color-brand-border)] p-3 text-sm outline-none focus:border-[var(--color-brand-burgundy)]"
              placeholder="Enter your phone number"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full h-12 text-base font-bold bg-[#25D366] text-white hover:bg-[#128C7E] mt-4">
            {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'OPEN WHATSAPP'}
          </Button>
        </form>
      </div>
    </>
  );
}
