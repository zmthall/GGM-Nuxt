<template>
  <div>
    <BaseLayoutPageSection margin="pTop">
      <BaseLayoutPageContainer class="space-y-8">
        <h2 class="text-2xl font-bold text-brand-primary max-sm:hidden">Golden Gate Manor Inc Website Policies</h2>
        <div class="flex flex-col lg:grid lg:grid-cols-3 gap-8">
          <NuxtLink to="/company/policies/terms-and-conditions" class="h-24 justify-center bg-zinc-300 rounded-lg hover:bg-zinc-500 hover:text-white hover:font-bold lg:hover:scale-105 transition-transform duration-500 ease-in-out flex gap-4 items-center group"><BaseIcon name="game-icons:scales" color="text-black" hover-color="group-hover:text-white" /><span>Terms and Conditions</span></NuxtLink>
          <NuxtLink to="/company/policies/privacy" class="h-24 flex items-center gap-4 justify-center bg-zinc-300 rounded-lg hover:bg-zinc-500 hover:text-white hover:font-bold lg:hover:scale-105 transition-transform duration-500 ease-in-out group"><BaseIcon name="solar:shield-bold" color="text-black" hover-color="group-hover:text-white" /><span>Privacy Policy</span></NuxtLink>
          <NuxtLink to="/company/policies/accessibility" class="h-24 flex items-center gap-4 justify-center bg-zinc-300 rounded-lg hover:bg-zinc-500 hover:text-white hover:font-bold lg:hover:scale-105 transition-transform duration-500 ease-in-out group"><BaseIcon name="ic:round-handshake" color="text-black" hover-color="group-hover:text-white" /><span>Accessibility</span></NuxtLink>
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
    <BaseLayoutPageSection margin="default">
      <BaseLayoutPageContainer class="space-y-8">
        <h2 class="text-2xl font-bold text-brand-primary">Transportation Policies</h2>
        <div>
          <NuxtLink to="/company/policies/ride-cancellation" class="h-24 flex items-center gap-4 justify-center bg-zinc-300 rounded-lg hover:bg-zinc-500 hover:text-white hover:font-bold lg:hover:scale-105 transition-transform duration-500 ease-in-out group"><BaseIcon name="material-symbols:event-busy-sharp" color="text-black" hover-color="group-hover:text-white" /><span>Ride Cancellation Policy</span></NuxtLink>
        </div>
        <BaseUiAction to="/company/contact-us" class="p-4">Transportation Contact</BaseUiAction>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
    <DeferRender when="visible" root-margin="0px 0px">
      <BaseLayoutPageSection margin="pDefault">
        <BaseLayoutPageContainer class="space-y-8">
          <h2 class="text-2xl font-bold text-brand-primary">Medical Ecommerce Policies</h2>
          <div class="flex flex-col lg:grid lg:grid-cols-4 gap-8">
            <a href="https://goldengatemedicalsupply.com/pages/terms-conditions" target="_blank" rel="noopener" class="h-24 flex items-center gap-4 justify-center bg-zinc-300 rounded-lg hover:bg-zinc-500 hover:text-white hover:font-bold lg:hover:scale-105 transition-transform duration-500 ease-in-out group"><BaseIcon name="game-icons:scales" color="text-black" hover-color="group-hover:text-white" /><span>Terms and Conditions</span></a>
            <a href="https://goldengatemedicalsupply.com/pages/privacy-policy" target="_blank" rel="noopener" class="h-24 flex items-center gap-4 justify-center bg-zinc-300 rounded-lg hover:bg-zinc-500 hover:text-white hover:font-bold lg:hover:scale-105 transition-transform duration-500 ease-in-out group"><BaseIcon name="solar:shield-bold" color="text-black" hover-color="group-hover:text-white" /><span>Privacy Policy</span></a>
            <a href="https://goldengatemedicalsupply.com/pages/shipping-policy" target="_blank" rel="noopener" class="h-24 flex items-center gap-4 justify-center bg-zinc-300 rounded-lg hover:bg-zinc-500 hover:text-white hover:font-bold lg:hover:scale-105 transition-transform duration-500 ease-in-out group"><BaseIcon name="hugeicons:shipping-truck-02" color="text-black" hover-color="group-hover:text-white" /><span>Shipping Policy</span></a>
            <a href="https://goldengatemedicalsupply.com/pages/return-policy" target="_blank" rel="noopener" class="h-24 flex items-center gap-4 justify-center bg-zinc-300 rounded-lg hover:bg-zinc-500 hover:text-white hover:font-bold lg:hover:scale-105 transition-transform duration-500 ease-in-out group"><BaseIcon name="tabler:truck-return" color="text-black" hover-color="group-hover:text-white" /><span>Return Policy</span></a>
          </div>
          <BaseUiAction href="https://goldengatemedicalsupply.com/pages/contact-us" :new-page="true" class="p-4">Medical Supply Contact</BaseUiAction>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'Golden Gate Manor Policies',
  breadcrumbLabel: 'Policies'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Company Policies',
  ogTitle: 'Company Policies',
  description: 'Review Golden Gate Manor Inc.\'s company policies, ensuring transparent and reliable transportation, assisted living, and healthcare supply services.',
  ogDescription: 'Review Golden Gate Manor Inc.\'s company policies, ensuring transparent and reliable transportation, assisted living, and healthcare supply services.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Company Policies',
  twitterDescription: 'Review Golden Gate Manor Inc.\'s company policies, ensuring transparent and reliable transportation, assisted living, and healthcare supply services.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
  name: 'CompanyPoliciesPage'
})


</script>

<style>

</style>