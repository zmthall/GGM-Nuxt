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
                        @prev-page="fetchContactMessages(false, 5, --contactPage)"
                        @next-page="fetchContactMessages(false, 5, ++contactPage)"
                        @page-change="(contactPage) => { fetchContactMessages(false, 5, contactPage)}"
                    >
                        <template #actions="{ contactMessage }">
                            <div class="inline-flex items-center gap-2">
                                <button class="bg-red-600 px-2 py-1 text-white rounded-md border border-black hover:bg-red-700" @click="deleteContactMessage(contactMessage.id)">Delete</button>
                                <button class="bg-blue-600 px-2 py-1 text-white rounded-md border border-black hover:bg-blue-700 group flex items-center gap-2" @click="exportContactPDF(contactMessage)">Export<BaseIcon name="fa6-solid:file-pdf" size="size-4" color="text-white" /></button>
                                <button class="bg-blue-600 px-2 py-1 text-white rounded-md border border-black hover:bg-blue-700 w-max" @click="openContactModal(contactMessage)">Open Message</button>
                            </div>
                        </template>            
                    </AdminContactFormTable>
                </BaseLayoutCard>
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
                        @prev-page="fetchRideRequests(false, 5, --requestPage)"
                        @next-page="fetchRideRequests(false, 5, ++requestPage)"
                        @page-change="(requestPage) => fetchRideRequests(false, 5, requestPage)"
                    >
                        <template #actions="{ rideRequest }">
                            <div class="inline-flex items-center gap-2">
                                <button class="bg-red-600 px-2 py-1 text-white rounded-md border border-black hover:bg-red-700" @click="deleteRideRequest(rideRequest.id)">Delete</button>
                                <button class="bg-blue-600 px-2 py-1 text-white rounded-md border border-black hover:bg-blue-700 group flex items-center gap-2" @click="exportRidePDF(rideRequest)">Export<BaseIcon name="fa6-solid:file-pdf" size="size-4" color="text-white" /></button>
                                <button class="bg-blue-600 px-2 py-1 text-white rounded-md border border-black hover:bg-blue-700 w-max" @click="openRideRequestModal(rideRequest)">Open Request</button>
                            </div>
                        </template>            
                    </AdminRideRequestFormTable>
                </BaseLayoutCard>
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

const openRideRequestModal = (rideRequest: RideRequestFormData) => {
    rideModalOpen.value = true;
    rideRequestModalData.value = rideRequest;
}

const openContactModal = (contactMessage: ContactFormData) => {
    contactModalOpen.value = true;
    contactMessageModalData.value = contactMessage;
}

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

onMounted(() => {
    fetchContactMessages();
    fetchRideRequests()
});
</script>