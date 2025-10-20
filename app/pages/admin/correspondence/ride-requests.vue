<template>
    <div v-if="authStore.authorized">
        <BaseLayoutPageSection margin="top" bg="transparent">
            <BaseLayoutPageContainer>
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
                        @change-status="(payload) => updateRideStatus(payload, 10, requestPage, false)"
                        @change-tags="(payload) => updateRideTags(payload, 10, requestPage, false)"
                        @export-pdf="exportRidePDF"
                        @prev-page="prevRidePage"
                        @next-page="nextRidePage"
                        @page-change="setRidePage"
                    >
                        <template #actions="{ rideRequest }">
                            <div class="inline-flex items-center gap-2">
                                <button class="bg-red-600 px-2 py-1 text-white rounded-md border border-black hover:bg-red-700" @click="deleteRideRequest(rideRequest.id, 10, false)">Delete</button>
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
import type { RideRequestFormData } from '../../../models/admin/RideRequestForm.js';

const rideModalOpen = ref<boolean>(false);
const rideRequestModalData = ref<RideRequestFormData | null>(null)

const nextRidePage = () => fetchRideRequests(false, 10, requestPage.value + 1, false)
const prevRidePage = () => fetchRideRequests(false, 10, Math.max(1, requestPage.value - 1), false)
const setRidePage  = (p: number) => fetchRideRequests(false, 10, p, false)

const openRideRequestModal = (rideRequest: RideRequestFormData) => {
    rideModalOpen.value = true;
    rideRequestModalData.value = rideRequest;
}

const authStore = useAuthStore();
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
    fetchRideRequests(true, 10, requestPage.value, false),
  ])
})
</script>

<style></style>