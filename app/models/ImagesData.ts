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

export interface CommunityImagesResponse {
  slots: Record<string, {
    id: string;
    src: string;
    alt: string;
    lastUpdated: string;
  }>
}

export interface ImageUpdateResponse {
  success: boolean;
  message: string;
  error?: string;
  fileName?: string;
  alt?: string;
}



