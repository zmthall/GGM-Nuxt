<script setup lang="ts">
import type { BuildStatus } from '~~/types/rebuild.js'

const authStore = useAuthStore()
const { info, success, error } = useToast()

const isBuilding = ref(false)
const isWaitingForRestart = ref(false)

/* -------------------------
   POLLING STATE
------------------------- */
const buildPollInterval = ref<ReturnType<typeof setInterval> | null>(null)
const restartPollInterval = ref<ReturnType<typeof setInterval> | null>(null)
const initialRuntimeMarker = ref<string | null>(null)

/* -------------------------
   AUTH
------------------------- */
async function getAuthHeaders() {
  const idToken = await authStore.getIdToken()
  return {
    authorization: `Bearer ${idToken}`
  }
}

/* -------------------------
   HELPERS
------------------------- */
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
  } catch {
    // Ignore errors from this fetch, as the server may be temporarily unavailable during restart
  }

  window.location.replace(freshUrl)
}

/* -------------------------
   RUNTIME MARKER
------------------------- */
async function fetchRuntimeMarker() {
  const headers = await getAuthHeaders()

  const res = await $fetch('/api/admin/runtime', {
    headers,
    query: { t: Date.now() }
  })

  if (!res?.ok || !res?.runtime?.marker) {
    throw new Error('Failed to get runtime marker')
  }

  return res.runtime.marker as string
}

/* -------------------------
   BUILD FLOW
------------------------- */
async function triggerRebuild() {
  try {
    isBuilding.value = true
    isWaitingForRestart.value = false

    stopBuildPolling()
    stopRestartPolling()

    initialRuntimeMarker.value = await fetchRuntimeMarker()

    const headers = await getAuthHeaders()

    const res = await $fetch('/api/admin/rebuild', {
      method: 'POST',
      headers
    })

    if (!res.ok) {
      error(res.message || 'Failed to start build')
      isBuilding.value = false
      return
    }

    info('Starting rebuild...', 60000)

    setTimeout(() => {
      checkBuildStatus()
      buildPollInterval.value = setInterval(checkBuildStatus, 5000)
    }, 8000)

  } catch (err: unknown) {
    error((err as Error).message || 'Error starting build')
    isBuilding.value = false
  }
}

async function checkBuildStatus() {
  try {
    const headers = await getAuthHeaders()

    const res = await $fetch<{ ok: boolean; data: BuildStatus; success: boolean }>('/api/admin/rebuild-status', {
      headers,
      query: { t: Date.now() }
    })

    if (res.ok && res.data) {
      if (res.success) {
        stopBuildPolling()

        isWaitingForRestart.value = true
        success('Build completed. Waiting for restart...')

        restartPollInterval.value = setInterval(waitForRestart, 2500)
      }

      if (res.data.status === 'failed') {
        stopBuildPolling()
        stopRestartPolling()

        isBuilding.value = false
        isWaitingForRestart.value = false

        error('Build failed: ' + res.data.error)
      }
    }
  } catch (err) {
    console.error('Status check failed', err)
  }
}

async function waitForRestart() {
  try {
    const currentMarker = await fetchRuntimeMarker()

    if (
      initialRuntimeMarker.value &&
      currentMarker !== initialRuntimeMarker.value
    ) {
      stopRestartPolling()

      isBuilding.value = false
      isWaitingForRestart.value = false

      success('App restarted. Reloading...')

      await stabilizeAndReload()
    }
  } catch {
    // Ignore errors during restart polling, as the server may be temporarily unavailable
  }
}

/* -------------------------
   CLEAR REBUILD
------------------------- */
async function clearRebuild() {
  try {
    const headers = await getAuthHeaders()

    await $fetch('/api/admin/clear-rebuild', {
      method: 'POST',
      headers
    })

    success('Build status cleared')

    isBuilding.value = false
    isWaitingForRestart.value = false

    stopBuildPolling()
    stopRestartPolling()

    closeMenu()
  } catch (err: unknown) {
    error((err as Error).message || 'Failed to clear build')
  }
}

/* -------------------------
   CONTEXT MENU
------------------------- */
const showMenu = ref(false)
const menuX = ref(0)
const menuY = ref(0)

function handleRightClick(e: MouseEvent) {
  e.preventDefault()

  menuX.value = Math.min(e.clientX, window.innerWidth - 160)
  menuY.value = Math.min(e.clientY, window.innerHeight - 60)

  showMenu.value = true
}

function closeMenu() {
  showMenu.value = false
}

/* -------------------------
   LIFECYCLE
------------------------- */
onMounted(() => {
  window.addEventListener('click', closeMenu)
})

onUnmounted(() => {
  window.removeEventListener('click', closeMenu)

  stopBuildPolling()
  stopRestartPolling()
})
</script>

<template>
  <div class="relative inline-block">
    <!-- MAIN BUTTON -->
    <BaseUiAction
      type="button"
      class="h-full"
      styling="py-1 px-4"
      :disabled="isBuilding"
      variant="primary"
      @click="triggerRebuild"
      @contextmenu="handleRightClick"
    >
      {{
        isWaitingForRestart
          ? 'Restarting...'
          : isBuilding
            ? 'Building...'
            : 'Rebuild Site'
      }}
    </BaseUiAction>

    <!-- CONTEXT MENU -->
    <transition name="fade">
      <div
        v-if="showMenu"
        class="fixed z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-2"
        :style="{ top: `${menuY}px`, left: `${menuX}px` }"
      >
        <button
          class="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
          @click.stop="clearRebuild"
        >
          Clear Rebuild
        </button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>