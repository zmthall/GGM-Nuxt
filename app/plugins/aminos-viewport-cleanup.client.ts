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


  const BOT_ID = '27311'
  const SRC    = 'https://app.aminos.ai/js/chat_plugin.js'

  let scriptEl: HTMLScriptElement | null = null
  let viewportObserver: MutationObserver | null = null
  let watchdogTimer: number | null = null
  let adminKillStyleEl: HTMLStyleElement | null = null

  const isAdmin = (path: string) => path.startsWith('/admin')

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
    viewportObserver?.disconnect()
    viewportObserver = null
  }

  // ---------- admin kill switch (CSS hide as last resort) ----------
  const addAdminKillCSS = (): void => {
    if (adminKillStyleEl) return
    const css = `
      #aminos-chat, #aminos-chat-plugin,
      [id*="aminos" i], [class*="aminos" i],
      iframe[src*="aminos" i] { display:none !important; visibility:hidden !important; }
    `
    const st = document.createElement('style')
    st.id = 'aminos-kill-css'
    st.textContent = css
    document.head.appendChild(st)
    adminKillStyleEl = st
  }
  const removeAdminKillCSS = (): void => {
    adminKillStyleEl?.remove()
    adminKillStyleEl = null
  }

  // ---------- teardown ----------
  function teardown(): void {
    if (watchdogTimer !== null) {
      window.clearTimeout(watchdogTimer)
      watchdogTimer = null
    }

    // remove our loader
    if (scriptEl) {
      scriptEl.remove()
      scriptEl = null
    }

    stopViewportObserver()

    // remove obvious artifacts
    const obvious = [
      '#aminos-chat', '#aminos-chat-plugin',
      `script[src*="app.aminos.ai"]`, `link[href*="app.aminos.ai"]`,
      `iframe[src*="aminos"]`,
      `[data-bot-id="${BOT_ID}"]`,
      `#aminos-chat-loader`,
    ]
    document.querySelectorAll(obvious.join(',')).forEach(el => el.remove())

    // remove custom elements / shadow hosts / anything “aminos”-ish
    const all = Array.from(document.querySelectorAll<HTMLElement>('*'))
    for (const el of all) {
      const tag   = el.tagName.toLowerCase()
      const id    = (el.id || '').toLowerCase()
      const klass = (typeof el.className === 'string' ? el.className : '').toLowerCase()
      if (tag.includes('aminos') || id.includes('aminos') || klass.includes('aminos')) {
        el.remove()
      }
    }

    // clear globals and localStorage flags
    delete window.Aminos
    delete window.AminosChat
    delete window.AMINOS_BOT_ID

    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i)
      if (key && key.toLowerCase().includes('aminos')) {
        localStorage.removeItem(key)
      }
    }

    removeDuplicateViewports()
  }

  // ---------- mount ----------
  function mount(): void {
    if (scriptEl) return

    window.AMINOS_BOT_ID = BOT_ID

    const s = document.createElement('script')
    s.id = 'aminos-chat-loader'
    s.src = SRC
    s.defer = true
    s.setAttribute('data-bot-id', BOT_ID)
    s.dataset.botId = BOT_ID

    s.addEventListener('load', () => {
      removeDuplicateViewports()
      window.setTimeout(removeDuplicateViewports, 300)
      window.setTimeout(removeDuplicateViewports, 1000)
      startViewportObserver()

      if (watchdogTimer !== null) window.clearTimeout(watchdogTimer)
      watchdogTimer = window.setTimeout(() => {
        const widget = document.querySelector(
          '#aminos-chat, #aminos-chat-plugin, iframe[src*="aminos"], [class*="aminos"]'
        )
        if (!widget) {
          // eslint-disable-next-line no-console
          console.warn('[Aminos] loader loaded, but no widget detected (allow-list/CSP/ad-block?)')
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

  // ---------- initial + navigations ----------
  const toggleForPath = (path: string): void => {
    // Always teardown first so nothing lingers
    teardown()
    if (!isAdmin(path)) {
      removeAdminKillCSS()
      mount()
    } else {
      addAdminKillCSS()
    }
  }

  const runInitial = (): void => toggleForPath(route.path)

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    runInitial()
  } else {
    window.addEventListener('DOMContentLoaded', runInitial, { once: true })
  }

  router.afterEach((to) => {
    toggleForPath(to.path)
  })
})
