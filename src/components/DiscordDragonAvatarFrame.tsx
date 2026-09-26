import React from 'react';

interface DiscordDragonAvatarFrameProps {
  isActive?: boolean;
  className?: string;
  isOverdrive?: boolean;
}

export const DiscordDragonAvatarFrame: React.FC<DiscordDragonAvatarFrameProps> = ({
  isActive = true,
  className = '',
  isOverdrive = false,
}) => {
  return (
    <div
      aria-hidden="true"
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[290px] sm:w-[350px] md:w-[390px] h-[170px] sm:h-[200px] md:h-[220px] pointer-events-none select-none transition-all duration-700 ease-out ${
        isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      } ${className}`}
    >
      <style>{`
        @keyframes redWingLeftBreathe {
          0%, 100% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(-3.2deg) scale(1.03);
          }
        }
        @keyframes redWingRightBreathe {
          0%, 100% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(3.2deg) scale(1.03);
          }
        }
        @keyframes redEmberRise1 {
          0% { transform: translateY(0) translateX(0) scale(0.6); opacity: 0; }
          25% { opacity: 0.95; }
          75% { opacity: 0.6; }
          100% { transform: translateY(-26px) translateX(-8px) scale(0.2); opacity: 0; }
        }
        @keyframes redEmberRise2 {
          0% { transform: translateY(0) translateX(0) scale(0.7); opacity: 0; }
          30% { opacity: 1; }
          80% { opacity: 0.5; }
          100% { transform: translateY(-30px) translateX(9px) scale(0.25); opacity: 0; }
        }
        @keyframes redEmberRise3 {
          0% { transform: translateY(0) translateX(0) scale(0.5); opacity: 0; }
          35% { opacity: 0.9; }
          75% { opacity: 0.55; }
          100% { transform: translateY(-22px) translateX(-5px) scale(0.15); opacity: 0; }
        }
        @keyframes redAuraPulseSlow {
          0%, 100% {
            opacity: 0.65;
            transform: scale(0.99);
          }
          50% {
            opacity: 0.95;
            transform: scale(1.02);
          }
        }
      `}</style>

      {/* Layer 1: 4K Photorealistic Red Wings Texture Backdrop (Z-0, behind avatar) */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-700 pointer-events-none z-0 ${
          isOverdrive ? 'scale-108 brightness-125' : 'scale-100 brightness-100 group-hover:scale-104 group-hover:brightness-110'
        }`}
      >
        <img
          src="/red_wings_transparent.png"
          alt=""
          aria-hidden="true"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
          className={`w-full h-full object-contain filter drop-shadow-[0_0_22px_rgba(255,0,51,0.85)] drop-shadow-[0_0_50px_rgba(220,20,60,0.5)] transition-transform duration-500 ${
            isOverdrive ? 'animate-pulse' : ''
          }`}
          style={{
            animation: isOverdrive
              ? 'redAuraPulseSlow 1.5s ease-in-out infinite'
              : 'redAuraPulseSlow 3.8s ease-in-out infinite',
          }}
        />
      </div>

      {/* Layer 2: 4K High-Precision Animated SVG Vector Overlay (Crisp on all Retina/4K displays) */}
      <svg
        viewBox="0 0 400 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`absolute inset-0 w-full h-full filter transition-all duration-500 z-10 ${
          isOverdrive
            ? 'drop-shadow-[0_0_28px_rgba(255,0,51,1)] scale-105'
            : 'drop-shadow-[0_0_16px_rgba(255,0,51,0.85)] group-hover:drop-shadow-[0_0_24px_rgba(255,0,51,0.95)]'
        }`}
      >
        <defs>
          {/* Crimson Red Core Linear Gradient */}
          <linearGradient id="crimsonWingGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4A000A" />
            <stop offset="25%" stopColor="#8A0012" />
            <stop offset="55%" stopColor="#D90429" />
            <stop offset="85%" stopColor="#EF233C" />
            <stop offset="100%" stopColor="#FF4D6D" />
          </linearGradient>

          {/* Symmetrical Right Gradient */}
          <linearGradient id="crimsonWingGradientRight" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#4A000A" />
            <stop offset="25%" stopColor="#8A0012" />
            <stop offset="55%" stopColor="#D90429" />
            <stop offset="85%" stopColor="#EF233C" />
            <stop offset="100%" stopColor="#FF4D6D" />
          </linearGradient>

          {/* Glowing Red Feather Rim Gradient */}
          <linearGradient id="redFeatherGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B8B" />
            <stop offset="40%" stopColor="#FF003F" />
            <stop offset="100%" stopColor="#800010" />
          </linearGradient>

          {/* Fiery Bone Arm Gradient */}
          <linearGradient id="redBoneGradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#250005" />
            <stop offset="50%" stopColor="#B3001B" />
            <stop offset="100%" stopColor="#FF3355" />
          </linearGradient>

          {/* Circular Magma Red Energy Ring */}
          <linearGradient id="magmaRedRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B8B" />
            <stop offset="30%" stopColor="#FF003F" />
            <stop offset="70%" stopColor="#C9001E" />
            <stop offset="100%" stopColor="#4A0008" />
          </linearGradient>

          {/* Ruby Core Radial Gradients */}
          <radialGradient id="rubyBallCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FF85A1" />
            <stop offset="60%" stopColor="#FF003F" />
            <stop offset="85%" stopColor="#800010" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          <radialGradient id="rubyBallHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF003F" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#B3001B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4A0008" stopOpacity="0" />
          </radialGradient>

          {/* Red Glow Filter */}
          <filter id="crimsonFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Left Majestic Crimson Wing (Animated with gentle breathing float) */}
        <g
          style={{
            transformOrigin: '175px 110px',
            animation: isOverdrive
              ? 'redWingLeftBreathe 1.8s ease-in-out infinite'
              : 'redWingLeftBreathe 3.6s ease-in-out infinite',
          }}
        >
          {/* Outer primary feather 1 (highest arch) */}
          <path
            d="M 172 90 C 130 50 85 24 35 34 C 42 48 58 56 75 58 C 110 62 145 80 170 94 Z"
            fill="url(#crimsonWingGradient)"
            opacity="0.95"
          />
          {/* Feather 1 highlight spine */}
          <path
            d="M 170 91 C 128 54 86 36 38 36"
            stroke="#FF6B8B"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Primary feather 2 */}
          <path
            d="M 168 96 C 120 68 70 54 24 68 C 36 80 54 84 76 82 C 108 80 140 92 165 104 Z"
            fill="url(#crimsonWingGradient)"
            opacity="0.9"
          />
          <path
            d="M 166 98 C 120 74 72 65 28 70"
            stroke="#FF3355"
            strokeWidth="1.4"
            strokeLinecap="round"
          />

          {/* Primary feather 3 */}
          <path
            d="M 165 105 C 115 88 64 85 22 106 C 36 116 56 115 78 108 C 106 100 136 108 160 118 Z"
            fill="url(#crimsonWingGradient)"
            opacity="0.88"
          />
          <path
            d="M 162 108 C 116 95 68 97 26 108"
            stroke="#FF003F"
            strokeWidth="1.3"
            strokeLinecap="round"
          />

          {/* Secondary feather 4 (lower sweep) */}
          <path
            d="M 164 116 C 118 108 72 118 36 142 C 52 146 72 138 92 128 C 118 116 142 120 162 128 Z"
            fill="url(#crimsonWingGradient)"
            opacity="0.85"
          />

          {/* Secondary feather 5 */}
          <path
            d="M 166 126 C 126 126 90 142 62 168 C 76 166 94 154 112 142 C 132 130 152 132 166 138 Z"
            fill="url(#crimsonWingGradient)"
            opacity="0.8"
          />

          {/* Main wing bone / arm with glowing crimson rib */}
          <path
            d="M 175 92 C 140 64 100 48 50 44 C 44 43 45 48 52 50 C 96 58 135 76 172 98 Z"
            fill="url(#redBoneGradient)"
            filter="url(#crimsonFilter)"
          />
          <path
            d="M 175 92 C 140 64 100 48 50 44"
            stroke="#FFA0B4"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Inner ruby translucent wing energy web */}
          <path
            d="M 170 94 C 135 80 100 86 65 106 C 90 112 125 108 160 118 Z"
            fill="url(#redFeatherGlow)"
            opacity="0.45"
          />
        </g>

        {/* 2. Right Majestic Crimson Wing (Symmetrical animated with gentle breathing float) */}
        <g
          style={{
            transformOrigin: '225px 110px',
            animation: isOverdrive
              ? 'redWingRightBreathe 1.8s ease-in-out infinite'
              : 'redWingRightBreathe 3.6s ease-in-out infinite',
          }}
        >
          {/* Outer primary feather 1 (highest arch) */}
          <path
            d="M 228 90 C 270 50 315 24 365 34 C 358 48 342 56 325 58 C 290 62 255 80 230 94 Z"
            fill="url(#crimsonWingGradientRight)"
            opacity="0.95"
          />
          {/* Feather 1 highlight spine */}
          <path
            d="M 230 91 C 272 54 314 36 362 36"
            stroke="#FF6B8B"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Primary feather 2 */}
          <path
            d="M 232 96 C 280 68 330 54 376 68 C 364 80 346 84 324 82 C 292 80 260 92 235 104 Z"
            fill="url(#crimsonWingGradientRight)"
            opacity="0.9"
          />
          <path
            d="M 234 98 C 280 74 328 65 372 70"
            stroke="#FF3355"
            strokeWidth="1.4"
            strokeLinecap="round"
          />

          {/* Primary feather 3 */}
          <path
            d="M 235 105 C 285 88 336 85 378 106 C 364 116 344 115 322 108 C 294 100 264 108 240 118 Z"
            fill="url(#crimsonWingGradientRight)"
            opacity="0.88"
          />
          <path
            d="M 238 108 C 284 95 332 97 374 108"
            stroke="#FF003F"
            strokeWidth="1.3"
            strokeLinecap="round"
          />

          {/* Secondary feather 4 (lower sweep) */}
          <path
            d="M 236 116 C 282 108 328 118 364 142 C 348 146 328 138 308 128 C 282 116 258 120 238 128 Z"
            fill="url(#crimsonWingGradientRight)"
            opacity="0.85"
          />

          {/* Secondary feather 5 */}
          <path
            d="M 234 126 C 274 126 310 142 338 168 C 324 166 306 154 288 142 C 268 130 248 132 234 138 Z"
            fill="url(#crimsonWingGradientRight)"
            opacity="0.8"
          />

          {/* Main wing bone / arm with glowing crimson rib */}
          <path
            d="M 225 92 C 260 64 300 48 350 44 C 356 43 355 48 348 50 C 304 58 265 76 228 98 Z"
            fill="url(#redBoneGradient)"
            filter="url(#crimsonFilter)"
          />
          <path
            d="M 225 92 C 260 64 300 48 350 44"
            stroke="#FFA0B4"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Inner ruby translucent wing energy web */}
          <path
            d="M 230 94 C 265 80 300 86 335 106 C 310 112 275 108 240 118 Z"
            fill="url(#redFeatherGlow)"
            opacity="0.45"
          />
        </g>

        {/* 3. Circular Crimson Magma Energy Orbit (Encircles profile avatar) */}
        <g>
          {/* Subtle Ambient Red Glow Ring */}
          <circle
            cx="200"
            cy="110"
            r="60"
            stroke="#FF003F"
            strokeWidth="1.2"
            opacity="0.4"
            style={{
              animation: 'redAuraPulseSlow 2.5s ease-in-out infinite',
            }}
          />

          {/* Segmented Magma Energy Ring */}
          <circle
            cx="200"
            cy="110"
            r="56"
            stroke="url(#magmaRedRing)"
            strokeWidth="2.8"
            strokeDasharray="16 5 6 5"
            className="origin-[200px_110px] animate-[spin_12s_linear_infinite]"
            opacity="0.9"
          />

          {/* Reverse Orbit Accent Ring */}
          <circle
            cx="200"
            cy="110"
            r="58.5"
            stroke="#FF2A55"
            strokeWidth="1.2"
            strokeDasharray="2 10"
            className="origin-[200px_110px] animate-[spin_18s_linear_infinite_reverse]"
            opacity="0.75"
          />
        </g>

        {/* 4. Glowing Red Embers Drifting Slowly Upward from Wings */}
        <g>
          {/* Left Wing Embers */}
          <circle
            cx="80"
            cy="70"
            r="2.2"
            fill="#FF85A1"
            style={{ animation: 'redEmberRise1 2.4s ease-out infinite' }}
          />
          <circle
            cx="120"
            cy="85"
            r="1.8"
            fill="#FF003F"
            style={{ animation: 'redEmberRise2 3.1s ease-out infinite 0.6s' }}
          />
          <circle
            cx="50"
            cy="55"
            r="1.5"
            fill="#FFA0B4"
            style={{ animation: 'redEmberRise3 2.8s ease-out infinite 1.2s' }}
          />
          <circle
            cx="145"
            cy="115"
            r="2"
            fill="#FF2A55"
            style={{ animation: 'redEmberRise1 2.2s ease-out infinite 1.7s' }}
          />

          {/* Right Wing Embers */}
          <circle
            cx="320"
            cy="70"
            r="2.2"
            fill="#FF85A1"
            style={{ animation: 'redEmberRise2 2.6s ease-out infinite 0.3s' }}
          />
          <circle
            cx="280"
            cy="85"
            r="1.8"
            fill="#FF003F"
            style={{ animation: 'redEmberRise1 3.3s ease-out infinite 0.9s' }}
          />
          <circle
            cx="350"
            cy="55"
            r="1.5"
            fill="#FFA0B4"
            style={{ animation: 'redEmberRise3 2.5s ease-out infinite 1.5s' }}
          />
          <circle
            cx="255"
            cy="115"
            r="2"
            fill="#FF2A55"
            style={{ animation: 'redEmberRise2 2.1s ease-out infinite 1.9s' }}
          />
        </g>

        {/* 5. Incandescent Ruby Fireball Core / Dragon Focus Orb (Bottom Left of Avatar) */}
        <g transform="translate(154, 150)">
          {/* Ambient Outer Red Halo */}
          <circle cx="0" cy="0" r="18" fill="url(#rubyBallHalo)" />

          {/* Whirling Flame Wisps */}
          <g className="origin-center animate-[spin_3.5s_linear_infinite]">
            <path
              d="M 0 -12 C 5 -10 9 -3 8 2 C 7 7 2 11 -3 9 C -8 7 -11 0 -8 -5 C -5 -9 -2 -11 0 -12 Z"
              fill="#FF003F"
              opacity="0.85"
            />
            <path
              d="M 0 -8 C 3 -6 6 -1 5 2 C 4 5 1 7 -2 6 C -5 5 -7 0 -5 -3 C -3 -5 -1 -7 0 -8 Z"
              fill="#FF6B8B"
              opacity="0.9"
            />
          </g>

          {/* Glowing Incandescent Ruby Core */}
          <circle cx="0" cy="0" r="9.5" fill="url(#rubyBallCore)" filter="url(#crimsonFilter)" />
          <circle cx="-1.5" cy="-1.5" r="3.2" fill="#FFFFFF" opacity="0.95" />

          {/* Dragon Claw Holding the Orb */}
          <path
            d="M -12 5 C -9 0 -3 -8 4 -10 C 2 -6 -2 -3 -5 0 C -8 3 -10 6 -12 5 Z"
            fill="#3B0007"
            stroke="#FF3355"
            strokeWidth="0.8"
          />
          <path
            d="M -8 11 C -5 7 2 4 10 1 C 6 4 2 7 -1 9 C -3 11 -6 12 -8 11 Z"
            fill="#3B0007"
            stroke="#FF3355"
            strokeWidth="0.8"
          />
        </g>
      </svg>
    </div>
  );
};
