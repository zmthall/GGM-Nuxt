<template>
  <main class="default bg-brand-background">
    <!-- Main header and page navigation -->
    <BaseLayoutHeader />
    <BaseLayoutNavigation />
    <!-- Page headers and breadcrumb with ability to disable on specific pages  -->
    <BaseLayoutPageHeader v-if="showHeader" :title="pageHeader"/>
    <BaseLayoutPageBreadcrumb v-if="showBreadcrumb"/>
    <slot />
    <BaseLayoutFooter />
  </main>
</template>

<script setup lang="ts">
defineOptions({
  name: "DefaultPages"
})

const staticData = useStaticData()

useHead({
  titleTemplate: (titleChunk) => titleChunk ? `${titleChunk} | Golden Gate Manor Inc.` : 'Golden Gate Manor Inc.',
  script: [
    {
      key: 'ld-json-org',
      type: 'application/ld+json',
      innerHTML: JSON.stringify(staticData.orgSchema)
    }
  ]
})

useSeoMeta({
  author: 'Zachary Thallas',
})

const pageHeader = computed(() => {
  return route.meta.title as string | undefined
})

const route = useRoute();
const showHeader = computed(() => route.meta.showPageHeader !== false)
const showBreadcrumb = computed(() => !route.meta.customBreadcrumb)
</script>

<style>
  html.no-scroll {
    scrollbar-gutter: stable;
  }

  body.no-scroll {
    overflow-y: hidden;
  }

  body {
    overflow-y: auto;
  }

  html {
    @apply font-main;
  }
</style>