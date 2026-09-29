import React from 'react';
import { SocialVideoClient } from './SocialVideoClient';
import prisma from '@/lib/prisma';
import { DEFAULT_VIDEO_SHOWCASE_CONFIG, VideoShowcaseConfig } from '@/lib/videoShowcaseConfig';

export const metadata = {
  title: 'Video & Social Showcase | Admin Panel',
  description: 'Manage homepage video demonstration and social media hub.'
};

export default async function AdminSocialVideoPage() {
  let config: VideoShowcaseConfig = DEFAULT_VIDEO_SHOWCASE_CONFIG;

  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: 'homepage_video_module' }
    });
    if (setting?.value) {
      config = JSON.parse(setting.value);
    }
  } catch (e) {
    try {
      const { readJsonStore } = await import('@/lib/jsonStore');
      const settings = readJsonStore<any>('settings.json') || [];
      const s = settings.find((item: any) => item.key === 'homepage_video_module');
      if (s?.value) config = JSON.parse(s.value);
    } catch (_) {}
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <SocialVideoClient initialConfig={config} />
    </div>
  );
}
