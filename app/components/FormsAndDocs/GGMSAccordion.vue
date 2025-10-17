<template>
  <div class="max-sm:mt-4 accordion-panel">
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
            <div v-once class="space-y-4">
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
          <div v-once class="space-y-4">
              <PleaseNote dark-mode>Each order is different depending on the needs being fulfilled.</PleaseNote>
              <p class="text-xl text-white">
                For additional details, <a href="https://www.cms.gov/data-research/monitoring-programs/medicare-fee-service-compliance-programs/medical-review-and-education/dmepos-order-requirements" target="_blank" rel="noopener noreferrer" class="link">visit cms.gov</a> to learn about the order requirements for Durable Medical Equipment.
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
        <li><a href="/pdfs/dme/Physicians_Mobility_Order_Form.pdf" class="link" target="_blank" rel="noopener noreferrer">Physicians Mobility Order Form</a></li>
        <li><a href="/pdfs/dme/Group_1_Support_Surfaces.pdf" class="link" target="_blank" rel="noopener noreferrer">Group 1 Support Surfaces</a></li>
        <li><a href="/pdfs/dme/Group_2_Support_Surfaces.pdf" class="link" target="_blank" rel="noopener noreferrer">Group 2 Support Surfaces</a></li>
        <li><a href="/pdfs/dme/Certificate_of_Medical_Necessity_Manual_Wheelchairs.pdf" class="link" target="_blank" rel="noopener noreferrer">Certificate of Medical Necessity (Manual Wheelchairs)</a></li>
        <li><a href="/pdfs/dme/Prior_Authorization_Request_Hospital_Bed.pdf" class="link" target="_blank" rel="noopener noreferrer">Prior Authorization Request (Hospital Bed)</a></li>
        <li><a href="/pdfs/dme/Prior_Authorization_Request_Pressure_Release_Mattress.pdf" class="link" target="_blank" rel="noopener noreferrer">Prior Authorization Request (Pressure Release Mattress)</a></li>
        <li><a href="/pdfs/dme/Prior_Authorization_Request_Lift.pdf" class="link" target="_blank" rel="noopener noreferrer">Prior Authorization Request (Lift)</a></li>
        <li><a href="/pdfs/dme/Prior_Authorization_Request_TENS_or_NMES.pdf" class="link" target="_blank" rel="noopener noreferrer">Prior Authorization Request (TENS or NMES)</a></li>
        <li><a href="/pdfs/dme/Prior_Authorization_Request_Orthotics_and_Prosthetics.pdf" class="link" target="_blank" rel="noopener noreferrer">Prior Authorization Request (Orthotics and Prosthetics - Adults 21+)</a></li>
        <li><a href="/pdfs/dme/Prior_Authorization_Request_Wheelchair_Tilt_or_Recline_Device.pdf" class="link" target="_blank" rel="noopener noreferrer">Prior Authorization Request (Wheelchair Tilt or Recline Device)</a></li>
        <li><a href="/pdfs/dme/Prior_Authorization_Request_Blood_Pressure_Unit_or_Monitor.pdf" class="link" target="_blank" rel="noopener noreferrer">Prior Authorization Request (Blood Pressure Unit or Monitor)</a></li>
    </ul>

    </div>
  </div>
</template>

<script lang="ts" setup>
const activeAccordionIdMedical = ref<string>('')
const updateIdMedical = (val: string) => activeAccordionIdMedical.value = val

</script>

<style>

</style>