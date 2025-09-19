// plugins/marketing.ts
import { defineNuxtPlugin, useRuntimeConfig, useHead } from '#app'

// Minimal script type covering only what we use (no external deps)
type TagPosition = 'head' | 'bodyOpen' | 'bodyClose'
interface ScriptTag {
  src?: string
  async?: boolean
  defer?: boolean
  key?: string
  tagPosition?: TagPosition
  children?: string
}

type GtagFn = {
  (command: 'js', date: Date): void
  (command: 'config' | 'event', idOrAction: string, params?: Record<string, unknown>): void
}

type UetPageLoadTuple = ['pageLoad']
type UetEventTuple = ['event', string, Record<string, unknown>?]
interface UetQueueObject {
  push: (...args: UetPageLoadTuple | UetEventTuple) => number
}

export default defineNuxtPlugin((nuxtApp) => {
  const { public: pub } = useRuntimeConfig()
  const gaId = pub.googleAnalyticsId
  const uetId = pub.microsoftUetId

  if (!gaId && !uetId) return

  // ---- HEAD SCRIPTS (SSR-visible) ----
  const scripts: ScriptTag[] = []

  // GA4 loader + init
  if (gaId) {
    scripts.push(
      { src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`, async: true, tagPosition: 'head' },
      {
        key: 'ga-init',
        tagPosition: 'head',
        // If you use a strict CSP, add a nonce or move to an external file.
        children: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){ window.dataLayer.push(arguments); }
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${gaId}', { send_page_view: false });
        `
      }
    )
  }

  // Microsoft UET loader + init (SPA auto tracking enabled)
  if (uetId) {
    scripts.push(
      { src: 'https://bat.bing.com/bat.js', async: true, defer: true, tagPosition: 'head' },
      {
        key: 'uet-init',
        tagPosition: 'head',
        children: `
          (function(){
            window.uetq = window.uetq || [];
            var u = new UET({ ti: "${uetId}", enableAutoSpaTracking: true });
            if (Array.isArray(window.uetq)) {
              window.uetq.forEach(function(args){ u.push.apply(u, args); });
            }
            window.uetq = u;
            window.uetq.push('pageLoad');
          })();
        `
      }
    )
  }

  // ✅ Factory shim so TS widens the type and accepts { script: ... }
  const makeHead = () => ({ script: scripts } as unknown as Parameters<typeof useHead>[0])
  useHead(makeHead())

  // ---- SPA ROUTE PAGEVIEW HOOKS ----

  // GA4: send page_view on each route change (send_page_view:false above)
  if (gaId) {
    nuxtApp.hook('page:finish', () => {
      const path = window.location.pathname + window.location.search + window.location.hash
      const gtag = (window as unknown as { gtag?: GtagFn }).gtag
      if (typeof gtag === 'function') {
        gtag('event', 'page_view', { page_location: window.location.href, page_path: path })
      }
    })
  }

  // UET: auto SPA is enabled; optionally push explicitly too
  if (uetId) {
    nuxtApp.hook('page:finish', () => {
      const q = (window as unknown as { uetq?: UetQueueObject | unknown[] }).uetq
      if (q && typeof (q as UetQueueObject).push === 'function') {
        ;(q as UetQueueObject).push('pageLoad')
      }
    })
  }
})
