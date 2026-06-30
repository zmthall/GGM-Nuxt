<template>
  <div>
    <!-- Hero Section -->
    <BaseLayoutPageSection margin="top" class="cv-auto">
      <BaseLayoutPageContainer>
        <div
          class="relative w-full overflow-hidden rounded-xl bg-brand-primary h-[460px]"
        >
          <!-- Background -->
          <img
            :src="heroShot.right.image"
            :alt="heroShot.right.alt"
            class="absolute inset-0 h-full w-full object-cover object-right"
          >
          
          <!-- Overlay -->
          <div
            class="absolute inset-0 max-sm:bg-brand-primary/80 sm:bg-[linear-gradient(90deg,#121b75_0%,#121b75_30%,rgba(18,27,117,.95)_42%,rgba(18,27,117,.72)_54%,rgba(18,27,117,.28)_66%,transparent_80%)]"
          />

          <!-- Content -->
          <div class="absolute inset-0 z-10 flex heroShots-center pt-6">
            <div class="max-w-[34rem] pl-4 sm:pl-16 pr-8">

              <!-- Eyebrow -->
              <p class="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-brand-secondary">
                {{ $t(`home.hero-slides.${heroShot.id}.left.eyebrow`) }}
              </p>

              <!-- Headline -->
              <h2 class="font-serif text-[2.6rem] font-bold leading-[1.05] text-shadow">
                <span
                    v-for="(line, idx) in getHeadlineLines(heroShot.id)"
                    :key="idx"
                    class="block"
                    :class="idx === 0 ? 'text-brand-secondary' : 'text-white'"
                >
                    {{ $rt(line) }}
                </span>
              </h2>

              <!-- Description -->
              <p class="mt-6 max-w-md text-[16px] leading-7 text-white/90 text-shadow">
                {{ $t(`home.hero-slides.${heroShot.id}.left.description`) }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-4 my-8">
          <h2 class="text-2xl text-brand-primary font-bold">
            Understanding the Transition
          </h2>


          <div class="flex flex-col gap-3">
            <p class="text-lg sm:text-2xl">
              Beginning July 1, 2026, Health First Colorado will begin using MediDrive as its statewide transportation broker for non-emergency medical transportation (NEMT). While the scheduling process is changing, Golden Gate Manor Transportation remains committed to serving our community and helping members understand what to expect during the transition.
            </p>
  
            <p class="text-lg sm:text-2xl">
              Golden Gate Manor Transportation created this guide to answer common questions, explain how scheduling works under the new system, and provide helpful resources for members, caregivers, healthcare providers, and anyone coordinating transportation for medical appointments.
            </p>
          </div>
          <h2 class="text-xl font-bold text-brand-primary text-center">Official MediDrive Links</h2>
          <div class="flex gap-8 justify-center mt-4">
            <BaseUiAction href="https://medidrive.com/facilities/co" class="px-4 py-2">
              Visit MediDrive
            </BaseUiAction>

            <BaseUiAction href="https://member.medidrive.com/login" variant="blank" class="px-4 py-2 text-brand-primary first-line:font-bold border-2 border-brand-primary rounded-md hover:bg-brand-secondary">
              Member Portal
            </BaseUiAction>
          </div>
          <div>
            <p class="text-lg text-brand-primary -mb-4"><span class="font-bold">Have questions before scheduling?</span> Continue reading below for frequently asked questions, transition details, and helpful resources.</p>
          </div>
        </div>
        <div>
          <PostAtAGlance class="w-full" full-width>
            <ul class="ml-8 list-disc">
              <li>
                <span class="font-bold">What's changing on July 1: </span>Beginning July 1, 2026, Health First Colorado members will schedule non-emergency medical transportation through MediDrive, the state's new transportation broker.
              </li>
              <li>
                <span class="font-bold">How MediDrive works:</span> MediDrive coordinates eligible transportation requests and connects members with participating transportation providers throughout Colorado.
              </li>
              <li>
                <span class="font-bold">Request Golden Gate Manor Transportation:</span> If you'd like to ride with Golden Gate Manor Transportation, you can request us when scheduling your ride through MediDrive.
              </li>
              <li>
                <span class="font-bold">Frequently asked questions:</span> Learn how scheduling works, what information you'll need, what to expect during the transition, and answers to common member questions.
              </li>
              <li>
                <span class="font-bold">Helpful contacts & resources:</span> Quickly find important contact information, official Health First Colorado resources, and links to MediDrive services all in one place.
              </li>
            </ul>
          </PostAtAGlance>
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
  </div>
</template>

<script lang="ts" setup>

function getHeadlineLines(id: string) {
  return $tm(`home.hero-slides.${id}.left.headline`) as string[]
}

const heroShot = {
  id: 'medidrive-update',
  right: {
      image: '/images/pages/home/hero-carousel/van-and-road.png', 
      alt: 'Health First Colorado NEMT rides are now scheduled through MediDrive beginning July 1, 2026'
  },
  to: '/news/information/MediDrive',
  bg: 'nemt'
}

</script>

<style>

</style>