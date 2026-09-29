import NextAuth from "next-auth"
import { NextResponse } from "next/server"

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
})

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;
  const path = req.nextUrl.pathname;

  const isAuthPage = path.startsWith('/login') || path.startsWith('/register') || path.startsWith('/admin/login');
  const isAdminRoute = path.startsWith('/admin') && !path.startsWith('/admin/login');
  
  if (isAuthPage) {
    if (isLoggedIn) {
      const isAdmin = role === 'ADMIN' || role === 'SUPERADMIN' || role === 'admin' || role === 'superadmin';
      return NextResponse.redirect(new URL(isAdmin ? '/admin' : '/', req.nextUrl));
    }
    return NextResponse.next();
  }

  // Protect Admin Routes
  if (isAdminRoute) {
    if (!isLoggedIn) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }
      return NextResponse.redirect(new URL(`/login?from=${encodeURIComponent(from)}`, req.nextUrl));
    }
    const isAdmin = role === 'ADMIN' || role === 'SUPERADMIN' || role === 'admin' || role === 'superadmin';
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }
  }

  return NextResponse.next();
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
