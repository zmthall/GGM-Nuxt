export type NotificationResponse = {
  success: boolean
  data: {
    totalNew: number
    rideRequestsNew: number
    messagesNew: number
    applicationsNew: number
    updatedAt?: string
  }
}

export const useAdminNotifications = () => {
  const loading = useState<boolean>('admin-notifications-loading', () => false)
  const errorMsg = useState<string | null>('admin-notifications-error', () => null)

  const counts = useState('admin-notifications-counts', () => ({
    totalNew: 0,
    rideRequestsNew: 0,
    messagesNew: 0,
    applicationsNew: 0
  }))

  const totalNew = computed(() => counts.value.totalNew)

  const fetchNotifications = async () => {
    try {
      loading.value = true
      errorMsg.value = null

      const res = await $fetch<NotificationResponse>('/api/notification', {
        baseURL: useRuntimeConfig().public.useLocalApi ? 'http://127.0.0.1:4000' : 'https://api.goldengatemanor.com',
        method: 'GET'
      })

      if (!res?.success) {
        throw new Error('Failed to load notifications')
      }

      const d = res.data

      counts.value = {
        totalNew: Number(d.totalNew ?? 0),
        rideRequestsNew: Number(d.rideRequestsNew ?? 0),
        messagesNew: Number(d.messagesNew ?? 0),
        applicationsNew: Number(d.applicationsNew ?? 0)
      }
    } catch (err) {
      errorMsg.value = (err as Error).message ?? 'Failed to load notifications'
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    errorMsg,
    counts,
    totalNew,
    fetchNotifications
  }
}