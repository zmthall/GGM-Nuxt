<template>
<div>
Support Center
</div>
</template>

<script setup lang='ts'>
definePageMeta({
  title: 'Support Center',
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Support Center',
  ogTitle: 'Support Center',
  description: 'Visit the Golden Gate Manor Inc. Support Center for assistance with scheduling rides, understanding policies, and accessing healthcare resources.',
  ogDescription: 'Visit the Golden Gate Manor Inc. Support Center for assistance with scheduling rides, understanding policies, and accessing healthcare resources.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Support Center',
  twitterDescription: 'Visit the Golden Gate Manor Inc. Support Center for assistance with scheduling rides, understanding policies, and accessing healthcare resources.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
  name: 'SupportCenterPage'
})
</script>

<style>

</style>