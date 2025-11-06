<template>
  <div class="md:flex py-8 sm:px-4 gap-4 max-w-[1000px] mx-auto">
    <BaseLayoutAsideNav class="xs:w-1/2 md:w-1/4" :navigation-items="navItems" @update-nav="updateNav"/>
      <BaseLayoutPageSection class="w-3/4 min-h-[360px] sm:min-h-[420px] md:min-h-[500px]">
        <FaqNavigation v-model="activeNavId" />
      </BaseLayoutPageSection>
  </div>
</template>

<script setup lang='ts'>
import FAQ_SCHEMA from '@/data/faqSchema.json'

definePageMeta({
  title: 'FAQs for Golden Gate Manor Inc.',
  breadcrumbLabel: 'FAQs'
})


useSchemaOrg([
  FAQ_SCHEMA
])

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'FAQs',
  ogTitle: 'FAQs',
  description: 'Find answers to common questions about Golden Gate Manor Inc.\'s transportation, assisted living, and medical supply services in Southern Colorado.',
  ogDescription: 'Find answers to common questions about Golden Gate Manor Inc.\'s transportation, assisted living, and medical supply services in Southern Colorado.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'FAQs',
  twitterDescription: 'Find answers to common questions about Golden Gate Manor Inc.\'s transportation, assisted living, and medical supply services in Southern Colorado.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'FAQPage'
})

const navItems = reactive([
  { id: 'ggmt', name: 'Transportation', active: true},
  { id: 'ggms', name: 'Medical Supply', active: false},
  { id: 'ggal', name: 'Assisted Living', active: false},
  { id: 'ggmc', name: 'Gas & Goods', active: false}
]);

const activeNavId = computed({
  get: () => navItems.find(i => i.active)?.id || 'ggmt',
  set: (id: string) => updateNav(id),
})


const updateNav = (id: string) => {
  navItems.forEach(item => {
    item.active = item.id === id;
  })
}

// useHead({
//   script: [
//     {
//       key: 'ld-json-faq',
//       type: 'application/ld+json',
//       innerHTML: FAQ_JSON,
//       'data-schema': 'faq'
//     }
//   ]
// })
</script>

<style>

</style>