// plugins/aminos.client.ts
export default defineNuxtPlugin(() => {
  const BOT_ID = '27311'
  const SRC = 'https://app.aminos.ai/js/chat_plugin.js'
  let loaded = false

  const inject = () => {
    if (loaded) return
    loaded = true

    // include explicit data-bot-id on the tag in <body>
    const s = document.createElement('script')
    s.id = 'aminos-chat-loader'
    s.src = SRC
    s.async = true
    s.defer = true
    s.setAttribute('data-bot-id', BOT_ID)
    document.body.appendChild(s)

    // sanity: if they only init on DOMContentLoaded, nudge after load
    s.addEventListener('load', () => {
      setTimeout(() => {
        if (!document.querySelector('#chat_app .sc-launcher')) {
          try {
            document.dispatchEvent(new Event('DOMContentLoaded', { bubbles: true }))
          } catch {
            // silent failure
          }
        }
      }, 50)
    })
  }

  // preconnect early so download is fast when we inject
  const link = document.createElement('link')
  link.rel = 'preconnect'
  link.href = 'https://app.aminos.ai'
  link.crossOrigin = 'anonymous'
  document.head.appendChild(link)

  // inject immediately *after* the load event (doesn’t affect LCP/FCP)
  window.addEventListener('load', inject, { once: true })
})
