// plugins/aminos.client.ts
export default defineNuxtPlugin(() => {
  if (import.meta.server) return;

  const BOT_ID = '27311';
  const SRC = 'https://app.aminos.ai/js/chat_plugin.js';

  // one-time guards across navigations/HMR
  const w = window as unknown as Window & {
    __AMINOS_INJECTED__?: boolean;
    __AMINOS_OBSERVER__?: MutationObserver | null;
  };
  if (w.__AMINOS_INJECTED__) return;

  // --- Utilities -------------------------------------------------------------

  // Preconnect for faster DNS/TLS once we do load
  const preconnect = () => {
    if (document.querySelector('link[rel="preconnect"][href^="https://app.aminos.ai"]')) return;
    const l = document.createElement('link');
    l.rel = 'preconnect';
    l.href = 'https://app.aminos.ai';
    l.crossOrigin = 'anonymous';
    document.head.appendChild(l);
  };

  // Ensure the widget container exists before the script evaluates
  const ensureContainer = () => {
    let host = document.getElementById('chat_app');
    if (!host) {
      host = document.createElement('div');
      host.id = 'chat_app';
      // hand the bot id to the container too (some loaders read it here)
      host.setAttribute('data-bot-id', BOT_ID);
      document.body.appendChild(host);
    }
    return host;
  };

  // Some builds of the vendor lib only auto-init on DOMContentLoaded.
  // If we inject late, nudge that event so their boot code runs.
  const nudgeDOMContentLoaded = () => {
    try {
      const ev = new Event('DOMContentLoaded', { bubbles: true });
      document.dispatchEvent(ev);
      window.dispatchEvent(ev);
    } catch { /* ignore */ }
  };

  // Dedupe duplicate <meta name="viewport"> the widget may inject
  const removeDuplicateViewports = () => {
    const metas = Array.from(document.querySelectorAll<HTMLMetaElement>('meta[name="viewport"]'));
    // Keep the first (yours), remove the rest
    for (let i = 1; i < metas.length; i++) metas[i]?.remove();
  };
  const startViewportDeduper = () => {
    if (w.__AMINOS_OBSERVER__) return;
    w.__AMINOS_OBSERVER__ = new MutationObserver(() => removeDuplicateViewports());
    w.__AMINOS_OBSERVER__.observe(document.head, { childList: true });
  };

  // Optional: keep UI hidden until user interacts (no visual distraction)
  // Comment out if you want it visible immediately after load.
  const installVisibilityGate = () => {
    if (document.getElementById('aminos-visibility-style')) return;
    const style = document.createElement('style');
    style.id = 'aminos-visibility-style';
    style.textContent = `html:not(.chat-visible) #chat_app{visibility:hidden}`;
    document.head.appendChild(style);

    const show = () => document.documentElement.classList.add('chat-visible');
    ['pointerdown','touchstart','keydown','scroll'].forEach(ev =>
      window.addEventListener(ev, show, { once: true, passive: true })
    );
    if ('requestIdleCallback' in window) {
      requestIdleCallback(show, { timeout: 6000 });
    } else {
      setTimeout(show, 6000);
    }
  };

  // --- Injection -------------------------------------------------------------

  const injectScriptIntoBody = () =>
    new Promise<void>((resolve, reject) => {
      if (document.getElementById('aminos-chat-loader')) return resolve();

      const s = document.createElement('script');
      s.id = 'aminos-chat-loader';
      s.src = SRC;
      s.async = true;
      s.defer = true;
      s.setAttribute('data-bot-id', BOT_ID); // critical for vendor boot
      document.body.appendChild(s);

      s.onload = () => {
        // Give their script a beat to attach, then nudge if needed
        setTimeout(() => {
          if (!document.querySelector('#chat_app .sc-launcher')) nudgeDOMContentLoaded();
          // Clean up any duplicate viewport tags the script may have added
          removeDuplicateViewports();
          startViewportDeduper();
          resolve();
        }, 50);
      };
      s.onerror = () => reject(new Error('Failed to load Aminos chat script'));
    });

  // Schedule: on first interaction (best for TBT) with idle fallback after load
  const scheduleLoad = () => {
    const boot = async () => {
      if (w.__AMINOS_INJECTED__) return;
      w.__AMINOS_INJECTED__ = true;
      ensureContainer();
      preconnect();
      installVisibilityGate(); // comment out if you don’t want the hide/show behavior
      try { await injectScriptIntoBody(); } catch { /* ignore */ }
    };

    // First interaction
    ['pointerdown','touchstart','keydown','scroll'].forEach(ev =>
      window.addEventListener(ev, boot, { once: true, passive: true })
    );

    // Idle fallback shortly after onload (keeps off LCP/FCP path)
    const idle = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(boot, { timeout: 7000 });
      } else {
        setTimeout(boot, 7000);
      }
    };
    if (document.readyState === 'complete') idle();
    else window.addEventListener('load', idle, { once: true });
  };

  // Kick off
  preconnect();
  scheduleLoad();
});
