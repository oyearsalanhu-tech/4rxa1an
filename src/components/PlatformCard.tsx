import React, { useState } from 'react';
import { ExternalLink, Copy, Check, ChevronDown, ChevronUp, Play, Sparkles } from 'lucide-react';
import { SocialPlatform } from '../types';
import { InstagramIcon, YouTubeIcon, TikTokIcon, XTwitterIcon, SpotifyIcon, LinkedInIcon, ThreadsIcon, DiscordIcon } from './SocialIcons';

interface PlatformCardProps {
  platform: SocialPlatform;
  onVisit: (platform: SocialPlatform) => void;
  onCopy: (text: string, label: string) => void;
}

export const PlatformCard: React.FC<PlatformCardProps> = ({ platform, onVisit, onCopy }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const getPlatformIcon = (id: string) => {
    switch (id) {
      case 'instagram':
        return <InstagramIcon className="w-6 h-6 text-pink-500" />;
      case 'youtube':
        return <YouTubeIcon className="w-6 h-6 text-red-500" />;
      case 'tiktok':
        return <TikTokIcon className="w-6 h-6 text-cyan-400" />;
      case 'threads':
        return <ThreadsIcon className="w-6 h-6 text-white" />;
      case 'discord':
        return <DiscordIcon className="w-6 h-6 text-[#5865F2]" />;
      case 'x':
        return <XTwitterIcon className="w-6 h-6 text-sky-400" />;
      case 'spotify':
        return <SpotifyIcon className="w-6 h-6 text-emerald-500" />;
      case 'linkedin':
        return <LinkedInIcon className="w-6 h-6 text-blue-500" />;
      default:
        return <ExternalLink className="w-6 h-6 text-neutral-400" />;
    }
  };

  const handleCopyHandle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCopy(platform.handle, `${platform.name} handle`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVisitClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onVisit(platform);
  };

  return (
    <div
      id={`platform-card-${platform.id}`}
      className="group relative rounded-2xl p-5 md:p-6 transition-all duration-300 backdrop-blur-md border border-white/10 hover:border-white/25 bg-neutral-900/60 hover:bg-neutral-900/80 shadow-lg hover:shadow-2xl overflow-hidden"
    >
      {/* Subtle brand glow highlight in background */}
      <div
        className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-15 pointer-events-none transition-opacity duration-300 group-hover:opacity-30"
        style={{ backgroundColor: platform.themeColor }}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Icon & Info */}
        <div className="flex items-start sm:items-center gap-4">
          <div
            className="w-13 h-13 rounded-xl flex items-center justify-center shrink-0 border border-white/10 transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundColor: platform.accentBg }}
          >
            {getPlatformIcon(platform.id)}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
                {platform.name}
              </h3>
              {platform.badge && (
                <span className="text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 border border-white/10">
                  {platform.badge}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 text-sm text-neutral-400">
              <button
                type="button"
                onClick={handleCopyHandle}
                title="Click to copy handle"
                className="hover:text-white transition-colors flex items-center gap-1 group/btn"
              >
                <span className="font-mono text-neutral-300 font-medium">{platform.handle}</span>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 opacity-50 group-hover/btn:opacity-100" />
                )}
              </button>
              <span className="text-neutral-600">•</span>
              <span className="text-neutral-300 text-xs font-semibold">{platform.followersCount}</span>
            </div>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-2.5 pt-2 sm:pt-0 self-stretch sm:self-auto">
          {platform.featuredMedia && platform.featuredMedia.length > 0 && (
            <button
              id={`toggle-preview-${platform.id}`}
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-3 py-2 text-xs font-medium rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              <span>{isExpanded ? 'Hide Highlights' : 'Highlights'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* Primary "Click to visit platform" action */}
          <a
            id={`visit-btn-${platform.id}`}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleVisitClick}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-xl active:scale-[0.98] ${
              platform.id === 'threads' || platform.themeColor?.toLowerCase() === '#ffffff'
                ? 'text-black hover:bg-neutral-200'
                : 'text-white'
            }`}
            style={{
              backgroundColor: platform.themeColor,
            }}
          >
            <span>Visit Platform</span>
            <ExternalLink className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm text-neutral-400 leading-relaxed max-w-2xl">
        {platform.description}
      </p>

      {/* Expandable Media / Featured Highlight Drawer */}
      {isExpanded && platform.featuredMedia && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Featured on {platform.name}
            </span>
            <span className="text-xs text-neutral-500">Curated by Arsalan</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {platform.featuredMedia.map((media, idx) => (
              <a
                key={idx}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleVisitClick}
                className="group/item relative rounded-xl overflow-hidden border border-white/10 bg-black/40 hover:border-white/30 transition-all block"
              >
                {media.imageUrl && (
                  <div className="relative h-28 w-full overflow-hidden bg-neutral-800">
                    <img
                      src={media.imageUrl}
                      alt={media.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    {media.tag && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-semibold text-white border border-white/10">
                        {media.tag}
                      </span>
                    )}
                    <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover/item:bg-white group-hover/item:text-black transition-colors">
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </div>
                  </div>
                )}
                <div className="p-2.5">
                  <p className="text-xs font-semibold text-neutral-200 line-clamp-1 group-hover/item:text-white">
                    {media.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-400">
                    {media.views && <span>{media.views}</span>}
                    {media.date && <span>• {media.date}</span>}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
