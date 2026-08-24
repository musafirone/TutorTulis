/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { EssayForm } from './components/EssayForm';
import { AnalysisDisplay } from './components/AnalysisDisplay';
import { AstroProjectViewer } from './components/AstroProjectViewer';
import { AnalysisResult, AnalyzeRequest } from './types';
import {
  Sparkles,
  BookOpen,
  Code2,
  CheckCircle2,
  Layers,
  AlertCircle,
  Award,
  FileCheck2,
  Cpu,
} from 'lucide-react';

export default function App() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [currentEssay, setCurrentEssay] = useState<string>('');
  const [studentName, setStudentName] = useState<string>('');
  const [essayTitle, setEssayTitle] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAstroModalOpen, setIsAstroModalOpen] = useState<boolean>(false);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string>(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  );

  const handleAnalyze = async (data: AnalyzeRequest) => {
    setIsLoading(true);
    setError(null);
    setCurrentEssay(data.essay);
    setStudentName(data.studentName || '');
    setEssayTitle(data.title || '');
    setGenre(data.genre || '');

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(
          errJson.error || `Gagal menganalisis esai (${response.status}: ${response.statusText})`
        );
      }

      const resultData: AnalysisResult = await response.json();
      setAnalysisResult(resultData);

      // Smooth scroll to results
      setTimeout(() => {
        const el = document.getElementById('analysis-result-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err: any) {
      console.error('Analisis gagal:', err);
      setError(
        err.message ||
          'Terjadi kesalahan saat berkomunikasi dengan server AI. Silakan periksa koneksi atau coba beberapa saat lagi.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setCurrentEssay('');
    setStudentName('');
    setEssayTitle('');
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-indigo-500 selection:text-white font-sans antialiased">
      {/* Header with <img> Profile Photo Logo & Brand */}
      <Header
        onOpenAstroCode={() => setIsAstroModalOpen(true)}
        profilePhotoUrl={profilePhotoUrl}
        onUpdateProfilePhoto={(url) => setProfilePhotoUrl(url)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
        {/* Hero Section */}
        <section className="text-center sm:text-left relative">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2.5 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Asisten Guru Bahasa & Bimbingan Menulis Siswa Berbasis AI</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Evaluasi Esai Cermat,{' '}
                <span className="text-indigo-600">
                  Tata Bahasa & Alur Paragraf
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                Unggah naskah esai atau karangan siswa. Guru Bahasa AI akan memeriksa ketepatan ejaan (KBBI/PUEBI), mengevaluasi koherensi alur ide, memberikan skor objektif (1-100), dan menampilkan perbandingan Before/After.
              </p>
            </div>

            {/* Quick Feature Badges */}
            <div className="flex flex-wrap items-center gap-2 lg:flex-col lg:items-end text-xs">
              <div className="flex items-center gap-2 bg-white border border-slate-200 px-3.5 py-2 rounded-xl text-slate-700 shadow-sm">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Skor Objektif 1 - 100</span>
              </div>
              <div className="flex items-center gap-2 bg-white border border-slate-200 px-3.5 py-2 rounded-xl text-slate-700 shadow-sm">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <span>Perbandingan Before / After</span>
              </div>
              <div className="flex items-center gap-2 bg-white border border-slate-200 px-3.5 py-2 rounded-xl text-slate-700 shadow-sm">
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>Evaluasi Alur Antar Paragraf</span>
              </div>
            </div>
          </div>
        </section>

        {/* Error Alert if any */}
        {error && (
          <div className="p-4 sm:p-5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-3 shadow-sm">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold text-rose-900">Pemberitahuan Analisis:</div>
              <p className="text-rose-700">{error}</p>
            </div>
          </div>
        )}

        {/* Form Input Section */}
        <section>
          <EssayForm onSubmit={handleAnalyze} isLoading={isLoading} />
        </section>

        {/* Loading Animation Banner during analysis */}
        {isLoading && (
          <section className="bg-white border border-slate-200 rounded-xl p-8 sm:p-12 text-center space-y-4 shadow-sm">
            <div className="w-14 h-14 mx-auto rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-2xl shadow-sm animate-pulse">
              👨‍🏫
            </div>

            <div className="space-y-1.5 max-w-md mx-auto">
              <h3 className="text-lg font-bold text-slate-900">
                Guru Bahasa Sedang Meneliti Naskah...
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Mengevaluasi keselarasan tata bahasa, pilihan diksi, kelogisan alur antar paragraf, serta menyusun naskah perbaikan Before/After dan skor 1-100.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-indigo-600 pt-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
              <span>Gemini sedang memproses...</span>
            </div>
          </section>
        )}

        {/* Analysis Results Display */}
        {analysisResult && !isLoading && (
          <section>
            <AnalysisDisplay
              result={analysisResult}
              originalEssay={currentEssay}
              studentName={studentName}
              essayTitle={essayTitle}
              genre={genre}
              onReset={handleReset}
            />
          </section>
        )}
      </main>

      {/* Astro Project Code Explorer Modal */}
      <AstroProjectViewer
        isOpen={isAstroModalOpen}
        onClose={() => setIsAstroModalOpen(false)}
      />

      {/* Footer with mandatory "Developer by @wargaminiofficial" */}
      <Footer onOpenAstroCode={() => setIsAstroModalOpen(true)} />
    </div>
  );
}
