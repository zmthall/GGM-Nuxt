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
        <h2 class="text-2xl font-bold text-brand-primary">Golden Gate Gas & Goods Journey</h2>
        <p class="text-xl text-brand-main-text">
          What began as a vision to better serve the Pueblo community has transformed into reality at Golden Gate Gas & Goods. The journey to revitalize our locations has been both challenging and rewarding—a labor of love spanning many months of careful planning, demolition, and reconstruction. From gutting our tiny 152 sq ft convenience store to creating a 1100+ sq ft expanded experience, we've poured our hearts into every detail.
        </p>
        <p class="text-xl text-brand-main-text">
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
        </p>
        <div class="flex justify-center sm:gap-8">
          <BaseUiAction to="/company/contact-us" class="px-8 py-4">Contact Us</BaseUiAction>
          <BaseUiAction to="/company/about-us" class="px-8 py-4">About Us</BaseUiAction>
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>

    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" bg="alt" class="cv-auto">
        <BaseLayoutPageContainer class="space-y-4 flex flex-col">
          <div class="space-y-5">
            <h2 class="text-2xl font-bold text-brand-primary">More Than Just Gas Stations</h2>
            <p class="text-xl text-brand-main-text">
              At Golden Gate Gas & Goods, we're proud to be your newly renovated, community-focused destination for fuel, refreshments, and convenience. Our completely reimagined stores offer a modern, clean environment with an expanded selection of products chosen with our community in mind.
            </p>
            <p class="text-xl text-brand-main-text">
              As we continue to grow, some of our locations are designed as convenience-first stores, focused entirely on quick access, variety, and a comfortable shopping experience—no fuel required. Others continue to provide full fuel services alongside our expanded retail offerings. Whether you're stopping in for a quick snack, grabbing a cold drink, or filling up your tank, we're committed to providing a superior experience every time you visit. Our renovations are about more than just updating our facilities—they're about creating welcoming spaces that serve the needs of our community in new and better ways. 
            </p>
            <p class="text-xl text-brand-main-text">
              We've invested in transforming our locations to better serve our community. From brand new fuel tanks and pumps at select sites to dramatically expanded store spaces across all locations, we're committed to providing a reliable, high-quality experience every time you visit.
            </p>
          </div>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>

    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" class="cv-auto">
        <BaseLayoutPageContainer>
          <h2 class="text-2xl sm:text-3xl font-bold text-brand-primary mb-4">
            Step Into Our Beer Cave (Prairie & Northern)
          </h2>
          <div class="flex flex-col md:flex-row justify-center items-center gap-8">
            <div class="w-full md:w-1/2 flex justify-center aspect-[4/3] max-w-[500px]">
              <LazyBaseInteractiveFlipCard front-src="/images/pages/gas-and-goods/beer-cave-entrance.jpeg" back-src="/images/pages/gas-and-goods/beer-cave-interior.jpeg" no-text class="w-full h-full" :fixed-dimensions="false" />
              <!-- <NuxtImg src="/images/pages/gas-and-goods/beer-cave-entrance.jpeg" format="webp,avif" width="500" height="375" placeholder class="rounded-lg shadow-primary object-contain h-full" sizes="sm:500px 100vw"/> -->
            </div>
            <div class="space-y-8 md:w-1/2">
              <p class="text-lg sm:text-xl text-brand-main-text">
                Ice-cold and walk-in ready—our Beer Cave is kept at a steady <span class="whitespace-nowrap">34°F to 38°F</span>
                for crisp, refreshing beer without freezing. Clean, spacious, and easy to browse, it's one more way we're bringing a
                modern, community-first experience to Pueblo's south side right off of Prairie and Northern. Come on by and check-out our beer cave 
                or continue exploring more about it.
              </p>
              <div class="flex items-center gap-4">
                <BaseUiAction href="/gas-and-goods/beer-cave-pueblo" class="py-2 px-4">
                  Explore the Beer Cave
                </BaseUiAction>
                <span class="text-sm text-brand-main-text/80">Located inside Golden Gate Gas & Goods on Prairie and Northern</span>
              </div>
            </div>
          </div>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender> 

    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" bg="alt" class="cv-auto">
        <BaseLayoutPageContainer class="space-y-4">
          <h2 class="text-2xl font-bold text-brand-primary">Our Locations:</h2>
          <LazyGasStationArrowList />
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>

    <DeferRender when="visible">
      <BaseLayoutPageCTA title="What We Offer" :has-button="false">
        <div class="flex gap-8 justify-center flex-wrap my-8">
          <LazyBaseInteractiveHoverTile class="w-[350px] h-[300px] flex flex-col justify-center text-brand-main-text text-left">
            <h3 class="text-brand-primary text-xl font-bold">Fuel Options Available</h3>
            <ul class="text-xl text-brand-main-text ml-8 mt-4 space-y-2 pl-4 border-l-[4px] border-l-brand-primary">
              <li class="flex gap-2 items-center"><BaseIcon name="bi:fuel-pump-fill"/>Regular Unleaded</li>
              <li class="flex gap-2 items-center"><BaseIcon name="bi:fuel-pump-fill"/>Premium Unleaded</li>
              <li class="flex gap-2 items-center"><BaseIcon name="bi:fuel-pump-diesel-fill"/>Diesel</li>
            </ul>
          </LazyBaseInteractiveHoverTile>
          <LazyBaseInteractiveHoverTile class="w-[350px] h-[300px] flex flex-col justify-center text-brand-main-text text-left">
            <h3 class="text-brand-primary text-xl font-bold">Refreshments & Quick Bites</h3>
            <ul class="text-xl text-brand-main-text ml-8 mt-4 space-y-2 pl-4 border-l-[4px] border-l-brand-primary">
              <li class="flex gap-2 items-center"><BaseIcon name="tabler:milkshake"/>Slushies and Shakes</li>
              <li class="flex gap-2 items-center"><BaseIcon name="game-icons:hot-dog"/>Hot dogs</li>
              <li class="flex gap-2 items-center"><BaseIcon name="simple-icons:buymeacoffee"/>Coffee and Drinks</li>
              <li class="flex gap-2 items-center"><BaseIcon name="game-icons:chips-bag"/>Grab-and-go snacks</li>
              <li class="flex gap-2 items-center"><BaseIcon name="bi:patch-exclamation-fill"/>More to come!!!</li>
            </ul>
          </LazyBaseInteractiveHoverTile>
          <LazyBaseInteractiveHoverTile class="w-[350px] h-[300px] flex flex-col justify-center text-brand-main-text text-left">
            <h3 class="text-brand-primary text-xl font-bold">Convenience Store Essentials</h3>
            <ul class="text-xl text-brand-main-text ml-8 mt-4 space-y-2 pl-4 border-l-[4px] border-l-brand-primary">
              <li class="flex gap-2 items-center"><BaseIcon name="fluent:people-community-12-filled"/>Community Products</li>
              <li class="flex gap-2 items-center"><BaseIcon name="streamline:beer-pitch-solid"/>Beer and Drinks</li>
              <li class="flex gap-2 items-center"><BaseIcon name="material-symbols:local-mall-sharp"/>Everyday necessities</li>
              <li class="flex gap-2 items-center"><BaseIcon name="material-symbols:family-home-rounded"/>Local favorites</li>
            </ul>
          </LazyBaseInteractiveHoverTile>
        </div>
      </BaseLayoutPageCTA>
    </DeferRender>

    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" class="cv-auto">
        <BaseLayoutPageContainer>
          <LazyBaseLayoutCard class="bg-white md:w-3/4 mx-auto">
            <div class="flex flex-col gap-4">
              <h2 class="text-2xl font-bold text-brand-primary">Our Commitment to the Community</h2>
              <p class="text-xl text-brand-main-text">
                Golden Gate Gas & Goods is more than just a place to stop—we’re committed to enhancing our neighborhoods by providing clean, modern facilities and products that our community wants and needs. As part of the Golden Gate family of businesses in Pueblo, we understand the importance of reliable, quality service and creating spaces people can depend on.
              </p>
              <p class="text-xl text-brand-main-text">
                We look forward to serving you at our newly renovated locations. Whether you’re stopping in for fuel at one of our full-service sites or visiting one of our convenience-focused stores, you can expect quality products, a clean environment, and a friendly atmosphere that makes every visit a pleasure. If you feel there is something missing, let us know—we take all suggestions into consideration because we want our locations to reflect what the community truly wants.
              </p>
              <BaseUiAction to="/company/about-us" class="px-8 py-4 self-center">Read More</BaseUiAction>
            </div>
          </LazyBaseLayoutCard>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>

    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" class="cv-auto" bg="alt">
        <BaseLayoutPageContainer class="space-y-4">
          <h2 class="text-2xl font-bold text-brand-primary">
            Golden Gate Goods – Elizabeth Location
          </h2>

          <div class="flex flex-col md:flex-row gap-8 justify-center items-center">
            <div class="space-y-4 md:w-1/2">
              <p class="text-xl text-brand-main-text">
                As we continue to grow, our vision is expanding beyond traditional convenience stores. At our Elizabeth location, Golden Gate Goods represents a new direction—one centered around community, accessibility, and thoughtful product selection.
              </p>
  
              <p class="text-xl text-brand-main-text">
                This location is designed to provide easier access to a wider range of foods, snacks, and everyday essentials. Our goal is to create a space where community members can find what they need without having to travel far, while also discovering new products that reflect local demand and preferences.
                We are focused on building a store that feels intentional—clean, welcoming, and stocked with items that matter to the people who live nearby. From quick grab-and-go options to a growing variety of food choices, Golden Gate Goods is about making everyday access simpler and more reliable.
              </p>
            </div>
            <div class="md:w-1/2 aspect-[5/3] overflow-hidden rounded-xl shadow-primary max-md:w-[80%] mx-auto">
                <NuxtImg src="/images/pages/gas-and-goods/elizabeth-location.jpg" class="w-full h-auto mx-auto" quality="60" format="webp,avif" :title="$t('non-medical.schedule.image.alt-title')" :alt="$t('non-medical.schedule.image.alt-title')" loading="lazy" height="960" width="1600" sizes="md:800px 80vw" placeholder />
            </div>  
          </div>


          <p class="text-xl text-brand-main-text">
            This is just the beginning of what Golden Gate Goods will become. As always, we welcome feedback from the community so we can continue shaping this space into something that truly serves the people around it.
          </p>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>
  </div>
</template>

<script lang="ts" setup>
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