import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Trash2, ArrowRight } from 'lucide-react';

export default function CartPage() {
  return (
    <div className="bg-[#FAF7F0] min-h-screen pt-8 md:pt-10 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="font-serif text-2xl md:text-3xl text-[var(--color-brand-dark)] mb-5">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white border border-[var(--color-brand-border)] p-6">
              
              {/* Item Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-[var(--color-brand-border)] mb-6 text-sm font-bold text-[var(--color-brand-muted)] uppercase tracking-widest">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
                <div className="col-span-2"></div>
              </div>

              {/* Single Cart Item */}
              <div className="flex flex-col md:grid md:grid-cols-12 gap-4 items-center pb-6 border-b border-[var(--color-brand-border)]">
                <div className="col-span-6 flex gap-4 w-full">
                  <div className="w-24 h-24 bg-gray-100 shrink-0">
                    <img 
                      src="/images/arctic-pearl.png" 
                      alt="Carpet" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-[var(--color-brand-dark)]">Royal Heritage Carpet</h3>
                    <p className="text-sm text-[var(--color-brand-muted)] mb-1">Size: 8' x 10'</p>
                    <p className="text-sm text-[var(--color-brand-muted)]">₹ 23,000</p>
                  </div>
                </div>
                
                <div className="col-span-2 w-full md:w-auto flex justify-between md:justify-center items-center">
                  <span className="md:hidden text-sm text-[var(--color-brand-muted)] font-bold">Quantity:</span>
                  <div className="flex items-center border border-[var(--color-brand-border)]">
                    <button className="px-3 py-1 hover:bg-gray-50">-</button>
                    <span className="px-3 py-1 text-sm">1</span>
                    <button className="px-3 py-1 hover:bg-gray-50">+</button>
                  </div>
                </div>

                <div className="col-span-2 w-full md:w-auto flex justify-between md:justify-end text-right font-bold text-[var(--color-brand-dark)]">
                  <span className="md:hidden text-sm text-[var(--color-brand-muted)] font-bold">Total:</span>
                  ₹ 23,000
                </div>

                <div className="col-span-2 w-full md:w-auto text-right md:text-center mt-2 md:mt-0">
                  <button className="text-[var(--color-brand-muted)] hover:text-red-600 transition-colors">
                    <Trash2 className="w-5 h-5 ml-auto md:mx-auto" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white border border-[var(--color-brand-border)] p-6 sticky top-24">
              <h2 className="font-serif text-2xl text-[var(--color-brand-dark)] mb-6 pb-4 border-b border-[var(--color-brand-border)]">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6 text-sm text-[var(--color-brand-dark)]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹ 23,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-xl text-[var(--color-brand-dark)] mb-8 pt-4 border-t border-[var(--color-brand-border)]">
                <span>Total</span>
                <span>₹ 23,000</span>
              </div>

              <Link href="/checkout">
                <Button className="w-full py-6 text-sm flex items-center justify-center gap-2">
                  PROCEED TO CHECKOUT <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
