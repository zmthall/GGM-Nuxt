<template>
  <div>
    <!-- Page Banner -->
    <BaseLayoutPageBanner src="/images/pages/about-us/about-us-car-lineup.jpeg" :alt="$t('company.about-us.top.alt-title')" loading="eager" :title="$t('company.about-us.top.alt-title')" aspect-ratio="aspect-[2/1]" format="webp,avif" image-height="640" image-width="1240" />
    <!-- Top Page -->
    <BaseLayoutPageSection v-once margin="top">
      <BaseLayoutPageContainer class="flex flex-col space-y-4">
        <!-- <img src="/images/about-us/about-us-car-lineup.jpeg" alt="Golden Gate Manor Transportation cars lined up in front of dispatch office building."> -->
        <h2 class="text-2xl font-bold text-brand-primary">{{ $t('company.about-us.top.title') }}</h2>
        <p class="text-xl text-brand-main-text">
          {{ $t('company.about-us.top.paragraph[0]') }}
        </p>
        <p class="text-xl text-brand-main-text ">
          {{ $t('company.about-us.top.operations.intro') }}
        </p>
        <ul class="text-xl text-brand-main-text ml-8 list-disc !mt-0">
          <li v-for="item in $tm('company.about-us.top.operations.list')" :key="item">
            {{ $rt(item) }}
          </li>
        </ul>
        <p class="text-xl text-brand-main-text">
          {{ $t('company.about-us.top.paragraph[1]') }}
        </p>
        <p class="text-xl text-brand-main-text">{{ $t('company.about-us.top.paragraph[2]') }} <a :href="officeHref" class="link">{{ officeTel }}</a>, {{ $t('company.about-us.top.paragraph[3]') }}</p>
        <BaseUiAction :to="$localePath('/company/contact-us')" class="py-4 px-16 self-center">{{ $t('company.about-us.top.button') }}</BaseUiAction>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>

    <!-- Assisted Living -->
    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" bg="alt" class="cv-auto">
        <BaseLayoutPageContainer class="space-y-8">
          <div class="space-y-4">
            <h2 class="text-2xl font-bold text-brand-primary">
              {{ $t('company.about-us.assisted-living.title') }}
            </h2>
            <p class="text-xl text-brand-main-text">
              {{ $t('company.about-us.assisted-living.paragraph[0]') }}
            </p>
            <p class="text-xl text-brand-main-text">
              {{ $t('company.about-us.assisted-living.paragraph[1]') }} <a :href="`tel:${company?.assitedLiving.phone}`" class="link">{{ company?.assitedLiving.phone }}</a> 
              {{ $t('company.about-us.assisted-living.paragraph[2]') }}
            </p>
            <div>
              <p class="text-xl text-brand-main-text font-bold">
                {{ $t('company.about-us.assisted-living.locations.intro')}}
              </p>
              <ul class="section-list-container text-xl text-brand-main-text list-disc ml-8 space-y-2">
                <li v-for="item in $tm('company.about-us.assisted-living.locations.list')" :key="item" class="section-list-item">
                  {{  $rt(item) }}
                </li>
              </ul>
            </div>
          </div>
        </BaseLayoutPageContainer>
        <div class="hidden xl:flex xl:justify-center xl:gap-12 xl:mt-8">
          <NuxtImg src="/images/pages/about-us/golden-gate-manor-1.jpeg" format="webp,avif" quality="60" sizes="xl:400px" alt="Golden Gate Manor I 606 West Abriendo Ave. Pueblo, CO 81004" title="Golden Gate Manor I 606 West Abriendo Ave. Pueblo, CO 81004" class="xl:block xl:w-[17%] xl:h-max rounded-lg shadow-primary hover:scale-110"  loading="lazy" width="400" height="266" decoding="async"/>
          <NuxtImg src="/images/pages/about-us/golden-gate-manor-2.jpeg" format="webp,avif" quality="60" sizes="xl:400px" alt="Golden Gate Manor II 1219 Lake Ave. Pueblo, CO 81004" title="Golden Gate Manor II 1219 Lake Ave. Pueblo, CO 81004" class="xl:block xl:w-[17%] xl:h-max rounded-lg shadow-primary hover:scale-110" loading="lazy" width="400" height="266" decoding="async" />
          <NuxtImg src="/images/pages/about-us/golden-horizon.jpeg" format="webp,avif" quality="60" sizes="xl:400px" alt="Golden Horizon 2109 Chautard Dr. Pueblo, CO 81005" title="Golden Horizon 2109 Chautard Dr. Pueblo, CO 81005" class="xl:block xl:w-[17%] xl:h-max rounded-lg shadow-primary hover:scale-110" loading="lazy" width="400" height="266" decoding="async" />
          <NuxtImg src="/images/pages/about-us/golden-valley.jpeg" format="webp,avif" quality="60" sizes="xl:400px" alt="Golden View 525 West 9th St. Pueblo, CO 81003" title="Golden View 525 West 9th St. Pueblo, CO 81003" class="xl:block xl:w-[17%] xl:h-max rounded-lg shadow-primary hover:scale-110" loading="lazy" width="400" height="266" />
          <NuxtImg src="/images/pages/about-us/golden-view.jpeg" format="webp,avif" quality="60" sizes="xl:400px" alt="Golden Valley 1033 East Evans Ave. Pueblo, CO 81004" title="Golden Valley 1033 East Evans Ave. Pueblo, CO 81004" class="xl:block xl:w-[17%] xl:h-max rounded-lg shadow-primary hover:scale-110" loading="lazy" width="400" height="266" decoding="async" />
        </div>
      </BaseLayoutPageSection>
    </DeferRender>

    <!-- Transportation Services -->
    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" class="cv-auto">
        <BaseLayoutPageContainer class="space-y-4">
          <h2 class="text-2xl font-bold text-brand-primary">
            {{ $t('company.about-us.transportation.title') }}
          </h2>
          <div class="flex flex-col space-y-4 lg:flex-row lg:gap-12 items-center">
            <NuxtImg 
              src="/images/pages/about-us/transportation-services-ratio.jpeg"
              format="avif,webp"
              quality="60"
              sizes="100vw sm:650px"
              densities="1"
              class="rounded-lg shadow-primary w-full aspect-[2/1] object-contain" 
              :alt="$t('company.about-us.transportation.alt-title')" 
              :title="$t('company.about-us.transportation.alt-title')"
              placeholder
              loading="lazy"
              height="400"
              width="800"
              decoding="async"
            />
            <div class="space-y-4">
              <p v-for="paragraph in $tm('company.about-us.transportation.paragraph')" :key="paragraph" class="text-xl text-brand-main-text">
                {{ $rt(paragraph) }}
              </p>
            </div>
          </div>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>

    <!-- Medical Supply -->
    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" bg="alt" class="cv-auto">
        <BaseLayoutPageContainer class="space-y-4">
          <h2 class="text-2xl font-bold text-brand-primary">
           {{ $t('company.about-us.medical-supply.title') }}
          </h2>
          <div class="flex flex-col-reverse lg:flex-row lg:gap-12">
            <div class="space-y-4 mt-4">
              <p v-for="paragraph in $tm('company.about-us.medical-supply.paragraph')" :key="paragraph" class="text-xl text-brand-main-text">
                {{ $rt(paragraph) }}
              </p>
            </div>
            <NuxtImg 
              src="/images/pages/about-us/medical-supply-store.jpeg"
              format="webp,avif"
              quality="60"
              sizes="400px sm:650px md:600px"
              class="rounded-lg shadow-primary h-max" 
              :alt="$t('company.about-us.medical-supply.alt-title')"
              :title="$t('company.about-us.medical-supply.alt-title')"
              loading="lazy"
              height="416"
              width="600"
              decoding="async"
            />
          </div>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>

    <!-- Gas Station -->
    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" class="cv-auto">
        <BaseLayoutPageContainer class="flex flex-col  space-y-4">
          <h2 class="text-2xl font-bold text-brand-primary">
            {{ $t('company.about-us.gas-station.title') }}
          </h2>
          <div class="flex flex-col gap-4 space-y-4 lg:flex-row lg:gap-12">
            <NuxtImg 
              src="/images/pages/about-us/gas-station-about-us3.jpg"
              format="webp,avif"
              quality="60"
              sizes="400px sm:650px md:600px"
              class="rounded-lg shadow-primary"
              :alt="$t('company.about-us.gas-station.alt-title')"
              :title="$t('company.about-us.gas-station.alt-title')"
              loading="lazy"
              height="416"
              width="600"
              decoding="async"
            />
            <div class="space-y-4">
              <p v-for="paragraph in $tm('company.about-us.gas-station.paragraph')" :key="paragraph" class="text-xl text-brand-main-text">
                {{ $rt(paragraph) }}
              </p>
            </div>
          </div>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>

    <!-- Our Team -->
    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" bg="alt" class="cv-auto">
        <BaseLayoutPageContainer class="space-y-4">
          <h2 class="text-2xl font-bold text-brand-primary">
            {{ $t('company.about-us.our-team.title') }}
          </h2>
          <p class="text-xl text-brand-main-text">
            {{ $t('company.about-us.our-team.paragraph')}}
          </p>
          <div>
            <p class="section-list-description text-xl text-brand-main-text font-bold">
              {{ $t('company.about-us.our-team.specialized-staff.intro') }}
            </p>
            <ul class="section-list-container text-xl text-brand-main-text list-disc ml-8 space-y-2">
              <li v-for="item in $tm('company.about-us.our-team.specialized-staff.list')" :key="item" class="section-list-item text-xl text-brand-main-text">
                {{ $rt(item) }}
              </li>
            </ul>
          </div>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>
  </div>
</template>

<script setup lang='ts'>
import company from '../../../data/company.json'
const runtimeConfig = useRuntimeConfig()

const officeTel = company.trans.phone.office;
const officeHref = `tel:${officeTel}`

definePageMeta({
  title: 'About Golden Gate Manor Inc.',
  breadcrumbLabel: 'About Us',
  breadcrumbOverrides: [
    undefined,
    false,
    undefined
  ]
})

useSeoMeta({
  title: 'About Us | Pueblo | Our Story & Commitment',
  description: 'Learn about Golden Gate Manor Inc., a family-owned company dedicated to enhancing quality of life through dependable healthcare transportation and services.',

  ogTitle: 'About Us | Pueblo | Our Story & Commitment',
  ogDescription: 'Learn about Golden Gate Manor Inc., a family-owned company dedicated to enhancing quality of life through dependable healthcare transportation and services.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  ogSiteName: 'Golden Gate Manor Inc.',

  twitterTitle: 'About Us | Pueblo | Our Story & Commitment',
  twitterDescription: 'Learn about Golden Gate Manor Inc., a family-owned company dedicated to enhancing quality of life through dependable healthcare transportation and services.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})


defineOptions({
  name: 'AboutUSPage'
})
</script>

<style></style>