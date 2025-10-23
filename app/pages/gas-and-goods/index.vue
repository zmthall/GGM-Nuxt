<template>
  <div>
    <BaseLayoutPageBanner src="/images/pages/gas-and-goods/gas-station-banner-ratio.jpg" alt="Golden Gate Manor Gas and Goods 1 with signage on building" title="Street view of 1242 S. Prairie Gas Station" loading="eager" image-width="800" image-height="400" aspect-ratio="aspect-[2/1]" />
    <BaseLayoutPageSection margin="top">
      <BaseLayoutPageContainer class="space-y-4">
        <h2 class="text-2xl font-bold text-brand-primary">Golden Gate Gas & Goods Journey</h2>
        <p class="text-xl text-brand-main-text">
          What began as a vision to better serve the Pueblo community has transformed into reality at Golden Gate Gas & Goods. The journey to revitalize our locations has been both challenging and rewarding - a labor of love spanning many months of careful planning, demolition, and reconstruction. From gutting our tiny 152 sq ft convenience store to creating a 1100+ sq ft expanded experience, we've poured our hearts into every detail. New fuel tanks, modern pumps, expanded product offerings/availability, and freshly designed interiors now welcome you at our locations.
        </p>
        <p class="text-xl text-brand-main-text">
          While the process took time, watching these spaces evolve day by day has been truly remarkable. Each hole dug, every sq ft of cement poured, each shelf installed, and each new feature added represents our commitment to providing more than just fuel - we're building community spots where neighbors can find quality products in clean, welcoming environments. This is just the start of this journey and we are open to all feedback that will help us create a space that is enjoyable and fulfills its purpose with comfort.
        </p>
        <p class="text-xl text-brand-main-text">
          We invite you to experience the difference at Golden Gate Gas & Goods, where our renovation journey continues with you, our valued customers, at the heart of every decision we make. This transformation marks just the first chapter in our ongoing story. Discover the vision behind our family of businesses, learn how we're dedicated to elevating the Pueblo community, or share your thoughts with us—your feedback shapes our future.
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
              We've invested in completely transforming our locations to serve you better. From brand new fuel tanks and pumps to dramatically expanded store spaces, we're committed to providing a superior experience every time you visit.
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
            <div class="md:w-1/2 flex justify-center aspect-[4/3] max-w-[500px]">
              <NuxtImg src="/images/pages/gas-and-goods/beer-cave-entrance.jpeg" format="webp,avif" width="500" height="375" placeholder class="rounded-lg shadow-primary object-contain h-full" sizes="sm:500px 100vw"/>
            </div>
            <div class="space-y-8 md:w-1/2">
              <p class="text-lg sm:text-xl text-brand-main-text">
                Ice-cold and walk-in ready—our Beer Cave is kept at a steady <span class="whitespace-nowrap">34°F to 38°F</span>
                for crisp, refreshing beer without freezing. Clean, spacious, and easy to browse, it's one more way we're bringing a
                modern, community-first experience to Pueblo's south side right off of Prairie and Northern.
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
                Golden Gate Gas & Goods is more than just a place to fill your tank. We're committed to enhancing our neighborhoods by providing clean, modern facilities and products that our community wants and needs. As part of the Golden Gate family of businesses in Pueblo, we understand the importance of reliable, quality service.
              </p>
              <p class="text-xl text-brand-main-text">
                We look forward to serving you at our newly renovated locations. Stop by for quality fuel, fresh refreshments, and a friendly atmosphere that makes every visit a pleasure. If you feel there is something missing, let us know! We take all suggestions into consideration because we want our locations to provide what the community wants.
              </p>
              <BaseUiAction to="/company/about-us" class="px-8 py-4 self-center">Read More</BaseUiAction>
            </div>
          </LazyBaseLayoutCard>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'Golden Gate Gas Stations & Goods in Pueblo Colorado',
  breadcrumbLabel: 'Gas Stations'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Golden Gate Gas & Goods Pueblo',
  ogTitle: 'Golden Gate Gas & Goods Pueblo',
  description: 'Overview of Golden Gate Manor Inc. Gas & Goods. Our gas stations are currently located in Pueblo Colorado Learn about our current venture into the gas station realm.',
  ogDescription: 'Overview of Golden Gate Manor Inc. Gas & Goods. Our gas stations are currently located in Pueblo Colorado Learn about our current venture into the gas station realm.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-medical-supply.png`,
  twitterTitle: 'Golden Gate Gas & Goods Pueblo',
  twitterDescription: 'Overview of Golden Gate Manor Inc. Gas & Goods. Our gas stations are currently located in Pueblo Colorado Learn about our current venture into the gas station realm.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-medical-supply.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
  name: 'MedicalSuppliesPage'
})
</script>

<style>

</style>