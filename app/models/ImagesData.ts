export type FetchImages = {
        id: string;
        src: string;
        alt?: string;
        lastUpdated: string;
}[]

export interface ImageData {
  id: string;
  src: string;
  alt: string;
  title?: string;
  loading?: "lazy" | "eager";
}

export interface ImageDataFile {
  file: File | null
  alt: string
}

export interface CommunityImagesResponse {
  slots: Record<string, {
    id: string;
    src: string;
    alt: string;
    lastUpdated: string;
  }>
}

export interface ImageUpdateResponse {
  message: string;
  success: boolean;
  slot: number;
  data: {
    filename: string;
    size: number;
    type: string;
    alt: string;
    fileBase64: string;
  }
}



