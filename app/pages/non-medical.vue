<template>
    <div>
        Non-Medical
    </div>
</template>

<script setup lang='ts'>
definePageMeta({
  title: 'Non-Medical Transportation',
  breadcrumbLabel: 'Non-Medical'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Personal & Non-Medical Transportation',
  ogTitle: 'Personal & Non-Medical Transportation',
  description: 'Enjoy stress-free personal transportation in Southern Colorado. Golden Gate Manor Inc. ensures safe, reliable travel for shopping, visits, and more.',
  ogDescription: 'Enjoy stress-free personal transportation in Southern Colorado. Golden Gate Manor Inc. ensures safe, reliable travel for shopping, visits, and more.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Personal & Non-Medical Transportation',
  twitterDescription: 'Enjoy stress-free personal transportation in Southern Colorado. Golden Gate Manor Inc. ensures safe, reliable travel for shopping, visits, and more.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'NonMedicalPage'
})
</script>

<style></style>