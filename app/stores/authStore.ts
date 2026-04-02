import type { User } from 'firebase/auth'
import { defineStore } from 'pinia'
import type { FetchUser } from '~/models/admin/user'

type UserRole = 'admin' | 'correspondence' | 'user'

function normalizeRole(input: unknown): UserRole | null {
  const v = String(input ?? '').trim().toLowerCase()

  if (v === 'admin') return 'admin'
  if (v === 'correspondence') return 'correspondence'
  if (v === 'user') return 'user'

  return null
}

export const useAuthStore = defineStore('auth', () => {
  const authCookie = useCookie('user-authorized', {
    default: () => false,
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'strict'
  })

  const user = ref<User | undefined>(undefined)
  const error = ref<string | undefined>(undefined)
  const role = ref<UserRole | null>(null)
  const isFirebaseReady = ref(false)

  const authorized = computed(() => {
    if (!isFirebaseReady.value) {
      return authCookie.value
    }

    return !!user.value
  })

  const getIdToken = async (): Promise<string | null> => {
    try {
      if (!user.value) {
        throw new Error('No user logged in')
      }

      const token = await user.value.getIdToken()
      return token
    } catch (err) {
      console.error('Error getting ID token:', err)

      if (err instanceof Error) {
        setError(err.message)
      }

      return null
    }
  }

  const setUser = (userData: User | undefined) => {
    user.value = userData
    authCookie.value = !!userData

    if (userData) {
      error.value = undefined
    } else {
      role.value = null
    }
  }

  const resetRole = () => {
    role.value = null
  }

  const setFirebaseReady = (value = true) => {
    isFirebaseReady.value = value
  }

  const setError = (errorMessage: string | undefined) => {
    error.value = errorMessage
  }

  const clearAuth = () => {
    user.value = undefined
    authCookie.value = false
    role.value = null
    error.value = undefined
  }

  const getUserRole = async () => {
    if (!user.value) {
      role.value = null
      return null
    }

    const idToken = await getIdToken()

    if (!idToken) {
      role.value = null
      return null
    }

    try {
      const response = await $fetch<FetchUser>('/api/users/profile', {
        baseURL: useRuntimeConfig().public.useLocalApi ? 'http://127.0.0.1:4000' : 'https://api.goldengatemanor.com',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      })

      if (response.success) {
        const normalizedRole = normalizeRole(response.data?.role)
        role.value = normalizedRole
        return normalizedRole
      }

      role.value = null
      console.warn('Role fetch failed:', response)
      return null
    } catch (err) {
      console.error('Error fetching role:', err)
      role.value = null
      return null
    }
  }

  const refreshRole = async () => {
    return await getUserRole()
  }

  return {
    user,
    role,
    error,
    authorized,
    isFirebaseReady,
    getIdToken,
    refreshRole,
    resetRole,
    setUser,
    setFirebaseReady,
    setError,
    clearAuth
  }
})