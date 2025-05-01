<template>
  <div>
    Accessibility
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'Accessibility Statement',
  breadcrumbLabel: 'Accessibility'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Accessibility Statement',
  ogTitle: 'Accessibility Statement',
  description: 'Golden Gate Manor Inc. is committed to ensuring digital and physical accessibility for individuals with disabilities. Read our full accessibility statement here.',
  ogDescription: 'Golden Gate Manor Inc. is committed to ensuring digital and physical accessibility for individuals with disabilities. Read our full accessibility statement here.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Accessibility Statement',
  twitterDescription: 'Golden Gate Manor Inc. is committed to ensuring digital and physical accessibility for individuals with disabilities. Read our full accessibility statement here.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'AccessibilityPage'
})

</script>

<style>

</style>