<template>
  <main class="blog-post bg-brand-background">
    <!-- Main header and page navigation -->
    <BaseLayoutHeader />
    <BaseLayoutNavigation />
    <AdminAllPageDashboard />
    <!-- Blog-specific header with post data from store -->
    <BlogPostHeader title="Golden Gate Manor Blog Post" class="max-sm:hidden"/>
    <BaseLayoutPageBreadcrumb v-if="showBreadcrumb"/>
    <slot />
    <BaseLayoutFooter />
  </main>
</template>

<script setup lang="ts">
defineOptions({
  name: "BlogPostLayout"
});

const staticData = useStaticData()

if(staticData) {
  useHead({
    titleTemplate: null,
    script: [
      {
        key: 'ld-json-org',
        type: 'application/ld+json',
        innerHTML: JSON.stringify(staticData.orgSchema),
        'data-schema': 'organization' // 
      }
    ],
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
}

useSeoMeta({
  author: 'Zachary Thallas',
})

const route = useRoute();
const showBreadcrumb = computed(() => !route.meta.customBreadcrumb);
</script>