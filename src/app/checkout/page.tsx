"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const totalAmount = items.reduce((sum, item) => {
    if (!item.price || item.price === 'Request Quote') return sum;
    const num = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    return sum + (isNaN(num) ? 0 : num * item.quantity);
  }, 0);

  const [origin, setOrigin] = useState('');
  
  React.useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const contactInfo = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
    };
    const shippingAddress = {
      addressLine: formData.get('addressLine'),
      city: formData.get('city'),
      state: formData.get('state'),
      pinCode: formData.get('pinCode'),
      country: formData.get('country'),
    };

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ productId: i.id, quantity: i.quantity, size: i.size })),
          contactInfo,
          shippingAddress
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        if (res.status === 401) {
           router.push('/login?from=/checkout');
           return;
        }
        throw new Error(data.error || 'Checkout failed');
      }

      // Success
      clearCart();
      router.push(`/checkout/success/${data.orderId}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="bg-[#FAF7F0] min-h-[60vh] flex flex-col items-center justify-center p-4 pt-10">
        <h1 className="font-serif text-3xl mb-4">Your cart is empty</h1>
        <Link href="/collections">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F0] min-h-screen pt-6 md:pt-8 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="mb-5 flex items-center justify-between">
          <h1 className="font-serif text-3xl md:text-4xl text-[var(--color-brand-dark)]">Checkout</h1>
          <Link href="/collections" className="inline-flex items-center text-sm text-[var(--color-brand-muted)] hover:text-[var(--color-brand-burgundy)] transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 mb-6 border border-red-200">
            {error}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-12 flex-col-reverse lg:flex-row">
          
          {/* Checkout Form */}
          <div className="w-full lg:w-2/3">
            <form onSubmit={handleSubmit} className="bg-white border border-[var(--color-brand-border)] p-8">
              
              {/* Contact Info */}
              <div className="mb-10">
                <h2 className="font-serif text-2xl text-[var(--color-brand-dark)] mb-6 pb-2 border-b border-[var(--color-brand-border)]">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-brand-muted)] uppercase tracking-wider mb-2">First Name</label>
                    <input name="firstName" required type="text" className="w-full border border-[var(--color-brand-border)] p-3 text-sm outline-none focus:border-[var(--color-brand-burgundy)]" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-brand-muted)] uppercase tracking-wider mb-2">Last Name</label>
                    <input name="lastName" required type="text" className="w-full border border-[var(--color-brand-border)] p-3 text-sm outline-none focus:border-[var(--color-brand-burgundy)]" placeholder="Doe" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[var(--color-brand-muted)] uppercase tracking-wider mb-2">Email Address</label>
                    <input name="email" required type="email" className="w-full border border-[var(--color-brand-border)] p-3 text-sm outline-none focus:border-[var(--color-brand-burgundy)]" placeholder="john@example.com" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[var(--color-brand-muted)] uppercase tracking-wider mb-2">Phone Number</label>
                    <input name="phone" required type="tel" className="w-full border border-[var(--color-brand-border)] p-3 text-sm outline-none focus:border-[var(--color-brand-burgundy)]" placeholder="+91 98765 43210" />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="mb-10">
                <h2 className="font-serif text-2xl text-[var(--color-brand-dark)] mb-6 pb-2 border-b border-[var(--color-brand-border)]">
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[var(--color-brand-muted)] uppercase tracking-wider mb-2">Street Address</label>
                    <input name="addressLine" required type="text" className="w-full border border-[var(--color-brand-border)] p-3 text-sm outline-none focus:border-[var(--color-brand-burgundy)]" placeholder="123 Main St, Apt 4B" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-brand-muted)] uppercase tracking-wider mb-2">City</label>
                    <input name="city" required type="text" className="w-full border border-[var(--color-brand-border)] p-3 text-sm outline-none focus:border-[var(--color-brand-burgundy)]" placeholder="New Delhi" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-brand-muted)] uppercase tracking-wider mb-2">State / Province</label>
                    <input name="state" required type="text" className="w-full border border-[var(--color-brand-border)] p-3 text-sm outline-none focus:border-[var(--color-brand-burgundy)]" placeholder="Delhi" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-brand-muted)] uppercase tracking-wider mb-2">Postal Code</label>
                    <input name="pinCode" required type="text" className="w-full border border-[var(--color-brand-border)] p-3 text-sm outline-none focus:border-[var(--color-brand-burgundy)]" placeholder="110001" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-brand-muted)] uppercase tracking-wider mb-2">Country</label>
                    <select name="country" className="w-full border border-[var(--color-brand-border)] p-3 text-sm outline-none focus:border-[var(--color-brand-burgundy)] bg-white">
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-4">
                <Button type="submit" disabled={loading} className="w-full py-6 font-bold text-lg">
                  {loading ? 'Processing...' : 'Place Order & Generate Invoice'}
                </Button>

                <div className="flex items-center justify-center gap-2 text-[var(--color-brand-muted)] text-sm my-2">
                  <span className="h-[1px] flex-1 bg-[var(--color-brand-border)]"></span>
                  <span>OR</span>
                  <span className="h-[1px] flex-1 bg-[var(--color-brand-border)]"></span>
                </div>

                <a 
                  href={`https://wa.me/918558085579?text=${encodeURIComponent(
                    `*Order Inquiry*\n\nI would like to order the following items from my cart:\n\n${items.map((item, index) => 
                      `${index + 1}. *${item.name}*\n   Size: ${item.size || 'N/A'}\n   Quantity: ${item.quantity}\n   Price: ${item.price}\n   Link: ${origin}/collections/products/${item.slug || item.id}`
                    ).join('\n\n')}\n\n*Total Estimated Amount:* ₹ ${totalAmount.toLocaleString('en-IN')}\n\nPlease let me know the next steps for payment and delivery.`
                  )}`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full"
                >
                  <Button type="button" className="w-full py-6 font-bold text-lg bg-[#25D366] text-white hover:bg-[#128C7E]">
                    Shop on WhatsApp Instead
                  </Button>
                </a>
              </div>

            </form>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white border border-[var(--color-brand-border)] p-6 sticky top-24">
              <h2 className="font-serif text-xl text-[var(--color-brand-dark)] mb-6 pb-4 border-b border-[var(--color-brand-border)]">
                In Your Cart
              </h2>
              
              <div className="max-h-[40vh] overflow-y-auto pr-2 mb-6">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4 pb-4 border-b border-[var(--color-brand-border)] mb-4">
                    <div className="w-16 h-16 bg-gray-100 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-[var(--color-brand-dark)] text-sm mb-1 line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-[var(--color-brand-muted)] mb-1">
                        {item.size && `Size: ${item.size}`} <br/>Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-bold text-[var(--color-brand-dark)]">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between font-bold text-xl text-[var(--color-brand-dark)] pt-4 border-t border-[var(--color-brand-border)]">
                <span>Total</span>
                <span>₹ {totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
