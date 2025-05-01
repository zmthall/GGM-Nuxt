<template>
  <div>
    Privacy Policy
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'Privacy Policy',
  breadcrumbLabel: 'Privacy'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Privacy Policy',
  ogTitle: 'Privacy Policy',
  description: 'Review how Golden Gate Manor Inc. collects, uses, and protects your personal information when you use our services or visit our website.',
  ogDescription: 'Review how Golden Gate Manor Inc. collects, uses, and protects your personal information when you use our services or visit our website.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Privacy Policy',
  twitterDescription: 'Review how Golden Gate Manor Inc. collects, uses, and protects your personal information when you use our services or visit our website.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'PrivacyPolicyPage'
})
</script>

<style>

</style>