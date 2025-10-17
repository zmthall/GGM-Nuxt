<template>
  <div class="max-sm:mt-4 accordion-panel">
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
            <div v-once class="space-y-4">
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
              <div v-once>
                <p class="text-xl text-white">
                  Reach out to your insurance provider to see if the item you are requesting is covered by your insurance.
                </p>
              </div>
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
              <div v-once>
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
              </div>
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
              <div v-once>
                <p class="text-xl text-white">
                  If you are looking to get medical equipment or supplies, you do not have to go through a prescriber to get the items you need. Before purchasing any items out of pocket, speak to a doctor or physician or practitioner to make sure you are getting the right items for the needs that you have. Ask about our unique rent-to-own programs so that we can help make the process more affordable.
                </p>
              </div>
          </BaseInteractiveAccordionButton>
        </li>
      </ul>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'update:accordionId', id: string): void;
}>()

const activeAccordionIdMedical = ref<string>('')

const updateIdMedical = (id: string) => {
  activeAccordionIdMedical.value = id
  emit('update:accordionId', id);
}


</script>

<style>

</style>