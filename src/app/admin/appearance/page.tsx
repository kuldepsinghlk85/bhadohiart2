import React from 'react';
import { AppearanceClient } from './AppearanceClient';
import prisma from '@/lib/prisma';
import { DEFAULT_HEADER_THEME } from '@/lib/headerThemes';

export const metadata = {
  title: 'Header & Menu Themes | Admin Panel',
  description: 'Manage website header color palettes and themes.'
};

export default async function AdminAppearancePage() {
  let activeThemeId = DEFAULT_HEADER_THEME;

  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: 'header_theme' }
    });
    if (setting?.value) {
      activeThemeId = setting.value;
    }
  } catch (e) {
    try {
      const { readJsonStore } = await import('@/lib/jsonStore');
      const settings = readJsonStore<any>('settings.json') || [];
      const s = settings.find((item: any) => item.key === 'header_theme');
      if (s?.value) activeThemeId = s.value;
    } catch (_) {}
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <AppearanceClient initialThemeId={activeThemeId} />
    </div>
  );
}
