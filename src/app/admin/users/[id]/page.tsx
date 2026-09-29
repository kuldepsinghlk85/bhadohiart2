import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import { format } from 'date-fns';

async function deleteUserWithData(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  if (!id) return;

  const userOrders = await prisma.order.findMany({ where: { userId: id }, select: { id: true } });
  const orderIds = userOrders.map(o => o.id);

  await prisma.$transaction([
    prisma.orderItem.deleteMany({ where: { orderId: { in: orderIds } } }),
    prisma.payment.deleteMany({ where: { orderId: { in: orderIds } } }),
    prisma.order.deleteMany({ where: { userId: id } }),
    prisma.address.deleteMany({ where: { userId: id } }),
    prisma.wishlist.deleteMany({ where: { userId: id } }),
    prisma.cartItem.deleteMany({ where: { cart: { userId: id } } }),
    prisma.cart.deleteMany({ where: { userId: id } }),
    prisma.activityLog.deleteMany({ where: { userId: id } }),
    prisma.account.deleteMany({ where: { userId: id } }),
    prisma.session.deleteMany({ where: { userId: id } }),
    prisma.user.delete({ where: { id } })
  ]);

  redirect('/admin/users');
}

export default async function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let user: any = null; 
  try { 
    user = await prisma.user.findUnique({
      where: { id },
      include: {
        orders: {
          orderBy: { createdAt: 'desc' },
          include: {
            items: true
          }
        }
      }
    });
  } catch (e) {}

  if (!user) {
    notFound();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/users" className="text-[var(--color-brand-burgundy)] font-bold">
            ← Back to Users
          </Link>
          <h1 className="text-3xl font-serif text-[var(--color-brand-dark)]">User Details</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: User Profile Info */}
        <div className="space-y-6">
          <div className="bg-white border border-[var(--color-brand-border)] p-6">
            <h2 className="text-xl font-bold font-sans text-[var(--color-brand-dark)] mb-4">Profile Information</h2>
            <div className="space-y-3 text-sm text-[var(--color-brand-dark)]">
              <div>
                <p className="font-bold text-[var(--color-brand-muted)] text-xs uppercase mb-1">Name</p>
                <p className="font-bold">{user.name || 'N/A'}</p>
              </div>
              <div>
                <p className="font-bold text-[var(--color-brand-muted)] text-xs uppercase mb-1">Email</p>
                <p className="font-bold">{user.email || 'N/A'}</p>
              </div>
              <div>
                <p className="font-bold text-[var(--color-brand-muted)] text-xs uppercase mb-1">Phone</p>
                <p className="font-bold">{user.phone || 'N/A'}</p>
              </div>
              <div>
                <p className="font-bold text-[var(--color-brand-muted)] text-xs uppercase mb-1">Role</p>
                <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                  user.role === 'ADMIN' ? 'bg-[var(--color-brand-burgundy)] text-white' : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.role}
                </span>
              </div>
              <div>
                <p className="font-bold text-[var(--color-brand-muted)] text-xs uppercase mb-1">Joined</p>
                <p className="font-bold">{format(new Date(user.createdAt), 'MMM d, yyyy HH:mm')}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--color-brand-border)]">
              <h3 className="font-bold text-red-600 mb-2">Danger Zone</h3>
              <p className="text-xs text-[var(--color-brand-muted)] mb-4">
                Deleting this user will permanently remove their account and all associated data, including their order history, cart, and addresses.
              </p>
              <form action={deleteUserWithData}>
                <input type="hidden" name="id" value={user.id} />
                <button 
                  type="submit" 
                  className="w-full bg-red-600 text-white font-bold text-sm px-4 py-2 hover:bg-red-700 transition-colors"
                  onClick={(e) => {
                    if(!confirm('Are you sure you want to permanently delete this user and all their data? This action cannot be undone.')) {
                      e.preventDefault();
                    }
                  }}
                >
                  Delete User & Data
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column: Order History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-[var(--color-brand-border)] p-6">
            <h2 className="text-xl font-bold font-sans text-[var(--color-brand-dark)] mb-4">Order History</h2>
            
            {user.orders.length === 0 ? (
              <p className="text-[var(--color-brand-muted)] text-sm">This user hasn't placed any orders yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#FAF7F0] border-b border-[var(--color-brand-border)] text-[var(--color-brand-dark)]">
                      <th className="p-3 font-bold text-xs uppercase">Order ID</th>
                      <th className="p-3 font-bold text-xs uppercase">Date</th>
                      <th className="p-3 font-bold text-xs uppercase">Items</th>
                      <th className="p-3 font-bold text-xs uppercase">Total</th>
                      <th className="p-3 font-bold text-xs uppercase">Status</th>
                      <th className="p-3 font-bold text-xs uppercase text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.orders.map(order => (
                      <tr key={order.id} className="border-b border-[var(--color-brand-border)] hover:bg-[#FAF7F0]">
                        <td className="p-3 text-sm font-mono text-[var(--color-brand-muted)]">{order.id.slice(-6).toUpperCase()}</td>
                        <td className="p-3 text-sm">{format(new Date(order.createdAt), 'MMM d, yyyy')}</td>
                        <td className="p-3 text-sm">{order.items.length}</td>
                        <td className="p-3 text-sm font-bold">₹{order.total.toLocaleString()}</td>
                        <td className="p-3 text-sm">
                          <span className={`px-2 py-1 text-[10px] font-bold rounded-full ${
                            order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                            order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-3 text-sm text-right">
                          <Link href={`/admin/orders/${order.id}`} className="text-[var(--color-brand-burgundy)] hover:underline font-bold text-xs">
                            View Order
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
