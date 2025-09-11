<template>
    <BaseLayoutPageContainer>
        <!-- Main Contact Page Info -->
        <BaseLayoutPageSection margin="pTop" class="md:grid md:grid-cols-2 md:max-w-[1200px] md:mx-auto md:gap-8">
        <!-- Left Page -->
            <div class="space-y-2">
                <h2 class="font-extrabold text-2xl max-sm:hidden">GET IN TOUCH:</h2>
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
                        <NuxtLink to="/resources/schedule-a-ride" class="link">Schedule A Ride</NuxtLink> form.</p>
                        <p>We prioritize ride requests submitted 
                        through that form and cannot guarantee accommodation for rides 
                        requested through this contact form. We appreciate your 
                        understanding and look forward to assisting you!</p>
                    </div>
                </PleaseNote>
                <div class="business-information">
                    <BaseLayoutPageListItem :title="company?.name" has-icon :size="12" icon-name="material-symbols:location-on-rounded">
                        <NuxtLink to="/company/location" class="link">{{ company?.address }}</NuxtLink>
                    </BaseLayoutPageListItem>
                    <BaseLayoutPageListItem  title="Phone" has-icon :size="12" icon-name="ic:round-call">
                        <a :href="`tel:${company?.phone}`" class="link">{{ company?.phone }}</a>
                    </BaseLayoutPageListItem>
                    <BaseLayoutPageListItem title="Hours" has-icon :size="12" icon-name="material-symbols:alarm-outline-rounded">
                        <span>{{ company?.hours }}</span>
                    </BaseLayoutPageListItem>
                    <BaseLayoutPageListItem class="mt-4 mb-8 ml-2 font-bold">
                        <h2 class="text-2xl font-bold uppercase mb-4">Get Connected:</h2>
                        <div>
                            <ul v-if="staticData" class="flex gap-4">
                            <li v-for="socialHandle in staticData.socialHandles" :key="socialHandle.id">
                                <NuxtLink :to="socialHandle.url">
                                <BaseIcon :name="socialHandle.icon" hover-color="hover:text-brand-link-hover" />
                                <span class="sr-only">{{ socialHandle.alt }}</span>
                                </NuxtLink>
                            </li>
                            </ul>
                        </div>
                    </BaseLayoutPageListItem>
                </div>
            </div>
            <!-- Right Page -->
            <div class="space-y-2">
                <h2 class="font-extrabold text-2xl">CONTACT US:</h2>
                <ContactUsForm />
            </div>
        </BaseLayoutPageSection>
        <BaseLayoutPageSection class="max-w-[1200px] mx-auto mb-16">
            <BaseInteractiveLocationMap styling="w-full h-[400px] mt-8 md:mt-4"/>
        </BaseLayoutPageSection>
    </BaseLayoutPageContainer>
</template>

<script setup lang='ts'>
const staticData = useStaticData()
const company = staticData?.company

definePageMeta({
  title: 'Contact Golden Gate Manor Team',
  alias: ['/company/contact-us/thank-you'],
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