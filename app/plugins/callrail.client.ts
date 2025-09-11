declare global {
  interface Window {
    CallTrk?: { swap?: () => void };
    __CALLRAIL_LOADED__?: Promise<void>;
    __CALLRAIL_SWAPPED__?: boolean;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) return;

  const SRC = `https://cdn.callrail.com/companies/691517791/60c02cd08e344bb7ef3a/12/swap.js?t=${Date.now()}`;

  const load = (): Promise<void> => {
    if (window.__CALLRAIL_LOADED__) return window.__CALLRAIL_LOADED__;
    
    window.__CALLRAIL_LOADED__ = new Promise<void>((resolve, reject) => {
      const s = document.createElement('script');
      s.src = SRC;
      s.async = true;
      s.onload = () => {
        console.log('CallRail script loaded');
        resolve();
      };
      s.onerror = (e) => {
        console.error('CallRail script failed to load:', e);
        reject(e);
      };
      document.head.appendChild(s);
    });
    
    return window.__CALLRAIL_LOADED__;
  };

  const performSwap = () => {
    if (window.__CALLRAIL_SWAPPED__) return;
    
    try {
      console.log('Attempting CallRail swap...');
      window.CallTrk?.swap?.();
      window.__CALLRAIL_SWAPPED__ = true;
      console.log('CallRail swap completed');
    } catch (error) {
      console.error('Error during CallRail swap:', error);
    }
  };

  const deferredSwap = () => {
    // Wait for next tick to ensure DOM is stable
    nextTick(() => {
      if ('requestIdleCallback' in window) {
        (window as Window).requestIdleCallback(performSwap, { timeout: 3000 });
      } else {
        setTimeout(performSwap, 500);
      }
    });
  };

  // Load CallRail script after hydration is complete
  nuxtApp.hook('app:mounted', async () => {
    try {
      await load();
      // Add a small delay to ensure hydration is fully complete
      setTimeout(() => {
        deferredSwap();
      }, 100);
    } catch (error) {
      console.error('Failed to initialize CallRail:', error);
    }
  });

  // Handle route changes
  nuxtApp.hook('page:finish', () => {
    if (window.__CALLRAIL_LOADED__) {
      deferredSwap();
    }
  });

  // Reset swap flag on route start to allow re-swapping
  nuxtApp.hook('page:start', () => {
    window.__CALLRAIL_SWAPPED__ = false;
  });
});