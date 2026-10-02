import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { verifyAdminToken, ADMIN_COOKIE_NAME } from "@/lib/adminAuth";

const { auth } = NextAuth({
  providers: [],
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // @ts-ignore
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.role = token.role;
        // @ts-ignore
        session.user.id = token.id as string;
      }
      return session;
    }
  }
});

export default auth(async (req) => {
  const path = req.nextUrl.pathname;
  const isCustomerLoggedIn = !!req.auth;

  // Check isolated admin session cookie
  const adminCookie = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const adminSession = adminCookie ? await verifyAdminToken(adminCookie) : null;
  const isAdminLoggedIn = !!adminSession;

  // 1. Admin Login Page (/admin/login)
  if (path === '/admin/login') {
    if (isAdminLoggedIn) {
      return NextResponse.redirect(new URL('/admin', req.nextUrl));
    }
    return NextResponse.next();
  }

  // 2. Protected Admin Routes (/admin, /admin/*)
  if (path.startsWith('/admin')) {
    if (!isAdminLoggedIn) {
      let from = path;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }
      return NextResponse.redirect(new URL(`/admin/login?from=${encodeURIComponent(from)}`, req.nextUrl));
    }
    return NextResponse.next();
  }

  // 3. Customer Auth Pages (/login, /register)
  if (path === '/login' || path === '/register') {
    if (isCustomerLoggedIn) {
      return NextResponse.redirect(new URL('/account', req.nextUrl));
    }
    return NextResponse.next();
  }

  // 4. Customer Account Protected Routes (/account, /account/*)
  if (path.startsWith('/account')) {
    if (!isCustomerLoggedIn) {
      let from = path;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }
      return NextResponse.redirect(new URL(`/login?from=${encodeURIComponent(from)}`, req.nextUrl));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
