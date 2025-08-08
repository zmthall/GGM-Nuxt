<template>
  <div>
    <!-- Top Page -->
    <BaseLayoutPageSection margin="pTop">
      <BaseLayoutPageContainer class="flex flex-col space-y-4">
        <BaseInteractiveImageCarousel :images image-selection/>
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

    <!-- Bottom Page -->
    <BaseLayoutPageSection margin="default">
      <BaseLayoutPageContainer>
        <h2 class="text-2xl font-bold text-brand-primary">Upcoming Events for Golden Gate Manor, Inc:</h2>
        <div v-if="eventLoading && events.length === 0" class="my-4 font-extrabold animate-pulse text-2xl">
          <p>
            Loading Events...
          </p>
        </div>
        <div v-else>
          <CommunityEvents :events :loading="eventLoading" />
          
          <!-- Load More Button -->
          <div v-if="hasMorePages" class="flex justify-center mt-8 lg:w-[75%]">
            <BaseUiAction
              type="button"
              class="py-4 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="loadingMore"
              @click="loadMoreEvents"
            >
              <span v-if="loadingMore">Loading More...</span>
              <span v-else>Load More Events</span>
            </BaseUiAction>
          </div>
          
          <!-- No More Events Message -->
          <div v-else-if="events.length > 0" class="text-center mt-8 text-gray-600 lg:w-[75%]">
            <p>No more events to load</p>
          </div>
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
  </div>
</template>

<script setup lang='ts'>
import type { CommunityEventsResponse, EventsData } from '../../models/EventsData.js';
import type { CommunityImagesResponse, FetchImages } from '../../models/ImagesData';

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

// initial states
const images = ref<FetchImages>([])
const events = ref<EventsData>([])
const imageLoading = ref<boolean>(true)
const eventLoading = ref<boolean>(true)

// pagination state
const currentPage = ref<number>(1)
const pageSize = 5
const hasMorePages = ref<boolean>(true)
const loadingMore = ref<boolean>(false)

const fetchImages = async (): Promise<void> => {
  try {
    imageLoading.value = true
    const response = await $fetch<CommunityImagesResponse>('/api/media/community-shown', {
      baseURL: 'https://api.goldengatemanor.com/'
    })
    
    // Filter out null slots and create array of only filled slots
    images.value = Object.entries(response.slots)
      .filter(([_key, slot]) => slot !== null) // Remove null slots
      .map(([key, slot]) => ({
        id: key,
        src: slot.src,
        alt: slot.alt,
        lastUpdated: slot.lastUpdated
      }))
  } catch (error) {
    console.error('Failed to fetch images:', error)
    images.value = []
  } finally {
    imageLoading.value = false
  }
}

// Updated fetchEvents for initial load
const fetchEvents = async (): Promise<void> => {
  try {
    eventLoading.value = true;
        
    const response = await $fetch<CommunityEventsResponse>('/api/events', {
      baseURL: 'https://api.goldengatemanor.com/',
      query: {
        page: 1,
        limit: pageSize
      }
    })

    events.value = response.data;
    hasMorePages.value = response.pagination.hasNextPage;
    currentPage.value = 1;
  } catch (error) {
    console.error('Failed to fetch events:', error)
    events.value = []
    hasMorePages.value = false;
  } finally {
    eventLoading.value = false
  }
}

// New function for loading more events
const loadMoreEvents = async (): Promise<void> => {
  if (loadingMore.value || !hasMorePages.value) return;
  
  try {
    loadingMore.value = true;
    currentPage.value++;
    
    const response = await $fetch<CommunityEventsResponse>('/api/events', {
      baseURL: 'https://api.goldengatemanor.com/',
      query: {
        page: currentPage.value,
        limit: pageSize
      }
    })
    
    if (response.data?.length) {
      events.value.push(...response.data);
    }
    
    // Update hasMorePages based on response or data length
    hasMorePages.value = response.pagination.hasNextPage;
    
    // If we got less than pageSize, we've reached the end
    if (response.data.length < pageSize) {
      hasMorePages.value = false;
    }
  } catch (error) {
    console.error('Failed to load more events:', error);
    currentPage.value--; // Revert page increment on error
  } finally {
    loadingMore.value = false;
  }
}

onMounted(() => {
  fetchImages()
  fetchEvents()
})
</script>

<style></style>