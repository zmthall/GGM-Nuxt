<template>
  <div>
    <!-- Page Banner -->
    <BaseLayoutPageBanner />
    <!-- Top Page -->
    <BaseLayoutPageSection class="" margin="top">
      <!-- <img src="/images/about-us/about-us-car-lineup.jpeg" alt="Golden Gate Manor Transportation cars lined up in front of dispatch office building."> -->
      <h2 class="section-title">About Us</h2>
      <p class="section-text">
        Welcome to Golden Gate Manor! We are a family-owned and operated facility that offers highly personalized,
        compassionate, and direct care to members of our community in Pueblo, CO. Our services include assisted living,
        medical and non-medical transportation services, and medical supply sales. Keep reading to learn more about
        Golden
        Gate Manor, and feel free to contact us with any questions! You can reach us at <a 
          rel="nofollow"
          href="tel:<%- company.phone_number_nemt %>">Need NEMT Number</a>.
      </p>
      <a href="/contact-us" class="cta-button contact-us-page">Contact Us</a>
    </BaseLayoutPageSection>

    <!-- Assisted Living -->
    <BaseLayoutPageSection class="" margin="default" bg="alt">
      <div class="page-content">
        <h2 class="section-title">
          Assisted Living
        </h2>
        <p class="section-text">
          Our Medicaid Certified assisted living facilities provide residential care
          to older adults and people living with mental illnesses. Our healthcare aides
          are available 24/7 to assist with the tasks of daily living, including
          medications, meals, transportation, and personal care. We also have an on-call
          nurse available at each of our facilities to respond to urgent medical needs.
        </p>
        <p class="section-text">
          Please call us at <a rel="nofollow" href="tel:<%- company.phone_number_assisted_living %>">Need Assisted Living Number</a> if you are interested in taking a tour of our
          facilities. We warmly welcome all potential residents and their family members
          to join us for lunch. This gathering will provide an excellent opportunity to
          meet our dedicated staff, mingle with current residents, and personally
          experience everything Golden Gate Manor has to offer.
        </p>
        <p class="section-list-description section-text">
          We have 5 assisted living locations:
        </p>
        <ul class="section-list-container section-text">
          <li class="section-list-item">Golden Gate Manor I 606 West Abriendo Ave. Pueblo, CO 81004</li>
          <li class="section-list-item">Golden Gate Manor II 1219 Lake Ave. Pueblo, CO 81004</li>
          <li class="section-list-item">Golden Horizon 2109 Chautard Dr. Pueblo, CO 81005</li>
          <li class="section-list-item">Golden View 525 West 9th St. Pueblo, CO 81003</li>
          <li class="section-list-item">Golden Valley 1033 East Evans Ave. Pueblo, CO 81004</li>
        </ul>
      </div>
      <div class="house-image-container">
        <img 
          src="/images/pages/about-us/golden-gate-manor-1.jpeg"
          alt="Golden Gate Manor I 606 West Abriendo Ave. Pueblo, CO 81004">
        <img src="/images/pages/about-us/golden-gate-manor-2.jpeg" alt="Golden Gate Manor II 1219 Lake Ave. Pueblo, CO 81004">
        <img src="/images/pages/about-us/golden-horizon.jpeg" alt="Golden Horizon 2109 Chautard Dr. Pueblo, CO 81005">
        <img src="/images/pages/about-us/golden-valley.jpeg" alt="Golden View 525 West 9th St. Pueblo, CO 81003">
        <img src="/images/pages/about-us/golden-view.jpeg" alt="Golden Valley 1033 East Evans Ave. Pueblo, CO 81004">
      </div>
    </BaseLayoutPageSection>

    <!-- Transportation Services -->
    <BaseLayoutPageSection class="" margin="default">
      <h2 class="section-title">
        Transportation Services
      </h2>
      <div class="section-content-image-container text-first">
        <img 
          class="section-image image-left" src="/images/pages/about-us/transportation-services.jpeg"
          alt="Pueblo City Cab and Golden Gate Manor Transportation vehicles in front of dispatch office.">
        <div class="section-text-wrapper">
          <p class="section-text">
            Golden Gate Manor offers Non-Emergency Medical Transportation (NEMT) and
            non-medical transportation services. NEMT includes transportation to and
            from covered non-emergency medical appointments or services and is only
            available to Health First Colorado members.
          </p>
          <p class="section-text">
            Non-medical transportation is available to
            all Medicaid-eligible older adults and people with disabilities in the
            Pueblo County area. This service provides safe and reliable transportation
            for running errands, attending events, and other activities.
          </p>
        </div>
      </div>
    </BaseLayoutPageSection>

    <!-- Medical Supply -->
    <BaseLayoutPageSection class="" margin="default" bg="alt">
      <h2 class="section-title">
        Medical Supplies
      </h2>
      <div class="section-content-image-container">
        <div class="section-text-wrapper">
          <p class="section-text">Our medical supply store, Golden Gate Medical Supplies,
            is conveniently located in downtown Pueblo, CO. We are committed to improving
            healthcare access in our community, so we curate our inventory with a focus on
            quality and affordability. Our products include hospital beds, compression
            apparel, diagnostic tools, first-aid supplies, and more.
          </p>
          <p class="section-text">If you need help choosing the right products for your
            needs, you are always welcome to consult our knowledgeable staff. We
            understand that purchasing medical equipment can be a stressful
            experience, and we are here to support you every step of the way.
          </p>
        </div>
        <img 
          class="section-image image-right" src="/images/pages/about-us/medical-supply-store.jpeg"
          alt="Inside Golden Gate Medical Supply Store at 612 South Union Avenue.">
      </div>
    </BaseLayoutPageSection>

    <!-- Gas Station -->
    <BaseLayoutPageSection class="" margin="default">
      <h2 class="section-title">
        Gas Station
      </h2>
      <div class="section-content-image-container text-first">
        <img 
          class="section-image image-left" src="/images/pages/about-us/gas-station-about-us1.jpg"
          alt="Pueblo City Cab and Golden Gate Manor Transportation vehicles in front of dispatch office.">
        <div class="section-text-wrapper">
          <p class="section-text">
            At Golden Gate Manor, we are thrilled to embark on an exciting new journey with the opening of our gas
            stations
            under the banner of Golden Gate Gas and Goods. This expansion marks a significant milestone in our
            commitment to
            serving our community more comprehensively.
          </p>
          <p class="section-text">
            Our gas stations will not only provide convenient fueling options but will also enhance the services we
            offer,
            ensuring that our customers have access to quality products in one convenient location. We aim to create
            a clean
            welcoming environment where everyone feels valued and appreciated.
          </p>
          <p class="section-text">
            We invite you to join us on this new adventure, and we look forward to serving you at our gas stations.
            Thank you
            for being a part of our journey as we strive to improve the quality of life for everyone in our
            community, one service at a time.
          </p>
        </div>
      </div>
      <a href="/gas-and-goods" class="cta-button gas-station-about-us"><span class="read-more-plus">+ </span>Learn
        More</a>
    </BaseLayoutPageSection>

    <!-- Our Team -->
    <BaseLayoutPageSection class="" margin="default" bg="alt">
      <h2 class="section-title">
        Our Team
      </h2>
      <p class="section-text">
        The management team at Golden Gate Manor brings over 35 years of experience in
        caring and providing for older adults, individuals with mental illness, and
        overseeing transportation operations. Our mission is to foster a welcoming and
        relaxing environment, whether you're in our assisted living or utilizing our
        transportation services. This ensures that both you and your loved ones feel
        right at home.
      </p>
      <p class="section-list-description section-text">
        Our specialized staff includes:
      </p>
      <ul class="section-list-container section-text">
        <li class="section-list-item section-text">The Vice President of Operations, who devotes time and effort to
          ensuring that our facilities are safe and comfortable for all the people we serve while also making sure our
          transportation services are running smoothly.</li>
        <li class="section-list-item section-text">Our dedicated house managers, who give their personal attention to
          meeting the individual needs of each resident under our care.</li>
        <li class="section-list-item section-text">Our highly trained and experienced QMAP aides, who attend to the
          daily needs of our residents with care and compassion.</li>
        <li class="section-list-item section-text">Our team of skilled and reliable drivers, who ensure the secure
          transportation of our clients to their scheduled appointments and various travel destinations.</li>
        <li class="section-list-item section-text">Outside agencies, to recruit and properly place individuals in need
          of services.</li>
      </ul>
    </BaseLayoutPageSection>
  </div>
</template>

<script setup lang='ts'>
const runtimeConfig = useRuntimeConfig()
const publishDate = new Date().toISOString()
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
  name: 'HomePage'
})
</script>

<style></style>