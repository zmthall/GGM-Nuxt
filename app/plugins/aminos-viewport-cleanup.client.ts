// plugins/aminos-and-viewport.client.ts
export default defineNuxtPlugin(() => {
  const BOT_ID = '27311'
  const SRC    = 'https://app.aminos.ai/js/chat_plugin.js'

  let mounted = false
  let viewportObserver: MutationObserver | null = null

  const removeDuplicateViewports = (): void => {
    const metas = document.querySelectorAll<HTMLMetaElement>('meta[name="viewport"]')
    for (let i = 1; i < metas.length; i++) metas[i]?.remove()
  }

  const startViewportObserver = (): void => {
    if (viewportObserver) return
    viewportObserver = new MutationObserver(() => removeDuplicateViewports())
    viewportObserver.observe(document.head, { childList: true })
  }

  const mountScriptOnce = (): void => {
    if (mounted) return
    mounted = true

    // Don’t inject twice if HMR / navigation re-runs the plugin
    if (!document.getElementById('aminos-chat-loader')) {
      const s = document.createElement('script')
      s.id = 'aminos-chat-loader'
      s.src = SRC
      s.defer = true
      s.setAttribute('data-bot-id', BOT_ID)
      s.dataset.botId = BOT_ID
      document.body.appendChild(s)
    }

    // Clean now + after possible async injections, then keep watching
    removeDuplicateViewports()
    window.setTimeout(removeDuplicateViewports, 300)
    window.setTimeout(removeDuplicateViewports, 1000)
    startViewportObserver()
  }

  const run = (): void => {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      mountScriptOnce()
    } else {
      window.addEventListener('DOMContentLoaded', () => mountScriptOnce(), { once: true })
    }
  }

  // run when app mounts on client
  // (plugin is .client.ts, so it never runs on SSR)
  run()
})
