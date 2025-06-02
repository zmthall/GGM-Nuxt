<template>
    <BaseLayoutPageSection margin="top">
      <BaseLayoutPageContainer class="space-y-4">
        <div>
          <h2 class="text-2xl font-bold text-brand-primary">Ride Cancellation & No-Show Policy</h2>
          <div class="ml-4 mt-2">
            <p><span class="font-bold">Applies To:</span> Non-Emergency Medical Transportation (NEMT), Non-Medical DSS/DHS-approved rides, and Pueblo City Cab on-demand services operated by Golden Gate Manor Inc.</p>
            <p><span class="font-bold">Version:</span> v1.0</p>
            <p><span class="font-bold">Last Updated:</span> June 1, 2025</p>
          </div>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-brand-primary mb-2">Purpose</h2>
          <p class="text-xl text-brand-main-text">Frequent late cancellations and rider no-shows leave vehicle slots unused, drive up operating costs, and reduce access for riders who genuinely need service. This policy establishes clear notice requirements, enforcement actions, and rescheduling rules to encourage timely cancellations and improve scheduling efficiency.</p>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-brand-primary mb-2">Scope</h2>
          <p class="text-xl text-brand-main-text">This policy covers all scheduled trips provided by Golden Gate Manor Inc., including:</p>
          <ul class="list-disc ml-8 text-xl text-brand-main-text">
            <li>NEMT rides (Medicaid-funded)</li>
            <li>Non-medical transportation authorized by DSS/DHS</li>
            <li>Pueblo City Cab on-demand and pre-scheduled service</li>
          </ul>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-brand-primary mb-2">Definitions</h2>
          <table class="border-collapse w-full text-center text-xl text-brand-main-text">
            <thead>
              <tr>
                <th class="border border-black p-4 font-bold">Term</th>
                <th class="border border-black p-4 font-bold">Definition</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-black p-4">Cancellation</td>
                <td class="border border-black p-4">Rider notifies Dispatch and the trip is removed from the manifest.</td>
              </tr>
              <tr>
                <td class="border border-black p-4">On-time cancellation</td>
                <td class="border border-black p-4">Notice received ≥24 hours before pickup (≥48hrs preferred). For long-distance trips, ≥24hrs is mandatory.</td>
              </tr>
              <tr>
                <td class="border border-black p-4">Same-day cancellation</td>
                <td class="border border-black p-4">Notice received &lt;24hrs but ≥2hrs before pickup.</td>
              </tr>
              <tr>
                <td class="border border-black p-4">No-show</td>
                <td class="border border-black p-4">Driver arrives, waits the grace period (5-10 minutes), and the rider is unreachable or declines service.</td>
              </tr>
              <tr>
                <td class="border border-black p-4">Strike</td>
                <td class="border border-black p-4">A recorded no‑show or &lt;2hrs cancellation counted toward enforcement limits.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-brand-primary mb-2">Notice Requirements</h2>
          <table class="border-collapse w-full text-center sm:text-xl text-brand-main-text">
            <thead>
              <tr>
                <th class="border border-black p-2 sm:p-4 font-bold">Ride Type</th>
                <th class="border border-black p-2 sm:p-4 font-bold">Minimum Notice (On-Time)</th>
                <th class="border border-black p-2 sm:p-4 font-bold">Same-Day Window</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-black p-2 sm:p-4">Local trips (≤40mi round-trip)</td>
                <td class="border border-black p-2 sm:p-4">≥24hrs</td>
                <td class="border border-black p-2 sm:p-4">≥2hrs</td>
              </tr>
              <tr>
                <td class="border border-black p-2 sm:p-4">Long-distance (>40mi round-trip)</td>
                <td class="border border-black p-2 sm:p-4">≥24hrs (mandatory)</td>
                <td class="border border-black p-2 sm:p-4">N/A - cancellations &lt;24hrs count as no-show</td>
              </tr>
              <tr>
                <td class="border border-black p-2 sm:p-4">Standing / recurring rides</td>
                <td class="border border-black p-2 sm:p-4">Follow local vs. long-distance rule for each occurrence</td>
                <td class="border border-black p-2 sm:p-4">Riders should request new trips ≥24-48hrs in advance to maximize availability.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-brand-primary mb-2">How to Cancel</h2>
          <ol class="list-decimal ml-8 text-xl text-brand-main-text">
            <li>
              <p>Call Our Customer Service Representatives:</p>
              <ul class="list-disc ml-8">
                <li><p>Administrative phones are staffed 8:00AM to 4:00PM. Call <a :href="`tel:${company?.trans.phone.office}`" class="link">{{ company?.trans.phone.office }}</a>.</p></li>
                <li><p>If after hours call our dispatch line, which is 24/7,  at <a :href="`tel:${company?.trans.phone.dispatch}`" class="link">{{ company?.trans.phone.dispatch }}</a>.</p></li>
              </ul>
            </li>
            <li>
              <p>Cancellation is effective only when a dispatcher verbally confirms the ride is removed from the schedule.</p>
              <ul class="list-disc ml-8">
                <li>
                  <p>Other channels (web forms, email, app) are not guaranteed to be monitored continuously and must not be used for time-sensitive cancellations.</p>
                </li>
              </ul>
            </li>
          </ol>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-brand-primary mb-2">Grace Period & Driver Arrival</h2>
          <ul class="list-disc ml-8 text-xl text-brand-main-text">
            <li>
              <p>Driver calls on arrival.</p>
            </li>
            <li>
              <p>Rider is allowed 5-10 minutes to board.</p>
            </li>
            <li>
              <p>After the grace period, the trip is marked no-show unless rider makes contact and an extended wait is approved by Dispatch.</p>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-brand-primary mb-2">Enforcement (Strike System)</h2>
          <table class="border-collapse text-center text-xl text-brand-main-text mb-2">
            <thead>
              <tr>
                <th class="border border-black p-4 font-bold">Infraction</th>
                <th class="border border-black p-4 font-bold">Strike Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-black p-4">No-show</td>
                <td class="border border-black p-4">1 strike</td>
              </tr>
              <tr>
                <td class="border border-black p-4">Cancellation &lt;2hrs notice</td>
                <td class="border border-black p-4">1 strike</td>
              </tr>
            </tbody>
          </table>
          <ul class="list-disc ml-8 text-xl text-brand-main-text">
            <li>
              <p>3 strikes within a rolling 30-day period → Service suspension (“fired as a client”).</p>
            </li>
            <li>
              <p>Strikes remain on record for 1 calendar year and then expire.</p>
            </li>
            <li>
              <p>Reinstatement is at the sole discretion of Golden Gate Manor Inc.; the company is under no obligation to reconsider suspended riders.</p>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-brand-primary mb-2">Exceptions</h2>
          <p class="text-xl text-brand-main-text">Golden Gate Manor Inc. may waive strikes for:</p>
          <ul class="list-disc ml-8 text-xl text-brand-main-text">
            <li>
              <p>Documented medical emergencies or hospital admission</p>
            </li>
            <li>
              <p>Severe weather or declared road closures</p>
            </li>
            <li>
              <p>Dispatch/driver error</p>
            </li>
          </ul>
          <p class="text-xl text-brand-main-text">Waivers are granted case-by-case; habitual abuse may override individual excuses.</p>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-brand-primary mb-2">Rescheduling After Cancellation</h2>
          <ul class="list-disc ml-8 text-xl text-brand-main-text">
            <li>
              <p>On-time cancellations may be re-booked immediately, subject to vehicle availability.</p>
            </li>
            <li>
              <p>Same-day cancellations can request a new slot, but availability is not guaranteed.</p>
            </li>
            <li>
              <p>All new ride requests must be placed at least ≥24hrs before desired pickup whenever possible.</p>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-brand-primary mb-2">Recordkeeping</h2>
          <ul class="list-disc ml-8 text-xl text-brand-main-text">
            <li>
              <p>Cancellations and no-shows are logged in the rider's file and dispatch software.</p>
            </li>
            <li>
              <p>Records are retained 7 years to comply with state program rules.</p>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-brand-primary mb-2">Policy Review & Updates</h2>
          <ul class="list-disc ml-8 text-xl text-brand-main-text">
            <li>
              <p>Reviewed annually by Upper Management.</p>
            </li>
            <li>
              <p>Interim updates may be issued when regulatory or operational changes require.</p>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-brand-primary">Contact</h2>
          <p class="text-xl text-brand-main-text">
            Questions about this policy or appeals of recorded strikes may be directed to <a href="mailto:contact@goldengatemanor.com" class="link">contact@goldengatemanor.com</a>, or you can use the contact form below.
          </p>
          <ContactUsForm class="bg-white mt-8 p-4 md:p-8 rounded-lg md:w-3/4 mx-auto" />
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
</template>

<script setup lang='ts'>
definePageMeta({
  title: 'Ride Cancellation Policy',
  breadcrumbLabel: 'Ride Cancellation'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Ride Cancellation Policy',
  ogTitle: 'Ride Cancellation Policy',
  description: 'Understand the ride cancellation policy at Golden Gate Manor Inc., designed to maximize service reliability for our transportation clients.',
  ogDescription: 'Understand the ride cancellation policy at Golden Gate Manor Inc., designed to maximize service reliability for our transportation clients.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Ride Cancellation Policy',
  twitterDescription: 'Understand the ride cancellation policy at Golden Gate Manor Inc., designed to maximize service reliability for our transportation clients.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'RideCancellationPolicyPage'
})

const company = useStaticData()?.company
</script>

<style></style>