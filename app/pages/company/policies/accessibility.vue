<template>
  <div class="space-y-4">
    <BaseLayoutPageSection margin="pTop" bg="transparent">
      <BaseLayoutPageContainer>
        <h2 class="text-2xl font-bold text-brand-primary">Our Commitment</h2>
        <div class="space-y-2">
          <p class="text-xl text-brand-main-text">
              As a business serving the public good, we are committed to 
              providing digital accessibility for people with disabilities. 
              We continue to work to improve user experience for everyone while 
              applying relevant accessibility tools and standards. 
          </p>
          <p class="text-xl text-brand-main-text">
              Our site is built with code that is compliant with W3C 
              standards for HTML and CSS. The site displays correctly in 
              current tested browsers using standards compliant with
              HTML/CSS code and should continue to display correctly on 
              future browsers. 
          </p>
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
    <BaseLayoutPageSection bg="transparent">
      <BaseLayoutPageContainer>
        <h2 class="text-2xl font-bold text-brand-primary">Measures to Support Accessibility</h2>
        <div class="space-y-2">
          <p class="text-xl text-brand-main-text">
              Our company takes the following measures to ensure the 
              accessibility of the site:
          </p>
          <ul class="!mt-0 list-disc ml-8 text-xl text-brand-main-text">
              <li class="">Ensures accessibility is part of their continuous improvement process</li>
              <li class="">Employs formal accessibility quality assurance methods</li>
              <li class="">Keeps abreast of the technical and legal aspects of accessibility to the best of their ability</li>
          </ul>
          <p class="text-xl text-brand-main-text">
              As a business, we make every attempt to ensure information 
              concerning our prices, promotions, and events are 
              understandable to all visitors, as well as our hours of 
              operation and location.
          </p>
          <p class="text-xl text-brand-main-text">
              While there are not clearly defined legal requirements for 
              commercial websites serving the public, we have a strong 
              commitment in meeting all visitor needs. If you encounter 
              content or features of the site that are not accessible to 
              those with disabilities, you may contact us using the form 
              below or by emailing us directly at
              <a href="mailto:accessibility@goldengatemanor.com" class="link break-all">accessibility@goldengatemanor.com</a>. 
              Please provide the page and a brief 
              description of the content or functionality where the issue was 
              encountered, along with a suggestion for improvement. We 
              appreciate your feedback and comments as we continue our 
              journey to accommodate all visitors to our site in terms of 
              accessibility.
          </p>
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
    <DeferRender when="visible">
      <BaseLayoutPageSection margin="pDefault" bg="transparent">
        <BaseLayoutPageContainer>
          <div>
            <h2 class="text-2xl font-bold text-brand-primary">Contact Us</h2>
            <div class="space-y-4">
              <p class="text-xl text-brand-main-text">
                  If you wish to report an accessibility issue, have any 
                  questions, or need assistance, please contact us via the 
                  Contact Form below or via email at 
                  <a href="mailto:accessibility@goldengatemanor.com" class="link break-all">
                      accessibility@goldengatemanor.com</a>.
              </p>
              <LazyContactUsForm class="bg-white p-4 md:p-8 rounded-lg md:w-3/4 mx-auto"/>
            </div>
          </div>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'Accessibility Statement',
  breadcrumbLabel: 'Accessibility'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Accessibility Statement',
  ogTitle: 'Accessibility Statement',
  description: 'Golden Gate Manor Inc. is committed to ensuring digital and physical accessibility for individuals with disabilities. Read our full accessibility statement here.',
  ogDescription: 'Golden Gate Manor Inc. is committed to ensuring digital and physical accessibility for individuals with disabilities. Read our full accessibility statement here.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Accessibility Statement',
  twitterDescription: 'Golden Gate Manor Inc. is committed to ensuring digital and physical accessibility for individuals with disabilities. Read our full accessibility statement here.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'AccessibilityPage'
})

</script>

<style>

</style>