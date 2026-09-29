import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'placeholder_google_client_id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'placeholder_google_client_secret',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        // VERCEL FALLBACK: If Supabase connection is broken on Vercel, we still want the admin to be able to log in.
        if (credentials.email === 'admin@bhadohiartsweave.com' && credentials.password === 'admin123') {
          return { id: 'admin-hardcoded', email: 'admin@bhadohiartsweave.com', role: 'ADMIN', name: 'Admin' };
        }
        if (credentials.email === 'superadmin@bhadohiartsweave.com' && credentials.password === 'password123') {
          return { id: 'superadmin-hardcoded', email: 'superadmin@bhadohiartsweave.com', role: 'SUPERADMIN', name: 'Super Admin' };
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string }
          });
          
          if (!user || !user.password) return null;
          
          const isMatch = await bcrypt.compare(credentials.password as string, user.password);
          
          if (isMatch) return user;
        } catch (e) {
          console.error("Prisma error during auth:", e);
        }
        
        return null;
      }
    })
  ],
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
