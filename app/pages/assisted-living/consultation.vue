<template>
  <div>
    <BaseLayoutPageContainer>
      <BaseLayoutPageSection margin="top" class="md:grid md:grid-cols-2 md:max-w-[1200px] md:mx-auto md:gap-8">
        <!-- Left Page -->
        <div class="space-y-2">

          <h2 class="font-extrabold text-2xl max-sm:hidden">{{ $t('assisted-living.consultation.left.title') }}</h2>
          <p v-for="paragraph in $tm('assisted-living.consultation.left.paragraph')" :key="paragraph" class="text-xl">
              {{ $rt(paragraph)}}
          </p>

          <PleaseNote class="text-xl">
              <div class="space-y-2">
                  <p>
                    {{ $t('assisted-living.consultation.left.please-note') }}
                  </p>
              </div>
          </PleaseNote>
          
          <div class="!my-16 rounded-xl border border-brand-primary/15 bg-white/40 p-8 space-y-4">
            <h2 class="text-2xl font-bold text-brand-primary">
              What Happens Next?
            </h2>
            <div class="mt-4 flex items-center gap-4">
              <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full overflow-hidden bg-brand-primary text-white font-bold">
                1
              </div>

              <div>
                <h4 class="font-semibold">
                  Submit Your Consultation Request
                </h4>

                <p class="text-sm text-brand-main-text/80">
                  Complete the consultation form with as much information as you feel comfortable providing.
                </p>
              </div>
            </div>
            <div class="mt-4 flex items-center gap-4">
              <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full overflow-hidden bg-brand-primary text-white font-bold">
                2
              </div>
              
              <div>
                <h4 class="font-semibold">
                  Speak With Our Care Team
                </h4>
                
                <p class="text-sm text-brand-main-text/80">
                  A member of our Resident Care team will review your information and contact you to discuss your situation, questions, and care needs.
                </p>
              </div>
            </div>
            <div class="mt-4 flex items-center gap-4">
              <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full overflow-hidden bg-brand-primary text-white font-bold">
                3
              </div>

              <div>
                <h4 class="font-semibold">
                  Explore Care & Placement Options
                </h4>

                <p class="text-sm text-brand-main-text/80">
                  We'll help guide you through available assisted living options, accommodations, and next steps based on your individual needs.
                </p>
              </div>
            </div>
          </div>
          <div class="business-information">
            <BaseLayoutPageListItem :title="company.assistedLiving.name" has-icon :size="12" icon-name="material-symbols:location-on-rounded">
                <NuxtLink :to="$localePath('/company/location')" class="link">{{ company.assistedLiving.address }}</NuxtLink>
            </BaseLayoutPageListItem>
            <BaseLayoutPageListItem  :title="$t('company.contact.sections.business.phone')" has-icon :size="12" icon-name="ic:round-call">
                <a :href="`tel:${company.assistedLiving.phone}`" class="link">{{ company.assistedLiving.phone }}</a>
            </BaseLayoutPageListItem>
          </div>
        </div>

        <!-- Right Page -->
        <DeferRender when="visible" eager-if-in-view>
            <div class="mt-8 md:mt-0 space-y-2 cv-auto">
                <h2 class="font-extrabold text-2xl uppercase">{{ $t('consultation-form.title') }}</h2>
                <AssistedLivingConsultationForm />
            </div>
        </DeferRender>
      </BaseLayoutPageSection>
    </BaseLayoutPageContainer>
  </div>
</template>

<script lang="ts" setup>
import company from '@/data/company.json'

definePageMeta({
  title: 'Request an Assisted Living Consultation',
  alias: ['/assisted-living/consultation/thank-you'],
  breadcrumbLabel: 'Consultation'
})

useHead({
    titleTemplate: null
})

const runtimeConfig = useRuntimeConfig();
useSeoMeta({
  title: 'Request an Assisted Living Consultation | Golden Gate Manor',
  description: 'Request an assisted living consultation with Golden Gate Manor Inc. Learn about care options, ADA accommodations, insurance questions, and supportive living services in Pueblo and Southern Colorado.',
  ogTitle: 'Request an Assisted Living Consultation | Golden Gate Manor',
  ogDescription: 'Speak with Golden Gate Manor’s Resident Care Specialists about assisted living options, care needs, insurance information, ADA accommodations, and next steps for placement.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Request an Assisted Living Consultation | Golden Gate Manor',
  twitterDescription: 'Explore assisted living options with Golden Gate Manor Inc. Our care team is here to help individuals and families throughout Pueblo and Southern Colorado.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

</script>

<style>

</style>