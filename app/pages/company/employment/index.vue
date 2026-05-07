<template>
  <div>
    <!-- Top Page Hero Shots -->
    <BaseLayoutPageHeroSection src="/images/pages/employment/employment-hero.webp" styling="max-sm:w-full" alt="Image of someone looking at jobs in a newspaper" title="Image of someone looking at jobs in a newspaper" loading="eager">
      <BaseInteractiveFloatingCard styling="xs:absolute max-xs:w-full xs:top-8 xs:left-8">
        <h1 class="text-3xl font-extrabold">{{ $t('company.employment.hero-card.title')}}</h1>
        <p class="mt-8 font-bold">{{ $t('company.employment.hero-card.ulist.intro') }}</p>
        <ul class="">
          <li v-for="item in $tm('company.employment.hero-card.ulist.items')" :key="item" class="flex items-center gap-2">
            <BaseIcon name="material-symbols:fitbit-check-small-rounded" color="text-white" size="size-8" class="shrink-0" />
            {{ $rt(item)}}
          </li>
        </ul>
        <BaseUiAction :to="$localePath('/company/employment/apply')" class="mt-4 p-4">{{ $t('company.employment.hero-card.button') }}</BaseUiAction>
      </BaseInteractiveFloatingCard>
    </BaseLayoutPageHeroSection>

    <!-- Job Opportunities -->
     <DeferRender when="visible">
       <BaseLayoutPageSection margin="default" class="cv-auto">
         <h2 class="text-2xl text-center font-bold text-brand-primary">{{ $t('company.employment.job-opportunities.title')}}</h2>
         <div class="flex flex-col items-center mt-8 gap-8 md:grid md:grid-cols-2 md:w-max md:mx-auto lg:flex lg:flex-row lg:flex-wrap lg:w-full lg:justify-center">
           <LazyBaseInteractiveFlipCard v-for="(card, i) in jobOpportunityCards" :key="`opportunity-card-${i}`" :src="opportunityCardMeta[i]?.src">
             <template #front>
               <div class="flex flex-col justify-between h-full font-extrabold">
                   <h2 v-if="card.title" class="text-2xl">{{ $rt(card.title[0] || '') }}</h2>
                   <p>{{ $rt(card.description)}}</p>
               </div>
             </template>
             <template #back>
               <h2 class="text-2xl font-extrabold pb-4 border-b border-b-black">{{ $rt(card.title[1] || '') }}</h2>
               <div class="flex flex-col h-full justify-between">
                 <div>
                   <BaseLayoutPageListItem v-for="position in card.positions" :key="$rt(position.department)" :title="$rt(position.department)" has-left-border small-border small-text class="mt-4">
                     <ul>
                       <li v-for="(job, j) in position.jobs" :key="job">{{ $rt(job) }} <button type="button" class="link" :data-select="`${opportunityCardDataSelects[i]?.[j] ?? 'invalid'}`" @click="openModal">{{ $t('company.employment.job-opportunities.button.job-description') }}</button></li>
                     </ul>
                   </BaseLayoutPageListItem>
                 </div>
                 <div class="mt-4 self-center">
                   <BaseUiAction :to="$localePath(`/company/employment/apply?select=${opportunityCardMeta[i]?.selectValue}`)" class="py-2 px-4">{{ $t('company.employment.job-opportunities.button.apply-now')}}</BaseUiAction>
                 </div>
               </div>
             </template>
           </LazyBaseInteractiveFlipCard>
         </div>
       </BaseLayoutPageSection>
     </DeferRender>

     <!-- Physical Application -->
     <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" bg="alt">
        <BaseLayoutPageContainer class="space-y-8">
          <section class="space-y-2">
            <h2 class="text-2xl font-bold text-brand-primary">{{ $t('company.employment.physical-application.title') }}</h2>
            <p class="text-xl text-brand-main-text">
              {{ $t('company.employment.physical-application.ulist.intro') }}
            </p>
            <ul class="text-xl text-brand-main-text ml-8 list-disc">
              <li v-for="(item, i) in $tm('company.employment.physical-application.ulist.items')" :key="item[0]">
                <p v-if="i == 0">
                  {{ $rt(item[0]) }} <a href="https://maps.app.goo.gl/kEzjKfbBfLnWwRRTA" class="link">612 S. Union Ave., Pueblo, CO 81004</a>, {{ $rt(item[1])}}
                </p>
                <p v-else>
                  {{ $rt(item[0]) }} <a href="mailto:apply@goldengatemanor.com" class="link">apply@goldengatemanor.com</a> {{ $rt(item[1])}}
                </p>
              </li>
            </ul>
            <p class="text-xl text-brand-main-text">
              {{ $t('company.employment.physical-application.paragraph') }}
            </p>
            <div>
              <div class="flex gap-4 flex-wrap justify-center !my-8">
                <LazySupportCenterTile href="/pdfs/applications/driver-application.pdf" target="_blank" rel="noopener noreferrer" name="material-symbols:directions-car" :title="$t('company.employment.physical-application.cards[0]')" class="hover:scale-105 transition-transform ease-in-out duration-500"/>
                <LazySupportCenterTile href="/pdfs/applications/general-application.pdf" target="_blank" rel="noopener noreferrer" name="material-symbols:work" :title="$t('company.employment.physical-application.cards[1]')" class="hover:scale-105 transition-transform ease-in-out duration-500"/>
                <LazySupportCenterTile href="/pdfs/applications/house-application.pdf" target="_blank" rel="noopener noreferrer" name="medical-icon:i-care-staff-area" :title="$t('company.employment.physical-application.cards[2]')" class="hover:scale-105 transition-transform ease-in-out duration-500"/>
              </div>
              <PleaseNote>
                {{ $t('company.employment.physical-application.please-note.paragraph[0]') }}
                <BaseUiAction href="https://maps.app.goo.gl/1CbsxZVTiVfcmWTAA" new-page variant="blank" class="link inline-block">827 W 4th St, Pueblo, CO 81003</BaseUiAction>, 
                {{ $t('company.employment.physical-application.please-note.paragraph[1]') }}
                <BaseUiAction href="https://mydmv.colorado.gov/_/" new-page variant="blank" class="link inline-block">{{ $t('company.employment.physical-application.please-note.link') }}</BaseUiAction> 
                {{ $t('company.employment.physical-application.please-note.paragraph[2]') }}
              </PleaseNote>
            </div>
          </section>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>

    <!-- CTA Section -->
     <DeferRender when="visible">
       <BaseLayoutPageCTA 
         :title="$t('company.employment.cta.title')"
         :description="$t('company.employment.cta.description')"
         :to="$localePath('/company/employment/apply?select=general')"
         :button-label="$t('company.employment.cta.button-label')"
       />
     </DeferRender>

    <!-- About Us Section -->
    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default">
        <BaseLayoutPageContainer class="space-y-8">
          <section class="space-y-1">
            <h2 class="text-2xl font-bold text-brand-primary">{{ $t('company.employment.about-us.top.title') }}</h2>
            <p class="text-xl text-brand-main-text">{{ $t('company.employment.about-us.top.motto') }}</p>
            <p class="text-xl text-brand-main-text">
              {{ $t('company.employment.about-us.top.paragraph') }}
            </p>
          </section>
          <section class="space-y-1">
            <h2 class="text-2xl font-bold text-brand-primary">{{ $t('company.employment.about-us.our-team.title') }}</h2>
            <p class="text-xl text-brand-main-text">
              {{ $t('company.employment.about-us.our-team.paragraph') }}
            </p>
          </section>
          <BaseUiAction :to="$localePath('/company/about-us')" class="!mt-4" styling="px-4 py-2">{{ $t('company.employment.about-us.button') }}</BaseUiAction>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>

    <LazyEmploymentModal v-model="modalOpen" :modal-content="modalContent" @close="clearModalContent"/>
  </div>
</template>

<script setup lang='ts'>
import { BaseLayoutPageCTA, BaseLayoutPageSection, BaseUiAction } from '#components'
import type { JobDescription, JobDescriptionFetch } from '../../../models/JobDescription'

const modalOpen = ref<boolean>(false)
const modalContent = ref<JobDescription | null>(null)
const loadingModal = ref<boolean>(false);

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

const openModal = async (event: Event) => {
  try {
    loadingModal.value = true;

    if (event.target) {
      const target = event.target as HTMLElement;
      const select = target.dataset.select

      if (!select) {
        console.error('No data-select attribute found')
        return
      }

      const modalFetch = await $fetch(`/api/jobs/${select}`, {
        baseURL: useRuntimeConfig().public.useLocalApi ? 'http://127.0.0.1:4000' : 'https://api.goldengatemanor.com',
      }) as JobDescriptionFetch;

      loadingModal.value = false;

      document.body.classList.add('no-scroll');

      if(modalFetch.success) {
        modalContent.value = modalFetch.data;
        modalOpen.value = true;
      }
    }
  } catch (error) {
    console.error('Error fetching job data:', error)
  }
}

const clearModalContent = () => {
  modalContent.value = null;
}

type OpportunityCard = {
  title: string[];
  description: string;
  positions: {
    department: string;
    jobs: string;
  }[];
}

type OpportunityCardMeta = {
  src: string;
  selectValue:string;
}

const jobOpportunityCards = $tm('company.employment.job-opportunities.cards') as OpportunityCard[]
const opportunityCardMeta: OpportunityCardMeta[] = [
  {
    src: '/images/pages/employment/ggmt-flipcard.jpg',
    selectValue: "transportation_general"
  },
  {
    src: '/images/pages/employment/ggmal-flipcard.jpg',
    selectValue: "al_general"
  },
  {
    src: '/images/pages/employment/ggms-flipcard.jpg',
    selectValue: "ms_general"
  },
  {
    src: '/images/pages/employment/ggmc-flipcard.jpg',
    selectValue: "gs_general"
  }
]
const opportunityCardDataSelects: string[][] = [
  ['city_cab-dispatch', 'city_cab-driver', 'city_cab-admin_assistant'],
  ['acf-qmap', 'acf-pcp'],
  ['medical_supply-dme_specialist', 'medical_supply-deliver_tech', 'medical_supply-inventory_tech'],
  ['gas_station-manager', 'gas_station-assistant_manager', 'gas_station-attendant']
]
</script>

<style></style>