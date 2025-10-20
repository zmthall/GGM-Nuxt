<template>
    <div>
        <BaseLayoutPageSection margin="top">
          <BaseLayoutPageContainer>
            <div class="flex flex-col lg:flex-row gap-8 items-center">
              <div class="relative w-full lg:w-1/2 aspect-[3/2] max-w-[600px] sm:rounded-lg sm:shadow-primary overflow-hidden">
                <NuxtImg 
                  src="/images/pages/how-to-schedule-a-ride/calendar.jpg" 
                  quality="50" format="webp"
                  width="600" height="394"
                  :preload="{ fetchPriority: 'high' }"
                  fetchpriority="high"
                  loading="eager"
                  placeholder
                  sizes="md:600px 100vw"
                  densities="x1"
                  class="absolute inset-0 w-full h-full object-cover" 
                  alt="Calendar with glasses on it"/>
              </div>
              <div class="space-y-2 lg:w-1/2">
                <h2 class="text-2xl font-bold text-brand-primary">Quick Guide to Booking Your Non-Emergency Medical Transportation (NEMT)</h2>
                <p class="text-xl text-brand-main-text">
                  Need to schedule transportation for an upcoming medical appointment? This streamlined guide will walk you through the scheduling process with Golden Gate Manor Transportation.
                </p>
                <p class="text-xl text-brand-main-text">
                  Our goal is to ensure all transportation services go smoothly by clearly outlining each step and addressing any specific questions you may have about the scheduling process.
                </p>
                <p class="text-xl text-brand-main-text">
                  If you have any questions about the process and would like to contact us directly feel free to reach out and we will get back to you as soon as possible.
                </p>
                <div class="flex justify-center">
                  <BaseUiAction to="/company/contact-us" class="py-4 px-8">Reach Out</BaseUiAction>
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
                  <h2 class="text-2xl font-bold text-brand-primary">Before You Start: Are You Ready to Schedule?</h2>
                  <p class="text-xl text-brand-main-text">
                    <span class="font-bold">First-time riders: </span>
                    Visit our <NuxtLink to="/resources/support-center/prepare-for-first-ride" class="link">Getting Ready for Your First Ride</NuxtLink> guide first to ensure you have all required documentation and understand the eligibility requirements.
                  </p>
                  <p class="text-xl text-brand-main-text">
                    <span class="font-bold">Returning riders: </span>
                    Make sure you have your appointment details ready and are scheduling at least 24-48 hours in advance.
                  </p>
                </div>
                <div class="space-y-2">
                  <h2 class="text-2xl font-bold text-brand-primary">When to Schedule Your Ride</h2>
                  <p class="text-xl text-brand-main-text">
                    <span class="font-bold">Best Practice: </span>
                    Call 48 hours before your appointment for the best availability.
                  </p>
                  <p class="text-xl text-brand-main-text">
                    <span class="font-bold">Minimum Requirement: </span>
                    Schedule at least 24 hours in advance. Same-day scheduling is limited and not guaranteed.
                  </p>
                  <div>
                    <p class="text-xl text-brand-main-text font-bold">Special Considerations:</p>
                    <ul class="text-xl text-brand-main-text ml-8 list-disc">
                      <li>
                        <span class="font-bold">Long-distance trips</span> (over 25 miles): Schedule as early as possible for additional documentation processing
                      </li>
                      <li>
                        <span class="font-bold">First-time riders:</span> Allow extra time for paperwork verification
                      </li>
                      <li>
                        <span class="font-bold">Recurring appointments:</span> Ask about setting up regular transportation schedules
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="space-y-2">
                  <h2 class="text-2xl font-bold text-brand-primary">How to Contact Us for Scheduling</h2>
                  <p class="text-xl text-brand-primary font-bold flex items-center gap-2">
                    <BaseIcon name="heroicons-outline:calendar-days" /> Schedule at least 48 hours in advance for best availability
                  </p>
                  <p class="text-xl text-brand-main-text">
                    Our experienced customer service team is here to guide you through every step. Don't stress if you don't have all the details—we'll work together to gather what's needed and get your transportation arranged.
                  </p>
                  <p class="text-xl text-brand-main-text"><span class="font-bold">Best practice:</span> Call 24-48 hours ahead, and allow extra time for first rides to complete any required paperwork.</p>
                  <div class="text-xl flex gap-4 md:gap-8 flex-col md:flex-row">
                    <div class="md:w-1/2">
                      <h3 class="text-2xl font-bold flex flex-col"><span>During Business Hours</span><span>(Monday-Friday, 8:00 AM - 4:00 PM)</span></h3>
                      <ul class="ml-8 list-disc">
                        <li>Call <a :href="`tel:${company?.trans.phone.dispatch}`" class="link">{{ company?.trans.phone.dispatch }}</a></li>
                        <li>Or call <a :href="`tel:${company?.trans.phone.tollFree}`" class="link">{{ company?.trans.phone.tollFree }}</a></li>
                      </ul>
                    </div>
                    <div class="space-y-2 md:w-1/2 md:space-y-4">
                      <div>
                        <h3 class="text-2xl font-bold">After Hours:</h3>
                        <ul class="ml-8 list-disc">
                          <li>Call our 24/7 dispatch at <a :href="`tel:${company?.trans.phone.dispatch}`" class="link">{{ company?.trans.phone.dispatch }}</a></li>
                        </ul>
                      </div>
                      <div>
                        <h3 class="text-2xl font-bold">Online Scheduling:</h3>
                        <ul class="ml-8 list-disc">
                          <li><NuxtLink to="/resources/schedule-a-ride" class="link">Schedule a ride online</NuxtLink></li>
                        </ul>
                      </div>
                    </div>
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
                <div class="space-y-2">
                  <h2 class="text-2xl font-bold text-brand-primary">The Scheduling Process</h2>
                  <p class="text-xl text-brand-main-text">
                    When you call, our customer service representatives will guide you through each step. Don't stress about having everything perfect—we'll work together to gather what's needed and get your transportation arranged. It is our goal to help you so that we can make sure your experience is simple and straightforward. We have years of experience scheduling and fulfilling our services, and with that being said, we will be a good shoulder to lean on during the process.
                  </p>
                </div>
                <div class="space-y-2">
                    <div class="flex flex-row flex-wrap justify-center text-xl gap-8">
                      <BaseInteractiveHoverTile class="w-[300px] h-[300px] flex flex-col justify-center">
                        <p class="font-bold">We'll verify:</p>
                        <ul class="ml-8 list-disc">
                          <li>Your eligibility and appointment coverage</li>
                          <li>That your destination is a Medicaid-enrolled provider</li>
                          <li>Your transportation needs and any special accommodations</li>
                        </ul>
                      </BaseInteractiveHoverTile>
                      <BaseInteractiveHoverTile class="w-[300px] h-[300px] flex flex-col justify-center">
                        <p class="font-bold">We'll collect:</p>
                        <ul class="ml-8 list-disc">
                          <li>Your personal information and appointment details</li>
                          <li>Transportation preferences (wheelchair accessible, companion, etc.)</li>
                          <li>Pickup location and any special instructions</li>
                        </ul>
                      </BaseInteractiveHoverTile>
                      <BaseInteractiveHoverTile class="w-[300px] h-[300px] flex flex-col justify-center">
                        <p class="font-bold">We'll provide:</p>
                        <ul class="ml-8 list-disc">
                          <li>Your pickup time window</li>
                          <li>Scheduling confirmation</li>
                          <li>Driver contact information (when available)</li>
                          <li>Any special pickup instructions</li>
                        </ul>
                      </BaseInteractiveHoverTile>
                    </div>
                  </div>
              </div>
            </BaseLayoutPageContainer>
          </BaseLayoutPageSection>
        </DeferRender>
        <DeferRender when="visible">
          <BaseLayoutPageSection margin="default" bg="alt" class="cv-auto">
            <BaseLayoutPageContainer>
              <div class="space-y-2">
                <h2 class="text-2xl font-bold text-brand-primary">Making Changes to Your Ride</h2>
                <div>
                  <p class="text-xl text-brand-main-text font-bold">To modify or cancel your scheduled ride:</p>
                  <ul class="text-xl text-brand-main-text ml-8 list-disc">
                    <li><span class="font-bold">Business Hours:</span> <a :href="`tel:${company?.trans.phone.dispatch}`" class="link">{{ company?.trans.phone.dispatch }}</a> or <a :href="`tel:${company?.trans.phone.tollFree}`" class="link">{{ company?.trans.phone.tollFree }}</a></li>
                    <li><span class="font-bold">After Hours:</span> call our 24/7 dispatch service: <a :href="`tel:${company?.trans.phone.dispatch}`">{{ company?.trans.phone.dispatch }}</a></li>
                  </ul>
                </div>
                <p class="text-xl text-brand-main-text">
                  <span class="font-bold">Important:</span> Cancellations must be made at least 2 hours before your scheduled pickup time to avoid strikes on your account.
                </p>
              </div>
            </BaseLayoutPageContainer>
          </BaseLayoutPageSection>
        </DeferRender>
        <DeferRender when="visible">
          <BaseLayoutPageCTA 
            title="Want to schedule a ride online?" 
            description="For your convenience, we've created a simple online form to schedule your transportation. We understand that calling isn't always the most convenient option, so this form allows you to request rides at your own pace. Please fill out all details completely to ensure we can provide the best possible service." 
            to="/resources/schedule-a-ride" 
            button-label="Schedule Online" />
        </DeferRender>
        <DeferRender when="visible">
          <BaseLayoutPageSection margin="default" class="cv-auto">
            <BaseLayoutPageContainer>
              <div class="space-y-4">
                <div class="space-y-2">
                  <h2 class="text-2xl font-bold text-brand-primary">Special Transportation Needs</h2>
                  <p class="text-xl text-brand-main-text">
                    <span class="font-bold">Wheelchair-Accessible Vehicles: </span>
                    Mention this when scheduling to ensure proper vehicle assignment.
                  </p>
                  <p class="text-xl text-brand-main-text">
                    <span class="font-bold">Multiple Appointments: </span>
                    We can coordinate transportation for multiple appointments in the same day.
                  </p>
                  <p class="text-xl text-brand-main-text">
                    <span class="font-bold">Recurring Medical Appointments: </span>
                    Ask about setting up regular transportation for ongoing treatments.
                  </p>
                  <p class="text-xl text-brand-main-text">
                    <span class="font-bold">Service Animal Accomodation: </span>
                    Let us know if you'll be traveling with a service animal so we can ensure proper accommodations are made.
                  </p>
                </div>
                <div class="space-y-2">
                  <h2 class="text-2xl font-bold text-brand-primary">Quick Contact Reference</h2>
                  <table class="w-full border-collapse border border-gray-300 text-lg sm:text-2xl text-brand-main-text">
                    <thead>
                      <tr class="bg-blue-100">
                        <th class="border border-blue-200 px-2 sm:px-4 py-2 text-left font-semibold text-blue-800">Need</th>
                        <th class="border border-blue-200 px-2 sm:px-4 py-2 text-left font-semibold text-blue-800">Phone</th>
                        <th class="border border-blue-200 px-2 sm:px-4 py-2 text-left font-semibold text-blue-800 max-sm:hidden">Hours</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="bg-white">
                        <td class="border border-blue-200 px-2 sm:px-4 py-2">Schedule / Modify Rides</td>
                        <td class="border border-blue-200 px-2 sm:px-4 py-2 font-medium whitespace-nowrap"><a :href="`tel:${company?.trans.phone.office}`" class="link">{{ company?.trans.phone.office }}</a></td>
                        <td class="border border-blue-200 px-2 sm:px-4 py-2 max-sm:hidden">Mon-Fri, 8AM-4PM</td>
                      </tr>
                       <tr class="bg-blue-50">
                        <td class="border border-blue-200 px-2 sm:px-4 py-2">Administrative Assistance</td>
                        <td class="border border-blue-200 px-2 sm:px-4 py-2 font-medium whitespace-nowrap"><a :href="`tel:${company?.admin.phone}`" class="link">{{ company?.admin.phone }}</a></td>
                        <td class="border border-blue-200 px-2 sm:px-4 py-2 max-sm:hidden">Mon-Fri, 8AM-4PM</td>
                      </tr>
                      <tr class="bg-white">
                        <td class="border border-blue-200 px-2 sm:px-4 py-2">After-Hours Urgent Needs</td>
                        <td class="border border-blue-200 px-2 sm:px-4 py-2 font-medium"><a :href="`tel:${company?.trans.phone.dispatch}`" class="link whitespace-nowrap">{{ company?.trans.phone.dispatch }}</a> or <a :href="`tel:${company?.trans.phone.tollFree}`" class="link whitespace-nowrap">{{ company?.trans.phone.tollFree }}</a></td>
                        <td class="border border-blue-200 px-2 sm:px-4 py-2 max-sm:hidden">24/7</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="flex justify-center">
                  <div class="space-y-2 md:w-1/2">
                    <h2 class="text-2xl font-bold text-brand-primary">Questions?</h2>
                    <p class="text-xl text-brand-main-text">
                      Our customer service team is here to help make scheduling your medical transportation quick and easy. Call during business hours for the best service and availability or send us a message through our online form.
                    </p>
                    <BaseUiAction to="/company/contact-us" class="py-4 px-8">Contact Us</BaseUiAction>
                  </div>
                  <div class="w-1/3 lg:w-1/4">
                    <NuxtImg src="/images/pages/how-to-schedule-a-ride/information.png" quality="80" format="webp,avif" class="w-full" alt="Question mark" />
                  </div>
                </div>
              </div>
            </BaseLayoutPageContainer>
          </BaseLayoutPageSection>
        </DeferRender>
      </div>
</template>

<script setup lang='ts'>
definePageMeta({
  title: 'How to Schedule a Ride',
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'How to Schedule a Ride',
  ogTitle: 'How to Schedule a Ride',
  description: 'Learn how to easily schedule your transportation with Golden Gate Manor Inc. Follow our simple steps to arrange reliable rides for medical and personal trips.',
  ogDescription: 'Learn how to easily schedule your transportation with Golden Gate Manor Inc. Follow our simple steps to arrange reliable rides for medical and personal trips.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'How to Schedule a Ride',
  twitterDescription: 'Learn how to easily schedule your transportation with Golden Gate Manor Inc. Follow our simple steps to arrange reliable rides for medical and personal trips.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'HowToScheduleARidePage'
})

const company = useStaticData()?.company
</script>

<style></style>