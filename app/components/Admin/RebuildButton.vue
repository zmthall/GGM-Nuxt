<!-- components/admin/RebuildButton.vue -->
<template>
  <div class="space-y-4">
    <button 
      :disabled="isRebuilding"
      class="w-full bg-brand-primary text-white px-6 py-4 rounded-lg font-semibold hover:bg-brand-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center gap-2"
      @click="handleRebuild" 
    >
      <BaseIcon 
        v-if="isRebuilding" 
        name="line-md:loading-loop" 
        class="text-2xl"
      />
      <span v-if="isRebuilding">
        Building... ({{ elapsedTime }}s)
      </span>
      <span v-else>
        🚀 Rebuild & Deploy Site
      </span>
    </button>
    
    <!-- Status Messages -->
    <div 
      v-if="buildMessage" 
      class="p-4 rounded-lg"
      :class="buildSuccess ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'"
    >
      <p :class="buildSuccess ? 'text-green-800' : 'text-red-800'">
        {{ buildMessage }}
      </p>
    </div>

    <!-- Build Log (optional) -->
    <details v-if="buildLog" class="text-sm">
      <summary class="cursor-pointer font-semibold text-gray-700">
        View Build Log
      </summary>
      <pre class="mt-2 p-4 bg-gray-100 rounded overflow-x-auto text-xs">{{ buildLog }}</pre>
    </details>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const isRebuilding = ref(false)
const buildMessage = ref('')
const buildSuccess = ref(false)
const buildLog = ref('')
const elapsedTime = ref(0)

let timer: NodeJS.Timeout | null = null

const startTimer = () => {
  elapsedTime.value = 0
  timer = setInterval(() => {
    elapsedTime.value++
  }, 1000)
}

const stopTimer = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const handleRebuild = async () => {
  const confirmed = confirm(
    '⚠️ This will rebuild the entire site and all new blog posts will go live.\n\n' +
    'The site will be unavailable for 1-2 minutes during the rebuild.\n\n' +
    'Continue?'
  )
  
  if (!confirmed) return
  
  isRebuilding.value = true
  buildMessage.value = ''
  buildLog.value = ''
  buildSuccess.value = false
  startTimer()
  
  try {
    // Get the Firebase token from your auth store
    const idToken = await authStore.getIdToken()
    
    const response = await $fetch('/api/admin/rebuild', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      }
    })
    
    buildSuccess.value = true
    buildMessage.value = response.message || 'Site rebuilt successfully! Refresh the page in 30 seconds to see changes.'
    buildLog.value = JSON.stringify(response, null, 2)
    
  } catch (error: any) {
    buildSuccess.value = false
    buildMessage.value = error.data?.message || 'Build failed. Please check the server logs or try again.'
    buildLog.value = JSON.stringify(error.data, null, 2)
    console.error('Rebuild error:', error)
  } finally {
    isRebuilding.value = false
    stopTimer()
  }
}

onBeforeUnmount(() => {
  stopTimer()
})
</script>