import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  GitCompare,
  Highlighter,
  Layers,
  Sparkles,
  Printer,
  ChevronRight,
  TrendingUp,
  MessageSquareQuote,
  SplitSquareVertical,
} from 'lucide-react';
import { AnalysisResult, DiffHighlight } from '../types';

interface AnalysisDisplayProps {
  result: AnalysisResult;
  originalEssay: string;
  studentName?: string;
  essayTitle?: string;
  genre?: string;
  onReset: () => void;
}

export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({
  result,
  originalEssay,
  studentName,
  essayTitle,
  genre,
  onReset,
}) => {
  const [activeTab, setActiveTab] = useState<
    'compare' | 'highlights' | 'paragraphs' | 'corrected'
  >('compare');
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [selectedHighlightId, setSelectedHighlightId] = useState<string | null>(null);
  const [highlightFilter, setHighlightFilter] = useState<string>('all');

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const getScoreGrade = (score: number) => {
    if (score >= 90) return { grade: 'A+', label: 'Istimewa (Sangat Matang)' };
    if (score >= 80) return { grade: 'A', label: 'Sangat Baik (Kompeten)' };
    if (score >= 70) return { grade: 'B', label: 'Baik (Perlu Sedikit Polesan)' };
    if (score >= 60) return { grade: 'C', label: 'Cukup (Banyak Ruang Perbaikan)' };
    return { grade: 'D', label: 'Perlu Bimbingan Ekstra' };
  };

  const gradeInfo = getScoreGrade(result.score);

  const getBadgeForType = (type: string) => {
    switch (type) {
      case 'grammar':
        return { label: 'Tata Bahasa', color: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'typo':
        return { label: 'Ejaan / Typo', color: 'bg-rose-50 text-rose-700 border-rose-200' };
      case 'diction':
        return { label: 'Pilihan Kata / Diksi', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'structure':
        return { label: 'Struktur Kalimat', color: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'punctuation':
        return { label: 'Tanda Baca', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' };
      default:
        return { label: type, color: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  const filteredHighlights =
    highlightFilter === 'all'
      ? result.diffHighlights
      : result.diffHighlights.filter((h) => h.type === highlightFilter);

  return (
    <div className="space-y-6" id="analysis-result-section">
      {/* Top Geometric Metric Cards: Score + Teacher Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric Score Block */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
            Skor Keseluruhan
          </span>
          <div className="text-4xl sm:text-5xl font-black text-indigo-600 tracking-tight">
            {result.score}
            <span className="text-lg text-slate-400 font-semibold">/100</span>
          </div>
          <div className="mt-2 text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
            {gradeInfo.grade} • {gradeInfo.label}
          </div>
        </div>

        {/* Teacher Note Card */}
        <div className="md:col-span-2 bg-indigo-600 p-5 rounded-xl border border-indigo-700 text-white flex flex-col justify-center shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-200">
              Catatan & Evaluasi Guru Bahasa AI
            </span>
          </div>
          <p className="text-sm italic text-white/95 leading-relaxed">
            "{result.overallFeedback}"
          </p>
          {(essayTitle || studentName) && (
            <div className="mt-3 pt-3 border-t border-indigo-500/50 flex flex-wrap items-center gap-2 text-xs text-indigo-100 font-medium">
              {studentName && <span>👤 Siswa: {studentName}</span>}
              {essayTitle && <span>• 📄 Judul: "{essayTitle}"</span>}
              {genre && <span>• 🏷️ {genre}</span>}
              <span>• 📊 {result.wordCount} kata</span>
            </div>
          )}
        </div>
      </div>

      {/* 4 Rubric Domain Scores */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">
          Rincian Aspek Penilaian Bahasa:
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 font-medium">Tata Bahasa</span>
              <span className="font-bold text-indigo-600">{result.grammarScore}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${result.grammarScore}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 font-medium">Kosakata & Diksi</span>
              <span className="font-bold text-emerald-600">{result.vocabularyScore}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${result.vocabularyScore}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 font-medium">Struktur Kalimat</span>
              <span className="font-bold text-cyan-600">{result.structureScore}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="bg-cyan-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${result.structureScore}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 font-medium">Koherensi & Alur</span>
              <span className="font-bold text-amber-600">{result.coherenceScore}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="bg-amber-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${result.coherenceScore}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Strengths & Improvements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          <div className="bg-emerald-50/60 border border-emerald-200 rounded-lg p-3.5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Kekuatan Utama Naskah Siswa:</span>
            </div>
            <ul className="space-y-1 text-xs text-emerald-950">
              {result.strengths.map((st, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{st}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50/60 border border-amber-200 rounded-lg p-3.5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
              <span>Area Rekomendasi Peningkatan:</span>
            </div>
            <ul className="space-y-1 text-xs text-amber-950">
              {result.improvements.map((imp, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-1.5 shadow-sm flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => setActiveTab('compare')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'compare'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>Perbandingan Before / After</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('highlights')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'highlights'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Highlighter className="w-3.5 h-3.5" />
            <span>Koreksi Detail ({result.diffHighlights.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('paragraphs')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'paragraphs'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Evaluasi Alur Paragraf ({result.paragraphEvaluations.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('corrected')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'corrected'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Naskah Perbaikan Penuh</span>
          </button>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={() => handleCopy(result.correctedText, 'corrected')}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition cursor-pointer"
          >
            {copiedType === 'corrected' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Salin Naskah</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
            title="Cetak / Simpan Laporan PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cetak</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Esai Baru</span>
          </button>
        </div>
      </div>

      {/* Tab Content 1: Side-by-Side Before / After */}
      {activeTab === 'compare' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-wrap justify-between items-center gap-3">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-600">
                Perbandingan Naskah (Before vs After)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Lihat naskah asli siswa bersanding langsung dengan naskah yang telah disempurnakan
              </p>
            </div>
            <button
              onClick={() => handleCopy(result.correctedText, 'after')}
              className="text-xs text-white bg-indigo-600 hover:bg-indigo-700 font-semibold px-3.5 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              {copiedType === 'after' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Salin Naskah Revisi</span>
            </button>
          </div>

          <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Original (Before) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  Naskah Asli Siswa (Before)
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {originalEssay.split(/\s+/).filter(Boolean).length} kata
                </span>
              </div>
              <div className="bg-red-50/40 border border-red-200/80 rounded-xl p-4 sm:p-5 text-slate-800 text-xs sm:text-sm whitespace-pre-wrap leading-relaxed font-mono min-h-[300px] shadow-sm">
                {originalEssay}
              </div>
            </div>

            {/* Right: Corrected (After) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Naskah Perbaikan Guru (After)
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {result.correctedText.split(/\s+/).filter(Boolean).length} kata
                </span>
              </div>
              <div className="bg-green-50/40 border border-green-200/80 rounded-xl p-4 sm:p-5 text-slate-900 text-xs sm:text-sm whitespace-pre-wrap leading-relaxed font-mono min-h-[300px] shadow-sm">
                {result.correctedText}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 2: Interactive Highlights & Specific Fixes */}
      {activeTab === 'highlights' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-wrap justify-between items-center gap-3">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-600">
                Hasil Analisis: Perbaikan Tata Bahasa & Diksi
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Koreksi kata, tanda baca, ejaan, dan struktur kalimat beserta alasan perbaikannya
              </p>
            </div>

            {/* Filter badges */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
              {[
                { id: 'all', label: `Semua (${result.diffHighlights.length})` },
                { id: 'grammar', label: 'Tata Bahasa' },
                { id: 'typo', label: 'Ejaan' },
                { id: 'diction', label: 'Diksi' },
                { id: 'structure', label: 'Struktur' },
                { id: 'punctuation', label: 'Tanda Baca' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setHighlightFilter(tab.id)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition shrink-0 cursor-pointer ${
                    highlightFilter === tab.id
                      ? 'bg-slate-800 text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* List of Highlight Cards */}
          <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredHighlights.length === 0 ? (
              <div className="col-span-2 text-center py-10 text-slate-500 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                Tidak ada catatan pada kategori ini.
              </div>
            ) : (
              filteredHighlights.map((hl, index) => {
                const badge = getBadgeForType(hl.type);
                const isSelected = selectedHighlightId === hl.id;

                return (
                  <div
                    key={hl.id || index}
                    onClick={() => setSelectedHighlightId(isSelected ? null : hl.id)}
                    className={`p-4 rounded-xl border transition space-y-3 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50/50 border-indigo-400 ring-1 ring-indigo-300 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${badge.color}`}
                      >
                        {badge.label}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">#{index + 1}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="grid grid-cols-1 gap-2 text-xs font-mono">
                        <div className="p-2.5 bg-red-50 rounded-lg text-xs border border-red-100 text-red-800 line-through opacity-80 leading-relaxed">
                          {hl.original}
                        </div>
                        <div className="p-2.5 bg-green-50 rounded-lg text-xs border border-green-100 text-green-800 font-medium leading-relaxed">
                          {hl.replacement}
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200 leading-relaxed">
                        <strong className="text-slate-800">Alasan: </strong>
                        {hl.explanation}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Tab Content 3: Paragraph Flow Evaluation */}
      {activeTab === 'paragraphs' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-600">
              Evaluasi Alur Antar Paragraf & Transisi
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              Total {result.paragraphEvaluations.length} Paragraf
            </span>
          </div>

          <div className="p-5 sm:p-6 space-y-4">
            {result.paragraphEvaluations.map((pEval, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3"
              >
                <div className="flex items-center justify-between gap-3 flex-wrap border-b border-slate-200 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                      P{pEval.paragraphIndex || idx + 1}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-800">
                      Paragraf ke-{pEval.paragraphIndex || idx + 1}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-500">Skor Koherensi:</span>
                    <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      {pEval.coherenceScore || 85} / 100
                    </span>
                  </div>
                </div>

                {/* Excerpt */}
                <div className="text-xs text-slate-600 italic bg-white p-3 rounded-lg border border-slate-200 font-mono">
                  "{pEval.originalSnippet}"
                </div>

                {/* Flow Evaluation */}
                <div className="space-y-1 text-xs sm:text-sm">
                  <div className="font-bold text-slate-700">Evaluasi Alur & Transisi:</div>
                  <p className="text-slate-600 leading-relaxed">
                    {pEval.flowEvaluation}
                  </p>
                </div>

                {/* Strengths & Suggestions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
                  <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg">
                    <span className="font-bold text-emerald-800 block mb-0.5">
                      ✅ Kelebihan Paragraf:
                    </span>
                    <span className="text-emerald-950">{pEval.strengths}</span>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-lg">
                    <span className="font-bold text-amber-800 block mb-0.5">
                      💡 Saran Transisi:
                    </span>
                    <span className="text-amber-950">{pEval.suggestions}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 4: Polished Corrected Full Essay */}
      {activeTab === 'corrected' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between gap-3 flex-wrap">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
                Naskah Standar Baku & Mengalir
              </span>
              <h3 className="text-sm font-bold text-slate-800">
                {essayTitle || 'Versi Perbaikan Penuh'}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(result.correctedText, 'full-corrected')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition cursor-pointer"
            >
              {copiedType === 'full-corrected' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Tersalin ke Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Naskah Ini</span>
                </>
              )}
            </button>
          </div>

          <div className="p-5 sm:p-6 bg-slate-50/50">
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed shadow-sm">
              {result.correctedText}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
