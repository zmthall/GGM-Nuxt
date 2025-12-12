<template>
  <div>
    <ClientOnly>
      <BaseLayoutAdminHeader />

      <DeferRender when="idle">
        <LazyAdminAllPageDashboard v-if="auth.authorized" />
      </DeferRender>
      <BaseLayoutPageBreadcrumb v-if="showBreadcrumb && auth.authorized" class="mt-4" />
      <BaseToastContainer />
      <slot />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { WatchStopHandle } from 'vue'

const route = useRoute()
const auth  = useAuthStore()

const showBreadcrumb = computed(() => !route.meta.customBreadcrumb)

useHead({
  link: [
    { rel: 'preload', href: '/fonts/Cabin-Regular.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
    { rel: 'preload', href: '/fonts/NotoSerif-Regular.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' }
  ],
  bodyAttrs: { class: 'is-admin' }
})

onMounted(async () => {
  const { $getFirebase } = useNuxtApp()
  await $getFirebase()

  const auth = useAuthStore()

  // Run immediately if already ready + authorized
  if (auth.isFirebaseReady && auth.authorized) {
    await auth.refreshRole()
    return
  }

  // Otherwise, watch once until it becomes true
  const stop: WatchStopHandle = watch(
    () => auth.isFirebaseReady && auth.authorized,
    async (ok) => {
      if (!ok) return
      stop()            // safe now (stop is assigned)
      await auth.refreshRole()
    },
    { immediate: false }
  )
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Admin Dashboard | Golden Gate Manor Inc',
  ogTitle: 'Admin Dashboard | Golden Gate Manor Inc',
  description: 'Golden Gate Manor Administrative dashboard.',
  ogDescription: 'Golden Gate Manor Administrative dashboard.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Admin Dashboard | Golden Gate Manor Inc',
  twitterDescription: 'Admin dashboard.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})
</script>
