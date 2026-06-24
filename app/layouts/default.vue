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
    <BaseLayoutPageBreadcrumb />
    <slot />
    <BaseUiLanguageSwitcher />
    <DeferRender when="visible">
      <LazyBaseLayoutFooter />
    </DeferRender>  

    <AdNominateModal v-if="isNomination" v-model="cvOpen" :open-chance="0.40" :prompt-cooldown-ms="1000*60*25" :dismiss-cooldown-ms="1000*60*10" :min-page-views-before-prompt="1" :max-prompts-per-session="2" />
    <AdVoteModal v-else v-model="cvOpen" :open-chance="0.40" :prompt-cooldown-ms="1000*60*25" :dismiss-cooldown-ms="1000*60*10" :min-page-views-before-prompt="1" :max-prompts-per-session="2" />
  </main>
</template>

<script setup lang="ts">
import ORG_SCHEMA from '@/data/orgSchema.json'

const isNomination = computed(() => {
  const cutoff = new Date('2026-05-28T00:00:00-06:00')
  return Date.now() < cutoff.getTime()
})

const cvOpen = ref(false)

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
  bodyAttrs: {
    class: computed(() => (cvOpen.value) ? 'no-scroll' : '')
  }
})

useSeoMeta({
  author: 'Zachary Thallas',
})

const pageHeader = computed(() => {
  return route.meta.title as string | undefined
})

const route = useRoute();
const showHeader = computed(() => route.meta.showPageHeader !== false)
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
    color: var(--text)
  }
</style>