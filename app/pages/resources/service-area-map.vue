<template>
    <div>
        <BaseInteractiveServiceAreaMap />
    </div>
</template>

<script setup lang='ts'> 
definePageMeta({
  title: 'Transportation Area Service Map',
  breadcrumbLabel: 'Service Map'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Transportation Area Service Map',
  ogTitle: 'Transportation Area Service Map',
  description: 'Easily see where our transportation services are able to service by using our interactive Colroado county map.',
  ogDescription: 'Easily see where our transportation services are able to service by using our interactive Colroado county map.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Schedule Your Transportation',
  twitterDescription: 'Easily see where our transportation services are able to service by using our interactive Colroado county map.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'ServiceAreaMapPage'
})
</script>

<style></style>