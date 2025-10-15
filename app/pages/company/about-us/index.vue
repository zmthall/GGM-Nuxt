<template>
  <div>
    <!-- Page Banner -->
    <BaseLayoutPageBanner src="/images/pages/about-us/about-us-car-lineup-ratio.jpeg" alt="Golden Gate Manor cars lined up infront of our transportation hub building" loading="eager" title="Golden Gate Manor cars lined up infront of our transportation hub building" image-height="400" image-width="800" aspect-ratio="aspect-[2/1]" format="webp,avif" />
    <!-- Top Page -->
    <BaseLayoutPageSection margin="top">
      <BaseLayoutPageContainer class="flex flex-col space-y-4">
        <!-- <img src="/images/about-us/about-us-car-lineup.jpeg" alt="Golden Gate Manor Transportation cars lined up in front of dispatch office building."> -->
        <h2 class="text-2xl font-bold text-brand-primary">About Us</h2>
        <p class="text-xl text-brand-main-text">
                  Welcome to Golden Gate Manor Inc., a family-owned and operated organization built on compassion, trust, and community. Based in Pueblo, Colorado, we proudly provide personalized care and dependable services that improve quality of life for those we serve.
        </p>
        <p class="text-xl text-brand-main-text ">
          Our operations include:
        </p>
        <ul class="text-xl text-brand-main-text ml-8 list-disc !mt-0">
          <li>Assisted Living Homes offering safe, comfortable, and family-style environments where residents receive attentive 24-hour care.</li>
          <li>Transportation Services, both medical and non-medical, ensuring reliable access to appointments, errands, and social activities across Southern Colorado.</li>
          <li>Golden Gate Medical Supply, providing affordable, high-quality medical equipment and supplies designed to help individuals live independently.</li>
          <li>Golden Gate Gas & Goods, our newest addition, offering convenience and community support through our locally operated fuel and goods stations.</li>
        </ul>
        <p class="text-xl text-brand-main-text">
          At Golden Gate Manor, our mission is simple — to serve people with dignity and care across every stage of life. Whether you're exploring assisted living options, scheduling transportation, or looking for trusted healthcare products, our team is here to help.
        </p>
        <p class="text-xl text-brand-main-text">You can reach us at <a rel="nofollow" :href="`tel:${company?.trans.phone.office}`" class="link">{{ company?.trans.phone.office }}</a>, or continue reading below to learn more about each division of our company and how we proudly serve Southern Colorado.</p>
        <BaseUiAction to="/company/contact-us" class="py-4 px-16 self-center">Contact Us</BaseUiAction>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>

    <!-- Assisted Living -->
    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" bg="alt" class="cv-auto">
        <BaseLayoutPageContainer class="space-y-8">
          <div class="space-y-4">
            <h2 class="text-2xl font-bold text-brand-primary">
              Assisted Living
            </h2>
            <p class="text-xl text-brand-main-text">
              Our Medicaid Certified assisted living facilities provide residential care
              to older adults and people living with mental illnesses. Our healthcare aides
              are available 24/7 to assist with the tasks of daily living, including
              medications, meals, transportation, and personal care. We also have an on-call
              nurse available at each of our facilities to respond to urgent medical needs.
            </p>
            <p class="text-xl text-brand-main-text">
              Please call us at <a rel="nofollow" :href="`tel:${company?.assitedLiving.phone}`" class="link">{{ company?.assitedLiving.phone }}</a> if you are interested in taking a tour of our
              facilities. We warmly welcome all potential residents and their family members
              to join us for lunch. This gathering will provide an excellent opportunity to
              meet our dedicated staff, mingle with current residents, and personally
              experience everything Golden Gate Manor has to offer.
            </p>
            <div>
              <p class="text-xl text-brand-main-text font-bold">
                We have 5 assisted living locations:
              </p>
              <ul class="section-list-container text-xl text-brand-main-text list-disc ml-8 space-y-2">
                <li class="section-list-item">Golden Gate Manor I 606 West Abriendo Ave. Pueblo, CO 81004</li>
                <li class="section-list-item">Golden Gate Manor II 1219 Lake Ave. Pueblo, CO 81004</li>
                <li class="section-list-item">Golden Horizon 2109 Chautard Dr. Pueblo, CO 81005</li>
                <li class="section-list-item">Golden View 525 West 9th St. Pueblo, CO 81003</li>
                <li class="section-list-item">Golden Valley 1033 East Evans Ave. Pueblo, CO 81004</li>
              </ul>
            </div>
          </div>
        </BaseLayoutPageContainer>
        <div class="hidden xl:flex xl:justify-center xl:gap-12 xl:mt-8">
          <NuxtImg src="/images/pages/about-us/golden-gate-manor-1.jpeg" format="webp,avif" quality="60" sizes="xl:400px" alt="Golden Gate Manor I 606 West Abriendo Ave. Pueblo, CO 81004" title="Golden Gate Manor I 606 West Abriendo Ave. Pueblo, CO 81004" class="xl:block xl:w-[17%] xl:h-max rounded-lg shadow-primary hover:scale-110"  loading="lazy" width="400" height="266"/>
          <NuxtImg src="/images/pages/about-us/golden-gate-manor-2.jpeg" format="webp,avif" quality="60" sizes="xl:400px" alt="Golden Gate Manor II 1219 Lake Ave. Pueblo, CO 81004" title="Golden Gate Manor II 1219 Lake Ave. Pueblo, CO 81004" class="xl:block xl:w-[17%] xl:h-max rounded-lg shadow-primary hover:scale-110" loading="lazy" width="400" height="266" />
          <NuxtImg src="/images/pages/about-us/golden-horizon.jpeg" format="webp,avif" quality="60" sizes="xl:400px" alt="Golden Horizon 2109 Chautard Dr. Pueblo, CO 81005" title="Golden Horizon 2109 Chautard Dr. Pueblo, CO 81005" class="xl:block xl:w-[17%] xl:h-max rounded-lg shadow-primary hover:scale-110" loading="lazy" width="400" height="266" />
          <NuxtImg src="/images/pages/about-us/golden-valley.jpeg" format="webp,avif" quality="60" sizes="xl:400px" alt="Golden View 525 West 9th St. Pueblo, CO 81003" title="Golden View 525 West 9th St. Pueblo, CO 81003" class="xl:block xl:w-[17%] xl:h-max rounded-lg shadow-primary hover:scale-110" loading="lazy" width="400" height="266" />
          <NuxtImg src="/images/pages/about-us/golden-view.jpeg" format="webp,avif" quality="60" sizes="xl:400px" alt="Golden Valley 1033 East Evans Ave. Pueblo, CO 81004" title="Golden Valley 1033 East Evans Ave. Pueblo, CO 81004" class="xl:block xl:w-[17%] xl:h-max rounded-lg shadow-primary hover:scale-110" loading="lazy" width="400" height="266" />
        </div>
      </BaseLayoutPageSection>
    </DeferRender>

    <!-- Transportation Services -->
    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" class="cv-auto">
        <BaseLayoutPageContainer class="space-y-4">
          <h2 class="text-2xl font-bold text-brand-primary">
            Transportation Services
          </h2>
          <div class="flex flex-col space-y-4 lg:flex-row lg:gap-12 items-center">
            <NuxtImg 
              src="/images/pages/about-us/transportation-services-ratio.jpeg"
              format="avif,webp"
              quality="60"
              sizes="100vw sm:650px"
              densities="1"
              class="rounded-lg shadow-primary w-full aspect-[2/1] object-contain" 
              alt="Pueblo City Cab and Golden Gate Manor Transportation vehicles in front of dispatch office." 
              title="Pueblo City Cab and Golden Gate Manor Transportation vehicles in front of dispatch office."
              placeholder
              loading="lazy"
              height="400"
              width="800"
            />
            <div class="space-y-4">
              <p class="text-xl text-brand-main-text">
                Golden Gate Manor offers Non-Emergency Medical Transportation (NEMT) and
                non-medical transportation services. NEMT includes transportation to and
                from covered non-emergency medical appointments or services and is only
                available to Health First Colorado members.
              </p>
              <p class="text-xl text-brand-main-text">
                Non-medical transportation is available to
                all Medicaid-eligible older adults and people with disabilities in the
                Pueblo County area. This service provides safe and reliable transportation
                for running errands, attending events, and other activities.
              </p>
            </div>
          </div>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>

    <!-- Medical Supply -->
    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" bg="alt" class="cv-auto">
        <BaseLayoutPageContainer class="space-y-4">
          <h2 class="text-2xl font-bold text-brand-primary">
            Medical Supplies
          </h2>
          <div class="flex flex-col-reverse lg:flex-row lg:gap-12">
            <div class="space-y-4 mt-4">
              <p class="text-xl text-brand-main-text">Our medical supply store, Golden Gate Medical Supplies,
                is conveniently located in downtown Pueblo, CO. We are committed to improving
                healthcare access in our community, so we curate our inventory with a focus on
                quality and affordability. Our products include hospital beds, compression
                apparel, diagnostic tools, first-aid supplies, and more.
              </p>
              <p class="text-xl text-brand-main-text">If you need help choosing the right products for your
                needs, you are always welcome to consult our knowledgeable staff. We
                understand that purchasing medical equipment can be a stressful
                experience, and we are here to support you every step of the way.
              </p>
            </div>
            <NuxtImg 
              src="/images/pages/about-us/medical-supply-store.jpeg"
              format="webp,avif"
              quality="60"
              sizes="400px sm:650px md:600px"
              class="rounded-lg shadow-primary h-max" 
              alt="Inside Golden Gate Medical Supply Store at 612 South Union Avenue."
              title="Inside Golden Gate Medical Supply Store at 612 South Union Avenue."
              loading="lazy"
              height="416"
              width="600" 
            />
          </div>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>

    <!-- Gas Station -->
    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" class="cv-auto">
        <BaseLayoutPageContainer class="flex flex-col  space-y-4">
          <h2 class="text-2xl font-bold text-brand-primary">
            Gas Station
          </h2>
          <div class="flex flex-col gap-4 space-y-4 lg:flex-row lg:gap-12">
            <NuxtImg 
              src="/images/pages/about-us/gas-station-about-us3.jpg"
              format="webp,avif"
              quality="60"
              sizes="400px sm:650px md:600px"
              class="rounded-lg shadow-primary"
              alt="Golden Gate Gas and Goods front side of building with Golden Gate Transportation car outside"
              title="Golden Gate Gas and Goods front side of building with Golden Gate Transportation car outside"
              loading="lazy"
              height="416"
              width="600"
              />
            <div class="space-y-4">
              <p class="text-xl text-brand-main-text">
                At Golden Gate Manor, we are thrilled to embark on an exciting new journey with the opening of our gas
                stations
                under the banner of Golden Gate Gas and Goods. This expansion marks a significant milestone in our
                commitment to
                serving our community more comprehensively.
              </p>
              <p class="text-xl text-brand-main-text">
                Our gas stations will not only provide convenient fueling options but will also enhance the services we
                offer,
                ensuring that our customers have access to quality products in one convenient location. We aim to create
                a clean
                welcoming environment where everyone feels valued and appreciated.
              </p>
              <p class="text-xl text-brand-main-text">
                We invite you to join us on this new adventure, and we look forward to serving you at our gas stations.
                Thank you
                for being a part of our journey as we strive to improve the quality of life for everyone in our
                community, one service at a time.
              </p>
            </div>
          </div>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>

    <!-- Our Team -->
    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" bg="alt" class="cv-auto">
        <BaseLayoutPageContainer class="space-y-4">
          <h2 class="text-2xl font-bold text-brand-primary">
            Our Team
          </h2>
          <p class="text-xl text-brand-main-text">
            The management team at Golden Gate Manor brings over 35 years of experience in
            caring and providing for older adults, individuals with mental illness, and
            overseeing transportation operations. Our mission is to foster a welcoming and
            relaxing environment, whether you're in our assisted living or utilizing our
            transportation services. This ensures that both you and your loved ones feel
            right at home.
          </p>
          <div>
            <p class="section-list-description text-xl text-brand-main-text font-bold">
              Our specialized staff includes:
            </p>
            <ul class="section-list-container text-xl text-brand-main-text list-disc ml-8 space-y-2">
              <li class="section-list-item text-xl text-brand-main-text">The Vice President of Operations, who devotes time and effort to
                ensuring that our facilities are safe and comfortable for all the people we serve while also making sure our
                transportation services are running smoothly.</li>
              <li class="section-list-item text-xl text-brand-main-text">Our dedicated house managers, who give their personal attention to
                meeting the individual needs of each resident under our care.</li>
              <li class="section-list-item text-xl text-brand-main-text">Our highly trained and experienced QMAP aides, who attend to the
                daily needs of our residents with care and compassion.</li>
              <li class="section-list-item text-xl text-brand-main-text">Our team of skilled and reliable drivers, who ensure the secure
                transportation of our clients to their scheduled appointments and various travel destinations.</li>
              <li class="section-list-item text-xl text-brand-main-text">Outside agencies, to recruit and properly place individuals in need
                of services.</li>
              </ul>
          </div>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>
  </div>
</template>

<script setup lang='ts'>
const runtimeConfig = useRuntimeConfig()
const publishDate = new Date().toISOString()

const company = useStaticData()?.company;

definePageMeta({
  title: 'About Golden Gate Manor Inc.',
  breadcrumbLabel: 'About Us'
})

useHead({
  titleTemplate: null
})

useSeoMeta({
  title: 'About Golden Gate Manor Inc. | Our Story & Commitment',
  description: 'Learn about Golden Gate Manor Inc., a family-owned company dedicated to enhancing quality of life through dependable healthcare transportation and services.',

  ogTitle: 'About Golden Gate Manor Inc. | Our Story & Commitment',
  ogDescription: 'Learn about Golden Gate Manor Inc., a family-owned company dedicated to enhancing quality of life through dependable healthcare transportation and services.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  ogSiteName: 'Golden Gate Manor Inc.',

  twitterTitle: 'About Golden Gate Manor Inc. | Our Story & Commitment',
  twitterDescription: 'Learn about Golden Gate Manor Inc., a family-owned company dedicated to enhancing quality of life through dependable healthcare transportation and services.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',

  articleAuthor: ['https://www.linkedin.com/in/zachary-thallas/'], // Can be a real profile or company
  articlePublishedTime: publishDate,
})


defineOptions({
  name: 'AboutUSPage'
})
</script>

<style></style>