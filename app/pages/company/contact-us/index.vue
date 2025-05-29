import { BaseInteractiveLocationMap } from '../../../../.nuxt/components';
<template>
    <div>
      <!-- Main Contact Page Info -->
      <BaseLayoutPageSection margin="top" class="grid grid-cols-2 max-w-[1200px] mx-auto gap-8">
        <!-- Left Page -->
        <div class="space-y-2">
            <h2 class="font-extrabold text-2xl">GET IN TOUCH:</h2>
            <p class="text-xl ">
                Send us a message to get in touch with one of our team members. 
                We're here to address any inquiries, questions, or concerns you 
                may have regarding our transportation services, our assisted 
                living services, or our medical supply services.
            </p>
            <PleaseNote class="text-xl">
                <div class="space-y-2">
                    <p>This form is specifically for general inquiries and 
                    customer service-related matters. If you need to schedule a ride 
                    with our transportation service, please use our dedicated 
                    <a href="/contact-us/schedule-a-ride" class="link">Schedule A Ride</a> form.</p>
                    <p>We prioritize ride requests submitted 
                    through that form and cannot guarantee accommodation for rides 
                    requested through this contact form. We appreciate your 
                    understanding and look forward to assisting you!</p>
                </div>
            </PleaseNote>
            <div class="business-information">
                <BaseLayoutPageListItem title="Golden Gate Manor Inc." has-icon icon-size="size-12" icon-name="material-symbols:location-on-rounded">
                    <a href="" class="">648 S. Union Ave., Pueblo CO, 81004</a>
                </BaseLayoutPageListItem>
                <div class="contact-us-location">
                    <h3 class="contact-us-subtitle">Need Company Name</h3>
                    <a href="/about-us/location">
                        <span class="company-address anchor-text">Need Company Address</span>
                        <span class="company-address anchor-text">Need Company Address</span>
                    </a>
                </div>
                <div class="">
                    <h3 class="contact-us-subtitle">Phone</h3>
                    <a rel="nofollow" href="tel:<%- company.phone_number_nemt %>">Need NEMT Number</a>
                </div>
                <div class="">
                    <h3 class="">Hours</h3>
                    <p class="">
                        Need Reservation Hours
                    </p>
                </div>
            </div>
        </div>
        <!-- Right Page -->
        <div class="space-y-2">
            <h2 class="font-extrabold text-2xl">CONTACT US:</h2>
            <ContactUsForm />
        </div>
    </BaseLayoutPageSection>
    <BaseLayoutPageSection class="max-w-[1200px] mx-auto mb-16">
        <BaseInteractiveLocationMap />
    </BaseLayoutPageSection>
    </div>
</template>

<script setup lang='ts'>
definePageMeta({
  title: 'Contact Golden Gate Manor Team',
  breadcrumbLabel: 'Contact Us'
})

useHead({
    titleTemplate: null
})

const runtimeConfig = useRuntimeConfig();
useSeoMeta({
  title: 'Contact Golden Gate Manor Inc. | Southern Colorado',
  description: 'Get in touch with Golden Gate Manor Inc. for transportation, assisted living, and medical supply services. Proudly serving Pueblo and Southern Colorado.',
  ogTitle: 'Contact Golden Gate Manor Inc. | Southern Colorado',
  ogDescription: 'Get in touch with Golden Gate Manor Inc. for transportation, assisted living, and medical supply services. Proudly serving Pueblo and Southern Colorado.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Contact Golden Gate Manor Inc. | Southern Colorado',
  twitterDescription: 'Get in touch with Golden Gate Manor Inc. for transportation, assisted living, and medical supply services. Proudly serving Pueblo and Southern Colorado',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'ContactUsPage'
})
</script>

<style></style>