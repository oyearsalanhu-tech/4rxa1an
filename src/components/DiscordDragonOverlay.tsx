import React, { useEffect, useState, useRef } from 'react';
import nitroDragonImg from '../assets/images/nitro_dragon_effect_1789880430051.jpg';

interface DiscordDragonOverlayProps {
  isActive: boolean;
  onComplete: () => void;
}

export const DiscordDragonOverlay: React.FC<DiscordDragonOverlayProps> = ({
  isActive,
  onComplete,
}) => {
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play subtle cinematic dragon whoosh using Web Audio API
  const playDragonSound = () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // 1. Deep rumble oscillator
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(55, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.4);
      osc.frequency.exponentialRampToValueAtTime(45, now + 1.6);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, now);
      filter.frequency.exponentialRampToValueAtTime(650, now + 0.4);
      filter.frequency.exponentialRampToValueAtTime(90, now + 1.6);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.10, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.8);

      // 2. Fiery noise whoosh
      const bufferSize = ctx.sampleRate * 1.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.45));
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(500, now);
      noiseFilter.Q.setValueAtTime(2.2, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.07, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noiseSource.start(now);
      noiseSource.stop(now + 1.5);
    } catch {
      // Audio playback fails gracefully if browser restricts autoplay
    }
  };

  // 5-second countdown with smooth fadeout at the end
  useEffect(() => {
    if (!isActive) return;

    setIsFadingOut(false);

    // Audio cue
    const soundTimeout = setTimeout(() => {
      playDragonSound();
    }, 200);

    // Begin fadeout at 4.2 seconds
    const fadeoutTimeout = setTimeout(() => {
      setIsFadingOut(true);
    }, 4200);

    // Vanish and complete at exactly 5 seconds
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearTimeout(soundTimeout);
      clearTimeout(fadeoutTimeout);
      clearTimeout(completeTimeout);
    };
  }, [isActive]);

  // Floating flame particles on canvas
  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      alpha: number;
      color: string;
      life: number;
      maxLife: number;
    }

    const particles: Particle[] = [];
    const colors = ['#ff003f', '#ef233c', '#d90429', '#ff4d6d', '#ff758f', '#b3001b'];

    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.8 + 0.8,
        speedX: (Math.random() - 0.5) * 1.2,
        speedY: -(Math.random() * 2.0 + 0.8),
        alpha: Math.random() * 0.8 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: Math.random() * 100,
        maxLife: Math.random() * 100 + 60,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life++;

        if (p.y < 0 || p.life >= p.maxLife || p.x < 0 || p.x > width) {
          p.x = Math.random() * width;
          p.y = height + Math.random() * 10;
          p.life = 0;
          p.speedY = -(Math.random() * 2.2 + 0.8);
          p.alpha = Math.random() * 0.8 + 0.2;
        }

        const currentAlpha = p.alpha * (1 - p.life / p.maxLife);
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, currentAlpha);
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <aside
      id="discord-dragon-overlay"
      aria-label="Discord Nitro Dragon Overlay Effect"
      className={`fixed inset-0 z-40 pointer-events-none transition-opacity duration-800 ease-in-out select-none ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* 1. Canvas with rising fire sparks & embers over the entire viewport */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
      />

      {/* 2. Atmospheric volcanic dark vignette and glowing crimson gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/45 via-rose-950/20 to-transparent pointer-events-none z-10" />

      {/* 3. The Grand Discord Nitro Dragon Figure rising at the top hero section */}
      <div className="absolute top-0 inset-x-0 flex justify-center pointer-events-none z-10 overflow-hidden h-[360px] sm:h-[450px]">
        <div className="relative w-full max-w-4xl h-full flex items-start justify-center animate-in fade-in zoom-in-95 duration-1000 pointer-events-none">
          <img
            src={nitroDragonImg}
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
            className="w-full h-full object-cover object-top opacity-85 filter drop-shadow-[0_0_40px_rgba(255,0,63,0.85)] mix-blend-screen pointer-events-none"
            style={{
              maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
            }}
          />

          {/* Shockwave radial glow pulsing behind the dragon */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-red-600/30 filter blur-3xl animate-pulse pointer-events-none" />
        </div>
      </div>
    </aside>
  );
};
