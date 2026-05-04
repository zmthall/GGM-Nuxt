<template>
  <div>
    <BaseInteractiveImageSlider
      v-model="bannerSlides"
      :autoplay-ms="5000"
      :aspect-ratio="2"
      max-height="400px"
    />
    <BaseLayoutPageSection margin="top">
      <BaseLayoutPageContainer class="space-y-4">
        <h2 class="text-2xl font-bold text-brand-primary">{{ $t('gas-and-goods.top.title') }}</h2>
        <p v-for="paragraph in $tm('gas-and-goods.top.paragraph')" :key="paragraph" class="text-xl text-brand-main-text">
          {{ $rt(paragraph) }}
        </p>
        <!-- <p class="text-xl text-brand-main-text">
          Across our locations, we've introduced new fuel tanks, modern pumps, expanded product offerings, and freshly designed interiors. At the same time, we've also reimagined what these spaces can be—some locations now focus entirely on being convenience-first stores, centered around quick access, variety, and a clean, welcoming experience without the need for fuel services.
        </p>
        <p class="text-xl text-brand-main-text">
          While the process took time, watching these spaces evolve day by day has been truly remarkable. Each hole dug, every sq ft of cement poured, each shelf installed, and each new feature added represents our commitment to building more than just a stop along the way—we're creating community spots where neighbors can find quality products in environments designed for comfort and convenience.
        </p>
        <p class="text-xl text-brand-main-text">
          This is just the start of our journey, and we are always open to feedback as we continue shaping spaces that truly serve their purpose. Whether you're stopping in for fuel at one location or visiting a convenience-focused store at another, our goal remains the same: provide a reliable, welcoming place for our community.
        </p>
        <p class="text-xl text-brand-main-text">
          We invite you to experience the difference at Golden Gate Gas & Goods, where our renovation journey continues with you, our valued customers, at the heart of every decision we make. This transformation marks just the first chapter in our ongoing story.
        </p> -->
        <div class="flex justify-center sm:gap-8">
          <BaseUiAction :to="$localePath('/company/contact-us')" class="px-8 py-4">{{ $t('gas-and-goods.top.button[0]')}}</BaseUiAction>
          <BaseUiAction :to="$localePath('/company/about-us')" class="px-8 py-4">{{ $t('gas-and-goods.top.button[1]')}}</BaseUiAction>
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>

    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" class="cv-auto" bg="alt">
        <BaseLayoutPageContainer class="space-y-4">
          <h2 class="text-2xl font-bold text-brand-primary">
            {{ $t('gas-and-goods.elizabeth.title') }}
          </h2>

          <div class="flex flex-col md:flex-row gap-8 justify-center items-center">
            <div class="space-y-4 md:w-1/2">
              <p class="text-xl text-brand-main-text">
                {{ $t('gas-and-goods.elizabeth.paragraph[0]') }}
              </p>
  
              <p class="text-xl text-brand-main-text">
                {{ $t('gas-and-goods.elizabeth.paragraph[1]') }}
              </p>
            </div>
            <div class="md:w-1/2 aspect-[5/3] overflow-hidden rounded-xl shadow-primary max-md:w-[80%] mx-auto">
                <NuxtImg src="/images/pages/gas-and-goods/gas-station-essentials.jpg" class="w-full h-auto mx-auto" quality="60" format="webp,avif" :title="$t('gas-and-goods.elizabeth.alt-title')" :alt="$t('gas-and-goods.elizabeth.alt-title')" loading="lazy" height="960" width="1600" sizes="md:800px 80vw" placeholder />
            </div>  
          </div>


          <p class="text-xl text-brand-main-text">
            {{ $t('gas-and-goods.elizabeth.paragraph[2]') }}
          </p>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>

    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" class="cv-auto">
        <BaseLayoutPageContainer class="space-y-4 flex flex-col">
          <div class="space-y-5">
            <h2 class="text-2xl font-bold text-brand-primary">{{ $t('gas-and-goods.more-than-stations.title') }}</h2>
            <p v-for="paragraph in $tm('gas-and-goods.more-than-stations.paragraph')" :key="paragraph" class="text-xl text-brand-main-text">
              {{  $rt(paragraph) }}
            </p>
          </div>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>

    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" bg="alt" class="cv-auto">
        <BaseLayoutPageContainer>
          <h2 class="text-2xl sm:text-3xl font-bold text-brand-primary mb-4">
            {{ $t('gas-and-goods.beer-cave.title') }}
          </h2>
          <div class="flex flex-col md:flex-row justify-center items-center gap-8">
            <div class="w-full md:w-1/2 flex justify-center aspect-[4/3] max-w-[500px]">
              <LazyBaseInteractiveFlipCard front-src="/images/pages/gas-and-goods/beer-cave-entrance.jpeg" back-src="/images/pages/gas-and-goods/beer-cave-interior.jpeg" no-text class="w-full h-full" :fixed-dimensions="false" />
              <!-- <NuxtImg src="/images/pages/gas-and-goods/beer-cave-entrance.jpeg" format="webp,avif" width="500" height="375" placeholder class="rounded-lg shadow-primary object-contain h-full" sizes="sm:500px 100vw"/> -->
            </div>
            <div class="space-y-8 md:w-1/2">
              <p class="text-lg sm:text-xl text-brand-main-text">
                {{ $t('gas-and-goods.beer-cave.paragraph') }}
              </p>
              <div class="flex items-center gap-4">
                <BaseUiAction :to="$localePath('/gas-and-goods/beer-cave-pueblo')" class="py-2 px-4">
                  {{ $t('gas-and-goods.beer-cave.button') }}
                </BaseUiAction>
                <span class="text-sm text-brand-main-text/80">
                  {{ $t('gas-and-goods.beer-cave.cta-info') }}  
                </span>
              </div>
            </div>
          </div>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender> 

    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" class="cv-auto">
        <BaseLayoutPageContainer class="space-y-4">
          <h2 class="text-2xl font-bold text-brand-primary">{{ $t('gas-and-goods.locations.title') }}</h2>
          <LazyGasStationArrowList />
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>

    <DeferRender when="visible">
      <BaseLayoutPageCTA :title="$t('gas-and-goods.offering.title')" :has-button="false">
        <div class="flex gap-8 justify-center flex-wrap my-8">
          <LazyBaseInteractiveHoverTile v-for="tile in offeringTiles" :key="tile.title" class="w-[350px] h-[300px] flex flex-col justify-center text-brand-main-text text-left">
            <h3 class="text-brand-primary text-xl font-bold">{{ $rt(tile.title) }}</h3>
            <ul class="text-xl text-brand-main-text ml-8 mt-4 space-y-2 pl-4 border-l-[4px] border-l-brand-primary">
              <li v-for="detail in tile.details" :key="detail.content" class="flex gap-2 items-center"><BaseIcon :name="$rt(detail.icon)"/>{{ $rt(detail.content)}}</li>
            </ul>
          </LazyBaseInteractiveHoverTile>
        </div>
      </BaseLayoutPageCTA>
    </DeferRender>

    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" bg="alt" class="cv-auto">
        <BaseLayoutPageContainer>
          <LazyBaseLayoutCard class="bg-white md:w-3/4 mx-auto">
            <div class="flex flex-col gap-4">
              <h2 class="text-2xl font-bold text-brand-primary">{{ $t('gas-and-goods.commitment.title') }}</h2>
              <p v-for="paragraph in $tm('gas-and-goods.commitment.paragraph')" :key="paragraph" class="text-xl text-brand-main-text">
                {{ $rt(paragraph) }}
              </p>
              <BaseUiAction :to="$localePath('/company/about-us')" class="px-8 py-4 self-center">{{ $t('gas-and-goods.commitment.button')}}</BaseUiAction>
            </div>
          </LazyBaseLayoutCard>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>
  </div>
</template>

<script lang="ts" setup>
type OfferingTile = {
  title: string
  details: { content: string; icon: string }[]
}

const offeringTiles = $tm('gas-and-goods.offering.cards') as OfferingTile[]

const bannerSlides = ref([
  {
    url: '/images/pages/gas-and-goods/gas-station-banner-ratio.jpg',
    alt: 'Golden Gate Manor Gas and Goods 1 with signage on building',
    w: 800,
    h: 400
  },
  {
    url: '/images/pages/gas-and-goods/elizabeth-location.jpg',
    alt: 'Golden Gate Goods Elizabeth location',
    w: 800,
    h: 400
  }
])

definePageMeta({
  title: 'Golden Gate Gas Stations & Goods in Pueblo Colorado',
  breadcrumbLabel: 'Gas & Goods'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Golden Gate Gas & Goods Pueblo',
  ogTitle: 'Golden Gate Gas & Goods Pueblo',
  description: 'Overview of Golden Gate Manor Inc. Gas & Goods. Our gas stations and convenience stores are currently located in Pueblo Colorado Learn about our current venture into the gas station realm.',
  ogDescription: 'Overview of Golden Gate Manor Inc. Gas & Goods. Our gas stations and convenience stores are currently located in Pueblo Colorado Learn about our current venture into the gas station realm.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Golden Gate Gas & Goods Pueblo',
  twitterDescription: 'Overview of Golden Gate Manor Inc. Gas & Goods. Our gas stations are currently located in Pueblo Colorado Learn about our current venture into the gas station realm.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
  name: 'MedicalSuppliesPage'
})
</script>

<style>

</style>