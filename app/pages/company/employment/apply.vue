<template>
  <div>
    <EmploymentApplyModal v-model="noticesCompleted" />
    <EmploymentApplication v-if="noticesCompleted" />
    <div v-else class="h-[100vh]" />
  </div>
</template>

<script lang="ts" setup>
const noticesCompleted = ref<boolean>(false)

definePageMeta({
  title: 'Golden Gate Manor - Pre-Application',
  breadcrumbLabel: 'Pre-Application'
})

useHead({
  titleTemplate: null
})

const runtimeConfig = useRuntimeConfig()

useSeoMeta({
  title: 'Join Our Team | Apply for work at Golden Gate Manor Inc.',
  ogTitle: 'Join Our Team | Apply for work at Golden Gate Manor Inc.',
  description: 'Submit an app to join Golden Gate Manor Inc. in transportation, assisted living, or medical supply services. Start a career with a trusted Pueblo company.',
  ogDescription: 'Submit an app to join Golden Gate Manor Inc. in transportation, assisted living, or medical supply services. Start a career with a trusted Pueblo company.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Join Our Team | Apply for work at Golden Gate Manor Inc.',
  twitterDescription: 'Submit an app to join Golden Gate Manor Inc. in transportation, assisted living, or medical supply services. Start a career with a trusted Pueblo company.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

</script>

<style>

</style>