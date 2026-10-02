import React from 'react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getUserByIdWithDetails, updateUserRole, deleteUserAndData } from '@/lib/userStore';
import { 
  ArrowLeft, 
  ShieldCheck, 
  KeyRound, 
  Phone, 
  Mail, 
  MessageSquare, 
  MapPin, 
  Calendar, 
  ShoppingBag, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  UserCog
} from 'lucide-react';
import { revalidatePath } from 'next/cache';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getUserByIdWithDetails(id);
  return {
    title: `${user?.name || 'User'} - Profile & Contact Dossier | Admin Suite`
  };
}

export default async function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getUserByIdWithDetails(id);

  if (!user) {
    notFound();
  }

  // Server action to update user role
  async function handleRoleChange(formData: FormData) {
    "use server";
    const newRole = formData.get("role") as string;
    if (newRole) {
      await updateUserRole(id, newRole);
      revalidatePath(`/admin/users/${id}`);
      revalidatePath('/admin/users');
    }
  }

  // Server action to delete user
  async function handleDeleteUser() {
    "use server";
    await deleteUserAndData(id);
    revalidatePath('/admin/users');
    redirect('/admin/users');
  }

  const isAdmin = user.role === 'ADMIN' || user.role === 'SUPERADMIN';
  const isGoogle = user.provider.toLowerCase().includes('google');
  const cleanPhone = (user.phone || '').replace(/\D/g, '');
  const waMessage = `Namaste ${user.name || 'Sir/Madam'}, this is the team at Bhadohi Arts Weave regarding your customer account (ID: ${user.id}). How may we assist you today?`;

  return (
    <div className="space-y-6">
      {/* Back navigation & Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/users"
            className="w-9 h-9 rounded-xl bg-white hover:bg-stone-100 border border-stone-300 flex items-center justify-center text-stone-700 transition-colors shadow-2xs"
            title="Back to Users Directory"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-serif font-bold text-stone-900">{user.name || 'Anonymous User'}</h1>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                isAdmin 
                  ? 'bg-[#990E14]/10 text-[#990E14] border border-[#990E14]/20' 
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                {user.role}
              </span>
            </div>
            <p className="text-xs text-stone-400 font-mono mt-0.5">UID: {user.id}</p>
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-2">
          {user.phone && (
            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Customer</span>
            </a>
          )}
          {user.email && (
            <a
              href={`mailto:${user.email}?subject=${encodeURIComponent('Regarding your Bhadohi Arts Weave Account')}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 text-xs font-bold shadow-2xs transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-stone-600" />
              <span>Send Email</span>
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Login & Security + Contact Channels */}
        <div className="space-y-6">
          
          {/* Card 1: Login & Security Details */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
              <KeyRound className="w-4 h-4 text-[#DE8B22]" />
              <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                Login & Authentication Details
              </h2>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <p className="text-stone-400 font-medium text-[11px] uppercase tracking-wider">Authentication Provider</p>
                <div className="flex items-center gap-2 mt-1">
                  {isGoogle ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                      <span className="font-bold text-blue-600">G</span>
                      Google OAuth 2.0 (SSO)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 font-semibold border border-amber-200">
                      <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                      Email & Password (Credentials)
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-stone-400 font-medium text-[11px] uppercase tracking-wider">Registered Email</p>
                <p className="font-bold text-stone-800 text-sm mt-0.5 break-all">{user.email || 'None'}</p>
                <p className="text-[10px] text-emerald-600 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3 h-3" />
                  Primary Authentication Handle
                </p>
              </div>

              <div>
                <p className="text-stone-400 font-medium text-[11px] uppercase tracking-wider">Session Status</p>
                <div className="flex items-center gap-2 mt-1">
                  {user.hasActiveSession ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Active Live Session
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-100 text-stone-600 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      No Active Web Session
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-stone-400 font-medium text-[11px] uppercase tracking-wider">Account Created</p>
                <p className="font-semibold text-stone-800 mt-0.5">
                  {user.createdAt ? new Date(user.createdAt).toLocaleString('en-IN', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  }) : 'N/A'}
                </p>
              </div>

              <div>
                <p className="text-stone-400 font-medium text-[11px] uppercase tracking-wider">Last Profile Update</p>
                <p className="font-semibold text-stone-800 mt-0.5">
                  {user.updatedAt ? new Date(user.updatedAt).toLocaleString('en-IN', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  }) : 'N/A'}
                </p>
              </div>
            </div>

            {/* Role Management Form */}
            <div className="pt-4 border-t border-stone-100">
              <form action={handleRoleChange} className="space-y-2">
                <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1">
                  <UserCog className="w-3.5 h-3.5 text-[#990E14]" />
                  <span>Update Account Role</span>
                </label>
                <div className="flex items-center gap-2">
                  <select
                    name="role"
                    defaultValue={user.role}
                    className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-[#990E14]"
                  >
                    <option value="USER">Customer (USER)</option>
                    <option value="ADMIN">Administrator (ADMIN)</option>
                    <option value="SUPERADMIN">Super Admin (SUPERADMIN)</option>
                  </select>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#990E14] hover:bg-[#7B090E] text-white text-xs font-bold rounded-xl transition-colors shadow-2xs"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Card 2: Contact Channels */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
              <Phone className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                Direct Contact Channels
              </h2>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <p className="text-stone-400 font-medium text-[11px] uppercase tracking-wider">Phone / Mobile Number</p>
                <p className="font-bold text-stone-900 text-base mt-0.5">
                  {user.phone || <span className="text-stone-400 text-sm font-normal italic">No phone recorded</span>}
                </p>
              </div>

              {user.phone && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={`tel:${cleanPhone}`}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl transition-colors text-xs"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#990E14]" />
                    <span>Call Phone</span>
                  </a>
                  <a
                    href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-xl border border-emerald-200 transition-colors text-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Card 3: Danger Zone */}
          <div className="bg-rose-50/60 rounded-2xl border border-rose-200 p-5 space-y-3">
            <div className="flex items-center gap-2 text-rose-800">
              <AlertTriangle className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider">Danger Zone</h3>
            </div>
            <p className="text-xs text-rose-700/80 leading-relaxed">
              Permanently delete this user, including all saved addresses, session tokens, order records, and shopping carts.
            </p>
            <form action={handleDeleteUser}>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Permanently Delete User</span>
              </button>
            </form>
          </div>

        </div>

        {/* Right Column: Addresses + Orders History */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 4: Saved Delivery Addresses */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#DE8B22]" />
                <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                  Saved Contact & Delivery Addresses
                </h2>
              </div>
              <span className="text-xs text-stone-500 font-semibold">
                {user.addresses.length} {user.addresses.length === 1 ? 'Address' : 'Addresses'}
              </span>
            </div>

            {user.addresses.length === 0 ? (
              <div className="py-8 text-center text-stone-400">
                <MapPin className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-xs font-semibold text-stone-600">No physical addresses on file</p>
                <p className="text-[11px] text-stone-400 mt-0.5">Addresses are recorded automatically upon checkout or inquiry.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {user.addresses.map((addr) => (
                  <div key={addr.id} className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md bg-stone-200/80 text-stone-700 text-[10px] font-bold uppercase tracking-wider">
                        {addr.type || 'DELIVERY'}
                      </span>
                      <span className="text-[10px] font-mono text-stone-400">{addr.country || 'India'}</span>
                    </div>
                    <p className="font-bold text-stone-900 text-sm">{addr.addressLine}</p>
                    <p className="text-stone-600 font-medium">
                      {addr.city}, {addr.state} - <span className="font-mono font-bold text-stone-900">{addr.pinCode}</span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Card 5: Complete Order History */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#990E14]" />
                <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                  Order History & Commercial Value
                </h2>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-stone-500">Total Spend:</span>
                <span className="text-base font-serif font-bold text-[#990E14]">
                  ₹{user.totalSpent.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {user.orders.length === 0 ? (
              <div className="py-8 text-center text-stone-400">
                <ShoppingBag className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-xs font-semibold text-stone-600">No orders placed yet</p>
                <p className="text-[11px] text-stone-400 mt-0.5">When this user places an order or custom quote, it will appear here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#FAF7F0] border-b border-stone-200 text-stone-700 text-[10px] font-bold uppercase tracking-wider">
                      <th className="py-2.5 px-3">Order ID</th>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Items</th>
                      <th className="py-2.5 px-3">Total Amount</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {user.orders.map((order) => (
                      <tr key={order.id} className="hover:bg-stone-50/60 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-stone-800">{order.id}</td>
                        <td className="py-3 px-3 text-stone-600">
                          {order.date ? new Date(order.date).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          }) : 'N/A'}
                        </td>
                        <td className="py-3 px-3 text-stone-600">{order.itemsCount} items</td>
                        <td className="py-3 px-3 font-bold text-stone-900">
                          {order.total ? `₹${order.total.toLocaleString('en-IN')}` : 'Custom Quote'}
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            order.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            order.status === 'PROCESSING' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                            order.status === 'CANCELLED' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                            'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="inline-flex items-center gap-1 text-[#990E14] hover:underline font-bold text-[11px]"
                          >
                            <span>View</span>
                            <ExternalLink className="w-2.5 h-2.5" />
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
  );
}
