// composables/buildCrumbs.ts

/**
 * use: buildCrumbs() — quick README
 * Purpose: Single source for visual breadcrumbs + Schema.org BreadcrumbList.
 *
 * Minimal setup:
 * - nuxt.config.ts → runtimeConfig.public.siteUrl = 'https://yourdomain.com' (no trailing slash)
 * - Per page, optional route meta:
 *     title: string
 *     breadcrumbLabel?: string     // shorter UI/SEO label
 *     breadcrumb?: false           // hide this level (UI + Schema)
 *     noindex?: true               // skip schema on this page
 *
 * In layout (Schema.org):
 *   const { schema, shouldEmit } = buildCrumbs()
 *   if (shouldEmit.value) useSchemaOrg([ defineBreadcrumb(schema.value) ])
 *
 * In component (UI):
 *   const { crumbs, isAdmin } = buildCrumbs()
 *   <!-- first link -->
 *   <NuxtLink :to="isAdmin ? '/admin' : '/'">{{ isAdmin ? 'Dashboard Home' : 'Home' }}</NuxtLink>
 *   <!-- trail -->
 *   <NuxtLink v-for="c in crumbs" :key="c.path" :to="c.path" v-if="!c.isLast">{{ c.label }}</NuxtLink>
 *   <span v-else>{{ c.label }}</span>
 *
 * Returns:
 * - crumbs: { path, label, isLast }[]   // for rendering
 * - schema: { itemListElement: ... }    // pass to defineBreadcrumb()
 * - shouldEmit: Ref<boolean>            // true on public, indexable pages
 * - isAdmin: Ref<boolean>               // convenience flag for first crumb
 */

import { useRoute, useRouter } from 'vue-router'
import { useRuntimeConfig } from '#app'

type Crumb = { path: string; label: string; isLast: boolean }

const MAX_LABEL_LENGTH = 22
const toLabel = (slug: string) =>
  slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

export function buildCrumbs() {
  const route = useRoute()
  const router = useRouter()
  const runtime = useRuntimeConfig()

  const baseUrl = ((runtime.public?.siteUrl as string) || '').replace(/\/$/, '')
  const isHome = computed(() => route.path === '/' || route.path === '/admin')
  const isAdmin = computed(() => route.path.startsWith('/admin'))

  const matchedRoute = computed(() => router.getRoutes().find(r => r.path === route.path))
  const hideBreadcrumb = computed(() => matchedRoute.value?.meta?.breadcrumb === false)
  const noindex = computed(
    () => matchedRoute.value?.meta?.noindex === true || matchedRoute.value?.meta?.robots === 'noindex'
  )

  const crumbs = computed<Crumb[]>(() => {
    const segments = route.path.split('/').filter(Boolean)
    let fullPath = ''
    const out: Crumb[] = []

    segments.forEach((segment, index) => {
      fullPath += `/${segment}`
      const r = router.getRoutes().find(rr => rr.path === fullPath)

      // skip hidden routes
      if (r?.meta?.breadcrumb === false) return
      // skip admin root segment in the trail
      if (segment === 'admin') return

      const rawTitle = typeof r?.meta?.title === 'string' ? r.meta.title : null
      const customLabel =
        typeof r?.meta?.breadcrumbLabel === 'string' ? r.meta.breadcrumbLabel : null

      const label = customLabel || rawTitle || toLabel(segment)

      if (import.meta.dev && rawTitle && rawTitle.length >= MAX_LABEL_LENGTH && !customLabel) {
        console.warn(`[Breadcrumb] Long title "${rawTitle}" has no breadcrumbLabel defined.`)
      }

      out.push({
        path: fullPath,
        label,
        isLast: index === segments.length - 1,
      })
    })

    return out
  })

  // JSON-LD itemListElement for defineBreadcrumb()
  const schema = computed(() => {
    const head = isAdmin.value
      ? { name: 'Dashboard Home', item: `${baseUrl}/admin` }
      : { name: 'Home', item: `${baseUrl}/` }

    const tail = crumbs.value.map(c =>
      c.isLast ? { name: c.label } : { name: c.label, item: `${baseUrl}${c.path}` }
    )

    return {
      itemListElement: [head, ...tail],
      // positions are auto-computed by @nuxt/seo schema-org
    }
  })

  const shouldEmit = computed(() => !isHome.value && !hideBreadcrumb.value && !noindex.value)

  return { schema, crumbs, shouldEmit, isAdmin }
}
