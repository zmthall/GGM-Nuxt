<template>
    <div class="flex py-8 sm:px-4 gap-4 max-w-[1000px] mx-auto">
        <BaseLayoutAsideNav class="w-1/4 max-sm:hidden" :navigation-items="navItems" @update-nav="updateNav"/>
        <Transition name="fade" mode="out-in">
          <BaseLayoutPageSection :key="activeNavId" class="w-3/4">
            <div v-if="activeNavId === 'ggmt' || allActive">
              <h2 class="text-2xl font-bold text-brand-primary">Transportation Forms & Documents</h2>
              <ul class="space-y-4 mt-4">
                <li>
                  <BaseInteractiveAccordionButton
                    id="information-for-clients"
                    :active-id="activeAccordionIdTrans"
                    label="Information for Clients"
                    :main-class="`bg-brand-primary text-white rounded-lg overflow-hidden group text-white ${activeAccordionIdTrans !== 'information-for-clients' ? 'hover:font-extrabold hover:bg-brand-primary/80' : ''}`"
                    :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdTrans === 'information-for-clients' ? 'border-b border-b-white' : ''}`"
                    :content-class="`bg-brand-primary px-4 py-2 ${activeAccordionIdTrans !== 'information-for-clients' ? 'group-hover:bg-brand-primary/80' : ''}`"
                    @update:active-id="updateIdTrans">
                      <div>
                        <p class="text-xl text-white mb-4">
                            You may be eligible if you have a current Medicaid Insurance ID and are going to a Medicaid approved appointment.
                        </p>
                        
                        <div class="mb-6 space-y-4">
                          <div>
                            <p class="text-xl text-white font-semibold">
                                Before You Become a Client:
                            </p>
                            <p class="text-xl text-white">
                                Before you can be considered a client of Golden Gate Manor Inc, you must first complete our application and information disclosure form. 
                            </p>
                          </div>
                            <p class="text-xl text-white">
                                <span class="font-semibold">Important:</span> Please ensure you have your doctor's signature on all required forms. Having these signatures in advance will simplify the process and allow you to start utilizing our services much quicker.
                            </p>
                            <p class="text-xl text-white">
                                Once all paperwork has been submitted and completed appropriately, you can begin scheduling rides with us either through our online form or by contacting us directly.
                            </p>
                        </div>
                        
                        <div>
                            <p class="text-lg font-semibold">
                                Steps to becoming a Golden Gate Manor Transportation client:
                            </p>
                            <ol class="ml-8 list-decimal text-xl text-white">
                                <li>Complete application and information disclosure form</li>
                                <li>Obtain doctor's signature on required forms</li>
                                <li>Submit all completed paperwork</li>
                                <li>Begin scheduling rides via online form or direct contact</li>
                            </ol>
                        </div>
                    </div>
                  </BaseInteractiveAccordionButton>
                </li>
              </ul>
              <div class="mt-4">
                <h3 class="text-xl font-bold text-brand-primary">Non-Emergency Transportation Application</h3>
                <ul class="ml-8 list-disc text-xl">
                  <li><a href="/pdfs/nemt/nemt-app&medical-certificate-of-trans-services.pdf" class="link" target="_blank" rel="noopener">NEMT Application Form</a></li>
                </ul>
              </div>
            </div>
            <div v-if="activeNavId === 'ggms' || allActive">
              <h2 class="text-2xl font-bold text-brand-primary">Medical Supply Forms & Documents</h2>
              <ul class="space-y-4 mt-4">
                <li>
                  <BaseInteractiveAccordionButton
                    id="information-for-patients"
                    :active-id="activeAccordionIdMedical"
                    label="Information for Patients"
                    :main-class="`bg-brand-medical-primary text-white rounded-lg overflow-hidden group ${activeAccordionIdMedical !== 'information-for-patients' ? 'hover:font-extrabold hover:bg-brand-medical-primary/50' : ''}`"
                    :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdMedical === 'information-for-patients' ? 'border-b border-b-white' : ''}`"
                    :content-class="`bg-brand-medical-primary px-4 py-2 ${activeAccordionIdMedical !== 'information-for-patients' ? 'group-hover:bg-brand-medical-primary/50' : ''}`"
                    @update:active-id="updateIdMedical">
                      <div class="space-y-4">
                        <p class="text-xl text-white">
                          All medical equipment orders through insurance must be filled using a prescribing medical professional. All pertinent information for any orders involving insurance will be completed by a physician or practitioner through the forms provided. Once this information has been submitted by a qualified prescribing medical professional, the order can be moved forward by our DME Specialists. Please, allow time to gather the information from the prescribing physician/practitioner so that the request process can be completed properly. If there are any questions or concerns about the status of a current request please contact our DME Specialists with <a href="tel:719-569-7361" class="link-light">719-569-7361</a> or through <a href="mailto:customersupport@goldengatemedicalsupply.com" class="link-light">email</a>.
                        </p>
                        <div>
                          <p class="text-xl text-white font-bold">
                            Unsure your insurance policy will cover specific medical equipment?:
                          </p>
                          <ul class="ml-8 list-disc">
                            <li class="text-xl text-white">
                              If you are unsure about the insurance coverage of a specific item that you are trying to request, contact your insurance provider to receive accurate information relating to their current coverage.
                            </li>
                          </ul>
                        </div>
                      </div>
                  </BaseInteractiveAccordionButton>
                </li>
                <li>
                  <BaseInteractiveAccordionButton
                    id="whats-needed-for-orders"
                    :active-id="activeAccordionIdMedical"
                    label="What do we need for orders?"
                    :main-class="`bg-brand-medical-primary text-white rounded-lg overflow-hidden group ${activeAccordionIdMedical !== 'whats-needed-for-orders' ? 'hover:font-extrabold hover:bg-brand-medical-primary/50' : ''}`"
                    :button-class="`px-4 py-2 w-full text-left ${activeAccordionIdMedical === 'whats-needed-for-orders' ? 'border-b border-b-white' : ''}`"
                    :content-class="`bg-brand-medical-primary px-4 py-2 ${activeAccordionIdMedical !== 'whats-needed-for-orders' ? 'group-hover:bg-brand-medical-primary/50' : ''}`"
                    @update:active-id="updateIdMedical">
                    <div class="space-y-4">
                        <PleaseNote dark-mode>Each order is different depending on the needs being fulfilled.</PleaseNote>
                        <p class="text-xl text-white">
                          For additional details, <a href="https://www.cms.gov/data-research/monitoring-programs/medicare-fee-service-compliance-programs/medical-review-and-education/dmepos-order-requirements" target="_blank" rel="noopener nofollow noreferrer" class="link">visit cms.gov</a> to learn about the order requirements for Durable Medical Equipment.
                        </p>
                        <div>
                          <p class="text-xl text-white font-bold">
                            This is a general list of requirements for order fulfillment:
                          </p>
                          <ul class="text-xl text-white ml-8 list-disc">
                            <li>
                              Face to Face documentation - face to face notes will address reasons for necessity while also showing direct conversation with a certifying practitioner, physician or qualified non-physician practitioner (NPP). These are sent from the notes of the prescribing physician or practitioner.
                            </li>
                            <li>
                              An up to date list of recently prescribed durable medical equipment or supplies.
                            </li>
                            <li>
                              A clear scan of front and back of insurance card providing the patient's name, date of birth, and insurance policy number.
                            </li>
                            <li>
                              All forms filled and sent over from the prescribing physician or practitioner.
                            </li>
                          </ul>
                        </div>
                      </div>
                  </BaseInteractiveAccordionButton>
                </li>
              </ul>
              <div class="mt-4">
                <h3 class="text-2xl font-bold text-brand-primary">Physician Forms</h3>
                <ul class="ml-8 list-disc text-xl">
                  <li><a href="/pdfs/dme/Physicians_Mobility_Order_Form.pdf" class="link" target="_blank" rel="noopener">Physicians Mobility Order Form</a></li>
                  <li><a href="/pdfs/dme/Group_1_Support_Surfaces.pdf" class="link" target="_blank" rel="noopener">Group 1 Support Surfaces</a></li>
                  <li><a href="/pdfs/dme/Group_2_Support_Surfaces.pdf" class="link" target="_blank" rel="noopener">Group 2 Support Surfaces</a></li>
                  <li><a href="/pdfs/dme/Certificate_of_Medical_Necessity_Manual_Wheelchairs.pdf" class="link" target="_blank" rel="noopener">Certificate of Medical Necessity (Manual Wheelchairs)</a></li>
                  <li><a href="/pdfs/dme/Prior_Authorization_Request_Hospital_Bed.pdf" class="link" target="_blank" rel="noopener">Prior Authorization Request (Hospital Bed)</a></li>
                  <li><a href="/pdfs/dme/Prior_Authorization_Request_Pressure_Release_Mattress.pdf" class="link" target="_blank" rel="noopener">Prior Authorization Request (Pressure Release Mattress)</a></li>
                  <li><a href="/pdfs/dme/Prior_Authorization_Request_Lift.pdf" class="link" target="_blank" rel="noopener">Prior Authorization Request (Lift)</a></li>
                  <li><a href="/pdfs/dme/Prior_Authorization_Request_TENS_or_NMES.pdf" class="link" target="_blank" rel="noopener">Prior Authorization Request (TENS or NMES)</a></li>
                  <li><a href="/pdfs/dme/Prior_Authorization_Request_Orthotics_and_Prosthetics.pdf" class="link" target="_blank" rel="noopener">Prior Authorization Request (Orthotics and Prosthetics - Adults 21+)</a></li>
                  <li><a href="/pdfs/dme/Prior_Authorization_Request_Wheelchair_Tilt_or_Recline_Device.pdf" class="link" target="_blank" rel="noopener">Prior Authorization Request (Wheelchair Tilt or Recline Device)</a></li>
                  <li><a href="/pdfs/dme/Prior_Authorization_Request_Blood_Pressure_Unit_or_Monitor.pdf" class="link" target="_blank" rel="noopener">Prior Authorization Request (Blood Pressure Unit or Monitor)</a></li>
              </ul>

              </div>
            </div>
          </BaseLayoutPageSection>
        </Transition>
    </div>
</template>

<script setup lang='ts'>
definePageMeta({
  title: 'Useful Forms & Documents',
  breadcrumbLabel: 'Forms & Docs'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Useful Forms & Documents',
  ogTitle: 'Useful Forms & Documents',
  description: 'Access important forms and documents from Golden Gate Manor Inc., making transportation and assisted living processes convenient and stress-free.',
  ogDescription: 'Access important forms and documents from Golden Gate Manor Inc., making transportation and assisted living processes convenient and stress-free.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Useful Forms & Documents',
  twitterDescription: 'Access important forms and documents from Golden Gate Manor Inc., making transportation and assisted living processes convenient and stress-free.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

const navItems = reactive([
  { id: 'ggmt', name: 'Transportation', active: true},
  { id: 'ggms', name: 'Medical Supply', active: false},
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

const activeAccordionIdMedical = ref<string>('')
const updateIdMedical = (val: string) => activeAccordionIdMedical.value = val

const activeAccordionIdTrans = ref<string>('')
const updateIdTrans = (val: string) => activeAccordionIdTrans.value = val

const debouncedResize = useDebounce(handleResize, 50)

onMounted(() => {
  window.addEventListener('resize', debouncedResize)
  // Check initial size
  handleResize()
})

onUnmounted(() => {
  window.removeEventListener('resize', debouncedResize)
})

defineOptions({
    name: 'UsefulFormsPage'
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