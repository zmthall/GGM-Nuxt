<template>
    <div>
        schedule-a-ride
    </div>
</template>

<script setup lang='ts'>
definePageMeta({
  title: 'How to Schedule a Ride',
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'How to Schedule a Ride',
  ogTitle: 'How to Schedule a Ride',
  description: 'Learn how to easily schedule your transportation with Golden Gate Manor Inc. Follow our simple steps to arrange reliable rides for medical and personal trips.',
  ogDescription: 'Learn how to easily schedule your transportation with Golden Gate Manor Inc. Follow our simple steps to arrange reliable rides for medical and personal trips.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'How to Schedule a Ride',
  twitterDescription: 'Learn how to easily schedule your transportation with Golden Gate Manor Inc. Follow our simple steps to arrange reliable rides for medical and personal trips.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'HowToScheduleARidePage'
})
</script>

<style></style>