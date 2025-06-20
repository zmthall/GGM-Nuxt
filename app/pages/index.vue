import { BaseLayoutCard, BaseUiAction } from '../../.nuxt/components';
<template>
    <div>
        <!-- Page Hero Section -->
        <BaseLayoutPageHeroSection src="/images/pages/home/hero.jpg" centered>
            <h1 class="flex flex-col relative items-center text-center mb-4 pb-4 bg-color before:w-3/4 before:h-[2px] before:absolute before:bottom-0" >
                <span class="text-3xl sm:text-4xl">
                    Welcome to
                </span>
                <span class="text-6xl sm:text-7xl font-extrabold text-brand-secondary">
                    Golden Gate Manor
                </span>
                <span class="text-2xl sm:text-3xl">
                    PEOPLE WHO VALUE THEIR QUALITY OF LIFE CAN DEPEND ON US
                </span>
            </h1>
            <p class="text-xl text-center">
                Our mission is simple here at Golden Gate Manor: to improve the quality of life each and every day. We proudly offer transportation services to not only our residents, but to Medicaid approved members of our community. Search our website for additional information or contact us with any questions.
            </p>
            <BaseUiAction styling="py-4 px-8 uppercase text-2xl" class="mt-4 " to="/company/contact-us">Contact Us</BaseUiAction>
        </BaseLayoutPageHeroSection>
        <BaseLayoutPageWrapper>
            <!-- Overview (our company) -->
            <BaseLayoutPageSection margin="default">
                <BaseLayoutCard class="md:shadow-primary sm:w-11/12 sm:mx-auto xl:w-3/4 2xl:w-1/2" :shadow="false">
                    <div class="px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <!-- Image -->
                        <div>
                            <img src="" alt="Golden Gate Manor operations in action" class="rounded-xl shadow-md w-full h-auto object-cover">
                        </div>
    
                        <!-- Text Content -->
                        <div>
                            <h2 class="text-3xl font-extrabold text-brand-primary mb-4">Locally Rooted. Broadly Committed.</h2>
                            <p class="text-base text-brand-dark-gray leading-relaxed mb-6">
                            Golden Gate Manor is a family-owned company based in Pueblo, Colorado. We provide a wide range of essential services to the Southern Colorado community — including assisted living homes, non-emergency medical transportation (NEMT), non-medical transportation, durable medical equipment and supplies, and gas stations. With dedicated teams across all departments, we work hard to meet the daily needs of our clients while growing with the region we call home.
                            </p>
                            <BaseUiAction to="/company/about-us" styling="py-4 px-8">
                            Learn More About Us
                            </BaseUiAction>
                        </div>
                    </div>
                </BaseLayoutCard>
            </BaseLayoutPageSection>
            <!-- Services Card Grid -->
            <BaseLayoutPageSection margin="default" bg="alt" styling="flex flex-col">
                <h2 class="text-center font-extrabold flex flex-col mb-8 text-4xl">
                    <span class="text-gray-500">
                        Services
                    </span>
                    <span class="text-brand-primary">We Offer</span>
                </h2>
                <div class="flex justify-center flex-wrap gap-8">
                    <NuxtLink to="/assisted-living">
                        <BaseLayoutCard class="bg-brand-background xs:w-[325px]" hover-group icon-size="size-32" icon-name="medical-icon:i-care-staff-area" cta="Learn More" cta-size="w-full h-max" cta-class="p-3">
                            <div>
                                <h2 class="text-center font-extrabold flex flex-col mb-4 text-xl mt-2">
                                    <span class="text-gray-500">Assisted</span>
                                    <span class="text-brand-primary">Living</span>
                                </h2>
                                <p class="mb-4 text-center text-lg">
                                    Golden Gate Manor, Inc. are highly respected, Medicaid Certified Assisted Living Facilities located in Pueblo, Colorado.
                                    Trained staff members are present 24/7 to provide care, assistance with medication, daily living skills, meals,
                                    transportation and treatment management.
                                </p>
                            </div>
                        </BaseLayoutCard>
                    </NuxtLink>
                    <NuxtLink to="/nemt">
                        <BaseLayoutCard class="bg-brand-background xs:w-[325px]" hover-group icon-size="size-32" icon-name="medical-icon:i-ambulance" cta="Learn More" cta-size="w-full h-max" cta-class="p-3">
                            <div>
                                <h2 class="text-center font-extrabold flex flex-col mb-4 text-xl mt-2">
                                    <span class="text-gray-500">NEMT</span>
                                    <span class="text-brand-primary">Transportation</span>
                                </h2>
                                <p class="mb-4 text-center text-lg">
                                    Non-Emergent Medical Transportation (NEMT) is transportation to and from covered non-emergency medical appointments or
                                    services. With our 40+ vehicles, we can take you to any appointment within state lines.
                                </p>
                            </div>
                        </BaseLayoutCard>
                    </NuxtLink>
                    <NuxtLink to="/non-medical">
                        <BaseLayoutCard class="bg-brand-background xs:w-[325px]" hover-group icon-size="size-32" icon-name="material-symbols:local-taxi-rounded" cta="Learn More" cta-size="w-full h-max" cta-class="p-3">
                            <div>
                                <h2 class="text-center font-extrabold flex flex-col mb-4 text-xl mt-2">
                                    <span class="text-gray-500">Non-Medical</span>
                                    <span class="text-brand-primary">Transportation</span>
                                </h2>
                                <p class="mb-4 text-center text-lg">
                                    We are proud to now offer Non-Medical Transportation to Medicaid eligible disabled and elderly members of Pueblo
                                    City/County (including Pueblo West). Whether you need to run personal errands, or attend a family event, Golden Gate
                                    Manor Transportation can get you there.
                                </p>
                            </div>
                        </BaseLayoutCard>
                    </NuxtLink>
                   <NuxtLink to="/medical-supplies">
                        <BaseLayoutCard class="bg-brand-background xs:w-[325px]" hover-group icon-size="size-32" icon-name="medical-icon:first-aid" cta="Learn More" cta-size="w-full h-max" cta-class="p-3">
                            <div>
                                <h2 class="text-center font-extrabold flex flex-col mb-4 text-xl mt-2">
                                    <span class="text-gray-500">Durable Medical</span>
                                    <span class="text-brand-primary">Equipment/Supplies</span>
                                </h2>
                                <p class="mb-4 text-center text-lg">
                                    Golden Gate Medical Supplies is a family-owned provider of durable medical equipment and supplies. We have been serving
                                    individuals, caregivers, and businesses with a commitment to quality care. Our knowledgeable team offers a wide range of
                                    products and services to support you.
                                </p>
                            </div>
                        </BaseLayoutCard>
                    </NuxtLink>
                </div>
            </BaseLayoutPageSection>

            <!-- Schedule a Ride CTA -->
            <BaseLayoutPageCTA title="Need a Ride? We're Ready When You Are." to="/resources/schedule-a-ride" button-label="Schedule a Ride">
                <p class="text-xl">
                    Whether it's a medical appointment, a grocery run, or just getting where you need to go — our dependable drivers are here to help, 24/7. Booking is fast, simple, and just a click away.
                </p>
            </BaseLayoutPageCTA>
    
            <!-- Why People Choose Us -->
            <BaseLayoutPageSection margin="default">
                <div class="mb-4 px-2 sm:max-w-[1200px] sm:mx-auto">
                    <h2 class="hidden text-lg text-center font-bold text-brand-primary">Why People Choose Golden Gate Manor</h2>
                    <h3 class="text-2xl text-center font-bold text-brand-primary flex flex-col mb-4">
                        <span class="text-gray-500">
                            More Than a Ride.
                        </span>
                        <span class="text-brand-primary">
                            More Than a Business.
                        </span>
                    </h3>
                    <p class="text-lg sm:text-2xl">
                        We're Colorado's longest-running NEMT provider — and so much more. Golden Gate Manor Inc. connects assisted living, transportation, medical supplies, and community support 
                        under one roof to make life easier for the people who need it most.
                    </p>
                </div>

                <div class="space-y-2 mb-4 px-2 sm:max-w-[1200px] sm:mx-auto">
                    <h3 class="text-2xl text-center font-bold text-brand-primary flex flex-col mb-4">A Mission Rooted in Care, Built for Independence</h3>
                    <p class="text-lg sm:text-2xl">
                        At Golden Gate Manor Inc., we believe true care is rooted in connection. As a family-owned company proudly based in Pueblo, Colorado, we've built more than a network of services — we've built a support system. Whether it's a ride across town, a comfortable place to live, or access to essential medical equipment, our goal is simple: help people live fully, independently, and with dignity.
                    </p>
                    <p class="text-lg sm:text-2xl">
                        We don't just serve the community — we're part of it. From sponsoring local events to hosting school supply giveaways and partnering with organizations that uplift the underserved, we believe giving back is just as important as showing up. Our team works hard, plays hard, and shows up with heart.
                    </p>
                    <p class="text-lg sm:text-2xl">
                        When you choose Golden Gate Manor, you're choosing more than a company — you're joining a community that cares.
                    </p>
                </div>

                <div>
                    <h2 class="text-2xl text-center font-bold text-brand-primary flex flex-col mb-4">What Sets Us Apart</h2>
                    <div class="sm:grid sm:grid-cols-2 sm:gap-8 md:mx-12">
                         <!-- Two-column layout -->
                         <div class="space-y-2 mb-4 px-2">
                              <!-- Left Column: Paragraph + Cards -->
                              <div class="flex flex-col gap-8">
                                  <!-- 4 Pillar Cards -->
                                  <BaseLayoutCard>
                                    <div>
                                        <h3 class="font-extrabold text-lg">Community-First Approach</h3>
                                        <p>
                                            We're locally grown and Pueblo-proud. Our mission is to bridge gaps in care and make vital services more accessible for seniors and people with special needs.
                                        </p>
                                    </div>
                                  </BaseLayoutCard>
                                  <BaseLayoutCard>
                                    <div>
                                        <h3 class="font-extrabold text-lg">Proven Track Record</h3>
                                        <p>
                                            We're Colorado's oldest non-emergency medical transportation provider — built on reliability, compassion, and dedication that spans decades. With a fleet of over 50 vehicles, including wheelchair-accessible vans, we ensure our clients always have dependable, on-time transportation backed by the resources to deliver.
                                        </p>
                                    </div>
                                  </BaseLayoutCard>
                                  <BaseLayoutCard>
                                    <div>
                                        <h3 class="font-extrabold text-lg">Umbrella of Care</h3>
                                        <p>
                                            From assisted living to medical equipment to neighborhood gas stations, we offer a seamless network of services for comfort, independence, and convenience.
                                        </p>
                                    </div>
                                  </BaseLayoutCard>
                                  <BaseLayoutCard>
                                    <div>
                                        <h3 class="font-extrabold text-lg">People Over Profit</h3>
                                        <p>
                                            We prioritize care, dignity, and real community impact. Our team is trained to lead with empathy, act with integrity, and treat your family like our own.
                                        </p>
                                    </div>
                                  </BaseLayoutCard>
                              </div>
                          </div>
                          <!-- Testimonial (supporting statement) -->
                          <aside class="bg-gray-400 p-4 text-black rounded-lg text-xl sm:text-white sm:h-max sm:px-12 sm:py-28 sm:my-auto sm:bg-brand-primary">
                              <blockquote class="space-y-4">
                                  <span>"Golden Gate Manor helped my mom stay independent and cared for without feeling alone. It's not just a service — it's a lifeline."</span>
                                  <footer>— Jessica M., Family Member</footer>
                              </blockquote>
                          </aside>
                    </div>
                </div>

                <div class="flex justify-center mt-4">
                    <BaseUiAction href="/company/about-us" class="px-8 py-4 text-2xl">Explore Our Impact</BaseUiAction>
                </div>
            </BaseLayoutPageSection>
    
            <!-- 👉 Events & Community Highlights -->
            <BaseLayoutPageSection v-if="events" bg="alt">
                <div />
            </BaseLayoutPageSection>

            <!-- Blog / News -->
            <BaseLayoutPageSection v-if="blogs || news" bg="alt">
                <div />
            </BaseLayoutPageSection>
        </BaseLayoutPageWrapper>
    </div>
</template>

<script setup lang='ts'>
const news = undefined;
const blogs = undefined;
const events = undefined;


useHead({
    titleTemplate: null,
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
    title: 'Golden Gate Manor Inc. | Reliable Transportation & Assisted Living',
    ogTitle: 'Golden Gate Manor Inc. | Reliable Transportation & Assisted Living',
    description: 'Golden Gate Manor Inc. offers dependable Non-Emergency Medical Transportation (NEMT), assisted living services, and medical supplies throughout Southern Colorado.',
    ogDescription: 'Golden Gate Manor Inc. offers dependable Non-Emergency Medical Transportation (NEMT), assisted living services, and medical supplies throughout Southern Colorado.',
    ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
    twitterTitle: 'Golden Gate Manor Inc. | Reliable Transportation & Assisted Living',
    twitterDescription: 'Golden Gate Manor Inc. offers dependable Non-Emergency Medical Transportation (NEMT), assisted living services, and medical supplies throughout Southern Colorado.',
    twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
    twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'HomePage'
})
</script>

<style scoped>
    .bg-color::before {
        background: linear-gradient(to right, transparent, #121f75 50%, transparent);
    }
</style>