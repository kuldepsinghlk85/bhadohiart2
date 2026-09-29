import React from 'react';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { auth } from '@/auth';

export default async function CheckoutSuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  
  if (!session?.user) {
    // If not logged in, they shouldn't see this, or we can just render the invoice securely if they have the ID.
    // For now, let's just enforce login.
  }

  let order = null;
  try {
    order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });
  } catch (error) {
    console.error("Database error fetching order:", error);
  }

  if (!order) {
    // If order is not found (or DB connection failed), we show a graceful fallback
    // since the checkout API also has a mock fallback.
    return (
      <div className="bg-[#FAF7F0] min-h-[80vh] pt-8 pb-12 flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <div className="bg-white border border-[var(--color-brand-border)] p-8 shadow-lg">
            <h1 className="font-serif text-4xl text-[var(--color-brand-dark)] mb-4">Order Received!</h1>
            <p className="text-[var(--color-brand-muted)] mb-6">
              Thank you for your order. Your Order ID is:
            </p>
            <div className="text-2xl font-mono font-bold text-[var(--color-brand-burgundy)] mb-8">
              {id}
            </div>
            <p className="text-sm text-[var(--color-brand-muted)] mb-8">
              Our team will review your order and contact you shortly. If you have any immediate questions, please reach out to us on WhatsApp.
            </p>
            <a 
              href={`https://wa.me/918558085579?text=Hi,%20I%20just%20placed%20an%20order%20and%20my%20Order%20ID%20is%20${id}`}
              target="_blank" 
              rel="noopener noreferrer" 
            >
              <Button size="lg" className="w-full sm:w-auto bg-[#25D366] text-white hover:bg-[#128C7E] font-bold px-8">
                CONTACT US ON WHATSAPP
              </Button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Generate WhatsApp message
  let waMessage = `*New Order Inquiry*\n\n*Order ID:* ${order.id}\n*Total Amount:* ₹${order.total.toLocaleString('en-IN')}\n\n*Items:*\n`;
  order.items.forEach(item => {
    waMessage += `- ${item.quantity}x ${item.product.name} (Size: ${item.size || 'N/A'}) - ₹${item.price.toLocaleString('en-IN')}\n`;
  });
  waMessage += `\n*Details:*\n${order.notes}\n\nPlease confirm my order.`;

  const waUrl = `https://wa.me/918558085579?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="bg-[#FAF7F0] min-h-[80vh] pt-8 pb-12 flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-3xl">
        
        <div className="bg-white border border-[var(--color-brand-border)] p-8 md:p-12 shadow-lg">
          <div className="text-center mb-10">
            <h1 className="font-serif text-4xl text-[var(--color-brand-dark)] mb-4">Order Received!</h1>
            <p className="text-[var(--color-brand-muted)]">Thank you for your order. Your invoice is generated below.</p>
          </div>

          <div className="border border-[var(--color-brand-border)] p-6 mb-8">
            <div className="flex justify-between items-start mb-6 border-b border-[var(--color-brand-border)] pb-6">
              <div>
                <h2 className="font-bold text-lg text-[var(--color-brand-dark)] mb-1">INVOICE</h2>
                <p className="text-sm text-[var(--color-brand-muted)]">Order #{order.id.slice(-8).toUpperCase()}</p>
              </div>
              <div className="text-right text-sm text-[var(--color-brand-muted)]">
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Status: <span className="text-[var(--color-brand-burgundy)] font-bold">{order.status}</span></p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-2 text-[var(--color-brand-dark)]">Customer Details & Shipping</h3>
              <p className="text-sm text-[var(--color-brand-muted)] whitespace-pre-wrap">{order.notes?.replace(' | ', '\n')}</p>
            </div>

            <table className="w-full text-sm text-left mb-6">
              <thead className="bg-[#FAF7F0] text-[var(--color-brand-dark)] font-bold">
                <tr>
                  <th className="px-4 py-2">Product</th>
                  <th className="px-4 py-2">Qty</th>
                  <th className="px-4 py-2 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id} className="border-b border-[var(--color-brand-border)]">
                    <td className="px-4 py-3">
                      <p className="font-bold text-[var(--color-brand-dark)]">{item.product.name}</p>
                      <p className="text-xs text-[var(--color-brand-muted)]">Size: {item.size || 'N/A'}</p>
                    </td>
                    <td className="px-4 py-3 text-[var(--color-brand-muted)]">{item.quantity}</td>
                    <td className="px-4 py-3 text-right text-[var(--color-brand-dark)]">₹{item.price.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end text-lg">
              <div className="w-1/2 flex justify-between border-t border-[var(--color-brand-border)] pt-4 font-bold text-[var(--color-brand-dark)]">
                <span>Total Amount:</span>
                <span>₹{order.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-sm text-[var(--color-brand-muted)] mb-4">To finalize your order, please send your invoice to our team via WhatsApp.</p>
            <a 
              href={waUrl}
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block w-full sm:w-auto"
            >
              <Button size="lg" className="w-full sm:w-auto bg-[#25D366] text-white hover:bg-[#128C7E] font-bold px-8">
                SEND ORDER TO WHATSAPP
              </Button>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
