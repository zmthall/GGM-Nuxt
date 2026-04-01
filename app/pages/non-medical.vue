<template>
    <div>
        <CityCabLink ab-value="breadcrumb" />
        <!-- Page Banner -->
        <BaseLayoutPageBanner src="/images/pages/non-medical/car-lineup.jpg" :alt="$t('non-medical.banner.alt-title')" image-height="464" image-width="935" :title="$t('non-medical.banner.alt-title')" aspect-ratio="aspect-[2/1]"/>
        <!-- Main Content -->
        <CityCabLink ab-value="under-image" />
        <BaseLayoutPageSection margin="top">
            <BaseLayoutPageContainer class="space-y-4">
                <h2 class="text-2xl font-bold text-brand-primary">{{ $t('non-medical.overview.title') }}</h2>
                <p class="text-xl text-brand-main-text">
                    {{ $t('non-medical.overview.paragraphs[0]') }}
                </p>
                <p class="text-xl text-brand-main-text">
                    {{ $t('non-medical.overview.paragraphs[1]') }}
                </p>
                <div class="flex flex-col gap-8 md:flex-row md:justify-center !mt-16">
                    <BaseUiAction :to="$localePath('/company/contact-us')" class="py-4 md:py-0 md:flex md:items-center md:justify-center md:h-[75px] md:w-[150px]">{{ $t('non-medical.overview.button') }}</BaseUiAction>
                </div>
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>

        <DeferRender when="visible">
            <BaseLayoutPageCTA 
                :title="$t('non-medical.cta.title')"
                :description="$t('non-medical.cta.description')"
                :button-label="$t('non-medical.cta.button') "
                :to="$localePath('/company/contact-us')"
            />
        </DeferRender>
        <DeferRender when="visible">
            <BaseLayoutPageSection margin="default" bg="alt" class="cv-auto">
                <BaseLayoutPageContainer class="space-y-4">
                    <div class="flex justify-center items-center lg:flex-row flex-col lg:gap-8 gap-4">
                        <div class="lg:w-1/2 space-y-4">
                            <h2 class="text-2xl font-bold text-brand-primary">{{ $t('non-medical.schedule.title') }}</h2>
                            <p class="text-xl text-brand-main-text">
                                {{ $t('non-medical.schedule.paragraphs[0]')}} <a href="tel:719-583-6900" class="link">(719) 583-6900</a> {{ $t('non-medical.schedule.paragraphs[1]') }} <a href="https://hcpf.colorado.gov/nmt" rel="noreferrer noopener" target="_blank" class="link">{{ $t('non-medical.schedule.links.hcpf')}}</a>. {{ $t('non-medical.schedule.paragraphs[2]') }} <a :href="`tel:${company.trans.phone.dispatch}`" class="link">{{ company.trans.phone.dispatch }}</a>. 
                            </p>
                        </div>
                        <div class="md:w-1/2 aspect-[5/3] overflow-hidden rounded-xl shadow-primary max-md:w-[80%] mx-auto">
                            <NuxtImg src="/images/pages/non-medical/city-cab-golden-gate-cars.jpg" class="w-full h-auto mx-auto" quality="60" format="webp,avif" :title="$t('non-medical.schedule.image.alt-title')" :alt="$t('non-medical.schedule.image.alt-title')" loading="lazy" height="960" width="1600" sizes="md:800px 80vw" placeholder />
                        </div>  
                    </div>
                    <p class="text-xl text-brand-main-text">
                        {{ $t('non-medical.schedule.paragraphs[3]') }} <BaseUiAction href="https://www.pueblocitycab.com/" :aria-label="$t('non-medical.schedule.links.city-cab.aria')" new-page variant="link" :title="$t('components.new-tab-title')">{{ $t('non-medical.schedule.links.city-cab.label') }}</BaseUiAction> {{ $t('non-medical.schedule.paragraphs[4]') }}
                    </p>
                    <!-- <div class="flex justify-center"> need to implement a page for non-medical transportation on how to schedule a ride
                        <SupportCenterTile to="/resources/support-center/schedule-a-ride" name="heroicons-outline:calendar-days" title="How to Schedule a Ride" message="Instructions on how to request trips to medical appointments" />
                    </div> -->
                </BaseLayoutPageContainer>
            </BaseLayoutPageSection>
        </DeferRender>
        <DeferRender when="visible">
            <BaseLayoutPageSection margin="default" class="cv-auto">
                <BaseLayoutPageContainer class="space-y-6 flex flex-col items-center">
                    <div class="space-y-4 md:space-y-8">
                        <h2 class="text-2xl font-bold text-brand-primary">{{ $t('non-medical.information.title') }}</h2>
                        <div class="flex justify-center items-center md:flex-row flex-col md:gap-8 gap-4">
                            <div class="md:w-1/2 aspect-[113/56] overflow-hidden rounded-xl shadow-primary max-md:w-[80%] mx-auto">
                                <NuxtImg src="/images/pages/non-medical/suv-train.jpg" class="w-full h-auto" quality="60" format="webp,avif" :title="$t('non-medical.information.image.alt-title')" :alt="$t('non-medical.information.image.alt-title')" loading="lazy" height="448" width="904" sizes="md:904px 80vw" placeholder />
                            </div>
                            <p class="text-xl text-brand-main-text md:w-1/2">
                                {{ $t('non-medical.information.paragraph') }} <a href="tel:719-583-6900" class="link">719-583-6900</a> {{ $t('non-medical.information.paragraph-end') }}
                            </p>
                        </div>
                        <div class="flex flex-row flex-wrap justify-center text-xl gap-8">
                            <BaseInteractiveHoverTile class="sm:w-[300px] sm:h-[300px] w-full flex flex-col justify-center">
                                <p class="font-bold">{{ $t('non-medical.information.cards.personal.title') }}</p>
                                <ul class="ml-8 list-disc">
                                    <li>{{ $t('non-medical.information.cards.personal.items[0]') }}</li>
                                    <li>{{ $t('non-medical.information.cards.personal.items[1]') }}</li>
                                    <li>{{ $t('non-medical.information.cards.personal.items[2]') }}</li>
                                    <li>{{ $t('non-medical.information.cards.personal.items[3]') }}</li>
                                </ul>
                            </BaseInteractiveHoverTile>
                            <BaseInteractiveHoverTile class="sm:w-[300px] sm:h-[300px] w-full flex flex-col justify-center">
                                <p class="font-bold">{{ $t('non-medical.information.cards.destination.title') }}</p>
                                <ul class="ml-8 list-disc">
                                    <li>{{ $t('non-medical.information.cards.destination.items[0]') }}</li>
                                    <li>{{ $t('non-medical.information.cards.destination.items[1]') }}</li>
                                </ul>
                            </BaseInteractiveHoverTile>
                            <BaseInteractiveHoverTile class="sm:w-[300px] sm:h-[300px] w-full flex flex-col justify-center">
                                <p class="font-bold">{{ $t('non-medical.information.cards.passengers.title') }}</p>
                                <ul class="ml-8 list-disc">
                                    <li>{{ $t('non-medical.information.cards.passengers.items[0]') }}</li>
                                </ul>
                            </BaseInteractiveHoverTile>
                        </div>
                    </div>
                    <div class="space-y-4 flex items-center">
                        <p class="text-xl text-brand-main-text lg:w-4/5">
                            {{ $t('non-medical.information.closing') }}
                        </p>
                        <NuxtImg format="webp,avif" src="/images/pages/non-medical/information.png" :alt="$t('non-medical.information.icon-image.alt-title')" :title="$t('non-medical.information.icon-image.alt-title')" loading="lazy" height="263" width="252" class="hidden lg:block" />
                    </div>
                </BaseLayoutPageContainer>
            </BaseLayoutPageSection>
        </DeferRender>
    </div>
</template>

<script setup lang='ts'>
import company from '@/data/company.json'

definePageMeta({
  title: 'Non-Medical Transportation in Pueblo Colorado',
  breadcrumbLabel: 'Non-Medical'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Pueblo Non-Medical Transport',
  ogTitle: 'Pueblo Non-Medical Transport',
  description: 'Enjoy stress-free personal transportation in Southern Colorado. Golden Gate Manor Inc. ensures safe, reliable travel for shopping, visits, and more.',
  ogDescription: 'Enjoy stress-free personal transportation in Southern Colorado. Golden Gate Manor Inc. ensures safe, reliable travel for shopping, visits, and more.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Pueblo Non-Medical Transport',
  twitterDescription: 'Enjoy stress-free personal transportation in Southern Colorado. Golden Gate Manor Inc. ensures safe, reliable travel for shopping, visits, and more.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'NonMedicalPage'
})
</script>

<style></style>