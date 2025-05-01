<template>
    <div>
        Ride Cancellation Policy
    </div>
</template>

<script setup lang='ts'>
definePageMeta({
  title: 'Ride Cancellation Policy',
  breadcrumbLabel: 'Ride Cancellation'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Ride Cancellation Policy',
  ogTitle: 'Ride Cancellation Policy',
  description: 'Understand the ride cancellation policy at Golden Gate Manor Inc., designed to maximize service reliability for our transportation clients.',
  ogDescription: 'Understand the ride cancellation policy at Golden Gate Manor Inc., designed to maximize service reliability for our transportation clients.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Ride Cancellation Policy',
  twitterDescription: 'Understand the ride cancellation policy at Golden Gate Manor Inc., designed to maximize service reliability for our transportation clients.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'RideCancellationPolicyPage'
})
</script>

<style></style>