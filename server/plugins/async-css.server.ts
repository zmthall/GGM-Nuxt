// server/plugins/async-styles.server.ts
export default defineNitroPlugin((nitroApp) => {
  if (import.meta.dev) return

  // capture any <link rel="stylesheet" href="...css"> (same-origin)
  const LINK_RE = /<link\b[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+\.css)["'][^>]*>/gi

  nitroApp.hooks.hook('render:response', (response, _ctx) => {
    if (typeof response.body !== 'string') return
    // Some adapters don’t have content-type set yet; guard by HTML presence
    if (!response.body.includes('</head>')) return

    const hrefs: string[] = []
    let m: RegExpExecArray | null
    LINK_RE.lastIndex = 0
    while ((m = LINK_RE.exec(response.body)) !== null) {
      const href = m[1]
      // same-origin only; skip external/CDN or data: URIs
      if (href.startsWith('/') && !href.startsWith('data:')) {
        // limit to Nuxt/Vite asset locations
        if (/^\/(?:_nuxt|assets)\/.+\.css$/.test(href)) hrefs.push(href)
      }
    }
    if (hrefs.length === 0) return

    const uniq = Array.from(new Set(hrefs))

    // remove only the matched same-origin asset links
    let html = response.body.replace(LINK_RE, (full, href) => {
      return (href.startsWith('/') && /^\/(?:_nuxt|assets)\/.+\.css$/.test(href)) ? '' : full
    })

    const preload = uniq.map(h => `<link rel="preload" as="style" href="${h}">`).join('')
    const asyncLinks = uniq.map(h => `<link rel="stylesheet" href="${h}" media="print" onload="this.media='all'">`).join('')
    const noScript = `<noscript>${uniq.map(h => `<link rel="stylesheet" href="${h}">`).join('')}</noscript>`

    html = html.replace('</head>', `${preload}${asyncLinks}${noScript}</head>`)
    response.body = html
  })
})
