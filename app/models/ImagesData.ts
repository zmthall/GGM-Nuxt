export type FetchImages = {
        id: string;
        src: string;
        alt?: string;
}[]

export interface CommunityImagesResponse {
  slots: Record<string, {
    id: string;
    src: string;
    alt: string;
  }>
}
