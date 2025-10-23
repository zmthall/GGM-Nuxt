<template>
  <div>
    <!-- SECTION 1 — What it is & why it matters -->
    <BaseLayoutPageSection margin="top">
      <BaseLayoutPageContainer>
        <header class="space-y-2 max-sm:mb-2">
          <h2 class="max-sm:hidden text-2xl font-bold text-brand-primary">
            Beer Cave Overview
          </h2>
          <p class="text-xl text-brand-main-text">
            Discover the Beer Cave at Golden Gate Gas & Goods—a cool, refreshing highlight of our
            Prairie Avenue and Northern location on Pueblo's south side. More than a walk-in cooler, it's a
            community favorite built around freshness, comfort, and pride.
          </p>
        </header>

        <article class="space-y-2 text-xl text-brand-main-text">
          <figure
            class="float-none sm:float-right aspect-[4/3] sm:ml-8 sm:mr-28 sm:mb-4 sm:w-[450px] w-full sm:max-w-[500px] max-w-[400px] max-sm:mx-auto sm:rounded-xl sm:shadow-primary overflow-hidden"
            style="shape-outside: inset(0 round 12px);"
          >
            <NuxtImg
              src="/images/pages/gas-and-goods/beer-cave-interior.jpeg"
              format="webp,avif"
              width="400"
              height="300"
              placeholder
              class="w-full h-auto object-cover"
              sizes="sm:400px 100vw"
              alt="Beer Cave Pueblo at Golden Gate Gas & Goods"
            />
          </figure>
          <p>
            When we first opened Golden Gate Gas &amp; Goods, we wanted to create something new for the area—clean,
            modern, and welcoming. The Beer Cave became a cornerstone of that vision. Spacious and easy to navigate,
            it offers a wide selection of cold beer ready for locals, commuters, and weekend shoppers alike.
          </p>
          <p>
            Customers love stepping inside and feeling that instant wave of cool air on warm Pueblo afternoons. Many are
            surprised by how large the Beer Cave is—nearly as big as the original store once was—and by the convenience
            of choosing their drinks right here instead of making an extra stop.
          </p>
        </article>
        <div class="clear-both" />
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>

    <!-- CTA — actions for intent -->
    <!-- <BaseLayoutPageCTA title="Plan Your Stop" :has-button="false">
      <div class="flex flex-wrap items-center justify-center gap-4 my-4">
        <BaseUiAction href="/gas-and-goods/beer-cave-pueblo" class="py-2 px-4">Explore the Beer Cave</BaseUiAction>
        <BaseUiAction href="https://maps.app.goo.gl/kEzjKfbBfLnWwRRTA" external class="py-2 px-4">Get Directions</BaseUiAction>
        <span class="text-sm text-brand-main-text/80">
          Inside Golden Gate Gas &amp; Goods — Prairie &amp; Northern, Pueblo (south side)
        </span>
      </div>
    </BaseLayoutPageCTA> -->

    <!-- SECTION 2 — Temperature control & quality process -->
    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" bg="alt">
        <BaseLayoutPageContainer>
          <h2 class="text-2xl font-bold text-brand-primary mb-2">Industrial Grade Cooling</h2>
          <div class="grid md:grid-cols-2 gap-4 sm:gap-8 items-center">
            <!-- Image drop zone -->
            <div class="w-full mx-auto aspect-[4/3] max-w-[400px] sm:max-w-[600px] sm:rounded-lg sm:shadow-primary overflow-hidden">
              <NuxtImg
                src="/images/pages/gas-and-goods/cooling-system.jpg"
                format="webp,avif"
                width="400"
                height="300"
                placeholder
                class="h-full w-full object-cover"
                sizes="sm:400px 100vw"
                alt="Walk-in beer cooler temperature control"
              />
            </div>
  
            <article class="space-y-5 text-xl text-brand-main-text">
              <p>
                The Beer Cave was built with a simple goal: to give Pueblo's south side a space that feels cool, clean, 
                and cared for. Every detail—from the lighting to the airflow—was chosen to make it comfortable and dependable 
                for everyone who stops in. The walk-in cooler runs on a commercial-grade system that holds a steady 35°F, 
                with multiple fans circulating air evenly to keep everything cold and fresh. It's dependable, energy-efficient, 
                and maintained year-round so it's ready whenever you are.

              </p>
              <p>
                Whether you're grabbing something quick on your way home or cooling off after a long day, the Beer Cave at Prairie 
                and Northern is a small reminder of what local investment and pride can build—done quietly, but done right.
              </p>
            </article>
          </div>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>

    <!-- SECTION 3 — Layout, access, and what's next -->
    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default">
        <BaseLayoutPageContainer>
          <h2 class="text-2xl font-bold text-brand-primary mb-2">Keeping It Cold, Clean, and Community-Focused</h2>
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <article class="space-y-5 text-xl text-brand-main-text">
              <p>
                Behind the scenes, our team checks temperatures, rotates inventory, and keeps everything organized by singles,
                cases, and popular categories. Two side doors make quick grab-and-go stops easy, while the main double-door
                entrance invites shoppers to browse comfortably.
              </p>
              <p>
                The Beer Cave has become a small reflection of what we want for Pueblo's south side—renewal, comfort, and pride 
                in a place that feels local again. What started as an idea to offer something better has grown into a feature people 
                enjoy every day: clean, organized, and kept just right.
              </p>
              <p>
                Whether you're heading home after work or starting your weekend, stop by our Beer Cave at Prairie Avenue and
                Northern in Pueblo, CO. Step inside, feel the chill, and enjoy an ice-cold beer—fresh from our community to yours.
              </p>
            </article>
  
            <!-- Image drop zone -->
            <div class="w-full mx-auto aspect-[4/3] max-w-[400px] sm:max-w-[600px] sm:rounded-lg sm:shadow-primary overflow-hidden">
              <NuxtImg
                src="/images/pages/gas-and-goods/inside-beer-cave.jpeg"
                format="webp,avif"
                width="400"
                height="300"
                placeholder
                class="h-full w-full object-cover"
                sizes="sm:400px 100vw"
                alt="Golden Gate Gas & Goods Beer Cave entrance"
              />
            </div>
          </div>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>
    <!-- FAQ Section (fresh content below) -->

    <BaseLayoutPageSection margin="default" bg="alt">
      <BaseLayoutPageContainer>
        <FaqBeerCave />
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ title: 'Beer Cave in Pueblo, Colorado', breadcrumbLabel: 'Beer Cave' })

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Beer Cave | Golden Gate Gas & Goods - Pueblo, CO',
  ogTitle: 'Beer Cave | Golden Gate Gas & Goods - Pueblo, CO',
  description: 'Beer Cave Pueblo at Prairie & Northern. Walk-in beer cooler, steady 34-38°F, organized selection, and easy grab-and-go inside Golden Gate Gas & Goods.',
  ogDescription: 'Beer Cave Pueblo at Prairie & Northern. Walk-in beer cooler, steady 34-38°F, organized selection, and easy grab-and-go inside Golden Gate Gas & Goods.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-beer-cave.png`,
  twitterTitle: 'Beer Cave | Golden Gate Gas & Goods - Pueblo, CO',
  twitterDescription: 'Walk-in beer cooler on Pueblo\'s south side—34-38°F for crisp, ice-cold beer inside Golden Gate Gas & Goods.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-beer-cave.png`,
  twitterCard: 'summary_large_image'
})
</script>
