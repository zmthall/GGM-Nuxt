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
          <h2 class="text-2xl font-bold text-brand-primary">Medical Supply FAQ's</h2>
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
                  <div class="space-y-4">
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
                  </div>
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
                  :main-class="`bg-[#2E86AB] text-white rounded-lg overflow-hidden group ${activeAccordionIdAssistedLiving !== 'services-assisted-living' ? 'hover:font-extrabold hover:bg-[#2E86AB]/50' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdAssistedLiving === 'services-assisted-living' ? 'border-b border-b-white' : ''}`"
                  :content-class="`bg-[#2E86AB] px-4 py-2 ${activeAccordionIdAssistedLiving !== 'services-assisted-living' ? 'group-hover:bg-[#2E86AB]/50' : ''}`"
                  @update:active-id="updateIdAssistedLiving">
                  <div class="space-y-4">
                    <div>
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
                    </div>
                    <p class="text-xl text-white">
                      For a complete list of our amenities and services, please visit our <NuxtLink to="/assisted-living" class="link">Assisted Living page</NuxtLink> or <NuxtLink to="/company/contact-us">Contact Us</NuxtLink> directly.
                    </p>
                  </div>
                </BaseInteractiveAccordionButton>
              </li>
            <li>
                <BaseInteractiveAccordionButton
                  id="assisted-living-right"
                  :active-id="activeAccordionIdAssistedLiving"
                  label="How do I know if assisted living is for me or my loved one?"
                  :main-class="`bg-[#2E86AB] text-white rounded-lg overflow-hidden group ${activeAccordionIdAssistedLiving !== 'assisted-living-right' ? 'hover:font-extrabold hover:bg-[#2E86AB]/50' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdAssistedLiving === 'assisted-living-right' ? 'border-b border-b-white' : ''}`"
                  :content-class="`bg-[#2E86AB] px-4 py-2 ${activeAccordionIdAssistedLiving !== 'assisted-living-right' ? 'group-hover:bg-[#2E86AB]/50' : ''}`"
                  @update:active-id="updateIdAssistedLiving">
                    <div class="space-y-4">
                      <div>
                        <p class="text-xl text-white">
                          If you or your loved one requires one or more of the following, assisted living may be for you:
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
                      </div>
                      <p class="text-xl text-white">
                        Our team can help assess your specific needs during a consultation. We encourage you to schedule a tour and speak with our staff to determine if our level of care matches what you're looking for.
                      </p>
                    </div>
                </BaseInteractiveAccordionButton>
            </li>
            <li>
                <BaseInteractiveAccordionButton
                  id="cost-of-assisted-living"
                  :active-id="activeAccordionIdAssistedLiving"
                  label="What is the cost of assisted living at Golden Gate Manor?"
                  :main-class="`bg-[#2E86AB] text-white rounded-lg overflow-hidden group ${activeAccordionIdAssistedLiving !== 'cost-of-assisted-living' ? 'hover:font-extrabold hover:bg-[#2E86AB]/50' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdAssistedLiving === 'cost-of-assisted-living' ? 'border-b border-b-white' : ''}`"
                  :content-class="`bg-[#2E86AB] px-4 py-2 ${activeAccordionIdAssistedLiving !== 'cost-of-assisted-living' ? 'group-hover:bg-[#2E86AB]/50' : ''}`"
                  @update:active-id="updateIdAssistedLiving">
                    <div class="space-y-4">
                      <p class="text-xl text-white">
                        Without insurance, out-of-pocket expenses depend on your monthly income, plus there would be monthly fees. The best answer regarding cost would be to contact us directly for a personalized quote.
                      </p>
                      <p class="text-xl text-white">
                        With Medicaid, there would be an out-of-pocket expense of $797, and Medicaid would cover the rest of the out-of-pocket expenses. There is also a specific amount of spending money allotted, which would require further conversations to understand the exact amount as it can change.
                      </p>
                      <p class="text-xl text-white">
                        <NuxtLink to="/company/contact-us" class="link">Contact us</NuxtLink> directly to discuss your specific situation and get accurate pricing information.
                      </p>
                    </div>
                </BaseInteractiveAccordionButton>
            </li>
            <li>
                <BaseInteractiveAccordionButton
                  id="whats-the-difference"
                  :active-id="activeAccordionIdAssistedLiving"
                  label="How is assisted living different from nursing homes?"
                  :main-class="`bg-[#2E86AB] text-white rounded-lg overflow-hidden group ${activeAccordionIdAssistedLiving !== 'whats-the-difference' ? 'hover:font-extrabold hover:bg-[#2E86AB]/50' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdAssistedLiving === 'whats-the-difference' ? 'border-b border-b-white' : ''}`"
                  :content-class="`bg-[#2E86AB] px-4 py-2 ${activeAccordionIdAssistedLiving !== 'whats-the-difference' ? 'group-hover:bg-[#2E86AB]/50' : ''}`"
                  @update:active-id="updateIdAssistedLiving">
                    <div class="space-y-4">
                      <p class="text-xl text-white">
                        Assisted living focuses on helping residents maintain their independence while providing support with daily activities like bathing, dressing, medication management, and meals. Residents typically have their own private or semi-private rooms and can come and go as they please.
                      </p>
                      <p class="text-xl text-white">
                        Nursing home care provides more intensive medical care and supervision for individuals who need constant medical attention or have complex health conditions. This includes 24-hour skilled nursing care, physical therapy, and more comprehensive medical services.
                      </p>
                      <p class="text-xl text-white">
                        At Golden Gate Manor, our assisted living services are designed for people who want to live independently but need some daily assistance. If you're unsure which level of care is appropriate, our staff can help assess your needs during a consultation.
                      </p>
                    </div>
                </BaseInteractiveAccordionButton>
            </li>
            <li>
                <BaseInteractiveAccordionButton
                  id="24-hour-staff"
                  :active-id="activeAccordionIdAssistedLiving"
                  label="Is there 24-hour staff available?"
                  :main-class="`bg-[#2E86AB] text-white rounded-lg overflow-hidden group ${activeAccordionIdAssistedLiving !== 'out-of-pocket' ? 'hover:font-extrabold hover:bg-[#2E86AB]/50' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdAssistedLiving === 'out-of-pocket' ? 'border-b border-b-white' : ''}`"
                  :content-class="`bg-[#2E86AB] px-4 py-2 ${activeAccordionIdAssistedLiving !== 'out-of-pocket' ? 'group-hover:bg-[#2E86AB]/50' : ''}`"
                  @update:active-id="updateIdAssistedLiving">
                    <p class="text-xl text-white">
                      Yes, Golden Gate Manor has staff available 24 hours a day to ensure the safety and well-being of our residents. Our trained staff members are on-site around the clock to assist with emergencies, provide support when needed, and give you and your family peace of mind knowing help is always available.
                    </p>
                </BaseInteractiveAccordionButton>
            </li>
            <li>
                <BaseInteractiveAccordionButton
                  id="schedule-a-tour"
                  :active-id="activeAccordionIdAssistedLiving"
                  label="Can I schedule a tour of the facility?"
                  :main-class="`bg-[#2E86AB] text-white rounded-lg overflow-hidden group ${activeAccordionIdAssistedLiving !== 'out-of-pocket' ? 'hover:font-extrabold hover:bg-[#2E86AB]/50' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdAssistedLiving === 'out-of-pocket' ? 'border-b border-b-white' : ''}`"
                  :content-class="`bg-[#2E86AB] px-4 py-2 ${activeAccordionIdAssistedLiving !== 'out-of-pocket' ? 'group-hover:bg-[#2E86AB]/50' : ''}`"
                  @update:active-id="updateIdAssistedLiving">
                    <div class="space-y-4">
                      <p class="text-xl text-white">
                        Absolutely! We encourage prospective residents and their families to schedule a tour of Golden Gate Manor. During your visit, you'll be able to see our facilities, meet our staff, learn about our services, and get a feel for our community atmosphere.
                      </p>
                      <p class="text-xl text-white">
                        To schedule a tour, please call us at <a href="tel:719-696-8032" class="link">719-696-8032</a> or <NuxtLink to="/company/contact-us" class="link">Contact Us</NuxtLink> through our website. We're happy to accommodate your schedule and answer any questions you may have during your visit.
                      </p>
                    </div>
                </BaseInteractiveAccordionButton>
            </li>
          </ul>
        </div>
        <div v-if="activeNavId === 'ggmc' || allActive" class="max-sm:mt-4">
          <h2 class="text-2xl font-bold text-brand-primary">Gas & Goods FAQ's</h2>
          <ul class="space-y-4 mt-4">
            <li>
                <BaseInteractiveAccordionButton
                  id="fuel-offered"
                  :active-id="activeAccordionIdGasStation"
                  label="What types of fuel do you offer?"
                  :main-class="`bg-[#ca8a04] text-white rounded-lg overflow-hidden group ${activeAccordionIdGasStation !== 'fuel-offered' ? 'hover:font-extrabold hover:bg-[#ca8a04]/50' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdGasStation === 'fuel-offered' ? 'border-b border-b-white' : ''}`"
                  :content-class="`bg-[#ca8a04] px-4 py-2 ${activeAccordionIdGasStation !== 'fuel-offered' ? 'group-hover:bg-[#ca8a04]/50' : ''}`"
                  @update:active-id="updateIdGasStation">
                    <div class="space-y-4">
                      <p class="text-xl text-white">
                        We offer regular (87 octane), mid-grade (89 octane), and premium (93 octane) unleaded fuels, as well as diesel fuel for trucks and commercial vehicles.
                      </p>
                      <p class="text-xl text-white">
                        All of our fuel comes from Conoco brand fuel lines, which includes TOP TIER™ detergent additives to help keep your engine clean and running efficiently. Our fuel pumps are regularly inspected and maintained to ensure quality and accuracy.
                      </p>
                    </div>
                </BaseInteractiveAccordionButton>     
            </li>
            <li>
                <BaseInteractiveAccordionButton
                  id="accepted-payments"
                  :active-id="activeAccordionIdGasStation"
                  label="Do you accept credit cards and EBT/SNAP?"
                  :main-class="`bg-[#ca8a04] text-white rounded-lg overflow-hidden group ${activeAccordionIdGasStation !== 'accepted-payments' ? 'hover:font-extrabold hover:bg-[#ca8a04]/50' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdGasStation === 'accepted-payments' ? 'border-b border-b-white' : ''}`"
                  :content-class="`bg-[#ca8a04] px-4 py-2 ${activeAccordionIdGasStation !== 'accepted-payments' ? 'group-hover:bg-[#ca8a04]/50' : ''}`"
                  @update:active-id="updateIdGasStation">
                    <div class="space-y-4">
                      <p class="text-xl text-white">
                        We accept all major credit cards including Visa, Mastercard, American Express, and Discover, as well as cash payments. We also accept fleet cards and commercial accounts. 
                      </p>
                      <p class="text-xl text-white">
                        We will be providing EBT/SNAP services in the future to better serve our community, so stay tuned for updates on when this service becomes available.
                      </p>
                    </div>
                </BaseInteractiveAccordionButton>     
            </li>
            <li>
                <BaseInteractiveAccordionButton
                  id="convenience-items"
                  :active-id="activeAccordionIdGasStation"
                  label="What convenience store items do you carry?"
                  :main-class="`bg-[#ca8a04] text-white rounded-lg overflow-hidden group ${activeAccordionIdGasStation !== 'convenience-items' ? 'hover:font-extrabold hover:bg-[#ca8a04]/50' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdGasStation === 'convenience-items' ? 'border-b border-b-white' : ''}`"
                  :content-class="`bg-[#ca8a04] px-4 py-2 ${activeAccordionIdGasStation !== 'convenience-items' ? 'group-hover:bg-[#ca8a04]/50' : ''}`"
                  @update:active-id="updateIdGasStation">
                    <div class="space-y-4">
                      <p class="text-xl text-white">
                        We carry a full range of convenience items to meet your daily needs. Our selection includes popular snack brands, candy, fresh slushies in multiple flavors, F'Real ice cream shakes and smoothies made fresh, cold beer, a variety of sodas and energy drinks, chips, jerky, and various refrigerated items including sandwiches, dairy products, and grab-and-go meals. We also stock basic household items, phone chargers, and travel essentials.
                      </p>
                    </div>
                </BaseInteractiveAccordionButton>     
            </li>
            <li>
                <BaseInteractiveAccordionButton
                  id="atm-inside"
                  :active-id="activeAccordionIdGasStation"
                  label="Do you have an ATM on-site?"
                  :main-class="`bg-[#ca8a04] text-white rounded-lg overflow-hidden group ${activeAccordionIdGasStation !== 'atm-inside' ? 'hover:font-extrabold hover:bg-[#ca8a04]/50' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdGasStation === 'atm-inside' ? 'border-b border-b-white' : ''}`"
                  :content-class="`bg-[#ca8a04] px-4 py-2 ${activeAccordionIdGasStation !== 'atm-inside' ? 'group-hover:bg-[#ca8a04]/50' : ''}`"
                  @update:active-id="updateIdGasStation">
                    <div class="space-y-4">
                      <p class="text-xl text-white">
                        Yes, we have a convenient ATM located inside our store with a $2.50 transaction fee. The ATM is available during store hours and accepts most major bank cards. It dispenses $20 bills and provides balance inquiries and mini-statements.
                      </p>
                    </div>
                </BaseInteractiveAccordionButton>     
            </li>
            <li>
                <BaseInteractiveAccordionButton
                  id="automotive-supplies"
                  :active-id="activeAccordionIdGasStation"
                  label="Do you carry automotive supplies (oil, windshield fluid, etc.)?"
                  :main-class="`bg-[#ca8a04] text-white rounded-lg overflow-hidden group ${activeAccordionIdGasStation !== 'automotive-supplies' ? 'hover:font-extrabold hover:bg-[#ca8a04]/50' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdGasStation === 'automotive-supplies' ? 'border-b border-b-white' : ''}`"
                  :content-class="`bg-[#ca8a04] px-4 py-2 ${activeAccordionIdGasStation !== 'automotive-supplies' ? 'group-hover:bg-[#ca8a04]/50' : ''}`"
                  @update:active-id="updateIdGasStation">
                    <div class="space-y-4">
                      <p class="text-xl text-white">
                        Yes, we carry essential automotive supplies to help keep you on the road. Our selection includes various grades of motor oil, windshield washer fluid, antifreeze, brake fluid, gas cans in different sizes, basic tools like screwdrivers and wrenches, jumper cables, tire pressure gauges, air fresheners, and emergency road kits. We stock trusted brands and can help you find the right products for your vehicle.
                      </p>
                    </div>
                </BaseInteractiveAccordionButton>     
            </li>
            <li>
                <BaseInteractiveAccordionButton
                  id="sell-lottery"
                  :active-id="activeAccordionIdGasStation"
                  label="Do you sell lottery tickets?"
                  :main-class="`bg-[#ca8a04] text-white rounded-lg overflow-hidden group ${activeAccordionIdGasStation !== 'sell-lottery' ? 'hover:font-extrabold hover:bg-[#ca8a04]/50' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdGasStation === 'sell-lottery' ? 'border-b border-b-white' : ''}`"
                  :content-class="`bg-[#ca8a04] px-4 py-2 ${activeAccordionIdGasStation !== 'sell-lottery' ? 'group-hover:bg-[#ca8a04]/50' : ''}`"
                  @update:active-id="updateIdGasStation">
                  <div class="space-y-4">
                    <p class="text-xl text-white">
                      Yes, we're an authorized retailer working with Colorado Lottery to provide a full range of lottery options. We sell scratch tickets in various price points from $1 to $30, as well as draw games including Powerball, Mega Millions, Colorado Lotto+, Cash 5, and Pick 3. We can also cash winning tickets up to $500. Our lottery terminal is updated with the latest jackpot amounts and drawing information.
                    </p>
                  </div>
                </BaseInteractiveAccordionButton>     
            </li>
          </ul>
        </div>
      </BaseLayoutPageSection>
    </Transition>
  </div>
</template>

<script setup lang='ts'>
definePageMeta({
  title: 'FAQs for Golden Gate Manor Inc.',
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

const activeAccordionIdGasStation = ref<string>('')
const updateIdGasStation = (val: string) => activeAccordionIdGasStation.value = val

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