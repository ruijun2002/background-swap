export enum ColorType {
  SOLID = 'SOLID',
  TRANSPARENT = 'TRANSPARENT'
}

export interface BackgroundOption {
  id: string;
  label: string;
  value: string; // Hex code or description
  type: ColorType;
  className?: string; // For UI representation
}

export interface ProcessedImage {
  original: string; // Base64
  result: string | null; // Base64 or URL
}

export interface AppState {
  image: File | null;
  imageBase64: string | null;
  processedImageBase64: string | null;
  isProcessing: boolean;
  error: string | null;
  selectedOptionId: string | null;
}