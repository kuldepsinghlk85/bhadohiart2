import React from 'react';
import TrackOrderClient from './TrackOrderClient';

export const metadata = {
  title: 'Track Order | Bhadohi Arts & Weave',
  description: 'Track the status of your order.',
};

export default function TrackOrderPage() {
  return (
    <div className="bg-[#FAF7F0] min-h-screen pt-0 pb-12">
      <div className="bg-[var(--color-brand-burgundy)] text-white py-10 md:py-12 mb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-3xl md:text-4xl mb-3">Track Your Order</h1>
          <p className="font-sans text-white/80 text-sm max-w-2xl mx-auto">
            Enter your order ID below to see the current status of your hand-crafted carpet.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <TrackOrderClient />
      </div>
    </div>
  );
}
