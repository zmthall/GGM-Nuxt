<script setup lang="ts">
const authStore = useAuthStore()
const { info, success, error } = useToast()

const isBuilding = ref(false)
const isWaitingForRestart = ref(false)

const buildPollInterval = ref<ReturnType<typeof setInterval> | null>(null)
const restartPollInterval = ref<ReturnType<typeof setInterval> | null>(null)

const initialRuntimeMarker = ref<string | null>(null)

async function getAuthHeaders() {
  const idToken = await authStore.getIdToken()

  return {
    authorization: `Bearer ${idToken}`
  }
}

async function fetchRuntimeMarker() {
  const headers = await getAuthHeaders()

  const response = await $fetch('/api/admin/runtime', {
    headers,
    query: {
      t: Date.now()
    }
  })

  if (!response?.ok || !response?.runtime?.marker) {
    throw new Error('Failed to get runtime marker')
  }

  return response.runtime.marker as string
}

function stopBuildPolling() {
  if (buildPollInterval.value) {
    clearInterval(buildPollInterval.value)
    buildPollInterval.value = null
  }
}

function stopRestartPolling() {
  if (restartPollInterval.value) {
    clearInterval(restartPollInterval.value)
    restartPollInterval.value = null
  }
}

function buildCacheBustedUrl() {
  const url = new URL(window.location.href)
  url.searchParams.set('_reload', String(Date.now()))
  return url.toString()
}

function navigateFresh() {
  window.location.replace(buildCacheBustedUrl())
}

async function waitForRestart() {
  try {
    const currentMarker = await fetchRuntimeMarker()

    if (initialRuntimeMarker.value && currentMarker !== initialRuntimeMarker.value) {
      stopRestartPolling()
      isWaitingForRestart.value = false
      isBuilding.value = false

      success('App restarted. Loading fresh page...')

      setTimeout(() => {
        navigateFresh()
      }, 1500)
    }
  } catch (err) {
    console.error('Failed to check runtime marker:', err)
  }
}

async function triggerRebuild() {
  try {
    isBuilding.value = true
    isWaitingForRestart.value = false

    stopBuildPolling()
    stopRestartPolling()

    initialRuntimeMarker.value = await fetchRuntimeMarker()

    info('Starting rebuild...', 60000)

    const headers = await getAuthHeaders()

    const response = await $fetch('/api/admin/rebuild', {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      buildPollInterval.value = setInterval(checkBuildStatus, 3000)
    } else {
      error(response.message || 'Failed to start build')
      isBuilding.value = false
    }
  } catch (err: unknown) {
    error('Error starting build: ' + (err as Error).message)
    isBuilding.value = false
  }
}

async function checkBuildStatus() {
  try {
    const headers = await getAuthHeaders()

    const response = await $fetch('/api/admin/rebuild-status', {
      headers,
      query: {
        t: Date.now()
      }
    })

    if (response.ok && response.status) {
      if (response.status.status === 'success') {
        stopBuildPolling()

        isWaitingForRestart.value = true
        success('Build completed. Waiting for app restart...')

        restartPollInterval.value = setInterval(waitForRestart, 2500)
      } else if (response.status.status === 'failed') {
        stopBuildPolling()
        stopRestartPolling()

        isWaitingForRestart.value = false
        isBuilding.value = false
        error('Build failed: ' + response.status.error)
      }
    }
  } catch (err) {
    console.error('Failed to check build status:', err)
  }
}

onUnmounted(() => {
  stopBuildPolling()
  stopRestartPolling()
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
    {{
      isWaitingForRestart
        ? 'Restarting...'
        : isBuilding
          ? 'Building...'
          : 'Rebuild Site'
    }}
  </BaseUiAction>
</template>