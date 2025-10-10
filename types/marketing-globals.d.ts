// types/marketing-globals.d.ts
declare global {
  // ---------- Google Tag Manager (dataLayer) ----------
  type DataLayerEvent = {
    event: string;
    page_location?: string;
    page_path?: string;
    page_title?: string;
    [k: string]: unknown;
  };

  // ---------- Google Analytics 4 (gtag) ----------
  type GtagFn = (
    command: 'event',
    action: string,
    params?: Record<string, unknown>
  ) => void;

  // ---------- Meta Pixel (fbq) ----------
  type FbqFn = (
    method: 'track' | string,
    action: string,
    params?: Record<string, unknown>
  ) => void;

  // ---------- Microsoft UET ----------
  type UetPageLoadTuple = ['pageLoad'];
  type UetEventTuple = ['event', string, Record<string, unknown>?];
  type UetArray = Array<UetPageLoadTuple | UetEventTuple>;

  interface UetQueueObject {
    push: (...args: unknown[]) => number;
  }

  interface Window {
    dataLayer?: DataLayerEvent[];
    gtag?: GtagFn;
    fbq?: FbqFn;
    uetq?: UetArray | UetQueueObject;
  }
}

export {}; // keep the file a module so Nuxt/TS picks it up
