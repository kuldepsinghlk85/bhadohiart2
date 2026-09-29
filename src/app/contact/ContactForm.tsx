"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export function ContactForm({ defaultMessage }: { defaultMessage: string }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: `${formData.get('firstName')} ${formData.get('lastName')}`,
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message')
    };

    try {
      // 1. Generate inquiry in DB
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      // 2. Alert via WhatsApp
      const adminPhone = "918558085579"; // As per contact info
      const waMessage = `New Inquiry from ${data.name} (${data.phone}):\n\n${data.message}`;
      const waUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(waMessage)}`;
      
      // Open WhatsApp link in new tab or same tab
      window.open(waUrl, '_blank');
      
      // Reset form
      (e.target as HTMLFormElement).reset();
      alert("Inquiry generated successfully! Redirecting to WhatsApp...");
      
    } catch (error) {
      console.error(error);
      alert("Failed to submit inquiry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold text-[var(--color-brand-dark)] uppercase tracking-wider mb-2">First Name</label>
          <input name="firstName" required type="text" placeholder="e.g. Rahul" className="w-full border border-[var(--color-brand-border)] bg-[#FAF7F0]/60 focus:bg-white rounded-xl px-4 py-3 text-sm text-[var(--color-brand-dark)] focus:outline-none focus:border-[var(--color-brand-burgundy)] focus:ring-1 focus:ring-[var(--color-brand-burgundy)] transition-all" />
        </div>
        <div>
          <label className="block text-xs font-bold text-[var(--color-brand-dark)] uppercase tracking-wider mb-2">Last Name</label>
          <input name="lastName" type="text" placeholder="e.g. Verma" className="w-full border border-[var(--color-brand-border)] bg-[#FAF7F0]/60 focus:bg-white rounded-xl px-4 py-3 text-sm text-[var(--color-brand-dark)] focus:outline-none focus:border-[var(--color-brand-burgundy)] focus:ring-1 focus:ring-[var(--color-brand-burgundy)] transition-all" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-[var(--color-brand-dark)] uppercase tracking-wider mb-2">Email Address</label>
        <input name="email" type="email" placeholder="rahul@example.com" className="w-full border border-[var(--color-brand-border)] bg-[#FAF7F0]/60 focus:bg-white rounded-xl px-4 py-3 text-sm text-[var(--color-brand-dark)] focus:outline-none focus:border-[var(--color-brand-burgundy)] focus:ring-1 focus:ring-[var(--color-brand-burgundy)] transition-all" />
      </div>

      <div>
        <label className="block text-xs font-bold text-[var(--color-brand-dark)] uppercase tracking-wider mb-2">Phone Number</label>
        <input name="phone" required type="tel" placeholder="+91 98765 43210" className="w-full border border-[var(--color-brand-border)] bg-[#FAF7F0]/60 focus:bg-white rounded-xl px-4 py-3 text-sm text-[var(--color-brand-dark)] focus:outline-none focus:border-[var(--color-brand-burgundy)] focus:ring-1 focus:ring-[var(--color-brand-burgundy)] transition-all" />
      </div>

      <div>
        <label className="block text-xs font-bold text-[var(--color-brand-dark)] uppercase tracking-wider mb-2">Message</label>
        <textarea name="message" required rows={4} defaultValue={defaultMessage} placeholder="Tell us about the carpet style, size, or custom specifications you require..." className="w-full border border-[var(--color-brand-border)] bg-[#FAF7F0]/60 focus:bg-white rounded-xl px-4 py-3 text-sm text-[var(--color-brand-dark)] focus:outline-none focus:border-[var(--color-brand-burgundy)] focus:ring-1 focus:ring-[var(--color-brand-burgundy)] transition-all resize-none"></textarea>
      </div>

      <Button type="submit" disabled={loading} className="w-full h-12 text-sm mt-1 rounded-xl bg-gradient-to-r from-[var(--color-brand-burgundy)] to-[var(--color-brand-burgundy-dark)] hover:from-[var(--color-brand-burgundy-dark)] hover:to-[#5E070B] text-white font-semibold tracking-wider shadow-sm hover:shadow-md transition-all">
        {loading ? "SENDING..." : "SEND MESSAGE & WHATSAPP ALERT"}
      </Button>
    </form>
  );
}
