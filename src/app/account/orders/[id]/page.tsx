import React from 'react';
import Link from 'next/link';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { OrderTimeline } from '@/components/ecommerce/OrderTimeline';
import { ArrowLeft, Printer, MessageCircle } from 'lucide-react';

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect(`/login?callbackUrl=/account/orders/${id}`);
  }

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
      items: {
        include: {
          product: true
        }
      }
    }
  });

  if (!order || order.user.email !== session.user.email) {
    notFound();
  }

  const waMessage = `Hi, I need help with my Order #${order.id.slice(-8).toUpperCase()}. Current Status: ${order.status}.`;
  const waUrl = `https://wa.me/918558085579?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="bg-[#FAF7F0] min-h-[80vh] pt-8 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/account" className="text-[var(--color-brand-burgundy)] font-bold flex items-center hover:underline">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Orders
            </Link>
          </div>
        </div>

        <div className="bg-white border border-[var(--color-brand-border)] shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-[var(--color-brand-border)] bg-[#fdfbf7] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="font-serif text-3xl text-[var(--color-brand-dark)]">Order #{order.id.slice(-8).toUpperCase()}</h1>
              <p className="text-[var(--color-brand-muted)] text-sm mt-1">Placed on {format(new Date(order.createdAt), 'MMMM d, yyyy')}</p>
            </div>
            <div className="flex gap-3">
              <Link href={`/invoice/${order.id}`} target="_blank">
                <Button variant="outline" className="font-bold flex items-center gap-2">
                  <Printer className="w-4 h-4" /> Print Invoice
                </Button>
              </Link>
              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#25D366] text-white hover:bg-[#128C7E] font-bold flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> Need Help?
                </Button>
              </a>
            </div>
          </div>

          <div className="p-6 md:p-10 border-b border-[var(--color-brand-border)]">
            <OrderTimeline status={order.status} />
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-brand-dark)] mb-4">Delivery Estimate</h2>
              {order.estimatedDelivery ? (
                <p className="text-lg text-[var(--color-brand-burgundy)] font-bold">
                  {format(new Date(order.estimatedDelivery), 'MMMM d, yyyy')}
                </p>
              ) : (
                <p className="text-[var(--color-brand-muted)]">
                  To be calculated. We will notify you once your order is processed.
                </p>
              )}
            </div>
            
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-brand-dark)] mb-4">Shipping Details</h2>
              <p className="text-[var(--color-brand-muted)] whitespace-pre-wrap">{order.notes || 'No specific shipping notes provided.'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[var(--color-brand-border)] shadow-sm">
          <div className="p-6 border-b border-[var(--color-brand-border)]">
            <h2 className="font-bold text-xl text-[var(--color-brand-dark)]">Order Items</h2>
          </div>
          
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF7F0] text-[var(--color-brand-dark)] border-b border-[var(--color-brand-border)]">
                  <th className="p-4 font-bold text-xs uppercase tracking-wider">Product</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-center">Qty</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-right">Price</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id} className="border-b border-[var(--color-brand-border)]">
                    <td className="p-4">
                      <p className="font-bold text-sm text-[var(--color-brand-dark)]">{item.product.name}</p>
                      <p className="text-xs text-[var(--color-brand-muted)] mt-1">Size: {item.size || 'N/A'}</p>
                    </td>
                    <td className="p-4 text-center text-sm text-[var(--color-brand-muted)]">{item.quantity}</td>
                    <td className="p-4 text-right text-sm text-[var(--color-brand-muted)]">₹{item.price.toLocaleString()}</td>
                    <td className="p-4 text-right font-bold text-sm text-[var(--color-brand-dark)]">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 bg-[#fdfbf7] flex justify-end">
            <div className="w-full sm:w-1/2 md:w-1/3">
              <div className="flex justify-between py-2 border-b border-[var(--color-brand-border)]">
                <span className="text-[var(--color-brand-muted)] font-bold text-sm">Subtotal</span>
                <span className="text-[var(--color-brand-dark)] text-sm">₹{order.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-4">
                <span className="text-[var(--color-brand-dark)] font-bold text-lg">Total Amount</span>
                <span className="text-[var(--color-brand-burgundy)] font-bold text-lg">₹{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
