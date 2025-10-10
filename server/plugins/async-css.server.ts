/**
 * Rewrites server-rendered HTML:
 * - Finds blocking <link rel="stylesheet" ...> to _nuxt CSS files
 * - Removes them
 * - Injects <link rel="preload" as="style"> + non-blocking <link rel="stylesheet" media="print" onload="this.media='all'">
 * - Adds <noscript> fallback
 */
export default defineNitroPlugin((nitroApp) => {
  if (import.meta.dev) return

  // Rough but effective capture: all stylesheet links whose href ends with .css (typically /_nuxt/*.css)
  const LINK_RE = /<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+\.css)["'][^>]*>/gi

  nitroApp.hooks.hook('render:response', (response, ctx) => {
    // Only process HTML responses with a body we can mutate
    if (typeof response.body !== 'string') return
    const headers = ctx.event.node.res.getHeaders()
    const contentType = String(headers['content-type'] ?? '')
    if (!contentType.includes('text/html')) return
    if (!response.body.includes('</head>')) return

    // Collect all stylesheet hrefs (usually /_nuxt/app-xxxxx.css and split chunks)
    const hrefs: string[] = []
    let match: RegExpExecArray | null
    LINK_RE.lastIndex = 0
    while ((match = LINK_RE.exec(response.body)) !== null) {
      // Only transform Nuxt-built CSS (avoid touching 3rd-party CDN styles if you don’t want to)
      const href = match[1]
      if (href.includes('/_nuxt/') && href.endsWith('.css')) {
        hrefs.push(href)
      }
    }
    if (hrefs.length === 0) return

    // 1) Remove the blocking <link rel="stylesheet"> tags we matched
    let html = response.body.replace(LINK_RE, (full, href) => {
      return (href.includes('/_nuxt/') && href.endsWith('.css')) ? '' : full
    })

    // 2) Build async replacements (preload + print-swap + noscript fallback)
    const preloadTags = hrefs
      .map(href => `<link rel="preload" as="style" href="${href}">`)
      .join('')

    const asyncStyles = hrefs
      .map(href => `<link rel="stylesheet" href="${href}" media="print" onload="this.media='all'">`)
      .join('')

    const noScript = `<noscript>${hrefs
      .map(href => `<link rel="stylesheet" href="${href}">`)
      .join('')}</noscript>`

    const injection = preloadTags + asyncStyles + noScript

    // 3) Inject right before </head>
    html = html.replace('</head>', `${injection}</head>`)

    response.body = html
  })
})
