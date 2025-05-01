<template>
    <div>
        community
    </div>
</template>

<script setup lang='ts'>
definePageMeta({
  title: 'Community Outreach and Events',
  breadcrumbLabel: 'Community'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Community News & Events',
  ogTitle: 'Community News & Events',
  description: 'Follow community news and local events involving Golden Gate Manor Inc., highlighting our commitment to Southern Colorado\'s health and wellness.',
  ogDescription: 'Follow community news and local events involving Golden Gate Manor Inc., highlighting our commitment to Southern Colorado\'s health and wellness.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Community News & Events',
  twitterDescription: 'Follow community news and local events involving Golden Gate Manor Inc., highlighting our commitment to Southern Colorado\'s health and wellness.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'CommunityPage'
})
</script>

<style></style>