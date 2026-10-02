import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export const ADMIN_COOKIE_NAME = 'baw_admin_session';

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || process.env.AUTH_SECRET || 'baw-admin-isolated-secret-key-2026-bhadohi'
);

export interface AdminPayload {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'SUPERADMIN';
}

/**
 * Creates a signed JWT token for the admin session valid for 7 days.
 */
export async function createAdminToken(payload: AdminPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

/**
 * Verifies and decodes an admin JWT token.
 * Works across Node runtime and Edge/Middleware.
 */
export async function verifyAdminToken(token: string): Promise<AdminPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (!payload || !payload.id || !payload.role) {
      return null;
    }
    const role = String(payload.role).toUpperCase();
    if (role !== 'ADMIN' && role !== 'SUPERADMIN') {
      return null;
    }
    return {
      id: String(payload.id),
      email: String(payload.email || ''),
      name: String(payload.name || 'Administrator'),
      role: role as 'ADMIN' | 'SUPERADMIN'
    };
  } catch (error) {
    return null;
  }
}

/**
 * Retrieves the current admin session from server components or actions.
 */
export async function getAdminSession(req?: NextRequest | Request): Promise<AdminPayload | null> {
  try {
    let token: string | undefined;

    if (req) {
      if ('cookies' in req && typeof (req as any).cookies?.get === 'function') {
        token = (req as any).cookies.get(ADMIN_COOKIE_NAME)?.value;
      } else {
        const cookieHeader = req.headers.get('cookie') || '';
        const match = cookieHeader.match(new RegExp(`(?:^|; )${ADMIN_COOKIE_NAME}=([^;]*)`));
        token = match ? decodeURIComponent(match[1]) : undefined;
      }
    } else {
      const cookieStore = await cookies();
      token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    }

    if (!token) return null;
    return await verifyAdminToken(token);
  } catch (e) {
    return null;
  }
}

/**
 * Sets the admin session cookie on the current response.
 */
export async function setAdminSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  });
}

/**
 * Clears the admin session cookie.
 */
export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

/**
 * Universal admin authorization check for API routes and server actions.
 * First checks isolated admin cookie; falls back to NextAuth session if available.
 */
export async function isAuthorizedAdmin(req?: Request): Promise<AdminPayload | null> {
  // 1. Check isolated admin session cookie
  const admin = await getAdminSession(req);
  if (admin) return admin;

  // 2. Fallback to NextAuth user session if role is admin
  try {
    const { auth } = await import('@/auth');
    const session = await auth();
    const role = String((session?.user as any)?.role || '').toUpperCase();
    if (session?.user && (role === 'ADMIN' || role === 'SUPERADMIN')) {
      return {
        id: session.user.id || 'admin-fallback',
        email: session.user.email || '',
        name: session.user.name || 'Admin',
        role: role as 'ADMIN' | 'SUPERADMIN'
      };
    }
  } catch (e) {}

  return null;
}
