// composables/useVirtualThankYou.ts
import type { Ref } from 'vue'
import { useRoute, onMounted, computed } from '#imports'
import type { DataLayerEvent, UetArray, UetQueueObject } from '~~/types/marketing-globals';

type SuccessRef = Ref<{ success: boolean; message: string; score?: number } | null>

interface VirtualThankYouOptions {
  /** Path segment appended to current route (default: 'thank-you') */
  slug?: string
  /** Page title sent to analytics (default: 'Thank You') */
  pageTitle?: string
  /** Milliseconds to auto-revert URL (null/0 to disable). Default: 5000 */
  revertAfterMs?: number | null
  /** Extra key/values to include in analytics payloads */
  extraData?: Record<string, unknown>
  /** Fire GA4 via gtag if present (default: true) */
  fireGtag?: boolean
  /** Fire GTM via dataLayer if present (default: true) */
  fireGTM?: boolean
  /** Fire Meta Pixel 'Lead' if present (default: false) */
  fireFbq?: boolean
  /** Fire Microsoft UET (virtual page + optional event). Default: false */
  fireUet?: boolean
  /** UET custom event name (used when fireUet). Default: 'ContactSubmit' */
  uetEventName?: string
  /** Extra params for UET custom event */
  uetEventParams?: Record<string, unknown>
  /** If true, set successRef when landing directly on /thank-you (default: true) */
  autoSetSuccessOnThankYou?: boolean
  /** Provide your submitResult ref if you want auto-set on direct /thank-you visits */
  successRef?: SuccessRef
  /** Message to set in successRef (default: 'Message sent successfully!') */
  successMessage?: string
}

export function useVirtualThankYou(opts: VirtualThankYouOptions = {}) {
  const route = useRoute()

  const slug = opts.slug ?? 'thank-you'
  const pageTitle = opts.pageTitle ?? 'Thank You'
  const revertAfterMs = opts.revertAfterMs ?? 5000
  const fireGtag = opts.fireGtag ?? true
  const fireGTM = opts.fireGTM ?? true
  const fireFbq = opts.fireFbq ?? false
  const fireUet = opts.fireUet ?? false
  const uetEventName = opts.uetEventName ?? 'ContactSubmit'
  const uetEventParams = opts.uetEventParams ?? { source: 'Virtual Thank You' }
  const successMessage = opts.successMessage ?? 'Message sent successfully!'
  const autoSet = opts.autoSetSuccessOnThankYou ?? true

  const isThankYou = computed(() => {
    const p = route.path.endsWith('/') ? route.path.slice(0, -1) : route.path
    return p.endsWith(`/${slug}`)
  })

  // Base path is current path without trailing /slug
  const basePath = computed(() => {
    let p = route.path.replace(/\/$/, '')
    const suffix = `/${slug}`
    if (p.endsWith(suffix)) p = p.slice(0, -suffix.length)
    return p || '/'
  })

  onMounted(() => {
    if (!import.meta.client) return
    if (autoSet && isThankYou.value && opts.successRef) {
      opts.successRef.value = { success: true, message: successMessage }
    }
  })

  function trigger() {
    if (!import.meta.client) return

    const thankPath = `${basePath.value.replace(/\/$/, '')}/${slug}`
    const page_location = location.origin + thankPath
    const page_path = thankPath

    // 1) Replace URL without navigation
    history.replaceState({ contactSubmitted: true }, '', thankPath)

    // 2) Analytics — GTM (dataLayer)
    if (fireGTM) {
      if (!window.dataLayer) window.dataLayer = []
      const payload: DataLayerEvent = {
        event: 'virtual_pageview',
        page_location,
        page_path,
        page_title: pageTitle,
        ...(opts.extraData ?? {})
      }
      window.dataLayer.push(payload)
    }

    // 2b) Analytics — GA4 via gtag
    if (fireGtag && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: pageTitle,
        page_location,
        page_path,
        ...(opts.extraData ?? {})
      })
    }

    // 2c) Analytics — Meta Pixel
    if (fireFbq && typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', { source: 'Virtual Thank You', ...(opts.extraData ?? {}) })
    }

    // 2d) Analytics — Microsoft UET
    if (fireUet) {
      safeUetPushPageLoad()
      safeUetPushEvent(uetEventName, {
        page_path,
        page_title: pageTitle,
        ...(opts.extraData ?? {}),
        ...(uetEventParams ?? {})
      })
    }

    // 3) Optional revert to base path
    if (revertAfterMs && revertAfterMs > 0) {
      setTimeout(revert, revertAfterMs)
    }
  }

  function revert() {
    if (!import.meta.client) return
    history.replaceState({}, '', basePath.value || '/')
  }

  // -------------------- UET helpers (no `any`) --------------------
  function safeUetPushPageLoad(): void {
    if (!import.meta.client) return
    const q = window.uetq
    if (!q) return

    if (Array.isArray(q)) {
      (q as UetArray).push(['pageLoad'])
      return
    }
    if ('push' in q && typeof (q as UetQueueObject).push === 'function') {
      ;(q as UetQueueObject).push('pageLoad')
    }
  }

  function safeUetPushEvent(name: string, params: Record<string, unknown>): void {
    if (!import.meta.client) return
    const q = window.uetq
    if (!q) return

    const tuple: ['event', string, Record<string, unknown>?] = ['event', name, params]

    if (Array.isArray(q)) {
      (q as UetArray).push(tuple)
      return
    }
    if ('push' in q && typeof (q as UetQueueObject).push === 'function') {
      ;(q as UetQueueObject).push(...tuple)
    }
  }

  return {
    isThankYou,
    basePath,
    trigger,
    revert
  }
}
