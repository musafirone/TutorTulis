export interface AstroFile {
  filename: string;
  path: string;
  language: string;
  description: string;
  code: string;
}

export const ASTRO_PROJECT_FILES: AstroFile[] = [
  {
    filename: 'index.astro',
    path: 'src/pages/index.astro',
    language: 'astro',
    description: 'Halaman utama SSR Astro.js dengan integrasi header foto profil, komponen form esai, dan hasil analisis real-time.',
    code: `---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
import EssayForm from '../components/EssayForm.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';

// Render SSR di Cloudflare Workers
export const prerender = false;
---

<Layout title="TutorTulis MusafirONE - Bimbingan Guru Bahasa AI">
  <div class="min-h-screen flex flex-col bg-slate-900 text-slate-100 selection:bg-indigo-500 selection:text-white">
    <!-- Header dengan Tag <img> Logo Foto Profil -->
    <Header />

    <!-- Main Content Area -->
    <main class="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
      <div class="mb-8 text-center sm:text-left">
        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
          Koreksi & Evaluasi <span class="text-indigo-400">Esai Siswa</span>
        </h1>
        <p class="text-slate-400 text-base max-w-2xl">
          Unggah naskah esai atau karangan murid untuk mendapatkan analisis tata bahasa teliti, evaluasi alur paragraf, skor 1-100, dan perbandingan Before/After berbasis Google Gemini.
        </p>
      </div>

      <!-- Komponen Form & Area Evaluasi -->
      <EssayForm />
    </main>

    <!-- Footer Wajib: Developer by @wargaminiofficial -->
    <Footer />
  </div>
</Layout>`
  },
  {
    filename: 'EssayForm.astro',
    path: 'src/components/EssayForm.astro',
    language: 'astro',
    description: 'Komponen formulir teks esai dengan textarea besar, tombol contoh esai, dan penampil hasil analisis before/after.',
    code: `---
// src/components/EssayForm.astro
---

<div class="space-y-8" id="tutor-container">
  <!-- Card Input Form -->
  <div class="bg-slate-800/80 backdrop-blur border border-slate-700/80 rounded-2xl p-5 sm:p-7 shadow-xl">
    <form id="essay-form" class="space-y-5">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label for="student-name" class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Nama Siswa
          </label>
          <input
            type="text"
            id="student-name"
            placeholder="Contoh: Budi Santoso (Kelas XI)"
            class="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>
        <div>
          <label for="essay-title" class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Judul Esai / Tema
          </label>
          <input
            type="text"
            id="essay-title"
            placeholder="Contoh: Dampak Positif & Negatif AI di Sekolah"
            class="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between mb-2">
          <label for="essay-text" class="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Naskah Esai / Karangan Siswa *
          </label>
          <span id="char-counter" class="text-xs text-slate-400">0 kata | 0 karakter</span>
        </div>
        
        <!-- Textarea Besar -->
        <textarea
          id="essay-text"
          rows="12"
          required
          placeholder="Tulis atau tempel teks karangan/esai siswa di sini untuk dianalisis oleh guru bahasa AI..."
          class="w-full bg-slate-900/90 border border-slate-700 rounded-2xl p-4 sm:p-5 text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-y font-mono leading-relaxed"
        ></textarea>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          type="button"
          id="btn-sample"
          class="inline-flex items-center gap-2 text-xs font-medium text-indigo-300 hover:text-indigo-200 bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-700/50 px-3.5 py-2 rounded-xl transition"
        >
          <span>💡 Muat Contoh Esai Siswa</span>
        </button>

        <div class="flex items-center gap-3">
          <button
            type="reset"
            id="btn-reset"
            class="px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 rounded-xl transition"
          >
            Bersihkan
          </button>
          <button
            type="submit"
            id="btn-submit"
            class="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-600/30 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <span id="btn-text">Analisis dengan Gemini AI</span>
            <span id="btn-loader" class="hidden animate-spin">⏳</span>
          </button>
        </div>
      </div>
    </form>
  </div>

  <!-- Loading State Banner -->
  <div id="loading-state" class="hidden bg-slate-800/90 border border-indigo-500/40 rounded-2xl p-8 text-center space-y-3 animate-pulse">
    <div class="text-4xl">👨‍🏫</div>
    <h3 class="text-lg font-bold text-indigo-300">Guru Bahasa AI sedang meneliti naskah...</h3>
    <p class="text-sm text-slate-400 max-w-md mx-auto">
      Memeriksa tata bahasa, tanda baca, kelogisan alur antar paragraf, dan mengkalkulasi skor 1-100.
    </p>
  </div>

  <!-- Results Container (Before / After Comparison & Highlights) -->
  <div id="result-container" class="hidden space-y-6">
    <!-- Diisi secara dinamis melalui JavaScript client-side -->
  </div>
</div>

<script>
  const form = document.getElementById('essay-form') as HTMLFormElement;
  const essayInput = document.getElementById('essay-text') as HTMLTextAreaElement;
  const charCounter = document.getElementById('char-counter');
  const btnSubmit = document.getElementById('btn-submit') as HTMLButtonElement;
  const btnText = document.getElementById('btn-text');
  const btnLoader = document.getElementById('btn-loader');
  const loadingState = document.getElementById('loading-state');
  const resultContainer = document.getElementById('result-container');
  const btnSample = document.getElementById('btn-sample');

  // Live Counter
  essayInput?.addEventListener('input', () => {
    const text = essayInput.value.trim();
    const words = text ? text.split(/\\s+/).length : 0;
    if (charCounter) {
      charCounter.textContent = \`\${words} kata | \${essayInput.value.length} karakter\`;
    }
  });

  // Contoh data
  btnSample?.addEventListener('click', () => {
    essayInput.value = "Perkembangan teknologi zaman sekarang sudah sangat pesat sekali terutama dibidang kecerdasan buatan. Banyak siswa-siswa yang memakai AI untuk tugas sehari-hari. Disatu sisi ini membantu, namun sisi buruknya murid menjadi malas berfikir kritis dan hanya copy paste jawaban secara instant.";
    essayInput.dispatchEvent(new Event('input'));
  });

  // Submit Handler -> Kirim ke /api/analyze
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const essay = essayInput.value.trim();
    if (!essay) return;

    btnSubmit.disabled = true;
    btnText!.textContent = 'Memeriksa Naskah...';
    btnLoader?.classList.remove('hidden');
    loadingState?.classList.remove('hidden');
    resultContainer?.classList.add('hidden');

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          essay,
          title: (document.getElementById('essay-title') as HTMLInputElement)?.value,
          studentName: (document.getElementById('student-name') as HTMLInputElement)?.value,
        })
      });

      if (!res.ok) throw new Error('Gagal menganalisis esai');
      const data = await res.json();

      // Render Hasil ke UI
      renderResults(data, essay);
    } catch (err) {
      alert('Terjadi kesalahan saat memanggil Gemini API: ' + (err as Error).message);
    } finally {
      btnSubmit.disabled = false;
      btnText!.textContent = 'Analisis dengan Gemini AI';
      btnLoader?.classList.add('hidden');
      loadingState?.classList.add('hidden');
    }
  });

  function renderResults(data: any, originalText: string) {
    if (!resultContainer) return;
    resultContainer.innerHTML = \`
      <div class="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-6">
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700 pb-5">
          <div>
            <span class="text-xs uppercase font-bold text-indigo-400 tracking-wider">Hasil Evaluasi Guru</span>
            <h2 class="text-2xl font-bold text-white">Skor Akhir: \${data.score} / 100</h2>
          </div>
          <div class="text-3xl font-extrabold px-5 py-2.5 rounded-2xl \${data.score >= 80 ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : data.score >= 65 ? 'bg-amber-950 text-amber-300 border border-amber-700' : 'bg-rose-950 text-rose-300 border border-rose-700'}">
            \${data.score} Pts
          </div>
        </div>

        <p class="text-slate-300 text-sm italic bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
          "\${data.overallFeedback}"
        </p>

        <!-- Perbandingan Before / After -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          <div class="space-y-2">
            <h4 class="text-sm font-bold text-rose-400 flex items-center gap-2">
              <span>🔴 Naskah Asli Siswa (Before)</span>
            </h4>
            <div class="bg-slate-900/90 border border-rose-900/40 rounded-xl p-4 text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">
              \${originalText}
            </div>
          </div>

          <div class="space-y-2">
            <h4 class="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <span>🟢 Naskah Perbaikan Guru (After)</span>
            </h4>
            <div class="bg-slate-900/90 border border-emerald-900/40 rounded-xl p-4 text-emerald-100 text-sm whitespace-pre-wrap leading-relaxed">
              \${data.correctedText}
            </div>
          </div>
        </div>
      </div>
    \`;
    resultContainer.classList.remove('hidden');
    resultContainer.scrollIntoView({ behavior: 'smooth' });
  }
</script>`
  },
  {
    filename: 'analyze.ts',
    path: 'src/pages/api/analyze.ts',
    language: 'typescript',
    description: 'Astro SSR API Route yang berjalan di Cloudflare Workers SSR dengan memanggil @google/genai Gemini 3.7 Flash.',
    code: `// src/pages/api/analyze.ts
import type { APIRoute } from 'astro';
import { GoogleGenAI, Type } from '@google/genai';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const { essay, title, studentName } = body;

    if (!essay || typeof essay !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Naskah esai wajib diisi.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Mengambil API Key dari Cloudflare Workers runtime env (locals.runtime.env) atau process.env
    const apiKey = (locals as any)?.runtime?.env?.GEMINI_API_KEY || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'GEMINI_API_KEY belum dikonfigurasi di environment Cloudflare.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = \`
Judul: \${title || 'Tanpa Judul'}
Nama Siswa: \${studentName || 'Siswa'}

Naskah Esai:
"""
\${essay.trim()}
"""

Instruksi: Analisis esai siswa di atas. Berikan penilaian tata bahasa, evaluasi alur tiap paragraf, skor 1-100, poin kelebihan/kekurangan, dan naskah perbaikan (correctedText) yang mengalir rapi.
\`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        // System prompt sesuai permintaan instruksi:
        systemInstruction: 'Kamu adalah guru bahasa yang teliti. Analisis esai ini, berikan perbaikan tata bahasa, evaluasi alur paragraf, dan berikan skor dari 1-100.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER, description: 'Skor 1-100' },
            overallFeedback: { type: Type.STRING, description: 'Tinjauan guru' },
            grammarScore: { type: Type.INTEGER },
            coherenceScore: { type: Type.INTEGER },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            improvements: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctedText: { type: Type.STRING, description: 'Teks perbaikan' },
            diffHighlights: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  type: { type: Type.STRING },
                  original: { type: Type.STRING },
                  replacement: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                },
                required: ['id', 'type', 'original', 'replacement', 'explanation'],
              }
            }
          },
          required: ['score', 'overallFeedback', 'correctedText', 'diffHighlights'],
        },
      },
    });

    return new Response(response.text, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || 'Gagal memproses dengan Gemini API' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};`
  },
  {
    filename: 'astro.config.mjs',
    path: 'astro.config.mjs',
    language: 'javascript',
    description: 'Konfigurasi Astro.js dengan adaptor Cloudflare Workers (@astrojs/cloudflare) dan output server (SSR).',
    code: `import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: 'cloudflare',
    mode: 'advanced', // Cloudflare Workers SSR mode
  }),
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});`
  },
  {
    filename: 'Header.astro',
    path: 'src/components/Header.astro',
    language: 'astro',
    description: 'Komponen Header dengan tag <img> foto profil sebagai logo TutorTulis MusafirONE.',
    code: `---
// src/components/Header.astro
const profilePhotoUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
---

<header class="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-30">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
    <div class="flex items-center gap-3.5">
      <!-- Tag <img> Logo Foto Profil sesuai instruksi -->
      <img
        src={profilePhotoUrl}
        alt="Foto Profil TutorTulis MusafirONE"
        class="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/50 shadow-md shadow-indigo-500/20"
        loading="eager"
      />
      <div>
        <div class="flex items-center gap-2">
          <span class="font-black text-lg text-white tracking-tight">TutorTulis</span>
          <span class="text-xs font-bold px-2 py-0.5 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-md">MusafirONE</span>
        </div>
        <p class="text-[11px] text-slate-400 hidden sm:block">Guru Bahasa AI & Evaluasi Esai Siswa</p>
      </div>
    </div>

    <div class="flex items-center gap-3 text-xs">
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-700/50">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
        <span>Gemini 3.7 Flash SSR</span>
      </span>
    </div>
  </div>
</header>`
  },
  {
    filename: 'Footer.astro',
    path: 'src/components/Footer.astro',
    language: 'astro',
    description: 'Komponen Footer dengan teks wajib "Developer by @wargaminiofficial".',
    code: `---
// src/components/Footer.astro
---

<footer class="border-t border-slate-800 bg-slate-950/90 text-slate-400 py-6 mt-12">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
    <div class="flex items-center gap-2">
      <span class="font-semibold text-slate-200">TutorTulis MusafirONE</span>
      <span>•</span>
      <span>Platform Koreksi Esai Siswa</span>
    </div>

    <!-- Teks Wajib sesuai instruksi prompt -->
    <div class="font-medium text-slate-300 bg-slate-900 px-3.5 py-1.5 rounded-lg border border-slate-800">
      Developer by <span class="text-indigo-400 font-semibold">@wargaminiofficial</span>
    </div>
  </div>
</footer>`
  },
  {
    filename: 'wrangler.toml',
    path: 'wrangler.toml',
    language: 'toml',
    description: 'Konfigurasi Cloudflare Workers untuk deployment SSR Astro.',
    code: `name = "tutortulis-musafirone"
main = "./dist/_worker.js"
compatibility_date = "2024-04-01"
compatibility_flags = ["nodejs_compat"]

[vars]
# Variabel publik atau set via: npx wrangler secret put GEMINI_API_KEY`
  }
];
