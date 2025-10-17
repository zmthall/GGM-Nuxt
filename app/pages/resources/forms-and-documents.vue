<template>
    <div class="md:flex py-8 sm:px-4 gap-4 max-w-[1000px] mx-auto">
      <BaseLayoutAsideNav class="xs:w-1/2 md:w-1/4" :navigation-items="navItems" @update-nav="updateNav"/>
      <BaseLayoutPageSection class="w-3/4 min-h-[465px] md:min-h-[500px]">
        <FormsAndDocsNavigation v-model="activeNavId" />
      </BaseLayoutPageSection>
    </div>
</template>

<script setup lang='ts'>
definePageMeta({
  title: 'Useful Forms & Documents',
  breadcrumbLabel: 'Forms & Docs'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Useful Forms & Documents',
  ogTitle: 'Useful Forms & Documents',
  description: 'Access important forms and documents from Golden Gate Manor Inc., making transportation and assisted living processes convenient and stress-free.',
  ogDescription: 'Access important forms and documents from Golden Gate Manor Inc., making transportation and assisted living processes convenient and stress-free.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Useful Forms & Documents',
  twitterDescription: 'Access important forms and documents from Golden Gate Manor Inc., making transportation and assisted living processes convenient and stress-free.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

const navItems = reactive([
  { id: 'ggmt', name: 'Transportation', active: true},
  { id: 'ggms', name: 'Medical Supply', active: false},
]);

const activeNavId = computed(() => {
  return navItems.find(item => item.active)?.id || 'ggmt'
})

const updateNav = (id: string) => {
  navItems.forEach(item => {
    item.active = item.id === id;
  })
}

defineOptions({
    name: 'UsefulFormsPage'
})
</script>