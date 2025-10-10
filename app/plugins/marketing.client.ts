// plugins/marketing.client.ts
import { defineNuxtPlugin, useRuntimeConfig, useRouter, useRoute } from '#app'

// Local helper types (no `any`)
type GtagConfigFn = (command: 'config', id: string, params?: Record<string, unknown>) => void
type GtagJsFn     = (command: 'js', date: Date) => void
type GtagUnion    = GtagConfigFn | GtagJsFn

type UetCtor = new (opts: { ti: string; enableAutoSpaTracking?: boolean }) => UetQueueObject

export default defineNuxtPlugin(() => {
  if (import.meta.server) return

  const { public: pub } = useRuntimeConfig()
  const gaId  = pub.googleAnalyticsId as string | undefined
  const uetId = pub.microsoftUetId     as string | undefined
  if (!gaId && !uetId) return

  const router = useRouter()
  const route  = useRoute()

  // --- flags on window without touching global Window type
  const w = window as Window & {
    __MKT_LOADED__?: boolean
    __MKT_HOOKED__?: boolean
  }
  const markLoaded = (): void => { w.__MKT_LOADED__ = true }
  const isLoaded   = (): boolean => w.__MKT_LOADED__ === true

  const isAdmin = (p: string): boolean => p.startsWith('/admin')

  // --- schedule helpers
  const whenIdle = (fn: () => void, timeout = 1500): void => {
    const ric = window.requestIdleCallback
    if (typeof ric === 'function') ric(() => fn(), { timeout })
    else window.setTimeout(fn, timeout)
  }

  const loadScript = (src: string): Promise<void> =>
    new Promise<void>((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) { resolve(); return }
      const s = document.createElement('script')
      s.src = src
      s.async = true
      s.onload = () => resolve()
      s.onerror = () => reject(new Error(`Failed to load ${src}`))
      document.head.appendChild(s)
    })

  // ---------- GA4 helpers (no `any`)
  const getGtagConfig = (): GtagConfigFn | undefined => {
    const g = window.gtag as unknown
    return typeof g === 'function' ? (g as GtagConfigFn) : undefined
  }
  
  const getGtagJs = (): GtagJsFn | undefined => {
    const g = window.gtag as unknown
    return typeof g === 'function' ? (g as GtagJsFn) : undefined
  }

  const ensureGtagBootstrap = (): void => {
    // Ensure dataLayer + gtag exist (the inline stub usually created these already)
    if (!window.dataLayer) window.dataLayer = []
    if (!window.gtag) {
      // Minimal shim, typed via our call sites; no `any`
      const shim = ((..._args: unknown[]): void => {
        (window.dataLayer as DataLayerEvent[]).push({ event: 'gtag-shim' })
      }) as unknown as GtagUnion
      window.gtag = (shim as unknown) as GtagFn
    }
  }

  // ---------- Microsoft UET (typed, no `any`)
  const initUet = async (): Promise<void> => {
    if (!uetId) return
    // before load, it's an array
    window.uetq = window.uetq || []
    let tries = 0

    await new Promise<void>((resolve, reject) => {
      const t = setInterval(() => {
        try {
          const ctor = (window as unknown as { UET?: UetCtor }).UET
          if (typeof ctor === 'function') {
            const queued = window.uetq
            const live: UetQueueObject = new ctor({ ti: uetId, enableAutoSpaTracking: true })

            if (Array.isArray(queued)) {
              queued.forEach((tuple) => {
                if (Array.isArray(tuple)) live.push(...(tuple as unknown[]))
              })
            }
            window.uetq = live
            window.uetq.push('pageLoad')
            clearInterval(t); resolve(); return
          }
        } catch (e) {
          clearInterval(t); reject(e instanceof Error ? e : new Error('UET init failed')); return
        }
        if (++tries > 40) { clearInterval(t); reject(new Error('UET not available')); }
      }, 150)
    })
  }

  // ---------- main: load after load→idle; skip /admin
  const boot = async (): Promise<void> => {
    const tasks: Promise<void>[] = []
    if (gaId)  tasks.push(loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`))
    if (uetId) tasks.push(loadScript('https://bat.bing.com/bat.js'))
    await Promise.all(tasks)

    // GA: keep bounce from stub, avoid double initial view, add SPA hook
    if (gaId) {
      ensureGtagBootstrap()
      const gtagJs   = getGtagJs()
      const gtagConf = getGtagConfig()
      if (gtagJs)   gtagJs('js', new Date())
      if (gtagConf) gtagConf('config', gaId, { send_page_view: false })
    }

    if (uetId) await initUet()
    markLoaded()
  }

  window.addEventListener('load', () => {
    if (isLoaded() || isAdmin(route.path)) return
    whenIdle(() => { void boot() }, 1500) // ~1.5s after load preserves bounce fidelity
  }, { once: true })

  // If user leaves /admin before libs loaded, load them then
  router.afterEach((to) => {
    if (!isLoaded() && !isAdmin(to.path)) {
      whenIdle(() => { void boot() }, 1000)
    } 
  })
})