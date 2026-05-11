<template>
  <div>
    <BaseLayoutPageContainer>
      <BaseLayoutPageSection margin="pTop" class="md:grid md:grid-cols-2 md:max-w-[1200px] md:mx-auto md:gap-8">
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
            <div class="business-information">
              <BaseLayoutPageListItem :title="company.name" has-icon :size="12" icon-name="material-symbols:location-on-rounded">
                  <NuxtLink to="/company/location" class="link">{{ company.address }}</NuxtLink>
              </BaseLayoutPageListItem>
              <BaseLayoutPageListItem  :title="$t('company.contact.sections.business.phone')" has-icon :size="12" icon-name="ic:round-call">
                  <a :href="`tel:${company.assistedLiving.phone}`" class="link">{{ company.assistedLiving.phone }}</a>
              </BaseLayoutPageListItem>
          </div>
        </div>

        <!-- Right Page -->
        <DeferRender when="visible" eager-if-in-view>
            <div class="space-y-2 cv-auto">
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