<template>
  <div class="flex py-8 sm:px-4 gap-4 max-w-[1000px] mx-auto">
    <BaseLayoutAsideNav class="w-1/4 max-sm:hidden" :navigation-items="navItems" @update-nav="updateNav"/>
    <Transition name="fade" mode="out-in">
      <BaseLayoutPageSection :key="activeNavId" class="w-3/4">
        <div v-if="activeNavId === 'ggmt' || allActive">
          <h2 class="text-2xl font-bold text-brand-primary">Transportation FAQ's</h2>
          <ul class="space-y-4 mt-4">
                <li>
                  <BaseInteractiveAccordionButton
                    id="eligibility"
                    :active-id="activeAccordionIdTrans"
                    label="WHO IS ELIGIBLE?"
                    :main-class="`bg-brand-primary text-white rounded-lg overflow-hidden group text-white ${activeAccordionIdTrans !== 'eligibility' ? 'hover:font-extrabold hover:bg-brand-primary/80' : ''}`"
                    :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdTrans === 'eligibility' ? 'border-b border-b-white' : ''}`"
                    :content-class="`bg-brand-primary px-4 py-2 ${activeAccordionIdTrans !== 'eligibility' ? 'group-hover:bg-brand-primary/80' : ''}`"
                    @update:active-id="updateIdTrans">
                      <p class="text-xl text-white">
                        Your client may be eligible if they have a
                        current Medicaid Insurance ID and are going
                        to a Medicaid approved appointment.
                      </p>
                  </BaseInteractiveAccordionButton>
                </li>
                <li>
                  <BaseInteractiveAccordionButton 
                    id="how-to-schedule" 
                    :active-id="activeAccordionIdTrans"
                    label="HOW DO THEY SCHEDULE A RIDE?"
                    :main-class="`bg-brand-primary text-white rounded-lg overflow-hidden group ${activeAccordionIdTrans !== 'how-to-schedule' ? 'hover:font-extrabold hover:bg-brand-primary/80' : ''}`"
                    :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdTrans === 'how-to-schedule' ? 'border-b border-b-white' : ''}`"
                    :content-class="`bg-brand-primary px-4 py-2 ${activeAccordionIdTrans !== 'how-to-schedule' ? 'group-hover:bg-brand-primary/80' : ''}`"
                    @update:active-id="updateIdTrans">
                    <div class="space-y-4">
                      <p class="text-xl text-white">
                        To help us serve you better, please schedule your ride
                        at least 24 hours in advance by calling <a 
                        rel="nofollow"
                        :href="`tel:${company?.trans.phone.office}`" class="link-light">{{ company?.trans.phone.office }}</a> between 8:00 AM
                        and 4:00 PM, Monday through Friday. This allows us the
                        necessary time to arrange your transportation efficiently.
                      </p>
                      <p class="text-xl text-white">
                        If it is after normal business hours, call our dispatch at
                        <a rel="nofollow" :href="`tel:${company?.trans.phone.dispatch}`" class="link-light">
                          {{ company?.trans.phone.dispatch }}
                        </a>.
                      </p>
                    </div>
                    <BaseUiAction to="/resources/schedule-a-ride" variant="secondary" class="p-2 mb-4 mt-8">
                      Schedule A Ride Online
                    </BaseUiAction>
                  </BaseInteractiveAccordionButton>
                </li>
                <li>
                  <BaseInteractiveAccordionButton 
                    id="how-to-cancel" 
                    :active-id="activeAccordionIdTrans"
                    label="HOW DO THEY CANCEL A RIDE?"
                    :main-class="`bg-brand-primary text-white rounded-lg overflow-hidden group ${activeAccordionIdTrans !== 'how-to-cancel' ? 'hover:font-extrabold hover:bg-brand-primary/80' : ''}`"
                    :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdTrans === 'how-to-cancel' ? 'border-b border-b-white' : ''}`"
                    :content-class="`bg-brand-primary px-4 py-2 ${activeAccordionIdTrans !== 'how-to-cancel' ? 'group-hover:bg-brand-primary/80' : ''}`"
                    @update:active-id="updateIdTrans">
                    <div class="space-y-4">
                      <p class="text-xl text-white">
                        If you need to cancel a ride, please call at least two hours
                        before your scheduled pick-up time at <a 
                        rel="nofollow"
                        :href="`tel:${company?.trans.phone.office}`" class="link-light">{{ company?.trans.phone.office }}</a>.
                      </p>
                      <p class="text-xl text-white">
                        If it is after
                        normal business hours, call our dispatch at
                        <a rel="nofollow" :href="`tel:${company?.trans.phone.dispatch}`" class="link-light">
                          {{ company?.trans.phone.dispatch }}
                        </a>.
                      </p>
                    </div>
                  </BaseInteractiveAccordionButton>
                </li>
                <li>
                  <BaseInteractiveAccordionButton 
                    id="services-covered" 
                    :active-id="activeAccordionIdTrans"
                    label="WHICH SERVICES ARE COVERED?"
                    :main-class="`bg-brand-primary text-white rounded-lg overflow-hidden group ${activeAccordionIdTrans !== 'services-covered' ? 'hover:font-extrabold hover:bg-brand-primary/80' : ''}`"
                    :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdTrans === 'services-covered' ? 'border-b border-b-white' : ''}`"
                    :content-class="`bg-brand-primary px-4 py-2 ${activeAccordionIdTrans !== 'services-covered' ? 'group-hover:bg-brand-primary/80' : ''}`"
                    @update:active-id="updateIdTrans">
                    <p class="text-xl text-white">
                      We provide transportation assistance for
                      those services covered by Medicaid. We cannot
                      transport to services not covered under the
                      Medicaid program.
                    </p>
                  </BaseInteractiveAccordionButton>
                </li>
                <li>
                  <BaseInteractiveAccordionButton 
                    id="client-approval" 
                    :active-id="activeAccordionIdTrans"
                    label="HOW DOES THE CLIENT GET APPROVED?"
                    :main-class="`bg-brand-primary text-white rounded-lg overflow-hidden group ${activeAccordionIdTrans !== 'client-approval' ? 'hover:font-extrabold hover:bg-brand-primary/80' : ''}`"
                    :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdTrans === 'client-approval' ? 'border-b border-b-white' : ''}`"
                    :content-class="`bg-brand-primary px-4 py-2 ${activeAccordionIdTrans !== 'client-approval' ? 'group-hover:bg-brand-primary/80' : ''}`"
                    @update:active-id="updateIdTrans">
                    <div class="space-y-4">
                      <p class="text-xl text-white">
                        The attending Physician, Physician’s
                        Assistant, Nurse Practitioner, Therapist, or
                        licensed healthcare professional must
                        complete and sign the Medical Certificate of
                        Transportation Services.
                      </p>
                      <p class="text-xl text-white">
                        If a client lives beyond 25 miles from the
                        Medical Provider then the additional 25 mile
                        form must be filled out, which is found
                        within the
                      </p>
                    </div>
                    <BaseUiAction 
                      href="/pdfs/nemt/nemt-app&medical-certificate-of-trans-services.pdf" target="_blank"
                      rel="noopener nofollow" class="p-2 mb-4 mt-8" variant="secondary">
                      Medical Certificate of Transportation Service Form
                    </BaseUiAction>
                  </BaseInteractiveAccordionButton>
                </li>
                <li>
                  <BaseInteractiveAccordionButton 
                    id="when-to-be-ready" 
                    :active-id="activeAccordionIdTrans"
                    label="WHEN SHOULD THEY BE READY FOR THEIR RIDE?"
                  :main-class="`bg-brand-primary text-white rounded-lg overflow-hidden group ${activeAccordionIdTrans !== 'when-to-be-ready' ? 'hover:font-extrabold hover:bg-brand-primary/80' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdTrans === 'when-to-be-ready' ? 'border-b border-b-white' : ''}`"
                  :content-class="`bg-brand-primary px-4 py-2 ${activeAccordionIdTrans !== 'when-to-be-ready' ? 'group-hover:bg-brand-primary/80' : ''}`"
                    @update:active-id="updateIdTrans">
                    <p class="text-xl text-white">
                      When you call us for a ride, we will give you
                      the timeframe you should be ready to be
                      picked up by. For shared rides, you may be asked
                      to be ready earlier than expected. Unexpected
                      delays may occur due to traffic or weather
                      conditions.
                    </p>
                  </BaseInteractiveAccordionButton>
                </li>
              </ul>
        </div>
        <div v-if="activeNavId === 'ggms' || allActive" class="max-sm:mt-4">
          <h2 class="text-2xl font-bold text-brand-medical-primary">Medical Supply FAQ's</h2>
          <ul class="space-y-4 mt-4">
              <li>
                <BaseInteractiveAccordionButton
                  id="insurance"
                  :active-id="activeAccordionIdMedical"
                  label="What insurance do you take?"
                  :main-class="`bg-brand-medical-primary text-white rounded-lg overflow-hidden group ${activeAccordionIdMedical !== 'insurance' ? 'hover:font-extrabold hover:bg-brand-medical-primary/50' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdMedical === 'insurance' ? 'border-b border-b-white' : ''}`"
                  :content-class="`bg-brand-medical-primary px-4 py-2 ${activeAccordionIdMedical !== 'insurance' ? 'group-hover:bg-brand-medical-primary/50' : ''}`"
                  @update:active-id="updateIdMedical">
                    <p class="text-xl text-white">
                      Currently at this time the following insurances are accepted for Durable Medical Equipment. We are currently working to expand our availability when it comes to insurance. If there are any other questions or concerns involving insurance please reach us via <a href="tel:719-569-7361" class="link">phone</a> or through <a href="mailto:customersupport@goldengatemedicalsupply.com" class="link">email</a>.
                    </p>
                    <ul class="list-disc list-inside ml-4 text-xl text-white">
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
                </BaseInteractiveAccordionButton>
              </li>
              <li>
                <BaseInteractiveAccordionButton
                  id="coverage"
                  :active-id="activeAccordionIdMedical"
                  label="What does my insurance cover?"
                  :main-class="`bg-brand-medical-primary text-white rounded-lg overflow-hidden group ${activeAccordionIdMedical !== 'coverage' ? 'hover:font-extrabold hover:bg-brand-medical-primary/50' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdMedical === 'coverage' ? 'border-b border-b-white' : ''}`"
                  :content-class="`bg-brand-medical-primary px-4 py-2 ${activeAccordionIdMedical !== 'coverage' ? 'group-hover:bg-brand-medical-primary/50' : ''}`"
                  @update:active-id="updateIdMedical">
                    <p class="text-xl text-white">
                      Reach out to your insurance provider to see if the item you are requesting is covered by your insurance.
                    </p>
                </BaseInteractiveAccordionButton>
              </li>
              <li>
                <BaseInteractiveAccordionButton
                  id="paperwork"
                  :active-id="activeAccordionIdMedical"
                  label="What do I have to fill out to request DME or supplies?"
                  :main-class="`bg-brand-medical-primary text-white rounded-lg overflow-hidden group ${activeAccordionIdMedical !== 'paperwork' ? 'hover:font-extrabold hover:bg-brand-medical-primary/50' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdMedical === 'paperwork' ? 'border-b border-b-white' : ''}`"
                  :content-class="`bg-brand-medical-primary px-4 py-2 ${activeAccordionIdMedical !== 'paperwork' ? 'group-hover:bg-brand-medical-primary/50' : ''}`"
                  @update:active-id="updateIdMedical">
                    <p class="text-xl text-white">
                      Before beginning the process of requesting DME and/or supplies, verify with your insurance provider to determine if the item being requested is covered through your insurance plan. Once insurance coverage is verified, contact a prescribing physician or practitioner to address the need or necessity of DME and/or supplies. The prescribing physician/practitioner will begin the process of collecting the materials necessary to show medical necessity to send to our DME Specialists. We cannot complete any orders without completing everything shown in the drop down titled "What We Need for Orders".
                    </p>
                </BaseInteractiveAccordionButton>
              </li>
              <li>
                <BaseInteractiveAccordionButton
                  id="dme"
                  :active-id="activeAccordionIdMedical"
                  label="What is Medicare's defintion of DME?"
                  :main-class="`bg-brand-medical-primary text-white rounded-lg overflow-hidden group ${activeAccordionIdMedical !== 'dme' ? 'hover:font-extrabold hover:bg-brand-medical-primary/50' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdMedical === 'dme' ? 'border-b border-b-white' : ''}`"
                  :content-class="`bg-brand-medical-primary px-4 py-2 ${activeAccordionIdMedical !== 'dme' ? 'group-hover:bg-brand-medical-primary/50' : ''}`"
                  @update:active-id="updateIdMedical">
                    <ul class="list-disc list-inside ml-4 text-xl text-white">
                      <li>
                        Durable (can withstand repeated use).
                      </li>
                      <li>
                        Appropriate for use in the "home" ("primarily used at home," but not exclusively).
                      </li>
                      <li>
                        Primarily and customarily needed for a medical purpose (the equipment/supplies would not be useful for someone who doesn't need it).
                      </li>
                      <li>
                        Necessary and reasonable for treatment of a condition or injury.
                      </li>
                    </ul>
                </BaseInteractiveAccordionButton>
              </li>
              <li>
                <BaseInteractiveAccordionButton
                  id="repairs"
                  :active-id="activeAccordionIdMedical"
                  label="Does Golden Gate Medical Supplies do repairs?"
                  :main-class="`bg-brand-medical-primary text-white rounded-lg overflow-hidden group ${activeAccordionIdMedical !== 'repairs' ? 'hover:font-extrabold hover:bg-brand-medical-primary/50' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdMedical === 'repairs' ? 'border-b border-b-white' : ''}`"
                  :content-class="`bg-brand-medical-primary px-4 py-2 ${activeAccordionIdMedical !== 'repairs' ? 'group-hover:bg-brand-medical-primary/50' : ''}`"
                  @update:active-id="updateIdMedical">
                    <p class="text-xl text-white">
                      We do not specialize in repairs but have been known to do simple repairs to items such as replacing brakes, wheels, accessories, etc. Repairs are to be done at the discretion of the patient through a certified service.
                    </p>
                </BaseInteractiveAccordionButton>
              </li>
              <li>
                <BaseInteractiveAccordionButton
                  id="out-of-pocket"
                  :active-id="activeAccordionIdMedical"
                  label="Am I able to get DME and/or supplies out of pocket?"
                  :main-class="`bg-brand-medical-primary text-white rounded-lg overflow-hidden group ${activeAccordionIdMedical !== 'out-of-pocket' ? 'hover:font-extrabold hover:bg-brand-medical-primary/50' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdMedical === 'out-of-pocket' ? 'border-b border-b-white' : ''}`"
                  :content-class="`bg-brand-medical-primary px-4 py-2 ${activeAccordionIdMedical !== 'out-of-pocket' ? 'group-hover:bg-brand-medical-primary/50' : ''}`"
                  @update:active-id="updateIdMedical">
                    <p class="text-xl text-white">
                      If you are looking to get medical equipment or supplies, you do not have to go through a prescriber to get the items you need. Before purchasing any items out of pocket, speak to a doctor or physician or practitioner to make sure you are getting the right items for the needs that you have. Ask about our unique rent-to-own programs so that we can help make the process more affordable.
                    </p>
                </BaseInteractiveAccordionButton>
              </li>
            </ul>
        </div>
        <div v-if="activeNavId === 'ggal' || allActive" class="max-sm:mt-4">
          <h2 class="text-2xl font-bold text-brand-primary">Assisted Living FAQ's</h2>
          <ul class="space-y-4 mt-4">
            <li>
                <BaseInteractiveAccordionButton
                  id="services-assisted-living"
                  :active-id="activeAccordionIdAssistedLiving"
                  label="What services are included in assisted living?"
                  :main-class="`bg-[#5DADE2] text-white rounded-lg overflow-hidden group ${activeAccordionIdAssistedLiving !== 'services-assisted-living' ? 'hover:font-extrabold hover:bg-[#5DADE2]/50' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdAssistedLiving === 'services-assisted-living' ? 'border-b border-b-white' : ''}`"
                  :content-class="`bg-[#5DADE2] px-4 py-2 ${activeAccordionIdAssistedLiving !== 'services-assisted-living' ? 'group-hover:bg-[#5DADE2]/50' : ''}`"
                  @update:active-id="updateIdAssistedLiving">
                    <p class="text-xl text-white">
                      Our assisted living services include:
                    </p>
                    <ul class="ml-8 list-disc text-xl">
                      <li>
                        Daily care assistance with personal hygiene, dressing, and mobility
                      </li>
                      <li>
                        3 Nutritious meals and snacks provided throughout the day
                      </li>
                      <li>
                        Transportation to medical appointments
                      </li>
                      <li>
                        Medication management and assistance
                      </li>
                      <li>
                        Light housekeeping and laundry services
                      </li>
                      <li>
                        Scheduling and coordination of appointments
                      </li>
                      <li>
                        Access to recreational activities and amenities
                      </li>
                    </ul>
                    <p class="text-xl text-white">
                      For a complete list of our amenities and services, please visit our <NuxtLink to="/assisted-living" class="link">Assisted Living page</NuxtLink> or contact us directly.
                    </p>
                </BaseInteractiveAccordionButton>
              </li>
            <li>
                <BaseInteractiveAccordionButton
                  id="assisted-living-right"
                  :active-id="activeAccordionIdAssistedLiving"
                  label="How do I know if assisted living is right for me or my loved one?"
                  :main-class="`bg-[#5DADE2] text-white rounded-lg overflow-hidden group ${activeAccordionIdAssistedLiving !== 'assisted-living-right' ? 'hover:font-extrabold hover:bg-[#5DADE2]/50' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdAssistedLiving === 'assisted-living-right' ? 'border-b border-b-white' : ''}`"
                  :content-class="`bg-[#5DADE2] px-4 py-2 ${activeAccordionIdAssistedLiving !== 'assisted-living-right' ? 'group-hover:bg-[#5DADE2]/50' : ''}`"
                  @update:active-id="updateIdAssistedLiving">
                    <p class="text-xl text-white">
                      How do I know if assisted living is right for me or my loved one?
                    </p>
                    <ul class="ml-8 list-disc text-xl">
                      <li>
                        Needs help with daily activities like bathing, dressing, or medication management
                      </li>
                      <li>
                        Wants to maintain independence while having support available
                      </li>
                      <li>
                        Would benefit from social interaction and community activities
                      </li>
                      <li>
                        Requires assistance with housekeeping, meals, or transportation
                      </li>
                      <li>
                        Is looking for a safe, secure environment with 24-hour staff availability
                      </li>
                      <li>
                        No longer feels comfortable living alone but doesn't need full nursing care
                      </li>
                    </ul>
                    <p class="text-xl text-white">
                      Our team can help assess your specific needs during a consultation. We encourage you to schedule a tour and speak with our staff to determine if our level of care matches what you're looking for.
                    </p>
                </BaseInteractiveAccordionButton>
            </li>
            <li>
                <BaseInteractiveAccordionButton
                  id="cost-of-assisted-living"
                  :active-id="activeAccordionIdAssistedLiving"
                  label="What is the cost of assisted living at Golden Gate Manor?"
                  :main-class="`bg-[#5DADE2] text-white rounded-lg overflow-hidden group ${activeAccordionIdAssistedLiving !== 'cost-of-assisted-living' ? 'hover:font-extrabold hover:bg-[#5DADE2]/50' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdAssistedLiving === 'cost-of-assisted-living' ? 'border-b border-b-white' : ''}`"
                  :content-class="`bg-[#5DADE2] px-4 py-2 ${activeAccordionIdAssistedLiving !== 'cost-of-assisted-living' ? 'group-hover:bg-[#5DADE2]/50' : ''}`"
                  @update:active-id="updateIdAssistedLiving">
                    <div class="space-y-4">
                      <p>
                        Without insurance, out-of-pocket expenses depend on your monthly income, plus there would be monthly fees. The best answer regarding cost would be to contact us directly for a personalized quote.
                      </p>
                      <p>
                        With Medicaid, there would be an out-of-pocket expense of $797, and Medicaid would cover the rest of the out-of-pocket expenses. There is also a specific amount of spending money allotted, which would require further conversations to understand the exact amount as it can change.
                      </p>
                      <p>
                        <NuxtLink to="/company/contact-us" class="link">Contact us</NuxtLink> directly to discuss your specific situation and get accurate pricing information.
                      </p>
                    </div>
                </BaseInteractiveAccordionButton>
            </li>
            <li>
                <BaseInteractiveAccordionButton
                  id="out-of-pocket"
                  :active-id="activeAccordionIdAssistedLiving"
                  label=""
                  :main-class="`bg-[#5DADE2] text-white rounded-lg overflow-hidden group ${activeAccordionIdAssistedLiving !== 'out-of-pocket' ? 'hover:font-extrabold hover:bg-[#5DADE2]/50' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdAssistedLiving === 'out-of-pocket' ? 'border-b border-b-white' : ''}`"
                  :content-class="`bg-[#5DADE2] px-4 py-2 ${activeAccordionIdAssistedLiving !== 'out-of-pocket' ? 'group-hover:bg-[#5DADE2]/50' : ''}`"
                  @update:active-id="updateIdAssistedLiving">

                </BaseInteractiveAccordionButton>
            </li>
            <li>
                <BaseInteractiveAccordionButton
                  id="out-of-pocket"
                  :active-id="activeAccordionIdAssistedLiving"
                  label=""
                  :main-class="`bg-[#5DADE2] text-white rounded-lg overflow-hidden group ${activeAccordionIdAssistedLiving !== 'out-of-pocket' ? 'hover:font-extrabold hover:bg-[#5DADE2]/50' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdAssistedLiving === 'out-of-pocket' ? 'border-b border-b-white' : ''}`"
                  :content-class="`bg-[#5DADE2] px-4 py-2 ${activeAccordionIdAssistedLiving !== 'out-of-pocket' ? 'group-hover:bg-[#5DADE2]/50' : ''}`"
                  @update:active-id="updateIdAssistedLiving">

                </BaseInteractiveAccordionButton>
            </li>
            <li>
                <BaseInteractiveAccordionButton
                  id="out-of-pocket"
                  :active-id="activeAccordionIdAssistedLiving"
                  label=""
                  :main-class="`bg-[#5DADE2] text-white rounded-lg overflow-hidden group ${activeAccordionIdAssistedLiving !== 'out-of-pocket' ? 'hover:font-extrabold hover:bg-[#5DADE2]/50' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdAssistedLiving === 'out-of-pocket' ? 'border-b border-b-white' : ''}`"
                  :content-class="`bg-[#5DADE2] px-4 py-2 ${activeAccordionIdAssistedLiving !== 'out-of-pocket' ? 'group-hover:bg-[#5DADE2]/50' : ''}`"
                  @update:active-id="updateIdAssistedLiving">

                </BaseInteractiveAccordionButton>
            </li>
          </ul>
        </div>
        <div v-if="activeNavId === 'ggmc' || allActive" class="max-sm:mt-4">
          <h2 class="text-2xl font-bold text-brand-primary">Gas & Goods FAQ's</h2>
        </div>
      </BaseLayoutPageSection>
    </Transition>
  </div>
</template>

<script setup lang='ts'>
definePageMeta({
  title: 'FAQs',
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'FAQs',
  ogTitle: 'FAQs',
  description: 'Find answers to common questions about Golden Gate Manor Inc.’s transportation, assisted living, and medical supply services in Southern Colorado.',
  ogDescription: 'Find answers to common questions about Golden Gate Manor Inc.’s transportation, assisted living, and medical supply services in Southern Colorado.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'FAQs',
  twitterDescription: 'Find answers to common questions about Golden Gate Manor Inc.’s transportation, assisted living, and medical supply services in Southern Colorado.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'FAQPage'
})

const navItems = reactive([
  { id: 'ggmt', name: 'Transportation', active: true},
  { id: 'ggms', name: 'Medical Supply', active: false},
  { id: 'ggal', name: 'Assisted Living', active: false},
  { id: 'ggmc', name: 'Gas & Goods', active: false}
]);

const activeNavId = computed(() => {
  return navItems.find(item => item.active)?.id || 'ggmt'
})

const allActive = ref<boolean>(false);

const updateNav = (id: string) => {
  navItems.forEach(item => {
    item.active = item.id === id;
  })
}

// Handle resize with debounce
const handleResize = () => {
  if (window.innerWidth < 640) {
    // Set to 'all' mode for mobile
    allActive.value = true
    // You'll need to handle the 'all' case in your activeNavId computed
  } else {
    allActive.value = false;
  }
}

const debouncedResize = useDebounce(handleResize, 50)

const company = useStaticData()?.company;

const activeAccordionIdTrans = ref<string>('')
const updateIdTrans = (val: string) => activeAccordionIdTrans.value = val

const activeAccordionIdMedical = ref<string>('')
const updateIdMedical = (val: string) => activeAccordionIdMedical.value = val

const activeAccordionIdAssistedLiving = ref<string>('');
const updateIdAssistedLiving = (val: string) => activeAccordionIdAssistedLiving.value = val

onMounted(() => {
  window.addEventListener('resize', debouncedResize)
  // Check initial size
  handleResize()
})

onUnmounted(() => {
  window.removeEventListener('resize', debouncedResize)
})
</script>

<style scoped>
  /* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>