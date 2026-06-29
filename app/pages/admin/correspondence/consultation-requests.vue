<template>
  <div v-if="authStore.authorized">
    <BaseLayoutPageSection margin="top" bg="transparent">
      <BaseLayoutPageContainer class="mt-8">
        <BaseLayoutCard :centered="false" class="w-full mx-auto" :has-padding="false">
          <h2 class="bg-brand-primary pl-2 py-2 text-white">Received Consultation Requests</h2>
          <AdminConsultationRequestFormTable
            v-model="consultationModalOpen"
            v-model:data="consultationRequestModalData"
            :loading="loadingConsultationRequests"
            :consultation-requests="consultationRequests"
            :pagination="consultationRequestsPagination"
            @change-status="(payload) => updateConsultationStatus(payload, 3, consultationRequestPage)"
            @change-tags="(payload) => updateConsultationTags(payload, 3, consultationRequestPage)"
            @export-pdf="exportConsultationPDF"
            @prev-page="prevConsultationPage"
            @next-page="nextConsultationPage"
            @page-change="setConsultationPage"
          >
            <template #actions="{ consultationRequest }">
                      <div class="inline-flex items-center gap-2">
                          <button v-if="authStore.role !== 'correspondence'" class="bg-red-600 px-2 py-1 text-white rounded-md border border-black hover:bg-red-700" @click.stop="deleteConsultationRequest(consultationRequest.id, 3)">Delete</button>
                          <button class="bg-blue-600 px-2 py-1 text-white rounded-md border border-black hover:bg-blue-700 group flex items-center gap-2" @click.stop="exportConsultationPDF(consultationRequest)">Export<BaseIcon name="fa6-solid:file-pdf" size="size-4" color="text-white" /></button>
                      </div>
                  </template>   
          </AdminConsultationRequestFormTable>
        </BaseLayoutCard>
        <div class="flex justify-center mt-8">
            <BaseUiAction to="/admin/correspondence/consultation-requests" class="py-2 px-4">View Consultation Requests</BaseUiAction>
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
  </div>
  <div v-else>
    <AdminLogin />
  </div>
</template>

<script lang="ts" setup>
import type { ConsultationRequestFormData } from '~/models/admin/ConsultationForm';

definePageMeta({
  layout: 'admin',
  breadcrumbOverrides: [
    { label: 'Dashboard', to: '/admin' },
    false,
    undefined,
    undefined
  ]
})

const authStore = useAuthStore()

const consultationModalOpen = ref<boolean>(false);
const consultationRequestModalData = ref<ConsultationRequestFormData | null>(null)

const nextConsultationPage = () => fetchConsultationRequests(false, 10, consultationRequestPage.value + 1)
const prevConsultationPage = () => fetchConsultationRequests(false, 10, Math.max(1, consultationRequestPage.value - 1))
const setConsultationPage  = (page: number) => fetchConsultationRequests(false, 10, page)

const {
    fetchConsultationRequests,
    updateConsultationStatus,
    updateConsultationTags,
    deleteConsultationRequest,
    exportConsultationPDF,
    consultationRequests,
    consultationRequestsPagination,
    loadingConsultationRequests,
    consultationRequestPage
} = useConsultationRequests();


defineOptions({
    name: 'AdminConsultationRequestsPage'
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
    fetchConsultationRequests(true, 10, consultationRequestPage.value, false),
  ])
})
</script>

<style>

</style>