"use client";

import React, { useState } from 'react';
import { 
  VideoShowcaseConfig, 
  VideoItem, 
  DEFAULT_VIDEO_SHOWCASE_CONFIG 
} from '@/lib/videoShowcaseConfig';
import { 
  Play, 
  Film, 
  Sparkles, 
  Clock, 
  ExternalLink, 
  Volume2, 
  CheckCircle2, 
  Share2 
} from 'lucide-react';
import { FaInstagram, FaYoutube, FaFacebookF, FaWhatsapp, FaPinterestP } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

interface SocialVideoShowcaseProps {
  config?: VideoShowcaseConfig;
}

export function SocialVideoShowcase({ config = DEFAULT_VIDEO_SHOWCASE_CONFIG }: SocialVideoShowcaseProps) {
  if (!config || !config.isEnabled) {
    return null;
  }

  const initialVideo = config.featuredVideo || config.playlist?.[0];
  const [activeVideo, setActiveVideo] = useState<VideoItem>(initialVideo);
  const [isPlaying, setIsPlaying] = useState(false);

  // Helper to extract YouTube video ID if URL is youtube
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0` : null;
  };

  const youtubeEmbedUrl = getYouTubeEmbedUrl(activeVideo?.videoUrl || '');

  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <FaInstagram className="w-4 h-4 text-pink-600" />;
      case 'youtube':
        return <FaYoutube className="w-4 h-4 text-red-600" />;
      case 'facebook':
        return <FaFacebookF className="w-4 h-4 text-blue-600" />;
      case 'whatsapp':
        return <FaWhatsapp className="w-4 h-4 text-emerald-600" />;
      case 'pinterest':
        return <FaPinterestP className="w-4 h-4 text-rose-600" />;
      default:
        return <Share2 className="w-4 h-4 text-stone-600" />;
    }
  };

  return (
    <section className="py-14 md:py-18 bg-[#FAF7F0] border-t border-[var(--color-brand-border)] relative overflow-hidden">
      
      {/* Background Carpet Weave Accent */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: `url('/images/footer-runner-bg.jpg')` }}
      />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[var(--color-brand-burgundy)]/10 text-[var(--color-brand-burgundy)] text-xs font-semibold uppercase tracking-wider mb-2.5 border border-[var(--color-brand-burgundy)]/15 shadow-2xs">
            <Film className="w-3.5 h-3.5" />
            {config.badge || 'Behind The Looms'}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[var(--color-brand-dark)] font-normal mb-3">
            {config.title ? (
              <>
                {config.title.split(' ').slice(0, -1).join(' ')}{' '}
                <span className="text-[var(--color-brand-burgundy)] italic">
                  {config.title.split(' ').slice(-1).join(' ')}
                </span>
              </>
            ) : (
              <>Craftsmanship In <span className="text-[var(--color-brand-burgundy)] italic">Motion</span></>
            )}
          </h2>
          <p className="font-sans text-xs md:text-sm text-[var(--color-brand-muted)] leading-relaxed max-w-2xl mx-auto">
            {config.subtitle || 'Step inside our artisan weaving sheds in Bhadohi. Experience the rhythm of handloom knotting, wool carding, and fine luster shearing.'}
          </p>
        </div>

        {/* Video Player & Playlist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-12">
          
          {/* Main Video Viewport (7 Cols) */}
          <div className="lg:col-span-8 bg-black rounded-3xl overflow-hidden shadow-2xl relative flex flex-col justify-center min-h-[340px] md:min-h-[460px] border border-stone-800">
            {youtubeEmbedUrl ? (
              <iframe
                src={youtubeEmbedUrl}
                title={activeVideo.title}
                className="w-full h-full min-h-[380px] md:min-h-[460px] border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center group">
                <video
                  key={activeVideo.videoUrl}
                  src={activeVideo.videoUrl}
                  poster={activeVideo.posterUrl}
                  controls={isPlaying}
                  playsInline
                  autoPlay={isPlaying}
                  className="w-full h-full object-cover min-h-[340px] md:min-h-[460px]"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />

                {/* Big Custom Play Button when paused */}
                {!isPlaying && (
                  <div 
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 bg-black/40 backdrop-blur-2xs flex flex-col items-center justify-center cursor-pointer transition-colors hover:bg-black/30"
                  >
                    <div className="w-18 h-18 md:w-20 md:h-20 rounded-full bg-[var(--color-brand-burgundy)] text-white flex items-center justify-center shadow-2xl transition-transform transform group-hover:scale-110 border-2 border-white/40">
                      <Play className="w-8 h-8 fill-white translate-x-0.5" />
                    </div>
                    <span className="text-white text-xs font-sans font-semibold tracking-wider uppercase mt-4 px-4 py-1.5 rounded-full bg-black/50 border border-white/20">
                      Watch Video Demonstration
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Title Overlay Strip */}
            <div className="p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-md bg-[var(--color-brand-burgundy)] text-[10px] font-bold uppercase tracking-wider text-white">
                    {activeVideo.author || 'Master Artisan'}
                  </span>
                  {activeVideo.duration && (
                    <span className="text-[11px] text-white/70 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {activeVideo.duration}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-lg md:text-xl font-medium text-white">
                  {activeVideo.title}
                </h3>
                {activeVideo.description && (
                  <p className="font-sans text-xs text-white/75 mt-1 max-w-xl line-clamp-2">
                    {activeVideo.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Playlist Sidebar (4 Cols) */}
          <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-[var(--color-brand-border)] shadow-xs flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-brand-border)] mb-3">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-[var(--color-brand-burgundy)]" />
                <h4 className="font-serif text-base font-bold text-[var(--color-brand-dark)]">
                  Workshop Playlist
                </h4>
              </div>
              <span className="text-[11px] font-sans font-bold px-2 py-0.5 rounded-full bg-[var(--color-brand-burgundy)]/10 text-[var(--color-brand-burgundy)]">
                {config.playlist?.length || 0} Clips
              </span>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-[380px] pr-1">
              {config.playlist?.map((item) => {
                const isActive = activeVideo.videoUrl === item.videoUrl;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setActiveVideo(item);
                      setIsPlaying(true);
                    }}
                    className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex gap-3 items-center group ${
                      isActive 
                        ? 'border-[var(--color-brand-burgundy)] bg-[#FAF7F0] shadow-xs' 
                        : 'border-[var(--color-brand-border)] hover:border-stone-400 hover:bg-stone-50/70'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-stone-900 flex-shrink-0">
                      <img 
                        src={item.posterUrl || '/images/hero-carpet-craft.jpg'} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          isActive ? 'bg-[var(--color-brand-burgundy)] text-white' : 'bg-white/80 text-black'
                        }`}>
                          <Play className="w-2.5 h-2.5 fill-current translate-x-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex-1 min-w-0">
                      <p className={`font-serif text-xs md:text-sm font-semibold truncate ${
                        isActive ? 'text-[var(--color-brand-burgundy)]' : 'text-[var(--color-brand-dark)]'
                      }`}>
                        {item.title}
                      </p>
                      <p className="font-sans text-[11px] text-[var(--color-brand-muted)] truncate mt-0.5">
                        {item.author || 'Artisan Workshop'}
                      </p>
                      {item.duration && (
                        <span className="font-sans text-[10px] text-stone-400 flex items-center gap-1 mt-1">
                          <Clock className="w-2.5 h-2.5" /> {item.duration}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footnote */}
            <div className="mt-auto pt-3 border-t border-[var(--color-brand-border)] text-center">
              <a 
                href="https://youtube.com/@bhadohiartsweave" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs font-sans font-semibold text-[var(--color-brand-burgundy)] hover:underline inline-flex items-center gap-1.5"
              >
                <span>Visit Our YouTube Channel for Full Docs</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Social Media Connect Hub */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-[var(--color-brand-border)] shadow-xs">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-brand-burgundy)] block mb-1">
                Stay Connected
              </span>
              <h3 className="font-serif text-2xl text-[var(--color-brand-dark)]">
                Connect With Our Artisan Weaving Community
              </h3>
            </div>
            <p className="font-sans text-xs text-[var(--color-brand-muted)] max-w-sm">
              Follow our daily loom updates, client home styling videos, and fresh catalogue releases across social platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {config.socialChannels?.map((channel, idx) => (
              <a 
                key={idx}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl border border-[var(--color-brand-border)] hover:border-[var(--color-brand-burgundy)] hover:shadow-md transition-all group bg-[#FAF7F0]/40 hover:bg-white flex items-center gap-3.5"
              >
                <div className="w-11 h-11 rounded-xl bg-white border border-[var(--color-brand-border)] group-hover:scale-105 transition-transform flex items-center justify-center shadow-2xs flex-shrink-0">
                  {renderSocialIcon(channel.platform)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-sm font-bold text-[var(--color-brand-dark)] truncate">
                    {channel.name}
                  </p>
                  <p className="font-sans text-xs text-[var(--color-brand-muted)] truncate">
                    {channel.handle}
                  </p>
                  <span className="text-[10px] font-bold text-[var(--color-brand-burgundy)] uppercase tracking-wider block mt-0.5 group-hover:underline">
                    {channel.actionText || 'Connect'} →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
