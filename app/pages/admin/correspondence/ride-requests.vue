<template>
    <div v-if="authStore.authorized">
        <BaseLayoutPageSection margin="top" bg="transparent">
            <BaseLayoutPageContainer>
                <BaseLayoutCard :centered="false" class="w-full mx-auto" :has-padding="false">
                    <h2 class="bg-brand-primary pl-2 py-2 text-white">Received Ride Requests</h2>
                    <AdminRideRequestFormTable
                        :loading="loadingRideRequests" 
                        :ride-requests="rideRequests" 
                        :pagination="rideRequestsPagination" 
                        :has-toolbar="false" 

                        @prev-page="fetchRideRequests(false, --requestPage)"
                        @next-page="fetchRideRequests(false, ++requestPage)"
                        @page-change="(p) => { requestPage = p; fetchRideRequests(false, requestPage)}"
                    >
                        <template #actions="{ rideRequest }">
                            <div class="inline-flex items-center gap-2">
                                <button class="bg-red-600 px-2 py-1 text-white rounded-md border border-black hover:bg-red-700" @click="console.log(rideRequest.id)">Delete</button>
                                <button class="bg-blue-600 px-2 py-1 text-white rounded-md border border-black hover:bg-blue-700 group flex items-center gap-2" @click="console.log(rideRequest.id)">Export<BaseIcon name="fa6-solid:file-pdf" size="size-4" color="text-white" /></button>
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

const authStore = useAuthStore();
const {
    fetchRideRequests,
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
    fetchRideRequests();
});
</script>

<style></style>