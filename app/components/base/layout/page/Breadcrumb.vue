<script setup lang="ts">
const props = withDefaults(defineProps<{
  isBlogPage?: boolean
}>(), {
  isBlogPage: false
})

type BreadcrumbOverrideItem = {
  label: string
  to?: string
  href?: string
  [key: string]: unknown
}

const route = useRoute()

const hideBreadcrumb = computed(() => route.meta.breadcrumb === false)

const breadcrumbOverrides = computed(() => {
  const overrides = route.meta.breadcrumbOverrides

  if (!Array.isArray(overrides)) {
    return []
  }

  return overrides as Array<BreadcrumbOverrideItem | false | undefined>
})

const hideRoot = computed(() => route.meta.breadcrumbHideRoot === true)
const hideCurrent = computed(() => route.meta.breadcrumbHideCurrent === true)

const items = useBreadcrumbItems({
  schemaOrg: true,
  hideRoot,
  hideCurrent,
  overrides: breadcrumbOverrides,
  hideNonExisting: false
})

const isLinkItem = (item: Record<string, unknown>) => {
  return Boolean(item.to || item.href)
}
</script>

<template>
  <nav
  v-if="!hideBreadcrumb && items.length"
  aria-label="Breadcrumbs"
  :class="['p-2 bg-zinc-300 font-bold max-sm:hidden', props.isBlogPage ? 'mx-4 mt-4' : 'mx-4 mt-2']"
>
    <ol class="flex flex-wrap items-center">
      <li v-for="(item, index) in items" :key="`${item.label}-${index}`" class="flex items-center">
        <template v-if="isLinkItem(item) && index !== items.length - 1">
          <NuxtLink v-bind="item" class="link">{{ item.label }}</NuxtLink>
        </template>
        <template v-else>
          <span>{{ item.label }}</span>
        </template>
        <span v-if="index !== items.length - 1" class="px-1">/</span>
      </li>
    </ol>
  </nav>
</template>