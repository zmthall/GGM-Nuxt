<script setup lang="ts">
const authStore = useAuthStore()
const { success, error } = useToast()

const isBuilding = ref(false)

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
   ACTIONS
------------------------- */
async function triggerRebuild() {
  try {
    isBuilding.value = true

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
  } catch (err: unknown) {
    error((err as Error).message || 'Error starting build')
    isBuilding.value = false
  }
}

async function clearRebuild() {
  try {
    const headers = await getAuthHeaders()

    await $fetch('/api/admin/clear-rebuild', {
      method: 'POST',
      headers
    })

    success('Build status cleared')
    closeMenu()
  } catch (err: unknown) {
    error((err as Error).message || 'Failed to clear build')
  }
}

/* -------------------------
   CONTEXT MENU STATE
------------------------- */
const showMenu = ref(false)
const menuX = ref(0)
const menuY = ref(0)

/* -------------------------
   HANDLERS
------------------------- */
function handleRightClick(e: MouseEvent) {
  e.preventDefault()

  menuX.value = e.clientX
  menuY.value = e.clientY

  showMenu.value = true
}

function closeMenu() {
  showMenu.value = false
}

/* close when clicking anywhere */
onMounted(() => {
  window.addEventListener('click', closeMenu)
})

onUnmounted(() => {
  window.removeEventListener('click', closeMenu)
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
      {{ isBuilding ? 'Building...' : 'Rebuild Site' }}
    </BaseUiAction>

    <!-- CUSTOM CONTEXT MENU -->
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