<template>
    <div>
        <!-- Page Banner -->
        <BaseLayoutPageBanner src="/images/pages/non-medical/car-lineup.jpg" alt="Line-up of Golden Gate Manor Inc cars in Pueblo Colorado" image-height="464" image-width="935" title="Line-up of Golden Gate Manor Inc cars in Pueblo Colorado" aspect-ratio="aspect-[2/1]"/>
        <!-- Main Content -->
        <BaseLayoutPageSection margin="top">
            <BaseLayoutPageContainer class="space-y-4">
                <h2 class="text-2xl font-bold text-brand-primary">Overview of Non-Medical Transportation</h2>
                <p class="text-xl text-brand-main-text">
                    Golden Gate Manor Transportation understands that it may not always be possible to depend solely on assistance from family members, friends, or public transportation for your travel needs in Pueblo, Colorado - especially when you want to maintain your independence. Having access to safe, reliable non-medical transportation can be difficult to find in Pueblo County and Otero County, which is why we're here to provide a solution. With our fleet of 40+ vehicles, you can count on us to get you where you need to be while preserving your independence.
                </p>
                <p class="text-xl text-brand-main-text">
                    We are proud to be one of the only companies in Pueblo county/Otero county to provide DSS/DHS approved non-medical transportation to eligible community members who are disabled and or elderly and are also receiving Medicaid assistance. Whether you need to run personal errands, attend a family event, or just get out into the community for other recreational activities, Golden Gate Manor Transportation/Pueblo City Cab can get you there fast and reliably. We are always happy to answer any questions you may have about the process.
                </p>
                <div class="flex flex-col gap-8 md:flex-row md:justify-center !mt-16">
                    <BaseUiAction to="/company/contact-us" class="py-4 md:py-0 md:flex md:items-center md:justify-center md:h-[75px] md:w-[150px]">Contact Us</BaseUiAction>
                </div>
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>

        <DeferRender when="visible">
            <BaseLayoutPageCTA 
            title="Already approved through DSS/DHS?"
            description="Use our online scheduling form to quickly book your non-medical transportation and get where you need to go faster! We'll do our best to accommodate your trip, especially when scheduled 24 to 48 hours in advance."
            button-label="Schedule A Ride Now"
            to="/resources/schedule-a-ride"
            />
        </DeferRender>
        <DeferRender when="visible">
            <BaseLayoutPageSection margin="default" bg="alt" class="cv-auto">
                <BaseLayoutPageContainer class="space-y-4">
                    <div class="flex justify-center items-center lg:flex-row flex-col lg:gap-8 gap-4">
                        <div class="lg:w-1/2 space-y-4">
                            <h2 class="text-2xl font-bold text-brand-primary">How Do I Schedule a Ride?</h2>
                            <p class="text-xl text-brand-main-text">
                                If you have never used our services for non-medical transportation needs, please start by contacting the Department of Human Services (DHS) at <a href="tel:719-583-6900" class="link">(719) 583-6900</a> to determine your ride accommodation eligibility or following the steps on the <a href="https://hcpf.colorado.gov/nmt" rel="noreferrer noopener" target="_blank" class="link">Health Care Policy & Financing website for non-medical transportation</a>. If you are on Medicaid and are also on a Home Community Based Service Waiver, you may be approved through DHS for non-medical transportation services here in Pueblo, Colorado (including Pueblo West, Colorado). After this step, when you are ready to schedule your first ride with Golden Gate Manor Transportation/Pueblo City Cab, call us by calling <a :href="`tel:${company.trans.phone.dispatch}`" class="link">{{ company.trans.phone.dispatch }}</a>. 
                            </p>
                        </div>
                        <div class="md:w-1/2 aspect-[5/3] overflow-hidden rounded-xl shadow-primary max-md:w-[80%] mx-auto">
                            <NuxtImg src="/images/pages/non-medical/city-cab-golden-gate-cars.jpg" class="w-full h-auto mx-auto" quality="60" format="webp,avif" title="Golden Manor Inc and City Cab Cars" alt="Golden Manor Inc and City Cab Cars" loading="lazy" height="960" width="1600" sizes="md:800px 80vw" placeholder />
                        </div>  
                    </div>
                    <p class="text-xl text-brand-main-text">
                        Using our 40+ vehicles, drivers and appointments are available 24 hours a day, 7 days a week. Our dispatch services run 24/7 to accommodate the needs of our clients. If it seems like Golden Gate Manor Transportation isn't available, <BaseUiAction href="https://www.pueblocitycab.com/" new-page variant="link" title="Opens in new tab">Pueblo City Cab</BaseUiAction> is our sister company that is open 24 hours a day 365 days a year. Please be sure to contact us 24 to 48 hours in advance of your trip departure so that we can accommodate the trip and have more of a guarantee for availability.
                    </p>
                    <!-- <div class="flex justify-center"> need to implement a page for non-medical transportation on how to schedule a ride
                        <SupportCenterTile to="/resources/support-center/schedule-a-ride" name="heroicons-outline:calendar-days" title="How to Schedule a Ride" message="Instructions on how to request trips to medical appointments" />
                    </div> -->
                </BaseLayoutPageContainer>
            </BaseLayoutPageSection>
        </DeferRender>
        <DeferRender when="visible">
            <BaseLayoutPageSection margin="default" class="cv-auto">
                <BaseLayoutPageContainer class="space-y-6 flex flex-col items-center">
                    <div class="space-y-4 md:space-y-8">
                        <h2 class="text-2xl font-bold text-brand-primary">What Information Do I Need?</h2>
                        <div class="flex justify-center items-center md:flex-row flex-col md:gap-8 gap-4">
                            <div class="md:w-1/2 aspect-[113/56] overflow-hidden rounded-xl shadow-primary max-md:w-[80%] mx-auto">
                                <NuxtImg src="/images/pages/non-medical/suv-train.jpg" class="w-full h-auto" quality="60" format="webp,avif" title="Transportation vehicle near the Sante Fe Train at the Pueblo train depo" alt="Transportation vehicle near the Sante Fe Train at the Pueblo train depo" loading="lazy" height="448" width="904" sizes="md:904px 80vw" placeholder />
                            </div>
                            <p class="text-xl text-brand-main-text md:w-1/2">
                                Before riding with Golden Gate Manor Transportation, eligibility must be approved by the Department of Human Services (DHS); be prepared before contacting us, by first contacting DHS at <a href="tel:719-583-6900" class="link">719-583-6900</a> for ride accommodation eligibility approval. Once eligibility is approved and you have your number of monthly allotted trips, contact us by calling <a :href="`tel:${company.trans.phone.dispatch}`" class="link">{{ company.trans.phone.dispatch }}</a> and be ready to provide your name and pickup address as well as the destination you are traveling to. Our trained customer service representatives will walk you through the steps of scheduling the ride and any other pertinent information relating to the trip will be requested while on the phone, including but not limited to:
                            </p>
                        </div>
                        <div class="flex flex-row flex-wrap justify-center text-xl gap-8">
                            <BaseInteractiveHoverTile class="sm:w-[300px] sm:h-[300px] w-full flex flex-col justify-center">
                                <p class="font-bold">Personal Information:</p>
                                <ul class="ml-8 list-disc">
                                    <li>Your full name</li>
                                    <li>Your Health First Colorado ID number</li>
                                    <li>Your date of birth</li>
                                    <li>Your pickup address</li>
                                </ul>
                            </BaseInteractiveHoverTile>
                            <BaseInteractiveHoverTile class="sm:w-[300px] sm:h-[300px] w-full flex flex-col justify-center">
                                <p class="font-bold">Destination Details:</p>
                                <ul class="ml-8 list-disc">
                                    <li>Date and time of your transportation</li>
                                    <li>Complete address of destination</li>
                                </ul>
                            </BaseInteractiveHoverTile>
                            <BaseInteractiveHoverTile class="sm:w-[300px] sm:h-[300px] w-full flex flex-col justify-center">
                                <p class="font-bold">Additional Passengers:</p>
                                <ul class="ml-8 list-disc">
                                    <li>Determine if you will be needing assistance, you are allowed up to one additional passenger to help assist with trips.</li>
                                </ul>
                            </BaseInteractiveHoverTile>
                        </div>
                    </div>
                    <div class="space-y-4 flex items-center">
                        <p class="text-xl text-brand-main-text lg:w-4/5">
                            Thank you for choosing Golden Gate Manor Transportation/Pueblo City Cab for all of your non-medical transportation needs! We look forward to serving you. If you have any questions or concerns related to your trips from verifying if they have been inputted to dispatch or if you just have questions about our services, please feel free to contact us at any time so that we can help you. Our goal is to make the process as smooth and simple as possible so that you can get where you want to be reliably and quickly.
                        </p>
                        <NuxtImg format="webp,avif" src="/images/pages/non-medical/information.png" alt="Question mark symbol" title="Question mark symbol" loading="lazy" height="263" width="252" class="hidden lg:block" />
                    </div>
                </BaseLayoutPageContainer>
            </BaseLayoutPageSection>
        </DeferRender>
    </div>
</template>

<script setup lang='ts'>
import company from '@/data/company.json'

definePageMeta({
  title: 'Non-Medical Transportation in Pueblo Colorado',
  breadcrumbLabel: 'Non-Medical'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Pueblo Non-Medical Transport',
  ogTitle: 'Pueblo Non-Medical Transport',
  description: 'Enjoy stress-free personal transportation in Southern Colorado. Golden Gate Manor Inc. ensures safe, reliable travel for shopping, visits, and more.',
  ogDescription: 'Enjoy stress-free personal transportation in Southern Colorado. Golden Gate Manor Inc. ensures safe, reliable travel for shopping, visits, and more.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Pueblo Non-Medical Transport',
  twitterDescription: 'Enjoy stress-free personal transportation in Southern Colorado. Golden Gate Manor Inc. ensures safe, reliable travel for shopping, visits, and more.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'NonMedicalPage'
})
</script>

<style></style>