<template>
  <div>
    <ClientOnly>
      <BaseLayoutAdminHeader />
      <AdminAllPageDashboard />
      <BlogPostHeader v-if="authStore.authorized" title="Golden Gate Manor Blog Post" class="max-sm:hidden"/>
      <BaseLayoutPageBreadcrumb v-if="showBreadcrumb && authStore.authorized"/>
      <slot />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()
const route = useRoute();
const showBreadcrumb = computed(() => !route.meta.customBreadcrumb);

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
  ],
  bodyAttrs: {
    class: 'is-admin'
  }
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