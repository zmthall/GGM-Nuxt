
<template>
  <div v-if="authStore.authorized">
    <BaseLayoutPageSection margin="top" bg="transparent">
      <BaseLayoutPageContainer>
        <BaseUiAction type="button" class="py-4 px-12 mb-12 mt-8 group" styling="flex items-center justify-center gap-2" @click="showAddEvent">Add New Event<BaseIcon name="material-symbols:add-diamond" color="text-white" hover-color="group-hover:text-brand-primary" class="transition-colors duration-500 ease-in-out" /></BaseUiAction>
        <div>
          <h2 class="text-2xl text-brand-primary font-bold">Recent Events:</h2>
          <div v-if="eventLoading" class="my-4 font-extrabold animate-pulse text-2xl">
            <p>
              Loading Events...
            </p>
          </div>
          <AdminEvents v-else :events :loading="eventLoading" />
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
    <BaseLayoutPageSection margin="default">
      <BaseLayoutPageContainer>
        <div class="space-y-4">
          <h2 class="text-2xl text-brand-primary font-bold">Archived Events:</h2>
          <div v-if="archiveEventLoading" class="my-4 font-extrabold animate-pulse text-2xl">
            <p>
              Loading Archived Events...
            </p>
          </div>
          <AdminEvents v-else :events="archivedEvents" :loading="eventLoading" archived />
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
    middleware: ['restricted']
})

const eventLoading = ref<boolean>(true)
const archiveEventLoading = ref<boolean>(true)
const events = ref<EventsData>([])
const archivedEvents = ref<EventsData>([])
const addEventModal = ref<boolean>(false)

const fetchEvents = async (): Promise<void> => {
  try {
    eventLoading.value = true;
    const response = await $fetch<CommunityEventsResponse>('/api/events', {
      baseURL: 'https://api.goldengatemanor.com'
    })

    events.value = response.data;
  } catch (error) {
    console.error('Failed to fetch events:', error)
    events.value = []
  }  finally {
    eventLoading.value = false
  }
}

const fetchArchivedEvents = async (): Promise<void> => {
  try {
    archiveEventLoading.value = true;
    const response = await $fetch<CommunityEventsResponse>('/api/events/archived', {
      baseURL: 'https://api.goldengatemanor.com'
    })

    archivedEvents.value = response.data;
  } catch (error) {
    console.error('Failed to fetch archived events:', error)
    events.value = []
  }  finally {
    archiveEventLoading.value = false
  }
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