<template>
  <div class="accordion-panel">
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
        <li><a href="/pdfs/nemt/nemt-app&medical-certificate-of-trans-services.pdf" class="link" target="_blank" rel="noopener noreferrer">NEMT Application Form</a></li>
        <li><a href="/pdfs/nemt/Consent&Liability-Release-for-Minors.pdf" class="link" target="_blank" rel="noopener noreferrer">NEMT Consent & Liability Release for Minors Form</a></li>
        <li><a href="/pdfs/applications/driver-application.pdf" class="link" target="_blank" rel="noopener noreferrer">Transportation - Driver Application</a></li>
        <li><a href="/pdfs/applications/general-application.pdf" class="link" target="_blank" rel="noopener noreferrer">General Application</a></li>
        <li><a href="/pdfs/applications/house-application.pdf" class="link" target="_blank" rel="noopener noreferrer">Assisted Living - QMAP/PCP Application</a></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
const activeAccordionIdTrans = ref<string>('')

const updateIdTrans = (val: string) => activeAccordionIdTrans.value = val

</script>

<style>

</style>