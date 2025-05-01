<template>
    <div>
        FAQ
    </div>
</template>

<script setup lang='ts'>
definePageMeta({
  title: 'FAQs',
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'FAQs',
  ogTitle: 'FAQs',
  description: 'Find answers to common questions about Golden Gate Manor Inc.’s transportation, assisted living, and medical supply services in Southern Colorado.',
  ogDescription: 'Find answers to common questions about Golden Gate Manor Inc.’s transportation, assisted living, and medical supply services in Southern Colorado.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'FAQs',
  twitterDescription: 'Find answers to common questions about Golden Gate Manor Inc.’s transportation, assisted living, and medical supply services in Southern Colorado.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'FAQPage'
})
</script>

<style></style>