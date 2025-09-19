// plugins/marketing.client.ts
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin(() => {
  const { public: pub } = useRuntimeConfig()
  const gaId = pub.googleAnalyticsId as string | undefined
  const uetId = pub.microsoftUetId as string | undefined
  const nonce = pub.cspNonce as string | undefined

  if (!gaId && !uetId) return

  // one-time guard (avoid HMR double-runs)
  type MarkedWindow = Window & { __MARKETING_LOADED__?: boolean }
  const wf = window as MarkedWindow
  if (wf.__MARKETING_LOADED__) return
  wf.__MARKETING_LOADED__ = true

  // helper: add inline script with nonce
  const addInline = (code: string, key?: string) => {
    // (optional) avoid duplicate by data-key
    if (key && Array.from(document.scripts).some(s => (s as HTMLScriptElement).dataset.key === key)) return
    const s = document.createElement('script')
    s.type = 'text/javascript'
    if (nonce) s.setAttribute('nonce', nonce)
    if (key) s.dataset.key = key
    s.textContent = code
    document.head.appendChild(s)
  }

  // ---------- GA4 inline init (no external load here; that's in nuxt.config) ----------
  if (gaId) {
    addInline(`
      (function(){
        window.dataLayer = window.dataLayer || [];
        function gtag(){ dataLayer.push(arguments); }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${gaId}');
      })();
    `, 'ga-init-inline')
  }

  // ---------- UET post-load swap (no external load here; that's in nuxt.config) ----------
  if (uetId) {
    // If bat.js is already present, run the swap once it’s loaded; otherwise do nothing here
    // (the SSR-injected <script src="https://bat.bing.com/bat.js"> will handle loading).
    const tryInitUet = () => {
      try {
        // @ts-expect-error UET is global from bat.js
        if (typeof window.UET === 'function') {
          // If window.uetq is still an array, flush into live queue
          const q = (window as unknown as { uetq?: unknown }).uetq
          // @ts-expect-error UET is a constructor
          const u = new window.UET({ ti: "${uetId}", enableAutoSpaTracking: true })
          if (Array.isArray(q)) {
            q.forEach((args: unknown) => {
              if (Array.isArray(args)) (u.push as (...a: unknown[]) => number)(...(args as unknown[]))
            })
          }
          ;(window as unknown as { uetq: unknown }).uetq = u
          // initial page load event (auto SPA handles future navs)
          // @ts-expect-error queue object
          window.uetq.push('pageLoad')
          return true
        }
      } catch {/* swallow */}
      return false
    }

    // If already loaded, init immediately; else wait for load
    if (!tryInitUet()) {
      // Wait for the SSR <script src="bat.js"> to finish loading
      // (a simple poll is enough; avoids adding another onload listener to the tag)
      const t = setInterval(() => {
        if (tryInitUet()) clearInterval(t)
      }, 150)
      // Optional: stop polling after ~5s
      setTimeout(() => clearInterval(t), 5000)
    }
  }
})
