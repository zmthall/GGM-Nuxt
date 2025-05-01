<template>
    <div>
        Prepare
    </div>
</template>

<script setup lang='ts'>
definePageMeta({
  title: 'How to Prepare for Your First Ride',
  breadcrumbLabel: 'Prepare for Ride'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'How to prepare for Your First Ride',
  ogTitle: 'How to prepare for Your First Ride',
  description: 'Learn how to prepare for your first transportation appointment with Golden Gate Manor Inc. Ensuring a smooth and stress-free travel experience.',
  ogDescription: 'Learn how to prepare for your first transportation appointment with Golden Gate Manor Inc. Ensuring a smooth and stress-free travel experience.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'How to prepare for Your First Ride',
  twitterDescription: 'Learn how to prepare for your first transportation appointment with Golden Gate Manor Inc. Ensuring a smooth and stress-free travel experience.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'HowToPrepareForFirstRidePage'
})
</script>

<style></style>