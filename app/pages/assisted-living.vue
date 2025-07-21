<template>
  <div>
    <BaseLayoutPageSection margin="top">
      <!-- Top Page -->
      <BaseLayoutPageContainer class="">
            <h2 class="text-2xl text-center font-bold text-brand-primary flex flex-col mb-4 max-sm:hidden">
                <span class="text-gray-500">
                    Golden Gate Manor
                </span>
                <span class="text-brand-primary">
                    Assisted Living Facilities
                </span>
            </h2>
            <div class="flex flex-col space-y-4">
                <div class="flex flex-col-reverse justify-center lg:flex-row lg:items-end sm:gap-8">
                    <!-- Left Side -->
                    <div class="lg:w-1/2 space-y-4">
                        <p class="text-xl text-brand-main-text">
                            Golden Gate Assisted Living houses are highly respected Medicaid-certified assisted living facilities located in Pueblo, Colorado. At each of our five house locations, trained staff members are present 24/7 to provide care, assistance with medication, daily living skills, meals, transportation and treatment management.
                        </p>
                        <p class="text-xl text-brand-main-text">
                            Each home has specific accommodations that are available for our residents such as their own bed, dresser, closet space, shared bathrooms or private bathrooms depending on availability, and shared common areas. This is the best type of housing for people who are elderly and people experiencing a mental illness, which may affect their ability to perform their daily tasks. Our houses specialize in care plans to make sure that our residents have the care they need when they need it.
                        </p>
                    </div>
                    <!-- Right Side -->
                    <div class="sm:h-[375px] lg:w-1/2">
                      <NuxtImg src="/images/pages/assisted-living/assisted-living-sign.webp" format="webp" quality="75" width="179" height="199" class="w-full sm:w-max sm:h-[375px] mx-auto sm:rounded-lg md:shadow-primary" alt="Golden Gate Manor I sign" title="Golden Gate Manor I Sign" loading="eager" placeholder/>
                    </div>
                </div>
                <p class="text-xl text-brand-main-text">
                    On top of our in house accommodations, our non-emergency medical transportation (NEMT) services are utilized to transport our residents to and from covered medical appointments or services, if the resident chooses to utilize these services. These services are provided through Colorado's Medicaid program Health First Colorado.
                </p>
                <p class="text-xl text-brand-main-text">
                    With our fleet of 40+ vehicles, and our helpful housing staff, we make sure that our residents make it to and from their appointments on time. Our goal in our houses it for our residents to feel at home and that they have the independence they want with the additional help they may need. We are here for all of our residents.
                </p>
            </div>
        </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
    <BaseLayoutPageSection margin="default" bg="alt">
        <BaseLayoutPageContainer class="">
            <div class="bg-[#365dba] text-white px-2 lg:px-12 py-16 rounded-lg">
                <h2 class="text-2xl font-extrabold px-2 text-center mb-8 lg:text-left lg:px-0">ASSISTED LIVING AMENITIES</h2>
                <p class="text-xl font-semibold px-2 lg:px-0">Our comprehensive monthly fee covers all assisted living services in Pueblo, including an appointed semi-private or private room, and a wide range of services and amenities for residents 18 and older, including but not limited to:</p>
                <div class="flex flex-col lg:flex-row justify-center gap-8 my-16 mx-8"> 
                    <ul class="bg-gray-200 font-bold text-brand-main-text px-4 lg:px-8 py-12 rounded-2xl text-xl lg:w-1/3 shadow-primary text-center space-y-4 flex flex-col justify-center">
                        <li class="">24-hour staffing</li>
                        <li class="">Assistance with bathing, dressing, and personal hygiene</li>
                        <li class="">On-call Nurse</li>
                        <li class="">Medication management</li>
                    </ul>
                    <ul class="bg-gray-200 font-bold text-brand-main-text px-4 lg:px-8 py-12 rounded-2xl text-xl lg:w-1/3 shadow-primary text-center space-y-4 flex flex-col justify-center">
                        <li class="">Three nutritious daily meals, including snacks</li>
                        <li class="">Food available 24 Hours</li>
                        <li class="">Multiple TV & lounge rooms</li>
                        <li class="">Free Wi-Fi & cable</li>
                    </ul>
                    <ul class="bg-gray-200 font-bold text-brand-main-text px-4 lg:px-8 py-12 rounded-2xl text-xl lg:w-1/3 shadow-primary text-center space-y-4 flex flex-col justify-center">
                        <li class="">Appointment scheduling & reminders</li>
                        <li class="">Transportation to medical appointments, groups, activities, etc.</li>
                        <li class="">Accompany to appointments (if necessary)</li>
                    </ul>
                </div>
            </div>
        </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
        
      <!-- Assisted Living Carousel -->
    <!-- <AssitedLivingCarousel /> -->

      <!-- Bottom Page -->

    <BaseLayoutPageCTA 
        title="Call Us Today and Get More Details"
        description="Set up an appointment to visit one of our assisted living houses. Meet our dedicated staff, some of the residents, and see for yourself all that Golden Gate Manor Assisted Living houses have to offer. Our staff happily provides brochures, cards, tours, respite care, and lunches for interested families and residents."
        button-label="Reach Out Now"
        to="/company/contact-us"
        />
    <BaseLayoutPageSection margin="default">
        <BaseLayoutPageContainer class="">
            <BaseLayoutCard :has-padding="false">
                <div class="flex flex-col w-full gap-8 lg:flex-row">
                    <!-- Left Side -->
                    <div class="lg:w-1/2">
                        <NuxtImg src="/images/pages/assisted-living/nursing-care.jpg" width="1280" height="720" format="webp" quality="60" alt="Photo of a nurse and a resident" title="Photo of a nurse and a resident" loading="lazy" class="h-full w-full object-cover" placeholder/>
                    </div>
                    <!-- Right Side -->
                    <div class="p-4 flex flex-col lg:w-1/2 space-y-2">
                        <h2 class="text-2xl font-bold text-brand-primary mb-4 text-center md:text-left">
                            Personalized Assisted Living Consultations in Pueblo
                        </h2>
                        <p class="text-xl text-brand-main-text">
                           Every consultation at one of our Assisted Living houses is curated to fit individual needs. We understand the process of choosing a new place to live for a family member and for the family is significant, so our process is made to be friendly, personable, informative, and pressure-free.
                        </p>
                        <p class="text-xl text-brand-main-text">
                            Our experienced house care coordinator conducts all of our consultations, bringing years of hands-on experience from working with other clients in Pueblo, Colorado. We'll tour the houses that have availability, show the actual living conditions, and invite you to join us for lunch to experience our home-like atmospheres.
                        </p>
                        <p class="text-xl text-brand-main-text">
                            We'll sit down and explain daily life, discuss our resident expectations, and make sure that our community feels right for you or your loved one's needs. You're welcome to visit any houses that have openings and ask any questions that come to mind. Our goal is simple: we want you to leave knowing more than when you arrived, with reduced anxiety and clear expectations - just transparent and honest guidance from people who care.
                        </p>
                        <BaseUiAction to="/company/contact-us" class="self-center !mt-8 py-4 px-8">GET FREE CONSULTATION</BaseUiAction>
                    </div>
                </div>
            </BaseLayoutCard>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
  </div>
</template>

<script setup lang='ts'>
const runtimeConfig = useRuntimeConfig()
definePageMeta({
  title: 'Assisted Living in Pueblo Colorado',
  breadcrumbLabel: 'Assisted Living'
})

useSeoMeta({
  title: 'Assisted Living in Pueblo Colorado',
  ogTitle: 'Assisted Living in Pueblo Colorado',
  description: 'Discover compassionate and comfortable assisted living options at Golden Gate Manor Inc., serving seniors across Southern Colorado with dignity and care.',
  ogDescription: 'Discover compassionate and comfortable assisted living options at Golden Gate Manor Inc., serving seniors across Southern Colorado with dignity and care.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-assisted-living.png`,
  twitterTitle: 'Assisted Living in Pueblo Colorado',
  twitterDescription: 'Discover compassionate and comfortable assisted living options at Golden Gate Manor Inc., serving seniors across Southern Colorado with dignity and care.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-assisted-living.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'AssistedLivingPage'
})
</script>

<style></style>