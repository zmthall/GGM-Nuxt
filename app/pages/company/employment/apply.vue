<template>
  <div>
    <EmploymentApplyModal />
    <EmploymentApplication />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'Golden Gate Manor - Application',
  breadcrumbLabel: 'Application'
})

useHead({
  titleTemplate: null
})

const runtimeConfig = useRuntimeConfig()

useSeoMeta({
  title: 'Join Our Team | Careers at Golden Gate Manor Inc.',
  ogTitle: 'Join Our Team | Careers at Golden Gate Manor Inc.',
  description: 'Explore rewarding career opportunities at Golden Gate Manor Inc. in transportation, assisted living, and medical supplies. Apply today!',
  ogDescription: 'Explore rewarding career opportunities at Golden Gate Manor Inc. in transportation, assisted living, and medical supplies. Apply today!',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Join Our Team | Careers at Golden Gate Manor Inc.',
  twitterDescription: 'Explore rewarding career opportunities at Golden Gate Manor Inc. in transportation, assisted living, and medical supplies. Apply today!',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

</script>

<style>

</style>