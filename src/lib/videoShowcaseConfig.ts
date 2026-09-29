export interface VideoItem {
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
  posterUrl: string;
  duration?: string;
  author?: string;
}

export interface SocialChannel {
  platform: 'instagram' | 'youtube' | 'facebook' | 'whatsapp' | 'pinterest';
  name: string;
  handle: string;
  url: string;
  actionText: string;
  followers?: string;
}

export interface VideoShowcaseConfig {
  isEnabled: boolean;
  badge: string;
  title: string;
  subtitle: string;
  featuredVideo: VideoItem;
  playlist: VideoItem[];
  socialChannels: SocialChannel[];
}

export const DEFAULT_VIDEO_SHOWCASE_CONFIG: VideoShowcaseConfig = {
  isEnabled: true,
  badge: 'Behind The Looms',
  title: 'Craftsmanship In Motion',
  subtitle: 'Step into the workshops of Bhadohi. Witness the artistry of manual loom spinning, intricate knotting, and heritage finishing in real time.',
  featuredVideo: {
    id: 'vid-default-1',
    title: 'The Art of Hand-Knotting: Generational Masterclass',
    description: 'Watch our master artisans tie over 250 individual knots per square inch on traditional upright wooden looms.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sewing-a-fabric-with-a-machine-42407-large.mp4',
    posterUrl: 'https://bhadohiartsweave.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-27-at-11.21.43.jpeg',
    duration: '02:45',
    author: 'Bhadohi Master Weavers'
  },
  playlist: [
    {
      id: 'vid-default-1',
      title: 'The Art of Hand-Knotting: Masterclass',
      description: 'Over 250 knots per square inch on upright looms.',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sewing-a-fabric-with-a-machine-42407-large.mp4',
      posterUrl: 'https://bhadohiartsweave.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-27-at-11.21.43.jpeg',
      duration: '02:45',
      author: 'Loom Artisan Team'
    },
    {
      id: 'vid-default-2',
      title: 'Botanical Dyeing & Yarn Blending',
      description: 'Formulating rich hues with herbal, azo-free pigments.',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-knitting-a-scarf-42404-large.mp4',
      posterUrl: 'https://bhadohiartsweave.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-27-at-11.21.44-1.jpeg',
      duration: '01:50',
      author: 'Dye Laboratory'
    },
    {
      id: 'vid-default-3',
      title: 'Luxury Hotel Wall-to-Wall Installation',
      description: 'On-site precision seaming and acoustic underlay fitting.',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-tailor-working-with-fabric-42406-large.mp4',
      posterUrl: 'https://bhadohiartsweave.in/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-27-at-11.21.46.jpeg',
      duration: '03:10',
      author: 'Installation Engineers'
    }
  ],
  socialChannels: [
    {
      platform: 'instagram',
      name: 'Instagram',
      handle: '@bhadohiartsweave',
      url: 'https://instagram.com/bhadohiartsweave',
      actionText: 'Follow on Instagram',
      followers: '12.5k Followers'
    },
    {
      platform: 'youtube',
      name: 'YouTube',
      handle: 'Bhadohi Arts Weave Studio',
      url: 'https://youtube.com/@bhadohiartsweave',
      actionText: 'Subscribe Channel',
      followers: 'Behind-The-Scenes'
    },
    {
      platform: 'facebook',
      name: 'Facebook',
      handle: 'Bhadohi Arts Weave',
      url: 'https://facebook.com/bhadohiartsweave',
      actionText: 'Join Community',
      followers: 'Official Page'
    },
    {
      platform: 'whatsapp',
      name: 'WhatsApp Specialist',
      handle: '+91 8558085579',
      url: 'https://wa.me/918558085579?text=Hello%20Bhadohi%20Arts%20Weave,%20I%20saw%20your%20videos%20and%20would%20like%20to%20inquire.',
      actionText: 'Chat on WhatsApp',
      followers: 'Instant Support'
    }
  ]
};
