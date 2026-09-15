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
        return <TikTokIcon className="w-6 h-6 text-cyan-500" />;
      case 'threads':
        return <ThreadsIcon className="w-6 h-6 text-slate-900" />;
      case 'discord':
        return <DiscordIcon className="w-6 h-6 text-[#5865F2]" />;
      case 'x':
        return <XTwitterIcon className="w-6 h-6 text-sky-500" />;
      case 'spotify':
        return <SpotifyIcon className="w-6 h-6 text-emerald-500" />;
      case 'linkedin':
        return <LinkedInIcon className="w-6 h-6 text-blue-600" />;
      default:
        return <ExternalLink className="w-6 h-6 text-slate-500" />;
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
      className="group relative rounded-2xl p-5 md:p-6 transition-all duration-300 backdrop-blur-md border border-slate-200/90 hover:border-slate-300 bg-white/85 hover:bg-white/95 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] overflow-hidden"
    >
      {/* Subtle brand glow highlight in background */}
      <div
        className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-25"
        style={{ backgroundColor: platform.themeColor }}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Icon & Info */}
        <div className="flex items-start sm:items-center gap-4">
          <div
            className="w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 border border-slate-200/80 transition-transform duration-300 group-hover:scale-105 shadow-xs"
            style={{ backgroundColor: platform.accentBg }}
          >
            {getPlatformIcon(platform.id)}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                {platform.name}
              </h3>
              {platform.badge && (
                <span className="text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {platform.badge}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-500">
              <button
                type="button"
                onClick={handleCopyHandle}
                title="Click to copy handle"
                className="hover:text-slate-900 transition-colors flex items-center gap-1 group/btn"
              >
                <span className="font-mono text-slate-700 font-medium">{platform.handle}</span>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5 opacity-50 group-hover/btn:opacity-100 text-slate-500" />
                )}
              </button>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 text-xs font-semibold">{platform.followersCount}</span>
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
              className="px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 bg-slate-100/80 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-all flex items-center gap-1.5 shadow-xs"
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
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98] ${
              platform.id === 'threads' || platform.themeColor?.toLowerCase() === '#ffffff'
                ? 'bg-slate-900 text-white hover:bg-slate-800'
                : 'text-white'
            }`}
            style={{
              backgroundColor: platform.id === 'threads' ? '#0f172a' : platform.themeColor,
            }}
          >
            <span>Visit Platform</span>
            <ExternalLink className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-2xl">
        {platform.description}
      </p>

      {/* Expandable Media / Featured Highlight Drawer */}
      {isExpanded && platform.featuredMedia && (
        <div className="mt-4 pt-4 border-t border-slate-200/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Featured on {platform.name}
            </span>
            <span className="text-xs text-slate-400">Curated by Arsalan</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {platform.featuredMedia.map((media, idx) => (
              <a
                key={idx}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleVisitClick}
                className="group/item relative rounded-xl overflow-hidden border border-slate-200 bg-white/90 hover:border-slate-300 hover:shadow-md transition-all block"
              >
                {media.imageUrl && (
                  <div className="relative h-28 w-full overflow-hidden bg-slate-100">
                    <img
                      src={media.imageUrl}
                      alt={media.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />
                    {media.tag && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-[10px] font-bold text-slate-800 border border-white/40 shadow-xs">
                        {media.tag}
                      </span>
                    )}
                    <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-800 shadow-sm group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </div>
                  </div>
                )}
                <div className="p-2.5">
                  <p className="text-xs font-semibold text-slate-800 line-clamp-1 group-hover/item:text-slate-950">
                    {media.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
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
