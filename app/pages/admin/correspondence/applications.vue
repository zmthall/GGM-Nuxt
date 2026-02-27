<template>
  <div v-if="authStore.authorized">
    <BaseLayoutPageSection margin="top" bg="transparent">
      <BaseLayoutPageContainer>
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
            @change-status="(payload) => updateApplicationStatus(payload, 10, applicationPage, false, queryFilters)"
            @change-tags="(payload) => updateApplicationTags(payload, 10, applicationPage, false, queryFilters)"
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
                  :disabled="!(applications?.some(a => a.status === 'new')) || exportingBulk"
                  @click="exportCurrentPageZip"
                >
                  {{ exportingBulk ? 'Exporting…' : 'Export New ZIP' }}
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

                <button class="bg-red-600 px-2 py-1 text-white rounded-md border border-black hover:bg-red-700" type="button" @click.stop="deleteApplication(application.id, 10, false, queryFilters)">
                  Delete
                </button>
              </div>
            </template>
          </AdminJobApplicationTable>
        </BaseLayoutCard>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
  </div>

  <div v-else>
    <AdminLogin />
  </div>
</template>

<script setup lang="ts">
import type { ApplicationFormData } from '../../../models/Application.js'

const authStore = useAuthStore()

const applicationModalOpen = ref<boolean>(false)
const applicationModalData = ref<ApplicationFormData | null>(null)

const selectedDepartment = ref<string>('all')
const positionSearch = ref<string>('')

const exportingBulk = ref(false)
const downloadingId = ref<string | null>(null)

// If you already have a canonical department list, replace these with yours.
// Otherwise, this is a safe starting point.
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

// Build filters that your API/controller understands.
// Recommended server fields: department + position (full string)
const queryFilters = computed(() => {
  const filters: Record<string, unknown> = {}
  if (selectedDepartment.value && selectedDepartment.value !== 'all') filters.department = selectedDepartment.value
  if (positionSearch.value && positionSearch.value.trim().length > 0) filters.position = positionSearch.value.trim()
  return filters
})

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

// Page nav wrappers (mirror Ride Requests page)
const nextApplicationPage = () => fetchApplications(false, 10, applicationPage.value + 1, false, queryFilters.value)
const prevApplicationPage = () => fetchApplications(false, 10, Math.max(1, applicationPage.value - 1), false, queryFilters.value)
const setApplicationPage = (p: number) => fetchApplications(false, 10, p, false, queryFilters.value)

// Toolbar actions
const applyFilters = async () => {
  await fetchApplications(true, 10, 1, false, queryFilters.value)
}

const clearFilters = async () => {
  selectedDepartment.value = 'all'
  positionSearch.value = ''
  await fetchApplications(true, 10, 1, false, {})
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

defineOptions({
  name: 'AdminApplicationsPage'
})

definePageMeta({
  layout: 'admin'
})

onMounted(async () => {
  const { $getFirebase } = useNuxtApp()
  await $getFirebase()

  if (!(useAuthStore().isFirebaseReady && useAuthStore().authorized)) {
    await new Promise<void>((resolve) => {
      const stop = watch(
        () => useAuthStore().isFirebaseReady && useAuthStore().authorized,
        (ok) => { if (ok) { stop(); resolve(); } }
      )
    })
  }

  await Promise.allSettled([
    fetchApplications(true, 10, applicationPage.value, false, queryFilters.value),
  ])
})
</script>

<style></style>