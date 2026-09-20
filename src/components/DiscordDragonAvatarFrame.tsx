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
      className={`absolute -inset-8 sm:-inset-10 pointer-events-none z-0 transition-all duration-700 ease-out select-none ${
        isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      } ${className}`}
    >
      <svg
        viewBox="0 0 280 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full filter transition-all duration-500 ${
          isOverdrive
            ? 'drop-shadow-[0_0_32px_rgba(255,87,34,1)] scale-105'
            : 'drop-shadow-[0_0_20px_rgba(255,69,0,0.85)]'
        }`}
      >
        <defs>
          {/* Molten Magma Dragon Wing Gradients */}
          <linearGradient id="realDragonWingMembrane" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF7A1" stopOpacity="0.95" />
            <stop offset="20%" stopColor="#FF9100" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#E53935" stopOpacity="0.85" />
            <stop offset="80%" stopColor="#7F0000" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2A0000" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="realDragonBoneGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF176" />
            <stop offset="30%" stopColor="#FFA726" />
            <stop offset="70%" stopColor="#D84315" />
            <stop offset="100%" stopColor="#3E1508" />
          </linearGradient>

          <linearGradient id="dragonVeinGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFE082" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FF7043" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#B71C1C" stopOpacity="0.2" />
          </linearGradient>

          <radialGradient id="avatarMagmaHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF8F00" stopOpacity="0.4" />
            <stop offset="45%" stopColor="#D84315" stopOpacity="0.25" />
            <stop offset="75%" stopColor="#BF360C" stopOpacity="0.1" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="ringObsidianMagma" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="30%" stopColor="#FF6D00" />
            <stop offset="70%" stopColor="#D50000" />
            <stop offset="100%" stopColor="#4A0E00" />
          </linearGradient>

          <filter id="dragonGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="softEmberGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Volcanic Heat Aura behind avatar center */}
        <circle cx="140" cy="110" r="85" fill="url(#avatarMagmaHalo)" />

        {/* 2. REALISTIC DRAGON WINGS (LEFT & RIGHT) */}
        {/* Left Wing Group with smooth breathing motion */}
        <g
          className="origin-[140px_110px] animate-[pulse_4s_ease-in-out_infinite]"
          style={{ transformOrigin: '140px 110px' }}
        >
          {/* Left Wing - Lower Webbing Membrane */}
          <path
            d="M 115 125 C 95 135 70 162 48 168 C 58 152 64 140 68 126 C 48 132 28 130 18 120 C 32 110 46 100 66 94 C 38 92 18 80 12 66 C 30 64 54 70 78 78 C 52 60 36 44 32 30 C 52 34 82 50 110 82 Z"
            fill="url(#realDragonWingMembrane)"
            opacity="0.88"
          />

          {/* Left Wing - Translucent Fiery Vein Overlays */}
          <path
            d="M 108 84 Q 72 62 36 34 M 106 88 Q 62 82 16 68 M 104 94 Q 68 108 22 122 M 106 104 Q 82 136 50 166"
            stroke="url(#dragonVeinGlow)"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.75"
          />

          {/* Left Wing - Main Arm / Bone Spar with Talon */}
          <path
            d="M 116 112 C 105 88 92 64 74 46 C 62 34 46 25 32 24 C 33 28 36 33 42 38 C 56 50 72 68 86 92 C 96 108 108 118 116 122 Z"
            fill="url(#realDragonBoneGrad)"
            filter="url(#dragonGlowFilter)"
          />

          {/* Left Wing Thumb Claw / Talon at apex */}
          <path
            d="M 32 24 C 27 19 22 17 18 18 C 22 22 26 27 33 30 Z"
            fill="#FFF59D"
            stroke="#FF6F00"
            strokeWidth="0.8"
          />

          {/* Secondary Finger Ribs */}
          <path
            d="M 76 48 C 55 60 34 70 14 68 C 16 71 20 74 26 74 C 44 74 62 66 78 52 Z"
            fill="url(#realDragonBoneGrad)"
            opacity="0.85"
          />
          <path
            d="M 86 70 C 64 88 44 104 20 122 C 23 124 28 125 34 123 C 52 110 68 96 88 74 Z"
            fill="url(#realDragonBoneGrad)"
            opacity="0.8"
          />
        </g>

        {/* Right Wing Group (Symmetrically mirrored with subtle organic offset) */}
        <g
          className="origin-[140px_110px] animate-[pulse_4s_ease-in-out_infinite]"
          style={{ transformOrigin: '140px 110px', animationDelay: '0.2s' }}
        >
          {/* Right Wing - Webbing Membrane */}
          <path
            d="M 165 125 C 185 135 210 162 232 168 C 222 152 216 140 212 126 C 232 132 252 130 262 120 C 248 110 234 100 214 94 C 242 92 262 80 268 66 C 250 64 226 70 202 78 C 228 60 244 44 248 30 C 228 34 198 50 170 82 Z"
            fill="url(#realDragonWingMembrane)"
            opacity="0.88"
          />

          {/* Right Wing - Vein Overlays */}
          <path
            d="M 172 84 Q 208 62 244 34 M 174 88 Q 218 82 264 68 M 176 94 Q 212 108 258 122 M 174 104 Q 198 136 230 166"
            stroke="url(#dragonVeinGlow)"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.75"
          />

          {/* Right Wing - Main Bone Spar with Talon */}
          <path
            d="M 164 112 C 175 88 188 64 206 46 C 218 34 234 25 248 24 C 247 28 244 33 238 38 C 224 50 208 68 194 92 C 184 108 172 118 164 122 Z"
            fill="url(#realDragonBoneGrad)"
            filter="url(#dragonGlowFilter)"
          />

          {/* Right Wing Thumb Claw / Talon at apex */}
          <path
            d="M 248 24 C 253 19 258 17 262 18 C 258 22 254 27 247 30 Z"
            fill="#FFF59D"
            stroke="#FF6F00"
            strokeWidth="0.8"
          />

          {/* Right Secondary Finger Ribs */}
          <path
            d="M 204 48 C 225 60 246 70 266 68 C 264 71 260 74 254 74 C 236 74 218 66 202 52 Z"
            fill="url(#realDragonBoneGrad)"
            opacity="0.85"
          />
          <path
            d="M 194 70 C 216 88 236 104 260 122 C 257 124 252 125 246 123 C 228 110 212 96 192 74 Z"
            fill="url(#realDragonBoneGrad)"
            opacity="0.8"
          />
        </g>

        {/* 3. Molten Magma Runic Ring Framing the Avatar */}
        <g>
          {/* Subtle Outer Energy Orbit */}
          <circle
            cx="140"
            cy="110"
            r="63"
            stroke="url(#ringObsidianMagma)"
            strokeWidth="2.5"
            strokeDasharray="18 8 6 8"
            className="origin-[140px_110px] animate-[spin_16s_linear_infinite]"
            opacity="0.85"
          />

          {/* Counter-rotating Inner Fiery Accents */}
          <circle
            cx="140"
            cy="110"
            r="60"
            stroke="#FF9100"
            strokeWidth="1.2"
            strokeDasharray="4 14"
            className="origin-[140px_110px] animate-[spin_10s_linear_infinite_reverse]"
            opacity="0.7"
          />
        </g>

        {/* 4. Realistic Floating Fire Embers & Dragon Ash */}
        <g filter="url(#softEmberGlow)">
          <circle cx="95" cy="45" r="2.2" fill="#FFF176" className="animate-pulse" style={{ animationDuration: '1.4s' }} />
          <circle cx="185" cy="42" r="2" fill="#FFD54F" className="animate-ping" style={{ animationDuration: '2.5s' }} />
          <circle cx="48" cy="85" r="1.8" fill="#FF7043" className="animate-pulse" style={{ animationDuration: '1.8s' }} />
          <circle cx="232" cy="88" r="2.4" fill="#FFAB00" className="animate-pulse" style={{ animationDuration: '2.1s' }} />
          <circle cx="70" cy="140" r="1.5" fill="#FF5722" />
          <circle cx="210" cy="142" r="1.7" fill="#FF8A65" />
          <circle cx="140" cy="38" r="2" fill="#FFF9C4" className="animate-pulse" style={{ animationDuration: '1.1s' }} />
        </g>
      </svg>
    </div>
  );
};
