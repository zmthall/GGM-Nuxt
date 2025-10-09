// plugins/critical-css.client.ts
// Vite will give you the CSS file contents as a string
import critical from '~/assets/critical.css?inline'
// If you import your main css to get its final hashed URL at build:
import mainCssUrl from '~/assets/style.css?url'

export default defineNuxtPlugin(() => {
  useHead({
    // ⬇️ Correct key is innerHTML, not children
    style: [{ key: 'critical', innerHTML: critical }],
    // A plain preload is fine; we'll “upgrade” it to stylesheet in onMounted()
    link: [{
      id: 'main-style-preload',
      rel: 'preload',
      as: 'style',
      href: mainCssUrl
    }],
    // noscript fallback also uses innerHTML
    noscript: [
      { innerHTML: `<link rel="stylesheet" href="${mainCssUrl}">` }
    ]
  })

  // After mount, swap rel to stylesheet (typed, no inline onload string)
  if (import.meta.client) {
    onMounted(() => {
      const el = document.getElementById('main-style-preload') as HTMLLinkElement | null
      if (!el) return
      el.addEventListener('load', () => { el.rel = 'stylesheet' }, { once: true })
      // If the preload is already in cache, ensure it becomes a stylesheet anyway:
      requestAnimationFrame(() => { if (el.rel !== 'stylesheet') el.rel = 'stylesheet' })
    })
  }
})
