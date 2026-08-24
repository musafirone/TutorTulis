export interface DiffHighlight {
  id: string;
  type: 'grammar' | 'typo' | 'diction' | 'structure' | 'punctuation';
  original: string;
  replacement: string;
  explanation: string;
  paragraphIndex?: number;
}

export interface ParagraphEvaluation {
  paragraphIndex: number;
  originalSnippet: string;
  flowEvaluation: string;
  strengths: string;
  suggestions: string;
  coherenceScore: number;
}

export interface AnalysisResult {
  score: number; // 1-100
  overallFeedback: string;
  grammarScore: number;
  vocabularyScore: number;
  structureScore: number;
  coherenceScore: number;
  correctedText: string;
  paragraphEvaluations: ParagraphEvaluation[];
  diffHighlights: DiffHighlight[];
  strengths: string[];
  improvements: string[];
  wordCount: number;
  characterCount: number;
  readingTimeMinutes: number;
  analyzedAt: string;
}

export interface AnalyzeRequest {
  essay: string;
  title?: string;
  studentName?: string;
  genre?: string;
}
