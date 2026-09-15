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
      fullLabel: 'Aesthetic Blue',
      dotColor: 'bg-blue-500',
      activeClass: 'bg-blue-600 text-white shadow-sm font-semibold',
    },
    {
      id: 'green',
      label: 'Green',
      fullLabel: 'Aesthetic Green',
      dotColor: 'bg-emerald-500',
      activeClass: 'bg-emerald-600 text-white shadow-sm font-semibold',
    },
    {
      id: 'pink',
      label: 'Pink',
      fullLabel: 'Aesthetic Pink',
      dotColor: 'bg-pink-500',
      activeClass: 'bg-pink-600 text-white shadow-sm font-semibold',
    },
  ];

  return (
    <header className="relative pt-6 pb-6 px-4 md:px-0">
      {/* Top action bar: Brand Logo, Theme, Share */}
      <div className="flex items-center justify-between gap-3 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-slate-300 shadow-md bg-white shrink-0 ring-2 ring-slate-200/60 transition-transform duration-300 hover:scale-105">
            <img
              src="/logo.png?v=death_express"
              alt="Death Express Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold font-display tracking-wider uppercase text-slate-900 flex items-center gap-1.5">
              Arsalan
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </span>
            <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
              {profile.statusBadge}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Aesthetic Theme Selector */}
          <div
            id="theme-selector-bar"
            aria-label="Theme switcher"
            className="flex items-center bg-white/90 border border-slate-200/90 rounded-2xl p-1 shadow-sm backdrop-blur-md gap-0.5"
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
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
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
            className="p-2.5 rounded-xl border border-slate-200/80 bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 shadow-sm transition-all backdrop-blur-md"
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
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-pink-200/90 bg-pink-50/80 hover:bg-pink-100/90 text-pink-700 hover:text-pink-900 transition-all backdrop-blur-md text-xs font-semibold shadow-sm"
            >
              <Music className="w-3.5 h-3.5 text-pink-500" />
              <span className="hidden sm:inline">Kashish</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Profile Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        {/* Avatar with aesthetic ring */}
        <div className="relative group">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-white via-slate-100 to-white border-2 border-slate-200/90 shadow-xl backdrop-blur-md">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div
            className="absolute -bottom-1 -right-1 p-1.5 rounded-xl bg-white border border-slate-200 text-sky-500 shadow-md"
            title="Verified Creator"
          >
            <CheckCircle2 className="w-4 h-4 fill-sky-500 text-white" />
          </div>
        </div>

        {/* Text Details */}
        <div className="flex-1 space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 flex items-center justify-center sm:justify-start gap-2">
              {profile.name}
              <Sparkles className="w-5 h-5 text-amber-500 inline" />
            </h1>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80 w-fit mx-auto sm:mx-0 shadow-xs">
              {profile.title}
            </span>
          </div>

          <p className="text-slate-600 text-sm sm:text-base max-w-xl leading-relaxed font-normal">
            {profile.bio}
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 pt-1 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {profile.location}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-[11px]">
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
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-medium">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
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
