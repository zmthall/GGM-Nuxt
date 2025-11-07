<template>
  <div>
    <BaseLayoutPageSection margin="top">
      <BaseLayoutPageContainer class="space-y-4">
        <div class="flex flex-col lg:flex-row gap-8 items-center">
          <div class="relative w-full lg:w-1/2 aspect-[3/2] max-w-[600px] sm:rounded-lg sm:shadow-primary overflow-hidden">
            <NuxtImg 
              src="/images/pages/requesting-accessible-van/red-van-door-open-cropped.jpeg" 
              quality="50" format="webp"
              width="600" height="394"
              :preload="{ fetchPriority: 'high' }"
              loading="eager"
              placeholder
              sizes="md:600px 100vw"
              densities="x1"
              class="absolute inset-0 w-full h-full object-cover"
              title="Golden Gate Manor Inc Red Accessible Van in Pueblo Colorado"
              alt="Golden Gate Manor Inc red accessible van in Pueblo Colorado"
            />
          </div>
          <div class="lg:w-1/2 space-y-4">
            <div>
              <h2 class="text-2xl font-bold text-brand-primary">Overview: Understanding Accessible Van Services</h2>
              <p class="text-xl text-brand-main-text">
                When it comes to transportation, sometimes extra accommodations are necessary to make sure the travel is comfortable, easy-going, and reliable. Here at Golden Gate Manor Transportation, we understand this need for extra accommodations, especially when those accommodations are centered around wheelchair accessible vans in Pueblo, Colorado. Here we will break down the process of requesting wheelchair accessible transportation for medical appointments in Southern Colorado and beyond.
              </p>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-brand-primary">What Makes a Van "Accessible"?</h2>
              <p class="text-xl text-brand-main-text">
                A van is considered an accessible van when it has been modified to allow passengers with different mobility needs to safely access and utilize the vehicle. Our wheelchair accessible transportation vehicles are specially equipped with:
              </p>
              <ul class="text-xl text-brand-main-text list-disc ml-8">
                <li>Spacious interiors designed for comfortable movement and positioning</li>
                <li>Wheelchair ramps that lower and rise to accommodate passengers who use wheelchairs, mobility scooters, or walkers</li>
                <li>Secure wheelchair securement systems to ensure safety during transport</li>
                <li>Lift-equipped options for various mobility device types</li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-brand-primary">Our Commitment to Accessibility</h2>
          <div class="space-y-2">
            <p class="text-xl text-brand-main-text">
              Here at Golden Gate Manor Transportation, being able to get our passengers to their medical appointments safely, comfortably, and reliably is one of our core goals as a family-owned transportation company in Pueblo, Colorado. We are committed to providing accessible services for everyone who needs them.
            </p>
            <p class="text-xl text-brand-main-text">
              Our commitment extends to passengers who need extra accommodations due to specific mobility needs. Our goal is to make wheelchair accessible transportation available for everyone, regardless of their level of mobility. This is why we maintain a dedicated fleet of accessible vans as part of our 40+ vehicle fleet in Southern Colorado.
            </p>
            <p class="text-xl text-brand-main-text">
              Currently, we have four wheelchair accessible vans available upon request, and as we continue to grow and serve our community, we will keep expanding these services. Every passenger utilizing our NEMT transportation services deserves a comfortable, reliable, and dignified trip while maintaining their independence. If there are any questions, our team is available to answer to the best of our abilities.
            </p>
            <div class="flex justify-center mt-8">
              <BaseUiAction to="/company/contact-us" class="py-4 px-8">Contact Us</BaseUiAction>
            </div>
          </div>
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" bg="alt" class="cv-auto">
        <BaseLayoutPageContainer class="space-y-4">
          <div class="flex flex-col-reverse lg:flex-row lg:gap-8 gap-4 lg:items-center">
            <div class="lg:w-1/2">
              <h2 class="text-2xl font-bold text-brand-primary">Who Qualifies for Accessible Van Transportation?</h2>
              <div class="space-y-2">
                <p class="text-xl text-brand-main-text">Anyone who has a legitimate need for accessibility accommodations can request our wheelchair accessible vans in Pueblo. We prioritize these specialized vehicles for passengers who truly require them, as our accessible vans operate on a first-come, first-served basis to ensure availability for those with mobility needs.</p>
                <div>
                  <h3 class="text-xl text-brand-main-text font-bold">To qualify for an accessible van, you must:</h3>
                  <ul class="text-xl text-brand-main-text ml-8 list-disc">
                    <li>
                      Have mobility restrictions that require the use of an accessible vehicle
                    </li>
                    <li>
                      Use mobility equipment such as wheelchairs, scooters, walkers, or other assistive devices
                    </li>
                    <li>
                      Have an active Medicaid plan (the only requirement for utilizing our NEMT services in Colorado)
                    </li>
                  </ul>
                </div>
  
              </div>
            </div>
            <div class="lg:w-1/2">
                <NuxtImg src="/images/pages/requesting-accessible-van/red-van.jpeg" quality="60" format="webp,avif" width="2856" height="1394" alt="Golden Gate Manor Inc accessible van" title="Golden Gate Manor Inc accessible van" loading="lazy" class="object-contain rounded-lg shadow-primary" />
            </div>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-brand-primary">Types of Mobility Equipment Accommodated</h2>
            <div class="space-y-2">
              <div>
                <p class="text-xl text-brand-main-text">
                  Just because the van is most often labeled as a wheelchair accessible van does not mean that we only accommodate wheelchairs. Anyone needing accessibility accommodations for medical transportation in Pueblo can request an accessible van. We accommodate a wide range of mobility equipment, including:
                </p>
                <ul class="text-xl text-brand-main-text ml-8 list-disc">
                  <li>Walkers and rollators</li>
                  <li>Manual wheelchairs</li>
                  <li>Powered/electric wheelchairs</li>
                  <li>Mobility scooters</li>
                  <li>Other mobility assistance devices</li>
                </ul>
              </div>
              <PleaseNote>We ask that passengers only request accessible vans when they have a genuine need for accessibility features. This ensures that our wheelchair accessible vehicles remain available for those who require them most.</PleaseNote>
            </div>
          </div>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>
    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" class="cv-auto">
        <BaseLayoutPageContainer class="space-y-4">
          <div>
            <h2 class="text-2xl font-bold text-brand-primary">Types of Accessible Vehicles Available</h2>
            <p class="text-xl text-brand-main-text">Golden Gate Manor Transportation currently operates a fleet of 40+ vehicles throughout Southern Colorado, four of which are dedicated wheelchair accessible vans. All of our accessible vehicles are equipped with:</p>
            <ul class="text-xl text-brand-main-text ml-8 list-disc">
              <li>
                Wheelchair ramps for safe and easy boarding
              </li>
              <li>
                Secure wheelchair securement systems to ensure passenger safety during transport
              </li>
              <li>
                Spacious interiors with ample room for medical equipment such as oxygen tanks, walkers, or other necessary devices
              </li>
              <li>
                Caregiver seating with comfortable space for a family member or caregiver to ride alongside the passenger
              </li>
            </ul>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-brand-primary">
              Traveling with a Caregiver
            </h2>
            <p class="text-xl text-brand-main-text">
              Under Medicaid transportation guidelines, a caregiver is allowed to accompany you during your medical appointments at no additional cost. To ensure proper arrangements, please inform our scheduling team when booking your accessible van that you'll be traveling with a caregiver. Our accessible vans provide comfortable seating for both passengers and their companions.
            </p>
          </div>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>
    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" bg="alt" class="cv-auto">
        <BaseLayoutPageContainer class="space-y-4">
          <div>
            <h2 class="text-2xl font-bold text-brand-primary">How to Request an Accessible Van</h2>
            <div class="space-y-2">
              <div>
                <p class="text-xl text-brand-main-text">Requesting wheelchair accessible transportation in Pueblo is simple and straightforward. You have two convenient options:</p>
                <ol class="text-xl text-brand-main-text ml-8 list-decimal">
                  <li>
                    <p class="text-xl text-brand-main-text">
                      <span class="font-bold">Call Our Team</span> - Contact our customer service representatives at (719) 544-3231 to schedule your accessible van and discuss your specific mobility needs.
                    </p>
                  </li>
                  <li>
                    <p class="text-xl text-brand-main-text">
                      <span class="font-bold">Book Online</span> - Use our online trip request form and specify your accessibility requirements in the "notes," "messages," or "special requirements" field. Be sure to include:
                    </p>
                    <ul class="text-xl text-brand-main-text ml-8 list-disc">
                      <li>Type of mobility equipment (wheelchair, scooter, walker, etc.)</li>
                      <li>Any special accommodation needs</li>
                      <li>Whether a caregiver will be traveling with you</li>
                    </ul>
                  </li>
                </ol>
              </div>
              <p class="text-xl text-brand-main-text">Forgot to mention your accessibility needs when booking online? No problem! Simply give us a call at (719) 544-3231, and we can update your trip to include the appropriate accommodations.</p>
            </div>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-brand-primary">Booking in Advance for Accessible Vans</h2>
            <div class="space-y-2">
              <div>
                <p class="text-xl text-brand-main-text">Our wheelchair accessible vans operate on a first-come, first-served basis. To ensure availability for your medical appointments, we strongly recommend:</p>
                <ul class="text-xl text-brand-main-text ml-8 list-disc">
                  <li>
                    Standard appointments: Book 24-48 hours in advance
                  </li>
                  <li>
                    Accessible van requests: Book up to one week in advance when possible
                  </li>
                  <li>
                    Recurring appointments: Schedule multiple trips at once to secure your preferred times
                  </li>
                </ul>
              </div>
              <PleaseNote>If all accessible vans are already reserved for your requested time, we may not be able to accommodate your trip. Early booking significantly increases the likelihood of securing an accessible vehicle for your appointment.</PleaseNote>
            </div>
          </div>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>
    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" class="cv-auto">
        <BaseLayoutPageContainer>
            <div class="space-y-4">
              <div>
                <h2 class="text-2xl font-bold text-brand-primary">How to Schedule Your First Ride with Accommodations</h2>
                <div class="space-y-2">
                  <div>
                    <p class="text-xl text-brand-main-text">Scheduling a ride with our wheelchair accessible vans follows the same simple process as booking any of our NEMT transportation services in Pueblo. The only difference is specifying your accessibility needs:</p>
                    <ul class="text-xl text-brand-main-text ml-8 list-disc">
                      <li><span class="font-bold">Online bookings</span>: Note your accessibility requirements in the form's notes section</li>
                      <li><span class="font-bold">Phone bookings</span>: Inform our customer service representative of your mobility equipment needs</li>
                    </ul>
                  </div>
                  <p class="text-xl text-brand-main-text">
                    Once we receive your request, we will confirm whether an accessible van is available for your appointment time. Because accessible vans are assigned on a first-come, first-served basis, we'll notify you immediately if no vehicles are available so you can adjust your appointment time if needed.
                  </p>
                </div>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-brand-primary">New to Golden Gate Manor Transportation?</h2>
                <p class="text-xl text-brand-main-text">If this is your first time using our services, check out our guide on "How to Prepare for Your First Ride" to learn what to expect and how to make your experience as smooth as possible.</p>
              </div>
              <div class="flex justify-center mt-4 flex-wrap gap-8">
                <SupportCenterTile to="/resources/support-center/qualify" name="lucide-clipboard-check" title="How to Qualify" message="A breakdown of the needs to qualify for transportation." />
                <SupportCenterTile to="/resources/support-center/prepare-for-first-ride" name="mdi-seatbelt" title="Prepare for your First Ride" message="See what you need to do to prepare for the first ride." />
                <SupportCenterTile to="/resources/support-center/schedule-a-ride" name="heroicons-outline:calendar-days" title="How to Schedule a Ride" message="Instructions on how to request trips to medical appointments" />
              </div>
            </div>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>
    <DeferRender when="visible">
      <BaseLayoutPageCTA title="Need to request an accommodated ride?" button-label="Schedule Online" to="/resources/schedule-a-ride"/>
    </DeferRender>
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
        <BaseLayoutPageContainer class="flex items-center">
            <div>
              <h2 class="text-2xl font-bold text-brand-primary">How does Medicaid Cover Wheelchair-Accessible Transportation?</h2>
              <p class="text-xl text-brand-main-text">Wheelchair accessible transportation does not require additional authorization beyond standard Medicaid trip coverage. Golden Gate Manor Inc. provides the availability of these accessible options as an additional service underneath our company model. Here at Golden Gate Manor Inc. we understand that certain accommodations are important to our clients and because that is the case we make sure to provide these extra accommodations for those that need them. Medicaid services for non-emergency medical transportation covers the services exactly the same as if you were taking a non-accommodation based vehicle in our fleet.</p>
            </div>
            <NuxtImg format="webp,avif" src="/images/pages/requesting-accessible-van/information.png" alt="Question mark symbol" title="Question mark symbol" loading="lazy" height="263" width="252" class="hidden lg:block" />
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>
    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" bg="alt" class="cv-auto">
        <BaseLayoutPageContainer>
          <div>
            <div class="flex flex-col lg:flex-row lg:gap-8 gap-4 lg:items-center mb-4 lg:mb-0">
              <div class="lg:w-1/2">
                <h2 class="text-2xl font-bold text-brand-primary">Safety Features and Training</h2>
                <p class="text-xl text-brand-main-text">When it comes to our vehicles and transporting our clients, safety is of utmost important here at Golden Gate Manor Inc. With that being said, we take the safety for our accessible/wheelchair vans just as seriously as we do for the other vehicles in our fleet. All vehicles are equipped with wheelchair securement and all drivers who are driving our accessible vans are trained on how to properly secure wheelchairs in place for safe travels. Only drivers who are certified in wheelchair securement are allowed to drive our wheelchair accessible vans. Having safe vehicles and trained drivers is important to us as it means we have safe passengers.</p>
              </div>
              <div class="lg:w-1/2 flex flex-wrap rounded-lg shadow-primary overflow-hidden">
                <div class="w-1/2 overflow-hidden">
                  <NuxtImg src="/images/pages/requesting-accessible-van/wheelchair-van-door-open.jpeg" quality="60" format="webp,avif" placeholder width="1512" height="1134" alt="Golden Gate Manor Inc accessible van with the sliding door open with wheelchair secured" title="Golden Gate Manor Inc accessible van with the sliding door open with wheelchair secured" loading="lazy" class="w-full h-auto aspect-[4/3]"/>
                </div>
                <div class="w-1/2 overflow-hidden">
                  <NuxtImg src="/images/pages/requesting-accessible-van/wheelchair-inside.jpeg" quality="60" format="webp,avif" placeholder width="1512" height="1134" alt="Golden Gate Manor Inc accessible van with the sliding door open with wheelchair secured and a person sitting in the wheelchair" title="Golden Gate Manor Inc accessible van with the sliding door open with wheelchair secured and a person sitting in the wheelchair" loading="lazy"  class="w-full h-auto aspect-[4/3]" />
                </div>
                <div class="w-1/2 overflow-hidden">
                  <NuxtImg src="/images/pages/requesting-accessible-van/wheelchair-van-door-open-close-up.jpeg" quality="60" placeholder width="1512" height="1134" alt="Golden Gate Manor Inc accessible van with the sliding door open with wheelchair secured (close up)" title="Golden Gate Manor Inc accessible van with the sliding door open with wheelchair secured (close up)" loading="lazy" format="webp,avif" class="w-full h-auto aspect-[4/3]" />
                </div>
                <div class="w-1/2 overflow-hidden">
                  <NuxtImg src="/images/pages/requesting-accessible-van/wheelchair-van-inside.jpeg" quality="60" format="webp,avif" placeholder width="1512" height="1134" alt="Golden Gate Manor Inc accessible van interior with wheelchair secured" title="Golden Gate Manor Inc accessible van interior" loading="lazy" class="w-full h-auto aspect-[4/3]" />
                </div>
              </div>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-brand-primary">Interior/exterior cameras</h2>
              <p class="text-xl text-brand-main-text">Just like our other vehicles, all of our accessible vans are equipped with interior/exterior cameras that are constantly recording. This is for the safety of our drivers, passengers, and also for any kind of incident that may be caught with the external camera coverage. All video is reviewed if there is an incident and is utilized for training our drivers as the cameras also utilize AI to track how the drivers are driving and following specific protocol in place by the city, state, and internal company policies.</p>
            </div>
          </div>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>
    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" class="cv-auto">
        <BaseLayoutPageContainer class="space-y-2">
          <h2 class="text-2xl font-bold text-brand-primary">Frequently Asked Questions</h2>
          <div class="space-y-4">
            <BaseInteractiveAccordionButton
              id="eligibility"
              :active-id="activeAccordionId"
              label="WHO IS ELIGIBLE?"
              :main-class="`bg-brand-primary text-white rounded-lg overflow-hidden group text-white ${activeAccordionId !== 'eligibility' ? 'hover:font-extrabold hover:bg-brand-primary/80' : ''}`"
              :button-class="`px-4 py-2 w-full text-left ${activeAccordionId === 'eligibility' ? 'border-b border-b-white' : ''}`"
              :content-class="`bg-brand-primary px-4 py-2 ${activeAccordionId !== 'eligibility' ? 'group-hover:bg-brand-primary/80' : ''}`"
              @update:active-id="updateId">
                <p class="text-xl text-white">
                  Anyone needing accommodation for mobility restrictions and needs to use the wheelchair vans is eligible to use them as long as they have an active Medicaid plan.
                </p>
            </BaseInteractiveAccordionButton>
            <BaseInteractiveAccordionButton
              id="caregiver"
              :active-id="activeAccordionId"
              label="CAN I BRING A CAREGIVER FOR ASSISTANCE?"
              :main-class="`bg-brand-primary text-white rounded-lg overflow-hidden group text-white ${activeAccordionId !== 'caregiver' ? 'hover:font-extrabold hover:bg-brand-primary/80' : ''}`"
              :button-class="`px-4 py-2 w-full text-left ${activeAccordionId === 'caregiver' ? 'border-b border-b-white' : ''}`"
              :content-class="`bg-brand-primary px-4 py-2 ${activeAccordionId !== 'caregiver' ? 'group-hover:bg-brand-primary/80' : ''}`"
              @update:active-id="updateId">
                <p class="text-xl text-white">
                  All trips, even outside of our accessible vehicles, are allowed an additional passenger if needed for help. Just make sure you talk to our team and make sure we know in advance to set everything up for the extra passenger accommodations.
                </p>
            </BaseInteractiveAccordionButton>
            <BaseInteractiveAccordionButton
              id="lifts-ramps"
              :active-id="activeAccordionId"
              label="DO YOUR ACCESSIBLE VANS HAVE LIFTS OR RAMPS?"
              :main-class="`bg-brand-primary text-white rounded-lg overflow-hidden group text-white ${activeAccordionId !== 'lifts-ramps' ? 'hover:font-extrabold hover:bg-brand-primary/80' : ''}`"
              :button-class="`px-4 py-2 w-full text-left ${activeAccordionId === 'lifts-ramps' ? 'border-b border-b-white' : ''}`"
              :content-class="`bg-brand-primary px-4 py-2 ${activeAccordionId !== 'lifts-ramps' ? 'group-hover:bg-brand-primary/80' : ''}`"
              @update:active-id="updateId">
                <p class="text-xl text-white">
                  All of our accessible vans are equipped with ramps along with wheelchair securement equipment to make sure that all passengers have safe modes of transporation to their appointments.                
                </p>
            </BaseInteractiveAccordionButton>
            <BaseInteractiveAccordionButton
              id="additional-cost"
              :active-id="activeAccordionId"
              label="IS THERE AN EXTRA CHARGE FOR ACCESSIBLE RIDES?"
              :main-class="`bg-brand-primary text-white rounded-lg overflow-hidden group text-white ${activeAccordionId !== 'additional-cost' ? 'hover:font-extrabold hover:bg-brand-primary/80' : ''}`"
              :button-class="`px-4 py-2 w-full text-left ${activeAccordionId === 'additional-cost' ? 'border-b border-b-white' : ''}`"
              :content-class="`bg-brand-primary px-4 py-2 ${activeAccordionId !== 'additional-cost' ? 'group-hover:bg-brand-primary/80' : ''}`"
              @update:active-id="updateId">
                <p class="text-xl text-white">
                  There are no extra charges for this additional accommodation. It is on a first come first serve basis though, which means that you should request transportation in advance to make sure that your trip can be accommodated.
                </p>
            </BaseInteractiveAccordionButton>
            <BaseInteractiveAccordionButton
              id="availability"
              :active-id="activeAccordionId"
              label="WHAT IF ALL ACCESSIBLE VANS ARE BOOKED?"
              :main-class="`bg-brand-primary text-white rounded-lg overflow-hidden group text-white ${activeAccordionId !== 'availability' ? 'hover:font-extrabold hover:bg-brand-primary/80' : ''}`"
              :button-class="`px-4 py-2 w-full text-left ${activeAccordionId === 'availability' ? 'border-b border-b-white' : ''}`"
              :content-class="`bg-brand-primary px-4 py-2 ${activeAccordionId !== 'availability' ? 'group-hover:bg-brand-primary/80' : ''}`"
              @update:active-id="updateId">
              <div class="space-y-2">
                <p class="text-xl text-white">
                  Unfortunately we are only able to accommodate when there is availability to do so. We suggest requesting the transportation 24-48 hours in advance at the minimum to increase the possibility for accommodation. If you really need the van you can request transportation a week in advance to try to secure that availability. We don't run into the issue with availability often but it is something to be aware of.
                </p>
                <p class="text-xl text-white">
                  If there are no accessible vans available we still have 40+ vehicles in our fleet to accommodate the trip but it would be with a vehicle that is less accommodating.
                </p>
              </div>
            </BaseInteractiveAccordionButton>
          </div>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>
    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" bg="alt" class="cv-auto">
        <BaseLayoutPageContainer>
          <div class="space-y-4">
            <div class="space-y-2">
              <h2 class="text-2xl font-bold text-brand-primary">Special Transportation Needs Recap</h2>
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
              <div class="flex justify-center">
                <BaseUiAction to="/company/contact-us" class="py-4 px-8">Contact Us</BaseUiAction>
              </div>
            </div>
          </div>
        </div>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'Requesting Wheelchair Accessible Transportation in Pueblo, Colorado',
  breadcrumbLabel: 'Requesting Accessible Vans'
})

const runtimeConfig = useRuntimeConfig()
const activeAccordionId = ref<string>('')
const updateId = (val: string) => activeAccordionId.value = val

useSeoMeta({
  title: 'Requesting Wheelchair Accessible Vans - NEMT ',
  ogTitle: 'Requesting Wheelchair Accessible Vans - NEMT ',
  description: 'Learn how to request wheelchair accessible transportation with Golden Gate Manor. Step-by-step guide for booking accessible NEMT services in Pueblo, Colorado.',
  ogDescription: 'Learn how to request wheelchair accessible transportation with Golden Gate Manor. Step-by-step guide for booking accessible NEMT services in Pueblo, Colorado.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Requesting Wheelchair Accessible Vans - NEMT ',
  twitterDescription: 'Learn how to request wheelchair accessible transportation with Golden Gate Manor. Step-by-step guide for booking accessible NEMT services in Pueblo, Colorado.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'HowToRequestAccessibleVansPage'
})

const company = useStaticData()?.company

</script>

<style>

</style>