import type { User } from 'firebase/auth'
import { defineStore } from 'pinia'

export const useAuthStoreStore = defineStore('auth', () => {
  const user = ref<User | undefined>(undefined)
  const error = ref<string | undefined>(undefined);
  const authorized = ref<boolean | undefined>(undefined);

  return {
    user,
    error,
    authorized
  }
})
