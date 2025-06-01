<template>
  <div>
    <BaseLayoutPageSection margin="top">
      <!-- Top Page -->
      <BaseLayoutPageContainer class="">
            <h2 class="text-2xl text-center font-bold text-brand-primary flex flex-col mb-4">
                <span class="text-gray-500">
                    Golden Gate Manor
                </span>
                <span class="text-brand-primary">
                    Assisted Living Facilities
                </span>
            </h2>
            <div class="flex flex-col-reverse justify-center gap-8 lg:flex-row lg:items-center">
                <!-- Left Side -->
                <div class="lg:w-2/5 text-xl text-brand-main-text space-y-4">
                    <p class="">Golden Gate Manor, Inc. are highly respected, Medicaid Certified Assisted Living Facilities located in Pueblo, Colorado. Trained staff members are present 24/7 to provide care, assistance with medication, daily living skills, meals, transportation and treatment management. Our homes provide residents with their own bed, dresser, closet space, shared bathrooms, private bathrooms and common areas. This is the best type of housing for the elderly and people experiencing a mental illness, which may affect their ability to perform their daily tasks.</p>
                    <p class="">Non-Emergency Medical Transportation (NEMT) is transportation to and from covered non-emergency medical appointments or services; provided through Colorado&#39;s Medicaid program Health First Colorado. With our fleet of over 40 vehicles, we make sure that our residents make it to and from their appointments on time.</p>
                </div>
                <!-- Right Side -->
                <div class="h-[400px] lg:w-2/5">
                  <NuxtImg src="/images/pages/assisted-living/assisted-living-sign.webp" format="webp" class="w-max h-[400px] mx-auto sm:rounded-lg md:shadow-primary"/>
                </div>
            </div>
        </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
    <BaseLayoutPageSection margin="default" bg="alt">
        <BaseLayoutPageContainer class="">
            <div class="bg-[#365dba] text-white px-2 lg:px-12 py-16 rounded-lg">
                <h2 class="text-2xl font-extrabold px-2 text-center mb-8 lg:text-left lg:px-0">ASSISTED LIVING AMENITIES</h2>
                <p class="text-xl font-semibold px-2 lg:px-0">One monthly fee provides an appointed semi-private or private room, and a wide range of services and amenities for residents 18 and older, including but not limited to:</p>
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
        description="Set up an appointment to visit our facilities. Meet our staff, residents, and see for yourself all that Golden Gate Manor, Inc. has to offer. Golden Gate Manor, Inc. happily provides brochures, cards, tours, Respite Care, and lunches for interested residents."
        button-label="Contact Us"
        to="/company/contact-us"
        />
    <BaseLayoutPageSection margin="default">
        <BaseLayoutPageContainer class="">
            <BaseLayoutCard :has-padding="false">
                <div class="flex flex-col w-full gap-8 md:flex-row">
                    <!-- Left Side -->
                    <div class="md:w-1/2">
                        <NuxtImg src="/images/pages/assisted-living/nursing-care.jpg" format="webp" alt="Stock photo of a nurse and a resident" class="w-full h-full object-cover"/>
                    </div>
                    <!-- Right Side -->
                    <div class="p-4 flex flex-col md:w-1/2">
                        <h2 class="text-2xl font-bold text-brand-primary mb-4 text-center md:text-left">
                            Golden Gate Manor prioritizes comprehensive support for our residents
                        </h2>
                        <p class="text-xl text-brand-main-text">
                            Trained staff members are present 24/7 to provide care, assistance with medication, daily living skills, meals, transportation and treatment management. 
                            Our homes provide residents with their own bed, dresser, closet space, shared bathrooms, private bathrooms and common areas. 
                            This is the best type of housing for the elderly and, people experiencing a mental illness which may affect their ability to perform their daily tasks.
                        </p>
                        <BaseUiAction to="/company/contact-us" class="self-center mt-8 py-4 px-8">GET FREE CONSULTATION</BaseUiAction>
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
  title: 'Assisted Living',
})

useSeoMeta({
  title: 'Assisted Living in Southern Colorado',
  ogTitle: 'Assisted Living in Southern Colorado',
  description: 'Discover compassionate and comfortable assisted living options at Golden Gate Manor Inc., serving seniors across Southern Colorado with dignity and care.',
  ogDescription: 'Discover compassionate and comfortable assisted living options at Golden Gate Manor Inc., serving seniors across Southern Colorado with dignity and care.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-assisted-living.png`,
  twitterTitle: 'Assisted Living in Southern Colorado',
  twitterDescription: 'Discover compassionate and comfortable assisted living options at Golden Gate Manor Inc., serving seniors across Southern Colorado with dignity and care.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-assisted-living.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'AssistedLivingPage'
})
</script>

<style></style>