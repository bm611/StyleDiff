
export interface GenerationRecord {
  id: string;
  sourceUrl: string;
  resultUrl: string;
  prompt: string;
  timestamp: number;
}

export interface AppState {
  sourceImage: string | null;
  referenceImage: string | null;
  isGenerating: boolean;
  prompt: string;
  history: GenerationRecord[];
  currentResult: string | null;
  error: string | null;
}
