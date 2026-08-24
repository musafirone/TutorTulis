import React, { useState } from 'react';
import { Sparkles, BookOpen, Send, Trash2, CheckCircle, FileText, User, Tag, Lightbulb, Zap } from 'lucide-react';
import { SAMPLE_ESSAYS, SampleEssay } from '../data/sampleEssays';
import { AnalyzeRequest } from '../types';

interface EssayFormProps {
  onSubmit: (data: AnalyzeRequest) => void;
  isLoading: boolean;
}

export const EssayForm: React.FC<EssayFormProps> = ({ onSubmit, isLoading }) => {
  const [essay, setEssay] = useState('');
  const [title, setTitle] = useState('');
  const [studentName, setStudentName] = useState('');
  const [genre, setGenre] = useState('Esai Argumentatif');
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(null);

  const wordCount = essay.trim() ? essay.trim().split(/\s+/).length : 0;
  const charCount = essay.length;
  const estimatedReadingTime = Math.max(1, Math.ceil(wordCount / 200));

  const handleSelectSample = (sample: SampleEssay) => {
    setEssay(sample.content);
    setTitle(sample.title);
    setStudentName(sample.studentName);
    setGenre(sample.genre);
    setSelectedSampleId(sample.id);
  };

  const handleReset = () => {
    setEssay('');
    setTitle('');
    setStudentName('');
    setSelectedSampleId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!essay.trim() || isLoading) return;
    onSubmit({
      essay: essay.trim(),
      title: title.trim() || undefined,
      studentName: studentName.trim() || undefined,
      genre: genre || undefined,
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      {/* Subheader bar */}
      <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-600">
            Input Karangan / Esai Siswa
          </h2>
        </div>

        {/* Live Stats */}
        <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
          <span>
            <strong className="text-slate-800">{wordCount}</strong> kata
          </span>
          <span>•</span>
          <span>
            <strong className="text-slate-800">{charCount}</strong> karakter
          </span>
          <span>•</span>
          <span>~{estimatedReadingTime} mnt baca</span>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* Sample Essays Selector */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              Pilih Contoh Esai Siswa (Uji Coba Cepat):
            </span>
            <span className="text-[11px] text-slate-400">Klik untuk memuat otomatis</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {SAMPLE_ESSAYS.map((sample) => {
              const isSelected = selectedSampleId === sample.id;
              return (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => handleSelectSample(sample)}
                  className={`text-left p-3 rounded-lg border transition text-xs flex flex-col justify-between gap-1 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50/80 border-indigo-400 text-indigo-950 ring-1 ring-indigo-300 shadow-sm'
                      : 'bg-slate-50/80 border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-semibold text-slate-900 truncate">
                      {sample.title}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 font-medium shrink-0">
                      {sample.genre.replace('Esai ', '')}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    {sample.description}
                  </p>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    ✍️ {sample.studentName}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Metadata Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label
                htmlFor="student-name-input"
                className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1"
              >
                <User className="w-3.5 h-3.5 text-indigo-600" />
                Nama Siswa
              </label>
              <input
                id="student-name-input"
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Contoh: Budi Santoso (Kelas XI)"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
              />
            </div>

            <div>
              <label
                htmlFor="essay-title-input"
                className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-600" />
                Judul Esai / Tema
              </label>
              <input
                id="essay-title-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Dampak AI dalam Pembelajaran"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
              />
            </div>

            <div>
              <label
                htmlFor="genre-select"
                className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1"
              >
                <Tag className="w-3.5 h-3.5 text-indigo-600" />
                Kategori Esai
              </label>
              <select
                id="genre-select"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition cursor-pointer"
              >
                <option value="Esai Argumentatif">Esai Argumentatif</option>
                <option value="Esai Persuasif">Esai Persuasif</option>
                <option value="Esai Naratif">Esai Naratif</option>
                <option value="Esai Eksposisi">Esai Eksposisi</option>
                <option value="Esai Deskriptif">Esai Deskriptif</option>
                <option value="Opini / Artikel Kritis">Opini / Artikel Kritis</option>
              </select>
            </div>
          </div>

          {/* Textarea Area */}
          <div>
            <textarea
              id="essay-textarea"
              rows={11}
              required
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
              placeholder="Tulis atau tempel esai siswa di sini. Guru Bahasa AI akan menganalisis tata bahasa, ejaan KBBI/PUEBI, kelogisan alur antar paragraf, skor 1-100, dan perbandingan Before/After..."
              className="w-full bg-white border border-slate-200 rounded-xl p-4 sm:p-5 text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-y font-mono leading-relaxed shadow-sm"
            ></textarea>
          </div>

          {/* Teacher AI System Prompt badge */}
          <div className="p-3 rounded-lg bg-indigo-50/70 border border-indigo-100 flex items-center gap-2.5 text-xs text-indigo-900">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>
              <strong>Instruksi Guru AI: </strong>
              <em className="text-indigo-800">
                "Analisis esai ini, berikan perbaikan tata bahasa, evaluasi alur paragraf, dan berikan skor dari 1-100."
              </em>
            </span>
          </div>

          {/* Bottom Actions */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 -mx-5 sm:-mx-6 -mb-5 sm:-mb-6 rounded-b-xl flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              disabled={isLoading || (!essay && !title && !studentName)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Bersihkan Input
            </button>

            <button
              type="submit"
              disabled={isLoading || !essay.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Guru Sedang Menganalisis...</span>
                </>
              ) : (
                <>
                  <span>Analisis dengan Gemini AI</span>
                  <Zap className="w-4 h-4 text-indigo-200" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
