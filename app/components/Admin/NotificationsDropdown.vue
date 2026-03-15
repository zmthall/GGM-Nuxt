<template>
  <div ref="root" class="relative">
    <!-- Trigger Button -->
    <button :title="`Messages: ${counts.messagesNew}, Ride Requests: ${counts.rideRequestsNew}, Applications: ${counts.applicationsNew}`" type="button" class="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200" @click="toggle">
      <span class="relative inline-flex items-center">
        <BaseIcon name="material-symbols:circle-notifications" />

        <!-- Bubble badge (only if total > 0) -->
        <span v-if="totalNew > 0" class="absolute -right-2 -top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 py-0.5 text-[11px] font-semibold leading-none text-white">
          {{ totalNew > 99 ? '99+' : totalNew }}
        </span>
      </span>
      <span class="ml-2 hidden sm:inline">Notifications</span>
      <span class="ml-2 text-gray-500">▾</span>
    </button>

    <!-- Dropdown -->
    <div v-if="open" class="absolute left-0 z-50 mt-2 w-80 max-w-[calc(100vw-16px)] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
      <div class="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <p class="text-sm font-semibold text-gray-900">Notifications</p>
        <p v-if="totalNew > 0" class="text-xs text-gray-500">{{ totalNew }} new</p>
      </div>

      <!-- Content -->
      <div class="p-2">
        <p v-if="loading" class="px-3 py-3 text-sm text-gray-500">Loading…</p>

        <template v-else>
          <!-- No notifications state -->
          <div v-if="totalNew === 0" class="px-3 py-6 text-center text-sm text-gray-400">
            No Notifications
          </div>

          <!-- Buttons (only render ones with count > 0) -->
          <div v-else class="flex flex-col">
            <NuxtLink v-for="item in visibleItems" :key="item.key" :to="item.to" class="group flex items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-50" @click="closeNavDropdown">
              <div class="flex items-center gap-2">
                <BaseIcon :name="item.icon" class="text-gray-500 group-hover:text-gray-700" />
                <span class="font-medium">{{ item.label }}</span>
              </div>
              <span class="inline-flex min-w-6 items-center justify-center rounded-full bg-gray-900 px-2 py-0.5 text-[12px] font-semibold text-white">
                {{ item.count }}
              </span>
            </NuxtLink>
          </div>
        </template>

        <!-- Optional small error line -->
        <p v-if="errorMsg" class="px-3 pt-2 text-xs text-red-600">
          {{ errorMsg }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const open = ref(false)
const root = ref<HTMLElement | null>(null)

const {
  loading,
  errorMsg,
  counts,
  totalNew,
  fetchNotifications
} = useAdminNotifications()

const items = computed(() => ([
  {
    key: 'ride_requests',
    label: 'Ride Requests',
    icon: 'material-symbols:directions-car-rounded',
    count: counts.value.rideRequestsNew,
    to: '/admin/correspondence/ride-requests'
  },
  {
    key: 'messages',
    label: 'Messages',
    icon: 'material-symbols:android-messages',
    count: counts.value.messagesNew,
    to: '/admin/correspondence/messages'
  },
  {
    key: 'applications',
    label: 'Applications',
    icon: 'streamline-freehand:job-briefcase-document',
    count: counts.value.applicationsNew,
    to: '/admin/correspondence/applications'
  }
] as const))

const visibleItems = computed(() => items.value.filter(i => i.count > 0))

function toggle() {
  open.value = !open.value
}

function closeNavDropdown() {
  open.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeNavDropdown()
}

function onClickOutside(e: MouseEvent) {
  const el = root.value
  if (!el) return
  const target = e.target as Node | null
  if (target && !el.contains(target)) closeNavDropdown()
}

let interval: ReturnType<typeof setInterval> | null = null

onMounted(async () => {
  await fetchNotifications()

  interval = setInterval(fetchNotifications, 10000)

  document.addEventListener('mousedown', onClickOutside)
  globalThis.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  if (interval) clearInterval(interval)
  document.removeEventListener('mousedown', onClickOutside)
  globalThis.removeEventListener('keydown', onKeydown)
})
</script>