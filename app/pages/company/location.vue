<template>
    <div>
        find-us
    </div>
</template>

<script setup lang='ts'>
definePageMeta({
  title: 'Golden Gate Manor Service Locations',
  breadcrumbLabel: 'Locations'
})

useHead({
    titleTemplate: null
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Our Locations | Golden Gate Manor Inc. Serving Colorado',
  ogTitle: 'Our Locations | Golden Gate Manor Inc. Serving Colorado',
  description: 'View locations for Golden Gate Manor Inc. facilities and services. Providing reliable healthcare transportation and assisted living across Southern Colorado.',
  ogDescription: 'View locations for Golden Gate Manor Inc. facilities and services. Providing reliable healthcare transportation and assisted living across Southern Colorado.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Our Locations | Golden Gate Manor Inc. Serving Colorado',
  twitterDescription: 'View locations for Golden Gate Manor Inc. facilities and services. Providing reliable healthcare transportation and assisted living across Southern Colorado.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'LocationPage'
})
</script>

<style></style>