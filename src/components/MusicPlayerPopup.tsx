import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  Volume1,
  VolumeX,
  RotateCcw,
  Music,
  Sparkles,
  ChevronDown,
  ChevronUp,
  X,
  ExternalLink,
  Plus,
  Minus,
  Radio,
  Disc3,
  Repeat
} from 'lucide-react';
import { InstagramIcon } from './SocialIcons';

interface MusicPlayerPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const MusicPlayerPopup: React.FC<MusicPlayerPopupProps> = ({
  isOpen,
  onClose,
  onOpen,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(80);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isLooping, setIsLooping] = useState<boolean>(true);
  const [showLyrics, setShowLyrics] = useState<boolean>(true);
  const [videoMode, setVideoMode] = useState<'lyrics' | 'official'>('lyrics');
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const DURATION_LIMIT = 120; // Requested duration: 120 seconds (2:00)
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const progressTimerRef = useRef<number | null>(null);

  // Start offset where the lyrics "us ki ankho me phaila kajal" start:
  // - Lyrics Audio (1H8IW7Wt3g8): Begins right at 0s with the vocals
  // - Official Video (nwXAkF8OFCc): Begins after the cinematic intro at exactly 19s
  const currentVideoId = videoMode === 'lyrics' ? '1H8IW7Wt3g8' : 'nwXAkF8OFCc';
  const startOffset = videoMode === 'lyrics' ? 0 : 19;
  const endOffset = startOffset + DURATION_LIMIT;

  // Post message command helper to control YouTube iframe
  const sendYouTubeCommand = (func: string, args: (string | number | boolean)[] = []) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func,
          args,
        }),
        '*'
      );
    }
  };

  // Start or resume music
  const handlePlay = () => {
    setIsPlaying(true);
    setHasInteracted(true);
    sendYouTubeCommand('playVideo');
    sendYouTubeCommand('setVolume', [isMuted ? 0 : volume]);
  };

  // Stop / pause music
  const handlePause = () => {
    setIsPlaying(false);
    sendYouTubeCommand('pauseVideo');
  };

  // Toggle start / stop
  const togglePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  // Restart 120-second snippet from "us ki ankho me phaila kajal"
  const handleRestart = () => {
    setCurrentTime(0);
    sendYouTubeCommand('seekTo', [startOffset, true]);
    if (!isPlaying) {
      handlePlay();
    }
  };

  // Volume controls (increase / decrease / slider / mute)
  const handleVolumeChange = (newVol: number) => {
    const clamped = Math.max(0, Math.min(100, Math.round(newVol)));
    setVolume(clamped);
    if (isMuted && clamped > 0) {
      setIsMuted(false);
    }
    sendYouTubeCommand('setVolume', [clamped]);
    sendYouTubeCommand('unMute');
  };

  const increaseVolume = () => {
    handleVolumeChange(volume + 10);
  };

  const decreaseVolume = () => {
    handleVolumeChange(volume - 10);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      sendYouTubeCommand('setVolume', [volume]);
      sendYouTubeCommand('unMute');
    } else {
      setIsMuted(true);
      sendYouTubeCommand('mute');
    }
  };

  // Seek within the 120s cut
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    sendYouTubeCommand('seekTo', [startOffset + newTime, true]);
  };

  // Progress ticker for 120s duration
  useEffect(() => {
    if (isPlaying) {
      progressTimerRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= DURATION_LIMIT) {
            if (isLooping) {
              sendYouTubeCommand('seekTo', [startOffset, true]);
              return 0;
            } else {
              handlePause();
              return DURATION_LIMIT;
            }
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    }

    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, [isPlaying, isLooping, startOffset]);

  // Sync volume on change
  useEffect(() => {
    if (isPlaying) {
      sendYouTubeCommand('setVolume', [isMuted ? 0 : volume]);
    }
  }, [volume, isMuted, isPlaying]);

  // Switch video mode (Lyrics Cut vs Official Video)
  const handleSwitchMode = (mode: 'lyrics' | 'official') => {
    setVideoMode(mode);
    setCurrentTime(0);
    const newStart = mode === 'lyrics' ? 0 : 19;
    setTimeout(() => {
      sendYouTubeCommand('seekTo', [newStart, true]);
      if (isPlaying) {
        sendYouTubeCommand('playVideo');
      }
    }, 400);
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // If closed completely, render floating trigger pill at bottom right
  if (!isOpen) {
    return (
      <button
        id="open-music-pill"
        type="button"
        onClick={() => {
          onOpen();
          setIsMinimized(false);
        }}
        title="Play Kashish - 120s Instagram Banner Track (@iamarsalan_.18)"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-white border border-pink-500/30 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 group"
      >
        <div className="relative w-7 h-7 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
          <Music className="w-3.5 h-3.5" />
          {isPlaying && (
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-400 animate-ping" />
          )}
        </div>
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold leading-tight">Kashish</span>
            <span className="text-[10px] px-1 rounded bg-pink-500/20 text-pink-300 font-mono">120s</span>
          </div>
          <span className="text-[10px] text-neutral-400 leading-tight flex items-center gap-1">
            From @iamarsalan_.18 IG Banner
          </span>
        </div>
      </button>
    );
  }

  return (
    <>
      {/* Hidden YouTube Iframe Player running via YouTube IFrame API */}
      <div className="hidden" aria-hidden="true">
        <iframe
          ref={iframeRef}
          id="yt-kashish-player"
          src={`https://www.youtube-nocookie.com/embed/${currentVideoId}?enablejsapi=1&start=${startOffset}&end=${endOffset}&controls=0&modestbranding=1&rel=0&playsinline=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
          title="Kashish Music Audio Player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          width="100"
          height="100"
        />
      </div>

      {/* Aesthetic Floating Pop-Up Widget Container */}
      <aside
        id="aesthetic-music-popup"
        aria-label="Kashish Music Player"
        className={`fixed z-50 transition-all duration-300 ${
          isMinimized
            ? 'bottom-5 right-4 sm:right-6 w-auto max-w-[calc(100vw-2rem)]'
            : 'bottom-4 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 w-auto sm:w-[420px] max-w-[calc(100vw-1.5rem)] max-h-[85vh]'
        }`}
      >
        {isMinimized ? (
          /* Sleek Minimized Floating Pill */
          <div className="flex items-center gap-3 p-2.5 px-4 rounded-2xl bg-neutral-950/90 border border-pink-500/20 shadow-2xl backdrop-blur-2xl text-white">
            <button
              type="button"
              onClick={togglePlayPause}
              className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform"
              title={isPlaying ? 'Pause Music' : 'Play Music'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
            </button>

            <div
              className="flex flex-col cursor-pointer select-none"
              onClick={() => setIsMinimized(false)}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold">Kashish</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 font-mono">
                  {formatSeconds(currentTime)}/2:00
                </span>
              </div>
              <span className="text-[10px] text-pink-300/80 truncate max-w-[150px]">
                IG Banner: @iamarsalan_.18
              </span>
            </div>

            {/* Quick volume mute in minimized */}
            <button
              type="button"
              onClick={toggleMute}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            {/* Expand button */}
            <button
              type="button"
              onClick={() => setIsMinimized(false)}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors"
              title="Expand Music Pop-up"
            >
              <ChevronUp className="w-4 h-4" />
            </button>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-neutral-500 hover:text-neutral-300 transition-colors"
              title="Close Player"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Full Aesthetic Pop-Up Card */
          <div className="relative rounded-3xl p-5 sm:p-6 bg-gradient-to-b from-neutral-900/95 via-neutral-900/90 to-neutral-950/95 border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl text-white overflow-hidden">
            {/* Ambient colorful glow behind player */}
            <div className="absolute -top-20 -left-20 w-48 h-48 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Top Bar with title & window actions */}
            <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      isPlaying ? 'bg-pink-400' : 'bg-neutral-500'
                    }`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      isPlaying ? 'bg-pink-500' : 'bg-neutral-500'
                    }`}
                  />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Official Audio Experience
                </span>
              </div>

              <div className="flex items-center gap-1">
                {/* Minimize button */}
                <button
                  id="music-minimize-btn"
                  type="button"
                  onClick={() => setIsMinimized(true)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                  title="Minimize Player"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                {/* Close button */}
                <button
                  id="music-close-btn"
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                  title="Close Player"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Reason Banner: Played from Instagram Banner of @iamarsalan_.18 */}
            <a
              id="instagram-banner-reason-link"
              href="https://www.instagram.com/iamarsalan_.18/"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-3.5 flex items-center justify-between gap-2 p-2.5 px-3 rounded-2xl bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-rose-500/15 border border-pink-500/30 hover:border-pink-500/60 transition-all group shadow-sm"
              title="Visit @iamarsalan_.18 on Instagram"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0 text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-white group-hover:text-pink-200 transition-colors">
                      Instagram Banner Soundtrack
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-pink-500/20 text-pink-300 font-semibold">
                      @iamarsalan_.18
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-300 truncate">
                    Played directly from @iamarsalan_.18's official Instagram banner
                  </p>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-pink-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </a>

            {/* Song Identity & Spinning Vinyl Section */}
            <div className="flex items-center gap-4 my-2">
              {/* Spinning Vinyl / Album Artwork */}
              <div className="relative w-18 h-18 sm:w-20 sm:h-20 shrink-0">
                <div
                  className={`w-full h-full rounded-2xl overflow-hidden shadow-xl border border-white/20 bg-neutral-950 transition-all ${
                    isPlaying ? 'ring-2 ring-pink-500/50 shadow-pink-500/20' : ''
                  }`}
                >
                  <img
                    src="https://i.ytimg.com/vi/1H8IW7Wt3g8/hqdefault.jpg"
                    alt="Kashish - Ashish Bhatia"
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isPlaying ? 'scale-105' : 'scale-100'
                    }`}
                  />
                </div>

                {/* Animated Vinyl Grooves Overlay Badge */}
                <div
                  className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center text-pink-400 shadow-md ${
                    isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
                  }`}
                >
                  <Disc3 className="w-4 h-4" />
                </div>
              </div>

              {/* Title, Artists, and 120s Badge */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-base sm:text-lg font-extrabold text-white truncate tracking-tight">
                    Kashish
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30 font-mono">
                    120s Cut
                  </span>
                </div>

                <p className="text-xs text-neutral-300 truncate mt-0.5 font-medium">
                  Ashish Bhatia, Omkar Singh, Kashish Ratnani
                </p>

                {/* Starting lyrics hook indicator */}
                <div className="mt-1.5 flex items-center gap-1.5">
                  <Radio className={`w-3 h-3 ${isPlaying ? 'text-pink-400 animate-pulse' : 'text-neutral-500'}`} />
                  <span className="text-[11px] text-amber-300 font-mono italic truncate">
                    Starts: "us ki ankho me phaila kajal"
                  </span>
                </div>
              </div>
            </div>

            {/* Lyrics Card Highlight */}
            {showLyrics && (
              <div className="mt-3 p-3 rounded-2xl bg-black/40 border border-white/10 text-center relative overflow-hidden">
                <div className="text-xs font-serif leading-relaxed text-neutral-200">
                  <p className="font-semibold text-pink-300 text-[13px]">
                    "Uski aankhon mein faila kajal, baaton se karti ghayal"
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Saanson mein uska hi hai naam • Raushan kar de tu mujhko aaj
                  </p>
                </div>
              </div>
            )}

            {/* 120-Second (2:00) Progress Bar with Scrubbing */}
            <div className="mt-4 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                <span>{formatSeconds(currentTime)}</span>
                <div className="flex items-center gap-1 text-[10px] text-pink-400 font-semibold uppercase tracking-wider">
                  <span>Duration: 120s (2:00)</span>
                </div>
                <span>2:00</span>
              </div>

              {/* Scrubbable Range Input */}
              <div className="relative group/bar flex items-center">
                <input
                  type="range"
                  min={0}
                  max={DURATION_LIMIT}
                  value={currentTime}
                  onChange={handleSeek}
                  aria-label="Song progress"
                  className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-neutral-800 accent-pink-500 focus:outline-none"
                  style={{
                    background: `linear-gradient(to right, #ec4899 ${(currentTime / DURATION_LIMIT) * 100}%, #262626 ${(currentTime / DURATION_LIMIT) * 100}%)`,
                  }}
                />
              </div>
            </div>

            {/* Audio Visualizer Waves (Equalizer animation when playing) */}
            <div className="flex items-center justify-center gap-1 h-5 mt-2">
              {[40, 75, 55, 95, 60, 85, 45, 70].map((h, i) => (
                <div
                  key={i}
                  className="w-1 rounded-full bg-gradient-to-t from-pink-500 to-rose-400 transition-all duration-150"
                  style={{
                    height: isPlaying ? `${Math.max(15, (h * ((currentTime % 4) + 1)) % 100)}%` : '20%',
                    opacity: isPlaying ? 0.9 : 0.25,
                  }}
                />
              ))}
            </div>

            {/* Primary Controls: Stop/Start & Restart */}
            <div className="mt-3 flex items-center justify-between gap-3">
              {/* Loop toggle */}
              <button
                type="button"
                onClick={() => setIsLooping(!isLooping)}
                title={isLooping ? 'Looping 120s cut enabled' : 'Play once'}
                className={`p-2 rounded-xl border transition-all ${
                  isLooping
                    ? 'border-pink-500/40 bg-pink-500/10 text-pink-300'
                    : 'border-white/10 text-neutral-500 hover:text-white'
                }`}
              >
                <Repeat className="w-4 h-4" />
              </button>

              {/* Center Controls: Restart, Big Play/Pause, Lyrics Toggle */}
              <div className="flex items-center gap-3">
                {/* Restart from "us ki ankho me phaila kajal" */}
                <button
                  id="music-restart-btn"
                  type="button"
                  onClick={handleRestart}
                  title="Restart 120s snippet from 'us ki ankho me phaila kajal'"
                  className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-all active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Primary Stop/Start Button */}
                <button
                  id="music-play-pause-btn"
                  type="button"
                  onClick={togglePlayPause}
                  className={`w-13 h-13 rounded-2xl flex items-center justify-center transition-all duration-200 shadow-xl active:scale-95 ${
                    isPlaying
                      ? 'bg-gradient-to-tr from-pink-600 to-rose-500 text-white shadow-pink-500/25 ring-2 ring-pink-400/40'
                      : 'bg-white text-black hover:bg-neutral-200 shadow-white/10'
                  }`}
                  title={isPlaying ? 'Stop Music (Pause)' : 'Start Music (Play)'}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  )}
                </button>

                {/* Toggle lyrics box */}
                <button
                  type="button"
                  onClick={() => setShowLyrics(!showLyrics)}
                  title={showLyrics ? 'Hide Lyrics' : 'Show Lyrics'}
                  className={`p-2.5 rounded-xl border transition-all ${
                    showLyrics
                      ? 'border-white/20 bg-white/10 text-white'
                      : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Music className="w-4 h-4" />
                </button>
              </div>

              {/* Mode switch: Lyrics vs Official */}
              <button
                type="button"
                onClick={() => handleSwitchMode(videoMode === 'lyrics' ? 'official' : 'lyrics')}
                title={`Switch audio source (Currently: ${videoMode === 'lyrics' ? 'Lyrics Audio' : 'Official MV'})`}
                className="px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-[10px] font-mono font-semibold text-neutral-300 hover:text-white transition-all"
              >
                {videoMode === 'lyrics' ? 'Studio' : 'MV Cut'}
              </button>
            </div>

            {/* Explicit Volume Controls: Decrease, Slider, Increase, Mute */}
            <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between gap-3">
              {/* Mute toggle button */}
              <button
                id="music-mute-btn"
                type="button"
                onClick={toggleMute}
                className="p-1.5 text-neutral-400 hover:text-white transition-colors shrink-0"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-pink-400" />
                ) : volume < 50 ? (
                  <Volume1 className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              {/* Decrease volume button (-10%) */}
              <button
                id="volume-decrease-btn"
                type="button"
                onClick={decreaseVolume}
                disabled={volume === 0 || isMuted}
                title="Decrease Volume (-10%)"
                className="w-7 h-7 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-40 flex items-center justify-center text-neutral-300 hover:text-white transition-all shrink-0"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              {/* Interactive volume slider */}
              <div className="flex-1 flex items-center gap-2">
                <input
                  id="music-volume-slider"
                  type="range"
                  min={0}
                  max={100}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(Number(e.target.value))}
                  aria-label="Adjust volume"
                  className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-neutral-800 accent-pink-500 focus:outline-none"
                  style={{
                    background: `linear-gradient(to right, #ec4899 ${isMuted ? 0 : volume}%, #262626 ${isMuted ? 0 : volume}%)`,
                  }}
                />
                <span className="text-[11px] font-mono text-neutral-400 w-8 text-right shrink-0">
                  {isMuted ? '0%' : `${volume}%`}
                </span>
              </div>

              {/* Increase volume button (+10%) */}
              <button
                id="volume-increase-btn"
                type="button"
                onClick={increaseVolume}
                disabled={volume >= 100}
                title="Increase Volume (+10%)"
                className="w-7 h-7 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-40 flex items-center justify-center text-neutral-300 hover:text-white transition-all shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Prompt helper when first loading */}
            {!hasInteracted && (
              <div className="mt-3 text-center">
                <button
                  type="button"
                  onClick={handlePlay}
                  className="text-xs text-pink-300 hover:text-pink-200 font-semibold underline underline-offset-4 animate-pulse transition-colors"
                >
                  Tap to Start "Kashish" (120s • Starts at "us ki ankho me phaila kajal")
                </button>
              </div>
            )}
          </div>
        )}
      </aside>
    </>
  );
};
