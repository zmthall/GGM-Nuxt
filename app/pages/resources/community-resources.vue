<template>
    <div>
        community resources
    </div>
</template>

<script setup lang='ts'>
definePageMeta({
  title: 'Community Resources',
  redirect: '/'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Community Resources',
  ogTitle: 'Community Resources',
  description: 'Access valuable community resources recommended by Golden Gate Manor Inc., supporting health, transportation, and senior living in Southern Colorado.',
  ogDescription: 'Access valuable community resources recommended by Golden Gate Manor Inc., supporting health, transportation, and senior living in Southern Colorado.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Community Resources',
  twitterDescription: 'Access valuable community resources recommended by Golden Gate Manor Inc., supporting health, transportation, and senior living in Southern Colorado.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
  robots: 'noindex, nofollow'
})

defineOptions({
    name: 'CommunityResourcesPage'
})
</script>

<style></style>