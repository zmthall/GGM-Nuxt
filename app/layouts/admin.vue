<template>
  <div>
    <ClientOnly>
      <BaseLayoutAdminHeader />
      <AdminAllPageDashboard />
        <BaseLayoutPageHeader v-if="!route.path.includes('login') && authStore.authorized" :title="pageTitle" class="capitalize" />
        <slot />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()
const route = useRoute();

const pageTitle = computed(() => {
  const path = route.path.split('/')
  return path[path.length - 1] === 'admin' ? 'Admin Dashboard - Home' : `Admin Dashboard - ${path[path.length - 1]}`
})

const staticData = useStaticData()

if(staticData) {
  useHead({
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

onBeforeMount(() => {
  authStore.refreshRole();
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
    title: 'Admin Dashboard | Golden Gate Manor Inc',
    ogTitle: 'Admin Dashboard | Golden Gate Manor Inc',
    description: 'Golden Gate Manor Administrative dashboard.',
    ogDescription: 'Golden Gate Manor Administrative dashboard.',
    ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
    twitterTitle: 'Admin Dashboard | Golden Gate Manor Inc',
    twitterDescription: 'Golden Gate Manor Administrative dashboard.',
    twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
    twitterCard: 'summary_large_image',
})

</script>

<style>
div#chat_app {
  display: hidden;
}
</style>