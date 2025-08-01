<template>
  <div v-if="authStore.authorized">
    <BaseLayoutPageSection margin="top" bg="transparent" class="min-h-[calc(50vh-2rem)]">
      <BaseLayoutPageContainer>
        <BaseUiAction type="button" class="py-4 px-12 mb-4 group" styling="flex items-center justify-center gap-2" @click="showAddEvent">Add New Event<BaseIcon name="material-symbols:add-diamond" color="text-white" hover-color="group-hover:text-brand-primary" class="transition-colors duration-500 ease-in-out" /></BaseUiAction>
        <div>
          <h2 class="text-2xl text-brand-primary font-bold">Recent Events:</h2>
          <div v-if="eventLoading && events.length === 0" class="my-4 font-extrabold animate-pulse text-2xl">
            <p>
              Loading Events...
            </p>
          </div>
          <div v-else>
            <AdminEvents :events :loading="eventLoading" @events-updated="onEventsUpdated" />
            
            <!-- Load More Button for Active Events -->
            <div v-if="hasMoreActivePages" class="flex justify-center mt-8 lg:w-[75%]">
              <BaseUiAction
                type="button"
                class="py-4 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="loadingMoreActive"
                @click="loadMoreActiveEvents"
              >
                <span v-if="loadingMoreActive">Loading More...</span>
                <span v-else>Load More Events</span>
              </BaseUiAction>
            </div>
            
            <!-- No More Events Message -->
            <div v-else-if="events.length > 0" class="text-center mt-8 text-gray-600 lg:w-[75%]">
              <p>No more events to load</p>
            </div>
          </div>
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
    <BaseLayoutPageSection margin="default" class="min-h-[calc(50vh-2rem)]">
      <BaseLayoutPageContainer>
        <div class="space-y-4">
          <h2 class="text-2xl text-brand-primary font-bold">Archived Events:</h2>
          <div v-if="archiveEventLoading && archivedEvents.length === 0" class="my-4 font-extrabold animate-pulse text-2xl">
            <p>
              Loading Archived Events...
            </p>
          </div>
          <div v-else>
            <AdminEvents :events="archivedEvents" :loading="archiveEventLoading" archived @events-updated="onArchivedEventsUpdated" />
            
            <!-- Load More Button for Archived Events -->
            <div v-if="hasMoreArchivedPages" class="flex justify-center mt-8 lg:w-[75%]">
              <BaseUiAction
                type="button"
                class="py-4 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="loadingMoreArchived"
                @click="loadMoreArchivedEvents"
              >
                <span v-if="loadingMoreArchived">Loading More...</span>
                <span v-else>Load More Archived Events</span>
              </BaseUiAction>
            </div>
            
            <!-- No More Archived Events Message -->
            <div v-else-if="archivedEvents.length > 0" class="text-center mt-8 text-gray-600 lg:w-[75%]">
              <p>No more archived events to load</p>
            </div>
          </div>
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
    <AdminAddEventModal v-model="addEventModal"/>
  </div>
  <div v-else>
    <AdminLogin />
  </div>
</template>

<script lang="ts" setup>
import type { CommunityEventsResponse, EventsData } from '../../../models/EventsData.js';

const authStore = useAuthStore();
definePageMeta({
    layout: 'admin',
})

// Existing states
const eventLoading = ref<boolean>(true)
const archiveEventLoading = ref<boolean>(true)
const events = ref<EventsData>([])
const archivedEvents = ref<EventsData>([])
const addEventModal = ref<boolean>(false)

// New pagination states for active events
const currentActivePage = ref<number>(1)
const activePageSize = 5
const hasMoreActivePages = ref<boolean>(true)
const loadingMoreActive = ref<boolean>(false)

// New pagination states for archived events
const currentArchivedPage = ref<number>(1)
const archivedPageSize = 5
const hasMoreArchivedPages = ref<boolean>(true)
const loadingMoreArchived = ref<boolean>(false)

const fetchEvents = async (): Promise<void> => {
  try {
    eventLoading.value = true;
    const response = await $fetch<CommunityEventsResponse>('/api/events', {
      baseURL: 'https://api.goldengatemanor.com/',
      query: {
        page: 1,
        limit: activePageSize
      }
    })

    events.value = response.data;
    hasMoreActivePages.value = response.pagination.hasNextPage;
    currentActivePage.value = 1;
  } catch (error) {
    console.error('Failed to fetch events:', error)
    events.value = []
    hasMoreActivePages.value = false;
  } finally {
    eventLoading.value = false
  }
}

const fetchArchivedEvents = async (): Promise<void> => {
  try {
    archiveEventLoading.value = true;
    const response = await $fetch<CommunityEventsResponse>('/api/events/archived', {
      baseURL: 'https://api.goldengatemanor.com/',
      query: {
        page: 1,
        limit: archivedPageSize
      }
    })

    archivedEvents.value = response.data;
    hasMoreArchivedPages.value = response.pagination.hasNextPage;
    currentArchivedPage.value = 1;
  } catch (error) {
    console.error('Failed to fetch archived events:', error)
    archivedEvents.value = []
    hasMoreArchivedPages.value = false;
  } finally {
    archiveEventLoading.value = false
  }
}

const loadMoreActiveEvents = async (): Promise<void> => {
  if (loadingMoreActive.value || !hasMoreActivePages.value) return;
  
  try {
    loadingMoreActive.value = true;
    currentActivePage.value++;
    
    const response = await $fetch<CommunityEventsResponse>('/api/events', {
      baseURL: 'https://api.goldengatemanor.com/',
      query: {
        page: currentActivePage.value,
        limit: activePageSize
      }
    })
    
    if (response.data?.length) {
      events.value.push(...response.data);
    }
    
    hasMoreActivePages.value = response.pagination.hasNextPage;
    
    if (response.data.length < activePageSize) {
      hasMoreActivePages.value = false;
    }
  } catch (error) {
    console.error('Failed to load more events:', error);
    currentActivePage.value--;
  } finally {
    loadingMoreActive.value = false;
  }
}

const loadMoreArchivedEvents = async (): Promise<void> => {
  if (loadingMoreArchived.value || !hasMoreArchivedPages.value) return;
  
  try {
    loadingMoreArchived.value = true;
    currentArchivedPage.value++;
    
    const response = await $fetch<CommunityEventsResponse>('/api/events/archived', {
      baseURL: 'https://api.goldengatemanor.com/',
      query: {
        page: currentArchivedPage.value,
        limit: archivedPageSize
      }
    })
    
    if (response.data?.length) {
      archivedEvents.value.push(...response.data);
    }
    
    hasMoreArchivedPages.value = response.pagination.hasNextPage;
    
    if (response.data.length < archivedPageSize) {
      hasMoreArchivedPages.value = false;
    }
  } catch (error) {
    console.error('Failed to load more archived events:', error);
    currentArchivedPage.value--;
  } finally {
    loadingMoreArchived.value = false;
  }
}

const onEventsUpdated = (updatedEvents: EventsData) => {
  events.value = updatedEvents;
}

const onArchivedEventsUpdated = (updatedEvents: EventsData) => {
  archivedEvents.value = updatedEvents;
}

const showAddEvent = () => {
  addEventModal.value = true
}

onMounted(() => {
  fetchEvents()
  fetchArchivedEvents()
})
</script>

<style>

</style>