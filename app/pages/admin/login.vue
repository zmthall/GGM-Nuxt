<template>
  <div>
    <!-- Show login UI until we're authorized -->
    <AdminLogin v-if="!authStore.authorized" />
    <div v-else class="relative min-h-screen bg-[#121b75] overflow-hidden flex items-center justify-center">
      <h2 class="text-4xl text-brand-secondary uppercase">Redirecting to Dashboard...</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WatchStopHandle } from 'vue'

const authStore = useAuthStore()

definePageMeta({ layout: 'admin' })
defineOptions({ name: 'AdminLoginPage' })

onMounted(async () => {
  // Ensure Firebase is initialized (lazy plugin)
  const { $getFirebase } = useNuxtApp()
  await $getFirebase()

  // If we're already good, go now (refresh case)
  if (authStore.isFirebaseReady && authStore.authorized) {
    await navigateTo('/admin', { replace: true })
    return
  }

  // Otherwise, watch ONCE for ready+authorized then redirect
  const stop: WatchStopHandle = watch(
    () => authStore.isFirebaseReady && authStore.authorized,
    async ok => {
      if (!ok) return
      stop()
      await navigateTo('/admin', { replace: true })
    },
    { immediate: false }
  )
})
</script>
