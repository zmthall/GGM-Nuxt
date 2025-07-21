import type { User } from 'firebase/auth'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  // Create a cookie for the authorized state
  const authCookie = useCookie('user-authorized', {
    default: () => false,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'strict'
  })

  const user = ref<User | undefined>(undefined)
  const error = ref<string | undefined>(undefined)
  
  // Use computed to sync with cookie, but allow override
  const authorized = computed({
    get: () => authCookie.value,
    set: (value: boolean) => {
      authCookie.value = value
    }
  })

  // Helper methods for managing auth state
  const setAuthorized = (value: boolean) => {
    authorized.value = value
  }

  const setUser = (userData: User | undefined) => {
    user.value = userData
    // Automatically update authorized state based on user
    authorized.value = !!userData
  }

  const clearAuth = () => {
    user.value = undefined
    authorized.value = false
    error.value = undefined
  }

  return {
    user,
    error,
    authorized,
    setAuthorized,
    setUser,
    clearAuth
  }
})