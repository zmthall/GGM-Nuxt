// composables/buildCrumbs.ts

/**
 * buildCrumbs() — route-driven breadcrumbs for UI + Schema.org
 *
 * Notes:
 * - Uses Nuxt's managed useRoute() composable
 * - Uses route.matched instead of router.getRoutes().find(route.path)
 * - Avoids transition lag caused by manually hiding breadcrumbs during routing
 *
 * Supported route meta:
 * - title: string
 * - breadcrumbLabel?: string
 * - breadcrumb?: false
 * - noindex?: true
 * - robots?: 'noindex'
 */

type Crumb = {
  path: string
  label: string
  isLast: boolean
}

const MAX_LABEL_LENGTH = 22

const toLabel = (segment: string): string => {
  return segment
    .replaceAll('-', ' ')
    .replaceAll(/\b\w/g, char => char.toUpperCase())
}

export function buildCrumbs() {
  const route = useRoute()
  const runtime = useRuntimeConfig()

  const baseUrl = String(runtime.public?.siteUrl || '').replace(/\/$/, '')
  const isAdmin = computed(() => route.path.startsWith('/admin'))
  const isHome = computed(() => route.path === '/' || route.path === '/admin')

  const matchedVisibleRoutes = computed(() => {
    return route.matched.filter(record => record.meta?.breadcrumb !== false)
  })

  const hideBreadcrumb = computed(() => {
    return matchedVisibleRoutes.value.at(-1)?.meta?.breadcrumb === false
  })

  const noindex = computed(() => {
    const last = matchedVisibleRoutes.value.at(-1)
    return last?.meta?.noindex === true || last?.meta?.robots === 'noindex'
  })

  const crumbs = computed<Crumb[]>(() => {
    const visibleMatched = matchedVisibleRoutes.value
      .filter(record => record.path !== '/')
      .filter(record => record.path !== '/admin')

    return visibleMatched.map((record, index, arr) => {
      const customLabel =
        typeof record.meta?.breadcrumbLabel === 'string'
          ? record.meta.breadcrumbLabel
          : null

      const rawTitle =
        typeof record.meta?.title === 'string'
          ? record.meta.title
          : null

      let fallbackLabel = ''

      if (record.path === route.path) {
        const segments = route.path.split('/').filter(Boolean)
        fallbackLabel = toLabel(segments.at(-1) || '')
      } else {
        const recordSegments = record.path.split('/').filter(Boolean)
        fallbackLabel = toLabel(recordSegments.at(-1) || '')
      }

      const label = customLabel || rawTitle || fallbackLabel

      if (import.meta.dev && rawTitle && rawTitle.length >= MAX_LABEL_LENGTH && !customLabel) {
        console.warn(`[Breadcrumb] Long title "${rawTitle}" has no breadcrumbLabel defined.`)
      }

      let resolvedPath = record.path

      for (const [key, value] of Object.entries(route.params)) {
        const paramValue = Array.isArray(value) ? value.join('/') : String(value)
        resolvedPath = resolvedPath.replace(`[${key}]`, paramValue)
        resolvedPath = resolvedPath.replace(`:${key}`, paramValue)
      }

      return {
        path: resolvedPath,
        label,
        isLast: index === arr.length - 1,
      }
    })
  })

  const schema = computed(() => {
    const head = isAdmin.value
      ? { name: 'Dashboard Home', item: `${baseUrl}/admin` }
      : { name: 'Home', item: `${baseUrl}/` }

    const tail = crumbs.value.map(crumb => {
      if (crumb.isLast) {
        return { name: crumb.label }
      }

      return {
        name: crumb.label,
        item: `${baseUrl}${crumb.path}`,
      }
    })

    return {
      itemListElement: [head, ...tail],
    }
  })

  const shouldEmit = computed(() => {
    return !isHome.value && !hideBreadcrumb.value && !noindex.value
  })

  return {
    schema,
    crumbs,
    shouldEmit,
    isAdmin,
  }
}