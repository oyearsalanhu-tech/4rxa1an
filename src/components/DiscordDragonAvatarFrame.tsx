import React from 'react';

interface DiscordDragonAvatarFrameProps {
  isActive?: boolean;
  className?: string;
}

export const DiscordDragonAvatarFrame: React.FC<DiscordDragonAvatarFrameProps> = ({
  isActive = true,
  className = '',
}) => {
  return (
    <div
      aria-hidden="true"
      className={`absolute -inset-4 sm:-inset-5 pointer-events-none z-20 transition-all duration-700 ease-out select-none ${
        isActive
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-90'
      } ${className}`}
    >
      <svg
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_0_14px_rgba(255,87,34,0.9)]"
      >
        <defs>
          {/* Fiery Ring Linear & Radial Gradients */}
          <linearGradient id="dragonGoldFire" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF275" />
            <stop offset="25%" stopColor="#FF8C00" />
            <stop offset="60%" stopColor="#FF3D00" />
            <stop offset="100%" stopColor="#990000" />
          </linearGradient>

          <linearGradient id="dragonWingGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7A0000" />
            <stop offset="40%" stopColor="#D82600" />
            <stop offset="75%" stopColor="#FF6200" />
            <stop offset="100%" stopColor="#FFC837" />
          </linearGradient>

          <radialGradient id="fireBallCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="20%" stopColor="#FFF385" />
            <stop offset="55%" stopColor="#FF5722" />
            <stop offset="85%" stopColor="#D50000" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          <radialGradient id="fireBallGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF9800" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#FF3D00" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D50000" stopOpacity="0" />
          </radialGradient>

          <filter id="fireGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Outer Dragon Wings Hugging the Profile (Left & Right Symmetric) */}
        <g className="animate-pulse" style={{ animationDuration: '2.5s' }}>
          {/* Left Dragon Wing Crest */}
          <path
            d="M 45 42 C 28 28 14 42 10 58 C 8 66 12 70 17 65 C 22 60 27 50 40 52 C 28 62 25 76 30 84 C 34 90 38 88 39 80 C 42 68 50 58 60 52 Z"
            fill="url(#dragonWingGradient)"
            opacity="0.95"
          />
          {/* Left Wing Bone Ribs */}
          <path
            d="M 44 43 C 24 30 15 48 12 59"
            stroke="#FFD54F"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Right Dragon Wing Crest */}
          <path
            d="M 135 42 C 152 28 166 42 170 58 C 172 66 168 70 163 65 C 158 60 153 50 140 52 C 152 62 155 76 150 84 C 146 90 142 88 141 80 C 138 68 130 58 120 52 Z"
            fill="url(#dragonWingGradient)"
            opacity="0.95"
          />
          {/* Right Wing Bone Ribs */}
          <path
            d="M 136 43 C 156 30 165 48 168 59"
            stroke="#FFD54F"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>

        {/* 2. Top Dragon Horns & Royal Crest */}
        <g>
          {/* Left Horn */}
          <path
            d="M 72 26 C 68 14 62 8 52 4 C 54 12 60 20 68 28 Z"
            fill="url(#dragonGoldFire)"
          />
          {/* Right Horn */}
          <path
            d="M 108 26 C 112 14 118 8 128 4 C 126 12 120 20 112 28 Z"
            fill="url(#dragonGoldFire)"
          />
          {/* Center Crown Spike */}
          <path
            d="M 90 16 L 95 25 L 85 25 Z"
            fill="#FFF176"
            filter="url(#fireGlowFilter)"
          />
        </g>

        {/* 3. Circular Magma Energy Ring Encircling the Avatar */}
        <circle
          cx="90"
          cy="90"
          r="66"
          stroke="url(#dragonGoldFire)"
          strokeWidth="3.5"
          strokeDasharray="14 4 6 4"
          className="origin-center animate-[spin_8s_linear_infinite]"
          opacity="0.9"
        />
        <circle
          cx="90"
          cy="90"
          r="68.5"
          stroke="#FF5722"
          strokeWidth="1.5"
          strokeDasharray="2 8"
          className="origin-center animate-[spin_12s_linear_infinite_reverse]"
          opacity="0.75"
        />

        {/* 4. Professional Fiery Fireball Orb / Dragon Core (Positioned at bottom-left corner of the avatar ring) */}
        <g transform="translate(32, 134)">
          {/* Ambient Outer Halo */}
          <circle cx="0" cy="0" r="22" fill="url(#fireBallGlow)" />

          {/* Whirling Flame Wisps around the Fireball */}
          <g className="origin-center animate-[spin_3s_linear_infinite]">
            <path
              d="M 0 -14 C 6 -12 10 -4 9 2 C 8 8 2 13 -4 11 C -10 9 -13 0 -9 -6 C -6 -11 -2 -13 0 -14 Z"
              fill="#FF3D00"
              opacity="0.8"
            />
            <path
              d="M 0 -10 C 4 -8 7 -2 6 2 C 5 6 1 9 -3 8 C -7 7 -9 0 -6 -4 C -4 -7 -1 -9 0 -10 Z"
              fill="#FF9100"
              opacity="0.9"
            />
          </g>

          {/* Glowing Incandescent Core */}
          <circle cx="0" cy="0" r="11" fill="url(#fireBallCore)" filter="url(#fireGlowFilter)" />
          <circle cx="-2" cy="-2" r="4" fill="#FFFFFF" opacity="0.9" />

          {/* Dragon Claw holding the Fireball */}
          <path
            d="M -14 6 C -11 0 -4 -10 4 -12 C 2 -8 -2 -4 -6 0 C -9 4 -12 7 -14 6 Z"
            fill="#5C0000"
            stroke="#FFAB00"
            strokeWidth="0.8"
          />
          <path
            d="M -10 14 C -6 9 3 5 12 1 C 8 5 3 9 -1 12 C -4 14 -8 15 -10 14 Z"
            fill="#5C0000"
            stroke="#FFAB00"
            strokeWidth="0.8"
          />
        </g>

        {/* Tiny Floating Fire Embers around the ring */}
        <circle cx="140" cy="120" r="2" fill="#FFEB3B" className="animate-ping" style={{ animationDuration: '1.8s' }} />
        <circle cx="125" cy="142" r="1.5" fill="#FF7043" className="animate-pulse" style={{ animationDuration: '1.2s' }} />
        <circle cx="38" cy="75" r="1.8" fill="#FFC107" className="animate-ping" style={{ animationDuration: '2.2s' }} />
        <circle cx="82" cy="22" r="1.2" fill="#FFE082" />
        <circle cx="98" cy="22" r="1.2" fill="#FFE082" />
      </svg>
    </div>
  );
};
