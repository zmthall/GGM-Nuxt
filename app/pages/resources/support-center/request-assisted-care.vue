<template>
    <div>
        Prepare
    </div>
</template>

<script setup lang='ts'>
definePageMeta({
  title: 'How to Request Assisted Living Care',
  breadcrumbLabel: 'Request Care'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'How to request Assisted Living Care',
  ogTitle: 'How to request Assisted Living Care',
  description: 'Learn how to request services with Golden Gate Manor Assisted Living Facilities. We will walk you through the process.',
  ogDescription: 'Learn how to request services with Golden Gate Manor Assisted Living Facilities. We will walk you through the process.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-assisted-living.png`,
  twitterTitle: 'How to request Assisted Living Care',
  twitterDescription: 'Learn how to request services with Golden Gate Manor Assisted Living Facilities. We will walk you through the process.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-assisted-living.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'HowToRequestAssistedCarePage'
})
</script>

<style></style>