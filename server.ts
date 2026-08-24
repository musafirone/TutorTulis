import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initializer for Gemini client
let genAIClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not configured');
    }
    genAIClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    appName: 'TutorTulis MusafirONE',
    timestamp: new Date().toISOString(),
  });
});

// Essay analysis endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const { essay, title, studentName, genre } = req.body;

    if (!essay || typeof essay !== 'string' || essay.trim().length === 0) {
      return res.status(400).json({
        error: 'Teks esai tidak boleh kosong. Mohon masukkan esai siswa untuk dianalisis.',
      });
    }

    const trimmedEssay = essay.trim();
    const wordCount = trimmedEssay.split(/\s+/).filter(Boolean).length;
    const characterCount = trimmedEssay.length;
    const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

    const ai = getGeminiClient();

    const promptText = `
Judul Esai: ${title || 'Tanpa Judul'}
Nama Siswa: ${studentName || 'Siswa'}
Kategori/Genre: ${genre || 'Esai Umum'}

Teks Esai:
"""
${trimmedEssay}
"""

Analisis esai siswa tersebut secara mendalam. Lakukan langkah-langkah berikut:
1. Hitung dan berikan skor keseluruhan dari skala 1 sampai 100 (berikan penilaian objektif dan mendidik).
2. Berikan skor per aspek (tata bahasa, kosakata, struktur kalimat, koherensi alur).
3. Berikan tinjauan umum yang ramah, mendalam, dan memotivasi dari seorang guru bahasa teliti.
4. Identifikasi poin-poin kekuatan utama teks dan hal-hal yang perlu ditingkatkan.
5. Lakukan evaluasi mendetail untuk setiap paragraf (evaluasi alur ide, transisi antar paragraf, kelemahan, dan saran konkrit).
6. Identifikasi setiap kesalahan tata bahasa (grammar), salah ketik (typo), pilihan kata (diction), struktur kalimat (structure), atau tanda baca (punctuation). Berikan teks asli yang keliru, pengganti yang tepat, dan alasan perbaikannya.
7. Buat naskah esai versi perbaikan penuh (correctedText) yang mengalir sempurna, mempertahankan pesan asli siswa namun dengan kaidah bahasa dan gaya penulisan terbaik.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: promptText,
      config: {
        systemInstruction:
          'Kamu adalah guru bahasa yang teliti. Analisis esai ini, berikan perbaikan tata bahasa, evaluasi alur paragraf, dan berikan skor dari 1-100.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.INTEGER,
              description: 'Skor total dari 1 sampai 100 berdasarkan kualitas esai.',
            },
            overallFeedback: {
              type: Type.STRING,
              description: 'Tinjauan umum dan motivasi dari guru bahasa.',
            },
            grammarScore: {
              type: Type.INTEGER,
              description: 'Skor tata bahasa dan ejaan (1-100).',
            },
            vocabularyScore: {
              type: Type.INTEGER,
              description: 'Skor kekayaan kosakata dan diksi (1-100).',
            },
            structureScore: {
              type: Type.INTEGER,
              description: 'Skor struktur kalimat dan keefektifan (1-100).',
            },
            coherenceScore: {
              type: Type.INTEGER,
              description: 'Skor koherensi dan alur paragraf (1-100).',
            },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Daftar kelebihan utama esai.',
            },
            improvements: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Daftar aspek yang paling penting ditingkatkan.',
            },
            paragraphEvaluations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  paragraphIndex: { type: Type.INTEGER },
                  originalSnippet: { type: Type.STRING },
                  flowEvaluation: { type: Type.STRING },
                  strengths: { type: Type.STRING },
                  suggestions: { type: Type.STRING },
                  coherenceScore: { type: Type.INTEGER },
                },
                required: [
                  'paragraphIndex',
                  'originalSnippet',
                  'flowEvaluation',
                  'strengths',
                  'suggestions',
                  'coherenceScore',
                ],
              },
              description: 'Analisis dan evaluasi alur per setiap paragraf.',
            },
            diffHighlights: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  type: {
                    type: Type.STRING,
                    description: 'Tipe: grammar | typo | diction | structure | punctuation',
                  },
                  original: { type: Type.STRING },
                  replacement: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                  paragraphIndex: { type: Type.INTEGER },
                },
                required: ['id', 'type', 'original', 'replacement', 'explanation'],
              },
              description: 'Daftar perbaikan kata/frasa spesifik untuk highlighting.',
            },
            correctedText: {
              type: Type.STRING,
              description: 'Teks esai lengkap versi perbaikan yang sudah disempurnakan.',
            },
          },
          required: [
            'score',
            'overallFeedback',
            'grammarScore',
            'vocabularyScore',
            'structureScore',
            'coherenceScore',
            'strengths',
            'improvements',
            'paragraphEvaluations',
            'diffHighlights',
            'correctedText',
          ],
        },
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error('Gemini API tidak memberikan respons teks yang valid.');
    }

    const parsedData = JSON.parse(responseText);

    const fullResult = {
      ...parsedData,
      wordCount,
      characterCount,
      readingTimeMinutes,
      analyzedAt: new Date().toISOString(),
    };

    res.json(fullResult);
  } catch (error: any) {
    console.error('Error saat menganalisis esai dengan Gemini:', error);
    res.status(500).json({
      error:
        error.message ||
        'Terjadi kendala saat memproses analisis esai dengan Google Gemini API. Pastikan GEMINI_API_KEY sudah terpasang.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TutorTulis MusafirONE server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
