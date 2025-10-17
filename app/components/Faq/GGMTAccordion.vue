<template>
  <div class="accordion-panel">
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
                <div v-once>
                  <p class="text-xl text-white">
                    Your client may be eligible if they have a
                    current Medicaid Insurance ID and are going
                    to a Medicaid approved appointment.
                  </p>
                </div>
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
              <div v-once class="space-y-4">
                <p class="text-xl text-white">
                  To help us serve you better, please schedule your ride
                  at least 24 hours in advance by calling <a :href="`tel:${company?.trans.phone.office}`" class="link-light">{{ company?.trans.phone.office }}</a> between 8:00 AM
                  and 4:00 PM, Monday through Friday. This allows us the
                  necessary time to arrange your transportation efficiently.
                </p>
                <p class="text-xl text-white">
                  If it is after normal business hours, call our dispatch at
                  <a :href="`tel:${company?.trans.phone.dispatch}`" class="link-light">
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
              <div v-once class="space-y-4">
                <p class="text-xl text-white">
                  If you need to cancel a ride, please call at least two hours
                  before your scheduled pick-up time at <a 
                
                  :href="`tel:${company?.trans.phone.office}`" class="link-light">{{ company?.trans.phone.office }}</a>.
                </p>
                <p class="text-xl text-white">
                  If it is after
                  normal business hours, call our dispatch at
                  <a :href="`tel:${company?.trans.phone.dispatch}`" class="link-light">
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
                <div v-once>
                  <p class="text-xl text-white">
                    We provide transportation assistance for
                    those services covered by Medicaid. We cannot
                    transport to services not covered under the
                    Medicaid program.
                  </p>
                </div>
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
              <div v-once class="space-y-4">
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
                rel="noopener noreferrer" class="p-2 mb-4 mt-8" variant="secondary">
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
              <div v-once>
                <p class="text-xl text-white">
                  When you call us for a ride, we will give you
                  the timeframe you should be ready to be
                  picked up by. For shared rides, you may be asked
                  to be ready earlier than expected. Unexpected
                  delays may occur due to traffic or weather
                  conditions.
                </p>
              </div>
            </BaseInteractiveAccordionButton>
          </li>
        </ul>
  </div>
</template>

<script lang="ts" setup>
import company from '../../data/company.json'

const emit = defineEmits<{
  (e: 'update:accordionId', id: string): void;
}>()

const activeAccordionIdTrans = ref<string>('')

const updateIdTrans = (id: string) => {
  activeAccordionIdTrans.value = id
  emit('update:accordionId', id);
}

</script>

<style>

</style>