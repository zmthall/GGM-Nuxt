<template>
    <div class="h-[400dvh]">
        Home Page
    </div>
</template>

<script setup lang='ts'>
useHead({
    titleTemplate: null,
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
    title: 'Golden Gate Manor Inc. | Reliable Transportation & Assisted Living',
    ogTitle: 'Golden Gate Manor Inc. | Reliable Transportation & Assisted Living',
    description: 'Golden Gate Manor Inc. offers dependable Non-Emergency Medical Transportation (NEMT), assisted living services, and medical supplies throughout Southern Colorado.',
    ogDescription: 'Golden Gate Manor Inc. offers dependable Non-Emergency Medical Transportation (NEMT), assisted living services, and medical supplies throughout Southern Colorado.',
    ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
    twitterTitle: 'Golden Gate Manor Inc. | Reliable Transportation & Assisted Living',
    twitterDescription: 'Golden Gate Manor Inc. offers dependable Non-Emergency Medical Transportation (NEMT), assisted living services, and medical supplies throughout Southern Colorado.',
    twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
    twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'HomePage'
})
</script>

<style>

</style>