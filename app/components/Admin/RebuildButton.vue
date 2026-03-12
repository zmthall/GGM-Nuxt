<script setup lang="ts">
const authStore = useAuthStore()
const { info, success, error } = useToast()

const isBuilding = ref(false)
const isWaitingForRestart = ref(false)

const buildPollInterval = ref<ReturnType<typeof setInterval> | null>(null)
const restartPollInterval = ref<ReturnType<typeof setInterval> | null>(null)

const initialRuntimeMarker = ref<string | null>(null)

function getErrorMessage(err: unknown) {
  if (err instanceof Error) {
    return err.message
  }

  return 'Unknown error'
}

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

async function stabilizeAndReload() {
  const freshUrl = buildCacheBustedUrl()

  await new Promise(resolve => setTimeout(resolve, 4000))

  try {
    await fetch(freshUrl, {
      method: 'GET',
      cache: 'no-store',
      credentials: 'include',
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache'
      }
    })
  } catch (err) {
    console.error('Warm-up fetch failed before reload:', err)
  }

  window.location.replace(freshUrl)
}

async function waitForRestart() {
  try {
    const currentMarker = await fetchRuntimeMarker()

    if (initialRuntimeMarker.value && currentMarker !== initialRuntimeMarker.value) {
      stopRestartPolling()
      isWaitingForRestart.value = false
      isBuilding.value = false

      success('App restarted. Loading fresh page...')

      await stabilizeAndReload()
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
      setTimeout(() => {
        checkBuildStatus()

        buildPollInterval.value = setInterval(checkBuildStatus, 5000)
      }, 10000)
    } else {
      error(response.message || 'Failed to start build')
      isBuilding.value = false
    }
  } catch (err: unknown) {
    error('Error starting build: ' + getErrorMessage(err))
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