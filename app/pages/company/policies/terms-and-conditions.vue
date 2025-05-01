<template>
  <div>
    Terms & Conditions
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'Terms and Conditions',
  breadcrumbLabel: 'Terms & Conditions'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Terms and Conditions',
  ogTitle: 'Terms and Conditions',
  description: 'Read the Terms and Conditions governing the use of Golden Gate Manor Inc.\'s healthcare transportation, assisted living, and medical supply services.',
  ogDescription: 'Read the Terms and Conditions governing the use of Golden Gate Manor Inc.\'s healthcare transportation, assisted living, and medical supply services.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Terms and Conditions',
  twitterDescription: 'Read the Terms and Conditions governing the use of Golden Gate Manor Inc.\'s healthcare transportation, assisted living, and medical supply services.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
  name: 'TermsAndConditionsPage'
})

</script>

<style>

</style>