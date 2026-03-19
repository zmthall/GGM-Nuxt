<template>
  <main class="blog-post bg-brand-background">
    <!-- Main header and page navigation -->
    <BaseLayoutHeader />
    <BaseLayoutNavigation />
    <AdminAllPageDashboard />
    <BaseLayoutPageBreadcrumb :is-blog-page="true"/>
    <slot />
    <BaseUiLanguageSwitcher />
    <BaseLayoutFooter />

    <AdCommunityVotesSupportModal v-model="cvOpen" :open-chance="0.65" :prompt-cooldown-ms="1000*60*25" :dismiss-cooldown-ms="1000*60*10" :min-page-views-before-prompt="1" :max-prompts-per-session="2" />
  </main>
</template>

<script setup lang="ts">
import ORG_SCHEMA from '@/data/orgSchema.json'

const cvOpen = ref(false)

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
</script>