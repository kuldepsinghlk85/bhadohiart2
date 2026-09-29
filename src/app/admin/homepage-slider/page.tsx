import React from 'react';
import HomepageSliderClient from './HomepageSliderClient';

export default async function HomepageSliderAdminPage() {
  let settings: any[] = [];
  try {
    const { readJsonStore } = await import('@/lib/jsonStore');
    settings = readJsonStore<any>('settings.json') || [];
  } catch (e) {
    console.error("Failed to load settings", e);
  }

  const sliderSetting = settings.find((s: any) => s.key === 'homepage_slider');
  let initialSlides = [];
  if (sliderSetting) {
    try {
      initialSlides = JSON.parse(sliderSetting.value);
    } catch(e) {}
  } else {
    // default slides based on current Hero.tsx
    initialSlides = [
      { id: 1, image: '/images/products/infinity-01.jpg', link: '', title: '', subtitle: '' },
      { id: 2, image: '/images/products/infinity-02.jpg', link: '', title: '', subtitle: '' },
      { id: 3, image: '/images/products/infinity-03.jpg', link: '', title: '', subtitle: '' },
    ];
  }

  return <HomepageSliderClient initialSlides={initialSlides} />;
}
