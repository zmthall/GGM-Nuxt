<template>
    <div>
        <!-- Page Hero Section -->
        <BaseLayoutPageHeroSection src="/images/pages/home/hero.jpg" centered alt="Golden Gate Bridge heroshot image" title="Golden Gate Bridge heroshot image" loading="eager">
            <div class="w-full p-4">
                <div class="flex flex-col items-center relative bg-color before:w-3/4 before:h-[2px] before:absolute before:bottom-0 mb-4 pb-4 ">
                    <p class="text-3xl">Welcome to</p>
                    <h1 class="text-center flex flex-col" >
                        <span class="text-6xl font-extrabold text-brand-secondary">
                            Golden Gate Manor
                        </span>
                        <span class="text-2xl uppercase">
                            One Company. Many services you can depend on.
                        </span>
                    </h1>
                </div>
                <p class="text-xl text-center">
                    For over 20 years, Golden Gate Manor Inc. has delivered compassionate, community-based services throughout Southern Colorado. We provide non-emergency medical and non-medical Medicaid transportation, assisted living homes in Pueblo, durable medical equipment and supplies, and now retail convenience through Golden Gate Gas and Goods. We're committed to helping you live life with ease, comfort, and confidence.
                </p>
            </div>
            <BaseUiAction styling="py-4 px-8 uppercase text-2xl" class="mt-4 " to="/company/contact-us">Contact Us</BaseUiAction>
        </BaseLayoutPageHeroSection>
            <BaseInteractiveLogosNav />

            <!-- Overview (our company) -->
            <BaseLayoutPageSection margin="default" class="cv-auto">
                <BaseLayoutPageContainer>
                    <LazyBaseLayoutCard class="md:shadow-primary sm:w-11/12 sm:mx-auto xl:w-3/4" :shadow="false">
                        <div class="px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                                <!-- Image -->
                            <section>
                                <!-- Desktop/Tablet: interactive carousel -->
                                 <DeferRender when="visible">
                                     <div class="w-full h-[450px] max-md:hidden max-md:shadow-primary max-md:rounded-lg overflow-hidden">
                                         <!-- Lazy component still good for code-splitting -->
                                         <LazyBaseInteractiveAutoImageCarousel
                                         :images="images"
                                         />
                                     </div>
                                     <div class="w-full rounded-lg md:hidden overflow-hidden">
                                         <NuxtImg
                                             src="/images/home-images/transportation-services.jpeg"
                                             alt="Golden Gate Manor Transportation"
                                             format="webp,avif"
                                             quality="65"
                                             width="1152" height="646"
                                             sizes="(min-width: 1024px) 646px, 395px"
                                             loading="lazy"
                                             class="w-full h-full object-contain"
                                             decoding="async"
                                         />
                                     </div>
                                 </DeferRender>

                                <!-- Mobile: lightweight static image -->
                            </section>
            
                            <!-- Text Content -->
                            <div>
                                <h2 class="text-3xl font-extrabold text-brand-primary mb-4">Locally Rooted. Broadly Committed.</h2>
                                <p class="text-base text-brand-dark-gray leading-relaxed mb-6">
                                        Golden Gate Manor is a family-owned umbrella company providing Medicaid-approved services including non-emergency medical transportation (NEMT) and non-medical Medicaid transportation with wheelchair accessible vans, assisted living, durable medical equipment and supplies, and gas stations in Pueblo, Colorado. With dedicated teams across all departments and 20 years of business experience under our belt, 40+ vehicles in our fleet, and five different assisted living house locations; we work hard to meet the daily needs of our clients throughout Southern Colorado. 
                                </p>
                                    <BaseUiAction to="/company/about-us" styling="py-4 px-8">
                                    Learn More About Us
                                </BaseUiAction>
                            </div>
                        </div>
                    </LazyBaseLayoutCard>
                </BaseLayoutPageContainer>
            </BaseLayoutPageSection>
            
            <!-- Services Card Grid -->
            <DeferRender when="visible" ssr>
                <BaseLayoutPageSection margin="default" bg="alt" styling="flex flex-col" class="cv-auto">
                        <h2 class="text-center font-extrabold flex flex-col mb-8 text-4xl">
                            <span class="text-gray-500">
                                Services
                            </span>
                            <span class="text-brand-primary">We Offer</span>
                        </h2>
                        <div class="flex justify-center flex-wrap gap-8">
                            <NuxtLink to="/assisted-living">
                                <LazyBaseLayoutCard class="bg-brand-background xs:w-[325px]" hover-group icon-size="size-32" icon-name="medical-icon:i-care-staff-area" cta="Learn More" cta-size="w-full h-max" cta-class="p-3">
                                    <div>
                                        <h2 class="text-center font-extrabold flex flex-col mb-4 text-xl mt-2">
                                            <span class="text-gray-500">Assisted</span>
                                            <span class="text-brand-primary">Living</span>
                                        </h2>
                                        <p class="mb-4 text-center text-lg">
                                            Golden Gate Manor Assisted Living houses are highly respected, Medicaid-certified facilities located in Pueblo, Colorado. At each of our 5 locations, trained staff members are present 24/7 to provide care, assistance with medication, daily living skills, meals, transportation, and treatment management.
                                        </p>
                                    </div>
                                </LazyBaseLayoutCard>
                            </NuxtLink>
                            <NuxtLink to="/nemt">
                                <LazyBaseLayoutCard class="bg-brand-background xs:w-[325px]" hover-group icon-size="size-32" icon-name="medical-icon:i-ambulance" cta="Learn More" cta-size="w-full h-max" cta-class="p-3">
                                    <div>
                                        <h2 class="text-center font-extrabold flex flex-col mb-4 text-xl mt-2">
                                            <span class="text-gray-500">NEMT</span>
                                            <span class="text-brand-primary">Transportation</span>
                                        </h2>
                                        <p class="mb-4 text-center text-lg">
                                            Our fleet of 40+ vehicles, including wheelchair accessible vans, delivers our non-emergency medical transportation (NEMT) service across Southern Colorado and to main appointment areas, such as Denver. Reliably, we will get you to and from covered medical appointments and approved services when you need a helping hand.
                                        </p>
                                    </div>
                                </LazyBaseLayoutCard>
                            </NuxtLink>
                            <NuxtLink to="/non-medical">
                                <LazyBaseLayoutCard class="bg-brand-background xs:w-[325px]" hover-group icon-size="size-32" icon-name="material-symbols:local-taxi-rounded" cta="Learn More" cta-size="w-full h-max" cta-class="p-3">
                                    <div>
                                        <h2 class="text-center font-extrabold flex flex-col mb-4 text-xl mt-2">
                                            <span class="text-gray-500">Non-Medical</span>
                                            <span class="text-brand-primary">Transportation</span>
                                        </h2>
                                        <p class="mb-4 text-center text-lg">
                                            We are proud to be one of the only companies in Pueblo County, including Pueblo West, to provide non-medical transportation services to eligible community members who are disabled or elderly receiving Medicaid assistance. We can take you to run personal errands, attend family events, or even just a trip to a place to relax; we're here to help.
                                        </p>
                                    </div>
                                </LazyBaseLayoutCard>
                            </NuxtLink>
                           <NuxtLink to="/medical-supplies">
                                <LazyBaseLayoutCard class="bg-brand-background xs:w-[325px]" hover-group icon-size="size-32" icon-name="medical-icon:first-aid" cta="Learn More" cta-size="w-full h-max" cta-class="p-3">
                                    <div>
                                        <h2 class="text-center font-extrabold flex flex-col mb-4 text-xl mt-2">
                                            <span class="text-gray-500">Durable Medical</span>
                                            <span class="text-brand-primary">Equipment/Supplies</span>
                                        </h2>
                                        <p class="mb-4 text-center text-lg">
                                            Golden Gate Medical Supplies offers high-quality durable medical equipment and supplies with accessible pricing throughout Colorado. We work closely to ensure our commitment to quality care is delivered when and where it's needed. In addition, we provide home delivery and shipping services to make accessibility easier.
                                        </p>
                                    </div>
                                </LazyBaseLayoutCard>
                            </NuxtLink>
                        </div>
                </BaseLayoutPageSection>
            </DeferRender>

            <!-- Schedule a Ride CTA -->
            <DeferRender when="visible" ssr>
                <LazyBaseLayoutPageCTA title="Need a Ride? We're Ready When You Are." to="/resources/schedule-a-ride" button-label="Schedule a Ride" class="cv-auto">
                    <p class="text-xl">
                        Whether it's a medical appointment, a grocery run, or just getting where you need to go — our dependable drivers are here to help, 24/7. Booking is fast, simple, and just a click away.
                    </p>
                </LazyBaseLayoutPageCTA>
            </DeferRender>             
    
            <!-- Why People Choose Us -->
            <DeferRender when="visible" ssr>
                <BaseLayoutPageSection margin="default" class="cv-auto">
                    <BaseLayoutPageContainer>
                        <div class="mb-4 px-2 sm:max-w-[1200px] sm:mx-auto">
                            <h2 class="text-2xl text-center font-bold text-brand-primary flex flex-col mb-4">
                                <span class="text-gray-500">
                                    More Than a Ride.
                                </span>
                                <span class="text-brand-primary">
                                    More Than a Business.
                                </span>
                            </h2>
                            <p class="text-lg sm:text-2xl">
                                We are one of Southern Colorado's longest-running non-emergency medical transportation (NEMT) provider - and so much more. Golden Gate Manor Inc. connects our services: assisted living, transportation, medical supplies, gas stations, and community support under one umbrella to make it easier for our clients to receive the care and attention they need when they need it. Being family owned, we understand the need for community driven assistance wrapped in care and compassion; it's not just what we do, it's who we are.
                            </p>
                        </div>
        
                        <div class="space-y-2 mb-4 px-2 sm:max-w-[1200px] sm:mx-auto">
                            <h3 class="text-2xl text-center font-bold text-brand-primary flex flex-col mb-4">A Mission Rooted in Care, Built for Independence</h3>
                            <p class="text-lg sm:text-2xl">
                                Here at Golden Gate Manor Inc., we believe true care is rooted in connection. With this being said, we've built more than a network of services here in Pueblo, Colorado —we've built a support system. We understand that not all aspects of a person's life are available at all times. Whether it's a ride across town for an appointment, a comfortable place to live, or access to essential durable medical equipment and supplies, our goal is simple: help people live fully, independently, and with dignity. As a family-owned business, we want to make sure that the services received come with compassion and understanding.
                            </p>
                            <p class="text-lg sm:text-2xl">
                                We don't just serve the community, we are part of it and we believe in investing in the children who will shape our community's future. That's why giving back is just as important as showing up. Our team demonstrates this commitment by sponsoring local events and kids' sports teams, and by partnering with organizations that uplift the underserved. Our team works hard, plays hard, and shows up with heart for a community we are proud to be part of.
                            </p>
                            <div class="flex justify-center !my-4">
                                <BaseUiAction class="py-4 px-8" to="/news/community">See Our Community Impact</BaseUiAction>
                            </div>
                            <p class="text-lg sm:text-2xl">
                                When you choose Golden Gate Manor, you're choosing more than a company, you're joining a community that cares and brings compassion to everything we do. We strive to be more than a business — we strive to be an extended family for those who may need another helping hand.
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
                                          <LazyBaseLayoutCard>
                                            <div>
                                                <h3 class="font-extrabold text-lg">Community-First Approach</h3>
                                                <p>
                                                    Our company is locally grown and Pueblo-proud. Our continued mission is to bridge the gaps in different areas of care and make these vital services more accessible for people who need them. Independence, comfort, and compassion should not be a luxury.
                                                </p>
                                            </div>
                                          </LazyBaseLayoutCard>
                                          <LazyBaseLayoutCard>
                                            <div>
                                                <h3 class="font-extrabold text-lg">Proven Track Record</h3>
                                                <p>
                                                    We're one of Southern Colorado's oldest non-emergency medical transportation (NEMT) providers, built on reliability, compassion, and dedication that has spanned decades. With over 20 years of experience providing services across different care-based fields and a fleet of 40+ vehicles, including wheelchair-accessible vans, we ensure our clients always have dependable services so that they can make it on time to their appointments and live comfortably. All of our services are backed by our experience and resources to deliver high-quality and specialized care.
                                                </p>
                                            </div>
                                          </LazyBaseLayoutCard>
                                          <LazyBaseLayoutCard>
                                            <div>
                                                <h3 class="font-extrabold text-lg">Umbrella of Care</h3>
                                                <p>
                                                    Golden Gate Manor Inc. connects our services—assisted living, transportation, medical supplies, gas stations, and community support—to offer a seamless network of services for comfort, independence, and convenience. Our community matters to us just as much as the clients we serve.
                                                </p>
                                            </div>
                                          </LazyBaseLayoutCard>
                                          <LazyBaseLayoutCard>
                                            <div>
                                                <h3 class="font-extrabold text-lg">People Over Profit</h3>
                                                <p>
                                                    We prioritize the needs of our clients, care, and dignity. Our entire team is trained to lead with empathy, act with integrity, and treat your family like our own family. We strive to have real community impact and are proud to be a working part of this community.
                                                </p>
                                            </div>
                                          </LazyBaseLayoutCard>
                                      </div>
                                  </div>
                                  <!-- Testimonial (supporting statement) -->
                                  <aside class="bg-gray-400 p-4 text-black rounded-lg text-xl sm:text-white sm:h-max sm:px-12 sm:py-28 sm:my-auto sm:bg-brand-primary">
                                      <blockquote class="space-y-4">
                                          <span>"Wonderful people, wonderful service, always on time. Actually willing to stop and let me get a bite to eat or use the bathroom."</span>
                                          <footer>— Felicity F.</footer>
                                      </blockquote>
                                  </aside>
                            </div>
                        </div>
                    </BaseLayoutPageContainer>
                </BaseLayoutPageSection>
            </DeferRender>
                         
            <DeferRender when="visible" ssr>
                <BaseLayoutPageSection margin="default" bg="alt" class="cv-auto">
                    <BaseLayoutPageContainer>
                        <div>
                            <h2 class="text-2xl text-center font-bold text-brand-primary flex flex-col mb-4">Need help getting started?</h2>
                            <SupportCenterSection />
                        </div>
                    </BaseLayoutPageContainer>
                </BaseLayoutPageSection>
            </DeferRender>
    
            <!-- 👉 Events & Community Highlights -->
            <!-- <BaseLayoutPageSection v-if="events" bg="alt">
                <div />
            </BaseLayoutPageSection> -->

            <!-- Blog / News -->
            <!-- <BaseLayoutPageSection v-if="blogs || news" bg="alt">
                <div />
            </BaseLayoutPageSection> -->
    </div>
</template>

<script setup lang='ts'>
import type { ImageData } from '../models/ImagesData.js';

// const news = undefined;
// const blogs = undefined;
// const events = undefined;

useHead({
    titleTemplate: null,
})

definePageMeta({
    breadcrumb: false,
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
    title: 'NEMT Transportation Pueblo CO | Medicaid Approved | Golden Gate Manor',
    ogTitle: 'NEMT Transportation Pueblo CO | Medicaid Approved | Golden Gate Manor',
    description: 'Golden Gate Manor provides Medicaid-approved NEMT & assisted living in Pueblo, CO. 20+ years experience, 40+ vehicle fleet, wheelchair accessible. Call (719) 544-3231.',
    ogDescription: 'Golden Gate Manor provides Medicaid-approved NEMT & assisted living in Pueblo, CO. 20+ years experience, 40+ vehicle fleet, wheelchair accessible. Call (719) 544-3231.',
    ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
    twitterTitle: 'NEMT Transportation Pueblo CO | Medicaid Approved | Golden Gate Manor',
    twitterDescription: 'Golden Gate Manor provides Medicaid-approved NEMT & assisted living in Pueblo, CO. 20+ years experience, 40+ vehicle fleet, wheelchair accessible. Call (719) 544-3231.',
    twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
    twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'HomePage'
})

const images: ImageData[] = [
    { 
        id: '1',
        src: '/images/home-images/transportation-services.jpeg',
        alt: 'Golden Gate Manor Transportation and City Cab LLC cars next to eachother.',
        title: 'Golden Gate Manor Transportation and City Cab LLC cars next to eachother',
        loading: 'lazy'
    },
    { 
        id: '2',
        src: '/images/home-images/golden-gate-manor-1.jpeg',
        alt: 'Golden Gate Manor 1, house image.',
        title: 'Golden Gate Manor 1, house image',
        loading: 'lazy'
    },
    { 
        id: '3',
        src: '/images/home-images/golden-gate-manor-2.jpeg',
        alt: 'Golden Gate Manor 2, house image.',
        title: 'Golden Gate Manor 2, house image',
        loading: 'lazy'
    },
    { 
        id: '4',
        src: '/images/home-images/golden-horizon.jpeg',
        alt: 'Golden Horizon, house image.',
        title: 'Golden Horizon, house image',
        loading: 'lazy'
    },
    { 
        id: '5',
        src: '/images/home-images/golden-valley.jpeg',
        alt: 'Golden Valley, house image.',
        title: 'Golden Valley, house image',
        loading: 'lazy'
    },
    { 
        id: '6',
        src: '/images/home-images/golden-view.jpeg',
        alt: 'Golden View, house image.',
        title: 'Golden View, house image',
        loading: 'lazy'
    },
    { 
        id: '7',
        src: '/images/home-images/medical-supply-store.jpeg',
        alt: 'Golden Gate Medical Supply inside the store.',
        title: 'Golden Gate Medical Supply inside the store',
        loading: 'lazy'
    },
    { 
        id: '8',
        src: '/images/home-images/gas-station.jpg',
        alt: 'Golden Gate Gas & Goods external picture of gas station.',
        title: 'Golden Gate Gas & Goods external picture of gas station',
        loading: 'lazy'
    }
]
</script>

<style scoped>
    .bg-color::before {
        background: linear-gradient(to right, transparent, #121f75 50%, transparent);
    }
</style>