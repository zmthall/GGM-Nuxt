// composables/buildCrumbs.ts
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
  console.log(shouldEmit.value)

  return { schema, crumbs, shouldEmit, isAdmin }
}
