<template>
  <div>
    <MedSupplyLink ab-value="breadcrumb" />
    <BaseLayoutPageBanner src="/images/pages/medical-supplies/medical-supply-banner.jpg" :alt="$t('medical-supplies.alt-title')" loading="eager" :title="$t('medical-supplies.alt-title')" image-width="935" image-height="464" aspect-ratio="aspect-[2/1]" />
    <MedSupplyLink ab-value="under-image" />
    <BaseLayoutPageSection margin="top">
      <BaseLayoutPageContainer class="space-y-4 flex flex-col">
        <h2 class="text-2xl font-bold text-brand-medical-primary">{{ $t('medical-supplies.overview.title') }}</h2>
        <p class="text-xl text-brand-main-text">
          {{ $t('medical-supplies.overview.paragraph[0]') }}
        </p>
        <p class="text-xl text-brand-main-text">
          {{ $t('medical-supplies.overview.paragraph[1]') }}
          <NuxtLink :to="$localePath('/resources/faq')" class="link">{{ $t('medical-supplies.overview.faq') }}</NuxtLink> {{ $t('medical-supplies.overview.paragraph[2]') }}
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <BaseUiAction href="https://goldengatemedicalsupply.com/pages/about-us" new-page title="Opens in new tab" class="px-8 py-4 xs:w-3/4 xs:self-center sm:w-max">{{ $t('medical-supplies.overview.button.read-more') }}</BaseUiAction>
          <BaseUiAction href="https://goldengatemedicalsupply.com/collections/all-products" variant="secondary" new-page title="Opens in new tab" class="px-8 py-5 xs:w-3/4 xs:self-center sm:w-max">{{ $t('medical-supplies.overview.button.explore') }}</BaseUiAction>
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" bg="alt" class="cv-auto">
        <BaseLayoutPageContainer class="space-y-4">
          <h2 class="text-2xl font-bold text-brand-medical-primary">{{ $t('medical-supplies.our-products.title') }}</h2>
          <p class="text-xl text-brand-main-text !mb-8">
            {{ $t('medical-supplies.our-products.paragraph') }}
          </p>
          <ul class="space-y-8 sm:space-y-8">
            <li class="flex flex-col-reverse gap-8 md:flex-row justify-center max-md:items-center">
              <div class="md:w-1/2 flex flex-col">
                <h3 class="text-xl font-bold text-brand-medical-primary flex flex-col mb-4 text-center">
                  <span class="text-gray-500">
                    {{ $t('medical-supplies.our-products.orthotic-shoes.title[0]') }}
                  </span>
                  <span>
                    {{ $t('medical-supplies.our-products.orthotic-shoes.title[1]') }}
                  </span>
                </h3>
                <div class="space-y-4">
                  <p class="text-xl text-brand-main-text">
                    {{ $t('medical-supplies.our-products.orthotic-shoes.paragraph[0]') }}
                  </p>
                  <p class="text-xl text-brand-main-text">
                    {{ $t('medical-supplies.our-products.orthotic-shoes.paragraph[1]') }}
                  </p>
                </div>
                <div class="mt-4 w-max self-center space-x-8">
                  <BaseUiAction href="https://goldengatemedicalsupply.com/pages/contact-us" :new-page="true" class="p-2">{{ $t('medical-supplies.our-products.button.contact') }}</BaseUiAction>
                </div>
              </div>
              <div class="sm:p-4">
                <NuxtImg src="/images/pages/medical-supplies/orthotic-shoes.jpg" quality="60" format="webp,avif" class="rounded-xl shadow-primary" :title="$t('medical-supplies.our-products.orthotic-shoes.alt-title')" :alt="$t('medical-supplies.our-products.orthotic-shoes.alt-title')" loading="lazy" height="375" width="375" placeholder />
              </div>
            </li>
            <li class="flex flex-col-reverse gap-8 md:flex-row justify-center max-md:items-center">
              <div class="md:w-1/2 flex flex-col">
                <h3 class="text-xl font-bold text-brand-medical-primary flex flex-col mb-4 text-center">
                  <span class="text-gray-500">
                    {{ $t('medical-supplies.our-products.mobility-aids.title[0]') }}
                  </span>
                  <span>
                    {{ $t('medical-supplies.our-products.mobility-aids.title[1]') }}
                  </span>
                </h3>
                <div class="space-y-4">
                  <p class="text-xl text-brand-main-text">
                    {{ $t('medical-supplies.our-products.mobility-aids.paragraph[0]') }}
                  </p>
                  <p class="text-xl text-brand-main-text">
                    {{ $t('medical-supplies.our-products.mobility-aids.paragraph[1]') }}
                  </p>
                </div>
                <div class="mt-4 w-max self-center space-x-8">
                  <BaseUiAction href="https://goldengatemedicalsupply.com/collections/mobility-aids" :new-page="true" class="p-2">{{ $t('medical-supplies.our-products.button.view') }}</BaseUiAction>
                  <BaseUiAction href="https://goldengatemedicalsupply.com/pages/contact-us" :new-page="true" class="p-2">{{ $t('medical-supplies.our-products.button.contact') }}</BaseUiAction>
                </div>
              </div>
              <div class="sm:p-4">
                <NuxtImg src="/images/pages/medical-supplies/mobility.jpg" quality="60" format="webp,avif" class="rounded-xl shadow-primary" :title="$t('medical-supplies.our-products.mobility-aids.alt-title')" :alt="$t('medical-supplies.our-products.mobility-aids.alt-title')" loading="lazy" height="375" width="375" placeholder/>
              </div>
            </li>
            <li class="flex flex-col-reverse gap-8 md:flex-row justify-center max-md:items-center">
              <div class="md:w-1/2 flex flex-col">
                <h3 class="text-xl font-bold text-brand-medical-primary flex flex-col mb-4 text-center">
                  <span class="text-gray-500">
                    {{ $t('medical-supplies.our-products.wound-care.title[0]') }}
                  </span>
                  <span>
                    {{ $t('medical-supplies.our-products.wound-care.title[1]') }}
                  </span>
                </h3>
                <div class="space-y-4">
                  <p class="text-xl text-brand-main-text">
                    {{ $t('medical-supplies.our-products.wound-care.paragraph[0]') }}
                  </p>
                  <p class="text-xl text-brand-main-text">
                    {{ $t('medical-supplies.our-products.wound-care.paragraph[1]') }}
                  </p>
                </div>
                <div class="mt-4 w-max self-center space-x-8">
                  <BaseUiAction href="https://goldengatemedicalsupply.com/collections/first-aid-wound-care" :new-page="true" class="p-2">{{ $t('medical-supplies.our-products.button.view') }}</BaseUiAction>
                  <BaseUiAction href="https://goldengatemedicalsupply.com/pages/contact-us" :new-page="true" class="p-2">{{ $t('medical-supplies.our-products.button.contact') }}</BaseUiAction>
                </div>
              </div>
              <div class="sm:p-4">
                <NuxtImg src="/images/pages/medical-supplies/wound-care.jpg" quality="60" format="webp,avif" class="rounded-xl shadow-primary" :title="$t('medical-supplies.our-products.wound-care.alt-title')" :alt="$t('medical-supplies.our-products.wound-care.alt-title')" loading="lazy" height="375" width="375" placeholder/>
              </div>
            </li>
            <li class="flex flex-col-reverse gap-8 md:flex-row justify-center max-md:items-center">
              <div class="md:w-1/2 flex flex-col">
                <h3 class="text-xl font-bold text-brand-medical-primary flex flex-col mb-4 text-center">
                  <span class="text-gray-500">
                    {{ $t('medical-supplies.our-products.ostomy.title[0]') }}
                  </span>
                  <span>
                    {{ $t('medical-supplies.our-products.ostomy.title[1]') }}
                  </span>
                </h3>
                <div class="space-y-4">
                  <p class="text-xl text-brand-main-text">
                    {{ $t('medical-supplies.our-products.ostomy.paragraph[0]') }}
                  </p>
                  <p class="text-xl text-brand-main-text">
                    {{ $t('medical-supplies.our-products.ostomy.paragraph[1]') }}
                  </p>
                </div>
                 <div class="mt-4 w-max self-center">
                   <BaseUiAction href="https://goldengatemedicalsupply.com/pages/contact-us" :new-page="true" class="p-2">{{ $t('medical-supplies.our-products.button.contact') }}</BaseUiAction>
                 </div>
              </div>
              <div class="sm:p-4">
                <NuxtImg src="/images/pages/medical-supplies/ostomy.jpg" quality="60" format="webp,avif" class="rounded-xl shadow-primary" :title="$t('medical-supplies.our-products.ostomy.alt-title')" :alt="$t('medical-supplies.our-products.ostomy.alt-title')" loading="lazy" height="375" width="375" placeholder />
              </div>
            </li>
            <li class="flex flex-col-reverse gap-8 md:flex-row justify-center max-md:items-center">
              <div class="md:w-1/2 flex flex-col">
                <h3 class="text-xl font-bold text-brand-medical-primary flex flex-col mb-4 text-center">
                  <span class="text-gray-500">
                    {{ $t('medical-supplies.our-products.incontinence.title[0]') }}
                  </span>
                  <span>
                    {{ $t('medical-supplies.our-products.incontinence.title[1]') }}
                  </span>
                </h3>
                <div class="space-y-4">
                  <p class="text-xl text-brand-main-text">
                    {{ $t('medical-supplies.our-products.incontinence.paragraph[0]') }}
                  </p>
                  <p class="text-xl text-brand-main-text">
                    {{ $t('medical-supplies.our-products.incontinence.paragraph[1]') }}
                  </p>
                </div>
                <div class="mt-4 w-max self-center">
                  <BaseUiAction href="https://goldengatemedicalsupply.com/pages/contact-us" :new-page="true" class="p-2">{{ $t('medical-supplies.our-products.button.contact') }}</BaseUiAction>
                </div>
              </div>
              <div class="sm:p-4">
                <NuxtImg src="/images/pages/medical-supplies/incontinence.jpg" quality="60" format="webp,avif" class="rounded-xl shadow-primary" :title="$t('medical-supplies.our-products.incontinence.alt-title')" :alt="$t('medical-supplies.our-products.incontinence.alt-title')" loading="lazy" height="375" width="375" placeholder />
              </div>
            </li>
            <li class="flex flex-col-reverse gap-8 md:flex-row justify-center max-md:items-center">
              <div class="md:w-1/2 flex flex-col">
                <h3 class="text-xl font-bold text-brand-medical-primary flex flex-col mb-4 text-center">
                  <span class="text-gray-500">
                    {{ $t('medical-supplies.our-products.urology.title[0]') }}
                  </span>
                  <span>
                    {{ $t('medical-supplies.our-products.urology.title[1]') }}
                  </span>
                </h3>
                <div class="space-y-4">
                  <p class="text-xl text-brand-main-text">
                    {{ $t('medical-supplies.our-products.urology.paragraph[0]') }}
                  </p>
                  <p class="text-xl text-brand-main-text">
                    {{ $t('medical-supplies.our-products.urology.paragraph[1]') }}
                  </p>
                </div>
                <div class="mt-4 w-max self-center">
                  <BaseUiAction href="https://goldengatemedicalsupply.com/pages/contact-us" :new-page="true" class="p-2">{{ $t('medical-supplies.our-products.button.contact') }}</BaseUiAction>
                </div>
              </div>
              <div class="sm:p-4">
                <NuxtImg src="/images/pages/medical-supplies/urology.jpg" quality="60" format="webp,avif" class="rounded-xl shadow-primary" :title="$t('medical-supplies.our-products.urology.alt-title')" :alt="$t('medical-supplies.our-products.urology.alt-title')" loading="lazy" height="375" width="375" placeholder />
              </div>
            </li>
          </ul>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>
    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" bg="default" class="cv-auto">
        <BaseLayoutPageContainer class="bg-brand-medical-primary rounded-lg shadow-primary">
          <h2 class="text-3xl font-bold text-white text-center pt-8">{{ $t('medical-supplies.insurance-information.title') }}</h2>
          <div  class="flex flex-col lg:flex-row gap-8 mb-8 px-3 sm:px-6 lg:px-8 py-8">
            <div class="lg:w-1/2">
              <h3 class="text-2xl font-bold text-white mb-6">{{ $t('medical-supplies.insurance-information.faqs.title') }}</h3>
              <ul class="space-y-4">
                <li>
                  <LazyBaseInteractiveAccordionButton
                    id="insurance"
                    :active-id="activeAccordionId"
                    :label="$t('medical-supplies.insurance-information.faqs.insurances.label')"
                    :main-class="`bg-gray-200 rounded-lg overflow-hidden group ${activeAccordionId !== 'insurance' ? 'hover:font-extrabold hover:bg-gray-300' : ''}`"
                    :button-class="`px-4 py-2 w-full text-left ${activeAccordionId === 'insurance' ? 'border-b border-b-black' : ''}`"
                    :content-class="`bg-gray-200 px-4 py-2 ${activeAccordionId !== 'insurance' ? 'group-hover:bg-gray-300' : ''}`"
                    @update:active-id="updateId">
                      <p class="text-xl text-brand-main-text">
                        {{ $t('medical-supplies.insurance-information.faqs.insurances.paragraph[0]') }} <a href="tel:719-569-7361" class="link">{{ $t('medical-supplies.insurance-information.faqs.insurances.link[0]') }}</a> {{ $t('medical-supplies.insurance-information.faqs.insurances.paragraph[1]') }} <a href="mailto:customersupport@goldengatemedicalsupply.com" class="link">{{ $t('medical-supplies.insurance-information.faqs.insurances.link[1]') }}</a>.
                      </p>
                      <ul class="list-disc list-inside ml-4 text-xl text-brand-main-text">
                        <li>
                          Aetna
                        </li>
                        <li>
                          Blue Cross Blue Shield (Anthem)
                        </li>
                        <li>Cigna</li>
                        <li>
                          Health First Colorado (Medicaid)
                        </li>
                        <li>
                          Humana
                        </li>
                        <li>
                          Medicare
                        </li>
                        <li>
                          United Healthcare
                        </li>
                      </ul>
                  </LazyBaseInteractiveAccordionButton>
                </li>
                <li>
                  <LazyBaseInteractiveAccordionButton
                    id="coverage"
                    :active-id="activeAccordionId"
                    :label="$t('medical-supplies.insurance-information.faqs.coverage.label')"
                    :main-class="`bg-gray-200 rounded-lg overflow-hidden group ${activeAccordionId !== 'coverage' ? 'hover:font-extrabold hover:bg-gray-300' : ''}`"
                    :button-class="`px-4 py-2 w-full text-left ${activeAccordionId === 'coverage' ? 'border-b border-b-black' : ''}`"
                    :content-class="`bg-gray-200 px-4 py-2 ${activeAccordionId !== 'coverage' ? 'group-hover:bg-gray-300' : ''}`"
                    @update:active-id="updateId">
                      <p class="text-xl text-brand-main-text">
                        {{ $t('medical-supplies.insurance-information.faqs.coverage.paragraph') }}
                      </p>
                  </LazyBaseInteractiveAccordionButton>
                </li>
                <li>
                  <LazyBaseInteractiveAccordionButton
                    id="paperwork"
                    :active-id="activeAccordionId"
                    :label="$t('medical-supplies.insurance-information.faqs.how-to-request.label')"
                    :main-class="`bg-gray-200 rounded-lg overflow-hidden group ${activeAccordionId !== 'paperwork' ? 'hover:font-extrabold hover:bg-gray-300' : ''}`"
                    :button-class="`px-4 py-2 w-full text-left ${activeAccordionId === 'paperwork' ? 'border-b border-b-black' : ''}`"
                    :content-class="`bg-gray-200 px-4 py-2 ${activeAccordionId !== 'paperwork' ? 'group-hover:bg-gray-300' : ''}`"
                    @update:active-id="updateId">
                      <p class="text-xl text-brand-main-text">
                        {{ $t('medical-supplies.insurance-information.faqs.how-to-request.paragraph') }}
                      </p>
                  </LazyBaseInteractiveAccordionButton>
                </li>
                <li>
                  <LazyBaseInteractiveAccordionButton
                    id="dme"
                    :active-id="activeAccordionId"
                    :label="$t('medical-supplies.insurance-information.faqs.medicare.label')"
                    :main-class="`bg-gray-200 rounded-lg overflow-hidden group ${activeAccordionId !== 'dme' ? 'hover:font-extrabold hover:bg-gray-300' : ''}`"
                    :button-class="`px-4 py-2 w-full text-left ${activeAccordionId === 'dme' ? 'border-b border-b-black' : ''}`"
                    :content-class="`bg-gray-200 px-4 py-2 ${activeAccordionId !== 'dme' ? 'group-hover:bg-gray-300' : ''}`"
                    @update:active-id="updateId">
                      <ul class="list-disc list-inside ml-4 text-xl text-brand-main-text">
                        <li v-for="definition in $tm('medical-supplies.insurance-information.faqs.medicare.definition')" :key="definition">
                          {{  $rt(definition) }}
                        </li>
                      </ul>
                  </LazyBaseInteractiveAccordionButton>
                </li>
                <li>
                  <LazyBaseInteractiveAccordionButton
                    id="repairs"
                    :active-id="activeAccordionId"
                    :label="$t('medical-supplies.insurance-information.faqs.repairs.label')"
                    :main-class="`bg-gray-200 rounded-lg overflow-hidden group ${activeAccordionId !== 'repairs' ? 'hover:font-extrabold hover:bg-gray-300' : ''}`"
                    :button-class="`px-4 py-2 w-full text-left ${activeAccordionId === 'repairs' ? 'border-b border-b-black' : ''}`"
                    :content-class="`bg-gray-200 px-4 py-2 ${activeAccordionId !== 'repairs' ? 'group-hover:bg-gray-300' : ''}`"
                    @update:active-id="updateId">
                      <p class="text-xl text-brand-main-text">
                        {{ $t('medical-supplies.insurance-information.faqs.repairs.paragraph') }}
                      </p>
                  </LazyBaseInteractiveAccordionButton>
                </li>
                <li>
                  <LazyBaseInteractiveAccordionButton
                    id="out-of-pocket"
                    :active-id="activeAccordionId"
                    :label="$t('medical-supplies.insurance-information.faqs.out-of-pocket.label')"
                    :main-class="`bg-gray-200 rounded-lg overflow-hidden group ${activeAccordionId !== 'out-of-pocket' ? 'hover:font-extrabold hover:bg-gray-300' : ''}`"
                    :button-class="`px-4 py-2 w-full text-left ${activeAccordionId === 'out-of-pocket' ? 'border-b border-b-black' : ''}`"
                    :content-class="`bg-gray-200 px-4 py-2 ${activeAccordionId !== 'out-of-pocket' ? 'group-hover:bg-gray-300' : ''}`"
                    @update:active-id="updateId">
                      <p class="text-xl text-brand-main-text">
                        {{ $t('medical-supplies.insurance-information.faqs.out-of-pocket.paragraph') }}
                      </p>
                  </LazyBaseInteractiveAccordionButton>
                </li>
              </ul>
            </div>
            <div class="lg:w-1/2">
              <h3 class="text-2xl font-bold text-white mb-6">
                {{ $t('medical-supplies.insurance-information.check-eligibility.title') }}
              </h3>
              <ul class="space-y-4">
                <li class="pl-8 relative">
                  <BaseIcon name="material-symbols:bookmark-check-rounded" class="text-white absolute left-0" />
                  <p class="text-xl text-white">
                    {{ $t('medical-supplies.insurance-information.check-eligibility.list[0]') }} <span class="link-light">719-696-8548</span> {{ $t('medical-supplies.insurance-information.check-eligibility.list[1]') }}
                  </p>
                </li>
                <li class="pl-8 relative">
                  <BaseIcon name="material-symbols:bookmark-check-rounded" class="text-white absolute left-0" />
                  <p class="text-xl text-white">
                    {{ $t('medical-supplies.insurance-information.check-eligibility.list[2]') }} <a href="https://maps.app.goo.gl/L4tgtVzH67ZwhLie6" target="_blank" rel="noopener" class="link-light">612 S. Union Ave., Pueblo CO 81004</a>.
                  </p>
                </li>
              </ul>
              <BaseUiAction href="https://goldengatemedicalsupply.com/pages/contact-us" variant="blank" new-page class="ml-8 text-white font-extrabold underline text-xl mt-8 inline-block hover:text-brand-link-hover">{{ $t('medical-supplies.insurance-information.check-eligibility.button') }}</BaseUiAction>
            </div>
          </div>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>
  </div>
</template>

<script lang="ts" setup>
import MedSupplyLink from '../components/MedSupplyLink.vue';

definePageMeta({
  title: 'Medical Supplies & Equipment',
  breadcrumbLabel: 'Medical Supply'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Medical Supplies & Equipment',
  ogTitle: 'Medical Supplies & Equipment',
  description: 'Shop durable medical equipment and medical supplies at Golden Gate Manor Inc. Serving Pueblo and Southern Colorado with reliable healthcare solutions.',
  ogDescription: 'Shop durable medical equipment and medical supplies at Golden Gate Manor Inc. Serving Pueblo and Southern Colorado with reliable healthcare solutions.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-medical-supply.png`,
  twitterTitle: 'Medical Supplies & Equipment',
  twitterDescription: 'Shop durable medical equipment and medical supplies at Golden Gate Manor Inc. Serving Pueblo and Southern Colorado with reliable healthcare solutions.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-medical-supply.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
  name: 'MedicalSuppliesPage'
})

const activeAccordionId = ref<string>('');
const updateId = (val: string) => activeAccordionId.value = val
</script>

<style>

</style>