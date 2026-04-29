<template>
  <div>
    <!-- Top Page -->
    <BaseLayoutPageBanner src="/images/pages/nemt/car-lineup.jpg" :alt="$t('nemt.banner.alt-title')" image-height="464" image-width="935" :title="$t('nemt.banner.alt-title')" aspect-ratio="aspect-[2/1]"/>
    <BaseLayoutPageSection margin="top">
      <BaseLayoutPageContainer>
        <div class="md:flex md:items-center gap-8">
          <div class="flex md:flex-col flex-col md:w-1/2 md:space-y-4">
            <div>
              <h2 class="md:text-2xl font-bold text-brand-primary">{{ $t('nemt.top.title') }}</h2>
              <p class="text-xl text-brand-main-text">
                {{ $t('nemt.top.paragraph') }}
              </p>
            </div>
            <table class="w-full border-collapse bg-[#c6d5e4] mb-4 md:my-8 md:mb-0">
              <tbody>
                <tr class="nemt-row">
                  <th colspan="2" class="p-4 text-center border-black border-2">{{ $t('nemt.top.table.title') }}</th>
                </tr>
                <tr class="nemt-row">
                  <td class="p-4 text-center border-black border-2">{{ $t('nemt.top.table.rows[0][0]') }}</td>
                  <td class="p-4 text-center border-black border-2">{{ $t('nemt.top.table.rows[0][1]') }}</td>
                </tr>
                <tr class="nemt-row">
                  <td class="p-4 text-center border-black border-2">{{ $t('nemt.top.table.rows[1][0]') }}</td>
                  <td class="p-4 text-center border-black border-2">{{ $t('nemt.top.table.rows[1][1]') }}</td>
                </tr>
                <tr class="nemt-row">
                  <td class="p-4 text-center border-black border-2">{{ $t('nemt.top.table.rows[2][0]') }}</td>
                  <td class="p-4 text-center border-black border-2 font-extrabold">
                    <div class="flex items-center justify-center">
                      <BaseIcon name="proicons:checkmark-starburst" color="black" />
                      {{ $t('nemt.top.table.rows[2][1]') }}
                    </div>
                  </td>
                </tr>
                <tr class="nemt-row">
                  <td colspan="2" class="p-4 text-center border-black border-2">{{ $t('nemt.top.table.rows[3][0]') }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="md:w-1/2 md:my-0 my-4">
            <BaseYoutubeLite
              video-id="fJ8_uvrsYXo"
              :title="$t('nemt.top.video.title')"
              sizes="xl:700px"
              image-width="720"
              image-height="405"
              poster="max"            
              :eager-on-view="false" 
            />
          </div>
        </div>
        <div class="mt-4 w-full">
          <BaseUiAction
            variant="secondary" 
            :title="$t('components.new-tab-title')"
            href="/pdfs/nemt/nemt-app&medical-certificate-of-trans-services.pdf" target="_blank" rel="noopener noreferrer"
            class="group text-xs w-full md:w-[calc(50%-1rem)]"
            styling="p-2 sm:p-4 flex flex-col md:flex-row gap-2 items-center justify-center">
              <BaseIcon name="uiw:file-pdf" class="group-hover:text-brand-secondary transition-colors duration-500 ease-in-out" size="size-5"/> 
              <span class="inline-block">{{ $t('nemt.top.pdf.label') }}</span>
          </BaseUiAction>
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>

    <BaseLayoutPageCTA margin="default" :has-button="false" :centered-text="false" class="overflow-hidden">
      <BaseLayoutPageContainer>
        <div class="flex flex-col md:flex-row items-center justify-center gap-8">
          <h2 class="text-2xl font-bold mb-6 md:hidden">
              Coming Soon: Expanding Into the San Luis Valley
          </h2>
          <div class="md:flex-shrink-0">
            <NuxtImg 
              src="/images/logos/golden-gate-by-SLV.png" 
              alt="Golden Gate Manor Inc. by SLV Transportation Red Willows"
              class="max-md:max-h-[200px] md:max-w-[300px] lg:max-w-[350px] object-contain opacity-90"
              loading="lazy"
              width="350"
              height="333"
            />
          </div>
          <div>
            <h2 class="text-2xl font-bold mb-6 max-md:hidden">
              Coming Soon: Expanding Into the San Luis Valley
            </h2>
            <p class="text-lg">
              Golden Gate Manor Inc. is expanding its non-emergency medical transportation services into the San Luis Valley through SLV Transportation Red Willows.
            </p>
    
            <p class="text-lg mt-4">
              With an established fleet and a strong local presence in Alamosa, SLV Transportation has been a trusted provider in the region. This expansion allows us to build on that foundation while introducing additional resources, coordination, and support.
            </p>
    
            <p class="text-lg mt-4">
              Our goal is simple: to improve access to reliable transportation for individuals who depend on it—while maintaining the same trusted service the community already knows.
            </p>

            <div class="mt-6 max-md:justify-self-center">
              <BaseUiAction to="/resources/schedule-a-ride" variant="secondary" styling="px-6 py-3">
                Schedule a Ride
              </BaseUiAction>
            </div>
          </div>
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageCTA>
    
    <!-- Transportation Information -->
     <DeferRender when="visible">
       <BaseLayoutPageSection margin="default" class="cv-auto">
         <BaseLayoutPageContainer class="bg-brand-primary rounded-lg shadow-primary">
             <h2 class="text-3xl font-bold text-white text-center pt-8">{{ $t('nemt.transportation-information.title') }}</h2>
             <div  class="flex flex-col lg:flex-row gap-8 mb-8 border-b-2 border-b-white px-3 sm:px-6 lg:px-8 py-8">
               <div class="lg:w-1/2">
                 <h3 class="text-2xl font-bold text-white mb-6">{{ $t('nemt.transportation-information.faqs.title') }}</h3>
                 <ul class="space-y-4">
                   <li>
                     <LazyBaseInteractiveAccordionButton
                       id="eligibility"
                       :active-id="activeAccordionId"
                       :label="$t('nemt.transportation-information.faqs.items.eligibility.label')"
                       :main-class="`bg-gray-200 rounded-lg overflow-hidden group ${activeAccordionId !== 'eligibility' ? 'hover:font-extrabold hover:bg-gray-300' : ''}`"
                       :button-class="`px-4 py-2 w-full text-left ${activeAccordionId === 'eligibility' ? 'border-b border-b-black' : ''}`"
                       :content-class="`bg-gray-200 px-4 py-2 ${activeAccordionId !== 'eligibility' ? 'group-hover:bg-gray-300' : ''}`"
                       @update:active-id="updateId">
                         <p class="text-xl text-brand-main-text">
                           {{ $t('nemt.transportation-information.faqs.items.eligibility.paragraph') }}
                         </p>
                     </LazyBaseInteractiveAccordionButton>
                   </li>
                   <li>
                     <LazyBaseInteractiveAccordionButton 
                       id="how-to-schedule" 
                       :active-id="activeAccordionId"
                       :label="$t('nemt.transportation-information.faqs.items.how-to-schedule.label')"
                       :main-class="`bg-gray-200 rounded-lg overflow-hidden group ${activeAccordionId !== 'how-to-schedule' ? 'hover:font-extrabold hover:bg-gray-300' : ''}`"
                       :button-class="`px-4 py-2 w-full text-left ${activeAccordionId === 'how-to-schedule' ? 'border-b border-b-black' : ''}`"
                       :content-class="`bg-gray-200 px-4 py-2 ${activeAccordionId !== 'how-to-schedule' ? 'group-hover:bg-gray-300' : ''}`"
                       @update:active-id="updateId">
                       <div class="space-y-4">
                         <p class="text-xl text-brand-main-text">
                           {{ $t('nemt.transportation-information.faqs.items.how-to-schedule.paragraphs[0]') }} 
                           <CallRailLink
                              tel="719-544-3231"
                              display="(719) 544-3231"
                              cls="link"
                              :aria-label="$t('company.csr-phone')"
                            /> 
                            {{ $t('nemt.transportation-information.faqs.items.how-to-schedule.paragraphs[1]') }}
                         </p>
                         <p class="text-xl text-brand-main-text">
                           {{ $t('nemt.transportation-information.faqs.items.how-to-schedule.paragraphs[2]') }} 
                           <CallRailLink
                              tel="719-543-2525"
                              display="(719) 543-2525"
                              cls="link"
                              :aria-label="$t('company.dispatch-phone')"
                            />  
                           {{ $t('nemt.transportation-information.faqs.items.how-to-schedule.paragraphs[3]') }}
                         </p>
                       </div>
                       <BaseUiAction :to="$localePath('/resources/schedule-a-ride')" class="p-2 mb-4 mt-8">
                         {{ $t('nemt.button') }}
                       </BaseUiAction>
                     </LazyBaseInteractiveAccordionButton>
                   </li>
                   <li>
                     <LazyBaseInteractiveAccordionButton 
                       id="how-to-cancel" 
                       :active-id="activeAccordionId"
                       :label="$t('nemt.transportation-information.faqs.items.how-to-cancel.label')"
                       :main-class="`bg-gray-200 rounded-lg overflow-hidden group ${activeAccordionId !== 'how-to-cancel' ? 'hover:font-extrabold hover:bg-gray-300' : ''}`"
                       :button-class="`px-4 py-2 w-full text-left ${activeAccordionId === 'how-to-cancel' ? 'border-b border-b-black' : ''}`"
                       :content-class="`bg-gray-200 px-4 py-2 ${activeAccordionId !== 'how-to-cancel' ? 'group-hover:bg-gray-300' : ''}`"
                       @update:active-id="updateId">
                       <div class="space-y-4">
                         <p class="text-xl text-brand-main-text">
                           {{ $t('nemt.transportation-information.faqs.items.how-to-cancel.paragraphs[0]') }} 
                           <CallRailLink
                              tel="719-544-3231"
                              display="(719) 544-3231"
                              cls="link"
                              :aria-label="$t('company.csr-phone')"
                            />.
                         </p>
                         <p class="text-xl text-brand-main-text">
                           {{ $t('nemt.transportation-information.faqs.items.how-to-cancel.paragraphs[1]') }} 
                           <CallRailLink
                              tel="719-543-2525"
                              display="(719) 543-2525"
                              cls="link"
                              :aria-label="$t('company.dispatch-phone')"
                            />.
                         </p>
                         <p class="text-xl text-brand-main-text">
                           {{ $t('nemt.transportation-information.faqs.items.how-to-cancel.paragraphs[2]') }} 
                           <NuxtLink :to="$localePath('/company/policies/ride-cancellation')" class="link">{{ $t('nemt.transportation-information.faqs.items.how-to-cancel.policy-link') }}</NuxtLink> {{ $t('nemt.transportation-information.faqs.items.how-to-cancel.paragraphs[3]') }}
                         </p>
                       </div>
                     </LazyBaseInteractiveAccordionButton>
                   </li>
                   <li>
                     <LazyBaseInteractiveAccordionButton 
                       id="services-covered" 
                       :active-id="activeAccordionId"
                       :label="$t('nemt.transportation-information.faqs.items.services-covered.label')"
                       :main-class="`bg-gray-200 rounded-lg overflow-hidden group ${activeAccordionId !== 'services-covered' ? 'hover:font-extrabold hover:bg-gray-300' : ''}`"
                       :button-class="`px-4 py-2 w-full text-left ${activeAccordionId === 'services-covered' ? 'border-b border-b-black' : ''}`"
                       :content-class="`bg-gray-200 px-4 py-2 ${activeAccordionId !== 'services-covered' ? 'group-hover:bg-gray-300' : ''}`"
                       @update:active-id="updateId">
                         <p class="text-xl text-brand-main-text">
                           {{ $t('nemt.transportation-information.faqs.items.services-covered.paragraph') }}
                         </p>
                         <BaseUiAction 
                           href="/pdfs/nemt/nemt-app&medical-certificate-of-trans-services.pdf" target="_blank"
                           rel="noopener noreferrer" class="p-2 mb-4 mt-8">
                           {{ $t('nemt.top.pdf.label') }}
                         </BaseUiAction>
                     </LazyBaseInteractiveAccordionButton>
                   </li>
                   <li>
                     <LazyBaseInteractiveAccordionButton 
                       id="client-approval" 
                       :active-id="activeAccordionId"
                       :label="$t('nemt.transportation-information.faqs.items.client-approval.label')"
                       :main-class="`bg-gray-200 rounded-lg overflow-hidden group ${activeAccordionId !== 'client-approval' ? 'hover:font-extrabold hover:bg-gray-300' : ''}`"
                       :button-class="`px-4 py-2 w-full text-left ${activeAccordionId === 'client-approval' ? 'border-b border-b-black' : ''}`"
                       :content-class="`bg-gray-200 px-4 py-2 ${activeAccordionId !== 'client-approval' ? 'group-hover:bg-gray-300' : ''}`"
                       @update:active-id="updateId">
                       <div class="space-y-4">
                         <p class="text-xl text-brand-main-text">
                           {{ $t('nemt.transportation-information.faqs.items.client-approval.paragraphs[0]') }}
                         </p>
                         <p class="text-xl text-brand-main-text">
                           {{ $t('nemt.transportation-information.faqs.items.client-approval.paragraphs[1]') }}
                         </p>
                       </div>
                       <BaseUiAction 
                         href="/pdfs/nemt/nemt-app&medical-certificate-of-trans-services.pdf" target="_blank"
                         rel="noopener noreferrer" class="p-2 mb-4 mt-8">
                         {{ $t('nemt.top.pdf.label') }}
                       </BaseUiAction>
                     </LazyBaseInteractiveAccordionButton>
                   </li>
                   <li>
                     <LazyBaseInteractiveAccordionButton 
                      id="when-to-be-ready" 
                      :active-id="activeAccordionId"
                      :label="$t('nemt.transportation-information.faqs.items.when-to-be-ready.label')"
                      :main-class="`bg-gray-200 rounded-lg overflow-hidden group ${activeAccordionId !== 'when-to-be-ready' ? 'hover:font-extrabold hover:bg-gray-300' : ''}`"
                      :button-class="`px-4 py-2 w-full text-left ${activeAccordionId === 'when-to-be-ready' ? 'border-b border-b-black' : ''}`"
                      :content-class="`bg-gray-200 px-4 py-2 ${activeAccordionId !== 'when-to-be-ready' ? 'group-hover:bg-gray-300' : ''}`"
                       @update:active-id="updateId">
                       <p class="text-xl text-brand-main-text">
                         {{ $t('nemt.transportation-information.faqs.items.when-to-be-ready.paragraph') }}
                       </p>
                     </LazyBaseInteractiveAccordionButton>
                   </li>
                 </ul>
               </div>
               <div class="lg:w-1/2">
                 <h3 class="text-2xl font-bold text-white mb-6">{{ $t('nemt.transportation-information.schedule-help.title') }}</h3>
                 <ul class="space-y-4">
                   <li class="pl-8 relative">
                     <BaseIcon name="material-symbols:bookmark-check-rounded" class="text-white absolute left-0" />
                     <p class="text-xl text-white">
                       {{ $t('nemt.transportation-information.schedule-help.paragraphs[0]') }}
                     </p>
                   </li>
                   <li class="pl-8 relative">
                     <BaseIcon name="material-symbols:bookmark-check-rounded" class="text-white absolute left-0" />
                     <p class="text-xl text-white">
                       {{ $t('nemt.transportation-information.schedule-help.paragraphs[1]') }}
                     </p>
                   </li>
                 </ul>
                 <NuxtLink :to="$localePath('/resources/schedule-a-ride')" class="ml-8 text-white font-extrabold underline text-xl mt-8 inline-block hover:text-brand-link-hover">{{ $t('nemt.button')}}</NuxtLink>
               </div>
             </div>
   
   
           <div class="px-8 pb-8">
             <h2 class="text-3xl font-bold text-white text-center pb-8">
               {{ $t('nemt.transportation-information.availability.title') }}
             </h2>
             <BaseLayoutPageListItem :title="$t('nemt.transportation-information.availability.business-hours.title')" title-class="text-white mb-4 font-extrabold text-2xl" has-left-border class="before:bg-white font-bold text-white lg:ml-8 my-8">
               <div class="flex flex-col space-y-2">
                 <CallRailLink
                    tel="719-544-3231"
                    display="(719) 544-3231"
                    cls="group inline-flex items-center gap-2 hover:text-brand-secondary"
                    :aria-label="$t('company.csr-phone')"
                  >
                    <template #default="{ display }">
                        <BaseIcon
                        name="ic:round-call"
                        color="text-brand-white"
                        hover-color="group-hover:text-brand-secondary"
                        />
                        <span>{{ display }}</span>
                    </template>
                </CallRailLink>
                 <CallRailLink
                    tel="719-543-2525"
                    display="(719) 543-2525"
                    cls="group inline-flex items-center gap-2 hover:text-brand-secondary"
                    :aria-label="$t('company.dispatch-phone')"
                  >
                      <template #default="{ display }">
                          <BaseIcon
                              name="ic:round-call"
                              color="text-brand-white"
                              hover-color="group-hover:text-brand-secondary"
                          />
                          <span>{{ display }}</span>
                      </template>
                  </CallRailLink>
                 <p class="inline-flex items-center gap-2">
                   <BaseIcon name="material-symbols:alarm-rounded" class="text-white" /> 
                   {{ $t('company.hours')}}
                 </p>
               </div>
             </BaseLayoutPageListItem>
             <BaseLayoutPageListItem :title="$t('nemt.transportation-information.availability.after-hours.title')" title-class="text-white mb-4 font-extrabold text-2xl" has-left-border class="before:bg-white font-bold text-white lg:ml-8 my-16">
               <div class="after-business-hours-wrapper appointment-schedule-information-container">
                <CallRailLink
                  tel="719-543-2525"
                  display="(719) 543-2525"
                  cls="group inline-flex items-center gap-2 hover:text-brand-secondary"
                  :aria-label="$t('company.dispatch-phone')"
                >
                    <template #default="{ display }">
                        <BaseIcon
                            name="ic:round-call"
                            color="text-brand-white"
                            hover-color="group-hover:text-brand-secondary"
                        />
                        <span>{{ display }}</span>
                    </template>
                  </CallRailLink>
               </div>
             </BaseLayoutPageListItem>
           </div>
         </BaseLayoutPageContainer>
       </BaseLayoutPageSection>
     </DeferRender>

    <!-- Driver Safety -->
    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" bg="alt" class="cv-auto">
        <BaseLayoutPageContainer>
          <LazyBaseLayoutCard class="bg-zinc-600">
            <div class="flex flex-col lg:flex-row lg:items-center lg:p-8 text-white gap-8">
              <div class="lg:w-1/2">
                  <h2 class="text-3xl flex flex-col text-center font-extrabold mb-4 ">
                      <span class="text-brand-secondary">{{ $t('nemt.driver-safety.title[0]') }}</span>
                      <span class="text-white">{{ $t('nemt.driver-safety.title[1]') }}</span>
                  </h2>
                  <p class="text-xl text-white dark-background">
                      {{ $t('nemt.driver-safety.paragraph') }}
                  </p>
              </div>
              <div class="lg:w-1/2">
                  <div class="">
                      <NuxtImg src="/images/pages/nemt/vehicle-camera.jpg" width="930" height="349" :alt="$t('nemt.driver-safety.images.vehicle-camera.alt-title')" format="webp,avif" loading="lazy" :title="$t('nemt.driver-safety.images.vehicle-camera.alt-title')" />
                  </div>
                  <div class="flex">
                      <NuxtImg src="/images/pages/nemt/distracted-driver-recognition.jpg" width="730" height="411" :alt="$t('nemt.driver-safety.images.distracted-driver.alt-title')" class="w-1/2" format="webp,avif" loading="lazy" :title="$t('nemt.driver-safety.images.distracted-driver.alt-title')" />
                      <NuxtImg src="/images/pages/nemt/dash-cam.jpg" :alt="$t('nemt.driver-safety.images.dash-cam.alt-title')" width="730" height="411" class="w-1/2" format="webp,avif" loading="lazy" :title="$t('nemt.driver-safety.images.dash-cam.alt-title')" />
                  </div>
              </div>    
            </div>
          </LazyBaseLayoutCard>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>

    <!-- Eligible Places of Service -->
    <DeferRender when="visible">
      <BaseLayoutPageSection data-eligible-places-container margin="default" class="cv-auto">
        <BaseLayoutPageContainer>
          <h2 class="md:text-2xl font-bold text-brand-primary mb-4">{{ $t('nemt.eligible-places.title') }}</h2>
          <div class="flex flex-col lg:flex-row gap-8">
            <div class="lg:w-1/2">
              <ul class="space-y-4">
                <li class="pl-8 relative">
                  <BaseIcon name="material-symbols:bookmark-check-rounded" class="text-brand-primary absolute left-0" />
                  <p class="text-xl text-brand-main-text">
                    {{ $t('nemt.eligible-places.paragraphs[0]') }}
                  </p>
                </li>
                <li class="pl-8 relative space-y-4">
                  <BaseIcon name="material-symbols:bookmark-check-rounded" class="text-brand-primary absolute left-0" />
                  <p class="text-xl text-brand-main-text">
                    {{ $t('nemt.eligible-places.paragraphs[1]') }}
                  </p>
                </li>
                <li class="pl-8 relative">
                  <BaseIcon name="material-symbols:bookmark-check-rounded" class="text-brand-primary absolute left-0" />
                  <p class="text-xl text-brand-main-text">
                    {{ $t('nemt.eligible-places.paragraphs[2]')}}
                    <CallRailLink
                      tel="719-544-3231"
                      display="(719) 544-3231"
                      cls="link"
                      :aria-label="$t('company.csr-phone')"
                    />
                    {{ $t('nemt.eligible-places.paragraphs[3]') }} 
                    <CallRailLink
                      tel="719-543-2525"
                      display="(719) 543-2525"
                      cls="link"
                      :aria-label="$t('company.dispatch-phone')"
                    />.
                  </p>
                </li>
              </ul>
            </div>
            <div class="lg:w-1/2">
              <LazyBaseInteractiveServiceAreaMap loading="lazy"/>
            </div>
          </div>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>

    <!-- Full Width Logo Band -->
    <div>
      <div class="text-center">
        <p class="text-base font-semibold text-slate-700 mb-2 tracking-wide">
          Coming Soon to the San Luis Valley
        </p>
      </div>
      <div class="relative mt-4">
        <NuxtImg
          src="/images/pages/nemt/SLV-transportation-full-width.png"
          alt="Golden Gate Manor Inc. by SLV Transportation Red Willows"
          class="w-full object-contain opacity-95"
          format="webp,avif"
          width="1484"
          height="466"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
definePageMeta({
  title: 'Non-Emergency Medical Transportation in Pueblo',
  breadcrumbLabel: 'NEMT'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Non-Emergency Medical Transportation, Pueblo',
  ogTitle: 'Non-Emergency Medical Transportation, Pueblo | Golden Gate Manor Inc.',
  description: 'Reliable Non-Emergency Medical Transportation (NEMT) in Pueblo with wheelchair accessibility, safety features, and experienced drivers.',
  ogDescription: 'Reliable Non-Emergency Medical Transportation (NEMT) in Pueblo with wheelchair accessibility, safety features, and experienced drivers.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Non-Emergency Medical Transportation, Pueblo | Golden Gate Manor Inc.',
  twitterDescription: 'Reliable Non-Emergency Medical Transportation (NEMT) in Pueblo with wheelchair accessibility, safety features, and experienced drivers.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
  name: 'NemtPage'
})

const activeAccordionId = ref<string>('');
const updateId = (val: string) => activeAccordionId.value = val

const nemtServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://goldengatemanor.com/nemt#service",
  name: "Non-Emergency Medical Transportation (NEMT)",
  serviceType: "Non-Emergency Medical Transportation",
  url: "https://goldengatemanor.com/nemt",
  provider: { "@type": "MedicalOrganization", "@id": "https://goldengatemanor.com/#organization" },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Pueblo County" },
    { "@type": "AdministrativeArea", name: "Fremont County" },
    { "@type": "AdministrativeArea", name: "Southern Colorado" },
    { "@type": "State", name: "Colorado" }
  ],
  availableChannel: [
    {
      "@type": "ServiceChannel",
      serviceUrl: "https://goldengatemanor.com/nemt",
      servicePhone: {
        "@type": "ContactPoint",
        telephone: "+1-719-544-3231",
        contactType: "Customer Service",
        availableLanguage: ["English"]
      }
    }
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "NEMT Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wheelchair-accessible transportation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Door-to-door medical appointment rides" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Medicaid-covered rides (eligible riders)" } }
    ]
  }
}

useHead({
  script: [
    {
      key: 'schema-nemt-service',
      type: 'application/ld+json',
      textContent: JSON.stringify(nemtServiceSchema),
    }
  ]
})
</script>

<style>

</style>