// plugins/aminos.client.ts
export default defineNuxtPlugin(() => {
  const BOT_ID = '27311'
  const SRC = 'https://app.aminos.ai/js/chat_plugin.js'
  let loaded = false

  const load = () => {
    if (loaded) return
    loaded = true
    const s = document.createElement('script')
    s.id = 'aminos-chat-loader'
    s.src = SRC
    s.async = true
    s.defer = true
    s.dataset.botId = BOT_ID
    document.body.appendChild(s)
  }

  const bootOnFirstInteraction = () => {
    ['pointerdown','keydown','touchstart','scroll'].forEach(ev =>
      window.addEventListener(ev, load, { once: true, passive: true })
    )
    // safety net: idle fallback
    if ('requestIdleCallback' in window) {
      requestIdleCallback(load, { timeout: 7000 })
    } else {
      setTimeout(load, 7000)
    }
  }

  window.addEventListener('load', bootOnFirstInteraction, { once: true })
})
