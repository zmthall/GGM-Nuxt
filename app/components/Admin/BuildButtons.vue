<template>
  <div>
    <div style="display: flex; gap: 10px; margin-bottom: 20px;">
      <button :disabled="isPulling" @click="triggerGitPull">
        {{ isPulling ? 'Pulling...' : 'Pull Latest Code' }}
      </button>
      
      <button :disabled="isBuilding || isPulling" @click="triggerRebuild">
        {{ isBuilding ? 'Building...' : 'Rebuild Site' }}
      </button>
      
      <button :disabled="isPulling || isBuilding" @click="pullAndRebuild">
        {{ (isPulling || isBuilding) ? 'Working...' : 'Pull & Rebuild' }}
      </button>
    </div>
    
    <div v-if="gitOutput" class="git-output" style="margin-bottom: 20px; padding: 10px; background: #f0f0f0;">
      <h3>Git Pull Output:</h3>
      <pre>{{ gitOutput }}</pre>
    </div>
    
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
const isPulling = ref(false)
const buildLogs = ref([])
const gitOutput = ref(null)
const pollInterval = ref(null)

async function triggerGitPull() {
  try {
    isPulling.value = true
    gitOutput.value = null
    
    const idToken = await authStore.getIdToken()
    
    const response = await $fetch('/api/admin/git-pull', {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (response.ok) {
      gitOutput.value = response.output
    }
  } catch (error) {
    console.error('Failed to pull code:', error)
    gitOutput.value = 'Error: ' + error.message
  } finally {
    isPulling.value = false
  }
}

async function triggerRebuild() {
  try {
    isBuilding.value = true
    buildLogs.value = ['Requesting rebuild...']
    gitOutput.value = null
    
    const idToken = await authStore.getIdToken()
    
    const response = await $fetch('/api/admin/rebuild', { 
      method: 'POST',
      headers: {
        'authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (response.ok) {
      buildLogs.value = ['Build started on server...']
      pollInterval.value = setInterval(checkBuildStatus, 3000)
    } else {
      buildLogs.value = ['Failed to start: ' + (response.message || 'Unknown error')]
      isBuilding.value = false
    }
  } catch (error) {
    console.error('Failed to start build:', error)
    buildLogs.value = ['Error starting build: ' + error.message]
    isBuilding.value = false
  }
}

async function pullAndRebuild() {
  await triggerGitPull()
  if (!isPulling.value) {
    // Wait a moment then trigger rebuild
    setTimeout(() => {
      triggerRebuild()
    }, 1000)
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