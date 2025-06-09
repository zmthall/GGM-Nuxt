<template>
    <!-- Top Page -->
    <BaseLayoutPageSection margin="top">
      <BaseLayoutPageContainer class="flex flex-col space-y-4">
        <BaseInteractiveImageCarousel 
          :images />
        <p class="text-xl text-brand-main-text">
          Here at Golden Gate Manor, we're on a mission to enhance
          lives daily. Our commitment to establishing an environment
          that is welcoming and comfortable reflects our core objectives. We
          strive to connect with our community, reaching as many individuals as
          possible to foster independence. This mindset shapes our goals and
          propels us to discover innovative ways to participate within the
          community. As a family-owned business, we deeply value community impact.
        </p>
        <p class="text-xl text-brand-main-text">
          We are proud supporters of local initiatives like CASA and district
          schools. Each year, we're driven to expand our community reach,
          consistently working towards our mission of improving lives. If Golden
          Gate Manor is participating in events explore the upcoming events
          below/reach out for more details. If we aren't currently participating
          in community events during a time when you have an event ongoing, please
          reach out to us to discuss our involvement; we will get back to you with
          our availability as soon as we can.
        </p>
        <BaseUiAction to="/company/contact-us" class="self-center !mt-8 py-6 px-12">Contact Us</BaseUiAction>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
    <!-- Company Events/Community Events -->
    <!-- <section class="community-outreach-top-page page-content section-content">
      <% if(events.upcoming.length !==0) { %>
        <h2 class="section-title">Upcoming Events for Golden Gate Manor, Inc:</h2>
        <% } %>
          <% for(const idx in events.upcoming) { %>
            <div class="event-container">
              <div class="event-left-info">
                <% if(events.upcoming[idx].date.day_end !="" ) { %>
                  <span class="event-from-date event-date"><%- events.upcoming[idx].date.month %> <%-
                        events.upcoming[idx].date.day %></span>
                  <span class="event-to-wrapper">to</span>
                  <span class="event-to-date event-date"><%- events.upcoming[idx].date.month_end %> <%-
                        events.upcoming[idx].date.day_end %></span>
                  <% } else { %>
                    <span class="event-date-month"><%- events.upcoming[idx].date.month %></span>
                    <span class="event-date-day"><%- events.upcoming[idx].date.day %></span>
                    <% } %>
              </div>
              <div class="event-right-info">
                <div class="event-information-wrapper">
                  <div class="event-top-information">
                    <h3 class="event-title"><%- events.upcoming[idx].name %></h3>
                    <p class="event-location-name"><%- events.upcoming[idx].location.name %></p>
                    <p class="event-location-address"><%- events.upcoming[idx].location.address %></p>
                  </div>
                  <div class="event-description-container event-bottom-information">
                    <p class="event-description text-xl text-brand-main-text" data-event-expand-container="<%- idx %>"><%-
                        events.upcoming[idx].description %></p>
                    <button type="button" class="event-button expand-button"
                      data-event-expand-btn="<%- idx %>">more</button>
                  </div>
                </div>
                <div class="event-more-info-button-wrapper">
                  <a href="<%- events.upcoming[idx].url %>" target="_blank" rel="noopener noreferrer nofollow"
                    class="event-more-info-btn cta-button"><span class="read-more-plus">+ </span>More Info</a>
                </div>
              </div>
            </div>
            <% } %>
    </section> -->
</template>

<script setup lang='ts'>
import type { FetchImages } from '../../models/ImagesData';

definePageMeta({
  title: 'Community Outreach and Events',
  breadcrumbLabel: 'Community'
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Community News & Events',
  ogTitle: 'Community News & Events',
  description: 'Follow community news and local events involving Golden Gate Manor Inc., highlighting our commitment to Southern Colorado\'s health and wellness.',
  ogDescription: 'Follow community news and local events involving Golden Gate Manor Inc., highlighting our commitment to Southern Colorado\'s health and wellness.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Community News & Events',
  twitterDescription: 'Follow community news and local events involving Golden Gate Manor Inc., highlighting our commitment to Southern Colorado\'s health and wellness.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
  name: 'CommunityPage'
})

interface CommunityImagesResponse {
  slots: Record<string, {
    id: string;
    src: string;
    alt: string;
  }>
}

const images = ref<FetchImages>([])
const loading = ref(true)

const fetchImages = async (): Promise<void> => {
  try {
    loading.value = true
    const response = await $fetch<CommunityImagesResponse>('/api/media/community-shown', {
      baseURL: 'https://api.goldengatemanor.com'
    })
    
    images.value = Object.entries(response.slots).map(([key, slot]) => ({
      id: key,
      src: slot.src,
      alt: slot.alt
    }))
  } catch (error) {
    console.error('Failed to fetch images:', error)
    images.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchImages()
})
</script>

<style></style>