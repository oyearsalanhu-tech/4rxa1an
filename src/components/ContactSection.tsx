import React, { useState } from 'react';
import { Mail, Copy, Check, Send } from 'lucide-react';
import { ThemeMode } from '../types';

interface ContactSectionProps {
  email: string;
  theme?: ThemeMode;
  onCopy: (text: string, label: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ email, theme = 'blue', onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    onCopy(email, 'Email address');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getThemeBoxClass = () => {
    switch (theme) {
      case 'green':
        return 'border-slate-800/90 hover:border-emerald-500/50 bg-[#091b14]/85 hover:bg-[#0b2219]/95 shadow-[0_4px_20px_-4px_rgba(6,78,59,0.25)]';
      case 'pink':
        return 'border-slate-800/90 hover:border-pink-500/50 bg-[#1c0d1c]/85 hover:bg-[#251125]/95 shadow-[0_4px_20px_-4px_rgba(131,24,67,0.25)]';
      case 'blue':
      default:
        return 'border-slate-800/90 hover:border-blue-500/50 bg-slate-900/85 hover:bg-slate-900/95 shadow-[0_4px_20px_-4px_rgba(30,58,138,0.25)]';
    }
  };

  const getSendBtnClass = () => {
    switch (theme) {
      case 'green':
        return 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/30 text-white';
      case 'pink':
        return 'bg-pink-600 hover:bg-pink-500 shadow-pink-500/30 text-white';
      case 'blue':
      default:
        return 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/30 text-white';
    }
  };

  return (
    <section className={`mt-8 rounded-2xl p-6 border backdrop-blur-md relative overflow-hidden transition-all ${getThemeBoxClass()}`}>
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 shadow-xs">
              <Mail className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-white tracking-tight">
              Direct Inquiries & Collaborations
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            For sponsorships, creative projects, or media inquiries, drop a line directly.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <button
            type="button"
            onClick={handleCopyEmail}
            className="px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center gap-1.5 shadow-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'Copied Email' : 'Copy Email'}</span>
          </button>

          <a
            href={`mailto:${email}?subject=Collaboration%20Inquiry%20via%20Social%20Hub`}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 active:scale-95 ${getSendBtnClass()}`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Email</span>
          </a>
        </div>
      </div>
    </section>
  );
};
