declare global {
  interface Window {
    Aminos?: unknown
    AminosChat?: unknown
    AMINOS_BOT_ID?: string
  }
}

// plugins/aminos-and-viewport.client.ts
export default defineNuxtPlugin(() => {
  const router = useRouter()
  const route  = useRoute()

  // Extend Window so we can set/clear optional globals safely

  const BOT_ID = '27311'
  const SRC    = 'https://app.aminos.ai/js/chat_plugin.js'

  let scriptEl: HTMLScriptElement | null = null
  let viewportObserver: MutationObserver | null = null
  let watchdogTimer: number | null = null

  const shouldMount = (path: string) => !path.startsWith('/admin')

  // ---------- viewport de-dupe ----------
  const removeDuplicateViewports = (): void => {
    const metas = document.querySelectorAll<HTMLMetaElement>('meta[name="viewport"]')
    for (let i = 1; i < metas.length; i++) metas[i]?.remove()
  }

  const startViewportObserver = (): void => {
    if (viewportObserver) return
    viewportObserver = new MutationObserver(() => removeDuplicateViewports())
    viewportObserver.observe(document.head, { childList: true })
  }

  const stopViewportObserver = (): void => {
    if (viewportObserver) {
      viewportObserver.disconnect()
      viewportObserver = null
    }
  }

  // ---------- chat mount / teardown ----------
  function mount(): void {
    if (scriptEl) return

    // Some loaders read a global flag/id
    window.AMINOS_BOT_ID = BOT_ID

    const s = document.createElement('script')
    s.id = 'aminos-chat-loader'
    s.src = SRC
    s.defer = true
    s.setAttribute('data-bot-id', BOT_ID)
    // dataset key for `data-bot-id` is camel-cased `botId`
    s.dataset.botId = BOT_ID

    s.addEventListener('load', () => {
      removeDuplicateViewports()
      window.setTimeout(removeDuplicateViewports, 300)
      window.setTimeout(removeDuplicateViewports, 1000)
      startViewportObserver()

      // watchdog: ensure widget injected something visible
      if (watchdogTimer !== null) window.clearTimeout(watchdogTimer)
      watchdogTimer = window.setTimeout(() => {
        const widget = document.querySelector(
          '#aminos-chat, #aminos-chat-plugin, iframe[src*="aminos"], [class*="aminos"]'
        )
        if (!widget) {
          // eslint-disable-next-line no-console
          console.warn('[Aminos] loader loaded, but no widget detected (CSP/ad-blocker?)')
        }
      }, 1500)
    })

    s.addEventListener('error', (e) => {
      // eslint-disable-next-line no-console
      console.error('[Aminos] script failed to load:', e)
    })

    document.body.appendChild(s)
    scriptEl = s
  }

  function teardown(): void {
    if (watchdogTimer !== null) {
      window.clearTimeout(watchdogTimer)
      watchdogTimer = null
    }

    if (scriptEl) {
      scriptEl.remove()
      scriptEl = null
    }

    stopViewportObserver()

    // remove artifacts
    const selectors = [
      '#aminos-chat',
      '#aminos-chat-plugin',
      'iframe[src*="aminos"]',
      'script[src*="app.aminos.ai"]',
      'link[href*="app.aminos.ai"]',
      `[data-bot-id="${BOT_ID}"]`,
      `[id="aminos-chat-loader"]`,
      '[class*="aminos"]',
    ]
    document.querySelectorAll(selectors.join(',')).forEach((el) => el.remove())

    // clear optional globals
    delete window.Aminos
    delete window.AminosChat
    delete window.AMINOS_BOT_ID

    removeDuplicateViewports()
  }

  // initial mount
  const runInitial = (): void => {
    if (shouldMount(route.path)) mount()
    else teardown()
  }
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    runInitial()
  } else {
    window.addEventListener('DOMContentLoaded', runInitial, { once: true })
  }

  // SPA navigations
  router.afterEach((to) => {
    if (shouldMount(to.path)) mount()
    else teardown()
  })
})
