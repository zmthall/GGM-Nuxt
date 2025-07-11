export type FetchImages = {
        id: string;
        src: string;
        alt?: string;
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
  }>
}
