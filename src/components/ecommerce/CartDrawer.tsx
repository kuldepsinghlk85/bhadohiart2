"use client";

import React from 'react';
import { useCartStore } from '@/store/cartStore';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { WhatsAppInquiryModal } from './WhatsAppInquiryModal';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity } = useCartStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  if (!isOpen) return null;

  const whatsappMessage = "Hi, I would like to inquire about the following items from my cart:\n\n" + 
    items.map((item, index) => `${index + 1}. ${item.name} (Size: ${item.size || 'Standard'}, Qty: ${item.quantity})`).join('\n\n');

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity" 
        onClick={() => setIsOpen(false)}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-white shadow-xl z-50 flex flex-col transform transition-transform duration-300">
        
        <div className="p-4 border-b border-[var(--color-brand-border)] flex items-center justify-between">
          <h2 className="font-serif text-2xl text-[var(--color-brand-dark)] flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Your Cart
          </h2>
          <button onClick={() => setIsOpen(false)} className="text-[var(--color-brand-muted)] hover:text-[var(--color-brand-dark)]">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center text-[var(--color-brand-muted)] py-12">
              <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>Your cart is currently empty.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4 border border-[var(--color-brand-border)] p-3">
                <div className="w-20 h-20 bg-[#FAF7F0] flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-sm text-[var(--color-brand-dark)]">{item.name}</h3>
                      {item.size && <p className="text-xs text-[var(--color-brand-muted)] mt-1">Size: {item.size}</p>}
                    </div>
                    <button 
                      onClick={() => removeItem(item.id, item.size)}
                      className="text-[var(--color-brand-muted)] hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="mt-auto flex justify-between items-end">
                    <div className="flex items-center border border-[var(--color-brand-border)]">
                      <button 
                        className="px-2 py-1 text-[var(--color-brand-muted)] hover:bg-[#FAF7F0]"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.size)}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 py-1 text-sm text-[var(--color-brand-dark)] font-bold">{item.quantity}</span>
                      <button 
                        className="px-2 py-1 text-[var(--color-brand-muted)] hover:bg-[#FAF7F0]"
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-bold text-sm text-[var(--color-brand-dark)]">{item.price}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-[var(--color-brand-border)] bg-[#FAF7F0]">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-[var(--color-brand-dark)]">Subtotal</span>
              <span className="text-xs text-[var(--color-brand-muted)]">Calculated at checkout</span>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/checkout" onClick={() => setIsOpen(false)}>
                <Button className="w-full h-12 text-base font-bold">
                  PROCEED TO CHECKOUT
                </Button>
              </Link>
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="w-full h-12 text-base font-bold bg-[#25D366] text-white hover:bg-[#128C7E]"
              >
                ENQUIRE ON WHATSAPP
              </Button>
            </div>
          </div>
        )}
      </div>

      <WhatsAppInquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        message={whatsappMessage} 
      />
    </>
  );
}
