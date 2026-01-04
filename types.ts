
export interface GenerationRecord {
  id: string;
  sourceUrl: string;
  resultUrl: string;
  prompt: string;
  timestamp: number;
}

export interface AppState {
  sourceImage: string | null;
  sourceImageUrl: string | null; // URL from Supabase storage
  referenceImage: string | null;
  isGenerating: boolean;
  prompt: string;
  history: GenerationRecord[];
  currentResult: string | null;
  error: string | null;
}

export interface BaseImage {
  id: string;
  url: string;
  path: string;
  created_at: string;
}

export interface SavedDesign {
  id: string;
  user_id: string;
  base_image_url: string;
  generated_image_url: string;
  prompt: string;
  created_at: string;
}
