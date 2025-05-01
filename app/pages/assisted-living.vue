<template>
    <div>
        Assisted Living
    </div>
</template>

<script setup lang='ts'>
const runtimeConfig = useRuntimeConfig()
definePageMeta({
  title: 'Assisted Living',
})

useSeoMeta({
  title: 'Assisted Living in Southern Colorado',
  ogTitle: 'Assisted Living in Southern Colorado',
  description: 'Discover compassionate and comfortable assisted living options at Golden Gate Manor Inc., serving seniors across Southern Colorado with dignity and care.',
  ogDescription: 'Discover compassionate and comfortable assisted living options at Golden Gate Manor Inc., serving seniors across Southern Colorado with dignity and care.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-assisted-living.png`,
  twitterTitle: 'Assisted Living in Southern Colorado',
  twitterDescription: 'Discover compassionate and comfortable assisted living options at Golden Gate Manor Inc., serving seniors across Southern Colorado with dignity and care.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-assisted-living.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'AssistedLivingPage'
})
</script>

<style></style>