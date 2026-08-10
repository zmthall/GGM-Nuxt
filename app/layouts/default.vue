<template>
  <main class="default bg-brand-background">
    <!-- Main header and page navigation -->
    <!-- <BaseLayoutAnnouncementBar /> -->
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

    <!-- <AdNominateModal v-if="isNomination" v-model="cvOpen" :open-chance="0.40" :prompt-cooldown-ms="1000*60*25" :dismiss-cooldown-ms="1000*60*10" :min-page-views-before-prompt="1" :max-prompts-per-session="2" />
    <AdVoteModal v-else v-model="cvOpen" :open-chance="0.40" :prompt-cooldown-ms="1000*60*25" :dismiss-cooldown-ms="1000*60*10" :min-page-views-before-prompt="1" :max-prompts-per-session="2" /> -->
  </main>
</template>

<script setup lang="ts">
import ORG_SCHEMA from '@/data/orgSchema.json'

const cvOpen = ref(false)

const i18nHead = useLocaleHead({
  seo: true
})

defineOptions({
  name: "DefaultPages"
})

useSchemaOrg([
  ORG_SCHEMA
])

const authStore = useAuthStore();

useHead({
  titleTemplate: (titleChunk) =>
    titleChunk
      ? `${titleChunk} | Golden Gate Manor Inc.`
      : 'Golden Gate Manor Inc.',

  link: [
    {
      rel: 'preload',
      href: '/fonts/Cabin-Regular.woff2',
      as: 'font',
      type: 'font/woff2',
      crossorigin: 'anonymous',
    },
    {
      rel: 'preload',
      href: '/fonts/NotoSerif-Regular.woff2',
      as: 'font',
      type: 'font/woff2',
      crossorigin: 'anonymous',
    },
    ...(i18nHead.value.link || []),
  ],

  bodyAttrs: {
    class: computed(() => (cvOpen.value ? 'no-scroll' : '')),
  },

  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs?.lang,
  },

  meta: i18nHead.value.meta || [],
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