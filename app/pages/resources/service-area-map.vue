<template>
    <div>
        service-area-map
    </div>
</template>

<script setup lang='ts'>
definePageMeta({
  title: 'Transportation Service Area Map',
  breadcrumbLabel: 'Service Area'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Service Area Map',
  ogTitle: 'Service Area Map',
  description: 'View the comprehensive service area map for Golden Gate Manor Inc., providing reliable transportation across Pueblo and Southern Colorado.',
  ogDescription: 'View the comprehensive service area map for Golden Gate Manor Inc., providing reliable transportation across Pueblo and Southern Colorado.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Service Area Map',
  twitterDescription: 'View the comprehensive service area map for Golden Gate Manor Inc., providing reliable transportation across Pueblo and Southern Colorado.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'ServiceAreaMapPage'
})
</script>

<style></style>