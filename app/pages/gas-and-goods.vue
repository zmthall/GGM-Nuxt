<template>
  <div>
    
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'Golden Gate Gas & Goods',
  breadcrumbLabel: 'Medical Supply'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Golden Gate Gas & Goods',
  ogTitle: 'Golden Gate Gas & Goods',
  description: 'Overview of Golden Gate Manor Inc. Gas & Goods. Learn about our current venture into the gas station realm.',
  ogDescription: 'Overview of Golden Gate Manor Inc. Gas & Goods. Learn about our current venture into the gas station realm.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-medical-supply.png`,
  twitterTitle: 'Golden Gate Gas & Goods',
  twitterDescription: 'Overview of Golden Gate Manor Inc. Gas & Goods. Learn about our current venture into the gas station realm.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-medical-supply.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
  name: 'MedicalSuppliesPage'
})

</script>

<style>

</style>