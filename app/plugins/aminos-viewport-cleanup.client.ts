// plugins/aminos.client.ts
export default defineNuxtPlugin(() => {
  const BOT_ID = '27311'
  const SRC = 'https://app.aminos.ai/js/chat_plugin.js'
  let loaded = false

  const ensureContainer = () => {
    // Some loaders look for a container; harmless if not needed
    if (!document.getElementById('chat_app')) {
      const d = document.createElement('div')
      d.id = 'chat_app'
      document.body.appendChild(d)
    }
  }

  const boot = () => {
    if (loaded) return
    loaded = true

    // (1) make sure we have a container
    ensureContainer()

    // (2) inject in <head> with explicit data attribute
    const s = document.createElement('script')
    s.id = 'aminos-chat-loader'
    s.src = SRC
    s.async = true
    s.defer = true
    s.setAttribute('data-bot-id', BOT_ID)   // explicit attribute
    s.dataset.botId = BOT_ID                // belt & suspenders
    document.head.appendChild(s)

    // (3) if loader waits for DOMContentLoaded, simulate a late boot
    s.addEventListener('load', () => {
      // give their script a tick to attach
      setTimeout(() => {
        // If widget didn't appear, nudge again by re-dispatching DOMContentLoaded
        if (!document.querySelector('#chat_app .sc-launcher')) {
          try {
            document.dispatchEvent(new Event('DOMContentLoaded', { bubbles: true }))
            window.dispatchEvent(new Event('DOMContentLoaded'))
          } catch {
            // silent failure
          }
        }
      }, 50)
    })
  }

  // Load on first interaction, with idle fallback after onload
  const schedule = () => {
    ['pointerdown','keydown','touchstart','scroll'].forEach(ev =>
      window.addEventListener(ev, boot, { once: true, passive: true })
    )
    if ('requestIdleCallback' in window) {
      requestIdleCallback(boot, { timeout: 7000 })
    } else {
      setTimeout(boot, 7000)
    }
  }

  // Preconnect for faster first byte when we finally load it
  const link = document.createElement('link')
  link.rel = 'preconnect'
  link.href = 'https://app.aminos.ai'
  link.crossOrigin = 'anonymous'
  document.head.appendChild(link)

  window.addEventListener('load', schedule, { once: true })
})
