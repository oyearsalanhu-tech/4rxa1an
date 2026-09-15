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
    const saved = localStorage.getItem('arsalan_hub_profile_v4');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.avatarUrl || parsed.avatarUrl === '/avatar.jpg') {
          parsed.avatarUrl = '/avatar.png?v=virat18';
        }
        return parsed;
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
    if (saved === 'blue' || saved === 'green' || saved === 'pink') {
      return saved;
    }
    return 'blue';
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'info'>('success');
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isMusicOpen, setIsMusicOpen] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  useEffect(() => {
    localStorage.setItem('arsalan_hub_profile_v4', JSON.stringify(profile));
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

  // Theme styling backgrounds and text
  const getThemeClasses = () => {
    switch (theme) {
      case 'green':
        return 'bg-[#f4faf6] text-slate-800 selection:bg-emerald-600 selection:text-white';
      case 'pink':
        return 'bg-[#fdf4f7] text-slate-800 selection:bg-pink-600 selection:text-white';
      case 'blue':
      default:
        return 'bg-[#f4f7fc] text-slate-800 selection:bg-blue-600 selection:text-white';
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
    <div className={`min-h-screen w-full max-w-full overflow-x-hidden relative font-sans transition-colors duration-500 ${getThemeClasses()}`}>
      {/* Background with delicate light aesthetic atmospheric texture and tint */}
      <div className="fixed inset-0 w-full h-full min-h-screen pointer-events-none -z-20 overflow-hidden">
        <div
          className={`absolute inset-0 transition-colors duration-700 ${
            theme === 'green'
              ? 'bg-gradient-to-b from-[#e8f7ee]/90 via-[#f4faf6]/95 to-[#f4faf6]'
              : theme === 'pink'
              ? 'bg-gradient-to-b from-[#fcebf3]/90 via-[#fdf4f7]/95 to-[#fdf4f7]'
              : 'bg-gradient-to-b from-[#e9f2fd]/90 via-[#f4f7fc]/95 to-[#f4f7fc]'
          }`}
        />
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop"
          alt="Atmospheric Background"
          className="w-full h-full object-cover object-center opacity-10 mix-blend-multiply scale-105 filter blur-[2px]"
        />
      </div>

      {/* Ambient background glows safely constrained to viewport */}
      <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden max-w-full -z-10">
        <div
          className={`absolute -top-32 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[350px] rounded-full blur-3xl transition-colors duration-700 ${
            theme === 'green'
              ? 'bg-emerald-300/25'
              : theme === 'pink'
              ? 'bg-pink-300/25'
              : 'bg-blue-300/25'
          }`}
        />
        <div
          className={`absolute top-1/4 left-0 w-72 h-72 rounded-full blur-3xl transition-colors duration-700 ${
            theme === 'green'
              ? 'bg-teal-300/20'
              : theme === 'pink'
              ? 'bg-rose-300/20'
              : 'bg-indigo-300/20'
          }`}
        />
        <div
          className={`absolute top-2/3 right-0 w-72 h-72 rounded-full blur-3xl transition-colors duration-700 ${
            theme === 'green'
              ? 'bg-lime-300/20'
              : theme === 'pink'
              ? 'bg-fuchsia-300/20'
              : 'bg-cyan-300/20'
          }`}
        />
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

        {/* Quick-Access Flagship Channels (Instagram, YouTube, TikTok, Threads, Discord) */}
        <div className="mt-4 mb-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Primary Creator Channels
            </span>
            <span className="text-xs text-slate-500">Tap to visit directly</span>
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
                className="group p-3 sm:p-4 rounded-2xl bg-white/85 hover:bg-white border border-slate-200/80 hover:border-pink-300 transition-all text-center flex flex-col items-center justify-center gap-2 shadow-xs hover:shadow-md hover:shadow-pink-500/10 active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center transition-transform group-hover:scale-110">
                  <InstagramIcon className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-slate-900 group-hover:text-pink-600 transition-colors">
                    Instagram
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono hidden sm:block truncate max-w-[100px]">
                    {flagshipInstagram.handle}
                  </span>
                </div>
                <div className="flex items-center gap-0.5 text-[11px] text-pink-600 font-semibold group-hover:underline">
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
                className="group p-3 sm:p-4 rounded-2xl bg-white/85 hover:bg-white border border-slate-200/80 hover:border-red-300 transition-all text-center flex flex-col items-center justify-center gap-2 shadow-xs hover:shadow-md hover:shadow-red-500/10 active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center transition-transform group-hover:scale-110">
                  <YouTubeIcon className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                    YouTube
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono hidden sm:block truncate max-w-[100px]">
                    {flagshipYouTube.handle}
                  </span>
                </div>
                <div className="flex items-center gap-0.5 text-[11px] text-red-600 font-semibold group-hover:underline">
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
                className="group p-3 sm:p-4 rounded-2xl bg-white/85 hover:bg-white border border-slate-200/80 hover:border-cyan-300 transition-all text-center flex flex-col items-center justify-center gap-2 shadow-xs hover:shadow-md hover:shadow-cyan-500/10 active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center transition-transform group-hover:scale-110">
                  <TikTokIcon className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                    TikTok
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono hidden sm:block truncate max-w-[100px]">
                    {flagshipTikTok.handle}
                  </span>
                </div>
                <div className="flex items-center gap-0.5 text-[11px] text-cyan-600 font-semibold group-hover:underline">
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
                className="group p-3 sm:p-4 rounded-2xl bg-white/85 hover:bg-white border border-slate-200/80 hover:border-slate-400 transition-all text-center flex flex-col items-center justify-center gap-2 shadow-xs hover:shadow-md active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center transition-transform group-hover:scale-110">
                  <ThreadsIcon className="w-5 h-5 text-slate-900" />
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
                    Threads
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono hidden sm:block truncate max-w-[100px]">
                    {flagshipThreads.handle}
                  </span>
                </div>
                <div className="flex items-center gap-0.5 text-[11px] text-slate-700 font-semibold group-hover:underline">
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
                className="group p-3 sm:p-4 rounded-2xl bg-white/85 hover:bg-white border border-slate-200/80 hover:border-indigo-300 transition-all text-center flex flex-col items-center justify-center gap-2 shadow-xs hover:shadow-md hover:shadow-indigo-500/10 active:scale-95 col-span-2 sm:col-span-1"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center transition-transform group-hover:scale-110">
                  <DiscordIcon className="w-5 h-5 text-[#5865F2]" />
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#5865F2] transition-colors">
                    Discord
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono hidden sm:block truncate max-w-[100px]">
                    Server
                  </span>
                </div>
                <div className="flex items-center gap-0.5 text-[11px] text-[#5865F2] font-semibold group-hover:underline">
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
            ].map((cat) => {
              const isActive = filterCategory === cat.id;
              let activeColorClass = 'bg-blue-600 text-white shadow-xs';
              if (theme === 'green') activeColorClass = 'bg-emerald-600 text-white shadow-xs';
              if (theme === 'pink') activeColorClass = 'bg-pink-600 text-white shadow-xs';

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFilterCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? activeColorClass
                      : 'bg-white/70 hover:bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <span className="text-xs text-slate-500 font-medium whitespace-nowrap hidden sm:inline">
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
        <footer className="mt-14 text-center text-xs text-slate-500 space-y-3 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 shadow-xs bg-white">
            <img src="/logo.png?v=death_express" alt="Death Express Logo" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsShareOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold hover:bg-emerald-100 transition-colors"
              title="View 24/7 Live Status & Cloud Hosting"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span>24/7 Online • Google Cloud Run</span>
            </button>
          </div>
          <p className="font-medium text-slate-700">
            {profile.name} © {new Date().getFullYear()} • Official Social Hub
          </p>
          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
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
