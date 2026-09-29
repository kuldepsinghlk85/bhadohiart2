import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Collections } from "@/components/home/Collections";
import { BestSellers } from "@/components/home/BestSellers";
import { WallToWall } from "@/components/home/WallToWall";
import { Testimonial } from "@/components/home/Testimonial";
import { SocialVideoShowcase } from "@/components/home/SocialVideoShowcase";
import { DEFAULT_VIDEO_SHOWCASE_CONFIG, VideoShowcaseConfig } from "@/lib/videoShowcaseConfig";
import prisma from "@/lib/prisma";

export default async function Home() {
  let heroSlides = null;
  let videoConfig: VideoShowcaseConfig = DEFAULT_VIDEO_SHOWCASE_CONFIG;

  try {
    const { readJsonStore } = await import('@/lib/jsonStore');
    const settings = readJsonStore<any>('settings.json') || [];
    const sliderSetting = settings.find((s: any) => s.key === 'homepage_slider');
    if (sliderSetting) {
      heroSlides = JSON.parse(sliderSetting.value);
    }
  } catch(e) {}

  // Fetch video showcase config from DB or jsonStore
  try {
    const videoSetting = await prisma.siteSetting.findUnique({
      where: { key: 'homepage_video_module' }
    });
    if (videoSetting?.value) {
      videoConfig = JSON.parse(videoSetting.value);
    }
  } catch (e) {
    try {
      const { readJsonStore } = await import('@/lib/jsonStore');
      const settings = readJsonStore<any>('settings.json') || [];
      const v = settings.find((s: any) => s.key === 'homepage_video_module');
      if (v?.value) {
        videoConfig = JSON.parse(v.value);
      }
    } catch (_) {}
  }

  // Fetch visible testimonials from DB or jsonStore
  let testimonials: any[] = [];
  try {
    testimonials = await prisma.testimonial.findMany({
      where: { isVisible: true },
      orderBy: { createdAt: 'desc' }
    });
  } catch (e) {}

  if (!testimonials || testimonials.length === 0) {
    try {
      const { readJsonStore } = await import('@/lib/jsonStore');
      const items = readJsonStore<any>('testimonials.json');
      testimonials = items.filter((t: any) => t.isVisible !== false);
    } catch (_) {}
  }

  return (
    <>
      <Hero slides={heroSlides} />
      <TrustStrip />
      <Collections />
      <BestSellers />
      <WallToWall />
      <SocialVideoShowcase config={videoConfig} />
      <Testimonial testimonials={testimonials} />
    </>
  );
}
