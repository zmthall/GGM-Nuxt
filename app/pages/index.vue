<template>
    <div>
        <!-- Page Hero Section -->
        <BaseLayoutPageHeroSection>
            <h1 class="flex flex-col relative items-center text-center mb-4 pb-4 bg-color before:w-3/4 before:h-[2px] before:absolute before:bottom-0" >
                <span class="text-3xl sm:text-4xl">
                    Welcome to
                </span>
                <span class="text-6xl sm:text-7xl font-extrabold font-headings text-brand-secondary">
                    Golden Gate Manor
                </span>
                <span class="text-2xl sm:text-3xl">
                    PEOPLE WHO VALUE THEIR QUALITY OF LIFE CAN DEPEND ON US
                </span>
            </h1>
            <p class="text-xl text-center">
                Our mission is simple here at Golden Gate Manor: to improve the quality of life each and every day. We proudly offer transportation services to not only our residents, but to Medicaid approved members of our community. Search our website for additional information or contact us with any questions.
            </p>
            <BaseUiAction styling="mt-4 py-4 px-8 uppercase text-2xl" to="/company/contact-us">Contact Us</BaseUiAction>
        </BaseLayoutPageHeroSection>
        <BaseLayoutPageWrapper>
            <!-- Overview (our company) -->
            <BaseLayoutPageSection>
                <BaseLayoutCard class="sm:shadow-primary sm:w-4/5 sm:mx-auto xl:w-1/2" :shadow="false">
                    <div class="px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
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
            <BaseLayoutPageSection bg="alt" styling="flex flex-col">
                <h2 class="text-center font-headings font-extrabold flex flex-col mb-8 text-4xl">
                    <span class="text-gray-500">
                        Services
                    </span>
                    <span class="text-brand-primary">We Offer</span>
                </h2>
                <div class="flex justify-center flex-wrap gap-8">
                    <NuxtLink to="/assisted-living">
                        <BaseLayoutCard class="bg-brand-background sm:w-[400px]" hover-group icon-size="size-32" icon-name="medical-icon:i-care-staff-area" cta="Learn More" cta-size="w-full h-max" cta-class="p-3">
                            <div>
                                <h2 class="text-center font-headings font-extrabold flex flex-col mb-4 text-xl mt-2">
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
                        <BaseLayoutCard class="bg-brand-background sm:w-[400px]" hover-group icon-size="size-32" icon-name="medical-icon:i-ambulance" cta="Learn More" cta-size="w-full h-max" cta-class="p-3">
                            <div>
                                <h2 class="text-center font-headings font-extrabold flex flex-col mb-4 text-xl mt-2">
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
                        <BaseLayoutCard class="bg-brand-background sm:w-[400px]" hover-group icon-size="size-32" icon-name="material-symbols:local-taxi-rounded" cta="Learn More" cta-size="w-full h-max" cta-class="p-3">
                            <div>
                                <h2 class="text-center font-headings font-extrabold flex flex-col mb-4 text-xl mt-2">
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
                        <BaseLayoutCard class="bg-brand-background sm:w-[400px]" hover-group icon-size="size-32" icon-name="medical-icon:first-aid" cta="Learn More" cta-size="w-full h-max" cta-class="p-3">
                            <div>
                                <h2 class="text-center font-headings font-extrabold flex flex-col mb-4 text-xl mt-2">
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
    
            <!-- Why People Choose Us -->
            <BaseLayoutPageSection>
                
            </BaseLayoutPageSection>
    
            <!-- 👉 Events & Community Highlights -->
            <BaseLayoutPageSection bg="alt">
                
            </BaseLayoutPageSection>

            <!-- Schedule a Ride CTA -->
            <BaseLayoutPageCTA title="Need a Ride? We’re Ready When You Are." to="/resources/schedule-a-ride" button-label="Schedule a Ride">
                <p class="text-xl">
                    Whether it’s a medical appointment, a grocery run, or just getting where you need to go — our dependable drivers are here to help, 24/7. Booking is fast, simple, and just a click away.
                </p>
            </BaseLayoutPageCTA>

            <!-- Blog / News -->
            <BaseLayoutPageSection bg="alt">
                
            </BaseLayoutPageSection>
        </BaseLayoutPageWrapper>
    </div>
</template>

<script setup lang='ts'>
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