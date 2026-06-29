<template>
  <div>
    <BaseLayoutPageSection margin="top">
      <!-- Top Page -->
      <BaseLayoutPageContainer>
            <h2 class="text-2xl text-center font-bold text-brand-primary flex flex-col mb-4 max-sm:hidden">
                <span class="text-gray-500">
                    Golden Gate Manor
                </span>
                <span class="text-brand-primary">
                    {{ $t('assisted-living.top.title') }}
                </span>
            </h2>
            <div class="flex flex-col space-y-4">
                <div class="flex flex-col-reverse justify-center lg:flex-row lg:items-end sm:gap-8 mt-4">
                    <!-- Left Side -->
                    <div class="lg:w-1/2 space-y-4">
                        <p class="text-xl text-brand-main-text">
                            {{ $t('assisted-living.top.paragraph[0]') }}
                        </p>
                        <p class="text-xl text-brand-main-text">
                            {{ $t('assisted-living.top.paragraph[1]') }}
                        </p>
                    </div>
                    <!-- Right Side -->
                    <div class="lg:w-1/2 flex">
                      <AssistedLivingImage />
                    </div>
                </div>
                <p class="text-xl text-brand-main-text">
                    {{ $t('assisted-living.top.paragraph[2]') }}
                </p>
                <p class="text-xl text-brand-main-text">
                    {{ $t('assisted-living.top.paragraph[3]') }}
                </p>
            </div>
        </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
    <DeferRender when="visible">
        <BaseLayoutPageSection margin="default" bg="alt" class="cv-auto">
            <AssistedLivingCarousel />
        </BaseLayoutPageSection>
    </DeferRender>

    <DeferRender when="visible">
        <BaseLayoutPageSection margin="default" class="cv-auto">
            <BaseLayoutPageContainer class="">
                <BaseLayoutCard :has-padding="false">
                    <div class="flex flex-col w-full gap-8 lg:flex-row">
                        <!-- Left Side -->
                        <div class="lg:w-1/2">
                            <NuxtImg src="/images/pages/assisted-living/nursing-care.jpg" width="1280" height="720" format="webp,avif" quality="60" alt="Photo of a nurse and a resident" title="Photo of a nurse and a resident" loading="lazy" class="h-full w-full object-cover" placeholder/>
                        </div>
                        <!-- Right Side -->
                        <div class="p-4 flex flex-col lg:w-1/2 space-y-2">
                            <h2 class="text-2xl font-bold text-brand-primary mb-4 text-center md:text-left">
                                {{ $t('assisted-living.consultation-section.title') }}
                            </h2>
                            <p class="text-xl text-brand-main-text">
                                {{  $t('assisted-living.consultation-section.paragraph[0]') }}
                            </p>
                            <p class="text-xl text-brand-main-text">
                                {{ $t('assisted-living.consultation-section.paragraph[1]') }}
                            </p>
                            <p class="text-xl text-brand-main-text">
                                {{ $t('assisted-living.consultation-section.paragraph[2]') }}
                            </p>
                            <BaseUiAction :to="$localePath('/assisted-living/consultation')" class="self-center !mt-8 py-4 px-8">{{ $t('assisted-living.consultation-section.button') }}</BaseUiAction>
                        </div>
                    </div>
                </BaseLayoutCard>
          </BaseLayoutPageContainer>
        </BaseLayoutPageSection>
    </DeferRender>

      <!-- Bottom Page -->

    <DeferRender when="visible">
        <BaseLayoutPageCTA 
            :title="$t('assisted-living.cta.title')"
            :description="$t('assisted-living.cta.description')"
            :button-label="$t('assisted-living.cta.button-label')"
            :to="$localePath('/company/contact-us')"
            />
    </DeferRender>
    <DeferRender when="visible">
        <BaseLayoutPageSection margin="default" class="cv-auto">
            <BaseLayoutPageContainer class="">
                <div class="bg-[#365dba] text-white px-2 lg:px-12 py-16 rounded-lg">
                    <h2 class="text-2xl font-extrabold px-2 text-center mb-8 lg:text-left lg:px-0">{{ $t('assisted-living.amenities-section.title') }}</h2>
                    <p class="text-xl font-semibold px-2 lg:px-0">{{  $t('assisted-living.amenities-section.paragraph') }}</p>
                    <div class="flex flex-col lg:flex-row justify-center gap-8 my-16 mx-8"> 
                        <ul class="bg-gray-200 font-bold text-brand-main-text px-4 lg:px-8 py-12 rounded-2xl text-xl lg:w-1/3 shadow-primary text-center space-y-4 flex flex-col justify-center">
                            <li class="">{{ $t('assisted-living.amenities-section.card[0][0]') }}</li>
                            <li class="">{{ $t('assisted-living.amenities-section.card[0][1]') }}</li>
                            <li class="">{{ $t('assisted-living.amenities-section.card[0][2]') }}</li>
                            <li class="">{{ $t('assisted-living.amenities-section.card[0][3]') }}</li>
                        </ul>
                        <ul class="bg-gray-200 font-bold text-brand-main-text px-4 lg:px-8 py-12 rounded-2xl text-xl lg:w-1/3 shadow-primary text-center space-y-4 flex flex-col justify-center">
                            <li class="">{{ $t('assisted-living.amenities-section.card[1][0]') }}</li>
                            <li class="">{{ $t('assisted-living.amenities-section.card[1][1]') }}</li>
                            <li class="">{{ $t('assisted-living.amenities-section.card[1][2]') }}</li>
                            <li class="">{{ $t('assisted-living.amenities-section.card[1][3]') }}</li>
                        </ul>
                        <ul class="bg-gray-200 font-bold text-brand-main-text px-4 lg:px-8 py-12 rounded-2xl text-xl lg:w-1/3 shadow-primary text-center space-y-4 flex flex-col justify-center">
                            <li class="">{{ $t('assisted-living.amenities-section.card[2][0]') }}</li>
                            <li class="">{{ $t('assisted-living.amenities-section.card[2][1]') }}</li>
                            <li class="">{{ $t('assisted-living.amenities-section.card[2][2]') }}</li>
                        </ul>
                    </div>
                </div>
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>
    </DeferRender>
  </div>
</template>

<script setup lang='ts'>
const runtimeConfig = useRuntimeConfig()
definePageMeta({
  title: 'Assisted Living in Pueblo Colorado',
  breadcrumbLabel: 'Assisted Living'
})

useSeoMeta({
  title: 'Assisted Living in Pueblo Colorado',
  ogTitle: 'Assisted Living in Pueblo Colorado',
  description: 'Discover compassionate and comfortable assisted living options at Golden Gate Manor Inc., serving seniors across Southern Colorado with dignity and care.',
  ogDescription: 'Discover compassionate and comfortable assisted living options at Golden Gate Manor Inc., serving seniors across Southern Colorado with dignity and care.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-assisted-living.png`,
  twitterTitle: 'Assisted Living in Pueblo Colorado',
  twitterDescription: 'Discover compassionate and comfortable assisted living options at Golden Gate Manor Inc., serving seniors across Southern Colorado with dignity and care.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-assisted-living.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'AssistedLivingPage'
})
</script>

<style></style>