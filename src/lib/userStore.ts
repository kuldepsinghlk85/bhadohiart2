import prisma from '@/lib/prisma';
import { readJsonStore, writeJsonStore } from '@/lib/jsonStore';

export interface UserAddress {
  id: string;
  type: string;
  addressLine: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
}

export interface UserOrderSummary {
  id: string;
  date: string;
  total: number;
  status: string;
  itemsCount: number;
}

export interface UnifiedUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'USER' | 'ADMIN' | 'SUPERADMIN' | string;
  image?: string;
  provider: 'Credentials' | 'Google' | 'Guest' | string;
  providerAccountId?: string;
  emailVerified?: string | null;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  hasActiveSession?: boolean;
  sessionsCount?: number;
  addresses: UserAddress[];
  orders: UserOrderSummary[];
  ordersCount: number;
  totalSpent: number;
}

const DEFAULT_USERS_FILE = 'users.json';

// Initial seed data if file is empty
const INITIAL_SEEDED_USERS: UnifiedUser[] = [
  {
    id: 'admin-master',
    name: 'Bhadohi Arts Administrator',
    email: 'admin@bhadohiartsweave.com',
    phone: '+91 99184 15152',
    role: 'ADMIN',
    provider: 'Credentials',
    createdAt: '2026-08-01T10:00:00.000Z',
    updatedAt: '2026-10-02T08:00:00.000Z',
    lastLoginAt: '2026-10-02T08:45:00.000Z',
    hasActiveSession: true,
    sessionsCount: 1,
    addresses: [
      {
        id: 'addr-admin-1',
        type: 'HEADQUARTERS',
        addressLine: 'Main Carpet Market, Maryadpatti',
        city: 'Bhadohi',
        state: 'Uttar Pradesh',
        pinCode: '221401',
        country: 'India'
      }
    ],
    orders: [],
    ordersCount: 0,
    totalSpent: 0
  },
  {
    id: 'superadmin-master',
    name: 'Executive Super Admin',
    email: 'superadmin@bhadohiartsweave.com',
    phone: '+91 99184 15152',
    role: 'SUPERADMIN',
    provider: 'Credentials',
    createdAt: '2026-07-15T09:00:00.000Z',
    updatedAt: '2026-10-02T08:00:00.000Z',
    lastLoginAt: '2026-10-02T08:30:00.000Z',
    hasActiveSession: true,
    sessionsCount: 1,
    addresses: [
      {
        id: 'addr-superadmin-1',
        type: 'OFFICE',
        addressLine: 'Bhadohi Arts & Crafts Center',
        city: 'Bhadohi',
        state: 'Uttar Pradesh',
        pinCode: '221401',
        country: 'India'
      }
    ],
    orders: [],
    ordersCount: 0,
    totalSpent: 0
  },
  {
    id: 'usr-block-harakh',
    name: 'BLOCK HARAKH',
    email: 'kuldep.singh@gmail.com',
    phone: '+91 99184 15152',
    role: 'USER',
    provider: 'Credentials',
    createdAt: '2026-09-11T14:12:22.398Z',
    updatedAt: '2026-09-12T16:00:00.000Z',
    lastLoginAt: '2026-09-28T11:20:00.000Z',
    hasActiveSession: false,
    sessionsCount: 0,
    addresses: [
      {
        id: 'addr-harakh-1',
        type: 'SHIPPING',
        addressLine: 'FAIZABAD ROAD',
        city: 'Barabanki',
        state: 'Uttar Pradesh',
        pinCode: '225414',
        country: 'India'
      }
    ],
    orders: [
      {
        id: 'ORD-764390',
        date: '2026-09-11T14:12:22.398Z',
        total: 42000,
        status: 'PENDING',
        itemsCount: 2
      },
      {
        id: 'ORD-50556',
        date: '2026-09-11T15:05:45.325Z',
        total: 38500,
        status: 'PROCESSING',
        itemsCount: 2
      }
    ],
    ordersCount: 2,
    totalSpent: 80500
  },
  {
    id: 'usr-village-daulatpur',
    name: 'VILLAGE DAULATPUR',
    email: 'growfarmfpo@gmail.com',
    phone: '+91 99184 15152',
    role: 'USER',
    provider: 'Google',
    createdAt: '2026-09-11T15:34:12.983Z',
    updatedAt: '2026-09-12T10:00:00.000Z',
    lastLoginAt: '2026-09-25T14:10:00.000Z',
    hasActiveSession: false,
    sessionsCount: 0,
    addresses: [
      {
        id: 'addr-daulatpur-1',
        type: 'SHIPPING',
        addressLine: 'FAIZABAD ROAD, Post Daulatpur',
        city: 'Barabanki',
        state: 'Uttar Pradesh',
        pinCode: '225414',
        country: 'India'
      }
    ],
    orders: [
      {
        id: 'ORD-457720',
        date: '2026-09-11T15:34:12.983Z',
        total: 54000,
        status: 'PENDING',
        itemsCount: 2
      }
    ],
    ordersCount: 1,
    totalSpent: 54000
  },
  {
    id: 'usr-kuldeep-verma',
    name: 'Kuldeep Verma',
    email: 'kuldeep.verma@bhadohiweave.com',
    phone: '+91 98390 12345',
    role: 'USER',
    provider: 'Credentials',
    createdAt: '2026-09-12T04:44:26.729Z',
    updatedAt: '2026-09-20T12:00:00.000Z',
    lastLoginAt: '2026-09-29T18:40:00.000Z',
    hasActiveSession: false,
    sessionsCount: 0,
    addresses: [
      {
        id: 'addr-kuldeep-1',
        type: 'HOME',
        addressLine: 'Sector 8, Indira Nagar',
        city: 'Lucknow',
        state: 'Uttar Pradesh',
        pinCode: '226016',
        country: 'India'
      }
    ],
    orders: [
      {
        id: 'ORD-569718',
        date: '2026-09-12T04:44:26.729Z',
        total: 62500,
        status: 'COMPLETED',
        itemsCount: 3
      }
    ],
    ordersCount: 1,
    totalSpent: 62500
  }
];

// Helper to ensure fallback JSON store exists
function ensureSeededJsonUsers(): UnifiedUser[] {
  let jsonUsers = readJsonStore<UnifiedUser>(DEFAULT_USERS_FILE);
  if (!jsonUsers || jsonUsers.length === 0) {
    writeJsonStore(DEFAULT_USERS_FILE, INITIAL_SEEDED_USERS);
    jsonUsers = INITIAL_SEEDED_USERS;
  }
  return jsonUsers;
}

let lastDbFailure = 0;
const DB_RETRY_INTERVAL = 30000; // 30 seconds

/**
 * Fetch all users with full contact and authentication details
 */
export async function getAllUsersWithDetails(): Promise<UnifiedUser[]> {
  if (Date.now() - lastDbFailure < DB_RETRY_INTERVAL) {
    return ensureSeededJsonUsers();
  }

  try {
    const dbUsers = await prisma.user.findMany({
      include: {
        accounts: true,
        sessions: true,
        addresses: true,
        orders: {
          include: {
            items: true
          },
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    if (dbUsers && dbUsers.length > 0) {
      return dbUsers.map(u => {
        const provider = u.accounts.length > 0 
          ? (u.accounts[0].provider === 'google' ? 'Google' : u.accounts[0].provider)
          : (u.password ? 'Credentials' : 'Guest');

        const totalSpent = u.orders.reduce((sum, ord) => sum + (ord.total || 0), 0);

        return {
          id: u.id,
          name: u.name || 'Anonymous Customer',
          email: u.email || '',
          phone: u.phone || '',
          role: u.role || 'USER',
          image: u.image || undefined,
          provider: provider,
          providerAccountId: u.accounts[0]?.providerAccountId,
          emailVerified: u.emailVerified ? u.emailVerified.toISOString() : null,
          createdAt: u.createdAt.toISOString(),
          updatedAt: u.updatedAt.toISOString(),
          lastLoginAt: u.sessions[0]?.expires ? new Date(u.sessions[0].expires).toISOString() : undefined,
          hasActiveSession: u.sessions.some(s => new Date(s.expires) > new Date()),
          sessionsCount: u.sessions.length,
          addresses: u.addresses.map(a => ({
            id: a.id,
            type: a.type,
            addressLine: a.addressLine,
            city: a.city,
            state: a.state,
            pinCode: a.pinCode,
            country: a.country
          })),
          orders: u.orders.map(o => ({
            id: o.id,
            date: o.createdAt.toISOString(),
            total: o.total || 0,
            status: o.status,
            itemsCount: o.items.length
          })),
          ordersCount: u.orders.length,
          totalSpent: totalSpent
        };
      });
    }
  } catch (error) {
    lastDbFailure = Date.now();
    // Database connection refused or timeout; fallback to json store
  }

  // Fallback to JSON store
  return ensureSeededJsonUsers();
}

/**
 * Fetch a single user by ID
 */
export async function getUserByIdWithDetails(userId: string): Promise<UnifiedUser | null> {
  try {
    const u = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        accounts: true,
        sessions: true,
        addresses: true,
        orders: {
          include: {
            items: true
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (u) {
      const provider = u.accounts.length > 0 
        ? (u.accounts[0].provider === 'google' ? 'Google' : u.accounts[0].provider)
        : (u.password ? 'Credentials' : 'Guest');

      const totalSpent = u.orders.reduce((sum, ord) => sum + (ord.total || 0), 0);

      return {
        id: u.id,
        name: u.name || 'Anonymous Customer',
        email: u.email || '',
        phone: u.phone || '',
        role: u.role || 'USER',
        image: u.image || undefined,
        provider: provider,
        providerAccountId: u.accounts[0]?.providerAccountId,
        emailVerified: u.emailVerified ? u.emailVerified.toISOString() : null,
        createdAt: u.createdAt.toISOString(),
        updatedAt: u.updatedAt.toISOString(),
        lastLoginAt: u.sessions[0]?.expires ? new Date(u.sessions[0].expires).toISOString() : undefined,
        hasActiveSession: u.sessions.some(s => new Date(s.expires) > new Date()),
        sessionsCount: u.sessions.length,
        addresses: u.addresses.map(a => ({
          id: a.id,
          type: a.type,
          addressLine: a.addressLine,
          city: a.city,
          state: a.state,
          pinCode: a.pinCode,
          country: a.country
        })),
        orders: u.orders.map(o => ({
          id: o.id,
          date: o.createdAt.toISOString(),
          total: o.total || 0,
          status: o.status,
          itemsCount: o.items.length
        })),
        ordersCount: u.orders.length,
        totalSpent: totalSpent
      };
    }
  } catch (error) {
    // Database connection refused or timeout; fallback to json store
  }

  const users = ensureSeededJsonUsers();
  return users.find(u => u.id === userId) || null;
}

/**
 * Update user role
 */
export async function updateUserRole(userId: string, newRole: string): Promise<boolean> {
  let dbSuccess = false;
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole }
    });
    dbSuccess = true;
  } catch (e) {}

  // Update in JSON store as well
  const users = ensureSeededJsonUsers();
  const idx = users.findIndex(u => u.id === userId);
  if (idx !== -1) {
    users[idx].role = newRole;
    users[idx].updatedAt = new Date().toISOString();
    writeJsonStore(DEFAULT_USERS_FILE, users);
    return true;
  }

  return dbSuccess;
}

/**
 * Delete user and associated data
 */
export async function deleteUserAndData(userId: string): Promise<boolean> {
  let dbSuccess = false;
  try {
    const userOrders = await prisma.order.findMany({ where: { userId }, select: { id: true } });
    const orderIds = userOrders.map(o => o.id);

    await prisma.$transaction([
      prisma.orderItem.deleteMany({ where: { orderId: { in: orderIds } } }),
      prisma.payment.deleteMany({ where: { orderId: { in: orderIds } } }),
      prisma.order.deleteMany({ where: { userId } }),
      prisma.address.deleteMany({ where: { userId } }),
      prisma.wishlist.deleteMany({ where: { userId } }),
      prisma.cartItem.deleteMany({ where: { cart: { userId } } }),
      prisma.cart.deleteMany({ where: { userId } }),
      prisma.activityLog.deleteMany({ where: { userId } }),
      prisma.account.deleteMany({ where: { userId } }),
      prisma.session.deleteMany({ where: { userId } }),
      prisma.user.delete({ where: { id: userId } })
    ]);
    dbSuccess = true;
  } catch (e) {}

  // Delete from JSON store as well
  const users = ensureSeededJsonUsers();
  const filtered = users.filter(u => u.id !== userId);
  if (filtered.length !== users.length) {
    writeJsonStore(DEFAULT_USERS_FILE, filtered);
    return true;
  }

  return dbSuccess;
}
