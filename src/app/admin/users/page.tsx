import React from 'react';
import { getAllUsersWithDetails } from '@/lib/userStore';
import UsersDirectoryClient from './UsersDirectoryClient';

export const metadata = {
  title: 'Users & Contact Directory | Bhadohi Arts Management Suite',
  description: 'View all registered customers, authentication methods, security credentials, and contact details.'
};

export default async function AdminUsersPage() {
  const users = await getAllUsersWithDetails();

  return (
    <div className="space-y-6">
      <UsersDirectoryClient initialUsers={users} />
    </div>
  );
}
