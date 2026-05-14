// plugins/marketing.client.ts
import { defineNuxtPlugin, useRuntimeConfig, useRouter, useRoute } from '#app'

type UetCtor = new (opts: { ti: string; enableAutoSpaTracking?: boolean }) => UetQueueObject

export default defineNuxtPlugin(() => {
  if (import.meta.server) return

  const { public: pub } = useRuntimeConfig()

  const gtmId = pub.googleTagManagerId as string | undefined
  const uetId = pub.microsoftUetId as string | undefined

  if (!gtmId && !uetId) return

  const router = useRouter()
  const route = useRoute()

  const w = window as Window & {
    __MKT_LOADED__?: boolean
  }

  const markLoaded = (): void => {
    w.__MKT_LOADED__ = true
  }

  const isLoaded = (): boolean => {
    return w.__MKT_LOADED__ === true
  }

  const isAdmin = (p: string): boolean => p.startsWith('/admin')

  const whenIdle = (fn: () => void, timeout = 1500): void => {
    const ric = window.requestIdleCallback

    if (typeof ric === 'function') {
      ric(() => fn(), { timeout })
    } else {
      window.setTimeout(fn, timeout)
    }
  }

  const loadScript = (src: string): Promise<void> =>
    new Promise<void>((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve()
        return
      }

      const s = document.createElement('script')

      s.src = src
      s.async = true

      s.onload = () => resolve()
      s.onerror = () => reject(new Error(`Failed to load ${src}`))

      document.head.appendChild(s)
    })

  // ---------- GTM INIT
  const initGtm = (): void => {
    if (!gtmId) return

    window.dataLayer = window.dataLayer || []

    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    })

    const script = document.createElement('script')

    script.async = true
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`

    document.head.appendChild(script)

    // noscript iframe
    const noscript = document.createElement('noscript')

    noscript.innerHTML = `
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
        height="0"
        width="0"
        style="display:none;visibility:hidden"
      ></iframe>
    `

    document.body.prepend(noscript)
  }

  // ---------- MICROSOFT UET
  const initUet = async (): Promise<void> => {
    if (!uetId) return

    window.uetq = window.uetq || []

    await loadScript('https://bat.bing.com/bat.js')

    let tries = 0

    await new Promise<void>((resolve, reject) => {
      const t = setInterval(() => {
        try {
          const ctor = (window as unknown as { UET?: UetCtor }).UET

          if (typeof ctor === 'function') {
            const queued = window.uetq

            const live: UetQueueObject = new ctor({
              ti: uetId,
              enableAutoSpaTracking: true
            })

            if (Array.isArray(queued)) {
              queued.forEach((tuple) => {
                if (Array.isArray(tuple)) {
                  live.push(...(tuple as unknown[]))
                }
              })
            }

            window.uetq = live
            window.uetq.push('pageLoad')

            clearInterval(t)

            resolve()

            return
          }
        } catch (e) {
          clearInterval(t)

          reject(e instanceof Error ? e : new Error('UET init failed'))

          return
        }

        if (++tries > 40) {
          clearInterval(t)
          reject(new Error('UET not available'))
        }
      }, 150)
    })
  }

  // ---------- MAIN BOOT
  const boot = async (): Promise<void> => {
    if (gtmId) initGtm()

    if (uetId) {
      await initUet()
    }

    markLoaded()
  }

  window.addEventListener('load', () => {
    if (isLoaded() || isAdmin(route.path)) return

    whenIdle(() => {
      void boot()
    }, 1500)
  }, { once: true })

  router.afterEach((to) => {
    if (!isLoaded() && !isAdmin(to.path)) {
      whenIdle(() => {
        void boot()
      }, 1000)
    }

    // SPA route tracking for GTM
    window.dataLayer?.push({
      event: 'page_view',
      page_path: to.fullPath
    })
  })
})