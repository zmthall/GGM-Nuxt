<template>
  <div>
    Medical Supplies
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'Medical Supplies & Equipment',
  breadcrumbLabel: 'Medical Supply'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Medical Supplies & Equipment',
  ogTitle: 'Medical Supplies & Equipment',
  description: 'Shop durable medical equipment and medical supplies at Golden Gate Manor Inc. Serving Pueblo and Southern Colorado with reliable healthcare solutions.',
  ogDescription: 'Shop durable medical equipment and medical supplies at Golden Gate Manor Inc. Serving Pueblo and Southern Colorado with reliable healthcare solutions.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-medical-supply.png`,
  twitterTitle: 'Medical Supplies & Equipment',
  twitterDescription: 'Shop durable medical equipment and medical supplies at Golden Gate Manor Inc. Serving Pueblo and Southern Colorado with reliable healthcare solutions.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-medical-supply.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
  name: 'MedicalSuppliesPage'
})
</script>

<style>

</style>