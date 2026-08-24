import React, { useState } from 'react';
import { Sparkles, Code2, CheckCircle2, User, ExternalLink, Image as ImageIcon } from 'lucide-react';

interface HeaderProps {
  onOpenAstroCode: () => void;
  profilePhotoUrl: string;
  onUpdateProfilePhoto: (newUrl: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAstroCode,
  profilePhotoUrl,
  onUpdateProfilePhoto,
}) => {
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [tempUrl, setTempUrl] = useState(profilePhotoUrl);

  const handleSavePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempUrl.trim()) {
      onUpdateProfilePhoto(tempUrl.trim());
      setIsEditingPhoto(false);
    }
  };

  return (
    <header className="h-16 sm:h-20 bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
        {/* Logo & Brand Info */}
        <div className="flex items-center gap-3.5">
          <div className="relative group cursor-pointer" onClick={() => setIsEditingPhoto(true)}>
            {/* Tag <img> Logo Foto Profil sesuai instruksi prompt & tema Geometric Balance */}
            <img
              src={profilePhotoUrl}
              alt="Logo Foto Profil TutorTulis MusafirONE"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-indigo-500 bg-slate-100 object-cover shadow-sm group-hover:border-indigo-600 transition"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://api.dicebear.com/7.x/bottts/svg?seed=wargamini';
              }}
            />
            <div className="absolute inset-0 bg-slate-900/60 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition text-white text-[10px] font-medium">
              Ubah
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-800">
                TutorTulis <span className="text-indigo-600">MusafirONE</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                Guru Bahasa AI
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Analisis Tata Bahasa, Alur Paragraf & Skor Esai Siswa (1-100)
            </p>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpenAstroCode}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-indigo-700 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition shadow-sm cursor-pointer"
            title="Lihat Kerangka Proyek Astro.js (Cloudflare SSR)"
          >
            <Code2 className="w-4 h-4 text-indigo-600" />
            <span className="hidden md:inline">Kode Astro.js (Cloudflare SSR)</span>
            <span className="md:hidden">Kode Astro</span>
          </button>

          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-medium text-slate-700">Gemini 3.7 Flash</span>
          </div>
        </div>
      </div>

      {/* Modal Ubah Foto Profil Logo */}
      {isEditingPhoto && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-indigo-600" />
                Ganti URL Foto Profil / Logo
              </h3>
              <button
                onClick={() => setIsEditingPhoto(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Sesuai instruksi, logo di header menggunakan tag <code className="text-indigo-600 font-mono">&lt;img&gt;</code>. Masukkan tautan foto profil Anda:
            </p>
            <form onSubmit={handleSavePhoto} className="space-y-3">
              <input
                type="url"
                required
                value={tempUrl}
                onChange={(e) => setTempUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setTempUrl('https://api.dicebear.com/7.x/bottts/svg?seed=wargamini');
                  }}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800"
                >
                  Reset Default
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingPhoto(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
                >
                  Simpan Foto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
