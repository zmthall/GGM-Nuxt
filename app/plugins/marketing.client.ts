// plugins/marketing.client.ts
import { defineNuxtPlugin, useRuntimeConfig, useRouter, useRoute } from '#app'

export default defineNuxtPlugin(() => {
  if (import.meta.server) return

  const { public: pub } = useRuntimeConfig()
  const gaId  = pub.googleAnalyticsId as string | undefined
  const uetId = pub.microsoftUetId     as string | undefined

  if (!gaId && !uetId) return

  const router = useRouter()
  const route  = useRoute()

  const whenIdle = (fn: () => void, timeout = 4000): void => {
    const ric = window.requestIdleCallback
    if (typeof ric === 'function') ric(() => fn(), { timeout })
    else window.setTimeout(fn, timeout)
  }

  const loadScript = (src: string): Promise<void> =>
    new Promise<void>((resolve, reject) => {
      const s = document.createElement('script')
      s.src = src
      s.async = true
      s.onload = () => resolve()
      s.onerror = () => reject(new Error(`Failed to load ${src}`))
      document.head.appendChild(s)
    })

  const markLoaded = () => { (window as typeof window & { __MKT_LOADED__?: boolean }).__MKT_LOADED__ = true }
  const isLoaded   = () =>  (window as typeof window & { __MKT_LOADED__?: boolean }).__MKT_LOADED__ === true
  const isAdmin    = (p: string) => p.startsWith('/admin')

  // --- NEW: instantiate UET once bat.js is present ---
  const initUet = async (): Promise<void> => {
    if (!uetId) return
    // ensure there is a queue to migrate
    window.uetq = window.uetq || []

    // wait up to ~6s for the constructor
    let tries = 0
    await new Promise<void>((resolve, reject) => {
      const t = setInterval(() => {
        try {
          // @ts-expect-error provided by bat.js
          if (typeof window.UET === 'function') {
            const queued = window.uetq
            // @ts-expect-error constructor exists at runtime
            const live = new window.UET({ ti: uetId, enableAutoSpaTracking: true })
            if (Array.isArray(queued)) {
              queued.forEach(args => {
                if (Array.isArray(args)) (live.push as (...a: unknown[]) => number)(...args)
              })
            }
            window.uetq = live
            ;(window.uetq as { push: (...a: unknown[]) => number }).push('pageLoad')
            clearInterval(t); resolve(); return
          }
        } catch (e) { clearInterval(t); reject(e as Error); return }
        if (++tries > 40) { clearInterval(t); reject(new Error('UET not available')); }
      }, 150)
    })
  }

  // Load heavy libs *once* after load+idle (unless we’re on /admin)
  window.addEventListener('load', () => {
    if (isLoaded() || isAdmin(route.path)) return
    whenIdle(async () => {
      const tasks: Promise<void>[] = []
      if (gaId)  tasks.push(loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`))
      if (uetId) tasks.push(loadScript('https://bat.bing.com/bat.js'))
      try {
        await Promise.all(tasks)
        // 🔑 make the UET tag real so Tag Helper sees it
        await initUet()
      } finally {
        markLoaded()
      }
    }, 1500)
  }, { once: true })

  // If user navigates from /admin → public before libs loaded, load them then
  router.afterEach((to) => {
    if (!isLoaded() && !isAdmin(to.path)) {
      whenIdle(async () => {
        const tasks: Promise<void>[] = []
        if (gaId)  tasks.push(loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`))
        if (uetId) tasks.push(loadScript('https://bat.bing.com/bat.js'))
        try {
          await Promise.all(tasks)
          await initUet()
        } finally {
          markLoaded()
        }
      }, 1000)
    }
  })
})
