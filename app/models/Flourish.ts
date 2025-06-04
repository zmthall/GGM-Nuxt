declare global {
  interface Window {
    Flourish?: {
      disable_autoload?: boolean;
      loadEmbed?: (element: HTMLElement) => void;
      init?: (element?: HTMLElement) => void;
      resize?: () => void;
      setHeight?: (height: number) => void;
      addAnalyticsListener?: (callback: (event: unknown) => void) => void;
      removeAnalyticsListener?: (callback: (event: unknown) => void) => void;
    };
  }
}