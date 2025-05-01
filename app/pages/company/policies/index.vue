<template>
  <div>
    Policies
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'Golden Gate Manor Policies',
  breadcrumbLabel: 'Policies'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Company Policies',
  ogTitle: 'Company Policies',
  description: 'Review Golden Gate Manor Inc.\'s company policies, ensuring transparent and reliable transportation, assisted living, and healthcare supply services.',
  ogDescription: 'Review Golden Gate Manor Inc.\'s company policies, ensuring transparent and reliable transportation, assisted living, and healthcare supply services.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Company Policies',
  twitterDescription: 'Review Golden Gate Manor Inc.\'s company policies, ensuring transparent and reliable transportation, assisted living, and healthcare supply services.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
  name: 'CompanyPoliciesPage'
})


</script>

<style>

</style>