// types/marketing-globals.d.ts

// ---------- Google Tag Manager (dataLayer) ----------
export type DataLayerEvent = {
  event: string;
  page_location?: string;
  page_path?: string;
  page_title?: string;
  // Allow arbitrary additional fields (campaign, formId, etc.)
  [k: string]: unknown;
};

// ---------- Google Analytics 4 (gtag) ----------
export type GtagFn = (
  command: 'event',
  action: string,
  params?: Record<string, unknown>
) => void;

// ---------- Meta Pixel (fbq) ----------
export type FbqFn = (
  method: 'track' | string,
  action: string,
  params?: Record<string, unknown>
) => void;

// ---------- Microsoft UET ----------
export type UetPageLoadTuple = ['pageLoad'];
export type UetEventTuple = ['event', string, Record<string, unknown>?];
export type UetArray = Array<UetPageLoadTuple | UetEventTuple>;

export interface UetQueueObject {
  // UET's runtime exposes a push that accepts tuples; use unknown[] to avoid `any`
  push: (...args: unknown[]) => number;
}

declare global {
  interface Window {
    // GTM
    dataLayer?: DataLayerEvent[];

    // GA4
    gtag?: GtagFn;

    // Meta Pixel
    fbq?: FbqFn;

    // Microsoft UET: before tag loads it's an array; after load it's an object with push()
    uetq?: UetArray | UetQueueObject;
  }
}

export {};
