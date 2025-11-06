<template>
  <main class="default bg-brand-background">
    <!-- Main header and page navigation -->
    <BaseLayoutHeader />
    <BaseLayoutNavigation />
    <DeferRender when="idle">
      <LazyAdminAllPageDashboard
        v-if="authStore.authorized" />
    </DeferRender>
    <!-- Page headers and breadcrumb with ability to disable on specific pages  -->
    <BaseLayoutPageHeader v-if="showHeader" :title="pageHeader"/>
    <BaseLayoutPageBreadcrumb v-if="showBreadcrumb"/>
    <slot />
    <DeferRender when="visible">
      <LazyBaseLayoutFooter />
    </DeferRender>
  </main>
</template>

<script setup lang="ts">
import ORG_SCHEMA from '@/data/orgSchema.json'

defineOptions({
  name: "DefaultPages"
})

useSchemaOrg([
  ORG_SCHEMA
])

const authStore = useAuthStore();

useHead({
  titleTemplate: (titleChunk) => titleChunk ? `${titleChunk} | Golden Gate Manor Inc.` : 'Golden Gate Manor Inc.',
  link: [
  {
    rel: 'preload',
    href: '/fonts/Cabin-Regular.woff2',
    as: 'font',
    type: 'font/woff2',
    crossorigin: 'anonymous'
  },
  {
    rel: 'preload',
    href: '/fonts/NotoSerif-Regular.woff2',
    as: 'font',
    type: 'font/woff2',
    crossorigin: 'anonymous'
  }
],
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
</style>