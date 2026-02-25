import type { ApplicationFormData, ApplicationRequestStatus } from '~/models/Application'
import type { Pagination } from '~/models/Pagination'

type ListResponse = { success: boolean; data: ApplicationFormData[]; pagination: Pagination }
type OkResponse = { success: boolean }

type Filters = Record<string, unknown>

export const useJobApplications = () => {
  if (import.meta.server) {
    // Never run on SSR – only client
    return {
      fetchApplications: async () => null,
      updateApplicationStatus: async () => void 0,
      updateApplicationTags: async () => void 0,
      deleteApplication: async () => void 0,
      downloadPacketById: async () => void 0,
      downloadBulkPackets: async () => void 0,
      applicationPage: ref(1),
      applications: ref<ApplicationFormData[]>([]),
      applicationsPagination: ref<Pagination | null>(null),
      loadingApplications: ref(false)
    }
  }

  // State
  const applications = ref<ApplicationFormData[]>([])
  const applicationsPagination = ref<Pagination | null>(null)
  const loadingApplications = ref<boolean>(false)
  const applicationPage = ref<number>(1)

  // Auth
  const auth = useAuthStore()
  const canFetch = computed(() => auth.isFirebaseReady && auth.authorized)

  // Abort previous in-flight list request on param changes / unmount
  const listAbort = shallowRef<AbortController | null>(null)
  onBeforeUnmount(() => listAbort.value?.abort())

  // ✅ Hardcode for now (swap when ready)
  const API = 'https://api.goldengatemanor.com'
  // const API = 'http://127.0.0.1:4000'

  // Helpers
  const getTokenOrNull = async (): Promise<string | null> => {
    const token = await auth.getIdToken()
    return token ?? null
  }

  const buildQuery = (page: number, pageSize: number, omit: boolean, filters: Filters = {}) => {
    const query: Record<string, unknown> = { page, pageSize, omit }

    Object.entries(filters || {}).forEach(([k, v]) => {
      if (v === undefined || v === null || v === '') return
      query[k] = v
    })

    return query
  }

  const triggerDownload = (buffer: ArrayBuffer, mime: string, filename: string) => {
    const blob = new Blob([buffer], { type: mime })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  // ---- List ----

  const fetchApplications = async (
    isLoading = true,
    pageSize = 10,
    page = 1,
    omit: boolean = true,
    filters: Filters = {}
  ) => {
    if (!canFetch.value) return null

    const token = await getTokenOrNull()
    if (!token) return null

    // cancel in-flight
    listAbort.value?.abort()
    listAbort.value = new AbortController()

    if (isLoading) loadingApplications.value = true
    try {
      const res = await $fetch<ListResponse>(`/api/application`, {
        baseURL: API,
        method: 'GET',
        query: buildQuery(page, pageSize, omit, filters),
        headers: { Authorization: `Bearer ${token}` },
        signal: listAbort.value.signal
      })

      if (res.success) {
        applications.value = res.data
        applicationsPagination.value = res.pagination
        applicationPage.value = page
      }
      return res
    } catch (e) {
      if (!(e instanceof DOMException && e.name === 'AbortError')) {
        console.error('fetchApplications:', (e as Error).message)
      }
      return null
    } finally {
      loadingApplications.value = false
    }
  }

  // ---- Status ----

  const updateApplicationStatus = async (
    message: { id: string; status: ApplicationRequestStatus },
    pageSize = 10,
    page = applicationPage.value,
    omit: boolean = true,
    filters: Filters = {}
  ) => {
    if (!canFetch.value) return
    const token = await getTokenOrNull()
    if (!token) return

    try {
      const res = await $fetch<OkResponse>(`/api/application/${message.id}/status`, {
        baseURL: API,
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: { status: message.status }
      })
      if (res.success) {
        await fetchApplications(false, pageSize, page, omit, filters)
      }
    } catch (e) {
      console.error('updateApplicationStatus:', (e as Error).message)
    }
  }

  // ---- Tags ----

  const updateApplicationTags = async (
    message: { id: string; tags: string[] },
    pageSize = 10,
    page = applicationPage.value,
    omit: boolean = true,
    filters: Filters = {}
  ) => {
    if (!canFetch.value) return
    const token = await getTokenOrNull()
    if (!token) return

    try {
      const res = await $fetch<OkResponse>(`/api/application/${message.id}/tags`, {
        baseURL: API,
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: { tags: message.tags }
      })
      if (res.success) {
        await fetchApplications(false, pageSize, page, omit, filters)
      }
    } catch (e) {
      console.error('updateApplicationTags:', (e as Error).message)
    }
  }

  // ---- Delete ----

  const deleteApplication = async (
    id: string,
    pageSize = 10,
    omit: boolean = true,
    filters: Filters = {}
  ) => {
    if (!canFetch.value) return
    const token = await getTokenOrNull()
    if (!token) return

    try {
      const res = await $fetch<OkResponse>(`/api/application/${id}`, {
        baseURL: API,
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.success) {
        await fetchApplications(false, pageSize, 1, omit, filters)
        applicationPage.value = 1
      }
    } catch (e) {
      console.error('deleteApplication:', (e as Error).message)
    }
  }

  // ---- Exports (PDF / ZIP) ----
  // Uses $fetch.raw so we can access headers like X-Filename.

  const exportApplicationPacketPDFById = async (id: string): Promise<void> => {
    if (!canFetch.value) return
    const token = await getTokenOrNull()
    if (!token) return

    try {
      const r = await $fetch.raw(`/api/application/export/pdf/${id}`, {
        baseURL: API,
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'arrayBuffer'
      })

      const ab = r._data as ArrayBuffer
      const xFilename = r.headers.get('x-filename')
      const filename = xFilename ? decodeURIComponent(xFilename) : `application-${id.slice(0, 8)}.pdf`

      triggerDownload(ab, 'application/pdf', filename)
    } catch (e) {
      console.error('exportApplicationPacketPDFById:', (e as Error).message)
    }
  }

  const exportApplicationPacketPDFBulk = async (ids: string[]): Promise<void> => {
    if (!canFetch.value) return
    const token = await getTokenOrNull()
    if (!token) return
    if (!Array.isArray(ids) || ids.length === 0) return

    try {
      const query = encodeURIComponent(ids.join(','))

      const r = await $fetch.raw(`/api/application/export/pdf/bulk?ids=${query}`, {
        baseURL: API,
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'arrayBuffer'
      })

      const ab = r._data as ArrayBuffer
      const cd = r.headers.get('content-disposition')
      const defaultName = `applications-bulk-${new Date().toISOString().split('T')[0]}.zip`

      // crude filename parse; your server uses attachment; filename="..."
      const match = cd?.match(/filename="([^"]+)"/i)
      const filename = match?.[1] || defaultName

      triggerDownload(ab, 'application/zip', filename)
    } catch (e) {
      console.error('exportApplicationPacketPDFBulk:', (e as Error).message)
    }
  }

  // Convenience names for components
  const downloadPacketById = (id: string) => exportApplicationPacketPDFById(id)
  const downloadBulkPackets = (ids: string[]) => exportApplicationPacketPDFBulk(ids)

  return {
    fetchApplications,
    updateApplicationStatus,
    updateApplicationTags,
    deleteApplication,
    downloadPacketById,
    downloadBulkPackets,
    applicationPage,
    applications,
    applicationsPagination,
    loadingApplications
  }
}