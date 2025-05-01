<template>
  <div>
    Resources
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'Golden Gate Manor Resources',
  breadcrumbLabel: 'Resources'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Resources & Support',
  ogTitle: 'Resources & Support',
  description: 'Explore valuable resources and support information provided by Golden Gate Manor Inc. for transportation, assisted living, and healthcare needs.',
  ogDescription: 'Explore valuable resources and support information provided by Golden Gate Manor Inc. for transportation, assisted living, and healthcare needs.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Resources & Support',
  twitterDescription: 'Explore valuable resources and support information provided by Golden Gate Manor Inc. for transportation, assisted living, and healthcare needs.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
  name: 'ResourcePage'
})
</script>

<style>

</style>