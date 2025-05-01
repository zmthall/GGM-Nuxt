<template>
    <div>
        useful-forms
    </div>
</template>

<script setup lang='ts'>
definePageMeta({
  title: 'Useful Forms & Documents',
  breadcrumbLabel: 'Forms & Docs'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Useful Forms & Documents',
  ogTitle: 'Useful Forms & Documents',
  description: 'Access important forms and documents from Golden Gate Manor Inc., making transportation and assisted living processes convenient and stress-free.',
  ogDescription: 'Access important forms and documents from Golden Gate Manor Inc., making transportation and assisted living processes convenient and stress-free.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Useful Forms & Documents',
  twitterDescription: 'Access important forms and documents from Golden Gate Manor Inc., making transportation and assisted living processes convenient and stress-free.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'UsefulFormsPage'
})
</script>

<style></style>