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
                        @change-status="(payload) => updateRideStatus(payload, 3, requestPage)"
                        @change-tags="(payload) => updateRideTags(payload, 3, requestPage)"
                        @export-pdf="exportRidePDF"
                        @prev-page="prevRidePage"
                        @next-page="nextRidePage"
                        @page-change="setRidePage"
                    >
                        <template #actions="{ rideRequest }">
                            <div class="inline-flex items-center gap-2">
                                <button v-if="authStore.role !== 'correspondence'" class="bg-red-600 px-2 py-1 text-white rounded-md border border-black hover:bg-red-700" @click.stop="deleteRideRequest(rideRequest.id, 3)">Delete</button>
                                <button class="bg-blue-600 px-2 py-1 text-white rounded-md border border-black hover:bg-blue-700 group flex items-center gap-2" @click.stop="exportRidePDF(rideRequest)">Export<BaseIcon name="fa6-solid:file-pdf" size="size-4" color="text-white" /></button>
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
                        @change-status="(payload) => updateContactStatus(payload, 3, contactPage)"
                        @change-tags="(payload) => updateContactTags(payload, 3, contactPage)"
                        @export-pdf="exportContactPDF"
                        @prev-page="prevContactPage"
                        @next-page="nextContactPage"
                        @page-change="setContactPage"
                    >
                        <template #actions="{ contactMessage }">
                            <div class="inline-flex items-center gap-2">
                                <button v-if="authStore.role !== 'correspondence'" class="bg-red-600 px-2 py-1 text-white rounded-md border border-black hover:bg-red-700" @click.stop="deleteContactMessage(contactMessage.id, 3)">Delete</button>
                                <button class="bg-blue-600 px-2 py-1 text-white rounded-md border border-black hover:bg-blue-700 group flex items-center gap-2" @click.stop="exportContactPDF(contactMessage)">Export<BaseIcon name="fa6-solid:file-pdf" size="size-4" color="text-white" /></button>
                            </div>
                        </template>            
                    </AdminContactFormTable>
                </BaseLayoutCard>
                
            </BaseLayoutPageContainer>
            <BaseLayoutPageContainer class="mt-8">
                <h2 class="text-2xl font-bold text-brand-primary mb-4">Application Submissions</h2>
                <BaseLayoutCard :centered="false" class="w-full mx-auto" :has-padding="false">
                  <h2 class="bg-brand-primary pl-2 py-2 text-white">Received Job Applications</h2>

                  <AdminJobApplicationTable
                    v-model="applicationModalOpen"
                    v-model:data="applicationModalData"
                    :loading="loadingApplications"
                    :applications="applications"
                    :pagination="applicationsPagination"
                    :has-toolbar="true"
                    :application-modal-data="applicationModalData"
                    @change-status="(payload) => updateApplicationStatus(payload, 3, applicationPage, false, queryFilters)"
                    @change-tags="(payload) => updateApplicationTags(payload, 3, applicationPage, false, queryFilters)"
                    @prev-page="prevApplicationPage"
                    @next-page="nextApplicationPage"
                    @page-change="setApplicationPage"
                    @export-pdf="(id) => downloadPacket(id)"
                  >
                    <template #toolbar>
                      <div class="flex items-center gap-3">
                        <div class="w-56">
                          <BaseFormSelect
                            v-model="selectedDepartment"
                            name="department"
                            label="Department"
                            :labels="departmentLabels"
                            :values="departmentValues"
                            :no-label="true"
                          />
                        </div>

                        <div class="w-72">
                          <BaseFormInput
                            v-model="positionSearch"
                            name="position"
                            type="text"
                            placeholder="ex: city_cab-driver"
                          />
                        </div>

                        <button class="rounded-md bg-white px-3 py-2 text-sm font-medium text-brand-primary hover:brightness-95" type="button" @click="applyFilters">
                          Apply
                        </button>

                        <button class="rounded-md border border-white/40 px-3 py-2 text-sm font-medium text-white hover:bg-white/10" type="button" @click="clearFilters">
                          Clear
                        </button>

                        <button
                          class="rounded-md bg-white px-3 py-2 text-sm font-medium text-brand-primary hover:brightness-95 disabled:opacity-60 disabled:cursor-not-allowed"
                          type="button"
                          :disabled="!applications?.length || exportingBulk"
                          @click="exportCurrentPageZip"
                        >
                          {{ exportingBulk ? 'Exporting…' : 'Export Page ZIP' }}
                        </button>
                      </div>
                    </template>

                    <template #actions="{ application }">
                      <div class="inline-flex items-center gap-2">
                        <button
                          class="bg-brand-primary px-2 py-1 text-white rounded-md border border-black hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
                          type="button"
                          :disabled="downloadingId === application.id"
                          @click.stop="downloadPacket(application.id)"
                        >
                          {{ downloadingId === application.id ? 'Downloading…' : 'Export' }}
                        </button>

                        <button v-if="authStore.role !== 'correspondence'" class="bg-red-600 px-2 py-1 text-white rounded-md border border-black hover:bg-red-700" type="button" @click.stop="deleteApplication(application.id, 10, false, queryFilters)">
                          Delete
                        </button>
                      </div>
                    </template>
                  </AdminJobApplicationTable>
                </BaseLayoutCard>
                <div class="flex justify-center mt-8">
                    <BaseUiAction to="/admin/correspondence" class="py-2 px-4">View All Correspondence</BaseUiAction>
                </div>
              </BaseLayoutPageContainer>
        </BaseLayoutPageSection>
        <BaseLayoutPageSection v-if="authStore.role !== 'correspondence'" bg="default" margin="default">
            <BaseLayoutPageContainer>
                <h2 class="text-2xl font-bold text-brand-primary mb-4">Community Events Images</h2>
                <CommunityImageCarousel />
                <div class="flex justify-center mt-8">
                    <BaseUiAction to="/admin/community" class="py-2 px-4">Edit Community Images</BaseUiAction>
                </div>
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>
        <BaseLayoutPageSection v-if="authStore.role !== 'correspondence'" bg="transparent" margin="default">
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
import type { ApplicationFormData } from '../../models/Application.js';
import type { CommunityEventsResponse, EventsData } from '../../models/EventsData.js';
import type { WatchStopHandle } from 'vue'

const departmentLabels = [
  'All Departments',
  'City Cab',
  'Transportation (GGMT)',
  'Assisted Living (ACF)',
  'Medical Supply',
  'Gas Station',
  'General'
]

const departmentValues = [
  'all',
  'city_cab',
  'ggmt',
  'acf',
  'medical_supply',
  'gas_station',
  'general'
]

const rideModalOpen = ref<boolean>(false);
const rideRequestModalData = ref<RideRequestFormData | null>(null)
const contactModalOpen = ref<boolean>(false);
const contactMessageModalData = ref<ContactFormData | null>(null)
const applicationModalOpen = ref<boolean>(false)
const applicationModalData = ref<ApplicationFormData | null>(null)

const selectedDepartment = ref<string>('all')
const positionSearch = ref<string>('')
const exportingBulk = ref(false)
const downloadingId = ref<string | null>(null)

const queryFilters = computed(() => {
  const filters: Record<string, unknown> = {}
  if (selectedDepartment.value && selectedDepartment.value !== 'all') filters.department = selectedDepartment.value
  if (positionSearch.value && positionSearch.value.trim().length > 0) filters.position = positionSearch.value.trim()
  return filters
})

const nextRidePage = () => fetchRideRequests(false, 3, requestPage.value + 1)
const prevRidePage = () => fetchRideRequests(false, 3, Math.max(1, requestPage.value - 1))
const setRidePage  = (p: number) => fetchRideRequests(false, 3, p)

const nextContactPage = () => fetchContactMessages(false, 3, contactPage.value + 1)
const prevContactPage = () => fetchContactMessages(false, 3, Math.max(1, contactPage.value - 1))
const setContactPage  = (p: number) => fetchContactMessages(false, 3, p)

const nextApplicationPage = () => fetchApplications(false, 3, applicationPage.value + 1, false, queryFilters.value)
const prevApplicationPage = () => fetchApplications(false, 3, Math.max(1, applicationPage.value - 1), false, queryFilters.value)
const setApplicationPage = (p: number) => fetchApplications(false, 3, p, false, queryFilters.value)

// Toolbar actions
const applyFilters = async () => {
  await fetchApplications(true, 3, 1, false, queryFilters.value)
}

const clearFilters = async () => {
  selectedDepartment.value = 'all'
  positionSearch.value = ''
  await fetchApplications(true, 3, 1, false, {})
}

// Export actions (via composable)
const downloadPacket = async (id: string) => {
  downloadingId.value = id
  try {
    await downloadPacketById(id)
  } finally {
    downloadingId.value = null
  }
}

const exportCurrentPageZip = async () => {
  exportingBulk.value = true
  try {
    const ids = (applications.value || []).map(a => a.id).filter(Boolean)
    if (!ids.length) return
    await downloadBulkPackets(ids)
  } finally {
    exportingBulk.value = false
  }
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

const {
  fetchApplications,
  updateApplicationStatus,
  updateApplicationTags,
  deleteApplication,
  downloadPacketById,
  downloadBulkPackets,
  applications,
  loadingApplications,
  applicationsPagination,
  applicationPage
} = useJobApplications()

const events = ref<EventsData>([])
const eventLoading = ref<boolean>(true)
const currentPage = ref<number>(1)
const pageSize = 5
const hasMorePages = ref<boolean>(true)
const loadingMore = ref<boolean>(false)

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
    breadcrumb: false,
})

defineOptions({
    name: 'AdminDashboard'
})

// Updated test function using auth store
const authStore = useAuthStore();

onMounted(async () => {
  const { $getFirebase } = useNuxtApp()
  await $getFirebase()

  if (authStore.isFirebaseReady && authStore.authorized) {
    await Promise.allSettled([
      fetchRideRequests(true, 3, requestPage.value),
      fetchContactMessages(true, 3, contactPage.value),
      fetchApplications(true, 3, applicationPage.value, false, queryFilters.value),
      fetchEvents(),
    ])

    return
  }

  const stop: WatchStopHandle = watch(
    () => authStore.isFirebaseReady && authStore.authorized,
    async ok => {
      if (!ok) return
      stop()
      await Promise.allSettled([
        fetchRideRequests(true, 3, requestPage.value),
        fetchContactMessages(true, 3, contactPage.value),
        fetchApplications(true, 10, applicationPage.value, false, queryFilters.value),
        fetchEvents(),
      ])
    },
    { immediate: false }
  )
})
</script>

<style></style>