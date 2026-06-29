// composables/admin/useConsultationRequests.ts
import type {
  ConsultationRequestFormData,
  ConsultationFormStatus
} from '~/models/admin/ConsultationForm'
import type { Pagination } from '~/models/Pagination'

type ListResponse = {
  success: boolean
  data: ConsultationRequestFormData[]
  pagination: Pagination
}

type OkResponse = {
  success: boolean
}

export const useConsultationRequests = () => {
  if (import.meta.server) {
    return {
      fetchConsultationRequests: async () => null,
      updateConsultationStatus: async () => void 0,
      updateConsultationTags: async () => void 0,
      deleteConsultationRequest: async () => void 0,
      exportConsultationPDF: async () => void 0,
      consultationRequests: ref<ConsultationRequestFormData[]>([]),
      consultationRequestsPagination: ref<Pagination | null>(null),
      loadingConsultationRequests: ref(false),
      consultationRequestPage: ref(1),
    }
  }

  const consultationRequests = ref<ConsultationRequestFormData[]>([])
  const consultationRequestsPagination = ref<Pagination | null>(null)
  const loadingConsultationRequests = ref<boolean>(false)
  const consultationRequestPage = ref<number>(1)

  const auth = useAuthStore()
  const canFetch = computed(() => auth.isFirebaseReady && auth.authorized)

  const API = useRuntimeConfig().public.useLocalApi
    ? 'http://127.0.0.1:4000'
    : 'https://api.goldengatemanor.com'

  const listAbort = shallowRef<AbortController | null>(null)

  onBeforeUnmount(() => listAbort.value?.abort())

  const getTokenOrNull = async (): Promise<string | null> => {
    const token = await auth.getIdToken()
    return token ?? null
  }

  const fetchConsultationRequests = async (
    isLoading = true,
    pageSize = 5,
    page = 1,
    omit: boolean = true
  ) => {
    if (!canFetch.value) return null

    const token = await getTokenOrNull()
    if (!token) return null

    listAbort.value?.abort()
    listAbort.value = new AbortController()

    if (isLoading) loadingConsultationRequests.value = true

    try {
      const res = await $fetch<ListResponse>(`/api/consultation-request?omit=${omit}`, {
        baseURL: API,
        method: 'GET',
        query: { page, pageSize },
        headers: { Authorization: `Bearer ${token}` },
        signal: listAbort.value.signal,
      })

      if (res.success) {
        consultationRequests.value = res.data
        consultationRequestsPagination.value = res.pagination
        consultationRequestPage.value = page
      }

      return res
    } catch (e) {
      if (!(e instanceof DOMException && e.name === 'AbortError')) {
        console.error('fetchConsultationRequests:', (e as Error).message)
      }

      return null
    } finally {
      loadingConsultationRequests.value = false
    }
  }

  const { fetchNotifications } = useAdminNotifications()

  const updateConsultationStatus = async (
    msg: { id: string; status: ConsultationFormStatus },
    pageSize = 5,
    page = consultationRequestPage.value,
    omit: boolean = true
  ) => {
    if (!canFetch.value) return

    const token = await getTokenOrNull()
    if (!token) return

    try {
      const res = await $fetch<OkResponse>(`/api/consultation-request/${msg.id}/status`, {
        baseURL: API,
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: { status: msg.status },
      })

      if (res.success) {
        await fetchConsultationRequests(false, pageSize, page, omit)
        fetchNotifications()
      }
    } catch (e) {
      console.error('updateConsultationStatus:', (e as Error).message)
    }
  }

  const updateConsultationTags = async (
    msg: { id: string; tags: string[] },
    pageSize = 5,
    page = consultationRequestPage.value,
    omit: boolean = true
  ) => {
    if (!canFetch.value) return

    const token = await getTokenOrNull()
    if (!token) return

    try {
      const res = await $fetch<OkResponse>(`/api/consultation-request/${msg.id}/tags`, {
        baseURL: API,
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: { tags: msg.tags },
      })

      if (res.success) {
        await fetchConsultationRequests(false, pageSize, page, omit)
      }
    } catch (e) {
      console.error('updateConsultationTags:', (e as Error).message)
    }
  }

  const deleteConsultationRequest = async (
    id: string,
    pageSize = 5,
    omit: boolean = true
  ) => {
    if (!canFetch.value) return

    const token = await getTokenOrNull()
    if (!token) return

    try {
      const res = await $fetch<OkResponse>(`/api/consultation-request/${id}`, {
        baseURL: API,
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.success) {
        await fetchConsultationRequests(false, pageSize, 1, omit)
        consultationRequestPage.value = 1
        fetchNotifications()
      }
    } catch (e) {
      console.error('deleteConsultationRequest:', (e as Error).message)
    }
  }

  const exportConsultationPDF = async (
    { id }: ConsultationRequestFormData | { id: string }
  ) => {
    if (!canFetch.value) return

    const token = await getTokenOrNull()
    if (!token) return

    try {
      const res = await $fetch.raw(`/api/consultation-request/export/pdf/${id}`, {
        baseURL: API,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/pdf',
        },
        responseType: 'blob',
      })

      if (!res.ok) throw new Error(`Download failed: ${res.status}`)

      const filename =
        res.headers.get('X-Filename') ??
        `consultation-request-${id.toString().split('-')[0]}.pdf`

      const blob = res._data as Blob
      const url = URL.createObjectURL(blob)

      const a = Object.assign(document.createElement('a'), {
        href: url,
        download: filename,
      })

      document.body.appendChild(a)
      a.click()
      a.remove()

      setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch (e) {
      console.error('exportConsultationPDF:', (e as Error).message)
    }
  }

  return {
    fetchConsultationRequests,
    updateConsultationStatus,
    updateConsultationTags,
    deleteConsultationRequest,
    exportConsultationPDF, 

    consultationRequests,
    consultationRequestsPagination,
    loadingConsultationRequests,
    consultationRequestPage,
  }
}