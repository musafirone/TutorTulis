import React from 'react';
import { Code, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenAstroCode: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAstroCode }) => {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-500 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand & info */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span className="font-bold text-slate-800 text-sm tracking-tight">
              TutorTulis MusafirONE
            </span>
            <span className="text-xs text-slate-300 hidden sm:inline">•</span>
            <span className="text-xs text-slate-500">
              Platform Bimbingan & Evaluasi Bahasa Esai Siswa
            </span>
          </div>

          {/* Mandatory text: Developer by @wargaminiofficial */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 shadow-sm">
              <span className="text-slate-500 font-medium">Developer by</span>
              <a
                href="https://instagram.com/wargaminiofficial"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition flex items-center gap-1"
              >
                @wargaminiofficial
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Subfooter */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>
            Powered by Astro & Google Gemini API • Dirancang untuk Guru Bahasa, Dosen, dan Siswa Indonesia.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAstroCode}
              className="hover:text-indigo-600 transition cursor-pointer flex items-center gap-1 font-medium"
            >
              <Code className="w-3.5 h-3.5" />
              Arsitektur Astro.js (Cloudflare SSR)
            </button>
            <span>•</span>
            <span>Skor & Evaluasi Objektif (1-100)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
