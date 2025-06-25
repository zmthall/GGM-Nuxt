<template>
  <div>
    <BaseLayoutPageSection margin="top">
      <BaseLayoutPageContainer>
        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-brand-primary">Support Center</h2>
          <p class="text-xl text-brand-main-text">
            Get the help you need with dedicated support for all our services. Our comprehensive support center provides personalized assistance across all areas of our business.
          </p>
          <SupportCenterSection />
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
    <BaseLayoutPageSection margin="default" bg="alt">
      <BaseLayoutPageContainer>
        <div class="space-y-4">
          <p class="text-xl text-brand-main-text">
            <span class="font-semibold">Assisted Living Support</span> -
            Our care coordination team helps families navigate the assisted living process, from initial assessments to ongoing care planning. Get guidance on facility amenities, care levels, family communication, and transitioning your loved one to their new home.
          </p>
          <p class="text-xl text-brand-main-text">
            <span class="font-semibold">Medical Equipment Assistance</span> -
            Navigate insurance coverage, product selection, and delivery options with our medical supply specialists. We provide setup guidance, user training, and ongoing technical support for all equipment. Our team ensures you receive the right products for your specific needs and helps coordinate with healthcare providers.
          </p>
          <p class="text-xl text-brand-main-text">
            <span class="font-semibold">Transportation Coordination</span> -
            Our scheduling specialists help arrange reliable medical transportation throughout Colorado and beyond. We assist with appointment coordination, insurance verification, wheelchair accessibility needs, and long-distance medical travel planning. Whether it's routine appointments or specialized care in Denver or Colorado Springs, we ensure safe and comfortable transportation.
          </p>
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
    <BaseLayoutPageCTA title="Need assistance with any of the services above?" description="Submit a contact form or call directly and our customer service representatives will connect with you to provide personalized help with assisted living coordination, medical equipment, or transportation services." button-label="Reach out Now" to="/company/contact-us"/>
    <BaseLayoutPageSection margin="default">
      <BaseLayoutPageContainer>
        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-brand-primary">Service Areas</h2>
          <div class="flex flex-col justify-center md:flex-row gap-8">
            <div class="md:w-1/2">
              <p class="text-xl text-brand-main-text">
                <span class="font-semibold">Transportation Service Areas</span> -
                Our comprehensive transportation map shows routes throughout Colorado and beyond, including:
              </p>
              <ul class="ml-8 list-disc text-xl text-brand-main-text">
                <li>
                  Pueblo County (primary service area)
                </li>
                <li>
                  Extended routes to Denver metropolitan area
                </li>
                <li>
                  Colorado Springs and surrounding regions
                </li>
                <li>
                  Specialized long-distance medical transport for appointments throughout Colorado
                </li>
              </ul>
            </div>
            <div class="md:w-1/2">
              <BaseInteractiveServiceAreaMap />
            </div>
          </div>
          <p class="text-xl text-brand-main-text">
            <span class="font-semibold">Assisted Living Coverage</span>
            Our assisted living facilities are located in Pueblo, Colorado. While our physical locations are in Pueblo County, we welcome residents from neighboring cities and communities who may be experiencing difficulty finding appropriate assisted living situations in their local areas. We work with families throughout the region to provide quality care options.
          </p>
          <p class="text-xl text-brand-main-text">
            <span class="font-semibold">Medical Supply & Equipment</span>
            Our ecommerce medical supply platform serves customers nationwide throughout the United States. We ship medical equipment and supplies directly to homes with discrete packaging and reliable delivery. For specialized or hard-to-find medical supplies, our team conducts personalized searches and consultations to meet individual patient needs, regardless of location.
          </p>
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
    <BaseLayoutPageSection margin="default" bg="alt">
      <BaseLayoutPageContainer>
        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-brand-primary">Frequently Asked Questions (FAQ)</h2>
          <p class="text-xl text-brand-main-text">
            Find quick answers to common questions about our services, coverage areas, insurance acceptance, and more. Our comprehensive FAQ section is organized by service area and topic to help you find information quickly.
          </p>
          <p class="text-xl text-brand-main-text">
            <span class="font-semibold">Assisted Living Questions</span> -
            Common topics include admission requirements, care level assessments, visiting policies, medication management, meal plans, activity programs, and what to expect during the transition process. We also address family concerns about communication, care updates, and emergency procedures.
          </p>
          <p class="text-xl text-brand-main-text">
            <span class="font-semibold">Medical Equipment & Supplies</span> -
            Frequently asked questions cover insurance coverage and billing, product selection guidance, delivery timeframes and shipping options, equipment setup and training, warranty information, and return policies. We also address questions about prescription requirements and coordination with healthcare providers.
          </p>
          <p class="text-xl text-brand-main-text">
            <span class="font-semibold">Transportation Services</span> -
            Popular questions include scheduling procedures, coverage areas and travel distances, wheelchair accessibility options, insurance acceptance, cancellation policies, and emergency transportation availability. We provide detailed information about long-distance medical transport to Denver, Colorado Springs, and specialized medical facilities.
          </p>
          <div class="flex justify-center">
            <BaseUiAction to="/resources/faq" class="py-4 px-8">View FAQs</BaseUiAction>
          </div>
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
    <BaseLayoutPageSection margin="default">
      <BaseLayoutPageContainer>
        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-brand-primary">Getting the Most from Our Resources</h2>
          <p class="text-xl text-brand-main-text">
            <span class="font-semibold">New to Our Services?</span> -
            Start with our FAQ section to understand how our services work, then use the Service Area Map to confirm coverage in your area.
          </p>
          <p class="text-xl text-brand-main-text">
            <span class="font-semibold">Ready to Get Started?</span> -
            Visit our Forms & Documents section to complete necessary paperwork, or use Schedule a Ride to arrange transportation services.
          </p>
          <p class="text-xl text-brand-main-text">
            <span class="font-semibold">Need Help?</span> -
            Our Support Center is always available to guide you through any of our resources or answer specific questions about your needs.
          </p>
          <div class="flex justify-center">
            <BaseUiAction to="/company/contact-us" class="px-8 py-4">Contact Us</BaseUiAction>
          </div>
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'Golden Gate Manor Resources',
  breadcrumbLabel: 'Resources'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Resources & Support',
  ogTitle: 'Resources & Support',
  description: 'Explore valuable resources and support information provided by Golden Gate Manor Inc. for transportation, assisted living, and healthcare needs.',
  ogDescription: 'Explore valuable resources and support information provided by Golden Gate Manor Inc. for transportation, assisted living, and healthcare needs.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Resources & Support',
  twitterDescription: 'Explore valuable resources and support information provided by Golden Gate Manor Inc. for transportation, assisted living, and healthcare needs.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
  name: 'ResourcePage'
})
</script>

<style>

</style>