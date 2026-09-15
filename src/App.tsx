import React, { useState, useEffect } from 'react';
import { UserProfile, SocialPlatform, ThemeMode } from './types';
import { initialProfile, defaultPlatforms } from './data/socialPlatforms';
import { Header } from './components/Header';
import { PlatformCard } from './components/PlatformCard';
import { ContactSection } from './components/ContactSection';
import { ShareModal } from './components/ShareModal';
import { MusicPlayerPopup } from './components/MusicPlayerPopup';
import { Toast } from './components/Toast';
import { InstagramIcon, YouTubeIcon, TikTokIcon, ThreadsIcon, DiscordIcon } from './components/SocialIcons';
import { Sparkles, ArrowUpRight, Compass } from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('arsalan_hub_profile_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialProfile;
      }
    }
    return initialProfile;
  });

  const [platforms, setPlatforms] = useState<SocialPlatform[]>(() => {
    const saved = localStorage.getItem('arsalan_hub_platforms_v5');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.some((p: SocialPlatform) => p.id === 'discord')) {
          const discordPlat = defaultPlatforms.find((p) => p.id === 'discord');
          if (discordPlat) parsed.push(discordPlat);
        }
        return parsed;
      } catch {
        return defaultPlatforms;
      }
    }
    return defaultPlatforms;
  });

  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('arsalan_hub_theme');
    return (saved as ThemeMode) || 'dark';
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'info'>('success');
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isMusicOpen, setIsMusicOpen] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  useEffect(() => {
    localStorage.setItem('arsalan_hub_profile_v3', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('arsalan_hub_platforms_v5', JSON.stringify(platforms));
  }, [platforms]);

  useEffect(() => {
    localStorage.setItem('arsalan_hub_theme', theme);
  }, [theme]);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard!`, 'success');
  };

  const handleCopyProfileLink = () => {
    const url = typeof window !== 'undefined' ? window.location.href : 'https://arsalan.social';
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    showToast('Profile hub link copied!', 'success');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleVisitPlatform = (platform: SocialPlatform) => {
    showToast(`Navigating to ${platform.name}...`, 'info');
  };

  // Theme styling backgrounds and borders
  const getThemeClasses = () => {
    switch (theme) {
      case 'midnight':
        return 'bg-slate-950/80 text-slate-100';
      case 'emerald':
        return 'bg-[#061510]/80 text-emerald-50';
      case 'light':
        return 'bg-stone-950/80 text-neutral-100';
      case 'dark':
      default:
        return 'bg-[#0a0a0c]/80 text-neutral-100';
    }
  };

  const filteredPlatforms = filterCategory === 'all'
    ? platforms
    : platforms.filter((p) => {
        if (filterCategory === 'video') return p.id === 'youtube' || p.id === 'tiktok';
        if (filterCategory === 'visual') return p.id === 'instagram';
        if (filterCategory === 'community') return p.id === 'threads' || p.id === 'discord';
        return p.category === filterCategory;
      });

  // Quick jump flagship platforms
  const flagshipInstagram = platforms.find((p) => p.id === 'instagram');
  const flagshipYouTube = platforms.find((p) => p.id === 'youtube');
  const flagshipTikTok = platforms.find((p) => p.id === 'tiktok');
  const flagshipThreads = platforms.find((p) => p.id === 'threads');
  const flagshipDiscord = platforms.find((p) => p.id === 'discord');

  return (
    <div className={`min-h-screen w-full max-w-full overflow-x-hidden relative font-sans transition-colors duration-500 selection:bg-rose-500 selection:text-white ${getThemeClasses()}`}>
      {/* Full-bleed aesthetic background image covering the entire website */}
      <div className="fixed inset-0 w-full h-full min-h-screen pointer-events-none -z-20 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop"
          alt="Atmospheric Background"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105 filter blur-[1.5px]"
        />
        {/* Full-screen darkening gradient overlays ensuring perfect readability */}
        <div className="absolute inset-0 bg-[#0a0a0c]/80 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c]/90 via-[#0a0a0c]/75 to-[#0a0a0c]/95" />
      </div>

      {/* Ambient background decoration safely constrained to viewport */}
      <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden max-w-full -z-10">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[350px] bg-white/[0.03] rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-rose-500/[0.04] rounded-full blur-3xl" />
        <div className="absolute top-2/3 right-0 w-72 h-72 bg-cyan-500/[0.04] rounded-full blur-3xl" />
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-20">
        {/* Header Section */}
        <Header
          profile={profile}
          theme={theme}
          onThemeChange={setTheme}
          onOpenShare={() => setIsShareOpen(true)}
          onCopyProfileLink={handleCopyProfileLink}
          isCopied={copiedLink}
          onToggleMusic={() => setIsMusicOpen((prev) => !prev)}
        />

        {/* Quick-Access Flagship Channels (Instagram, YouTube, TikTok, Threads) */}
        <div className="mt-4 mb-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs uppercase tracking-wider text-neutral-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Primary Creator Channels
            </span>
            <span className="text-xs text-neutral-500">Tap to visit directly</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3">
            {/* Instagram Quick Link */}
            {flagshipInstagram && (
              <a
                id="quick-link-instagram"
                href={flagshipInstagram.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleVisitPlatform(flagshipInstagram)}
                className="group p-3 sm:p-4 rounded-2xl bg-neutral-900/80 hover:bg-neutral-800/90 border border-white/10 hover:border-pink-500/40 transition-all text-center flex flex-col items-center justify-center gap-2 shadow-md hover:shadow-pink-500/10 active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl bg-pink-500/15 flex items-center justify-center transition-transform group-hover:scale-110">
                  <InstagramIcon className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-white group-hover:text-pink-400 transition-colors">
                    Instagram
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono hidden sm:block truncate max-w-[100px]">
                    {flagshipInstagram.handle}
                  </span>
                </div>
                <div className="flex items-center gap-0.5 text-[11px] text-pink-400 font-semibold group-hover:underline">
                  <span>Visit</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </a>
            )}

            {/* YouTube Quick Link */}
            {flagshipYouTube && (
              <a
                id="quick-link-youtube"
                href={flagshipYouTube.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleVisitPlatform(flagshipYouTube)}
                className="group p-3 sm:p-4 rounded-2xl bg-neutral-900/80 hover:bg-neutral-800/90 border border-white/10 hover:border-red-500/40 transition-all text-center flex flex-col items-center justify-center gap-2 shadow-md hover:shadow-red-500/10 active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center transition-transform group-hover:scale-110">
                  <YouTubeIcon className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                    YouTube
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono hidden sm:block truncate max-w-[100px]">
                    {flagshipYouTube.handle}
                  </span>
                </div>
                <div className="flex items-center gap-0.5 text-[11px] text-red-400 font-semibold group-hover:underline">
                  <span>Visit</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </a>
            )}

            {/* TikTok Quick Link */}
            {flagshipTikTok && (
              <a
                id="quick-link-tiktok"
                href={flagshipTikTok.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleVisitPlatform(flagshipTikTok)}
                className="group p-3 sm:p-4 rounded-2xl bg-neutral-900/80 hover:bg-neutral-800/90 border border-white/10 hover:border-cyan-400/40 transition-all text-center flex flex-col items-center justify-center gap-2 shadow-md hover:shadow-cyan-400/10 active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-400/15 flex items-center justify-center transition-transform group-hover:scale-110">
                  <TikTokIcon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    TikTok
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono hidden sm:block truncate max-w-[100px]">
                    {flagshipTikTok.handle}
                  </span>
                </div>
                <div className="flex items-center gap-0.5 text-[11px] text-cyan-300 font-semibold group-hover:underline">
                  <span>Visit</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </a>
            )}

            {/* Threads Quick Link */}
            {flagshipThreads && (
              <a
                id="quick-link-threads"
                href={flagshipThreads.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleVisitPlatform(flagshipThreads)}
                className="group p-3 sm:p-4 rounded-2xl bg-neutral-900/80 hover:bg-neutral-800/90 border border-white/10 hover:border-white/40 transition-all text-center flex flex-col items-center justify-center gap-2 shadow-md hover:shadow-white/10 active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center transition-transform group-hover:scale-110">
                  <ThreadsIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-white group-hover:text-neutral-200 transition-colors">
                    Threads
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono hidden sm:block truncate max-w-[100px]">
                    {flagshipThreads.handle}
                  </span>
                </div>
                <div className="flex items-center gap-0.5 text-[11px] text-neutral-300 font-semibold group-hover:underline">
                  <span>Visit</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </a>
            )}

            {/* Discord Server Quick Link */}
            {flagshipDiscord && (
              <a
                id="quick-link-discord"
                href={flagshipDiscord.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleVisitPlatform(flagshipDiscord)}
                className="group p-3 sm:p-4 rounded-2xl bg-neutral-900/80 hover:bg-neutral-800/90 border border-white/10 hover:border-[#5865F2]/50 transition-all text-center flex flex-col items-center justify-center gap-2 shadow-md hover:shadow-[#5865F2]/15 active:scale-95 col-span-2 sm:col-span-1"
              >
                <div className="w-10 h-10 rounded-xl bg-[#5865F2]/15 flex items-center justify-center transition-transform group-hover:scale-110">
                  <DiscordIcon className="w-5 h-5 text-[#5865F2]" />
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-white group-hover:text-[#808cf8] transition-colors">
                    Discord
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono hidden sm:block truncate max-w-[100px]">
                    Server
                  </span>
                </div>
                <div className="flex items-center gap-0.5 text-[11px] text-[#808cf8] font-semibold group-hover:underline">
                  <span>Join Server</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </a>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-between gap-2 mb-4 overflow-x-auto pb-1 no-scrollbar">
          <div className="flex items-center gap-1.5">
            {[
              { id: 'all', label: 'All Channels' },
              { id: 'video', label: 'Video (YouTube & TikTok)' },
              { id: 'visual', label: 'Visual (Instagram)' },
              { id: 'community', label: 'Community (Discord & Threads)' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  filterCategory === cat.id
                    ? 'bg-white text-black shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-neutral-500 font-medium whitespace-nowrap hidden sm:inline">
            {filteredPlatforms.length} {filteredPlatforms.length === 1 ? 'Platform' : 'Platforms'}
          </span>
        </div>

        {/* Detailed Platforms List */}
        <main className="space-y-3.5">
          {filteredPlatforms.map((platform) => (
            <PlatformCard
              key={platform.id}
              platform={platform}
              onVisit={handleVisitPlatform}
              onCopy={handleCopy}
            />
          ))}
        </main>

        {/* Direct Contact & Collaboration Section */}
        <ContactSection email={profile.email} onCopy={handleCopy} />

        {/* Aesthetic Footer */}
        <footer className="mt-14 text-center text-xs text-neutral-500 space-y-3 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 opacity-80 hover:opacity-100 transition-opacity shadow-lg">
            <img src="/logo.png" alt="Arsalan Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsShareOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold hover:bg-emerald-500/20 transition-colors"
              title="View 24/7 Live Status & Cloud Hosting"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span>24/7 Online • Google Cloud Run</span>
            </button>
          </div>
          <p className="font-medium text-neutral-400">
            {profile.name} © {new Date().getFullYear()} • Official Social Hub
          </p>
          <p className="text-[11px] text-neutral-600 flex items-center justify-center gap-1">
            <span>Seamless navigation for creators and audiences worldwide</span>
          </p>
        </footer>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        profileName={profile.name}
      />

      {/* Aesthetic Kashish Music Pop-up (45s Cut) */}
      <MusicPlayerPopup
        isOpen={isMusicOpen}
        onClose={() => setIsMusicOpen(false)}
        onOpen={() => setIsMusicOpen(true)}
      />

      {/* Interactive Toast Notifications */}
      <Toast message={toastMessage} type={toastType} />
    </div>
  );
}
