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
  const themeOptions: { id: ThemeMode; label: string; fullLabel: string; dotColor: string; activeClass: string }[] = [
    {
      id: 'blue',
      label: 'Blue',
      fullLabel: 'Dark Blue',
      dotColor: 'bg-blue-400',
      activeClass: 'bg-blue-600 text-white shadow-md shadow-blue-600/40 font-semibold ring-1 ring-blue-400',
    },
    {
      id: 'green',
      label: 'Green',
      fullLabel: 'Dark Green',
      dotColor: 'bg-emerald-400',
      activeClass: 'bg-emerald-600 text-white shadow-md shadow-emerald-600/40 font-semibold ring-1 ring-emerald-400',
    },
    {
      id: 'pink',
      label: 'Pink',
      fullLabel: 'Dark Pink',
      dotColor: 'bg-pink-400',
      activeClass: 'bg-pink-600 text-white shadow-md shadow-pink-600/40 font-semibold ring-1 ring-pink-400',
    },
  ];

  const getThemePillClass = () => {
    switch (theme) {
      case 'green':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40 shadow-xs shadow-emerald-500/10';
      case 'pink':
        return 'bg-pink-950/80 text-pink-300 border-pink-500/40 shadow-xs shadow-pink-500/10';
      case 'blue':
      default:
        return 'bg-blue-950/80 text-blue-300 border-blue-500/40 shadow-xs shadow-blue-500/10';
    }
  };

  const getAvatarRing = () => {
    switch (theme) {
      case 'green':
        return 'bg-gradient-to-tr from-emerald-500/30 via-slate-800 to-emerald-400/40 border-2 border-emerald-500/50 shadow-xl shadow-emerald-500/20';
      case 'pink':
        return 'bg-gradient-to-tr from-pink-500/30 via-slate-800 to-pink-400/40 border-2 border-pink-500/50 shadow-xl shadow-pink-500/20';
      case 'blue':
      default:
        return 'bg-gradient-to-tr from-blue-500/30 via-slate-800 to-blue-400/40 border-2 border-blue-500/50 shadow-xl shadow-blue-500/20';
    }
  };

  const getMusicBtnClass = () => {
    switch (theme) {
      case 'green':
        return 'border-emerald-500/40 bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 hover:text-white shadow-emerald-500/20';
      case 'pink':
        return 'border-pink-500/40 bg-pink-950/70 hover:bg-pink-900/80 text-pink-300 hover:text-white shadow-pink-500/20';
      case 'blue':
      default:
        return 'border-blue-500/40 bg-blue-950/70 hover:bg-blue-900/80 text-blue-300 hover:text-white shadow-blue-500/20';
    }
  };

  return (
    <header className="relative pt-6 pb-6 px-4 md:px-0">
      {/* Top action bar: Brand Logo, Theme, Share */}
      <div className="flex items-center justify-between gap-3 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-slate-700 shadow-md bg-slate-900 shrink-0 ring-2 ring-slate-800 transition-transform duration-300 hover:scale-105">
            <img
              src="/logo.png?v=death_express"
              alt="Death Express Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold font-display tracking-wider uppercase text-white flex items-center gap-1.5">
              Arsalan
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </span>
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
              {profile.statusBadge}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Aesthetic Theme Selector */}
          <div
            id="theme-selector-bar"
            aria-label="Theme switcher"
            className="flex items-center bg-slate-900/90 border border-slate-800 rounded-2xl p-1 shadow-lg backdrop-blur-md gap-0.5"
          >
            {themeOptions.map((t) => {
              const isActive = theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  id={`theme-btn-${t.id}`}
                  onClick={() => onThemeChange(t.id)}
                  title={`Switch to ${t.fullLabel}`}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 text-xs font-medium rounded-xl transition-all ${
                    isActive
                      ? t.activeClass
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 transition-transform ${
                      isActive ? 'bg-white scale-110' : t.dotColor
                    }`}
                  />
                  <span className="hidden sm:inline">{t.fullLabel}</span>
                  <span className="sm:hidden">{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Share Profile */}
          <button
            id="share-profile-btn"
            type="button"
            onClick={onOpenShare}
            title="Share profile"
            className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white shadow-sm transition-all backdrop-blur-md"
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
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-all backdrop-blur-md text-xs font-semibold shadow-sm ${getMusicBtnClass()}`}
            >
              <Music className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kashish</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Profile Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        {/* Avatar with aesthetic frame - static, non-animated */}
        <div className="relative">
          <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden p-1 backdrop-blur-md ${getAvatarRing()}`}>
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center rounded-full select-none"
            />
          </div>
          <div
            className="absolute -bottom-1 -right-1 p-1.5 rounded-xl bg-slate-900 border border-slate-700 text-sky-400 shadow-md"
            title="Verified Creator"
          >
            <CheckCircle2 className="w-4 h-4 fill-sky-500 text-slate-900" />
          </div>
        </div>

        {/* Text Details */}
        <div className="flex-1 space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white flex items-center justify-center sm:justify-start gap-2">
              {profile.name}
              <Sparkles className="w-5 h-5 text-amber-400 inline" />
            </h1>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border w-fit mx-auto sm:mx-0 ${getThemePillClass()}`}>
              {profile.title}
            </span>
          </div>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed font-normal">
            {profile.bio}
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 pt-1 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              {profile.location}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[11px]">
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
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
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
