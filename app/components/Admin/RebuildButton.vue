<template>
  <div>
    <button :disabled="isBuilding" @click="triggerRebuild">
      {{ isBuilding ? 'Building...' : 'Rebuild Site' }}
    </button>
    
    <div v-if="isBuilding" class="build-logs">
      <h3>Build Progress:</h3>
      <div v-for="(log, index) in buildLogs" :key="index">
        {{ log }}
      </div>
    </div>
  </div>
</template>

<script setup>
const authStore = useAuthStore()
const isBuilding = ref(false)
const buildLogs = ref([])
const pollInterval = ref(null)

async function triggerRebuild() {
  try {
    isBuilding.value = true
    buildLogs.value = ['Requesting rebuild...']
    
    const idToken = await authStore.getIdToken()
    
    const response = await $fetch('/api/admin/rebuild', { 
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (response.ok) {
      buildLogs.value = ['Build started on server...']
      pollInterval.value = setInterval(checkBuildStatus, 3000) // Check every 3 seconds
    }
  } catch (error) {
    console.error('Failed to start build:', error)
    buildLogs.value = ['Error starting build: ' + error.message]
    isBuilding.value = false
  }
}

async function checkBuildStatus() {
  try {
    const idToken = await authStore.getIdToken()
    
    const response = await $fetch('/api/admin/rebuild-status', {
      headers: {
        'Authorization': `Bearer ${idToken}`
      }
    })
    
    if (response.ok && response.status) {
      buildLogs.value = response.status.logs || []
      
      if (response.status.status === 'success' || response.status.status === 'failed') {
        clearInterval(pollInterval.value)
        pollInterval.value = null
        isBuilding.value = false
        
        if (response.status.status === 'success') {
          buildLogs.value.push('✅ Build completed! App is restarting...')
        } else {
          buildLogs.value.push('❌ Build failed: ' + response.status.error)
        }
      }
    }
  } catch (error) {
    console.error('Failed to check build status:', error)
  }
}

onUnmounted(() => {
  if (pollInterval.value) {
    clearInterval(pollInterval.value)
  }
})
</script>