import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/ecommerce/CartDrawer";
import "./globals.css";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "BHADOHI ARTS WEAVE | The World of Carpet Design",
  description: "Bhadohi Arts Weave brings you the finest range of Handmade, Handloom, Machine Made and Wall-to-Wall Carpets crafted with precision, passion and perfection.",
};

import prisma from "@/lib/prisma";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const user = session?.user as any;
  
  let collections: any[] = [];
  try {
    collections = await prisma.collection.findMany({ select: { name: true, slug: true }, orderBy: { name: 'asc' } });
  } catch(e) {}

  if (collections.length === 0) {
    const { mockCollections } = await import('@/lib/mockData');
    const { readJsonStore } = await import('@/lib/jsonStore');
    const jsonCols = readJsonStore<any>('collections.json');
    const merged = [...jsonCols, ...mockCollections];
    const unique = new Map();
    merged.forEach(c => unique.set(c.slug, c));
    collections = Array.from(unique.values());
  }

  // Fetch active header theme
  let headerTheme = 'classic-ivory';
  try {
    const themeSetting = await prisma.siteSetting.findUnique({ where: { key: 'header_theme' } });
    if (themeSetting?.value) {
      headerTheme = themeSetting.value;
    }
  } catch (e) {
    try {
      const { readJsonStore } = await import('@/lib/jsonStore');
      const settings = readJsonStore<any>('settings.json') || [];
      const s = settings.find((item: any) => item.key === 'header_theme');
      if (s?.value) headerTheme = s.value;
    } catch (_) {}
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        <Header user={user} collections={collections} themeId={headerTheme} />
        <CartDrawer />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
