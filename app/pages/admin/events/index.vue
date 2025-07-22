
<template>
  <div v-if="authStore.authorized">
    <BaseLayoutPageSection margin="top" bg="transparent">
      <BaseLayoutPageContainer>
        <div>
          <h2>Current Events:</h2>
          <div v-if="eventLoading" class="my-4 font-extrabold animate-pulse text-2xl">
            <p>
              Loading Events...
            </p>
          </div>
          <AdminEvents v-else :events :loading="eventLoading" />
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
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
const events = ref<EventsData>([])

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

onMounted(() => {
  fetchEvents()
})

</script>

<style>

</style>