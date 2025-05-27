import { BaseInteractiveLocationMap } from '../../../../.nuxt/components';
<template>
    <div>
      <!-- Main Contact Page Info -->
      <section class="contact-us-get-in-touch page-content">
        <!-- Left Page -->
        <div class="get-in-touch-text-wrapper contact-us-get-in-touch-wrapper">
            <h2>GET IN TOUCH:</h2>
            <p class="section-text">
                Send us a message to get in touch with one of our team members. 
                We're here to address any inquiries, questions, or concerns you 
                may have regarding our transportation services, our assisted 
                living services, or our medical supply services.
            </p>
            <p class="section-text please-note">
                <span class="please-note">Please Note:</span> This form is specifically for general inquiries and 
                customer service-related matters. If you need to schedule a ride 
                with our transportation service, please use our dedicated 
                <a href="/contact-us/schedule-a-ride">Schedule A Ride</a> form. We prioritize ride requests submitted 
                through that form and cannot guarantee accommodation for rides 
                requested through this contact form. We appreciate your 
                understanding and look forward to assisting you!
            </p>
            <div class="business-information">
                <div class="contact-us-location">
                    <h3 class="contact-us-subtitle">Need Company Name</h3>
                    <a href="/about-us/location">
                        <span class="company-address anchor-text">Need Company Address</span>
                        <span class="company-address anchor-text">Need Company Address</span>
                    </a>
                </div>
                <div class="contact-us-phone">
                    <h3 class="contact-us-subtitle">Phone</h3>
                    <a rel="nofollow" href="tel:<%- company.phone_number_nemt %>">Need NEMT Number</a>
                </div>
                <div class="contact-us-hours">
                    <h3 class="contact-us-subtitle">Hours</h3>
                    <p class="contact-us-information">
                        Need Reservation Hours
                    </p>
                </div>
            </div>
        </div>
        <!-- Right Page -->
        <div class="get-in-touch-form-wrapper contact-us-get-in-touch-wrapper">
            <h2>CONTACT US:</h2>
            <ContactUsForm />
            <!-- <%- include('../components/contact-form', { page: page, helper: helper }) %> -->
        </div>
    </section>
    <BaseInteractiveLocationMap />
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