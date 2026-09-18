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
  Disc3,
  Repeat,
  Heart,
  FileText
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
  const [duration, setDuration] = useState<number>(195); // Default 3:15, updated dynamically from player
  const [isLooping, setIsLooping] = useState<boolean>(true);
  const [showLyrics, setShowLyrics] = useState<boolean>(true);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const progressTimerRef = useRef<number | null>(null);

  // Skip the first 10 seconds (crowd / celebration voice intro) so music starts cleanly
  const START_OFFSET = 10;

  // Kashish Official Music Video by Ashish Bhatia, Omkar Singh, Kashish Ratnani
  const currentVideoId = 'nwXAkF8OFCc';

  // PostMessage command helper to control YouTube iframe
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

  // Start or resume music (always starts at 10s or resumes)
  const handlePlay = () => {
    setIsPlaying(true);
    setHasInteracted(true);
    if (currentTime === 0) {
      sendYouTubeCommand('seekTo', [START_OFFSET, true]);
    }
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

  // Restart song from the beginning of the music (0:10 of video)
  const handleRestart = () => {
    setCurrentTime(0);
    sendYouTubeCommand('seekTo', [START_OFFSET, true]);
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

  // Seek to specific timestamp (offset by START_OFFSET)
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    sendYouTubeCommand('seekTo', [newTime + START_OFFSET, true]);
  };

  // Listen to YouTube player messages for live progress and track duration
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data && data.event === 'infoDelivery' && data.info) {
          if (typeof data.info.duration === 'number' && data.info.duration > 30) {
            setDuration(Math.max(1, Math.round(data.info.duration) - START_OFFSET));
          }
          if (typeof data.info.currentTime === 'number') {
            const rawSec = Math.round(data.info.currentTime);
            // If playback lands before the 10s mark, immediately jump forward to avoid celebration voices
            if (rawSec < START_OFFSET && isPlaying) {
              sendYouTubeCommand('seekTo', [START_OFFSET, true]);
              setCurrentTime(0);
            } else {
              setCurrentTime(Math.max(0, rawSec - START_OFFSET));
            }
          }
          // Player state 0 is ENDED
          if (data.info.playerState === 0) {
            if (isLooping) {
              sendYouTubeCommand('seekTo', [START_OFFSET, true]);
              sendYouTubeCommand('playVideo');
              setCurrentTime(0);
            } else {
              handlePause();
              setCurrentTime(duration);
            }
          }
        }
      } catch {
        // Ignore unparseable postMessages
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [isLooping, duration, isPlaying]);

  // Fallback progress ticker ensuring smooth progress bar feedback
  useEffect(() => {
    if (isPlaying) {
      progressTimerRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            if (isLooping) {
              sendYouTubeCommand('seekTo', [START_OFFSET, true]);
              return 0;
            } else {
              handlePause();
              return duration;
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
  }, [isPlaying, isLooping, duration]);

  // Sync volume on state change
  useEffect(() => {
    if (isPlaying) {
      sendYouTubeCommand('setVolume', [isMuted ? 0 : volume]);
      if (isMuted) {
        sendYouTubeCommand('mute');
      } else {
        sendYouTubeCommand('unMute');
      }
    }
  }, [volume, isMuted, isPlaying]);

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
        title="Play Kashish - Ashish Bhatia, Omkar Singh & Kashish Ratnani"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-white border border-pink-500/30 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 group"
      >
        <div className="relative w-7 h-7 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
          <Music className="w-3.5 h-3.5" />
          {isPlaying && (
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-400 animate-ping" />
          )}
        </div>
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold leading-tight">Kashish</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-pink-500/20 text-pink-300 font-mono">
              Soundtrack
            </span>
          </div>
          <span className="text-[10px] text-neutral-400 leading-tight flex items-center gap-1">
            Ashish Bhatia &amp; Omkar Singh
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
          key={`yt-${currentVideoId}`}
          id="yt-kashish-player"
          src={`https://www.youtube-nocookie.com/embed/${currentVideoId}?enablejsapi=1&controls=0&modestbranding=1&rel=0&playsinline=1&start=10&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
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
          /* Sleek Minimized Floating Pill with Dark Aesthetics */
          <div className="flex items-center gap-3 p-2.5 px-4 rounded-2xl bg-neutral-900/95 border border-neutral-800 shadow-2xl backdrop-blur-2xl text-white">
            <button
              type="button"
              onClick={togglePlayPause}
              className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-md active:scale-90 transition-transform"
              title={isPlaying ? 'Pause Music' : 'Play Music'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
            </button>

            <div
              className="flex flex-col cursor-pointer select-none"
              onClick={() => setIsMinimized(false)}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white">Kashish</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30 font-mono font-semibold">
                  {formatSeconds(currentTime)}/{formatSeconds(duration)}
                </span>
              </div>
              <span className="text-[10px] text-neutral-400 truncate max-w-[150px]">
                Ashish Bhatia &amp; Omkar Singh
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
              className="p-1.5 text-neutral-400 hover:text-neutral-300 transition-colors"
              title="Close Player"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Full Aesthetic Pop-Up Card with Dark Theme Styling */
          <div className="relative rounded-3xl p-5 sm:p-6 bg-neutral-900/95 border border-neutral-800/90 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl text-white overflow-hidden">
            {/* Ambient colorful glow behind player */}
            <div className="absolute -top-20 -left-20 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Bar with title & window actions */}
            <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      isPlaying ? 'bg-pink-400' : 'bg-neutral-600'
                    }`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      isPlaying ? 'bg-pink-500' : 'bg-neutral-500'
                    }`}
                  />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-pink-400" />
                  Featured Soundtrack • Kashish
                </span>
              </div>

              <div className="flex items-center gap-1">
                {/* Minimize button */}
                <button
                  id="music-minimize-btn"
                  type="button"
                  onClick={() => setIsMinimized(true)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                  title="Minimize Player"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                {/* Close button */}
                <button
                  id="music-close-btn"
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                  title="Close Player"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Reason Banner: Instagram link */}
            <a
              id="instagram-banner-reason-link"
              href="https://www.instagram.com/iamarsalan_.18/"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-3.5 flex items-center justify-between gap-2 p-2.5 px-3 rounded-2xl bg-neutral-800/80 border border-neutral-700/60 hover:border-pink-500/50 transition-all group shadow-xs"
              title="Visit @iamarsalan_.18 on Instagram"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0 text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-white group-hover:text-pink-300 transition-colors">
                      Instagram Featured Soundtrack
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-pink-500/20 text-pink-300 font-semibold border border-pink-500/30">
                      @iamarsalan_.18
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-400 truncate">
                    Curated track from @iamarsalan_.18's official Instagram profile
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
                  className={`w-full h-full rounded-2xl overflow-hidden shadow-md border border-neutral-800 bg-neutral-800 transition-all ${
                    isPlaying ? 'ring-2 ring-pink-500/50 shadow-pink-500/20' : ''
                  }`}
                >
                  <img
                    src="https://i.ytimg.com/vi/nwXAkF8OFCc/hqdefault.jpg"
                    alt="Kashish - Ashish Bhatia, Omkar Singh & Kashish Ratnani"
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isPlaying ? 'scale-105' : 'scale-100'
                    }`}
                  />
                </div>

                {/* Animated Vinyl Grooves Overlay Badge */}
                <div
                  className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-pink-400 shadow-md ${
                    isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
                  }`}
                >
                  <Disc3 className="w-4 h-4" />
                </div>
              </div>

              {/* Title and Artists */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-base sm:text-lg font-extrabold text-white truncate tracking-tight">
                    Kashish
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30 font-mono">
                    Official Song
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-neutral-800 text-neutral-300 border border-neutral-700 font-mono">
                    Clean Cut (0:10+)
                  </span>
                </div>

                <p className="text-xs text-neutral-300 truncate mt-0.5 font-medium">
                  Ashish Bhatia • Omkar Singh • Kashish Ratnani
                </p>

                {/* Soundtrack Tagline */}
                <div className="mt-1.5 flex items-center gap-1.5">
                  <Heart className={`w-3 h-3 ${isPlaying ? 'text-pink-400 fill-pink-400 animate-pulse' : 'text-neutral-500'}`} />
                  <span className="text-[11px] text-pink-300 font-mono italic truncate">
                    "Uski aankhon mein faila kajal..."
                  </span>
                </div>
              </div>
            </div>

            {/* Lyrics Card with Iconic Kashish Lyrics */}
            {showLyrics && (
              <div className="mt-3 p-3.5 rounded-2xl bg-neutral-950/75 border border-neutral-800/90 text-center relative overflow-hidden shadow-inner">
                <div className="text-xs font-serif leading-relaxed text-neutral-300 space-y-1">
                  <p className="font-semibold text-pink-300 text-[13px]">
                    "Uski aankhon mein faila kajal, baaton se karti ghayal"
                  </p>
                  <p className="text-[12px] text-neutral-300">
                    "Saanson mein uska hi hai naam... Meri neendein udi hai jab se, tu aa gayi jeevan mein"
                  </p>
                  <p className="text-[11.5px] text-pink-200/90 italic font-sans pt-1">
                    "Maana kabhi kabhi, had se guzar jaata hoon tere pyaar mein... ❤️"
                  </p>
                </div>
              </div>
            )}

            {/* Progress Bar with Scrubbing */}
            <div className="mt-3.5 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                <span>{formatSeconds(currentTime)}</span>
                <div className="flex items-center gap-1 text-[10px] text-pink-400 font-semibold uppercase tracking-wider">
                  <span>Kashish • Ashish Bhatia &amp; Omkar Singh</span>
                </div>
                <span>{formatSeconds(duration)}</span>
              </div>

              {/* Scrubbable Range Input */}
              <div className="relative group/bar flex items-center">
                <input
                  type="range"
                  min={0}
                  max={Math.max(1, duration)}
                  value={currentTime}
                  onChange={handleSeek}
                  aria-label="Song progress"
                  className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-neutral-800 accent-pink-500 focus:outline-none"
                  style={{
                    background: `linear-gradient(to right, #ec4899 ${(currentTime / Math.max(1, duration)) * 100}%, #262626 ${(currentTime / Math.max(1, duration)) * 100}%)`,
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
              <div className="flex items-center gap-2">
                {/* Restart song button */}
                <button
                  id="music-restart-btn"
                  type="button"
                  onClick={handleRestart}
                  title="Restart song from beginning"
                  className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-800/60 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-all shadow-xs active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Primary Play/Pause Button */}
                <button
                  id="music-play-pause-btn"
                  type="button"
                  onClick={togglePlayPause}
                  title={isPlaying ? 'Pause' : 'Play'}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs shadow-lg shadow-pink-500/20 active:scale-95 transition-all"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-white" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                      <span>Play Track</span>
                    </>
                  )}
                </button>
              </div>

              {/* Auxiliary Controls: Loop & Lyrics Toggle */}
              <div className="flex items-center gap-1.5">
                {/* Loop toggle */}
                <button
                  id="music-loop-toggle"
                  type="button"
                  onClick={() => setIsLooping(!isLooping)}
                  title={isLooping ? 'Repeat: Enabled' : 'Repeat: Disabled'}
                  className={`p-2 rounded-xl border transition-all ${
                    isLooping
                      ? 'border-pink-500/40 bg-pink-500/20 text-pink-300'
                      : 'border-neutral-800 bg-neutral-800/50 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Repeat className="w-4 h-4" />
                </button>

                {/* Lyrics visibility toggle */}
                <button
                  id="music-lyrics-toggle"
                  type="button"
                  onClick={() => setShowLyrics(!showLyrics)}
                  title={showLyrics ? 'Hide Lyrics' : 'Show Lyrics'}
                  className={`p-2 rounded-xl border transition-all ${
                    showLyrics
                      ? 'border-pink-500/40 bg-pink-500/20 text-pink-300'
                      : 'border-neutral-800 bg-neutral-800/50 text-neutral-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Explicit Volume Controls: Decrease, Slider, Increase, Mute */}
            <div className="mt-4 pt-3.5 border-t border-neutral-800 flex items-center justify-between gap-3">
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
                className="w-7 h-7 rounded-lg border border-neutral-800 bg-neutral-800/60 hover:bg-neutral-800 disabled:opacity-40 flex items-center justify-center text-neutral-200 transition-all shrink-0 shadow-xs"
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
                className="w-7 h-7 rounded-lg border border-neutral-800 bg-neutral-800/60 hover:bg-neutral-800 disabled:opacity-40 flex items-center justify-center text-neutral-200 transition-all shrink-0 shadow-xs"
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
                  className="text-xs text-pink-400 hover:text-pink-300 font-semibold underline underline-offset-4 transition-colors"
                >
                  Tap to Play "Kashish" by Ashish Bhatia &amp; Omkar Singh
                </button>
              </div>
            )}
          </div>
        )}
      </aside>
    </>
  );
};
