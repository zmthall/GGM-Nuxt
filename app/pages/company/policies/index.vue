<template>
  <div>
    <BaseLayoutPageSection margin="pTop">
      <BaseLayoutPageContainer class="space-y-8">
        <h2 class="text-2xl font-bold text-brand-primary max-sm:hidden">{{ $t('company.policies.website.title') }}</h2>
        <div class="flex flex-col lg:grid lg:grid-cols-3 gap-8">
          <BaseUiAction v-for="policy in websitePolicies" :key="`website-${$rt(policy.content)}`" :to="$localePath($rt(policy.to))" variant="blank" styling="flex gap-4 items-center justify-center h-24" class="bg-zinc-300 rounded-lg hover:bg-zinc-500 hover:text-white hover:font-bold lg:hover:scale-105 transition-transform duration-500 ease-in-out group"><BaseIcon :name="$rt(policy.icon)" color="text-black" hover-color="group-hover:text-white"/><span>{{ $rt(policy.content) }}</span></BaseUiAction>
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
    <BaseLayoutPageSection margin="default">
      <BaseLayoutPageContainer class="space-y-8">
        <h2 class="text-2xl font-bold text-brand-primary">{{ $t('company.policies.transportation.title') }}</h2>
        <div>
          <NuxtLink :to="$localePath('/company/policies/ride-cancellation')" class="h-24 flex items-center gap-4 justify-center bg-zinc-300 rounded-lg hover:bg-zinc-500 hover:text-white hover:font-bold lg:hover:scale-105 transition-transform duration-500 ease-in-out group"><BaseIcon name="material-symbols:event-busy-sharp" color="text-black" hover-color="group-hover:text-white" /><span>{{ $t('company.policies.transportation.policy[0].content') }}</span></NuxtLink>
        </div>
        <BaseUiAction :to="$localePath('/company/contact-us')" class="p-4">{{ $t('company.policies.transportation.button') }}</BaseUiAction>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
    <DeferRender when="visible" root-margin="1px 0px">
      <BaseLayoutPageSection margin="pDefault" class="cv-auto">
        <BaseLayoutPageContainer class="space-y-8">
          <h2 class="text-2xl font-bold text-brand-primary">{{ $t('company.policies.medical-ecommerce.title') }}</h2>
          <div class="flex flex-col lg:grid lg:grid-cols-4 gap-8">
            <BaseUiAction v-for="policy in medicalEcommercePolicies" :key="`med-ecom-${$rt(policy.content)}`" new-page :href="$rt(policy.href)" variant="blank" styling="h-24 flex items-center gap-4 justify-center" class="bg-zinc-300 rounded-lg hover:bg-zinc-500 hover:text-white hover:font-bold lg:hover:scale-105 transition-transform duration-500 ease-in-out group"><BaseIcon :name="$rt(policy.icon)" color="text-black" hover-color="group-hover:text-white" /><span>{{ $rt(policy.content) }}</span></BaseUiAction>
          </div>
          <BaseUiAction href="https://goldengatemedicalsupply.com/pages/contact-us" new-page class="p-4">{{ $t('company.policies.medical-ecommerce.button') }}</BaseUiAction>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'Golden Gate Manor Policies',
  breadcrumbLabel: 'Policies',
  breadcrumbOverrides: [
    undefined,
    { label: 'About Us', to: '/company/about-us' },
    undefined
  ]
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

type Policies = {
  content: string;
  icon: string;
  to: string;
  href: string;
}[]

const websitePolicies = $tm('company.policies.website.policy') as Policies;
const medicalEcommercePolicies = $tm('company.policies.medical-ecommerce.policy') as Policies;


</script>

<style>

</style>