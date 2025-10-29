<template>
  <div>
    <!-- Top Page Hero Shots -->
    <BaseLayoutPageHeroSection src="/images/pages/employment/employment-hero.webp" styling="max-sm:w-full" alt="Image of someone looking at jobs in a newspaper" title="Image of someone looking at jobs in a newspaper" loading="eager">
      <BaseInteractiveFloatingCard styling="xs:absolute max-xs:w-full xs:top-8 xs:left-8">
        <h1 class="text-3xl font-extrabold">Looking for employment?</h1>
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
     <DeferRender when="visible">
       <BaseLayoutPageSection margin="default" class="cv-auto">
         <h2 class="text-2xl text-center font-bold text-brand-primary">Job Opportunities</h2>
         <div class="flex flex-col items-center mt-8 gap-8 md:grid md:grid-cols-2 md:w-max md:mx-auto lg:flex lg:flex-row lg:flex-wrap lg:w-full lg:justify-center">
           <LazyBaseInteractiveFlipCard src="/images/pages/employment/ggmt-flipcard.jpg">
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
                       <li>Dispatcher — <button type="button" class="link" data-select="city_cab-dispatch" @click="openModal">Job Description</button></li>
                       <li>Driver — <button type="button" class="link" data-select="city_cab-driver" @click="openModal">Job Description</button></li>
                       <li>Admin Asst. — <button type="button" class="link" data-select="city_cab-admin_assistant" @click="openModal">Job Description</button></li>
                     </ul>
                   </BaseLayoutPageListItem>
                   <BaseLayoutPageListItem title="Non-Emergency" has-left-border small-border small-text class="mt-4">
                     <ul>
                       <li>Customer Service — <button type="button" class="link" data-select="ggmt-csr" @click="openModal">Job Description</button></li>
                       <li>Driver — <button type="button" class="link" data-select="ggmt-driver" @click="openModal">Job Description</button></li>
                     </ul>
                   </BaseLayoutPageListItem>
                 </div>
                 <div class="mt-4 self-center">
                   <BaseUiAction to="/company/employment/apply?select=transportation_general" class="py-2 px-4">Apply Now</BaseUiAction>
                 </div>
               </div>
             </template>
           </LazyBaseInteractiveFlipCard>
           <LazyBaseInteractiveFlipCard src="/images/pages/employment/ggmal-flipcard.jpg">
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
                           QMAP — <button type="button" class="link" data-select="acf-qmap" @click="openModal">Job Description</button>
                         </li>
                         <li>PCP — <button type="button" class="link" data-select="acf-pcp" @click="openModal">Job Description</button></li>
                       </ul>
                     </BaseLayoutPageListItem>
                   </div>
                   <div class="mt-4 self-center">
                     <BaseUiAction href="/company/employment/apply?select=al_general" class="py-2 px-4">Apply Now</BaseUiAction>
                   </div>
                 </div>
               </div>
             </template>
           </LazyBaseInteractiveFlipCard>
           <LazyBaseInteractiveFlipCard src="/images/pages/employment/ggms-flipcard.jpg">
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
                         <li>DME Specialist — <button type="button" class="link" data-select="medical_supply-dme_specialist" @click="openModal">Job Description</button>
                         </li>
                         <li>Delivery Driver — <button type="button" class="link" data-select="medical_supply-deliver_tech" @click="openModal">Job Description</button>
                         </li>
                         <li>Inventory Tech. — <button type="button" class="link" data-select="medical_supply-inventory_tech" @click="openModal">Job Description</button>
                         </li>
                       </ul>
                     </BaseLayoutPageListItem>
                   </div>
                   <div class="mt-4 self-center">
                     <BaseUiAction href="/company/employment/apply?select=ms_general" class="py-2 px-4">Apply Now</BaseUiAction>
                   </div>
                 </div>
               </div>
             </template>
           </LazyBaseInteractiveFlipCard>
           <LazyBaseInteractiveFlipCard src="/images/pages/employment/ggmc-flipcard.jpg">
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
                         <li>Manager — <button type="button" class="link" data-select="gas_station-manager" @click="openModal">Job Description</button></li>
                         <li>Assistant Manager — <button type="button" class="link" data-select="gas_station-assistant_manager" @click="openModal">Job Description</button></li>
                         <li>Attendant — <button type="button" class="link" data-select="gas_station-attendant" @click="openModal">Job Description</button></li>
                       </ul>
                     </BaseLayoutPageListItem>
                   </div>
                   <div class="mt-4 self-center">
                     <BaseUiAction href="/company/employment/apply?select=gs_general" class="py-2 px-4">Apply Now</BaseUiAction>
                   </div>
                 </div>
               </div>
             </template>
           </LazyBaseInteractiveFlipCard>
         </div>
       </BaseLayoutPageSection>
     </DeferRender>

     <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" bg="alt">
        <BaseLayoutPageContainer class="space-y-8">
          <section class="space-y-2">
            <h2 class="text-2xl font-bold text-brand-primary">Prefer to fill out a physical application?</h2>
            <p class="text-xl text-brand-main-text">
              Sometimes it's easier to complete an application by hand, or type it out, and drop it off in person or send it via email. 
              If that's your preferred method of applying, please use the links below to download and fill out the application. Once complete, you can:
            </p>
            <ul class="text-xl text-brand-main-text ml-8 list-disc">
              <li>
                Bring it to our Administration Office at <a href="https://maps.app.goo.gl/kEzjKfbBfLnWwRRTA" class="link">612 S. Union Ave., Pueblo, CO 81004</a>, or
              </li>
              <li>
                Email it to <a href="mailto:apply@goldengatemanor.com" class="link">apply@goldengatemanor.com</a> (just put the subject line as your first and last name along with application)
              </li>
            </ul>
            <p class="text-xl text-brand-main-text">
              If you are applying for a driver position, please be sure to use the driver-specific application and please make sure to read the note below the application pdf links. Thanks for your interesting in joining the Golden Gate Manor Inc. Team!
            </p>
            <div>
              <div class="flex gap-4 flex-wrap justify-center !my-8">
                <LazySupportCenterTile href="/pdfs/applications/driver-application.pdf" target="_blank" rel="noopener noreferrer" name="material-symbols:directions-car" title="Driver Application"/>
                <LazySupportCenterTile href="/pdfs/applications/general-application.pdf" target="_blank" rel="noopener noreferrer" name="material-symbols:work" title="General Application"/>
                <LazySupportCenterTile href="/pdfs/applications/house-application.pdf" target="_blank" rel="noopener noreferrer" name="medical-icon:i-care-staff-area" title="Assisted Living Application"/>
              </div>
              <PleaseNote>If the application being applied for is a driving position, a Motor Vehicle Record (MVR) from the last 30 days is required. A non-certified MVR showing a 7-year driving history can be obtained from the DMV at <a href="https://maps.app.goo.gl/1CbsxZVTiVfcmWTAA" target="_blank" rel="noopener noreferrer" class="link">827 W 4th St, Pueblo, CO 81003</a>, or online using the <a href="https://mydmv.colorado.gov/_/" target="_blank" rel="noopener noreferrer" class="link">DMV - MVR Online Form</a> and request a driving record. The MVR must be brought before an interview will be considered.</PleaseNote>
            </div>
          </section>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>

    <!-- CTA Section -->
     <DeferRender when="visible">
       <BaseLayoutPageCTA 
         title="Explore Career Opportunities"
         description="We're always on the lookout for passionate individuals to join our diverse team! As our company expands, new opportunities arise across our different businesses. Discover where you can make an impact!"
         to="/company/employment/apply?select=general"
         button-label="Join Our Team"
       />
     </DeferRender>

    <!-- About Us Section -->
    <DeferRender when="visible">
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
    </DeferRender>

    <LazyEmploymentModal v-model="modalOpen" :modal-content="modalContent" @close="clearModalContent"/>
  </div>
</template>

<script setup lang='ts'>
import { BaseLayoutPageCTA, BaseLayoutPageSection, BaseUiAction } from '#components'
import type { JobDescription, JobDescriptionFetch } from '../../../models/JobDescription.js'

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
      const select = target.getAttribute('data-select')

      if (!select) {
        console.error('No data-select attribute found')
        return
      }

      const modalFetch = await $fetch(`/api/jobs/${select}`, {
        baseURL: 'https://api.goldengatemanor.com/'
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
</script>

<style></style>