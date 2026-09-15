import React from 'react';
import { CheckCircle2, Share2, Copy, Check, MapPin, Sparkles, Music } from 'lucide-react';
import { UserProfile, ThemeMode } from '../types';

interface HeaderProps {
  profile: UserProfile;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  onOpenShare: () => void;
  onCopyProfileLink: () => void;
  isCopied: boolean;
  onToggleMusic?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  theme,
  onThemeChange,
  onOpenShare,
  onCopyProfileLink,
  isCopied,
  onToggleMusic,
}) => {
  return (
    <header className="relative pt-8 pb-6 px-4 md:px-0">
      {/* Top action bar: Brand Logo, Theme, Share */}
      <div className="flex items-center justify-between gap-3 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/25 shadow-lg bg-neutral-950 shrink-0 ring-2 ring-white/10 transition-transform duration-300 hover:scale-105">
            <img
              src="/logo.png"
              alt="Website Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold font-display tracking-wider uppercase text-white flex items-center gap-1.5">
              Arsalan
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </span>
            <span className="text-[11px] text-neutral-400 font-medium hidden sm:inline">
              {profile.statusBadge}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme selector */}
          <div className="flex items-center bg-black/40 border border-white/10 rounded-xl p-1 backdrop-blur-md">
            {(['dark', 'midnight', 'emerald', 'light'] as ThemeMode[]).map((t) => (
              <button
                key={t}
                type="button"
                id={`theme-btn-${t}`}
                onClick={() => onThemeChange(t)}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg capitalize transition-all ${
                  theme === t
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {t === 'dark' ? 'Obsidian' : t === 'midnight' ? 'Midnight' : t === 'emerald' ? 'Emerald' : 'Warm'}
              </button>
            ))}
          </div>

          {/* Share Profile */}
          <button
            id="share-profile-btn"
            type="button"
            onClick={onOpenShare}
            title="Share profile"
            className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-all backdrop-blur-md"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Music Pop-up Trigger */}
          {onToggleMusic && (
            <button
              id="header-music-btn"
              type="button"
              onClick={onToggleMusic}
              title="Kashish - 120s (@iamarsalan_.18 Instagram Banner Track)"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-pink-500/30 bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 hover:text-white transition-all backdrop-blur-md text-xs font-semibold"
            >
              <Music className="w-3.5 h-3.5 text-pink-400" />
              <span className="hidden sm:inline">Kashish (120s)</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Profile Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        {/* Avatar with aesthetic ring */}
        <div className="relative group">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden p-1 bg-gradient-to-tr from-white/20 via-white/5 to-white/30 border border-white/20 shadow-2xl backdrop-blur-md">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div
            className="absolute -bottom-1 -right-1 p-1.5 rounded-xl bg-neutral-950 border border-white/20 text-sky-400 shadow-md"
            title="Verified Creator"
          >
            <CheckCircle2 className="w-4 h-4 fill-sky-500 text-neutral-950" />
          </div>
        </div>

        {/* Text Details */}
        <div className="flex-1 space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white flex items-center justify-center sm:justify-start gap-2">
              {profile.name}
              <Sparkles className="w-5 h-5 text-amber-400 inline" />
            </h1>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-neutral-300 border border-white/10 w-fit mx-auto sm:mx-0">
              {profile.title}
            </span>
          </div>

          <p className="text-neutral-300 text-sm sm:text-base max-w-xl leading-relaxed font-normal">
            {profile.bio}
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 pt-1 text-xs text-neutral-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-neutral-500" />
              {profile.location}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[11px]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              24/7 Online
            </span>
            <span>•</span>
            <button
              type="button"
              onClick={onCopyProfileLink}
              className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Copy Hub Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
