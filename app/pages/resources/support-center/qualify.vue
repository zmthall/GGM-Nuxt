<template>
    <div>
        <BaseLayoutPageSection margin="top">
          <BaseLayoutPageContainer>
            <div class="flex flex-col lg:flex-row gap-8 items-center">
              <div class="max-w-[600px] lg:w-1/2 aspect-[3/2] object-cover sm:rounded-lg sm:shadow-primary overflow-hidden">
                <NuxtImg 
                  src="/images/pages/qualify/qualify-top.jpg" 
                  quality="60" format="webp,avif"
                  width="600" height="400"
                  :preload="{ fetchPriority: 'high' }"
                  loading="eager"
                  placeholder
                  sizes="md:600px 100vw"
                  densities="x1 x2"
                  class="w-full h-full" 
                  alt="Woman stressed from paperwork"
                />
              </div>
              <div class="space-y-4 lg:w-1/2">
                <div class="space-y-2">
                  <h2 class="text-2xl font-bold text-brand-primary">A Complete Guide to Non-Emergent Medical Transportation Eligibility</h2>
                  <p class="text-xl text-brand-main-text">
                    Understanding whether you qualify for Non-Emergent Medical Transportation (NEMT) services is the first step toward accessing reliable transportation to your medical appointments. This guide will walk you through all the requirements and help you determine your eligibility for services with Golden Gate Manor Transportation. We understand how things can seem complicated, especially without any help, and that's why our team is available during any step in the process.
                  </p>
                  <div class="flex justify-center">
                    <BaseUiAction to="/company/contact-us" class="py-4 px-8">Reach Out for Help</BaseUiAction>
                  </div>
                </div>
              </div>
            </div>
          </BaseLayoutPageContainer>
        </BaseLayoutPageSection>
        <DeferRender when="visible">
          <BaseLayoutPageSection margin="default" bg="alt" class="cv-auto">
            <BaseLayoutPageContainer>
              <div class="space-y-4">
                <div class="space-y-2">
                  <h2 class="text-2xl font-bold text-brand-primary">What is NEMT Eligibility?</h2>
                  <p class="text-xl text-brand-main-text">
                    NEMT is a Health First Colorado (Colorado Medicaid) program benefit designed to help members who don't have transportation access get to their medical appointments. To ensure these services reach those who need them most, there are specific eligibility requirements that must be met.
                  </p>
                  <p class="text-xl text-brand-main-text">
                    Our goal is to make the qualification process as clear and straightforward as possible, so you can quickly determine if you're eligible and begin accessing the transportation services you need.
                  </p>
                </div>
                <div class="space-y-2">
                  <h2 class="text-2xl font-bold text-brand-primary">Basic Eligibility Requirements</h2>
                  <div>
                    <p class="text-xl text-brand-main-text font-bold">
                      To qualify for NEMT services with Golden Gate Manor Transportation, you must meet all of the following criteria:
                    </p>
                    <ol class="ml-8 list-decimal marker:text-2xl marker:font-bold marker:text-gray-400 space-y-4">
                      <li>
                        <div class="space-y-2">
                          <h3 class="text-2xl text-brand-main-text font-bold">Insurance Coverage</h3>
                          <p class="text-xl text-brand-main-text">
                            <span class="font-bold">You must have current Health First Colorado (Medicaid) insurance.</span> This is the foundation of NEMT eligibility. Your Medicaid coverage must be active and in good standing.
                          </p>
                          <p class="text-xl text-brand-main-text">
                            <span class="font-bold">Important: </span>CHP+ is not a Medicaid program and therefore does not qualify for NEMT services.
                          </p>
                          <div>
                            <p class="text-xl text-brand-main-text font-bold">You cannot be in the following designation groups:</p>
                            <ul class="text-xl text-brand-main-text ml-8 list-disc marker-black">
                              <li>Qualified Medicaid Beneficiary (QMB)</li>
                              <li>Special Low-Income Medicare Beneficiary (SLMB)</li>
                              <li>Medicare Qualifying Individual-1 (QI-1)</li>
                              <li>Old Age Pension - State Only (OAP-state only)</li>
                            </ul>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div>
                          <h3 class="text-2xl text-brand-main-text font-bold">Medical Purpose</h3>
                          <p class="text-xl text-brand-main-text">
                            Your trip must be for non-emergency Medicaid-eligible transportation to covered medical services. Examples include doctor appointments, specialist consultations, physical therapy sessions, mental health appointments, dialysis treatments, lab work, diagnostic imaging, routine check-ups, and prescription pickups. Emergency situations should use 911 services instead.
                          </p>
                        </div>
                      </li>
                      <li>
                        <div>
                          <h3 class="text-2xl text-brand-main-text font-bold">Service Area</h3>
                          <p class="text-xl text-brand-main-text">
                            You must live within our service area for pickup. Golden Gate Manor Transportation serves all Colorado counties except the Denver metro area (Boulder, Larimer, Weld, Broomfield, Denver, Adams, Jefferson, Douglas, and Arapahoe counties) for pickup services. However, we can transport you from our service areas to medical appointments located in areas we don't typically service on a case-by-case basis. We simply cannot provide pickup services from the Denver metro counties as those areas fall under different transportation jurisdictions.
                          </p>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </BaseLayoutPageContainer>
          </BaseLayoutPageSection>
        </DeferRender>
        <DeferRender when="visible">
          <BaseLayoutPageSection margin="default" class="cv-auto">
            <BaseLayoutPageContainer>
              <div class="space-y-4">
                <h2 class="text-2xl font-bold text-brand-primary">Required Documentation</h2>
                <div class="space-y-2">
                  <h3 class="text-2xl text-brand-main-text font-bold">Medical Certificate of Transportation Services</h3>
                  <p class="text-xl text-brand-main-text">
                    Before you can use NEMT services, your healthcare provider must complete and sign a Medical Certificate of Transportation Services form. This document establishes the medical necessity for transportation services.
                  </p>
                  <div>
                    <p class="text-xl text-brand-main-text font-bold">Who can complete this form:</p>
                    <ul class="text-xl text-brand-main-text ml-8 list-disc">
                      <li>Your attending physician</li>
                      <li>Physician's assistant</li>
                      <li>Nurse practitioner</li>
                      <li>Therapist</li>
                      <li>Licensed healthcare professional</li>
                    </ul>
                  </div>
                  <p class="text-xl text-brand-main-text">
                    <span class="font-bold">When you need this: </span>This form is required before your first NEMT ride and must be renewed periodically as determined by your healthcare provider.
                  </p>
                  <BaseUiAction href="/pdfs/nemt/nemt-app&medical-certificate-of-trans-services.pdf" new-page variant="blank" class="inline-block bg-zinc-200 p-4 rounded-lg border-2 border-zinc-300 hover:bg-zinc-300 hover:border-zinc-500 transition-colors duration-500 ease-in-out" styling="flex items-center gap-2"><BaseIcon name="carbon:policy" /><span>Download the Medical Certificate Form</span></BaseUiAction>
                </div>
                <div class="space-y-2">
                  <h3 class="text-2xl text-brand-main-text font-bold">Additional Documentation for Long-Distance Travel</h3>
                  <p class="text-xl text-brand-main-text">
                    If you live more than 25 miles from your medical provider, additional documentation is required to verify the medical necessity of the extended travel distance.
                  </p>
                  <p class="text-xl text-brand-main-text">
                    <span class="font-bold">What you need: </span>Your medical provider must complete the "Verification Form for Transportation Services More Than 25 Miles" to confirm that the distant location is necessary for your specific medical needs.
                  </p>
                  <p class="text-xl text-brand-main-text">
                    This form can be found within the Medical Certificate of Transportation Service Form linked above.
                  </p>
                </div>
              </div>
            </BaseLayoutPageContainer>
          </BaseLayoutPageSection>
        </DeferRender>
        <DeferRender when="visible">
          <BaseLayoutPageSection margin="default" bg="alt" class="cv-auto">
            <BaseLayoutPageContainer>
              <div class=space-y-4>
                <div class="space-y-2">
                  <h2 class="text-2xl font-bold text-brand-primary">Covered Medical Services</h2>
                  <p class="text-xl text-brand-main-text">
                    NEMT transportation is available for appointments and services that are covered by Health First Colorado (Medicaid).
                  </p>
                  <div>
                    <p class="text-xl text-brand-main-text font-bold">Commonly covered services:</p>
                    <ul class="text-xl text-brand-main-text ml-8 list-disc">
                      <li>Primary care physician visits</li>
                      <li>Specialist appointments</li>
                      <li>Diagnostic testing and lab work</li>
                      <li>Therapy sessions (physical, occupational, speech)</li>
                      <li>Mental health and substance abuse treatment</li>
                      <li>Dialysis treatments</li>
                      <li>Chemotherapy and radiation treatments</li>
                      <li>Prescription pickup (in limited circumstances)</li>
                    </ul>
                  </div>
                  <p class="text-xl text-brand-main-text">
                    <span class="font-bold">Important: </span>We cannot provide transportation to services that are not covered under the Medicaid program. If you're unsure whether your appointment qualifies, we can help verify coverage during the scheduling process.
                  </p>
                </div>
                <div class="space-y-2">
                  <h2 class="text-2xl font-bold text-brand-primary">What Disqualifies You from NEMT</h2>
                  <div>
                    <p class="text-xl text-brand-main-text font-bold">You may not qualify for our NEMT services if:</p>
                    <ul class="text-xl text-brand-main-text ml-8 list-disc">
                      <li>You don't have active Health First Colorado (Medicaid) coverage</li>
                      <li>Your appointment is not for a Medicaid-covered service</li>
                      <li>You live outside our service area</li>
                      <li>You're in one of the excluded Medicaid designation groups listed above</li>
                      <li>You need transportation for non-medical purposes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </BaseLayoutPageContainer>
          </BaseLayoutPageSection>
        </DeferRender>
        <DeferRender when="visible">
          <BaseLayoutPageSection margin="default" class="cv-auto">
            <BaseLayoutPageContainer>
              <div class="flex justify-center">
                <div class="space-y-2 md:w-1/2">
                  <h2 class="text-2xl font-bold text-brand-primary">Getting Help with Qualification Questions</h2>
                  <p class="text-xl text-brand-main-text">
                    Understanding NEMT eligibility can sometimes be complex, especially if you have unique circumstances or questions about coverage. Our experienced customer service team is here to help you navigate the qualification process, whether you need assistance with questions about your Medicaid coverage eligibility, help determining if your appointment qualifies, guidance understanding required documentation or the Medical Certificate process, or clarification about our service area coverage.
                  </p>
                  <div>
                    <BaseUiAction to="/company/contact-us" class="py-4 px-8">Contact Us</BaseUiAction>
                  </div>
                  <p class="text-xl text-brand-main-text">
                    <span class="font-bold">We're here to help make the qualification process as smooth as possible.</span> 
                    Don't hesitate to reach out if you have questions or need assistance understanding any part of the eligibility requirements.
                  </p>
                </div>
                <div class="w-1/3 lg:w-1/4">
                  <NuxtImg 
                    src="/images/pages/how-to-schedule-a-ride/information.png" 
                    quality="80" format="webp,avif" 
                    height="264" width="252"
                    class="w-full" 
                    alt="Question mark" 
                    title="Question mark" />
                </div>
              </div>
            </BaseLayoutPageContainer>
          </BaseLayoutPageSection>
        </DeferRender>
        <DeferRender when="visible">
          <BaseLayoutPageSection margin="default" bg="alt" class="cv-auto">
            <BaseLayoutPageContainer>
              <div class="space-y-2">
                <h2 class="text-2xl font-bold text-brand-primary">Next Steps After Qualifying</h2>
                <p class="text-xl text-brand-main-text">
                  Once you've determined that you qualify for NEMT services, you'll need to complete your Medical Certificate with your healthcare provider and gather your appointment information and personal details. Next, review our scheduling guide to understand the booking process, then contact us to schedule your first ride at least 24-48 hours in advance.
                </p>
                <p class="text-xl text-brand-main-text">
                  <span class="font-bold">Ready to get started?</span> Visit our Getting Ready for Your First Ride guide for detailed preparation information, or our How to Schedule a Ride guide to begin booking your transportation.
                </p>
                <div class="flex gap-4 justify-center flex-wrap">
                  <SupportCenterTile to="/resources/support-center/prepare-for-first-ride" name="mdi-seatbelt" title="Prepare for your First Ride" message="See what you need to do to prepare for the first ride." />
                  <SupportCenterTile to="/resources/support-center/schedule-a-ride" name="heroicons-outline:calendar-days" title="How to Schedule a Ride" message="Instructions on how to request trips to medical appointments" />
                </div>
              </div>
            </BaseLayoutPageContainer>
          </BaseLayoutPageSection>
        </DeferRender>
    </div>
</template>

<script setup lang='ts'>
definePageMeta({
  title: 'Qualification for Transportation Services',
  breadcrumbLabel: 'Qualification'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Qualification for Transportation Services',
  ogTitle: 'Qualification for Transportation Services',
  description: 'Discover eligibility requirements for Golden Gate Manor Inc.\'s transportation services, including Medicaid qualifications and private options.',
  ogDescription: 'Discover eligibility requirements for Golden Gate Manor Inc.\'s transportation services, including Medicaid qualifications and private options.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Qualification for Transportation Services',
  twitterDescription: 'Discover eligibility requirements for Golden Gate Manor Inc.\'s transportation services, including Medicaid qualifications and private options.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'HowToQualifyPage'
})
</script>

<style scoped>
.marker-black li::marker {
  color: black;
}
</style>