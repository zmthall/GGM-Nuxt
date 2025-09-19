<template>
    <div v-if="authStore.authorized">
        <BaseLayoutPageSection margin="top" bg="transparent">
            <BaseLayoutPageContainer>
                <h2 class="text-2xl font-bold text-brand-primary mb-4">Message Correspondence</h2>
                <BaseLayoutCard :centered="false" class="w-full mx-auto" :has-padding="false">
                    <h2 class="bg-brand-primary pl-2 py-2 text-white">Received Ride Requests</h2>
                    <AdminRideRequestFormTable
                        v-model="rideModalOpen"
                        v-model:data="rideRequestModalData"
                        :loading="loadingRideRequests" 
                        :ride-requests="rideRequests" 
                        :pagination="rideRequestsPagination" 
                        :has-toolbar="false" 
                        :ride-request-modal-data="rideRequestModalData"
                        @change-status="(payload) => updateRideStatus(payload, 3)"
                        @change-tags="(payload) => updateRideTags(payload, 3)"
                        @export-pdf="exportRidePDF"
                        @prev-page="fetchRideRequests(false, 3, --requestPage)"
                        @next-page="fetchRideRequests(false, 3, ++requestPage)"
                        @page-change="(requestPage) => fetchRideRequests(false, 3, requestPage)"
                    >
                        <template #actions="{ rideRequest }">
                            <div class="inline-flex items-center gap-2">
                                <button class="bg-red-600 px-2 py-1 text-white rounded-md border border-black hover:bg-red-700" @click="deleteRideRequest(rideRequest.id, 3)">Delete</button>
                                <button class="bg-blue-600 px-2 py-1 text-white rounded-md border border-black hover:bg-blue-700 group flex items-center gap-2" @click="exportRidePDF(rideRequest)">Export<BaseIcon name="fa6-solid:file-pdf" size="size-4" color="text-white" /></button>
                                <button class="bg-blue-600 px-2 py-1 text-white rounded-md border border-black hover:bg-blue-700 w-max" @click="openRideRequestModal(rideRequest)">Open Request</button>
                            </div>
                        </template>            
                    </AdminRideRequestFormTable>
                </BaseLayoutCard>
            </BaseLayoutPageContainer>
            <BaseLayoutPageContainer class="mt-8">
                <BaseLayoutCard :centered="false" class="w-full mx-auto" :has-padding="false">
                    <h2 class="bg-brand-primary pl-2 py-2 text-white">Received Contact Messages</h2>
                    <AdminContactFormTable 
                        v-model="contactModalOpen"
                        v-model:data="contactMessageModalData"
                        :loading="loadingContactMessages" 
                        :contact-messages="contactMessages" 
                        :pagination="contactMessagesPagination" 
                        :has-toolbar="false" 
                        @change-status="(payload) => updateContactStatus(payload, 3)"
                        @change-tags="(payload) => updateContactTags(payload, 3)"
                        @export-pdf="exportContactPDF"
                        @prev-page="fetchContactMessages(false, 3, --contactPage)"
                        @next-page="fetchContactMessages(false, 3, ++contactPage)"
                        @page-change="(contactPage) => fetchContactMessages(false, 3, contactPage)"
                    >
                        <template #actions="{ contactMessage }">
                            <div class="inline-flex items-center gap-2">
                                <button class="bg-red-600 px-2 py-1 text-white rounded-md border border-black hover:bg-red-700" @click="deleteContactMessage(contactMessage.id, 3)">Delete</button>
                                <button class="bg-blue-600 px-2 py-1 text-white rounded-md border border-black hover:bg-blue-700 group flex items-center gap-2" @click="exportContactPDF(contactMessage)">Export<BaseIcon name="fa6-solid:file-pdf" size="size-4" color="text-white" /></button>
                                <button class="bg-blue-600 px-2 py-1 text-white rounded-md border border-black hover:bg-blue-700 w-max" @click="openContactModal(contactMessage)">Open Message</button>
                            </div>
                        </template>            
                    </AdminContactFormTable>
                </BaseLayoutCard>
                <div class="flex justify-center mt-8">
                    <BaseUiAction to="/admin/correspondence" class="py-2 px-4">View Correspondence</BaseUiAction>
                </div>
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>
        <BaseLayoutPageSection bg="default" margin="default">
            <BaseLayoutPageContainer>
                <h2 class="text-2xl font-bold text-brand-primary mb-4">Community Events Images</h2>
                <BaseInteractiveImageCarousel :images image-selection/>
                <div class="flex justify-center mt-8">
                    <BaseUiAction to="/admin/community" class="py-2 px-4">Edit Community Images</BaseUiAction>
                </div>
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>
        <BaseLayoutPageSection bg="transparent" margin="default">
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
                    <div class="flex justify-center mt-8 lg:w-[75%] gap-2">
                        <BaseUiAction
                        v-if="hasMorePages"
                        type="button"
                        class="py-4 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                        :disabled="loadingMore"
                        @click="loadMoreEvents"
                        >
                        <span v-if="loadingMore">Loading More...</span>
                        <span v-else>Load More Events</span>
                        </BaseUiAction>
                        <BaseUiAction class="py-4 px-8" to="/admin/events">Edit Events</BaseUiAction>
                    </div>
                </div>
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>
    </div>
    <div v-else>
        <AdminLogin />
    </div>
</template>

<script setup lang='ts'>
import type { ContactFormData } from '../../models/admin/ContactForm.js';
import type { RideRequestFormData } from '../../models/admin/RideRequestForm.js';
import type { CommunityEventsResponse, EventsData } from '../../models/EventsData.js';
import type { CommunityImagesResponse, FetchImages } from '../../models/ImagesData.js';

const rideModalOpen = ref<boolean>(false);
const rideRequestModalData = ref<RideRequestFormData | null>(null)
const contactModalOpen = ref<boolean>(false);
const contactMessageModalData = ref<ContactFormData | null>(null)

const openRideRequestModal = (rideRequest: RideRequestFormData) => {
    rideModalOpen.value = true;
    rideRequestModalData.value = rideRequest;
}

const openContactModal = (contactMessage: ContactFormData) => {
    contactModalOpen.value = true;
    contactMessageModalData.value = contactMessage;
}

const {
    fetchRideRequests,
    updateRideStatus,
    updateRideTags,
    exportRidePDF,
    deleteRideRequest,
    rideRequests,
    loadingRideRequests,
    rideRequestsPagination,
    requestPage
} = useRideRequests();

const { 
    fetchContactMessages, 
    updateContactStatus, 
    updateContactTags, 
    exportContactPDF,
    deleteContactMessage,
    contactPage,
    contactMessages,
    contactMessagesPagination,
    loadingContactMessages
} = useContactMessages();

const events = ref<EventsData>([])
const eventLoading = ref<boolean>(true)
const currentPage = ref<number>(1)
const pageSize = 5
const hasMorePages = ref<boolean>(true)
const loadingMore = ref<boolean>(false)

const images = ref<FetchImages>([])
const imageLoading = ref<boolean>(true)

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

definePageMeta({
    layout: 'admin',
})

defineOptions({
    name: 'AdminDashboard'
})

// Updated test function using auth store
const authStore = useAuthStore();

onMounted(() => {
    fetchRideRequests(true, 3);
    fetchContactMessages(true, 3);
    fetchImages();
    fetchEvents();
})

</script>

<style></style>