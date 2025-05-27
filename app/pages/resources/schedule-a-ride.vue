<template>
    <div>
        <ScheduleARideForm />
    </div>
</template>

<script setup lang='ts'> 
definePageMeta({
  title: 'Schedule Your Transportation',
  breadcrumbLabel: 'Schedule a Ride'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Schedule Your Transportation',
  ogTitle: 'Schedule Your Transportation',
  description: 'Easily schedule your non-emergency medical or personal transportation with Golden Gate Manor Inc., ensuring timely arrivals and comfortable travel.',
  ogDescription: 'Easily schedule your non-emergency medical or personal transportation with Golden Gate Manor Inc., ensuring timely arrivals and comfortable travel.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Schedule Your Transportation',
  twitterDescription: 'Easily schedule your non-emergency medical or personal transportation with Golden Gate Manor Inc., ensuring timely arrivals and comfortable travel.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'ScheduleRidePage'
})
</script>

<style></style>