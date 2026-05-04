<template>
  <div>
    <!-- Top Page -->
    <BaseLayoutPageSection margin="pTop">
      <BaseLayoutPageContainer class="flex flex-col space-y-4">
        <CommunityImageCarousel :images image-selection />
        <p v-for="paragraph in $tm('news.community.paragraph')" :key="paragraph" class="text-xl text-brand-main-text">
          {{ $rt(paragraph) }}
        </p>
        <BaseUiAction :to="$localePath('/company/contact-us')" class="self-center !mt-8 py-6 px-12">{{ $t('news.community.button')}}</BaseUiAction>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>

    <!-- Bottom Page -->
    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" class="cv-auto">
        <BaseLayoutPageContainer>
          <h2 class="text-2xl font-bold text-brand-primary">{{ $t('news.community.events.title') }}</h2>
          <div v-if="eventLoading && events.length === 0" class="my-4 font-extrabold animate-pulse text-2xl">
            <p>
              {{ $t('news.community.events.loading') }}
            </p>
          </div>
          <div v-else>
            <LazyCommunityEvents :events :loading="eventLoading" />
            
            <!-- Load More Button -->
            <div v-if="hasMorePages" class="flex justify-center mt-8 lg:w-[75%]">
              <BaseUiAction
                type="button"
                class="py-4 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="loadingMore"
                @click="loadMoreEvents"
              >
                <span v-if="loadingMore">{{ $t('news.community.events.loading-more') }}</span>
                <span v-else>{{ $t('news.community.events.load-more') }}</span>
              </BaseUiAction>
            </div>
            
            <!-- No More Events Message -->
            <div v-else-if="events.length > 0" class="text-center mt-8 text-gray-600 lg:w-[75%]">
              <p>{{ $t('news.community.events.no-more-events') }}</p>
            </div>
          </div>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>
  </div>
</template>

<script setup lang='ts'>
import type { CommunityEventsResponse, EventsData } from '../../models/EventsData';
import type { CommunityImagesResponse, FetchImages } from '../../models/ImagesData';

definePageMeta({
  title: 'Community Outreach and Events',
  breadcrumbLabel: 'Community',
  breadcrumbOverrides: [
    undefined,
    false,
    undefined
  ]
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
      baseURL: useRuntimeConfig().public.useLocalApi  ? 'http://127.0.0.1:4000' : 'https://api.goldengatemanor.com',
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
      baseURL: useRuntimeConfig().public.useLocalApi  ? 'http://127.0.0.1:4000' : 'https://api.goldengatemanor.com',
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
      baseURL: useRuntimeConfig().public.useLocalApi  ? 'http://127.0.0.1:4000' : 'https://api.goldengatemanor.com',
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