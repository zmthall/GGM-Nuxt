<template>
  <div>
    <BaseLayoutPageBanner src="/images/pages/medical-supplies/medical-supply-banner.jpg" alt="A peak into our medical supply store" loading="eager" title="A peak into our medical supply store" image-width="935" image-height="464"/>
    <BaseLayoutPageSection margin="top">
      <BaseLayoutPageContainer class="space-y-4 flex flex-col">
        <h2 class="text-2xl font-bold text-brand-medical-primary">Golden Gate Medical Supply Overview:</h2>
        <p class="text-xl text-brand-main-text">
          Golden Gate Medical Supply, a division of Golden Gate Manor, proudly serves Colorado with affordable, accessible medical equipment and supplies through our convenient ecommerce platform, brick-and-mortar location in Pueblo, Colorado, and delivery services throughout Southern Colorado. We understand that navigating durable medical equipment and supplies can be overwhelming and sometimes it feels inaccessible. This is why we built our business around making the process easier, family-friendly, discreet, and accessible. Whether you're shopping online, visiting our store, or need items delivered directly to your residence, we're here to provide the medical solutions you need to allow you to live your life independently and with the quality you deserve. Our durable medical equipment and supplies come from well-known vendors.  We accept HSA, FSA, and most major insurance plans. Visit our <NuxtLink to="/resources/faq" class="link">FAQ page</NuxtLink> or contact us to learn about available payment options.
        </p>
        <BaseUiAction href="https://goldengatemedicalsupply.com/pages/about-us" :new-page="true" class="px-8 py-4 sm:self-center">Read More</BaseUiAction>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
    <BaseLayoutPageSection margin="default" bg="alt">
      <BaseLayoutPageContainer class="space-y-4">
        <h2 class="text-2xl font-bold text-brand-medical-primary">Our Products</h2>
        <p class="text-xl text-brand-main-text !mb-8">
          We carry a comprehensive selection of durable medical equipment and supplies curated to meet your everyday health and mobility needs. Our inventory spans from essential daily supplies to specialized mobility equipment, all selected for quality and affordability. If there is something you noticed not within our catalog or not mentioned, just ask about it and we can look into providing it. We work with well-known, trusted vendors in the durable medical equipment and supplies industry.
        </p>
        <ul class="space-y-8 sm:space-y-8">
          <li class="flex flex-col gap-4 md:flex-row md:gap-8 justify-center max-md:items-center">
            <div class="md:w-1/2 flex flex-col">
              <h3 class="text-xl font-bold text-brand-medical-primary flex flex-col mb-4 text-center">
                <span class="text-gray-500">
                  Orthotic Shoes
                </span>
                <span>
                  Professional Foot Care Solutions
                </span>
              </h3>
              <p class="text-xl text-brand-main-text">
                Professional-grade care and comfort is essential when it comes to footwear since your feet carry you through life. Our durable medical equipment includes Doctor Comfort orthotic shoes which combine the therapeutic benefits of orthotic shoes with everyday wearing. Our Dr. Comfort line is curated specifically for those who need specialized foot support, whether you're managing diabetes, arthritis, or other foot-related health concerns. Our experienced team works closely with you and your physician, or other health care provider, to ensure proper fitting and appropriate coverage. Whether you're paying out of pocket, or utilizing FSA or HSA payment methods, we are committed to keeping you comfortable, confident, and moving forward because we understand that proper footwear is essential to your overall health and mobility.
              </p>
              <div class="mt-4 w-max self-center space-x-8">
                <BaseUiAction href="https://goldengatemedicalsupply.com/pages/contact-us" :new-page="true" class="p-2">Contact Us</BaseUiAction>
              </div>
            </div>
            <div class="sm:p-4">
              <NuxtImg src="/images/pages/medical-supplies/orthotic-shoes.jpg" quality="60" format="webp" class="rounded-xl shadow-primary" title="Doctor Comfort shoe display" alt="Doctor Comfort shoe display" loading="lazy" height="375" width="375" placeholder />
            </div>
          </li>
          <li class="flex flex-col gap-4 md:flex-row md:gap-8 justify-center max-md:items-center">
            <div class="md:w-1/2 flex flex-col">
              <h3 class="text-xl font-bold text-brand-medical-primary flex flex-col mb-4 text-center">
                <span class="text-gray-500">
                  Mobility Aids
                </span>
                <span>
                  Empowering Your Independence
                </span>
              </h3>
              <p class="text-xl text-brand-main-text">
                We understand that maintaining your mobility and independence is essential to your quality of life. Our durable medical equipment includes a curated selection of mobility aids that are carefully chosen to meet your unique needs with dignity and respect. Our line includes walkers, rollators, wheelchairs, grab bars, and lift chairs. Whether you have insurance that covers them, you are utilizing FSA/HSA payment methods, or you are paying out of pocket, we are here to support you every step of the way. Our knowledgeable durable medical equipment specialists work discreetly with you and your healthcare provider to ensure you receive exactly the equipment you need, when you need it, to support your lifestyle. We strive to make sure that all of our patients live happy, independent lives because your comfort and confidence matters to us.
              </p>
              <div class="mt-4 w-max self-center space-x-8">
                <BaseUiAction href="https://goldengatemedicalsupply.com/collections/mobility-aids" :new-page="true" class="p-2">View Products</BaseUiAction>
                <BaseUiAction href="https://goldengatemedicalsupply.com/pages/contact-us" :new-page="true" class="p-2">Contact Us</BaseUiAction>
              </div>
            </div>
            <div class="sm:p-4">
              <NuxtImg src="/images/pages/medical-supplies/mobility.jpg" quality="60" format="webp" class="rounded-xl shadow-primary" title="Mobility aids (wheelchair, walker, rollator) provided by Golden Gate Medical Supplies" alt="Mobility aids (wheelchair, walker, rollator) provided by Golden Gate Medical Supplies" loading="lazy" height="375" width="375" placeholder/>
            </div>
          </li>
          <li class="flex flex-col gap-4 md:flex-row md:gap-8 justify-center max-md:items-center">
            <div class="md:w-1/2 flex flex-col">
              <h3 class="text-xl font-bold text-brand-medical-primary flex flex-col mb-4 text-center">
                <span class="text-gray-500">
                  Wound Care
                </span>
                <span>
                  Healing with Compassionate Care
                </span>
              </h3>
              <p class="text-xl text-brand-main-text">
                When it comes to recovering from an injury or surgery, proper wound care is crucial. From bandages and wraps to advanced wound care, we are committed to providing you with the highest quality medical supplies and support from well-known and trusted vendors. We strive to keep stress at the minimum so you can focus on healing, which is why we accept FSA/HSA and insurance providers to assist with different products such as gauze, dressings, xeroform dressings, and other specialized wound care products. We understand that each individual healing journey is personal, which is why we handle all wound care needs with the utmost discretion and professionalism. We strive to ensure you have access to the right products needed for a swift and easy recovery while maintaining your privacy and dignity throughout the process.
              </p>
              <div class="mt-4 w-max self-center space-x-8">
                <BaseUiAction href="https://goldengatemedicalsupply.com/collections/first-aid-wound-care" :new-page="true" class="p-2">View Products</BaseUiAction>
                <BaseUiAction href="https://goldengatemedicalsupply.com/pages/contact-us" :new-page="true" class="p-2">Contact Us</BaseUiAction>
              </div>
            </div>
            <div class="sm:p-4">
              <NuxtImg src="/images/pages/medical-supplies/wound-care.jpg" quality="60" format="webp" class="rounded-xl shadow-primary" title="Gauze bandages" alt="Gauze bandages" loading="lazy" height="375" width="375" placeholder/>
            </div>
          </li>
          <li class="flex flex-col gap-4 md:flex-row md:gap-8 justify-center max-md:items-center">
            <div class="md:w-1/2 flex flex-col">
              <h3 class="text-xl font-bold text-brand-medical-primary flex flex-col mb-4 text-center">
                 <span class="text-gray-500">
                   Ostomy Care
                 </span>
                 <span>
                   Living Fully with Confidence
                 </span>
               </h3>
               <p class="text-xl text-brand-main-text">
                  Life and confidence shouldn't have to be limited due to managing ostomy care. This is why we provide a line of comprehensive ostomy supplies and support devices to ensure you are able to live comfortably and confidently. We ensure that throughout the process of ordering medical supplies from us that your privacy is always protected through our discreet services. We understand that these specific items deserve to be handled with sensitivity to meet your unique needs. On top of this, we strive to make the process as simple as possible whether you will be paying for your ostomy supplies out of pocket, with FSA/HSA, or look into seeing if it is covered by your insurance. We are committed to providing reliable, high-quality medical supplies from well-known and trusted vendors. Our team is here to help you along the way to select the items you need from pouches and barriers, to accessories and skin care products to ensure you are able to live your life to the fullest.
               </p>
               <div class="mt-4 w-max self-center">
                 <BaseUiAction href="https://goldengatemedicalsupply.com/pages/contact-us" :new-page="true" class="p-2">Contact Us</BaseUiAction>
               </div>
            </div>
            <div class="sm:p-4">
              <NuxtImg src="/images/pages/medical-supplies/ostomy.jpg" quality="60" format="webp" class="rounded-xl shadow-primary" title="Example of Ostomy supplies" alt="Example of Ostomy supplies" loading="lazy" height="375" width="375" placeholder />
            </div>
          </li>
          <li class="flex flex-col gap-4 md:flex-row md:gap-8 justify-center max-md:items-center">
            <div class="md:w-1/2 flex flex-col">
              <h3 class="text-xl font-bold text-brand-medical-primary flex flex-col mb-4 text-center">
                <span class="text-gray-500">
                  Incontinence Care
                </span>
                <span>
                  Dignity and Comfort First
                </span>
              </h3>
              <p class="text-xl text-brand-main-text">
                We understand the fact that incontinence care not only requires reliable and exceptional products but also requires respect and sensitivity. Our staff members are trained to make sure the process of selecting incontinence supplies from our line of medical supplies is done so with your comfort, dignity, and lifestyle in mind. We handle each aspect of your care with complete discretion and respect, not only ensuring you receive the right products but also ensuring that you leave happy without compromise to your own personal privacy. From chux pads, bed pads/under pads, diapers, briefs, and pads, our team is dedicated to providing reliable and discreet service that helps you maintain your independence and confidence. Whether you're paying out of pocket, with FSA/HSA, checking eligibility through insurance, our team will support you every step of the way.
              </p>
              <div class="mt-4 w-max self-center">
                <BaseUiAction href="https://goldengatemedicalsupply.com/pages/contact-us" :new-page="true" class="p-2">Contact Us</BaseUiAction>
              </div>
            </div>
            <div class="sm:p-4">
              <NuxtImg src="/images/pages/medical-supplies/incontinence.jpg" quality="60" format="webp" class="rounded-xl shadow-primary" title="Example of incontinence (brief)" alt="Example of incontinence (brief)" loading="lazy" height="375" width="375" placeholder />
            </div>
          </li>
          <li class="flex flex-col gap-4 md:flex-row md:gap-8 justify-center max-md:items-center">
            <div class="md:w-1/2 flex flex-col">
              <h3 class="text-xl font-bold text-brand-medical-primary flex flex-col mb-4 text-center">
                <span class="text-gray-500">
                  Urology Supplies
                </span>
                <span>
                  Specialized Care You Can Trust
                </span>
              </h3>
              <p class="text-xl text-brand-main-text">
                Urological health requires specialized attention and the right supplies for optimal care and comfort. We provide a complete range of urology products and equipment from well-known and trusted vendors. Whether you're purchasing out of pocket, utilizing FSA/HSA payment methods, or inquiring about insurance coverage our professional team works with you and your healthcare providers to ensure that the products you receive are appropriate. Our professional team is trained to ensure all medical supply matters are handled with complete confidentiality and discretion. We are committed to supporting you on your health journey with dignity, respect, and with the specialized care you need. Whether you are needing help selecting the correct catheter, or need specific accessories such as urinary bags/covers, we are here to help you in whatever capacity is necessary to leave you feeling comfortable and confident.
              </p>
              <div class="mt-4 w-max self-center">
                <BaseUiAction href="https://goldengatemedicalsupply.com/pages/contact-us" :new-page="true" class="p-2">Contact Us</BaseUiAction>
              </div>
            </div>
            <div class="sm:p-4">
              <NuxtImg src="/images/pages/medical-supplies/urology.jpg" quality="60" format="webp" class="rounded-xl shadow-primary" title="Example of urology (catheter)" alt="Example of urology (catheter)" loading="lazy" height="375" width="375" placeholder />
            </div>
          </li>
        </ul>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
    <BaseLayoutPageSection margin="default" bg="default">
      <BaseLayoutPageContainer class="bg-brand-medical-primary rounded-lg shadow-primary">
        <h2 class="text-3xl font-bold text-white text-center pt-8">Insurance Information</h2>
        <div  class="flex flex-col lg:flex-row gap-8 mb-8 px-3 sm:px-6 lg:px-8 py-8">
          <div class="lg:w-1/2">
            <h3 class="text-2xl font-bold text-white mb-6">FAQs</h3>
            <ul class="space-y-4">
              <li>
                <BaseInteractiveAccordionButton
                  id="insurance"
                  :active-id="activeAccordionId"
                  label="What insurance do you take?"
                  :main-class="`bg-gray-200 rounded-lg overflow-hidden group ${activeAccordionId !== 'insurance' ? 'hover:font-extrabold hover:bg-gray-300' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionId === 'insurance' ? 'border-b border-b-black' : ''}`"
                  :content-class="`bg-gray-200 px-4 py-2 ${activeAccordionId !== 'insurance' ? 'group-hover:bg-gray-300' : ''}`"
                  @update:active-id="updateId">
                    <p class="text-xl text-brand-main-text">
                      Currently at this time the following insurances are accepted for Durable Medical Equipment. We are currently working to expand our availability when it comes to insurance. If there are any other questions or concerns involving insurance please reach us via <a href="tel:719-569-7361" class="link">phone</a> or through <a href="mailto:customersupport@goldengatemedicalsupply.com" class="link">email</a>.
                    </p>
                    <ul class="list-disc list-inside ml-4 text-xl text-brand-main-text">
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
                </BaseInteractiveAccordionButton>
              </li>
              <li>
                <BaseInteractiveAccordionButton
                  id="coverage"
                  :active-id="activeAccordionId"
                  label="What does my insurance cover?"
                  :main-class="`bg-gray-200 rounded-lg overflow-hidden group ${activeAccordionId !== 'coverage' ? 'hover:font-extrabold hover:bg-gray-300' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionId === 'coverage' ? 'border-b border-b-black' : ''}`"
                  :content-class="`bg-gray-200 px-4 py-2 ${activeAccordionId !== 'coverage' ? 'group-hover:bg-gray-300' : ''}`"
                  @update:active-id="updateId">
                    <p class="text-xl text-brand-main-text">
                      Reach out to your insurance provider to see if the item you are requesting is covered by your insurance.
                    </p>
                </BaseInteractiveAccordionButton>
              </li>
              <li>
                <BaseInteractiveAccordionButton
                  id="paperwork"
                  :active-id="activeAccordionId"
                  label="What do I have to fill out to request DME or supplies?"
                  :main-class="`bg-gray-200 rounded-lg overflow-hidden group ${activeAccordionId !== 'paperwork' ? 'hover:font-extrabold hover:bg-gray-300' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionId === 'paperwork' ? 'border-b border-b-black' : ''}`"
                  :content-class="`bg-gray-200 px-4 py-2 ${activeAccordionId !== 'paperwork' ? 'group-hover:bg-gray-300' : ''}`"
                  @update:active-id="updateId">
                    <p class="text-xl text-brand-main-text">
                      Before beginning the process of requesting DME and/or supplies, verify with your insurance provider to determine if the item being requested is covered through your insurance plan. Once insurance coverage is verified, contact a prescribing physician or practitioner to address the need or necessity of DME and/or supplies. The prescribing physician/practitioner will begin the process of collecting the materials necessary to show medical necessity to send to our DME Specialists. We cannot complete any orders without completing everything shown in the drop down titled "What We Need for Orders".
                    </p>
                </BaseInteractiveAccordionButton>
              </li>
              <li>
                <BaseInteractiveAccordionButton
                  id="dme"
                  :active-id="activeAccordionId"
                  label="What is Medicare's defintion of DME?"
                  :main-class="`bg-gray-200 rounded-lg overflow-hidden group ${activeAccordionId !== 'dme' ? 'hover:font-extrabold hover:bg-gray-300' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionId === 'dme' ? 'border-b border-b-black' : ''}`"
                  :content-class="`bg-gray-200 px-4 py-2 ${activeAccordionId !== 'dme' ? 'group-hover:bg-gray-300' : ''}`"
                  @update:active-id="updateId">
                    <ul class="list-disc list-inside ml-4 text-xl text-brand-main-text">
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
                </BaseInteractiveAccordionButton>
              </li>
              <li>
                <BaseInteractiveAccordionButton
                  id="repairs"
                  :active-id="activeAccordionId"
                  label="Does Golden Gate Medical Supplies do repairs?"
                  :main-class="`bg-gray-200 rounded-lg overflow-hidden group ${activeAccordionId !== 'repairs' ? 'hover:font-extrabold hover:bg-gray-300' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionId === 'repairs' ? 'border-b border-b-black' : ''}`"
                  :content-class="`bg-gray-200 px-4 py-2 ${activeAccordionId !== 'repairs' ? 'group-hover:bg-gray-300' : ''}`"
                  @update:active-id="updateId">
                    <p class="text-xl text-brand-main-text">
                      We do not specialize in repairs but have been known to do simple repairs to items such as replacing brakes, wheels, accessories, etc. Repairs are to be done at the discretion of the patient through a certified service.
                    </p>
                </BaseInteractiveAccordionButton>
              </li>
              <li>
                <BaseInteractiveAccordionButton
                  id="out-of-pocket"
                  :active-id="activeAccordionId"
                  label="Am I able to get DME and/or supplies out of pocket?"
                  :main-class="`bg-gray-200 rounded-lg overflow-hidden group ${activeAccordionId !== 'out-of-pocket' ? 'hover:font-extrabold hover:bg-gray-300' : ''}`"
                  :button-class="`px-4 py-2 w-full text-left ${activeAccordionId === 'out-of-pocket' ? 'border-b border-b-black' : ''}`"
                  :content-class="`bg-gray-200 px-4 py-2 ${activeAccordionId !== 'out-of-pocket' ? 'group-hover:bg-gray-300' : ''}`"
                  @update:active-id="updateId">
                    <p class="text-xl text-brand-main-text">
                      If you are looking to get medical equipment or supplies, you do not have to go through a prescriber to get the items you need. Before purchasing any items out of pocket, speak to a doctor or physician or practitioner to make sure you are getting the right items for the needs that you have. Ask about our unique rent-to-own programs so that we can help make the process more affordable.
                    </p>
                </BaseInteractiveAccordionButton>
              </li>
            </ul>
          </div>
          <div class="lg:w-1/2">
            <h3 class="text-2xl font-bold text-white mb-6">How Do I Check Eligibility?</h3>
            <ul class="space-y-4">
              <li class="pl-8 relative">
                <BaseIcon name="material-symbols:bookmark-check-rounded" class="text-white absolute left-0" />
                <p class="text-xl text-white">
                  The process is simple regardless of your insurance provider. First, discuss your medical supply/equipment needs with your doctor to get a prescription. From there, you can either call your insurance company to verify coverage for durable medical equipment/supplies, or let us do the work for you—just have your doctor fax the prescription to <span class="link">719-696-8548</span> and we'll check your eligibility and get back to you.
                </p>
              </li>
              <li class="pl-8 relative">
                <BaseIcon name="material-symbols:bookmark-check-rounded" class="text-white absolute left-0" />
                <p class="text-xl text-white">
                  When your coverage is confirmed, we take care of the rest. We'll work with your doctor to collect any additional information needed, then get your supplies to you in whatever way works best—delivered right to your door or available for pickup at our store located at <a href="https://maps.app.goo.gl/L4tgtVzH67ZwhLie6" target="_blank" rel="noopener" class="link">612 S. Union Ave., Pueblo CO 81004</a>.
                </p>
              </li>
            </ul>
            <a href="https://goldengatemedicalsupply.com/pages/contact-us" target="_blank" rel="noopener" class="ml-8 text-white font-extrabold underline text-xl mt-8 inline-block hover:text-brand-link-hover">Connect With Us Online</a>
          </div>
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'Medical Supplies & Equipment',
  breadcrumbLabel: 'Medical Supply'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Medical Supplies & Equipment',
  ogTitle: 'Medical Supplies & Equipment',
  description: 'Shop durable medical equipment and medical supplies at Golden Gate Manor Inc. Serving Pueblo and Southern Colorado with reliable healthcare solutions.',
  ogDescription: 'Shop durable medical equipment and medical supplies at Golden Gate Manor Inc. Serving Pueblo and Southern Colorado with reliable healthcare solutions.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-medical-supply.png`,
  twitterTitle: 'Medical Supplies & Equipment',
  twitterDescription: 'Shop durable medical equipment and medical supplies at Golden Gate Manor Inc. Serving Pueblo and Southern Colorado with reliable healthcare solutions.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-medical-supply.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
  name: 'MedicalSuppliesPage'
})

const activeAccordionId = ref<string>('');
const updateId = (val: string) => activeAccordionId.value = val
</script>

<style>

</style>