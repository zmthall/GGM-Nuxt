<template>
  <div>
    <BaseLayoutPageSection margin="top">
      <!-- Top Page -->
      <div class="">
          <!-- Left Side -->
            <div class="">
                <h2>
                    <span class="">
                        Golden Gate Manor
                    </span>
                    <span class="">
                        Assisted Living Facilities
                    </span>
                </h2>
                <p class="s">Golden Gate Manor, Inc. are highly respected, Medicaid Certified Assisted Living Facilities located in Pueblo, Colorado. Trained staff members are present 24/7 to provide care, assistance with medication, daily living skills, meals, transportation and treatment management. Our homes provide residents with their own bed, dresser, closet space, shared bathrooms, private bathrooms and common areas. This is the best type of housing for the elderly and people experiencing a mental illness, which may affect their ability to perform their daily tasks.</p>
                <p class="">Non-Emergency Medical Transportation (NEMT) is transportation to and from covered non-emergency medical appointments or services; provided through Colorado&#39;s Medicaid program Health First Colorado. With our fleet of over 40 vehicles, we make sure that our residents make it to and from their appointments on time.</p>
            </div>
            <!-- Right Side -->
            <div class="">
              <NuxtImg src="/images/pages/assisted-living/assisted-living-sign.webp" class=""/>
            </div>
        </div>
            </BaseLayoutPageSection>
        <BaseLayoutPageSection margin="default" bg="alt">
            <div class="">
                <div class="">
                    <h2 class="">ASSISTED LIVING AMENITIES</h2>
                    <p class="">One monthly fee provides an appointed semi-private or private room, and a wide range of services and amenities for residents 18 and older, including but not limited to:</p>
                    <div class=""> 
                        <ul class="">
                            <li class="">24-hour staffing</li>
                            <li class="">Assistance with bathing, dressing, and personal hygiene</li>
                            <li class="">On-call Nurse</li>
                            <li class="">Medication management</li>
                        </ul>
                        <ul class="">
                            <li class="">Three nutritious daily meals, including snacks</li>
                            <li class="">Food available 24 Hours</li>
                            <li class="">Multiple TV & lounge rooms</li>
                            <li class="">Free Wi-Fi & cable</li>
                        </ul>
                        <ul class="">
                            <li class="">Appointment scheduling & reminders</li>
                            <li class="">Transportation to medical appointments, groups, activities, etc.</li>
                            <li class="">Accompany to appointments (if necessary)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </BaseLayoutPageSection>
      <!-- Assisted Living Carousel -->
    <AssitedLivingCarousel />

      <!-- Bottom Page -->
    <BaseLayoutPageSection margin="default">
        <div class="">
          <div class="">
              <NuxtImg src="/images/pages/assisted-living/nursing-care.jpg" alt="Stock photo of a nurse and a resident" />
          </div>
          <div class="">
              <h2 class="">
                  Golden Gate Manor prioritizes comprehensive support for our residents
              </h2>
              <p class="">
                  Trained staff members are present 24/7 to provide care, assistance with medication, daily living skills, meals, transportation and treatment management. 
                  Our homes provide residents with their own bed, dresser, closet space, shared bathrooms, private bathrooms and common areas. 
                  This is the best type of housing for the elderly and, people experiencing a mental illness which may affect their ability to perform their daily tasks.
              </p>
              <a href="" class="">GET FREE CONSULTATION</a>
          </div>
      </div>
    <div class="">
        <h2 class="">See For Yourself</h2>
        <div class="">
            <div class="">
                <h3 class="">
                    Call Us Today
                </h3>
                <p class="">
                    Set up an appointment to visit our facilities. Meet our staff, residents, and see for yourself all that Golden Gate Manor, Inc. has to offer.
                </p>
            </div>
            <div class="">
                <h3 class="">
                    More Details
                </h3>
                <p class="">
                    Golden Gate Manor, Inc. happily provides brochures, cards, tours, Respite Care, and lunches for interested residents.
                </p>
            </div>
        </div>
        <a href="" class=""></a>
    </div>
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