<script setup>
const authStore = useAuthStore()
const { info, success, error } = useToast()

const isBuilding = ref(false)
const pollInterval = ref(null)

async function triggerRebuild() {
  try {
    isBuilding.value = true
    info('Starting rebuild...', 60000) // 0 = persistent toast
    
    const idToken = await authStore.getIdToken()
    
    const response = await $fetch('/api/admin/rebuild', { 
      method: 'POST',
      headers: {
        'authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (response.ok) {
      pollInterval.value = setInterval(checkBuildStatus, 3000)
    } else {
      error('Failed to start build')
      isBuilding.value = false
    }
  } catch (err) {
    error('Error starting build: ' + err.message)
    isBuilding.value = false
  }
}

async function checkBuildStatus() {
  try {
    const idToken = await authStore.getIdToken()
    
    const response = await $fetch('/api/admin/rebuild-status', {
      headers: {
        'authorization': `Bearer ${idToken}`
      }
    })
    
    if (response.ok && response.status) {
      if (response.status.status === 'success') {
        clearInterval(pollInterval.value)
        pollInterval.value = null
        isBuilding.value = false
        success('Build completed! App is restarting...')
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      } else if (response.status.status === 'failed') {
        clearInterval(pollInterval.value)
        pollInterval.value = null
        isBuilding.value = false
        error('Build failed: ' + response.status.error)
      }
      // If still running, just keep polling silently
    }
  } catch (err) {
    console.error('Failed to check build status:', err)
  }
}

onUnmounted(() => {
  if (pollInterval.value) {
    clearInterval(pollInterval.value)
  }
})
</script>

<template>
  <BaseUiAction 
    type="button" 
    styling="py-1 px-4"
    :disabled="isBuilding" 
    variant="primary"
    @click="triggerRebuild"
  >
    {{ isBuilding ? 'Building...' : 'Rebuild Site' }}
  </BaseUiAction>
</template>