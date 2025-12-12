<template>
  <main class="blog-post bg-brand-background">
    <!-- Main header and page navigation -->
    <BaseLayoutHeader />
    <BaseLayoutNavigation />
    <AdminAllPageDashboard />
    <BaseLayoutPageBreadcrumb v-if="showBreadcrumb" class="mt-4"/>
    <slot />
    <BaseLayoutFooter />
  </main>
</template>

<script setup lang="ts">
import ORG_SCHEMA from '@/data/orgSchema.json'

defineOptions({
  name: "BlogPostLayout"
});

useSchemaOrg([
  ORG_SCHEMA
])


useHead({
  titleTemplate: null,
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
]
})

useSeoMeta({
  author: 'Zachary Thallas',
})

const route = useRoute();

const showBreadcrumb = computed(() => !route.meta.customBreadcrumb);
</script>