<template>
  <div>
    <EmploymentApplyModal v-model="noticesCompleted" />
    <EmploymentApplication v-if="noticesCompleted" />
    <div v-else class="h-[100vh]" />
  </div>
</template>

<script lang="ts" setup>
const noticesCompleted = ref(false)

definePageMeta({
  title: 'Golden Gate Manor - Pre-Application',
  breadcrumbLabel: 'Pre-Application',
  breadcrumbOverrides: [
    undefined,
    { label: 'About Us', to: '/company/about-us' },
    undefined,
    undefined
  ]
})

// Composables must remain in the normal setup context,
// not inside definePageMeta().
const runtimeConfig = useRuntimeConfig()

const siteBase = String(runtimeConfig.public.siteUrl)
  .replace(/\/+$/, '')

const canonicalUrl = `${siteBase}/company/employment/apply`

useHead({
  titleTemplate: null,
  link: [
    {
      rel: 'canonical',
      href: canonicalUrl
    }
  ]
})

useSeoMeta({
  title: 'Join Our Team | Apply for work at Golden Gate Manor Inc.',
  ogTitle: 'Join Our Team | Apply for work at Golden Gate Manor Inc.',
  description:
    'Submit an app to join Golden Gate Manor Inc. in transportation, assisted living, or medical supply services. Start a career with a trusted Pueblo company.',
  ogDescription:
    'Submit an app to join Golden Gate Manor Inc. in transportation, assisted living, or medical supply services. Start a career with a trusted Pueblo company.',
  ogUrl: canonicalUrl,
  ogImage: `${siteBase}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle:
    'Join Our Team | Apply for work at Golden Gate Manor Inc.',
  twitterDescription:
    'Submit an app to join Golden Gate Manor Inc. in transportation, assisted living, or medical supply services. Start a career with a trusted Pueblo company.',
  twitterImage: `${siteBase}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image'
})
</script>

<style>

</style>