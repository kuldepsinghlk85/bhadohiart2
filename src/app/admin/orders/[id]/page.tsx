import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Image from 'next/image';
import { revalidatePath } from 'next/cache';

async function updateOrderStatus(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;
  const estimatedDelivery = formData.get("estimatedDelivery") as string;
  const notes = formData.get("notes") as string;
  
  if (id && status) {
    try {
      await prisma.order.update({
        where: { id },
        data: { 
          status,
          notes,
          estimatedDelivery: estimatedDelivery ? new Date(estimatedDelivery) : null
        }
      });
    } catch (e) {
      // Handle json orders
      const { readJsonStore, upsertJsonItem } = await import('@/lib/jsonStore');
      const orders = readJsonStore<any>('orders.json');
      const jsonOrder = orders.find((o: any) => o.id === id);
      if (jsonOrder) {
        jsonOrder.status = status;
        if (notes !== undefined) jsonOrder.notes = notes;
        if (estimatedDelivery) jsonOrder.estimatedDelivery = new Date(estimatedDelivery).toISOString();
        upsertJsonItem('orders.json', jsonOrder);
      }
    }
    revalidatePath(`/admin/orders/${id}`);
    revalidatePath(`/admin/orders`);
  }
}

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let order: any = null; 
  try { 
    order = await prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        items: {
          include: {
            product: true
          }
        },
        payment: true
      }
    });
  } catch (e) {}

  if (!order) {
    const { readJsonStore } = await import('@/lib/jsonStore');
    const orders = readJsonStore<any>('orders.json');
    order = orders.find((o: any) => o.id === id);
    
    if (!order) {
      notFound();
    }

    // Enhance order items with product details from JSON since DB is offline
    const products = readJsonStore<any>('products.json');
    const globalAny: any = global;
    const allProducts = [...products, ...(globalAny.__mockNewProducts || [])];
    
    if (order.items && Array.isArray(order.items)) {
      order.items = order.items.map((item: any) => {
        const prod = allProducts.find(p => p.id === item.productId);
        if (prod) {
          return {
            ...item,
            productName: prod.name || item.productName,
            productImage: prod.images?.[0]?.url || item.productImage
          };
        }
        return item;
      });
    }
  }

  let trackingText = '';
  if (order.notes && !order.notes.startsWith('{')) {
    // Basic check so we don't output JSON shipping address if it was reused for that
    trackingText = `\n\nDelivery/Tracking Update:\n${order.notes}`;
  }

  const invoiceUrl = `https://bhadohiartsweave.in/invoice/${order.id}`;
  const waMessage = `Hello ${order.user.name || 'Customer'},\n\nYour order #${order.id.slice(-8).toUpperCase()} status has been updated to: *${order.status}*.\n\nYou can view your invoice here:\n${invoiceUrl}${trackingText}\n\nThank you for shopping with Bhadohi Arts & Weave!`;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/orders" className="text-[var(--color-brand-burgundy)] font-bold">
            ← Back
          </Link>
          <h1 className="text-3xl font-serif text-[var(--color-brand-dark)]">Order Details</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href={`/invoice/${order.id}`} target="_blank">
            <span className="text-[var(--color-brand-dark)] font-bold text-sm bg-white px-3 py-1 border border-[var(--color-brand-border)] hover:bg-[#FAF7F0]">
              Print Invoice
            </span>
          </Link>
          <span className="text-[var(--color-brand-muted)] font-mono bg-white px-3 py-1 border border-[var(--color-brand-border)]">
            ID: {order.id}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Order Items & Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-[var(--color-brand-border)] p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-sans text-[var(--color-brand-dark)]">Items</h2>
              <Link 
                href={`/admin/quotes?customer=${encodeURIComponent(order.user?.name || order.user?.email || 'Customer')}&products=${order.items.map((i: any) => i.productId).join(',')}`}
                className="bg-[var(--color-brand-burgundy)] text-white px-4 py-2 text-sm font-bold hover:bg-[#FAF7F0] hover:text-[var(--color-brand-burgundy)] hover:border hover:border-[var(--color-brand-burgundy)] transition-colors"
              >
                Generate Quote from Order
              </Link>
            </div>
            
            <div className="space-y-4">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center border-b border-[var(--color-brand-border)] pb-4 last:border-0 last:pb-0 gap-4">
                  
                  {/* Image */}
                  <div className="w-20 h-20 relative bg-gray-100 flex-shrink-0">
                    {item.productImage || item.product?.images?.[0]?.url ? (
                      <Image 
                        src={item.productImage || item.product?.images?.[0]?.url} 
                        alt={item.productName || item.product?.name || 'Product'} 
                        fill 
                        className="object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Image</div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-[var(--color-brand-dark)]">{item.productName || item.product?.name || 'Product'}</h3>
                    <div className="text-sm text-[var(--color-brand-muted)]">
                      Qty: {item.quantity} 
                      {item.size && <span> | Size: {item.size}</span>}
                    </div>
                  </div>
                  <div className="font-bold text-[var(--color-brand-dark)]">
                    {typeof item.price === 'number' ? `₹${item.price.toLocaleString()}` : (item.price || 'Request Quote')}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--color-brand-border)] flex justify-between items-center">
              <span className="font-bold text-[var(--color-brand-dark)] text-lg">Total</span>
              <span className="font-bold text-[var(--color-brand-burgundy)] text-xl">
                {order.total ? `₹${order.total.toLocaleString()}` : 'Request Quote'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Customer & Status */}
        <div className="space-y-6">
          <div className="bg-white border border-[var(--color-brand-border)] p-6">
            <h2 className="text-xl font-bold font-sans text-[var(--color-brand-dark)] mb-4">Order Status</h2>
            <form action={updateOrderStatus} className="flex flex-col gap-4 mb-4 border-b border-[var(--color-brand-border)] pb-4">
              <input type="hidden" name="id" value={order.id} />
              
              <div>
                <label className="block text-xs font-bold text-[var(--color-brand-muted)] mb-1 uppercase tracking-wider">Status</label>
                <select 
                  name="status" 
                  defaultValue={order.status}
                  className="w-full border border-[var(--color-brand-border)] px-3 py-2 text-sm outline-none focus:border-[var(--color-brand-burgundy)]"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="PROCESSING">PROCESSING</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--color-brand-muted)] mb-1 uppercase tracking-wider">Est. Delivery Date</label>
                <input 
                  type="date"
                  name="estimatedDelivery"
                  defaultValue={order.estimatedDelivery ? new Date(order.estimatedDelivery).toISOString().split('T')[0] : ''}
                  className="w-full border border-[var(--color-brand-border)] px-3 py-2 text-sm outline-none focus:border-[var(--color-brand-burgundy)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--color-brand-muted)] mb-1 uppercase tracking-wider">Tracking Info / Courier Notes</label>
                <textarea 
                  name="notes"
                  defaultValue={(!order.notes || order.notes.startsWith('{')) ? '' : order.notes}
                  placeholder="e.g. Courier: BlueDart, AWB: 12345678"
                  className="w-full border border-[var(--color-brand-border)] px-3 py-2 text-sm outline-none focus:border-[var(--color-brand-burgundy)] h-20"
                />
              </div>

              <button 
                type="submit"
                className="bg-[var(--color-brand-dark)] w-full text-white px-4 py-2 text-sm font-bold hover:bg-[var(--color-brand-burgundy)] transition-colors"
              >
                Save Updates
              </button>
            </form>

            <a 
              href={`https://wa.me/?text=${encodeURIComponent(waMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-[#25D366] text-white px-4 py-2 text-sm font-bold hover:bg-[#128C7E] transition-colors"
            >
              Send Update via WhatsApp
            </a>
          </div>

          <div className="bg-white border border-[var(--color-brand-border)] p-6">
            <h2 className="text-xl font-bold font-sans text-[var(--color-brand-dark)] mb-4">Customer Info</h2>
            <div className="space-y-2 text-sm text-[var(--color-brand-dark)]">
              <p><span className="font-bold">Name:</span> {order.user.name || 'N/A'}</p>
              <p><span className="font-bold">Email:</span> {order.user.email}</p>
              <p><span className="font-bold">Phone:</span> {order.user.phone || 'N/A'}</p>
              <p><span className="font-bold">Date:</span> {format(new Date(order.createdAt), 'MMM d, yyyy HH:mm')}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
