// authStore.ts - Hybrid approach
import type { User } from 'firebase/auth'
import { defineStore } from 'pinia'
import type { FetchUser } from '~/models/admin/user';

type UserRole = 'admin' | 'user';

export const useAuthStore = defineStore('auth', () => {
  // Cookie for immediate UI state (prevents flash)
  const authCookie = useCookie('user-authorized', {
    default: () => false,
    maxAge: 60 * 60 * 24 * 30, // 30 days (longer than Firebase refresh)
    sameSite: 'strict'
  })

  const user = ref<User | undefined>(undefined)
  const error = ref<string | undefined>(undefined)
  const role = ref<UserRole | null>(null)
  const isFirebaseReady = ref(false) // Track if Firebase has initialized
  
  // Use cookie for initial state, then switch to Firebase auth
  const authorized = computed(() => {
    if (!isFirebaseReady.value) {
      // Before Firebase is ready, use cookie to prevent flash
      return authCookie.value
    }
    // After Firebase is ready, use actual auth state
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
    // Update cookie to match Firebase state
    authCookie.value = !!userData
    if (userData) {
      error.value = undefined
    }
  }

  const setFirebaseReady = () => {
    isFirebaseReady.value = true
  }

  const setError = (errorMessage: string | undefined) => {
    error.value = errorMessage
  }

  const clearAuth = () => {
    user.value = undefined;
    authCookie.value = false;
    role.value = null;
    error.value = undefined;
  }

  const getUserRole = async () => {
    if (!user.value) return;

    const idToken = await getIdToken();
    if (!idToken) return;

    try {
      const response = await $fetch<FetchUser>('/api/users/profile', {
        baseURL: 'https://api.goldengatemanor.com',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      });

      if (response.success) {
        role.value = response.data?.role as UserRole;
      } else {
        role.value = null;
        console.warn('Role fetch failed:', response);
      }
    } catch (err) {
      console.error('Error fetching role:', err);
      role.value = null;
    }
  };

  const refreshRole = async () => getUserRole()

  return {
    user,
    role,
    refreshRole,
    error,
    authorized,
    getIdToken,
    isFirebaseReady,
    setUser,
    setFirebaseReady,
    setError,
    clearAuth
  }
})