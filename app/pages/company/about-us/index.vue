<template>
    <div>
        About Us
    </div>
</template>

<script setup lang='ts'>
const runtimeConfig = useRuntimeConfig()
const publishDate = new Date().toISOString()
definePageMeta({
  title: 'About Golden Gate Manor Inc.',
  breadcrumbLabel: 'About Us'
})

useHead({
    titleTemplate: null
})

useSeoMeta({
  title: 'About Golden Gate Manor Inc. | Our Story & Commitment',
  description: 'Learn about Golden Gate Manor Inc., a family-owned company dedicated to enhancing quality of life through dependable healthcare transportation and services.',

  ogTitle: 'About Golden Gate Manor Inc. | Our Story & Commitment',
  ogDescription: 'Learn about Golden Gate Manor Inc., a family-owned company dedicated to enhancing quality of life through dependable healthcare transportation and services.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  ogSiteName: 'Golden Gate Manor Inc.',

  twitterTitle: 'About Golden Gate Manor Inc. | Our Story & Commitment',
  twitterDescription: 'Learn about Golden Gate Manor Inc., a family-owned company dedicated to enhancing quality of life through dependable healthcare transportation and services.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',

  articleAuthor: ['https://www.linkedin.com/in/zachary-thallas/'], // Can be a real profile or company
  articlePublishedTime: publishDate,
})


defineOptions({
    name: 'HomePage'
})
</script>

<style></style>