// plugins/aminos.client.ts
export default defineNuxtPlugin(() => {
  if (import.meta.server) return

  const BOT_ID = '27311' as const
  const SRC = 'https://app.aminos.ai/js/chat_plugin.js' as const
  const LOADED = '__aminosLoaded' as const
  const DISPATCHED = '__aminosLoadDispatched' as const
  type W = Window & { [LOADED]?: boolean; [DISPATCHED]?: boolean }
  const w = window as W

  let viewportObserver: MutationObserver | null = null
  const cleanViewports = () => {
    const metas = document.querySelectorAll<HTMLMetaElement>('meta[name="viewport"]')
    for (let i = 1; i < metas.length; i++) metas[i]?.remove()
  }
  const watchViewports = () => {
    if (viewportObserver) return
    viewportObserver = new MutationObserver(cleanViewports)
    viewportObserver.observe(document.head, { childList: true })
  }
  const dispatchLoadOnce = () => {
    if (w[DISPATCHED]) return
    w[DISPATCHED] = true
    w.dispatchEvent(new Event('load'))
  }
  const injectAminos = () => {
    if (w[LOADED]) return
    w[LOADED] = true
    const s = document.createElement('script')
    s.id = 'aminos-chat-loader'
    s.src = SRC
    s.async = true
    s.setAttribute('data-bot-id', BOT_ID)
    s.dataset.botId = BOT_ID
    s.onload = () => {
      cleanViewports()
      setTimeout(cleanViewports, 300)
      setTimeout(cleanViewports, 1000)
      watchViewports()
      // Aminos waits for window.load; we synthesize it now.
      dispatchLoadOnce()
    }
    document.body.appendChild(s)
  }

  const attachInteractionOnce = () => {
    const intent = () => {
      removeListeners()
      // ensure we’re post-load before injecting
      if (document.readyState === 'complete') injectAminos()
      else window.addEventListener('load', injectAminos, { once: true })
    }
    const events: (keyof WindowEventMap)[] = ['click','touchstart','keydown','mousemove','wheel','scroll']
    const removeListeners = () => events.forEach(e => window.removeEventListener(e, intent as EventListener))
    events.forEach(e => window.addEventListener(e, intent as EventListener, { passive: true }))
  }

  // Wait for full page load, THEN listen for first interaction
  if (document.readyState === 'complete') attachInteractionOnce()
  else window.addEventListener('load', attachInteractionOnce, { once: true })

  // IMPORTANT: no preconnect, no idle timers here.
})
