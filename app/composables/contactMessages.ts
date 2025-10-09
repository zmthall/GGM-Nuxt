// composables/admin/useContactMessages.ts
import type { ContactFormData, ContactFormStatus } from '~/models/admin/ContactForm'
import type { Pagination } from '~/models/Pagination'

type ListResponse = { success: boolean; data: ContactFormData[]; pagination: Pagination }
type OkResponse = { success: boolean }

export const useContactMessages = () => {
  if (import.meta.server) {
    // Never run on SSR – only client
    return {
      // no-ops to keep the caller happy if ever imported server-side
      fetchContactMessages: async () => null,
      updateContactStatus: async () => void 0,
      updateContactTags: async () => void 0,
      exportContactPDF: async () => void 0,
      deleteContactMessage: async () => void 0,
      contactPage: ref(1),
      contactMessages: ref<ContactFormData[]>([]),
      contactMessagesPagination: ref<Pagination | null>(null),
      loadingContactMessages: ref(false),
    }
  }

  // State
  const contactMessages = ref<ContactFormData[]>([])
  const contactMessagesPagination = ref<Pagination | null>(null)
  const loadingContactMessages = ref<boolean>(false)
  const contactPage = ref<number>(1)

  // Auth
  const auth = useAuthStore()
  const canFetch = computed(() => auth.isFirebaseReady && auth.authorized)

  // Abort previous in-flight list request on param changes / unmount
  const listAbort = shallowRef<AbortController | null>(null)
  onBeforeUnmount(() => listAbort.value?.abort())

  const API = 'https://api.goldengatemanor.com'

  // Helpers
  const getTokenOrNull = async (): Promise<string | null> => {
    const token = await auth.getIdToken()
    return token ?? null
  }

  const fetchContactMessages = async (
    isLoading = true,
    pageSize = 5,
    page = 1,
    omit: boolean = true
  ) => {
    if (!canFetch.value) return null

    const token = await getTokenOrNull()
    if (!token) return null

    // cancel in-flight
    listAbort.value?.abort()
    listAbort.value = new AbortController()

    if (isLoading) loadingContactMessages.value = true
    try {
      const res = await $fetch<ListResponse>(`/api/contact-form?omit=${omit}`, {
        baseURL: API,
        method: 'GET',
        query: { page, pageSize },
        headers: { Authorization: `Bearer ${token}` },
        signal: listAbort.value.signal
      })

      if (res.success) {
        contactMessages.value = res.data
        contactMessagesPagination.value = res.pagination
        contactPage.value = page
      }
      return res
    } catch (e) {
      // Ignore abort errors; log others
      if (!(e instanceof DOMException && e.name === 'AbortError')) {
        console.error('fetchContactMessages:', (e as Error).message)
      }
      return null
    } finally {
      loadingContactMessages.value = false
    }
  }

  const updateContactStatus = async (
    message: { id: string; status: ContactFormStatus },
    pageSize = 5,
    page = contactPage.value,
    omit: boolean = true
  ) => {
    if (!canFetch.value) return
    const token = await getTokenOrNull()
    if (!token) return

    try {
      const res = await $fetch<OkResponse>(`/api/contact-form/${message.id}/status`, {
        baseURL: API,
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: { status: message.status }
      })
      if (res.success) {
        await fetchContactMessages(false, pageSize, page, omit)
      }
    } catch (e) {
      console.error('updateContactStatus:', (e as Error).message)
    }
  }

  const updateContactTags = async (
    message: { id: string; tags: string[] },
    pageSize = 5,
    page = contactPage.value,
    omit: boolean = true
  ) => {
    if (!canFetch.value) return
    const token = await getTokenOrNull()
    if (!token) return

    try {
      const res = await $fetch<OkResponse>(`/api/contact-form/${message.id}/tags`, {
        baseURL: API,
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: { tags: message.tags }
      })
      if (res.success) {
        await fetchContactMessages(false, pageSize, page, omit)
      }
    } catch (e) {
      console.error('updateContactTags:', (e as Error).message)
    }
  }

  const exportContactPDF = async ({ id }: ContactFormData | { id: string }) => {
    if (!canFetch.value) return
    const token = await getTokenOrNull()
    if (!token) return

    try {
      const res = await $fetch.raw(`/api/contact-form/export/pdf/${id}`, {
        baseURL: API,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/pdf'
        },
        responseType: 'blob'
      })
      if (!res.ok) throw new Error(`Download failed: ${res.status}`)

      const filename =
        res.headers.get('X-Filename') ?? `contact-form-${id.toString().split('-')[0]}`
      const blob = res._data as Blob

      const url = URL.createObjectURL(blob)
      const a = Object.assign(document.createElement('a'), { href: url, download: filename })
      document.body.appendChild(a)
      a.click()
      a.remove()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch (e) {
      console.error('exportContactPDF:', (e as Error).message)
    }
  }

  const deleteContactMessage = async (id: string, pageSize = 5, omit: boolean = true) => {
    if (!canFetch.value) return
    const token = await getTokenOrNull()
    if (!token) return

    try {
      const res = await $fetch<OkResponse>(`/api/contact-form/${id}`, {
        baseURL: API,
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.success) {
        await fetchContactMessages(false, pageSize, 1, omit)
        contactPage.value = 1
      }
    } catch (e) {
      console.error('deleteContactMessage:', (e as Error).message)
    }
  }

  return {
    fetchContactMessages,
    updateContactStatus,
    updateContactTags,
    exportContactPDF,
    deleteContactMessage,
    contactPage,
    contactMessages,
    contactMessagesPagination,
    loadingContactMessages
  }
}
