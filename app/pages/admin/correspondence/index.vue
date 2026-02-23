<template>
    <div v-if="authStore.authorized">
        <BaseLayoutPageSection margin="top" bg="transparent">
            <BaseLayoutPageContainer>
                <BaseLayoutCard :centered="false" class="w-full mx-auto" :has-padding="false">
                    <h2 class="bg-brand-primary pl-2 py-2 text-white">Received Contact Messages</h2>
                    <AdminContactFormTable 
                        v-model="contactModalOpen"
                        v-model:data="contactMessageModalData"
                        :loading="loadingContactMessages" 
                        :contact-messages="contactMessages" 
                        :pagination="contactMessagesPagination" 
                        :has-toolbar="false" 
                        @change-status="updateContactStatus"
                        @change-tags="updateContactTags"
                        @export-pdf="exportContactPDF"
                        @prev-page="prevContactPage"
                        @next-page="nextContactPage"
                        @page-change="setContactPage"
                    >
                        <template #actions="{ contactMessage }">
                            <div class="inline-flex items-center gap-2">
                                <button class="bg-red-600 px-2 py-1 text-white rounded-md border border-black hover:bg-red-700" @click.stop="deleteContactMessage(contactMessage.id)">Delete</button>
                                <button class="bg-blue-600 px-2 py-1 text-white rounded-md border border-black hover:bg-blue-700 group flex items-center gap-2" @click.stop="exportContactPDF(contactMessage)">Export<BaseIcon name="fa6-solid:file-pdf" size="size-4" color="text-white" /></button>
                            </div>
                        </template>            
                    </AdminContactFormTable>
                </BaseLayoutCard>
                <div class="mt-4 flex justify-center">
                    <BaseUiAction to="/admin/correspondence/messages" class="py-2 px-3">View Messages</BaseUiAction>
                </div>
            </BaseLayoutPageContainer>
            <BaseLayoutPageContainer class="mt-8">
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
                        @change-status="updateRideStatus"
                        @change-tags="updateRideTags"
                        @export-pdf="exportRidePDF"
                        @prev-page="prevRidePage"
                        @next-page="nextRidePage"
                        @page-change="setRidePage"
                    >
                        <template #actions="{ rideRequest }">
                            <div class="inline-flex items-center gap-2">
                                <button class="bg-red-600 px-2 py-1 text-white rounded-md border border-black hover:bg-red-700" @click.stop="deleteRideRequest(rideRequest.id)">Delete</button>
                                <button class="bg-blue-600 px-2 py-1 text-white rounded-md border border-black hover:bg-blue-700 group flex items-center gap-2" @click.stop="exportRidePDF(rideRequest)">Export<BaseIcon name="fa6-solid:file-pdf" size="size-4" color="text-white" /></button>
                            </div>
                        </template>            
                    </AdminRideRequestFormTable>
                </BaseLayoutCard>
                <div class="mt-4 flex justify-center">
                    <BaseUiAction to="/admin/correspondence/ride-requests" class="py-2 px-3">View Ride Requests</BaseUiAction>
                </div>
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>
    </div>
    <div v-else>
        <AdminLogin />
    </div>
</template>

<script setup lang='ts'>
import type { ContactFormData } from '../../../models/admin/ContactForm.js';
import type { RideRequestFormData } from '../../../models/admin/RideRequestForm';

const rideModalOpen = ref<boolean>(false);
const rideRequestModalData = ref<RideRequestFormData | null>(null)
const contactModalOpen = ref<boolean>(false);
const contactMessageModalData = ref<ContactFormData | null>(null)

const nextRidePage = () => fetchRideRequests(false, 5, requestPage.value + 1)
const prevRidePage = () => fetchRideRequests(false, 5, Math.max(1, requestPage.value - 1))
const setRidePage  = (p: number) => fetchRideRequests(false, 5, p)

const nextContactPage = () => fetchContactMessages(false, 5, contactPage.value + 1)
const prevContactPage = () => fetchContactMessages(false, 5, Math.max(1, contactPage.value - 1))
const setContactPage  = (p: number) => fetchContactMessages(false, 5, p)

const authStore = useAuthStore();
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

defineOptions({
    name: 'AdminMessagesPage'
});

definePageMeta({
    layout: 'admin',
});

onMounted(async () => {
  const { $getFirebase } = useNuxtApp()
  await $getFirebase() // ensure Firebase init

  // wait until auth is actually ready and logged in
  if (!(useAuthStore().isFirebaseReady && useAuthStore().authorized)) {
    await new Promise<void>((resolve) => {
      const stop = watch(
        () => useAuthStore().isFirebaseReady && useAuthStore().authorized,
        (ok) => { if (ok) { stop(); resolve() } }
      )
    })
  }

  // call exactly what this page needs (one time)
  // e.g. Dashboard:
  await Promise.allSettled([
    fetchContactMessages(true, 5, contactPage.value),
    fetchRideRequests(true, 5, requestPage.value),
  ])
})
</script>