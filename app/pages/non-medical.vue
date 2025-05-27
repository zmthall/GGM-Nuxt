<template>
    <div>
        <!-- Page Banner -->
        <BaseLayoutPageBanner />
        <!-- Main Content -->
        <BaseLayoutPageSection class="" margin="top">
            <!-- <img src="/images/suv-train.jpg" alt="Picture of Golden Gate Manor Transportation infront of Train Depot Car in Pueblo"> -->
            <h2 class="">Overview of Non-Medical Transportation</h2>
            <p class="">
                It may not always be possible to depend solely on assistance 
                from family members, friends, or public transportation in order 
                to travel to the places you need to be. Golden Gate Manor 
                Transportation understands the need for safe reliable 
                transportation, and we are here to offer a solution. With our 
                fleet of over 40 plus vehicles, you can count on us to get you 
                where you need to be.
            </p>
            <p class="">
                We are proud to offer Non-Medical Transportation to eligible 
                Medicaid recipients in Pueblo and Otero Counties. Whether you 
                need to run personal errands, attend a family event, or just 
                get out into the community, Golden Gate Manor Transportation/Pueblo 
                City Cab can get you there. Keep reading to learn more!
            </p>
            <div class="section-button-container">
                <a href="/contact-us" class="cta-button contact-us">Contact Us</a>
                <a href="/contact-us/schedule-a-ride" class="cta-button schedule-a-ride">Schedule A Ride</a>
            </div>
        </BaseLayoutPageSection>
        <BaseLayoutPageSection class="" margin="default" bg="alt">
            <h2 class="section-title">How Do I Schedule a Ride?</h2>
            <p class="">
                If you have never used our services, please contact the 
                Department of Human Services (DHS) at <a rel="nofollow" href="tel:719-583-6900">(719) 583-6900</a> to
                determine your eligibility. If you are on Medicaid and on the 
                Home Community Based Service Waiver, you may be approved for 
                Non-Medical Transportation. When you are ready to schedule your 
                first ride with Golden Gate Manor Transportation or Pueblo City 
                Cab, contact us by calling <a rel="nofollow" href="tel:<%- company.phone_number_dispatch %>">Dispatch Number Needed</a>.
            </p>
            <p class="">
                Drivers and appointments are available 24 hours a day, 7 days a 
                week, including holidays. Pueblo City Cab is open 24 hours a day 
                365 days a year. Please contact us 24-48 hours before your trip;
                otherwise, we may not be able to guarantee availability.
            </p>
        </BaseLayoutPageSection>
        <BaseLayoutPageSection class="" margin="default">
            <div class="non-medical-transportation-bottom-page-wrapper">
                <h2 class="section-title">What Information Do I Need?</h2>
                <p class="">
                    Before riding with Golden Gate Manor Transportation, eligibility 
                    must be approved by the Department of Human Services (DHS); be 
                    prepared before contacting us, by first contacting DHS at 
                    <a rel="nofollow" href="tel:719-583-6900">(719) 583-6900</a> for eligibility approval. 
                    Once eligibility is approved, contact us by calling 
                    <a rel="nofollow" href="tel:<%- company.phone_number_dispatch %>">
                      Dispatch Number Needed
                    </a> and be ready to provide your name and pickup address as 
                    well as the destination you are traveling to. Any other 
                    pertinent information relating to the trip will be requested 
                    while on the phone.
                </p>
                <p class="">
                    Thank you for choosing Golden Gate Manor/Pueblo City Cab for all 
                    your Non-Medical Transportation needs! We look forward to 
                    serving you! If you have any further questions or concerns, 
                    please contact us so that we can help.
                </p>
            </div>
            <!-- <img src="/images/information.png" alt="Question mark symbol"> -->
        </BaseLayoutPageSection>
    </div>
</template>

<script setup lang='ts'>
definePageMeta({
  title: 'Non-Medical Transportation',
  breadcrumbLabel: 'Non-Medical'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Personal & Non-Medical Transportation',
  ogTitle: 'Personal & Non-Medical Transportation',
  description: 'Enjoy stress-free personal transportation in Southern Colorado. Golden Gate Manor Inc. ensures safe, reliable travel for shopping, visits, and more.',
  ogDescription: 'Enjoy stress-free personal transportation in Southern Colorado. Golden Gate Manor Inc. ensures safe, reliable travel for shopping, visits, and more.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Personal & Non-Medical Transportation',
  twitterDescription: 'Enjoy stress-free personal transportation in Southern Colorado. Golden Gate Manor Inc. ensures safe, reliable travel for shopping, visits, and more.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'NonMedicalPage'
})
</script>

<style></style>