import React, { useState } from 'react';
import { X, Copy, Check, QrCode, Share2, Globe, Server, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileName: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, profileName }) => {
  const [copied, setCopied] = useState(false);

  // Permanent production 24/7 Cloud Run URL
  const permanentProductionUrl = 'https://ais-pre-ay4em3pfm5z6pw63zy4d2l-511489277993.asia-east1.run.app';
  const currentBrowserUrl = typeof window !== 'undefined' ? window.location.href : permanentProductionUrl;

  // Use the permanent 24/7 URL if currently in dev container or preview
  const publicShareUrl = currentBrowserUrl.includes('ais-dev-') || currentBrowserUrl.includes('localhost')
    ? permanentProductionUrl
    : currentBrowserUrl;

  if (!isOpen) return null;

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profileName}'s Social Hub`,
          text: `Check out ${profileName}'s official social media platforms and creator portfolio (24/7 Live)!`,
          url: publicShareUrl,
        });
      } catch {
        // Ignored or cancelled
      }
    } else {
      handleCopy(publicShareUrl);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-neutral-900/95 border border-white/15 p-6 sm:p-7 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with 24/7 Online Status Badge */}
        <div className="text-center space-y-2 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold mb-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>24/7 Public Cloud Link</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold font-display">Share {profileName}'s Hub</h2>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            Give this permanent public link to users so they can access your website 24/7 without waiting.
          </p>
        </div>

        {/* Critical Explanation Notice: Why other users saw "Loading website" */}
        <div className="mb-4 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-left space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>Why users saw "Loading website" previously:</span>
          </div>
          <p className="text-[11px] text-amber-200/90 leading-relaxed">
            You shared the private <strong>Development URL (<code className="bg-black/30 px-1 py-0.5 rounded text-amber-300">ais-dev-...</code>)</strong> from your browser bar. Dev links sleep when your AI Studio tab is closed!
          </p>
          <p className="text-[11px] text-neutral-300 leading-relaxed pt-0.5">
            <strong>To fix this permanently:</strong> Click the <strong className="text-white">"Share"</strong> button at the top-right of AI Studio to publish. Then share the permanent public URL below!
          </p>
        </div>

        {/* Permanent 24/7 Live URL Section */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center justify-between text-xs px-1 text-neutral-400">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Globe className="w-3.5 h-3.5" />
              Permanent 24/7 Public URL
            </span>
            <span className="text-[11px] text-neutral-400">Google Cloud Run</span>
          </div>

          <div className="flex items-center gap-2 p-2 bg-black/60 border border-white/10 rounded-xl">
            <input
              type="text"
              readOnly
              value={publicShareUrl}
              className="flex-1 bg-transparent px-2 text-xs text-neutral-200 font-mono focus:outline-none truncate select-all"
            />
            <button
              type="button"
              id="copy-share-url-btn"
              onClick={() => handleCopy(publicShareUrl)}
              className="px-3 py-1.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors flex items-center gap-1 shrink-0 active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

        {/* QR Code */}
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-white rounded-2xl shadow-xl flex items-center justify-center">
            <svg
              className="w-32 h-32 sm:w-36 sm:h-36"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="100" height="100" fill="white" />
              {/* Corner 1 */}
              <rect x="10" y="10" width="26" height="26" rx="4" fill="#09090b" />
              <rect x="14" y="14" width="18" height="18" rx="2" fill="white" />
              <rect x="18" y="18" width="10" height="10" rx="1" fill="#09090b" />

              {/* Corner 2 */}
              <rect x="64" y="10" width="26" height="26" rx="4" fill="#09090b" />
              <rect x="68" y="14" width="18" height="18" rx="2" fill="white" />
              <rect x="72" y="18" width="10" height="10" rx="1" fill="#09090b" />

              {/* Corner 3 */}
              <rect x="10" y="64" width="26" height="26" rx="4" fill="#09090b" />
              <rect x="14" y="68" width="18" height="18" rx="2" fill="white" />
              <rect x="18" y="72" width="10" height="10" rx="1" fill="#09090b" />

              {/* Matrix Pattern */}
              <rect x="42" y="12" width="6" height="6" rx="1" fill="#09090b" />
              <rect x="52" y="18" width="6" height="6" rx="1" fill="#09090b" />
              <rect x="42" y="28" width="6" height="6" rx="1" fill="#09090b" />
              <rect x="20" y="42" width="6" height="6" rx="1" fill="#09090b" />
              <rect x="30" y="48" width="6" height="6" rx="1" fill="#09090b" />
              <rect x="44" y="44" width="12" height="12" rx="3" fill="#09090b" />
              <rect x="62" y="42" width="6" height="6" rx="1" fill="#09090b" />
              <rect x="74" y="48" width="6" height="6" rx="1" fill="#09090b" />
              <rect x="84" y="42" width="6" height="6" rx="1" fill="#09090b" />
              <rect x="42" y="64" width="6" height="6" rx="1" fill="#09090b" />
              <rect x="52" y="72" width="6" height="6" rx="1" fill="#09090b" />
              <rect x="64" y="64" width="8" height="8" rx="1" fill="#09090b" />
              <rect x="78" y="72" width="6" height="6" rx="1" fill="#09090b" />
              <rect x="68" y="82" width="6" height="6" rx="1" fill="#09090b" />
              <rect x="82" y="82" width="6" height="6" rx="1" fill="#09090b" />
            </svg>
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          type="button"
          onClick={handleNativeShare}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 active:scale-98"
        >
          <Share2 className="w-4 h-4 text-black" />
          <span>Copy & Share 24/7 Link</span>
        </button>
      </div>
    </div>
  );
};
