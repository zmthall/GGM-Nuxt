<!-- layouts/error.vue -->
<template>
  <div class="min-h-screen flex flex-col justify-center items-center p-8 bg-brand-background">
    <div class="flex items-center text-[200px] text-brand-primary">
      <span>4</span>
      <BaseIcon name="game-icons:flat-tire" size="size-40"/>
      <span>4</span>
    </div>
    <div class="flex flex-col gap-4">
      <h1 class="text-4xl font-extrabold text-brand-primary">Page not found</h1>
      <p class="text-2xl text-brand-main-text">
        Uh oh, we seem to have ran into a problem trying to locate the page you're looking for. Try going to the <button class="link" @click="goBack">previous page</button> or <NuxtLink to="/" class="link">go back home</NuxtLink>.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "ErrorPages"
})

const runtimeConfig = useRuntimeConfig()

useSeoMeta({
  title: 'Golden Gate Gas & Goods',
  ogTitle: 'Golden Gate Gas & Goods',
  description: 'Overview of Golden Gate Manor Inc. Gas & Goods. Learn about our current venture into the gas station realm.',
  ogDescription: 'Overview of Golden Gate Manor Inc. Gas & Goods. Learn about our current venture into the gas station realm.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-medical-supply.png`,
  twitterTitle: 'Golden Gate Gas & Goods',
  twitterDescription: 'Overview of Golden Gate Manor Inc. Gas & Goods. Learn about our current venture into the gas station realm.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-medical-supply.png`,
  twitterCard: 'summary_large_image',
})

useHead({
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
    }
  ]
})

const goBack = () => {
  if (window.history.length > 1) {
    window.history.back()
  } else {
    // fallback if no history (e.g. direct 404 visit)
    navigateTo('/')
  }
}
</script>