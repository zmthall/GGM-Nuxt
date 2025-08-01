<template>
  <div>
      <BaseLayoutAdminHeader />
      <AdminAllPageDashboard />
      <ClientOnly>
        <BaseLayoutPageHeader v-if="!route.path.includes('login') && authStore.authorized" :title="pageTitle" class="capitalize" />
      </ClientOnly>
      <slot />
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()
const route = useRoute();

const pageTitle = computed(() => {
  const path = route.path.split('/') // Move this inside the computed
  return path[path.length - 1] === 'admin' ? 'Admin Dashboard - Home' : `Admin Dashboard - ${path[path.length - 1]}`
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