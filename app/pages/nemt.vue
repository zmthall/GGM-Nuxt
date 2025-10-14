<template>
  <div>
    <!-- Top Page -->
    <BaseLayoutPageSection margin="top">
      <BaseLayoutPageContainer>
        <div class="md:flex md:items-center gap-8">
          <div class="flex md:flex-col flex-col-reverse md:w-1/2 md:space-y-4">
            <div>
              <h2 class="md:text-2xl font-bold text-brand-primary">What is Non-Emergency Transportation (NEMT)?</h2>
              <p class="text-xl text-brand-main-text">
                Non-Emergent Medical Transportation (NEMT) is transportation to and from covered non-emergency medical appointments and services; if it is a Medicaid approved appointment we can get you there. With our fleet of over 40 vehicles, including wheelchair accessible vans, we can make sure that our clients make it to and from their appointments on time anywhere in our serviceable area in Southern Colorado.
              </p>
            </div>
            <table class="w-full border-collapse bg-[#c6d5e4] mb-4 md:my-8 md:mb-0">
              <tbody>
                <tr class="nemt-row">
                  <th colspan="2" class="p-4 text-center border-black border-2">Types of Transportation Available in Pueblo, Colorado</th>
                </tr>
                <tr class="nemt-row">
                  <td class="p-4 text-center border-black border-2">Bus</td>
                  <td class="p-4 text-center border-black border-2">Citi Lift</td>
                </tr>
                <tr class="nemt-row">
                  <td class="p-4 text-center border-black border-2">Mobility Van</td>
                  <td class="p-4 text-center border-black border-2">Taxicab</td>
                </tr>
                <tr class="nemt-row">
                  <td class="p-4 text-center border-black border-2">Private Vehicle</td>
                  <td class="p-4 text-center border-black border-2 font-extrabold">
                    <div class="flex items-center justify-center">
                      <BaseIcon name="proicons:checkmark-starburst" color="black" />
                      Non-Emergency Vehicle
                    </div>
                  </td>
                </tr>
                <tr class="nemt-row">
                  <td colspan="2" class="p-4 text-center border-black border-2">Mileage Reimbursement</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="md:w-1/2 md:my-0 my-4">
            <BaseYoutubeLite
              video-id="fJ8_uvrsYXo"
              title="Golden Gate Manor Superbowl 2025 Commercial"
              sizes="(min-width:1280px) 600px, 100vw"
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
            title="Opens in new tab"
            href="/pdfs/nemt/nemt-app&medical-certificate-of-trans-services.pdf" target="_blank" rel="noopener nofollow"
            class="group text-xs w-full md:w-[calc(50%-1rem)]"
            styling="p-2 sm:p-4 flex flex-col md:flex-row gap-2 items-center justify-center">
              <BaseIcon name="uiw:file-pdf" class="group-hover:text-brand-secondary transition-colors duration-500 ease-in-out" size="size-5"/> 
              <span class="hidden lg:inline-block">DOWNLOAD HERE >>></span>
              <span class="inline-block">Medical Certificate of Transportation Service Form</span>
          </BaseUiAction>
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>

    <!-- Transportation Information -->
     <DeferRender when="visible">
       <BaseLayoutPageSection margin="default" bg="alt" class="cv-auto">
         <BaseLayoutPageContainer class="bg-brand-primary rounded-lg shadow-primary">
             <h2 class="text-3xl font-bold text-white text-center pt-8">Transportation Information</h2>
             <div  class="flex flex-col lg:flex-row gap-8 mb-8 border-b-2 border-b-white px-3 sm:px-6 lg:px-8 py-8">
               <div class="lg:w-1/2">
                 <h3 class="text-2xl font-bold text-white mb-6">FAQs</h3>
                 <ul class="space-y-4">
                   <li>
                     <BaseInteractiveAccordionButton
                       id="eligibility"
                       :active-id="activeAccordionId"
                       label="WHO IS ELIGIBLE?"
                       :main-class="`bg-gray-200 rounded-lg overflow-hidden group ${activeAccordionId !== 'eligibility' ? 'hover:font-extrabold hover:bg-gray-300' : ''}`"
                       :button-class="`px-4 py-2 w-full text-left ${activeAccordionId === 'eligibility' ? 'border-b border-b-black' : ''}`"
                       :content-class="`bg-gray-200 px-4 py-2 ${activeAccordionId !== 'eligibility' ? 'group-hover:bg-gray-300' : ''}`"
                       @update:active-id="updateId">
                         <p class="text-xl text-brand-main-text">
                           If you have Colorado Medicaid benefits you may be eligible to utilize our services. All you need is a current Medicaid insurance ID and you need to be going to and from an Medicaid approved appointment. We pickup within our service area, which is mostly in Southern Colorado, and we can take you to appointments throughout Colorado including Denver. Our service area is specific to where we are able to pick you up from not for where we are able to take you.
                         </p>
                     </BaseInteractiveAccordionButton>
                   </li>
                   <li>
                     <BaseInteractiveAccordionButton 
                       id="how-to-schedule" 
                       :active-id="activeAccordionId"
                       label="HOW DO THEY SCHEDULE A RIDE?"
                       :main-class="`bg-gray-200 rounded-lg overflow-hidden group ${activeAccordionId !== 'how-to-schedule' ? 'hover:font-extrabold hover:bg-gray-300' : ''}`"
                       :button-class="`px-4 py-2 w-full text-left ${activeAccordionId === 'how-to-schedule' ? 'border-b border-b-black' : ''}`"
                       :content-class="`bg-gray-200 px-4 py-2 ${activeAccordionId !== 'how-to-schedule' ? 'group-hover:bg-gray-300' : ''}`"
                       @update:active-id="updateId">
                       <div class="space-y-4">
                         <p class="text-xl text-brand-main-text">
                           To help us serve you better, please schedule your ride at least 24 hours in advance by calling <a rel="nofollow" :href="`tel:${company?.trans.phone.office}`" class="link">{{ company?.trans.phone.office }}</a> between 8:00 AM and 4:00 PM, Monday through Friday. This allows us the necessary time to arrange your transportation efficiently.
                         </p>
                         <p class="text-xl text-brand-main-text">
                           If it is after normal business hours, call our dispatch at <a rel="nofollow" :href="`tel:${company?.trans.phone.dispatch}`" class="link">{{ company?.trans.phone.dispatch }}</a>. Our scheduling/dispatch office is open 24/7. Please don't hesitate to reach out if you have any questions.
                         </p>
                       </div>
                       <BaseUiAction to="/resources/schedule-a-ride" class="p-2 mb-4 mt-8">
                         Schedule A Ride Online
                       </BaseUiAction>
                     </BaseInteractiveAccordionButton>
                   </li>
                   <li>
                     <BaseInteractiveAccordionButton 
                       id="how-to-cancel" 
                       :active-id="activeAccordionId"
                       label="HOW DO THEY CANCEL A RIDE?"
                       :main-class="`bg-gray-200 rounded-lg overflow-hidden group ${activeAccordionId !== 'how-to-cancel' ? 'hover:font-extrabold hover:bg-gray-300' : ''}`"
                       :button-class="`px-4 py-2 w-full text-left ${activeAccordionId === 'how-to-cancel' ? 'border-b border-b-black' : ''}`"
                       :content-class="`bg-gray-200 px-4 py-2 ${activeAccordionId !== 'how-to-cancel' ? 'group-hover:bg-gray-300' : ''}`"
                       @update:active-id="updateId">
                       <div class="space-y-4">
                         <p class="text-xl text-brand-main-text">
                           If you need to cancel a ride, please call at least two hours before your scheduled pick-up time at <a rel="nofollow" :href="`tel:${company?.trans.phone.office}`" class="link">{{ company?.trans.phone.office }}</a>.
                         </p>
                         <p class="text-xl text-brand-main-text">
                           If it is after normal business hours, call our dispatch at <a rel="nofollow" :href="`tel:${company?.trans.phone.dispatch}`" class="link">{{ company?.trans.phone.dispatch }}</a>.
                         </p>
                         <p class="text-xl text-brand-main-text">
                           Please make sure to read our <NuxtLink to="/company/policies/ride-cancellation" class="link">Ride Cancellation Policy</NuxtLink> to understand proper cancellation procedures.
                         </p>
                       </div>
                     </BaseInteractiveAccordionButton>
                   </li>
                   <li>
                     <BaseInteractiveAccordionButton 
                       id="services-covered" 
                       :active-id="activeAccordionId"
                       label="WHICH SERVICES ARE COVERED?"
                       :main-class="`bg-gray-200 rounded-lg overflow-hidden group ${activeAccordionId !== 'services-covered' ? 'hover:font-extrabold hover:bg-gray-300' : ''}`"
                       :button-class="`px-4 py-2 w-full text-left ${activeAccordionId === 'services-covered' ? 'border-b border-b-black' : ''}`"
                       :content-class="`bg-gray-200 px-4 py-2 ${activeAccordionId !== 'services-covered' ? 'group-hover:bg-gray-300' : ''}`"
                       @update:active-id="updateId">
                         <p class="text-xl text-brand-main-text">
                           We provide transportation assistance for those services covered by Medicaid. We cannot transport to services not covered under the Medicaid program, such as to and from locations that are not medical appointments. If the service request is farther than 25 miles you will need to fill out a Medical Certificate of Transportation Services beyond 25 Miles form  which is found within the initial paperwork below.
                         </p>
                         <BaseUiAction 
                           href="/pdfs/nemt/nemt-app&medical-certificate-of-trans-services.pdf" target="_blank"
                           rel="noopener nofollow" class="p-2 mb-4 mt-8">
                           Medical Certificate of Transportation Service Form
                         </BaseUiAction>
                     </BaseInteractiveAccordionButton>
                   </li>
                   <li>
                     <BaseInteractiveAccordionButton 
                       id="client-approval" 
                       :active-id="activeAccordionId"
                       label="HOW DOES THE CLIENT GET APPROVED?"
                       :main-class="`bg-gray-200 rounded-lg overflow-hidden group ${activeAccordionId !== 'client-approval' ? 'hover:font-extrabold hover:bg-gray-300' : ''}`"
                       :button-class="`px-4 py-2 w-full text-left ${activeAccordionId === 'client-approval' ? 'border-b border-b-black' : ''}`"
                       :content-class="`bg-gray-200 px-4 py-2 ${activeAccordionId !== 'client-approval' ? 'group-hover:bg-gray-300' : ''}`"
                       @update:active-id="updateId">
                       <div class="space-y-4">
                         <p class="text-xl text-brand-main-text">
                           The attending Physician, Physician's Assistant, Nurse Practitioner, Therapist, or licensed healthcare professional must complete and sign the Medical Certificate of Transportation Services.
                         </p>
                         <p class="text-xl text-brand-main-text">
                           If a client lives beyond 25 miles from the Medical Provider then the additional 25 mile form must be filled out, which is found within the initial paperwork below.
                         </p>
                       </div>
                       <BaseUiAction 
                         href="/pdfs/nemt/nemt-app&medical-certificate-of-trans-services.pdf" target="_blank"
                         rel="noopener nofollow" class="p-2 mb-4 mt-8">
                         Medical Certificate of Transportation Service Form
                       </BaseUiAction>
                     </BaseInteractiveAccordionButton>
                   </li>
                   <li>
                     <BaseInteractiveAccordionButton 
                       id="when-to-be-ready" 
                       :active-id="activeAccordionId"
                       label="WHEN SHOULD THEY BE READY FOR THEIR RIDE?"
                     :main-class="`bg-gray-200 rounded-lg overflow-hidden group ${activeAccordionId !== 'when-to-be-ready' ? 'hover:font-extrabold hover:bg-gray-300' : ''}`"
                     :button-class="`px-4 py-2 w-full text-left ${activeAccordionId === 'when-to-be-ready' ? 'border-b border-b-black' : ''}`"
                     :content-class="`bg-gray-200 px-4 py-2 ${activeAccordionId !== 'when-to-be-ready' ? 'group-hover:bg-gray-300' : ''}`"
                       @update:active-id="updateId">
                       <p class="text-xl text-brand-main-text">
                         When you call us for a ride, we will give you the timeframe you should be ready to be picked up by. For shared rides, you may be asked to be ready earlier than expected. Unexpected delays may occur due to traffic or weather conditions, so please keep that in mind when utilizing our services for non-emergency medical transportation (NEMT) needs.
                       </p>
                     </BaseInteractiveAccordionButton>
                   </li>
                 </ul>
               </div>
               <div class="lg:w-1/2">
                 <h3 class="text-2xl font-bold text-white mb-6">How Do I Schedule A Ride?</h3>
                 <ul class="space-y-4">
                   <li class="pl-8 relative">
                     <BaseIcon name="material-symbols:bookmark-check-rounded" class="text-white absolute left-0" />
                     <p class="text-xl text-white">
                       Once approved, please call at least 48 hours before your
                       appointment to schedule a ride. Reservation hours are Monday
                       to Friday, 8:00 AM - 4:00 PM. To cancel a scheduled ride,
                       please call at least two hours before your scheduled pick-up.
                     </p>
                   </li>
                   <li class="pl-8 relative">
                     <BaseIcon name="material-symbols:bookmark-check-rounded" class="text-white absolute left-0" />
                     <p class="text-xl text-white">
                       Our office is open Monday to Friday, 8:00 AM - 4:00 PM, for any
                       questions, cancellations, or urgent care appointments. Urgent
                       appointments are scheduled based on availability; therefore trips are not always guaranteed.
                     </p>
                   </li>
                 </ul>
                 <NuxtLink to="/resources/schedule-a-ride" class="ml-8 text-white font-extrabold underline text-xl mt-8 inline-block hover:text-brand-link-hover">Schedule A Ride Online</NuxtLink>
               </div>
             </div>
   
   
           <div class="px-8 pb-8">
             <h2 class="text-3xl font-bold text-white text-center pb-8">
               DRIVERS AND APPOINTMENTS AVAILABLE 24/7
             </h2>
             <BaseLayoutPageListItem title="Business Hours Numbers" title-class="text-white mb-4 font-extrabold text-2xl" has-left-border class="before:bg-white font-bold text-white lg:ml-8 my-8">
               <div class="flex flex-col space-y-2">
                 <a rel="nofollow" :href="`tel:${company?.trans.phone.office}`" class="hover:text-brand-secondary group flex items-center w-max">
                   <BaseIcon name="ic:round-call" class="text-white group-hover:text-brand-secondary"/>
                   <span class="nemt-span-text">
                     {{ company?.trans.phone.office }}
                   </span>
                 </a>
                 <a rel="nofollow" :href="`tel:${company?.trans.phone.dispatch}`" class="hover:text-brand-secondary group flex items-center w-max">
                   <span class="nemt-span-logo">
                     <BaseIcon name="ic:round-call" class="text-white group-hover:text-brand-secondary" />
                   </span>
                   <span class="nemt-span-text">
                     {{ company?.trans.phone.dispatch }}
                   </span>
                 </a>
                 <p class="flex items-center">
                   <BaseIcon name="material-symbols:alarm-rounded" class="text-white" /> Office Hours: M-F 8:00AM-4:00PM
                 </p>
               </div>
             </BaseLayoutPageListItem>
             <BaseLayoutPageListItem title="After Business Hours Number" title-class="text-white mb-4 font-extrabold text-2xl" has-left-border class="before:bg-white font-bold text-white lg:ml-8 my-16">
               <div class="after-business-hours-wrapper appointment-schedule-information-container">
                 <a rel="nofollow" :href="`tel:${company?.trans.phone.dispatch}`" class="hover:text-brand-secondary group flex items-center w-max">
                   <BaseIcon name="ic:round-call" class="text-white group-hover:text-brand-secondary"/>
                   <span class="nemt-span-text">
                     {{ company?.trans.phone.dispatch  }}
                   </span>
                 </a>
               </div>
             </BaseLayoutPageListItem>
           </div>
         </BaseLayoutPageContainer>
       </BaseLayoutPageSection>
     </DeferRender>

    <!-- Eligible Places of Service -->
    <DeferRender when="visible">
      <BaseLayoutPageSection data-eligible-places-container margin="default" class="cv-auto">
        <BaseLayoutPageContainer>
          <h2 class="md:text-2xl font-bold text-brand-primary mb-4">Eligible Places of Services</h2>
          <div class="flex flex-col lg:flex-row gap-8">
            <div class="lg:w-1/2">
              <ul class="space-y-4">
                <li class="pl-8 relative">
                  <BaseIcon name="material-symbols:bookmark-check-rounded" class="text-brand-primary absolute left-0" />
                  <p class="text-xl text-brand-main-text">
                    Transportation of clients to/from a Medicaid enrolled
                    provider to a Colorado Medicaid covered service.
                  </p>
                </li>
                <li class="pl-8 relative space-y-4">
                  <BaseIcon name="material-symbols:bookmark-check-rounded" class="text-brand-primary absolute left-0" />
                  <p class="text-xl text-brand-main-text">
                    All regions on the map highligted in green are within the
                    jurisdiction of Golden Gate Manor in the State of Colorado.
                    This is the areas that we are able to pick our clients up from. 
                    We will still be able to take you to appointments from, for example, Pueblo, Colorado, to Denver, Colorado.
                    If you have any specific questions if your area is serviceable, don't hesitate to call us and ask. Our customer service representatives will be able to answer all questions regarding our service area.
                  </p>
                </li>
                <li class="pl-8 relative">
                  <BaseIcon name="material-symbols:bookmark-check-rounded" class="text-brand-primary absolute left-0" />
                  <p class="text-xl text-brand-main-text">
                    Give us a call at <a rel="nofollow" :href="`tel:${company?.trans.phone.office}`" class="link">{{ company?.trans.phone.office }}</a> for eligibility in your
                    county. If after hours, call <a rel="nofollow" :href="`tel:${company?.trans.phone.dispatch}`" class="link">
                      {{ company?.trans.phone.dispatch }}</a>.
                  </p>
                </li>
              </ul>
            </div>
            <div class="lg:w-1/2">
              <BaseInteractiveServiceAreaMap loading="lazy"/>
            </div>
          </div>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>

    <!-- Driver Safety -->
    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" bg="alt" class="cv-auto">
        <BaseLayoutPageContainer>
          <BaseLayoutCard class="bg-zinc-600">
            <div class="flex flex-col lg:flex-row lg:items-center lg:p-8 text-white gap-8">
              <div class="lg:w-1/2">
                  <h2 class="text-3xl flex flex-col text-center font-extrabold mb-4 ">
                      <span class="text-brand-secondary">Safe Drivers</span>
                      <span class="">Camera Equipped Vehicles</span>
                  </h2>
                  <p class="text-xl text-white dark-background">
                      There are both front and rear facing cameras installed in 
                      all of our company vehicles. They have the added benefit of 
                      ensuring our drivers are not distracted. In addition, they 
                      will be documenting any events that may occur while a 
                      client is utilizing our services.
                  </p>
              </div>
              <div class="lg:w-1/2">
                  <div class="">
                      <NuxtImg src="/images/pages/nemt/vehicle-camera.jpg" width="930" height="349" alt="Vehicles equipped with front and back facing cameras" format="webp,avif" loading="lazy" title="Vehicles equipped with front and back facing cameras" />
                  </div>
                  <div class="flex">
                      <NuxtImg src="/images/pages/nemt/distracted-driver-recognition.jpg" width="730" height="411" alt="Cameras recognize distractions" class="w-1/2" format="webp,avif" loading="lazy" title="Cameras recognize distractions" />
                      <NuxtImg src="/images/pages/nemt/dash-cam.jpg" alt="An example of the mounted camera" width="730" height="411" class="w-1/2" format="webp,avif" loading="lazy" title="An example of the mounted camera" />
                  </div>
              </div>    
            </div>
          </BaseLayoutCard>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>
  </div>
</template>

<script setup lang='ts'>
definePageMeta({
  title: 'Non-Emergency Medical Transportation in Southern Colorado',
  breadcrumbLabel: 'NEMT'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Non-Emergency Medical Transportation in Southern Colorado',
  ogTitle: 'Non-Emergency Medical Transportation in Southern Colorado',
  description: 'Reliable Non-Emergency Medical Transportation (NEMT) in Southern Colorado with wheelchair accessibility, safety features, and experienced drivers.',
  ogDescription: 'Reliable Non-Emergency Medical Transportation (NEMT) in Southern Colorado with wheelchair accessibility, safety features, and experienced drivers.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Non-Emergency Medical Transportation in Southern Colorado',
  twitterDescription: 'Reliable Non-Emergency Medical Transportation (NEMT) in Southern Colorado with wheelchair accessibility, safety features, and experienced drivers.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
  name: 'NemtPage'
})

const activeAccordionId = ref<string>('');
const updateId = (val: string) => activeAccordionId.value = val
const company = useStaticData()?.company;

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