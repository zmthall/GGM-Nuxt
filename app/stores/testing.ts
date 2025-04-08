import { defineStore } from 'pinia'

export const useAlertsStore = defineStore('alerts', () => {
  const testing = ref('testing things');

  return {
    testing
  }
})
