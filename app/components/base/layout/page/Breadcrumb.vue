<template>
  <nav v-if="!isHomePage" aria-label="breadcrumb" class="mx-4 mt-2 p-2 bg-brand-primary/10 font-bold max-sm:hidden">
    <ol class="flex">
      <li>
        <NuxtLink to="/" class="text-brand-primary underline hover:text-brand-link-hover">Home</NuxtLink>
      </li>
      <li v-for="crumb in breadcrumbs" :key="crumb.path">
        <template v-if="!crumb.isLast">
          &nbsp;/&nbsp;<NuxtLink :to="crumb.path" class="text-brand-primary underline hover:text-brand-link-hoverw">{{ crumb.label }}</NuxtLink>
        </template>
        <template v-else>
          <span>&nbsp;/&nbsp;{{ crumb.label }}</span>
        </template>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const isHomePage = computed(() => route.path === '/')

// Format slug fallback
const toLabel = (slug: string): string =>
  slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

// // Generate breadcrumbs from actual matched routes
const MAX_LABEL_LENGTH = 22

const breadcrumbs = computed(() => {
  const pathSegments = route.path.split('/').filter(Boolean)
  let fullPath = ''
  const crumbs: { path: string; label: string; isLast: boolean }[] = []

  pathSegments.forEach((segment, index) => {
    fullPath += `/${segment}`

    const matchedRoute = router.getRoutes().find((r) => r.path === fullPath)

    // Skip if meta.breadcrumb === false
    if (matchedRoute?.meta?.breadcrumb === false) return

    // Determine label
    let label = toLabel(segment)

    const rawTitle = typeof matchedRoute?.meta?.title === 'string' ? matchedRoute.meta.title : null
    const customLabel = typeof matchedRoute?.meta?.breadcrumbLabel === 'string' ? matchedRoute.meta.breadcrumbLabel : null

    if (customLabel) {
      label = customLabel
    } else if (rawTitle) {
      if (import.meta.dev && rawTitle.length >= MAX_LABEL_LENGTH) {
        console.warn(`[Breadcrumb] Long title "${rawTitle}" has no breadcrumbLabel defined.`)
      }
      label = rawTitle
    } else {
      label = toLabel(segment)
    }

    crumbs.push({
      path: fullPath,
      label,
      isLast: index === pathSegments.length - 1
    })
  })

  return crumbs
})
</script>