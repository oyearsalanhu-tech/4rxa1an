import React, { useState, useEffect } from 'react';
import { Eye, Users, TrendingUp } from 'lucide-react';

interface VisitorBadgeProps {
  theme?: 'blue' | 'green' | 'pink';
}

export const VisitorBadge: React.FC<VisitorBadgeProps> = ({ theme = 'blue' }) => {
  // Target plausible realistic pool values as requested (e.g. 256, 277, etc. and always over 200)
  const [visitorCount, setVisitorCount] = useState<number>(() => {
    const saved = localStorage.getItem('social_hub_visitor_count');
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed >= 200) {
        return parsed;
      }
    }
    // Initial starting value around 256 or 277
    const initialPool = [256, 277, 264, 283, 291, 248];
    return initialPool[Math.floor(Math.random() * initialPool.length)];
  });

  const [activeNow, setActiveNow] = useState<number>(() => Math.floor(Math.random() * 5) + 3); // 3 to 7 active now
  const [isPulsing, setIsPulsing] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('social_hub_visitor_count', visitorCount.toString());
  }, [visitorCount]);

  useEffect(() => {
    // Curated realistic numbers over 200, featuring the user's specific targets (256, 277, etc.)
    const realisticAnchors = [256, 277, 268, 284, 259, 271, 293, 262, 279, 288];

    // Every few moments (between 4.5s and 8.5s), update the count smoothly
    let timerId: ReturnType<typeof setTimeout>;

    const scheduleNextUpdate = () => {
      const delay = Math.floor(Math.random() * 4000) + 4500; // 4.5s to 8.5s interval
      timerId = setTimeout(() => {
        setVisitorCount((prev) => {
          setIsPulsing(true);
          setTimeout(() => setIsPulsing(false), 800);

          // 30% chance to jump towards a specific notable milestone like 256 or 277
          if (Math.random() < 0.3) {
            const nextAnchor = realisticAnchors[Math.floor(Math.random() * realisticAnchors.length)];
            return nextAnchor;
          }

          // Otherwise increment or subtle drift within the healthy >200 range
          const change = Math.random() > 0.35 ? 1 : -1;
          const next = prev + change;
          // Ensure it stays strictly over 200 at all times
          return next < 210 ? 256 : next;
        });

        // Also occasionally fluctuate current online active viewers (e.g. 3-8)
        if (Math.random() > 0.5) {
          setActiveNow(Math.floor(Math.random() * 6) + 3);
        }

        scheduleNextUpdate();
      }, delay);
    };

    scheduleNextUpdate();

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  const getBadgeClass = () => {
    switch (theme) {
      case 'green':
        return 'bg-[#091b14]/90 border-emerald-500/30 text-slate-200 shadow-emerald-500/10';
      case 'pink':
        return 'bg-[#1c0d1c]/90 border-pink-500/30 text-slate-200 shadow-pink-500/10';
      case 'blue':
      default:
        return 'bg-slate-900/90 border-blue-500/30 text-slate-200 shadow-blue-500/10';
    }
  };

  const getActiveColor = () => {
    switch (theme) {
      case 'green':
        return 'text-emerald-400';
      case 'pink':
        return 'text-pink-400';
      case 'blue':
      default:
        return 'text-blue-400';
    }
  };

  return (
    <div
      id="visitor-count-badge"
      className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full backdrop-blur-md border shadow-xs text-xs transition-all duration-300 hover:shadow-sm select-none ${getBadgeClass()}`}
      title="Live social activity & verified profile visitors"
    >
      {/* Live Indicator Dot */}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>

      {/* Primary Visitor Count */}
      <div className="flex items-center gap-1.5 font-medium text-slate-200">
        <Eye className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-[11px] text-slate-400">Visitors:</span>
        <span
          className={`font-semibold tracking-tight transition-transform duration-300 inline-block tabular-nums ${
            isPulsing ? `scale-110 ${getActiveColor()} font-bold` : 'scale-100 text-white'
          }`}
        >
          {visitorCount.toLocaleString()}
        </span>
      </div>

      <span className="text-slate-700">|</span>

      {/* Real-time active viewers badge */}
      <div className="flex items-center gap-1 text-[11px] text-slate-400">
        <Users className="w-3 h-3 text-slate-400" />
        <span><strong className={`${getActiveColor()} font-semibold`}>{activeNow}</strong> live</span>
      </div>
    </div>
  );
};
