<template>
    <div>
        Contact Us
    </div>
</template>

<script setup lang='ts'>
definePageMeta({
  title: 'Contact Golden Gate Manor Team',
  breadcrumbLabel: 'Contact Us'
})

useHead({
    titleTemplate: null
})

const runtimeConfig = useRuntimeConfig();
useSeoMeta({
  title: 'Contact Golden Gate Manor Inc. | Southern Colorado',
  description: 'Get in touch with Golden Gate Manor Inc. for transportation, assisted living, and medical supply services. Proudly serving Pueblo and Southern Colorado.',
  ogTitle: 'Contact Golden Gate Manor Inc. | Southern Colorado',
  ogDescription: 'Get in touch with Golden Gate Manor Inc. for transportation, assisted living, and medical supply services. Proudly serving Pueblo and Southern Colorado.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Contact Golden Gate Manor Inc. | Southern Colorado',
  twitterDescription: 'Get in touch with Golden Gate Manor Inc. for transportation, assisted living, and medical supply services. Proudly serving Pueblo and Southern Colorado',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'ContactUsPage'
})
</script>

<style></style>