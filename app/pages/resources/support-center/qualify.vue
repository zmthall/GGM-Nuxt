<template>
    <div>
        Qualify
    </div>
</template>

<script setup lang='ts'>
definePageMeta({
  title: 'Qualification for Transportation Services',
  breadcrumbLabel: 'Qaulify for Services'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Qualification for Transportation Services',
  ogTitle: 'Qualification for Transportation Services',
  description: 'Discover eligibility requirements for Golden Gate Manor Inc.\'s transportation services, including Medicaid qualifications and private options.',
  ogDescription: 'Discover eligibility requirements for Golden Gate Manor Inc.\'s transportation services, including Medicaid qualifications and private options.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Qualification for Transportation Services',
  twitterDescription: 'Discover eligibility requirements for Golden Gate Manor Inc.\'s transportation services, including Medicaid qualifications and private options.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'HowToQualifyPage'
})
</script>

<style></style>