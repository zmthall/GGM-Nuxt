// composables/admin/useRideRequests.ts
import type { RideRequestFormData, RideRequestStatus } from '~/models/admin/RideRequestForm'
import type { Pagination } from '~/models/Pagination'

type ListResponse = { success: boolean; data: RideRequestFormData[]; pagination: Pagination }
type OkResponse = { success: boolean }

export const useRideRequests = () => {
  if (import.meta.server) {
    // SSR no-ops to avoid runtime imports server-side
    return {
      fetchRideRequests: async () => null,
      updateRideStatus: async () => void 0,
      updateRideTags: async () => void 0,
      exportRidePDF: async () => void 0,
      deleteRideRequest: async () => void 0,
      rideRequests: ref<RideRequestFormData[]>([]),
      rideRequestsPagination: ref<Pagination | null>(null),
      loadingRideRequests: ref(false),
      requestPage: ref(1),
    }
  }

  // ----- state
  const rideRequests = ref<RideRequestFormData[]>([])
  const rideRequestsPagination = ref<Pagination | null>(null)
  const loadingRideRequests = ref<boolean>(false)
  const requestPage = ref<number>(1)

  // ----- auth gate
  const auth = useAuthStore()
  const canFetch = computed(() => auth.isFirebaseReady && auth.authorized)

  // ----- infra
  const API = 'https://api.goldengatemanor.com'
  const listAbort = shallowRef<AbortController | null>(null)
  onBeforeUnmount(() => listAbort.value?.abort())

  const getTokenOrNull = async (): Promise<string | null> => {
    const token = await auth.getIdToken()
    return token ?? null
  }

  // ----- actions
  const fetchRideRequests = async (
    isLoading = true,
    pageSize = 5,
    page = 1,
    omit: boolean = true
  ) => {
    if (!canFetch.value) return null

    const token = await getTokenOrNull()
    if (!token) return null

    // cancel previous in-flight
    listAbort.value?.abort()
    listAbort.value = new AbortController()

    if (isLoading) loadingRideRequests.value = true
    try {
      const res = await $fetch<ListResponse>(`/api/ride-request?omit=${omit}`, {
        baseURL: API,
        method: 'GET',
        query: { page, pageSize },
        headers: { Authorization: `Bearer ${token}` },
        signal: listAbort.value.signal,
      })

      if (res.success) {
        rideRequests.value = res.data
        rideRequestsPagination.value = res.pagination
        requestPage.value = page
      }
      return res
    } catch (e) {
      if (!(e instanceof DOMException && e.name === 'AbortError')) {
        console.error('fetchRideRequests:', (e as Error).message)
      }
      return null
    } finally {
      loadingRideRequests.value = false
    }
  }

  const updateRideStatus = async (
    msg: { id: string; status: RideRequestStatus },
    pageSize = 5,
    page = requestPage.value,
    omit: boolean = true
  ) => {
    if (!canFetch.value) return
    const token = await getTokenOrNull()
    if (!token) return

    try {
      const res = await $fetch<OkResponse>(`/api/ride-request/${msg.id}/status`, {
        baseURL: API,
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: { status: msg.status }, // $fetch stringifies for you
      })
      if (res.success) await fetchRideRequests(false, pageSize, page, omit)
    } catch (e) {
      console.error('updateRideStatus:', (e as Error).message)
    }
  }

  const updateRideTags = async (
    msg: { id: string; tags: string[] },
    pageSize = 5,
    page = requestPage.value,
    omit: boolean = true
  ) => {
    if (!canFetch.value) return
    const token = await getTokenOrNull()
    if (!token) return

    try {
      const res = await $fetch<OkResponse>(`/api/ride-request/${msg.id}/tags`, {
        baseURL: API,
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: { tags: msg.tags },
      })
      if (res.success) await fetchRideRequests(false, pageSize, page, omit)
    } catch (e) {
      console.error('updateRideTags:', (e as Error).message)
    }
  }

  const exportRidePDF = async ({ id }: RideRequestFormData | { id: string }) => {
    if (!canFetch.value) return
    const token = await getTokenOrNull()
    if (!token) return

    try {
      const res = await $fetch.raw(`/api/ride-request/export/pdf/${id}`, {
        baseURL: API,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/pdf',
        },
        responseType: 'blob',
      })
      if (!res.ok) throw new Error(`Download failed: ${res.status}`)

      const filename = res.headers.get('X-Filename') ?? `ride-request-${id.toString().split('-')[0]}`
      const blob = res._data as Blob

      const url = URL.createObjectURL(blob)
      const a = Object.assign(document.createElement('a'), { href: url, download: filename })
      document.body.appendChild(a)
      a.click()
      a.remove()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch (e) {
      console.error('exportRidePDF:', (e as Error).message)
    }
  }

  const deleteRideRequest = async (id: string, pageSize = 5, omit: boolean = true) => {
    if (!canFetch.value) return
    const token = await getTokenOrNull()
    if (!token) return

    try {
      const res = await $fetch<OkResponse>(`/api/ride-request/${id}`, {
        baseURL: API,
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.success) {
        await fetchRideRequests(false, pageSize, 1, omit)
        requestPage.value = 1
      }
    } catch (e) {
      console.error('deleteRideRequest:', (e as Error).message)
    }
  }

  return {
    fetchRideRequests,
    updateRideStatus,
    updateRideTags,
    exportRidePDF,
    deleteRideRequest,
    rideRequests,
    loadingRideRequests,
    rideRequestsPagination,
    requestPage,
  }
}
