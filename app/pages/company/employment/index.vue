<template>
  <div>
    <!-- Top Page Hero Shots -->
    <BaseLayoutPageHeroSection src="/images/pages/employment/employment-hero.webp" styling="max-sm:w-full">
      <BaseInteractiveFloatingCard styling="xs:absolute max-xs:w-full xs:top-8 xs:left-8">
        <h1 class="text-3xl font-extrabold">Looking for work?</h1>
        <p class="mt-8 font-bold">We are looking for potential employees who are:</p>
        <ul class="">
          <li class="flex items-center gap-2"><BaseIcon name="material-symbols:fitbit-check-small-rounded" color="text-white" size="size-8" class="shrink-0" />Reliable and punctual</li>
          <li class="flex items-center gap-2"><BaseIcon name="material-symbols:fitbit-check-small-rounded" color="text-white" size="size-8" class="shrink-0" />Solution oriented</li>
          <li class="flex items-center gap-2"><BaseIcon name="material-symbols:fitbit-check-small-rounded" color="text-white" size="size-8" class="shrink-0" />Friendly to customers and associates</li>
          <li class="flex items-center gap-2"><BaseIcon name="material-symbols:fitbit-check-small-rounded" color="text-white" size="size-8" class="shrink-0" />Team oriented</li>
          <li class="flex items-center gap-2"><BaseIcon name="material-symbols:fitbit-check-small-rounded" color="text-white" size="size-8" class="shrink-0" />Eager to learn</li>
        </ul>
        <BaseUiAction to="/company/employment/apply" class="mt-4 p-4">Apply Now!</BaseUiAction>
      </BaseInteractiveFloatingCard>
    </BaseLayoutPageHeroSection>

    <!-- Job Opportunities -->
    <BaseLayoutPageSection margin="default">
      <h2 class="text-2xl text-center font-bold text-brand-primary">Job Opportunities</h2>
      <div class="flex flex-col items-center mt-8 gap-8 md:grid md:grid-cols-2 md:w-max md:mx-auto lg:flex lg:flex-row lg:flex-wrap lg:w-full lg:justify-center">
        <BaseInteractiveFlipCard src="/images/pages/employment/ggmt-flipcard.jpg">
          <template #front>
            <div class="flex flex-col justify-between h-full font-extrabold">
                <h2 class="text-2xl">Transportation</h2>
                <p>Join our team of dedicated drivers and dispatchers</p>
            </div>
          </template>
          <template #back>
            <h2 class="text-2xl font-extrabold pb-4 border-b border-b-black">Transportation Positions</h2>
            <div class="flex flex-col h-full justify-between">
              <div>
                <BaseLayoutPageListItem title="City Cab" has-left-border small-border small-text class="mt-4">
                  <ul>
                    <li>Dispatcher — <button type="button" class="link">Job Description</button></li>
                    <li>Driver — <button type="button" class="link">Job Description</button></li>
                    <li>Admin Asst. — <button type="button" class="link">Job Description</button></li>
                  </ul>
                </BaseLayoutPageListItem>
                <BaseLayoutPageListItem title="Non-Emergency" has-left-border small-border small-text class="mt-4">
                  <ul>
                    <li>Customer Service — <button type="button" class="link">Job Description</button></li>
                    <li>Driver — <button type="button" class="link">Job Description</button></li>
                  </ul>
                </BaseLayoutPageListItem>
              </div>
              <div class="mt-4 self-center">
                <BaseUiAction href="#" class="py-2 px-4">Apply Now</BaseUiAction>
              </div>
            </div>
          </template>
        </BaseInteractiveFlipCard>
        <BaseInteractiveFlipCard src="/images/pages/employment/ggmal-flipcard.jpg">
          <template #front>
            <div class="flex flex-col justify-between h-full font-extrabold">
              <h2 class="text-2xl">Assisted Living</h2>
              <p>Care for our community with compassion</p>
            </div>
          </template>
          <template #back>
            <div>
              <h2 class="text-2xl font-extrabold pb-4 border-b border-b-black">Assisted Living Positions</h2>
              <div class="flex flex-col h-full justify-between">
                <div>
                  <BaseLayoutPageListItem title="Assisted Care Facility" has-left-border small-border small-text class="mt-4">
                    <ul>
                      <li>
                        QMAP — <button type="button" class="link">Job Description</button>
                      </li>
                      <li>PCP — <button type="button" class="link">Job Description</button></li>
                    </ul>
                  </BaseLayoutPageListItem>
                </div>
                <div class="mt-4 self-center">
                  <BaseUiAction href="#" class="py-2 px-4">Apply Now</BaseUiAction>
                </div>
              </div>
            </div>
          </template>
        </BaseInteractiveFlipCard>
        <BaseInteractiveFlipCard src="/images/pages/employment/ggms-flipcard.jpg">
          <template #front>
            <div class="flex flex-col justify-between h-full font-extrabold">
              <h2 class="text-2xl">Medical Supply</h2>
              <p>Support our community's health and well-being</p>
            </div>
          </template>
          <template #back>
            <div>
              <h2 class="text-2xl font-extrabold pb-4 border-b border-b-black">Medical Supply Positions</h2>
              <div class="flex flex-col h-full justify-between">
                <div>
                  <BaseLayoutPageListItem title="DME Store" has-left-border small-border small-text class="mt-4">
                    <ul>
                      <li>DME Specialist — <button type="button" class="link">Job Description</button>
                      </li>
                      <li>Delivery Driver — <button type="button" class="link">Job Description</button>
                      </li>
                      <li>Inventory Tech. — <button type="button" class="link">Job Description</button>
                      </li>
                    </ul>
                  </BaseLayoutPageListItem>
                </div>
                <div class="mt-4 self-center">
                  <BaseUiAction href="#" class="py-2 px-4">Apply Now</BaseUiAction>
                </div>
              </div>
            </div>
          </template>
        </BaseInteractiveFlipCard>
        <BaseInteractiveFlipCard src="/images/pages/employment/ggmc-flipcard.jpg">
          <template #front>
            <div class="flex flex-col justify-between h-full font-extrabold">
              <h2 class="text-2xl">Gas Station</h2>
              <p>Join us on our newest adventure</p>
            </div>
          </template>
          <template #back>
            <div>
              <h2 class="text-2xl font-extrabold pb-4 border-b border-b-black">Gas Station Positions</h2>
              <div class="flex flex-col h-full justify-between">
                <div>
                  <BaseLayoutPageListItem title="Convenience Store" has-left-border small-border small-text class="mt-4">
                    <ul>
                      <li>Manager — <button type="button" class="link">Job Description</button></li>
                      <li>Assistant Manager — <button type="button" class="link">Job Description</button></li>
                      <li>Attendant — <button type="button" class="link">Job Description</button></li>
                    </ul>
                  </BaseLayoutPageListItem>
                </div>
                <div class="mt-4 self-center">
                  <BaseUiAction href="#" class="py-2 px-4">Apply Now</BaseUiAction>
                </div>
              </div>
            </div>
          </template>
        </BaseInteractiveFlipCard>
      </div>
    </BaseLayoutPageSection>

    <!-- CTA Section -->
    <BaseLayoutPageCTA 
      title="Explore Career Opportunities"
      description="We're always on the lookout for passionate individuals to join our diverse team!
      As our company expands, new opportunities arise across our different businesses.
      Discover where you can make an impact!"
      to="/company/employment/apply?select=general"
      button-label="Join Our Team"
    />

    <!-- About Us Section -->
    <BaseLayoutPageSection margin="default">
      <BaseLayoutPageContainer class="space-y-8">
        <section class="space-y-1">
          <h2 class="text-2xl font-bold text-brand-primary">About Golden Gate Manor Inc.</h2>
          <p class="text-xl text-brand-main-text">PEOPLE WHO VALUE THEIR QUALITY OF LIFE CAN DEPEND ON US.</p>
          <p class="text-xl text-brand-main-text">Welcome to Golden Gate Manor! Here at Golden Gate Manor, Our
          Mission Is Simple: To Improve The Quality of Life Each and Every Day. We
          are a family-owned and operated facility that offers highly personalized,
          compassionate, and direct care to members of our community in Pueblo, CO.
          Our services include assisted living, medical and non-medical transportation
          services, and medical supply sales.</p>
        </section>
        <section class="space-y-1">
          <h2 class="text-2xl font-bold text-brand-primary">Our Team</h2>
          <p class="text-xl text-brand-main-text">The management team at Golden Gate Manor brings over 35 years
            of experience in caring and providing for older adults, individuals with mental illness,
            and overseeing transportation operations. Our mission is to foster a welcoming and relaxing
            environment, whether someone is living in our assisted living or utilizing our transportation services.
            Fostering this environment is part of our standard of care and this is an expectation from all employees
            working at Golden Gate Manor.
          </p>
        </section>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
  </div>
</template>

<script setup lang='ts'>
import { BaseLayoutPageCTA, BaseLayoutPageSection, BaseUiAction } from '#components'

definePageMeta({
  breadcrumb: false
})

useHead({
  titleTemplate: null
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Join Our Team | Careers at Golden Gate Manor Inc.',
  ogTitle: 'Join Our Team | Careers at Golden Gate Manor Inc.',
  description: 'Explore rewarding career opportunities at Golden Gate Manor Inc. in transportation, assisted living, and medical supplies. Apply today!',
  ogDescription: 'Explore rewarding career opportunities at Golden Gate Manor Inc. in transportation, assisted living, and medical supplies. Apply today!',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Join Our Team | Careers at Golden Gate Manor Inc.',
  twitterDescription: 'Explore rewarding career opportunities at Golden Gate Manor Inc. in transportation, assisted living, and medical supplies. Apply today!',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
  name: 'JobOpportunityPage'
})
</script>

<style></style>