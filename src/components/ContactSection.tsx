import React, { useState } from 'react';
import { Mail, Copy, Check, Send } from 'lucide-react';

interface ContactSectionProps {
  email: string;
  onCopy: (text: string, label: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ email, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    onCopy(email, 'Email address');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="mt-8 rounded-2xl p-6 border border-slate-200/90 bg-white/85 hover:bg-white/95 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] relative overflow-hidden transition-all">
      <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 shadow-xs">
              <Mail className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Direct Inquiries & Collaborations
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            For sponsorships, creative projects, or media inquiries, drop a line directly.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <button
            type="button"
            onClick={handleCopyEmail}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-all flex items-center gap-1.5 shadow-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copied ? 'Copied Email' : 'Copy Email'}</span>
          </button>

          <a
            href={`mailto:${email}?subject=Collaboration%20Inquiry%20via%20Social%20Hub`}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm hover:shadow flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Email</span>
          </a>
        </div>
      </div>
    </section>
  );
};
