<template>
    <div>
        NEMT
    </div>
</template>

<script setup lang='ts'>
definePageMeta({
  title: 'Non-Emergency Medical Transportation',
  breadcrumbLabel: 'NEMT'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Non-Emergency Medical Transportation',
  ogTitle: 'Non-Emergency Medical Transportation',
  description: 'Reliable Non-Emergency Medical Transportation (NEMT) in Southern Colorado with wheelchair accessibility, safety features, and experienced drivers.',
  ogDescription: 'Reliable Non-Emergency Medical Transportation (NEMT) in Southern Colorado with wheelchair accessibility, safety features, and experienced drivers.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Non-Emergency Medical Transportation',
  twitterDescription: 'Reliable Non-Emergency Medical Transportation (NEMT) in Southern Colorado with wheelchair accessibility, safety features, and experienced drivers.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'NemtPage'
})
</script>

<style></style>