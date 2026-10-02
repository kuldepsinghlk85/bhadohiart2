"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Search, 
  Phone, 
  Mail, 
  MessageSquare, 
  MapPin, 
  ShieldCheck, 
  KeyRound, 
  Download, 
  ExternalLink, 
  Copy, 
  Check, 
  ShoppingBag, 
  Calendar,
  Sparkles,
  ArrowUpDown,
  Filter,
  UserCheck
} from 'lucide-react';
import { UnifiedUser } from '@/lib/userStore';

interface UsersDirectoryClientProps {
  initialUsers: UnifiedUser[];
}

export default function UsersDirectoryClient({ initialUsers }: UsersDirectoryClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'USER' | 'ADMIN'>('ALL');
  const [providerFilter, setProviderFilter] = useState<'ALL' | 'Google' | 'Credentials'>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Stats calculation
  const stats = useMemo(() => {
    const total = initialUsers.length;
    const customers = initialUsers.filter(u => u.role === 'USER').length;
    const admins = initialUsers.filter(u => u.role === 'ADMIN' || u.role === 'SUPERADMIN').length;
    const withPhone = initialUsers.filter(u => u.phone && u.phone.trim().length > 5).length;
    const withOrders = initialUsers.filter(u => u.ordersCount > 0).length;
    const totalLTV = initialUsers.reduce((sum, u) => sum + (u.totalSpent || 0), 0);

    return { total, customers, admins, withPhone, withOrders, totalLTV };
  }, [initialUsers]);

  // Filtered users
  const filteredUsers = useMemo(() => {
    return initialUsers.filter(user => {
      // Search matching
      const query = searchQuery.toLowerCase().trim();
      const nameMatch = (user.name || '').toLowerCase().includes(query);
      const emailMatch = (user.email || '').toLowerCase().includes(query);
      const phoneMatch = (user.phone || '').toLowerCase().includes(query);
      const cityMatch = user.addresses.some(a => 
        (a.city || '').toLowerCase().includes(query) || 
        (a.state || '').toLowerCase().includes(query) ||
        (a.pinCode || '').toLowerCase().includes(query)
      );

      const matchesSearch = !query || nameMatch || emailMatch || phoneMatch || cityMatch;

      // Role matching
      const matchesRole = 
        roleFilter === 'ALL' || 
        (roleFilter === 'USER' && user.role === 'USER') || 
        (roleFilter === 'ADMIN' && (user.role === 'ADMIN' || user.role === 'SUPERADMIN'));

      // Provider matching
      const matchesProvider = 
        providerFilter === 'ALL' || 
        (providerFilter === 'Google' && user.provider.toLowerCase().includes('google')) ||
        (providerFilter === 'Credentials' && (user.provider.toLowerCase().includes('credential') || user.provider === 'Credentials'));

      return matchesSearch && matchesRole && matchesProvider;
    });
  }, [initialUsers, searchQuery, roleFilter, providerFilter]);

  // Copy to clipboard helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // CSV Export helper
  const handleExportCSV = () => {
    const headers = [
      'User ID',
      'Name',
      'Email',
      'Phone',
      'Role',
      'Auth Provider',
      'Registration Date',
      'Primary Address',
      'City',
      'State',
      'Pincode',
      'Total Orders',
      'Total Spent (INR)'
    ];

    const rows = filteredUsers.map(u => {
      const primaryAddr = u.addresses[0];
      return [
        `"${u.id}"`,
        `"${u.name || ''}"`,
        `"${u.email || ''}"`,
        `"${u.phone || ''}"`,
        `"${u.role}"`,
        `"${u.provider}"`,
        `"${u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN') : ''}"`,
        `"${primaryAddr ? primaryAddr.addressLine : ''}"`,
        `"${primaryAddr ? primaryAddr.city : ''}"`,
        `"${primaryAddr ? primaryAddr.state : ''}"`,
        `"${primaryAddr ? primaryAddr.pinCode : ''}"`,
        u.ordersCount,
        u.totalSpent
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `bhadohi_users_and_contacts_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#990E14] mb-1">
            <Users className="w-4 h-4 text-[#DE8B22]" />
            <span>Master User & Contact Directory</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-bold text-stone-900">
            Registered Users & Customer Contacts
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm mt-1">
            Real-time registry of all customer accounts, login authentication methods, verified contact numbers, and delivery addresses.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold rounded-xl border border-stone-300 shadow-2xs transition-all hover:border-stone-400 cursor-pointer"
            title="Download CSV of all filtered users & contacts"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Export Contacts (CSV)</span>
          </button>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <div className="bg-gradient-to-br from-stone-900 to-stone-800 text-white rounded-2xl p-4 sm:p-5 shadow-sm border border-stone-700/50 relative overflow-hidden">
          <div className="absolute right-3 top-3 w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center pointer-events-none">
            <Users className="w-6 h-6 text-[#DE8B22]" />
          </div>
          <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Total Registered</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF7F0]">{stats.total}</span>
            <span className="text-[11px] text-emerald-400 font-medium">Accounts</span>
          </div>
          <p className="text-[11px] text-stone-400 mt-2 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Database Synced
          </p>
        </div>

        {/* Reachable Phone Numbers */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-stone-200 relative overflow-hidden">
          <div className="absolute right-3 top-3 w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center pointer-events-none">
            <Phone className="w-6 h-6 text-emerald-600" />
          </div>
          <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Reachable Contacts</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">{stats.withPhone}</span>
            <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              {stats.total > 0 ? `${Math.round((stats.withPhone / stats.total) * 100)}%` : '0%'}
            </span>
          </div>
          <p className="text-[11px] text-stone-500 mt-2">Available for WhatsApp & Calling</p>
        </div>

        {/* Buyers with Orders */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-stone-200 relative overflow-hidden">
          <div className="absolute right-3 top-3 w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center pointer-events-none">
            <ShoppingBag className="w-6 h-6 text-[#DE8B22]" />
          </div>
          <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Active Customers</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">{stats.withOrders}</span>
            <span className="text-[11px] text-stone-500 font-medium">Placed Orders</span>
          </div>
          <p className="text-[11px] text-stone-500 mt-2">Valued Repeat Buyers</p>
        </div>

        {/* Total Lifetime Value */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-stone-200 relative overflow-hidden">
          <div className="absolute right-3 top-3 w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center pointer-events-none">
            <Sparkles className="w-6 h-6 text-[#990E14]" />
          </div>
          <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Total Customer Value</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-[#990E14]">
              ₹{stats.totalLTV.toLocaleString('en-IN')}
            </span>
          </div>
          <p className="text-[11px] text-stone-500 mt-2">Across recorded customer orders</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-stone-200 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by customer name, email, phone number, city, or pincode..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#990E14]/20 focus:border-[#990E14] transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Role Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl">
            <button
              onClick={() => setRoleFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                roleFilter === 'ALL'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All ({initialUsers.length})
            </button>
            <button
              onClick={() => setRoleFilter('USER')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                roleFilter === 'USER'
                  ? 'bg-white text-[#990E14] shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Customers ({stats.customers})
            </button>
            <button
              onClick={() => setRoleFilter('ADMIN')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                roleFilter === 'ADMIN'
                  ? 'bg-white text-[#990E14] shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Admins ({stats.admins})
            </button>
          </div>

          {/* Provider Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-stone-500 hidden sm:inline">Login Type:</span>
            <select
              value={providerFilter}
              onChange={(e) => setProviderFilter(e.target.value as any)}
              className="text-xs font-semibold bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 outline-none focus:border-[#990E14]"
            >
              <option value="ALL">All Login Methods</option>
              <option value="Credentials">Email & Password</option>
              <option value="Google">Google OAuth</option>
            </select>
          </div>

        </div>

        {/* Filter Summary */}
        <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
          <div>
            Showing <strong className="text-stone-800">{filteredUsers.length}</strong> of {initialUsers.length} users
            {searchQuery && <span> matching "<span className="text-[#990E14] font-semibold">{searchQuery}</span>"</span>}
          </div>
          {(searchQuery || roleFilter !== 'ALL' || providerFilter !== 'ALL') && (
            <button
              onClick={() => { setSearchQuery(''); setRoleFilter('ALL'); setProviderFilter('ALL'); }}
              className="text-[#990E14] hover:underline font-bold text-xs"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Users & Contacts Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF7F0] border-b border-stone-200 text-stone-800 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">User Profile</th>
                <th className="py-3.5 px-4">Login & Authentication</th>
                <th className="py-3.5 px-4">Contact Channels</th>
                <th className="py-3.5 px-4">Primary Address</th>
                <th className="py-3.5 px-4">Orders & LTV</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-400">
                    <Users className="w-10 h-10 mx-auto mb-2 opacity-30" />
                    <p className="text-sm font-semibold text-stone-600">No users found</p>
                    <p className="text-xs text-stone-400 mt-1">Try refining your search query or reset filters.</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const primaryAddr = user.addresses[0];
                  const cleanPhone = (user.phone || '').replace(/\D/g, '');
                  const waMessage = `Namaste ${user.name || 'Sir/Madam'}, Greetings from Bhadohi Arts Weave! We are following up regarding your account and carpet selections.`;
                  const isAdmin = user.role === 'ADMIN' || user.role === 'SUPERADMIN';
                  const isGoogle = user.provider.toLowerCase().includes('google');

                  return (
                    <tr key={user.id} className="hover:bg-[#FAF7F0]/60 transition-colors">
                      
                      {/* 1. User Profile */}
                      <td className="py-4 px-4 align-top">
                        <div className="flex items-start gap-3">
                          {/* Avatar */}
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-xs flex-shrink-0 ${
                            isAdmin 
                              ? 'bg-gradient-to-br from-[#990E14] via-[#DE8B22] to-[#7B090E] text-white' 
                              : 'bg-gradient-to-br from-stone-800 to-stone-700 text-[#FAF7F0]'
                          }`}>
                            {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold text-stone-900 text-sm">{user.name || 'Unnamed Customer'}</span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                isAdmin 
                                  ? 'bg-[#990E14]/10 text-[#990E14] border border-[#990E14]/20' 
                                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              }`}>
                                {user.role}
                              </span>
                            </div>

                            <p className="text-[10px] text-stone-400 mt-0.5 font-mono">
                              ID: {user.id.slice(0, 14)}...
                            </p>

                            <p className="text-[10px] text-stone-400 mt-0.5 flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-stone-400" />
                              Joined: {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* 2. Login & Authentication */}
                      <td className="py-4 px-4 align-top">
                        <div className="space-y-1.5">
                          {/* Provider Badge */}
                          <div className="flex items-center gap-1.5">
                            {isGoogle ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold text-[10px] border border-blue-200">
                                <span className="font-bold text-blue-600">G</span>
                                Google OAuth
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-semibold text-[10px] border border-amber-200">
                                <KeyRound className="w-3 h-3 text-amber-600" />
                                Email & Password
                              </span>
                            )}

                            {user.hasActiveSession && (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[9px] font-bold border border-emerald-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Active
                              </span>
                            )}
                          </div>

                          {/* Email Address with Copy */}
                          <div className="flex items-center gap-1.5 text-stone-700">
                            <span className="font-medium truncate max-w-[180px]">{user.email || 'No email registered'}</span>
                            {user.email && (
                              <button
                                onClick={() => handleCopy(user.email, `email-${user.id}`)}
                                className="text-stone-400 hover:text-stone-700 p-0.5 rounded transition-colors"
                                title="Copy Email"
                              >
                                {copiedId === `email-${user.id}` ? (
                                  <Check className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* 3. Contact Channels */}
                      <td className="py-4 px-4 align-top">
                        <div className="space-y-2">
                          {/* Phone Number */}
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                            <span className="font-bold text-stone-800">
                              {user.phone || <span className="text-stone-400 font-normal italic">No phone added</span>}
                            </span>
                          </div>

                          {/* Quick Action Buttons */}
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {user.phone && (
                              <>
                                {/* Click to Call */}
                                <a
                                  href={`tel:${cleanPhone}`}
                                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[10px] font-bold transition-colors"
                                  title="Call this customer"
                                >
                                  <Phone className="w-3 h-3 text-[#990E14]" />
                                  <span>Call</span>
                                </a>

                                {/* Click to WhatsApp */}
                                <a
                                  href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMessage)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200 transition-colors"
                                  title="Open WhatsApp Chat"
                                >
                                  <MessageSquare className="w-3 h-3 text-emerald-600" />
                                  <span>WhatsApp</span>
                                </a>
                              </>
                            )}

                            {user.email && (
                              <a
                                href={`mailto:${user.email}?subject=${encodeURIComponent('Regarding your Bhadohi Arts Weave Account')}`}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[10px] font-bold transition-colors"
                                title="Send Email"
                              >
                                <Mail className="w-3 h-3 text-stone-600" />
                                <span>Email</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* 4. Primary Delivery Address */}
                      <td className="py-4 px-4 align-top">
                        {primaryAddr ? (
                          <div className="space-y-0.5 max-w-[200px]">
                            <p className="text-stone-800 font-semibold truncate flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#DE8B22] flex-shrink-0" />
                              <span>{primaryAddr.city}, {primaryAddr.state}</span>
                            </p>
                            <p className="text-[11px] text-stone-500 truncate">{primaryAddr.addressLine}</p>
                            <p className="text-[10px] font-mono text-stone-400">PIN: {primaryAddr.pinCode}</p>
                          </div>
                        ) : (
                          <span className="text-stone-400 italic text-[11px]">No address on file</span>
                        )}
                      </td>

                      {/* 5. Orders & LTV */}
                      <td className="py-4 px-4 align-top">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-800 font-bold text-[10px]">
                              {user.ordersCount} {user.ordersCount === 1 ? 'Order' : 'Orders'}
                            </span>
                          </div>
                          <p className="font-bold text-stone-900 text-xs">
                            ₹{user.totalSpent.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </td>

                      {/* 6. Actions */}
                      <td className="py-4 px-4 align-top text-right">
                        <Link
                          href={`/admin/users/${user.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF7F0] hover:bg-[#F3EDE2] text-[#990E14] font-bold rounded-xl border border-[#DE8B22]/30 transition-all text-xs shadow-2xs hover:shadow-xs"
                        >
                          <span>Dossier</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
