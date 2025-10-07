// plugins/aminos.client.ts
export default defineNuxtPlugin(() => {
  if (import.meta.server) return;

  const BOT_ID = '27311';
  const SRC = 'https://app.aminos.ai/js/chat_plugin.js';

  // ---- route gate (optional) -----------------------------------------------
  const route = useRoute();
  const shouldLoadHere =
    !route.path.startsWith('/admin'); // adjust if you want it only on certain pages
  if (!shouldLoadHere) return;

  // ---- one-time guards ------------------------------------------------------
  const w = window as Window & { __AMINOS_LOADED__?: boolean };
  if (w.__AMINOS_LOADED__) return;

  let mounted = false;
  let viewportObserver: MutationObserver | null = null;

  // ---- preconnect for faster TLS/DNS ---------------------------------------
  if (!document.querySelector('link[rel="preconnect"][href="https://app.aminos.ai"]')) {
    const l = document.createElement('link');
    l.rel = 'preconnect';
    l.href = 'https://app.aminos.ai';
    l.crossOrigin = 'anonymous';
    document.head.appendChild(l);
  }

  // ---- hide launcher until first interaction (optional but nice) -----------
  if (!document.getElementById('aminos-visibility-style')) {
    const style = document.createElement('style');
    style.id = 'aminos-visibility-style';
    style.textContent = `html:not(.chat-visible) #chat_app{visibility:hidden}`;
    document.head.appendChild(style);

    const show = () => document.documentElement.classList.add('chat-visible');
    ['pointerdown','touchstart','keydown','scroll'].forEach(ev =>
      window.addEventListener(ev, show, { once: true, passive: true })
    );
    // idle fallback so bots/tests still see it
    if ('requestIdleCallback' in window) {
      requestIdleCallback(show, { timeout: 6000 });
    } else {
      setTimeout(show, 6000);
    }
  }

  // ---- viewport meta deduper ------------------------------------------------
  const removeDuplicateViewports = (): void => {
    const metas = document.querySelectorAll<HTMLMetaElement>('meta[name="viewport"]');
    for (let i = 1; i < metas.length; i++) metas[i]?.remove();
  };
  const startViewportObserver = (): void => {
    if (viewportObserver) return;
    viewportObserver = new MutationObserver(() => removeDuplicateViewports());
    viewportObserver.observe(document.head, { childList: true });
  };

  // ---- ensure container exists before their loader runs ---------------------
  const ensureContainer = () => {
    let host = document.getElementById('chat_app');
    if (!host) {
      host = document.createElement('div');
      host.id = 'chat_app';
      host.setAttribute('data-bot-id', BOT_ID);
      document.body.appendChild(host);
    }
  };

  // ---- inject their script at DOMContentLoaded/interactive -----------------
  const mountScriptOnce = (): void => {
    if (mounted) return;
    mounted = true;

    ensureContainer();

    if (!document.getElementById('aminos-chat-loader')) {
      const s = document.createElement('script');
      s.id = 'aminos-chat-loader';
      s.src = SRC;
      s.defer = true;                 // executes after parse, still before load
      s.setAttribute('data-bot-id', BOT_ID);
      s.dataset.botId = BOT_ID;
      document.body.appendChild(s);
    }

    // clean dup viewport now + shortly after, then watch
    removeDuplicateViewports();
    setTimeout(removeDuplicateViewports, 300);
    setTimeout(removeDuplicateViewports, 1000);
    startViewportObserver();

    w.__AMINOS_LOADED__ = true;
  };

  const run = (): void => {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      // interactive: still before 'load' -> good for vendor boot
      mountScriptOnce();
    } else {
      window.addEventListener('DOMContentLoaded', () => mountScriptOnce(), { once: true });
    }
  };

  run();
});
