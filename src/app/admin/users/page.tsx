import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { format } from 'date-fns';

export default async function AdminUsersPage() {
  let users: any[] = []; try { users = await prisma.user.findMany({
    include: {
      _count: {
        select: { orders: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  }); } catch(e) {}

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif text-[var(--color-brand-dark)]">Manage Users</h1>
      </div>

      <div className="bg-white border border-[var(--color-brand-border)] overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAF7F0] border-b border-[var(--color-brand-border)] text-[var(--color-brand-dark)]">
              <th className="p-4 font-bold text-sm">Name</th>
              <th className="p-4 font-bold text-sm">Email</th>
              <th className="p-4 font-bold text-sm">Phone</th>
              <th className="p-4 font-bold text-sm">Role</th>
              <th className="p-4 font-bold text-sm">Joined</th>
              <th className="p-4 font-bold text-sm">Orders</th>
              <th className="p-4 font-bold text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-[var(--color-brand-muted)]">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id} className="border-b border-[var(--color-brand-border)] hover:bg-[#FAF7F0]">
                  <td className="p-4 text-sm font-bold text-[var(--color-brand-dark)]">{user.name || 'N/A'}</td>
                  <td className="p-4 text-sm">{user.email || 'N/A'}</td>
                  <td className="p-4 text-sm">{user.phone || 'N/A'}</td>
                  <td className="p-4 text-sm">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                      user.role === 'ADMIN' ? 'bg-[var(--color-brand-burgundy)] text-white' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-sm">{format(new Date(user.createdAt), 'MMM d, yyyy')}</td>
                  <td className="p-4 text-sm font-bold">{user._count.orders}</td>
                  <td className="p-4 text-sm text-right">
                    <Link href={`/admin/users/${user.id}`} className="text-[var(--color-brand-burgundy)] hover:underline font-bold text-xs">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
