<template>
    <div>
        <BaseLayoutPageSection margin="top">
          <BaseLayoutPageContainer>
            <div class="flex flex-col lg:flex-row gap-8 items-center">
              <div class="relative w-full lg:w-1/2 aspect-[3/2] max-w-[600px] sm:rounded-lg sm:shadow-primary overflow-hidden">
                <NuxtImg 
                  src="/images/pages/prepare-for-first-ride/car-shot.jpg" 
                  quality="50" format="webp"
                  width="600" height="394"
                  :preload="{ fetchPriority: 'high' }"
                  loading="eager"
                  placeholder
                  sizes="md:600px 100vw"
                  densities="x1"
                  class="absolute inset-0 w-full h-full object-cover" 
                  alt="Golden Gate Manor car 17" />
              </div>
              <div class="space-y-4 lg:w-1/2">
                <div class="space-y-2">
                  <h2 class="text-2xl font-bold text-brand-primary">Non-Emergent Medical Transportation (NEMT) with Golden Gate Manor Transportation</h2>
                  <p class="text-xl text-brand-main-text">
                    Welcome to Golden Gate Manor Transportation! We're here to help you get to your important medical appointments safely and on time. This guide will walk you through everything you need to know for your first ride with us.
                  </p>
                </div>
                <div class="space-y-2">
                  <h2 class="text-2xl font-bold text-brand-primary">What is NEMT?</h2>
                  <p class="text-xl text-brand-main-text">Non-Emergent Medical Transportation (NEMT) provides free rides to and from covered health care services and appointments for eligible Health First Colorado (Medicaid) members who don't have other transportation options.</p>
                  <PleaseNote>
                    NEMT is not for emergencies. If you are having a medical emergency, call 911 immediately.
                  </PleaseNote>
                </div>
              </div>
            </div>
          </BaseLayoutPageContainer>
        </BaseLayoutPageSection>
        <DeferRender when="visible">
          <BaseLayoutPageSection margin="default" bg="alt" class="cv-auto">
            <BaseLayoutPageContainer>
              <div class="flex flex-col lg:flex-row gap-8 items-center">
                <div class="lg:w-1/2 space-y-4">
                  <div class="space-y-2">
                    <h2 class="text-2xl font-bold text-brand-primary">Before You Call: Check Your Eligibility</h2>
                    <p class="text-xl text-brand-main-text font-bold">
                      To be eligible for NEMT services with Golden Gate Manor Transportation, you must:
                    </p>
                    <ul class="text-xl text-brand-main-text">
                      <li class="flex gap-2"><BaseIcon name="material-symbols:bookmark-check-rounded" class="shrink-0"/>Have current Health First Colorado (Medicaid) insurance</li>
                      <li class="flex gap-2"><BaseIcon name="material-symbols:bookmark-check-rounded" class="shrink-0" />Live in our service area (see map)</li>
                      <li class="flex gap-2"><BaseIcon name="material-symbols:bookmark-check-rounded" class="shrink-0" />Be going to a Medicaid-approved appointment</li>
                      <li class="flex gap-2"><BaseIcon name="material-symbols:bookmark-check-rounded" class="shrink-0" />Have a completed Medical Certificate of Transportation Services (for medical necessity)</li>
                    </ul>
                  </div>
                  <div class="space-y-2">
                    <h2 class="text-2xl font-bold text-brand-primary">Our Service Area</h2>
                    <p class="text-xl text-brand-main-text">
                      We proudly serve most of Colorado, excluding the Denver metro counties of Boulder, Larimer, Weld, Broomfield, Denver, Adams, Jefferson, Douglas, and Arapahoe due to contractual agreements. We also are not available most of Northern Colorado due to distance restrictions.
                    </p>
                    <p class="text-xl text-brand-main-text">
                      Need help determining eligibility? Call us at <a :href="`tel:${company?.trans.phone.office}`" class="link">{{ company?.trans.phone.office }}</a> during business hours (Monday-Friday, 8:00 AM - 4:00 PM).
                    </p>
                  </div>
                </div>
                <div class="w-full md:w-3/4 mx-auto lg:w-1/2 rounded-lg overflow-hidden shadow-primary p-4 bg-brand-background">
                  <BaseInteractiveServiceAreaMap loading="lazy"/>
                </div>
              </div>
            </BaseLayoutPageContainer>
          </BaseLayoutPageSection>
        </DeferRender>
        <DeferRender when="visible">
          <BaseLayoutPageSection margin="default" class="cv-auto">
            <BaseLayoutPageContainer>
              <div class="space-y-8">
                <h2 class="text-4xl font-bold text-brand-primary">How to Schedule Your First Ride</h2>
                <div class="space-y-2">
                  <h3 class="text-3xl font-bold">Step 1: Get Your Medical Certificate</h3>
                  <p class="text-2xl text-brand-main-text">
                    Before scheduling any rides, your healthcare provider must complete and sign the Medical Certificate of Transportation Services Form inside of the Non-Emergency Medical Transportation (NEMT) application.
                  </p>
                  <BaseUiAction href="/pdfs/nemt/nemt-app&medical-certificate-of-trans-services.pdf" new-page variant="blank" class="inline-block bg-zinc-200 p-4 rounded-lg border-2 border-zinc-300 hover:bg-zinc-300 hover:border-zinc-500 transition-colors duration-500 ease-in-out" styling="flex items-center gap-2"><BaseIcon name="carbon:policy" /><span>Download the Medical Certificate Form</span></BaseUiAction>
                  <p class="text-2xl text-brand-main-text">
                    <span class="font-bold">Special requirement:</span> If you live more than 25 miles from your medical provider, an additional 25+ mile form must be completed. This form is included in the NEMT application. All you need to do is send this form to your medical provider so that they can sign off on you receiving NEMT services.
                  </p>
                </div>
                <div class="space-y-2">
                  <h3 class="text-3xl font-bold">Step 2: Gather Required Information</h3>
                  <p class="text-2xl text-brand-main-text !mb-4">
                    When you call to schedule, have this information ready:
                  </p>
                  <div class="flex flex-row flex-wrap justify-center text-xl gap-8">
                    <BaseInteractiveHoverTile class="w-[300px] h-[300px] flex flex-col justify-center">
                      <p class="font-bold">Personal Information:</p>
                      <ul class="ml-8 list-disc">
                        <li>Your full name</li>
                        <li>Your Health First Colorado ID number</li>
                        <li>Your date of birth</li>
                        <li>Your pickup address</li>
                      </ul>
                    </BaseInteractiveHoverTile>
                    <BaseInteractiveHoverTile class="w-[300px] h-[300px] flex flex-col justify-center">
                      <p class="font-bold">Appointment Details:</p>
                      <ul class="ml-8 list-disc">
                        <li>Date and time of your appointment</li>
                        <li>Healthcare provider's name</li>
                        <li>Provider's complete address</li>
                        <li>Provider's phone number</li>
                      </ul>
                    </BaseInteractiveHoverTile>
                    <BaseInteractiveHoverTile class="w-[300px] h-[300px] flex flex-col justify-center">
                      <p class="font-bold">Additional Passengers:</p>
                      <ul class="ml-8 list-disc">
                        <li>Determine if you will be needing assistance, you are allowed up to one additional passenger to help assist with trips.</li>
                      </ul>
                    </BaseInteractiveHoverTile>
                  </div>
                </div>
                <div class="space-y-2">
                  <h3 class="text-3xl font-bold">Step 3: Call to Schedule</h3>
                  <p class="text-2xl text-brand-primary font-bold flex items-center gap-2">
                    <BaseIcon name="heroicons-outline:calendar-days" /> Schedule at least 48 hours in advance for best availability
                  </p>
                  <p class="text-xl text-brand-main-text">
                    Our experienced customer service team is here to guide you through every step. Don't stress if you don't have all the details—we'll work together to gather what's needed and get your transportation arranged.
                  </p>
                  <p class="text-xl text-brand-main-text"><span class="font-bold">Best practice:</span> Call 24-48 hours ahead, and allow extra time for first rides to complete any required paperwork.</p>
                  <div class="text-xl flex gap-4 md:gap-8 flex-col md:flex-row">
                    <div class="md:w-1/2">
                      <h4 class="text-2xl font-bold flex flex-col"><span>During Business Hours</span><span>(Monday-Friday, 8:00 AM - 4:00 PM)</span></h4>
                      <ul class="ml-8 list-disc">
                        <li>Call <a :href="`tel:${company?.trans.phone.dispatch}`" class="link">{{ company?.trans.phone.dispatch }}</a></li>
                        <li>Or call <a :href="`tel:${company?.trans.phone.tollFree}`" class="link">{{ company?.trans.phone.tollFree }}</a></li>
                      </ul>
                    </div>
                    <div class="space-y-2 md:w-1/2 md:space-y-4">
                      <div>
                        <h4 class="text-2xl font-bold">After Hours:</h4>
                        <ul class="ml-8 list-disc">
                          <li>Call our 24/7 dispatch at <a :href="`tel:${company?.trans.phone.dispatch}`" class="link">{{ company?.trans.phone.dispatch }}</a></li>
                        </ul>
                      </div>
                      <div>
                        <h4 class="text-2xl font-bold">Online Scheduling:</h4>
                        <ul class="ml-8 list-disc">
                          <li><NuxtLink to="/resources/schedule-a-ride" class="link">Schedule a ride online</NuxtLink></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="space-y-2">
                  <h3 class="text-3xl font-bold">Step 4: Confirm Your Ride Details</h3>
                  <div class="flex flex-col md:flex-row gap-4">
                    <div class="md:w-1/2 space-y-4">
                      <p class="text-xl text-brand-main-text">
                        During your scheduling call, our customer service team will provide you with all the important details you need for your upcoming ride. We'll give you a specific pickup time window so you know exactly when to be ready, along with any special instructions that might apply to your particular trip or location.
                      </p>
                      <p class="text-xl text-brand-main-text">
                        When available, we'll also share your driver's contact information so you can reach them directly if needed on the day of your ride. Before ending the call, you'll receive a confirmation number for your scheduling that you can reference if you need to make any changes or have questions about your trip.
                      </p>
                    </div>
                    <div class="w-full md:w-1/2 lg:1/3">
                      <NuxtImg src="/images/pages/prepare-for-first-ride/confirm-call.jpg" quality="60" format="webp,avif" class="w-full aspect-[4/3] rounded-lg shadow-primary" alt="Woman on the phone taking notes" />
                    </div>
                  </div>
                </div>
              </div>
            </BaseLayoutPageContainer>
          </BaseLayoutPageSection>
        </DeferRender>
        <DeferRender when="visible">
          <BaseLayoutPageSection margin="default" bg="alt" class="cv-auto">
            <BaseLayoutPageContainer>
              <div class="space-y-4">
                <h2 class="text-2xl font-bold text-brand-primary">What to Expect on Ride Day</h2>
                <div class="space-y-2">
                  <h3 class="text-xl font-bold">Be Ready for Pickup</h3>
                  <p class="text-xl text-brand-main-text">
                    When your ride day arrives, make sure you're ready within your assigned pickup window and have your Health First Colorado ID card with you. For shared rides, you may be asked to be ready earlier than expected to accommodate other passengers. Position yourself in a location where the driver can easily see you, such as near a window or outside your building if weather permits.
                  </p>
                </div>
                <div class="space-y-2">
                  <h3 class="text-xl font-bold">When Your Driver Arrives</h3>
                  <p class="text-xl text-brand-main-text">
                    Your driver will call you when they arrive at your pickup location. Once you receive this call, you'll have a 5-10 minute grace period to make your way to the vehicle and board. When you meet your driver, greet them politely and take a moment to confirm your destination to ensure everyone is on the same page about where you're headed.
                  </p>
                </div>
                <div class="space-y-2">
                  <h3 class="text-xl font-bold">During Your Ride</h3>
                  <p class="text-xl text-brand-main-text">
                    Your NEMT driver is committed to providing professional, respectful service throughout your journey. They will take you directly to your appointment location using the most direct route available, and when your appointment is finished, they'll return you safely home. You can expect to be treated with dignity and professionalism at all times.
                  </p>
                  <p class="text-xl text-brand-main-text">
                    However, it's important to understand what your driver will not do. They will not make unauthorized stops along the way, offer you money or other incentives, or engage in any inappropriate behavior. If you experience anything that makes you uncomfortable, please report it immediately to our customer service team.
                  </p>
                </div>
              </div>
            </BaseLayoutPageContainer>
          </BaseLayoutPageSection>
        </DeferRender>
    </div>
</template>

<script setup lang='ts'>
definePageMeta({
  title: 'How to Prepare for Your First Ride',
  breadcrumbLabel: 'Prepare for Ride'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'How to prepare for Your First Ride',
  ogTitle: 'How to prepare for Your First Ride',
  description: 'Learn how to prepare for your first transportation appointment with Golden Gate Manor Inc. Ensuring a smooth and stress-free travel experience.',
  ogDescription: 'Learn how to prepare for your first transportation appointment with Golden Gate Manor Inc. Ensuring a smooth and stress-free travel experience.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'How to prepare for Your First Ride',
  twitterDescription: 'Learn how to prepare for your first transportation appointment with Golden Gate Manor Inc. Ensuring a smooth and stress-free travel experience.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'HowToPrepareForFirstRidePage'
})

const company = useStaticData()?.company
</script>

<style></style>