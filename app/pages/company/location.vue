<template>
  <div>
    <!-- Business Location Map -->
    <BaseInteractiveLocationMap />

    <!-- Business Information -->
    <section class="business-information-section">
      <div class="business-information-wrapper">
        <div class="contact-info-container content-information-container">
          <h2 class="content-title bolded-text">Contact Information</h2>
          <p class="content-text"><span class="bolded-text">Need Company Name</span></p>
          <p class="content-text"><span class="bolded-text">Address: </span>Need Transportation Address</p>
          <p class="content-text">Need Transportation Company Address</p>
          <p class="content-text"><span class="bolded-text">Phone: </span><a rel="nofollow"
              href="tel:<%- company.phone_number_nemt %>" class="primary-link">Need NEMT Number</a></p>
        </div>
        <div class="reservation-hours-container content-information-container">
          <h2 class="content-title bolded-text">Reservation Hours</h2>
          <p class="content-text reservation-days-hours">
            <span class="bolded-text">Need Business Days</span>
            <span>Need Business Hours></span>
          </p>
        </div>
        <div class="get-connected-container content-information-container">
          <h2 class="content-title bolded-text">Get Connected</h2>
          <a rel="nofollow" href="<%- company.social.facebook.href %>" class="facebook-page-link">
            <div class="social-logo-wrapper">
              <ul>
                <li v-for="socialHandle in staticData.socialHandles" :key="socialHandle.id">
                  <NuxtLink :to="socialHandle.url"><BaseIcon :name="socialHandle.icon" /></NuxtLink>
                </li>
              </ul>
            </div>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang='ts'>
const staticData = useStaticData()

definePageMeta({
  title: 'Golden Gate Manor Service Locations',
  breadcrumbLabel: 'Locations'
})

useHead({
  titleTemplate: null
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Our Locations | Golden Gate Manor Inc. Serving Colorado',
  ogTitle: 'Our Locations | Golden Gate Manor Inc. Serving Colorado',
  description: 'View locations for Golden Gate Manor Inc. facilities and services. Providing reliable healthcare transportation and assisted living across Southern Colorado.',
  ogDescription: 'View locations for Golden Gate Manor Inc. facilities and services. Providing reliable healthcare transportation and assisted living across Southern Colorado.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Our Locations | Golden Gate Manor Inc. Serving Colorado',
  twitterDescription: 'View locations for Golden Gate Manor Inc. facilities and services. Providing reliable healthcare transportation and assisted living across Southern Colorado.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
  name: 'LocationPage'
})
</script>

<style></style>