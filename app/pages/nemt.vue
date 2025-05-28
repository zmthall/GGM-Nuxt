<template>
  <div>
    <!-- Top Page -->
    <BaseLayoutPageSection class="" margin="top">
      <div class="non-emergency-transportation-top-page-left">
        <p class="section-text">
          Non-Emergent Medical Transportation (NEMT) is transportation
          to and from covered non-emergency medical appointments and
          services; if it is a Medicaid approved appointment we can
          get you there. With our fleet of over 40 vehicles, we can
          make sure that our clients make it to and from their
          appointments on time.
        </p>
        <table class="nemt-table">
          <tbody>
            <tr class="nemt-row">
              <th colspan="2" class="nemt-header">Types of Transportation Available in Pueblo</th>
            </tr>
            <tr class="nemt-row">
              <td class="nemt-table-data">Bus</td>
              <td class="nemt-table-data">Citi Lift</td>
            </tr>
            <tr class="nemt-row">
              <td class="nemt-table-data">Mobility Van</td>
              <td class="nemt-table-data">Taxicab</td>
            </tr>
            <tr class="nemt-row">
              <td class="nemt-table-data">Private Vehicle</td>
              <td class="nemt-table-data">Non-Emergency Vehicle</td>
            </tr>
            <tr class="nemt-row">
              <td colspan="2" class="nemt-table-data">Mileage Reimbursement</td>
            </tr>
          </tbody>
        </table>
        <a 
          href="/pdfs/nemt/nemt-app&medical-certificate-of-trans-services.pdf" target="_blank" rel="noopener nofollow"
          class="form-button">
          <div class="nemt-form-button-text-wrapper">
            <span class="top-btn-text nemt-text-span">
              <BaseIcon name="uiw:file-pdf" /> DOWNLOAD HERE >>>
            </span>
            <span class="bottom-btn-text nemt-text-span">Medical Certificate of Transportation Service Form</span>
          </div>
        </a>
      </div>
      <div class="non-emergency-transportation-top-page-right">
        <iframe 
          width="100%" height="350" src="https://www.youtube.com/embed/fJ8_uvrsYXo?si=qhdETT5Lqh8IiQSm"
          title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin" allowfullscreen />
      </div>
    </BaseLayoutPageSection>

    <!-- Transportation Information -->
    <BaseLayoutPageSection class="" margin="default" bg="alt">
      <h2 class="section-title">Transportation Information</h2>
      <div class="nemt-information-wrapper">
        <div class="nemt-transportation-information-faq">
          <h3 class="content-title dark-background">FAQs</h3>
          <ul class="section-list-container">
            <li class="faqs-list-item">
              <button type="button" data-faqs-btn="0" class="faqs-dropdown-button">WHO IS ELIGIBLE?</button>
              <div class="faqs-list-content" data-faqs-container="0">
                <p class="faqs-text">
                  Your client may be eligible if they have a
                  current Medicaid Insurance ID and are going
                  to a Medicaid approved appointment.
                </p>
              </div>
            </li>
            <li class="faqs-list-item">
              <button type="button" data-faqs-btn="1" class="faqs-dropdown-button">HOW DO THEY SCHEDULE A RIDE?</button>
              <div class="faqs-list-content" data-faqs-container="1">
                <p class="faqs-text">
                  To help us serve you better, please schedule your ride
                  at least 24 hours in advance by calling <a 
                    rel="nofollow"
                    href="tel:<%- company.phone_number_nemt %>">Need NEMT Number</a> between 8:00 AM
                  and 4:00 PM, Monday through Friday. This allows us the
                  necessary time to arrange your transportation efficiently.
                </p>
                <p class="faqs-text">
                  If it is after normal business hours, call our dispatch at
                  <a rel="nofollow" href="tel:<%- company.phone_number_dispatch %>">
                    Need Dispatch Number
                  </a>.
                </p>
                <a href="/contact-us/schedule-a-ride" class="link-spacing">
                  Schedule A Ride Online
                </a>
              </div>
            </li>
            <li class="faqs-list-item">
              <button type="button" data-faqs-btn="2" class="faqs-dropdown-button">HOW DO THEY CANCEL A RIDE?</button>
              <div class="faqs-list-content" data-faqs-container="2">
                <p class="faqs-text">
                  If you need to cancel a ride, please call at least two hours
                  before your scheduled pick-up time at <a 
                    rel="nofollow"
                    href="tel:<%- company.phone_number_nemt %>">Need NEMT Number</a>.
                </p>
                <p class="faqs-text">
                  If it is after
                  normal business hours, call our dispatch at
                  <a rel="nofollow" href="tel:<%- company.phone_number_dispatch %>">
                    Need Dispatch Number
                  </a>.
                </p>
              </div>
            </li>
            <li class="faqs-list-item">
              <button type="button" data-faqs-btn="3" class="faqs-dropdown-button">WHICH SERVICES ARE COVERED?</button>
              <div class="faqs-list-content" data-faqs-container="3">
                <p class="faqs-text">
                  We provide transportation assistance for
                  those services covered by Medicaid. We cannot
                  transport to services not covered under the
                  Medicaid program.
                </p>
              </div>
            </li>
            <li class="faqs-list-item">
              <button type="button" data-faqs-btn="4" class="faqs-dropdown-button">HOW DOES THE CLIENT GET
                APPROVED?</button>
              <div class="faqs-list-content" data-faqs-container="4">
                <p class="faqs-text">
                  The attending Physician, Physician’s
                  Assistant, Nurse Practitioner, Therapist, or
                  licensed healthcare professional must
                  complete and sign the Medical Certificate of
                  Transportation Services.
                </p>
                <p class="faqs-text">
                  If a client lives beyond 25 miles from the
                  Medical Provider then the additional 25 mile
                  form must be filled out, which is found
                  within the
                </p>
                <a 
                  href="/pdfs/Medical Certificate of Transportation Service.pdf" target="_blank"
                  rel="noopener nofollow" class="link-spacing">Medical Certificate of Transportation Service Form</a>
              </div>
            </li>
            <li class="faqs-list-item">
              <button type="button" data-faqs-btn="5" class="faqs-dropdown-button">WHEN SHOULD THEY BE READY FOR THEIR
                RIDE?</button>
              <div class="faqs-list-content" data-faqs-container="5">
                <p class="faqs-text">
                  When you call us for a ride, we will give you
                  the timeframe you should be ready to be
                  picked up by. For shared rides, you may be asked
                  to be ready earlier than expected. Unexpected
                  delays may occur due to traffic or weather
                  conditions.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div class="nemt-transportation-information-schedule-ride">
          <h3 class="content-title dark-background">How Do I Schedule A Ride?</h3>
          <ul class="section-list-container">
            <li class="information-list-item">
              <p class="information-content-text dark-background">
                Once approved, please call at least 48 hours before your
                appointment to schedule a ride. Reservation hours are Monday
                to Friday, 8:00 AM – 4:00 PM. To cancel a scheduled ride,
                please call at least two hours before your scheduled pick-up.
              </p>
            </li>
            <li class="information-list-item">
              <p class="information-content-text dark-background">
                Our office is open Monday to Friday, 8:00 AM – 4:00 PM, for any
                questions, cancellations, or urgent care appointments. Urgent
                appointments are scheduled based on availability; therefore trips are not always guaranteed.
              </p>
            </li>
          </ul>
          <a href="/contact-us/schedule-a-ride" class="link-spacing dark-background">Schedule A Ride Online</a>
        </div>
      </div>
      <div class="nemt-information-wrapper">
        <h2 class="section-title dark-background">
          DRIVERS AND APPOINTMENTS AVAILABLE 24/7
        </h2>
        <div class="during-business-hours-wrapper appointment-schedule-information-container">
          <h3 class="section-sub-title dark-background">
            During Business Hours Call:
          </h3>
          <a rel="nofollow" href="tel:<%- company.phone_number_nemt %>" class="nemt-page-anchor dark-background">
            <span class="nemt-span-logo">
              <BaseIcon name="ic:round-call" />
            </span>
            <span class="nemt-span-text">
              Need NEMT Number
            </span>
          </a>
          <a 
            rel="nofollow" href="tel:<%- company.phone_number_dispatch_toll %>"
            class="nemt-page-anchor dark-background">
            <span class="nemt-span-logo">
              <BaseIcon name="ic:round-call" />
            </span>
            <span class="nemt-span-text">
              Need Toll Free Dispatch Number
            </span>
          </a>
          <p class="information-content-text dark-background">
            <BaseIcon name="material-symbols:alarm-rounded" /> Office Hours: M-F 8:00AM-4:00PM
          </p>
        </div>
        <div class="after-business-hours-wrapper appointment-schedule-information-container">
          <h3 class="section-sub-title dark-background">After Business Hours Call:</h3>
          <a rel="nofollow" href="tel:<%- company.phone_number_dispatch %>" class="nemt-page-anchor dark-background">
            <span class="nemt-span-logo">
              <BaseIcon name="ic:round-call" />
            </span>
            <span class="nemt-span-text">
              Need Dispatch Number
            </span>
          </a>
        </div>
      </div>
    </BaseLayoutPageSection>

    <!-- Eligible Places of Service -->
    <BaseLayoutPageSection class="" data-eligible-places-container margin="default">
      <h2 class="section-title">Eligible Places of Services</h2>
      <div class="nemt-transportation-eligible-places-wrapper">
        <div class="nemt-transportation-eligible-places-text nemt-transportation-content">
          <ul class="section-list-container nemt-page">
            <li class="information-list-item">
              <p class="section-text">
                Transportation of clients to/from a Medicaid enrolled
                provider to a Colorado Medicaid covered service.
              </p>
            </li>
            <li class="information-list-item">
              <p class="section-text">
                All regions on the map highligted in green are within the
                jurisdiction of Golden Gate Manor in the State of Colorado.
                We happily service anyone within our serviceable area.
              </p>

              <p class="section-text">
                Click on the map, or zoom in if you're on a mobile device, to see an
                expanded version.
              </p>
            </li>
            <li class="information-list-item">
              <p class="section-text">
                Give us a call at <a rel="nofollow" href="tel:<%- company.phone_number_nemt %>">Need NEMT Number</a> for eligibility in your
                county. If after hours, call <a rel="nofollow" href="tel:<%- company.phone_number_dispatch_toll %>">
                  Need Dispatch Toll Free Number</a>.
              </p>
            </li>
          </ul>
        </div>
        <div class="nemt-transportation-eligible-places-map nemt-transportation-content">
          <div 
            class="GGMT-service-area-map-container" aria-modal="true" role="button" aria-hidden="true"
            data-map-container>
            <img 
              src="/images/pages/nemt/ggmt-service-map.jpg"
              alt="Map of Colorado Counties serviceable area that includes all of Colorado excluding: Boulder, Larimer, Weld, Broomfield, Denver, Adams, Jefferson, Douglas, and Arapahoe counties">
          </div>
        </div>
      </div>
    </BaseLayoutPageSection>

    <!-- Driver Safety -->

    <BaseLayoutPageSection class="" margin="default" bg="alt">
      <div class="nemt-transportation-driver-safety-text-content">
          <h2 class="section-title driver-safety">
              <span class="top-header-text">Safe Drivers</span>
              <span class="bottom-header-text">Camera Equipped Vehicles</span>
          </h2>
          <p class="section-text dark-background">
              There are both front and rear facing cameras installed in 
              all of our company vehicles. They have the added benefit of 
              ensuring our drivers are not distracted. In addition, they 
              will be documenting any events that may occur while a 
              client is utilizing our services.
          </p>
      </div>
      <div class="nemt-transportation-driver-safety-image-content">
          <div class="driver-safety-images-dash">
              <img src="/images/pages/nemt/vehicle-camera.jpg" alt="Vehicles equipped with front and back facing cameras">
          </div>
          <div class="driver-safety-images-camera">
              <img src="/images/pages/nemt/distracted-driver-recognition.jpg" alt="Cameras recognize distractions">
              <img src="/images/pages/nemt/dash-cam.jpg" alt="An example of the mounted camera">
          </div>
      </div>    
  </BaseLayoutPageSection>
  </div>
</template>

<script setup lang='ts'>
definePageMeta({
  title: 'Non-Emergency Medical Transportation',
  breadcrumbLabel: 'NEMT'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Non-Emergency Medical Transportation',
  ogTitle: 'Non-Emergency Medical Transportation',
  description: 'Reliable Non-Emergency Medical Transportation (NEMT) in Southern Colorado with wheelchair accessibility, safety features, and experienced drivers.',
  ogDescription: 'Reliable Non-Emergency Medical Transportation (NEMT) in Southern Colorado with wheelchair accessibility, safety features, and experienced drivers.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Non-Emergency Medical Transportation',
  twitterDescription: 'Reliable Non-Emergency Medical Transportation (NEMT) in Southern Colorado with wheelchair accessibility, safety features, and experienced drivers.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
  name: 'NemtPage'
})
</script>

<style></style>