import React, { useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  X,
  FileCode,
  FolderTree,
  Terminal,
  Cloud,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { ASTRO_PROJECT_FILES, AstroFile } from '../data/astroProjectCode';

interface AstroProjectViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AstroProjectViewer: React.FC<AstroProjectViewerProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedFile, setSelectedFile] = useState<AstroFile>(ASTRO_PROJECT_FILES[0]);
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (code: string, filename: string) => {
    navigator.clipboard.writeText(code);
    setCopiedFile(filename);
    setTimeout(() => setCopiedFile(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-4 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg text-slate-800">
                  Kerangka Proyek Astro.js (Cloudflare Workers SSR)
                </h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Astro + Gemini
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Struktur file, komponen form, index, dan endpoint API SSR untuk TutorTulis MusafirONE
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cloudflare Deploy Quick Guide Banner */}
        <div className="bg-indigo-50/60 border-b border-indigo-100 px-6 py-2.5 text-xs flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-indigo-950">
            <Cloud className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>
              Target Platform: <strong className="text-indigo-900">Cloudflare Pages / Workers SSR</strong> dengan adapter <code className="text-indigo-700 bg-white px-1 py-0.5 rounded border border-indigo-200 font-mono">@astrojs/cloudflare</code>.
            </span>
          </div>
          <div className="text-[11px] text-slate-600 flex items-center gap-2">
            <span>Perintah:</span>
            <code className="bg-white px-2 py-0.5 rounded border border-indigo-200 text-indigo-800 font-mono font-semibold">
              npm create astro@latest
            </code>
          </div>
        </div>

        {/* Body Layout: Sidebar Files + Code Editor */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden min-h-[450px]">
          {/* File Explorer (Left) */}
          <div className="md:col-span-4 border-r border-slate-200 bg-slate-50 p-4 space-y-2 overflow-y-auto max-h-[60vh] md:max-h-none">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-2 flex items-center gap-1.5 mb-2">
              <FolderTree className="w-3.5 h-3.5" />
              <span>Daftar Berkas Proyek</span>
            </div>

            <div className="space-y-1">
              {ASTRO_PROJECT_FILES.map((file) => {
                const isSelected = selectedFile.path === file.path;
                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition flex items-center justify-between gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileCode
                        className={`w-4 h-4 shrink-0 ${
                          isSelected ? 'text-white' : 'text-slate-400'
                        }`}
                      />
                      <span className="truncate">{file.filename}</span>
                    </div>
                    <span className={`text-[10px] font-mono shrink-0 ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                      {file.language}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Steps & CLI Instructions */}
            <div className="mt-6 pt-4 border-t border-slate-200 space-y-2 text-[11px] text-slate-600">
              <div className="font-bold text-slate-700 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-indigo-600" />
                <span>Langkah Instalasi Astro:</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-slate-600 font-mono text-[10px]">
                <li>npm i @astrojs/cloudflare @google/genai</li>
                <li>npx astro add tailwind</li>
                <li>npx wrangler secret put GEMINI_API_KEY</li>
                <li>npm run build && wrangler deploy</li>
              </ol>
            </div>
          </div>

          {/* Code Viewer (Right) */}
          <div className="md:col-span-8 flex flex-col bg-slate-900 overflow-hidden">
            {/* Top file info & copy */}
            <div className="px-5 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-indigo-400 font-semibold">
                  {selectedFile.path}
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-1">
                  {selectedFile.description}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(selectedFile.code, selectedFile.filename)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition cursor-pointer shrink-0"
              >
                {copiedFile === selectedFile.filename ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Kode</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Content */}
            <div className="flex-1 p-5 overflow-auto max-h-[50vh] md:max-h-[520px]">
              <pre className="font-mono text-xs sm:text-sm text-slate-200 leading-relaxed">
                <code>{selectedFile.code}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 flex-wrap gap-2">
          <span>
            Kode di atas siap disalin untuk deployment produksi Cloudflare Workers SSR.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition cursor-pointer"
          >
            Tutup Jendela
          </button>
        </div>
      </div>
    </div>
  );
};
