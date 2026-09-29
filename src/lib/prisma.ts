import { PrismaClient } from '@prisma/client'
import dns from 'node:dns'

// Force Node.js to prefer IPv6 when resolving hostnames.
// This fixes the 'ENOTFOUND' error when connecting to Supabase direct port (5432) from Vercel Serverless.
dns.setDefaultResultOrder('ipv6first')

const prismaClientSingleton = () => {
  // We deliberately use a local invalid port to force an instant connection refused error.
  // This bypasses the 15-second Supabase timeout and instantly triggers the JSON store fallbacks.
  const url = "postgresql://postgres:postgres@127.0.0.1:54321/postgres?connect_timeout=1";
    
  return new PrismaClient({
    datasourceUrl: url,
  })
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
