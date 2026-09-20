import React, { useState, useEffect } from 'react';
import { UserProfile, SocialPlatform, ThemeMode } from './types';
import { initialProfile, defaultPlatforms } from './data/socialPlatforms';
import { Header } from './components/Header';
import { PlatformCard } from './components/PlatformCard';
import { ContactSection } from './components/ContactSection';
import { ShareModal } from './components/ShareModal';
import { MusicPlayerPopup } from './components/MusicPlayerPopup';
import { DiscordDragonOverlay } from './components/DiscordDragonOverlay';
import { Toast } from './components/Toast';
import { VisitorBadge } from './components/VisitorBadge';
import { InstagramIcon, YouTubeIcon, TikTokIcon, ThreadsIcon, DiscordIcon } from './components/SocialIcons';
import { Sparkles, ArrowUpRight, Compass } from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('arsalan_hub_profile_v5');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.avatarUrl || parsed.avatarUrl.includes('v4') || parsed.avatarUrl === '/avatar.jpg') {
          parsed.avatarUrl = '/avatar.png?v=virat18_celebration';
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
  const [isDragonActive, setIsDragonActive] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  useEffect(() => {
    localStorage.setItem('arsalan_hub_profile_v5', JSON.stringify(profile));
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
        return 'bg-[#06140d] text-slate-100 selection:bg-emerald-500 selection:text-white';
      case 'pink':
        return 'bg-[#140813] text-slate-100 selection:bg-pink-500 selection:text-white';
      case 'blue':
      default:
        return 'bg-[#090e1a] text-slate-100 selection:bg-blue-500 selection:text-white';
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
      {/* Background with delicate aesthetic atmospheric texture and dark theme tint */}
      <div className="fixed inset-0 w-full h-full min-h-screen pointer-events-none -z-20 overflow-hidden">
        <div
          className={`absolute inset-0 transition-colors duration-700 ${
            theme === 'green'
              ? 'bg-gradient-to-b from-[#081e14]/95 via-[#06140d]/95 to-[#040e09]'
              : theme === 'pink'
              ? 'bg-gradient-to-b from-[#220d22]/95 via-[#140813]/95 to-[#0d040c]'
              : 'bg-gradient-to-b from-[#0b1429]/95 via-[#090e1a]/95 to-[#050811]'
          }`}
        />
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop"
          alt="Atmospheric Background"
          className="w-full h-full object-cover object-center opacity-15 mix-blend-screen scale-105 filter blur-[2px]"
        />
      </div>

      {/* Ambient background glows safely constrained to viewport */}
      <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden max-w-full -z-10">
        <div
          className={`absolute -top-32 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[350px] rounded-full blur-3xl transition-colors duration-700 ${
            theme === 'green'
              ? 'bg-emerald-500/20'
              : theme === 'pink'
              ? 'bg-pink-500/20'
              : 'bg-blue-500/20'
          }`}
        />
        <div
          className={`absolute top-1/4 left-0 w-72 h-72 rounded-full blur-3xl transition-colors duration-700 ${
            theme === 'green'
              ? 'bg-teal-500/15'
              : theme === 'pink'
              ? 'bg-rose-500/15'
              : 'bg-indigo-500/15'
          }`}
        />
        <div
          className={`absolute top-2/3 right-0 w-72 h-72 rounded-full blur-3xl transition-colors duration-700 ${
            theme === 'green'
              ? 'bg-emerald-600/15'
              : theme === 'pink'
              ? 'bg-fuchsia-600/15'
              : 'bg-sky-600/15'
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
          onOpenDragonEffect={() => setIsDragonActive(true)}
          isDragonActive={isDragonActive}
        />

        {/* Quick-Access Flagship Channels (Instagram, YouTube, TikTok, Threads, Discord) */}
        <div className="mt-4 mb-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Primary Creator Channels
            </span>
            <span className="text-xs text-slate-400">Tap to visit directly</span>
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
                className="group p-3 sm:p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-pink-500/60 transition-all text-center flex flex-col items-center justify-center gap-2 shadow-xs hover:shadow-lg hover:shadow-pink-500/15 active:scale-95 backdrop-blur-md"
              >
                <div className="w-10 h-10 rounded-xl bg-pink-950/70 border border-pink-500/30 flex items-center justify-center transition-transform group-hover:scale-110">
                  <InstagramIcon className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-white group-hover:text-pink-400 transition-colors">
                    Instagram
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono hidden sm:block truncate max-w-[100px]">
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
                className="group p-3 sm:p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-red-500/60 transition-all text-center flex flex-col items-center justify-center gap-2 shadow-xs hover:shadow-lg hover:shadow-red-500/15 active:scale-95 backdrop-blur-md"
              >
                <div className="w-10 h-10 rounded-xl bg-red-950/70 border border-red-500/30 flex items-center justify-center transition-transform group-hover:scale-110">
                  <YouTubeIcon className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                    YouTube
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono hidden sm:block truncate max-w-[100px]">
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
                className="group p-3 sm:p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/60 transition-all text-center flex flex-col items-center justify-center gap-2 shadow-xs hover:shadow-lg hover:shadow-cyan-500/15 active:scale-95 backdrop-blur-md"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center transition-transform group-hover:scale-110">
                  <TikTokIcon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                    TikTok
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono hidden sm:block truncate max-w-[100px]">
                    {flagshipTikTok.handle}
                  </span>
                </div>
                <div className="flex items-center gap-0.5 text-[11px] text-cyan-400 font-semibold group-hover:underline">
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
                className="group p-3 sm:p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-600 transition-all text-center flex flex-col items-center justify-center gap-2 shadow-xs hover:shadow-lg hover:shadow-white/5 active:scale-95 backdrop-blur-md"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center transition-transform group-hover:scale-110">
                  <ThreadsIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-white group-hover:text-slate-300 transition-colors">
                    Threads
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono hidden sm:block truncate max-w-[100px]">
                    {flagshipThreads.handle}
                  </span>
                </div>
                <div className="flex items-center gap-0.5 text-[11px] text-slate-300 font-semibold group-hover:underline">
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
                className="group p-3 sm:p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/60 transition-all text-center flex flex-col items-center justify-center gap-2 shadow-xs hover:shadow-lg hover:shadow-indigo-500/15 active:scale-95 col-span-2 sm:col-span-1 backdrop-blur-md"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-950/70 border border-indigo-500/30 flex items-center justify-center transition-transform group-hover:scale-110">
                  <DiscordIcon className="w-5 h-5 text-[#7289da]" />
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-white group-hover:text-[#7289da] transition-colors">
                    Discord
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono hidden sm:block truncate max-w-[100px]">
                    Server
                  </span>
                </div>
                <div className="flex items-center gap-0.5 text-[11px] text-[#7289da] font-semibold group-hover:underline">
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
              { id: 'all', label: 'All Channels', shortLabel: 'All' },
              { id: 'video', label: 'Video (YouTube & TikTok)', shortLabel: 'Video' },
              { id: 'visual', label: 'Visual (Instagram)', shortLabel: 'Visual' },
              { id: 'community', label: 'Community (Discord & Threads)', shortLabel: 'Community' },
            ].map((cat) => {
              const isActive = filterCategory === cat.id;
              let activeColorClass = 'bg-blue-600 text-white shadow-md shadow-blue-500/30 ring-1 ring-blue-400';
              if (theme === 'green') activeColorClass = 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30 ring-1 ring-emerald-400';
              if (theme === 'pink') activeColorClass = 'bg-pink-600 text-white shadow-md shadow-pink-500/30 ring-1 ring-pink-400';

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFilterCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? activeColorClass
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  <span className="sm:hidden">{cat.shortLabel}</span>
                  <span className="hidden sm:inline">{cat.label}</span>
                </button>
              );
            })}
          </div>

          <span className="text-xs text-slate-400 font-medium whitespace-nowrap hidden sm:inline">
            {filteredPlatforms.length} {filteredPlatforms.length === 1 ? 'Platform' : 'Platforms'}
          </span>
        </div>

        {/* Detailed Platforms List */}
        <main className="space-y-3.5">
          {filteredPlatforms.map((platform) => (
            <PlatformCard
              key={platform.id}
              platform={platform}
              theme={theme}
              onVisit={handleVisitPlatform}
              onCopy={handleCopy}
            />
          ))}
        </main>

        {/* Direct Contact & Collaboration Section */}
        <ContactSection email={profile.email} theme={theme} onCopy={handleCopy} />

        {/* Aesthetic Footer */}
        <footer className="mt-14 text-center text-xs text-slate-400 space-y-3.5 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-700 shadow-xs bg-slate-900">
            <img src="/logo.png?v=death_express" alt="Death Express Logo" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>

          {/* Real-time Aesthetic Visitor Count & Social Credibility Badge */}
          <VisitorBadge theme={theme} />

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsShareOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 text-[11px] font-semibold hover:bg-emerald-900/70 transition-colors"
              title="View 24/7 Live Status & Cloud Hosting"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span>24/7 Online • Google Cloud Run</span>
            </button>
          </div>
          <p className="font-medium text-slate-300">
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

      {/* Discord Nitro Crimson Dragon Profile Effect Overlay (Plays for 5 seconds on load, then vanishes) */}
      <DiscordDragonOverlay
        isActive={isDragonActive}
        onComplete={() => setIsDragonActive(false)}
      />

      {/* Aesthetic Kashish Music Pop-up (Ashish Bhatia & Omkar Singh) */}
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
