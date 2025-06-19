<template>
  <div>
    <BaseInteractiveModal v-model="noticeModalOpen" hide-close small-modal>
      <h2 class="text-2xl font-bold text-brand-primary pb-2 border-b border-b-brand-primary mb-4">Important Notice</h2>
      <div class="space-y-4">
        <p class="text-xl text-brand-main-text">
          Please be aware that submitting an application does not guarantee it will be reviewed. Due to the volume of applications we receive and the fact that not all positions are actively hiring at all times, only applications that align with our current needs and qualifications will be considered. As such, not all applicants will be contacted for an interview or further steps in the hiring process.
        </p>
        <p class="text-xl text-brand-main-text">
          We appreciate your interest in joining Golden Gate Manor Inc., and encourage you to apply for future opportunities as positions become available.
        </p>
      </div>
      <div class="flex gap-2 mt-8">
        <BaseUiAction type="button" class="p-1" @click="cancelModal">Cancel</BaseUiAction>
        <BaseUiAction type="button" class="p-1" @click="continueModal">Continue</BaseUiAction>
      </div>
    </BaseInteractiveModal>
    <BaseInteractiveModal v-model="attestationModalOpen" hide-close>
      <template #default>
        <div class="p-4">
          <h2 class="text-2xl font-bold text-brand-primary pb-2 border-b border-b-brand-primary mb-4">Application Agreement/Attestation</h2>
          <div class="space-y-4">
            <div>
              <p class="text-xl text-brand-main-text">
                <span class="underline font-bold">Overview:</span> Golden Gate Manor, Inc. is committed to ensuring that the information provided in this application is used fairly, ethically, and in compliance with applicable federal, state, and local laws, including the Job Application Fairness Act (SB23-058). By submitting this application, applicants attest that all information provided will be accurate, honest, and complete to the best of their knowledge. Golden Gate Manor, Inc. reserves the right to terminate employment or withdraw an offer of employment if it is discovered that any part of the information provided is false or misleading.
              </p>
            </div>
    
            <div>
              <h3 class="text-xl font-bold">Equal Employment Opportunity (EEO)</h3>
              <p class="text-xl text-brand-main-text">
                Golden Gate Manor, Inc. is an equal opportunity employer. Our hiring practices are based solely on job-related criteria. We do not discriminate based on race, color, religion, national origin, sex, age, disability, veteran status, genetic information, sexual orientation, gender identity, marital status, or any other protected characteristic.
              </p>
            </div>
    
            <div>
              <h3 class="text-xl font-bold">Non-Discrimination and Fairness</h3>
              <div class="space-y-4">
                <p class="text-xl text-brand-main-text">
                  In accordance with the Job Application Fairness Act, which became effective July 1, 2024, we will not request or require age-related information, including date of birth and dates of attendance at or graduation from educational institutions, on this initial employment application. All forms of information requested that may hold personal information, such as birthdays, graduation dates, etc., can either be blacked out/covered or removed at the discretion of the applicant. Our hiring practices ensure fairness and equality for all candidates. Any information provided will not be used in a discriminatory manner.
                </p>
                <p class="text-xl text-brand-main-text">
                  Golden Gate Manor, Inc. strictly adheres to non-discrimination policies. We will not inquire about or use the following protected characteristics to determine an applicant’s eligibility for employment: race, color, national origin, sex, age, religion, veteran or military status, disability, genetic information, or any other characteristic protected under federal, state, or local law. This includes avoiding any questions that may directly or indirectly reveal these characteristics. Exceptions may apply where necessary to comply with legal, regulatory, or job-specific requirements.
                </p>
                <p class="text-xl text-brand-main-text">
                  For certain positions that have specific legal or regulatory requirements related to age, public safety, or occupational qualifications, applicants may be asked to verify compliance with such requirements. Any such requests will be made transparently and in compliance with all applicable laws.
                </p>
              </div>
            </div>
    
            <div>
              <h3 class="text-xl font-bold">What We Avoid</h3>
              <ul class="ml-8 list-disc">
                <li>
                  <p class="text-xl text-brand-main-text">
                    We do not ask for age, date of birth, or high school graduation dates.
                  </p>
                  <ul class="ml-8 list-square">
                    <li>
                      <p class="text-xl text-brand-main-text">
                        <PleaseNote>If any of this information is present in the application materials submitted, the applicant may remove or cover it at their discretion.</PleaseNote>
                      </p>
                    </li>
                  </ul>
                </li>
                <li>
                  <p class="text-xl text-brand-main-text">
                    Questions related to disability status, medical history, and personal characteristics that are unrelated to job performance are not included.
                  </p>
                </li>
              </ul>
            </div>
    
            <div>
              <h3 class="text-xl font-bold">Background Check Requirement</h3>
              <div class="space-y-4">
                <p class="text-xl text-brand-main-text">
                  If your application progresses, you will be required to visit our office to complete a form authorizing a background check. This background check must be completed and must meet our company, state, and federal hiring criteria before we can proceed with the interview process or consider you for any open position. Any background checks, including inquiries into criminal history, will be conducted in compliance with applicable federal, state, and local laws, such as the Fair Credit Reporting Act (FCRA), or Ban the Box laws such as the Chance to Compete Act (CTC). Any sensitive information obtained will be treated confidentially in compliance with privacy laws.
                </p>
                <p class="text-xl text-brand-main-text">
                  Our company operates in industries that require compliance with local, state, and federal regulations/guidelines. Due to the nature of our work—handling sensitive information such as Protected Health Information (PHI), confidential records, and passenger safety—we are obligated to conduct thorough background checks. This includes inquiring about criminal history, where criminal history will be evaluated based on job-relatedness, the nature of the offense, and any applicable legal requirements, including consideration of rehabilitation.
                </p>
              </div>
            </div>
    
            <div>
              <h3 class="text-xl font-bold">Open Positions and Ongoing Applications</h3>
              <p class="text-xl text-brand-main-text">
                While we are always accepting applications, not all positions are currently open for hiring. Submission of this application form does not guarantee an interview or employment. If a position becomes available and your qualifications meet our needs, we will reach out to you. You are welcome to call and inquire about the status of your application, but please note that the position may not be open for hiring at that time.
              </p>
            </div>
    
            <div>
              <h3 class="text-xl font-bold">Use of Application Information</h3>
              <div class="space-y-4">
                <p class="text-xl text-brand-main-text">
                  All information submitted in this application is used solely for the purpose of evaluating your candidacy for employment. This information will remain confidential. During our hiring process, only individuals authorized to review applications are allowed to do so.
                </p>
                <p class="text-xl text-brand-main-text">
                  All sensitive information will be safeguarded in compliance with privacy regulations, which will be used only for lawful purposes. Any sensitive information will also be stored securely and will only be accessible by authorized personnel for lawful purposes in compliance with applicable data protection regulations.
                </p>
                <p class="text-xl text-brand-main-text">
                  Due to the nature of our business and the requirement to uphold federal, state, and local guidelines and regulations, in addition to evaluating your candidacy, your information may be used for legal compliance, defending against legal claims, or other lawful purposes in accordance with federal, state, and local regulations.
                </p>
              </div>
            </div>
    
            <div>
              <h3 class="text-xl font-bold">Probationary Period</h3>
              <p class="text-xl text-brand-main-text">
                All new hires will be subject to a three-month probationary period. During this time, your performance and suitability for the position will be evaluated, and employment continuation will be assessed. Completion of the probationary period does not alter the at-will nature of employment, and both the employee and Golden Gate Manor, Inc. retain the right to terminate the employment relationship at any time, for any reason, with or without cause or notice.
              </p>
            </div>
    
            <div>
              <h3 class="text-xl font-bold">Ongoing Application Review</h3>
              <p class="text-xl text-brand-main-text">
                We emphasize that not all positions are open for hiring at all times, but we accept and consider all applications. If we determine that your skills and qualifications align with the needs of an open position, we will contact you. If no suitable open positions are available at the time of your application, we will retain your application for future consideration. Applications will be kept on file for a period of three months, or longer if required by applicable federal, state, or local regulations, during which they may be considered for future openings. <PleaseNote class="mt-4">We may not have the capacity to contact every applicant.</PleaseNote>
              </p>
            </div>
    
            <div>
              <h3 class="text-xl font-bold">Attestation</h3>
              <p class="text-xl text-brand-main-text">
                By checking the box below, I confirm that I have read and agree to the terms of this application agreement, and I attest that all the information that will be provided in this application is true and accurate. I understand that any misrepresentation or omission of information may result in the termination of the application process or employment if hired.
              </p>
            </div>
          </div>
        </div>
      </template>
      <template #attestation>
        <div class="flex justify-between">
          <BaseFormCheckbox v-model="attestationCheckbox" name="apply-attestation" :class="[{'outline outline-red-600 p-1': attestationError}]">I agree and certify the information will be true and correct.</BaseFormCheckbox>
          <BaseUiAction type="button" class="p-1" @click="continueAttestation">Continue</BaseUiAction>
        </div>
      </template>
    </BaseInteractiveModal>
  </div>
</template>

<script lang="ts" setup>
const noticeModalOpen = ref<boolean>(true);
const attestationModalOpen = ref<boolean>(false);
const attestationCheckbox = ref<boolean>(false)
const attestationError = ref<boolean>(false);

const cancelModal = () => {
  document.body.classList.remove('no-scroll');
  navigateTo('/company/employment');
}

const continueModal = () => {
  noticeModalOpen.value = false;
  attestationModalOpen.value = true;
}

const continueAttestation = () => {
  if(attestationCheckbox.value) {
    attestationModalOpen.value = false;
    document.body.classList.remove('no-scroll')
  } else
    attestationError.value = true;
}

onMounted(() => {
  document.body.classList.add('no-scroll');
})
</script>

<style>

</style>