<template>
    <div>
        <BaseLayoutPageHeroSectionVideo video-src="/videos/Final_website_video_with_sound.mp4" :active="true" />
            
        <BaseInteractiveLogosNav :shows-on-mobile="false" />

        <BaseLayoutPageSection margin="default" class="cv-auto max-[550px]:hidden">
            <BaseLayoutPageContainer>
                <BaseInteractiveCarousel
                    :items="homeHeroSlides"
                    item-key="id"
                    variant="hero"
                    :height="460"
                    :gap="0"
                    :max-visible="1"
                    :min-item-width="1"
                    >
                    <template #item="{ item }">
                            <div
                                class="relative h-full w-full overflow-hidden rounded-xl"
                                :class="bgClass(item.bg)"
                            >
                                <!-- Background -->
                                <img
                                :src="item.right.image"
                                :alt="item.right.alt"
                                class="absolute inset-0 h-full w-full object-cover object-right"
                                >
                                
                                <!-- Overlay -->
                                <div
                                class="absolute inset-0 max-sm:bg-brand-primary/80 sm:bg-[linear-gradient(90deg,#121b76_0%,#121b76_30%,rgba(18,27,118,.95)_42%,rgba(18,27,118,.72)_54%,rgba(18,27,118,.28)_66%,transparent_80%)]"
                                    :class="overlayClass(item.bg)"
                                />

                                <!-- Content -->
                                <div class="absolute inset-0 z-10 flex items-center pt-6">
                                    <div class="max-w-[34rem] pl-16 pr-8">

                                        <!-- Eyebrow -->
                                        <p class="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-brand-secondary">
                                            {{ $t(`home.hero-slides.${item.id}.left.eyebrow`) }}
                                        </p>

                                        <!-- Headline -->
                                        <h2 class="font-serif text-[2.6rem] font-bold leading-[1.05] text-shadow">
                                            <span
                                                v-for="(line, idx) in getHeadlineLines(item.id)"
                                                :key="idx"
                                                class="block"
                                                :class="idx === 0 ? 'text-brand-secondary' : 'text-white'"
                                            >
                                                {{ $rt(line) }}
                                            </span>
                                        </h2>

                                        <!-- Description -->
                                        <p class="mt-6 max-w-md text-[16px] leading-7 text-white/90 text-shadow">
                                            {{ $t(`home.hero-slides.${item.id}.left.description`) }}
                                        </p>

                                        <!-- CTA -->
                                        <div class="mt-8">
                                        <NuxtLink
                                            :to="$localePath(item.to)"
                                            class="inline-flex items-center gap-3 rounded-full bg-brand-secondary px-7 py-3.5 font-semibold text-brand-primary transition duration-200 hover:brightness-105"
                                        >
                                            {{ $t(`home.hero-slides.${item.id}.left.cta`)}}

                                            <BaseIcon
                                            name="heroicons:arrow-right-20-solid"
                                            size="size-5"
                                            />
                                        </NuxtLink>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </template>
                </BaseInteractiveCarousel>
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>
        
        <!-- Overview (our company) -->
        <BaseLayoutPageSection margin="default" class="cv-auto">
            <BaseLayoutPageContainer>
                <LazyBaseLayoutCard class="md:shadow-primary sm:w-11/12 sm:mx-auto xl:w-3/4" :shadow="false">
                    <div class="px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <!-- Image -->
                        <section>
                            <!-- Desktop/Tablet: interactive carousel -->
                                <DeferRender when="visible">
                                    <div class="w-full h-[450px] max-md:hidden max-md:shadow-primary max-md:rounded-lg overflow-hidden">
                                        <!-- Lazy component still good for code-splitting -->
                                        <LazyBaseInteractiveAutoImageCarousel
                                        :images="images"
                                        />
                                    </div>
                                    <div class="w-full rounded-lg md:hidden overflow-hidden">
                                        <NuxtImg
                                            src="/images/home-images/transportation-services.jpeg"
                                            alt="Golden Gate Manor Transportation"
                                            format="webp,avif"
                                            quality="65"
                                            width="1152" height="646"
                                            sizes="(min-width: 1024px) 646px, 395px"
                                            loading="lazy"
                                            class="w-full h-full object-contain"
                                            decoding="async"
                                        />
                                    </div>
                                </DeferRender>

                            <!-- Mobile: lightweight static image -->
                        </section>
        
                        <!-- Text Content -->
                        <div>
                            <h2 class="text-3xl font-extrabold text-brand-primary mb-4">{{ $t('home.overview-section.title') }}</h2>
                            <p class="text-base text-brand-dark-gray leading-relaxed mb-6">
                                    {{ $t('home.overview-section.paragraph') }}
                            </p>
                                <BaseUiAction :to="$localePath('/company/about-us')" styling="py-4 px-8">
                                {{ $t('home.overview-section.button') }}
                            </BaseUiAction>
                        </div>
                    </div>
                </LazyBaseLayoutCard>
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>
        
        <!-- Services Card Grid -->
        <DeferRender when="visible" ssr>
            <BaseLayoutPageSection margin="default" bg="alt" styling="flex flex-col" class="cv-auto">
                    <h2 class="text-center font-extrabold flex flex-col mb-8 text-4xl">
                        <span class="text-gray-500">
                            {{ $t('home.services-section.title[0]') }}
                        </span>
                        <span class="text-brand-primary">{{ $t('home.services-section.title[1]') }}</span>
                    </h2>
                    <div class="flex justify-center flex-wrap gap-8">
                        <NuxtLink :to="$localePath('/assisted-living')">
                            <LazyBaseLayoutCard class="bg-brand-background xs:w-[325px]" hover-group icon-size="size-32" icon-name="medical-icon:i-care-staff-area" :cta="$t('home.services-section.cards.button')" cta-size="w-full h-max" cta-class="p-3">
                                <div>
                                    <h2 class="text-center font-extrabold flex flex-col mb-4 text-xl mt-2">
                                        <span class="text-gray-500">{{ $t('home.services-section.cards.assisted-living.title[0]') }}</span>
                                        <span class="text-brand-primary">{{ $t('home.services-section.cards.assisted-living.title[1]') }}</span>
                                    </h2>
                                    <p class="mb-4 text-center text-lg">
                                        {{ $t('home.services-section.cards.assisted-living.description') }}
                                    </p>
                                </div>
                            </LazyBaseLayoutCard>
                        </NuxtLink>
                        <NuxtLink :to="$localePath('/nemt')">
                            <LazyBaseLayoutCard class="bg-brand-background xs:w-[325px]" hover-group icon-size="size-32" icon-name="medical-icon:i-ambulance" :cta="$t('home.services-section.cards.button')" cta-size="w-full h-max" cta-class="p-3">
                                <div>
                                    <h2 class="text-center font-extrabold flex flex-col mb-4 text-xl mt-2">
                                        <span class="text-gray-500">{{ $t('home.services-section.cards.nemt.title[0]') }}</span>
                                        <span class="text-brand-primary">{{ $t('home.services-section.cards.nemt.title[1]') }}</span>
                                    </h2>
                                    <p class="mb-4 text-center text-lg">
                                        {{ $t('home.services-section.cards.nemt.description') }}
                                    </p>
                                </div>
                            </LazyBaseLayoutCard>
                        </NuxtLink>
                        <NuxtLink :to="$localePath('/non-medical')">
                            <LazyBaseLayoutCard class="bg-brand-background xs:w-[325px]" hover-group icon-size="size-32" icon-name="material-symbols:local-taxi-rounded" :cta="$t('home.services-section.cards.button')" cta-size="w-full h-max" cta-class="p-3">
                                <div>
                                    <h2 class="text-center font-extrabold flex flex-col mb-4 text-xl mt-2">
                                        <span class="text-gray-500">{{ $t('home.services-section.cards.non-medical.title[0]') }}</span>
                                        <span class="text-brand-primary">{{ $t('home.services-section.cards.non-medical.title[1]') }}</span>
                                    </h2>
                                    <p class="mb-4 text-center text-lg">
                                        {{ $t('home.services-section.cards.non-medical.description') }}
                                    </p>
                                </div>
                            </LazyBaseLayoutCard>
                        </NuxtLink>
                        <NuxtLink :to="$localePath('/medical-supplies')">
                            <LazyBaseLayoutCard class="bg-brand-background xs:w-[325px]" hover-group icon-size="size-32" icon-name="medical-icon:first-aid" :cta="$t('home.services-section.cards.button')" cta-size="w-full h-max" cta-class="p-3">
                                <div>
                                    <h2 class="text-center font-extrabold flex flex-col mb-4 text-xl mt-2">
                                        <span class="text-gray-500">{{ $t('home.services-section.cards.medical-supplies.title[0]') }}</span>
                                        <span class="text-brand-primary">{{ $t('home.services-section.cards.medical-supplies.title[1]') }}</span>
                                    </h2>
                                    <p class="mb-4 text-center text-lg">
                                        {{ $t('home.services-section.cards.medical-supplies.description') }}
                                    </p>
                                </div>
                            </LazyBaseLayoutCard>
                        </NuxtLink>
                    </div>
            </BaseLayoutPageSection>
        </DeferRender>

        <!-- Schedule a Ride CTA -->
        <DeferRender when="visible" ssr>
            <LazyBaseLayoutPageCTA :title="$t('home.cta.title')" :to="$localePath('/resources/schedule-a-ride')" :button-label="$t('home.cta.button')" class="cv-auto">
                <p class="text-xl">
                    {{ $t('home.cta.description') }}
                </p>
            </LazyBaseLayoutPageCTA>
        </DeferRender>             

        <!-- Why People Choose Us -->
        <DeferRender when="visible" ssr>
            <BaseLayoutPageSection margin="default" class="cv-auto">
                <BaseLayoutPageContainer>
                    <div class="mb-4 px-2 sm:max-w-[1200px] sm:mx-auto">
                        <h2 class="text-2xl text-center font-bold text-brand-primary flex flex-col mb-4">
                            <span class="text-gray-500">
                                {{ $t('home.why-us.title[0]') }}
                            </span>
                            <span class="text-brand-primary">
                                {{ $t('home.why-us.title[1]') }}
                            </span>
                        </h2>
                        <p class="text-lg sm:text-2xl">
                            {{ $t('home.why-us.intro') }}
                        </p>
                    </div>
    
                    <div class="space-y-2 mb-4 px-2 sm:max-w-[1200px] sm:mx-auto">
                        <h3 class="text-2xl text-center font-bold text-brand-primary flex flex-col mb-4">
                            {{ $t('home.why-us.mission.title') }}
                        </h3>
                        <p class="text-lg sm:text-2xl">
                            {{ $t('home.why-us.mission.paragraph[0]') }}
                        </p>
                        <p class="text-lg sm:text-2xl">
                            {{ $t('home.why-us.mission.paragraph[1]') }}
                        </p>
                        <div class="flex justify-center !my-4">
                            <BaseUiAction class="py-4 px-8" :to="$localePath('/company/about-us')">
                                {{ $t('home.why-us.mission.button') }}
                            </BaseUiAction>
                        </div>
                        <p class="text-lg sm:text-2xl">
                            {{ $t('home.why-us.mission.paragraph[2]') }}
                        </p>
                    </div>
    
                    <div>
                        <h2 class="text-2xl text-center font-bold text-brand-primary flex flex-col mb-4">
                            {{ $t('home.why-us.sets-apart.title') }}
                        </h2>
                        <div class="sm:grid sm:grid-cols-2 sm:gap-8 md:mx-12">
                                <!-- Two-column layout -->
                                <div class="space-y-2 mb-4 px-2">
                                    <!-- Left Column: Paragraph + Cards -->
                                    <div class="flex flex-col gap-8">
                                        <!-- 4 Pillar Cards -->
                                        <LazyBaseLayoutCard>
                                        <div>
                                            <h3 class="font-extrabold text-lg">{{ $t('home.why-us.sets-apart.cards.community-first.title') }}</h3>
                                            <p>
                                                {{ $t('home.why-us.sets-apart.cards.community-first.paragraph') }}
                                            </p>
                                        </div>
                                        </LazyBaseLayoutCard>
                                        <LazyBaseLayoutCard>
                                        <div>
                                            <h3 class="font-extrabold text-lg">{{ $t('home.why-us.sets-apart.cards.proven.title') }}</h3>
                                            <p>
                                                {{ $t('home.why-us.sets-apart.cards.proven.paragraph') }}
                                            </p>
                                        </div>
                                        </LazyBaseLayoutCard>
                                        <LazyBaseLayoutCard>
                                        <div>
                                            <h3 class="font-extrabold text-lg">{{ $t('home.why-us.sets-apart.cards.umbrella.title') }}</h3>
                                            <p>
                                                {{ $t('home.why-us.sets-apart.cards.umbrella.paragraph') }}
                                            </p>
                                        </div>
                                        </LazyBaseLayoutCard>
                                        <LazyBaseLayoutCard>
                                        <div>
                                            <h3 class="font-extrabold text-lg">{{ $t('home.why-us.sets-apart.cards.people-first.title') }}</h3>
                                            <p>
                                                {{ $t('home.why-us.sets-apart.cards.people-first.paragraph') }}
                                            </p>
                                        </div>
                                        </LazyBaseLayoutCard>
                                    </div>
                                </div>
                                <!-- Testimonial (supporting statement) -->
                                <aside class="bg-gray-400 p-4 text-black rounded-lg text-xl sm:text-white sm:h-max sm:px-12 sm:py-28 sm:my-auto sm:bg-brand-primary">
                                    <blockquote class="space-y-4">
                                        <span>{{ $t('home.why-us.sets-apart.cards.review.content') }}</span>
                                        <footer>— {{ $t('home.why-us.sets-apart.cards.review.reviewer') }}</footer>
                                    </blockquote>
                                </aside>
                        </div>
                    </div>
                </BaseLayoutPageContainer>
            </BaseLayoutPageSection>
        </DeferRender>
                        
        <DeferRender when="visible" ssr>
            <BaseLayoutPageSection margin="default" bg="alt" class="cv-auto">
                <BaseLayoutPageContainer>
                    <div>
                        <h2 class="text-2xl text-center font-bold text-brand-primary flex flex-col mb-4">{{ $t('home.support-section.title') }}</h2>
                        <SupportCenterSection />
                    </div>
                </BaseLayoutPageContainer>
            </BaseLayoutPageSection>
        </DeferRender>

        <!-- 👉 Events & Community Highlights -->
        <!-- <BaseLayoutPageSection v-if="events" bg="alt">
            <div />
        </BaseLayoutPageSection> -->

        <!-- Blog / News -->
        <!-- <BaseLayoutPageSection v-if="blogs || news" bg="alt">
            <div />
        </BaseLayoutPageSection> -->
    </div>
</template>

<script setup lang='ts'>
import type { ImageData } from '../models/ImagesData';

function getHeadlineLines(id: string) {
  return $tm(`home.hero-slides.${id}.left.headline`) as string[]
}

const overlayClass = (bg: string) => {
  switch (bg) {
    case 'medical':
      return 'max-sm:bg-brand-medical-primary/80 sm:bg-[linear-gradient(90deg,#a3150d_0%,#a3150d_30%,rgba(163,21,13,.95)_42%,rgba(163,21,13,.72)_54%,rgba(163,21,13,.28)_66%,transparent_80%)]'

    case 'acf':
      return 'max-sm:bg-[#365dba]/80 sm:bg-[linear-gradient(90deg,#365dba_0%,#365dba_30%,rgba(54,93,186,.95)_42%,rgba(54,93,186,.72)_54%,rgba(54,93,186,.28)_66%,transparent_80%)]'

    default:
      return 'max-sm:bg-brand-primary/80 sm:bg-[linear-gradient(90deg,#121b75_0%,#121b75_30%,rgba(18,27,117,.95)_42%,rgba(18,27,117,.72)_54%,rgba(18,27,117,.28)_66%,transparent_80%)]'
  }
}

const bgClass = (bg: string) => {
  switch (bg) {
    case 'medical':
      return 'bg-brand-medical-primary'

    case 'acf':
      return 'bg-[#365dba]'

    default:
      return 'bg-brand-primary'
  }
}

const homeHeroSlides = [
    {
        id: 'transportation',
        right: {
            image: '/images/pages/home/hero-carousel/car-line-up.png', 
            alt: 'Golden Gate Manor Transportation fleet of wheelchair-accessible vans and medical transport vehicles'
        },
        to: '/nemt',
        bg: 'nemt'
    },
    {
        id: 'medidrive-update',
        right: {
            image: '/images/pages/home/hero-carousel/van-and-road.png', 
            alt: 'Health First Colorado NEMT rides are now scheduled through MediDrive beginning July 1, 2026'
        },
        to: '/news/information/MediDrive',
        bg: 'nemt'
    },
    {
        id: 'medical-supplies',
        right: {
            image: '/images/pages/home/hero-carousel/medical-showroom.png', 
            alt: 'Golden Gate Medical Supply digital showroom featuring mobility equipment and medical supplies'
        },
        to: '/medical-supplies',
        bg: 'medical'
    },
    {
        id: 'assisted-living',
        right: {
            image: '/images/pages/home/hero-carousel/acf-dining-room.png', 
            alt: 'Comfortable dining room inside a Golden Gate Manor assisted living home in Pueblo, Colorado'
        },
        to: '/assisted-living/consultation',
        bg: 'acf'
    }
]

// const news = undefined;
// const blogs = undefined;
// const events = undefined;

useHead({
    titleTemplate: null,
})

definePageMeta({
    breadcrumb: false,
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
    title: $t('home.meta.title'),
    ogTitle: $t('home.meta.title'),
    description: $t('home.meta.description'),
    ogDescription: $t('home.meta.description'),
    ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
    twitterTitle: $t('home.meta.title'),
    twitterDescription: $t('home.meta.description'),
    twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
    twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'HomePage'
})

const images: ImageData[] = [
    { 
        id: '1',
        src: '/images/home-images/transportation-services.jpeg',
        alt: 'Golden Gate Manor Transportation and City Cab LLC cars next to eachother.',
        title: 'Golden Gate Manor Transportation and City Cab LLC cars next to eachother',
        loading: 'lazy'
    },
    { 
        id: '2',
        src: '/images/home-images/golden-gate-manor-1.jpeg',
        alt: 'Golden Gate Manor 1, house image.',
        title: 'Golden Gate Manor 1, house image',
        loading: 'lazy'
    },
    { 
        id: '3',
        src: '/images/home-images/golden-gate-manor-2.jpeg',
        alt: 'Golden Gate Manor 2, house image.',
        title: 'Golden Gate Manor 2, house image',
        loading: 'lazy'
    },
    { 
        id: '4',
        src: '/images/home-images/golden-horizon.jpeg',
        alt: 'Golden Horizon, house image.',
        title: 'Golden Horizon, house image',
        loading: 'lazy'
    },
    { 
        id: '5',
        src: '/images/home-images/golden-valley.jpeg',
        alt: 'Golden Valley, house image.',
        title: 'Golden Valley, house image',
        loading: 'lazy'
    },
    { 
        id: '6',
        src: '/images/home-images/golden-view.jpeg',
        alt: 'Golden View, house image.',
        title: 'Golden View, house image',
        loading: 'lazy'
    },
    { 
        id: '7',
        src: '/images/home-images/medical-supply-store.jpeg',
        alt: 'Golden Gate Medical Supply inside the store.',
        title: 'Golden Gate Medical Supply inside the store',
        loading: 'lazy'
    },
    { 
        id: '8',
        src: '/images/home-images/gas-station.jpg',
        alt: 'Golden Gate Gas & Goods external picture of gas station.',
        title: 'Golden Gate Gas & Goods external picture of gas station',
        loading: 'lazy'
    }
]
</script>

<style scoped>
    .bg-color::before {
        background: linear-gradient(to right, transparent, #121f75 50%, transparent);
    }

    .text-shadow {
        text-shadow: 0 3px 10px rgba(0,0,0,.35);
    }
</style>