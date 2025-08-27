<!-- components/UsersTable.vue -->
<template>
  <div>
    <!-- Toolbar -->
    <div class="mb-3 flex items-center justify-end p-2 bg-brand-primary">
      <BaseUiAction
        type="button"
        variant="secondary"
        class="py-2 px-4 group"
        :disabled="loading"
        @click="openAddAccountModal"
      >
        <span class="flex items-center gap-2">Add Account <BaseIcon name="material-symbols:add-circle" color="text-brand-primary" hover-color="group-hover:text-white" class="transition-colors duration-500 ease-in-out"/></span>
      </BaseUiAction>
    </div>

    <AdminAddUserModal v-model="modalOpen" @add-user="emit('add-user')" />

    <!-- Table -->
    <div class="w-full overflow-x-auto p-2">
      <table class="min-w-[900px] w-full border-collapse">
        <thead>
          <tr class="bg-gray-50 text-left text-sm font-semibold text-gray-700">
            <th
              v-for="col in columns"
              :key="col.key"
              scope="col"
              class="px-4 py-3 border-b border-gray-200 select-none cursor-pointer"
              @click="onSort(col.key)"
            >
              <div class="flex items-center gap-1">
                <span>{{ col.label }}</span>
                <span v-if="sort.key === col.key" aria-hidden="true">
                  <svg v-if="sort.dir === 'asc'" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path d="M10 6l-5 6h10L10 6z"/></svg>
                  <svg v-else class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path d="M10 14l5-6H5l5 6z"/></svg>
                </span>
              </div>
            </th>
            <th class="px-4 py-3 border-b border-gray-200 text-left">Actions</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-100">
          <tr v-if="loading" class="animate-pulse">
            <td colspan="9" class="px-4 py-6 text-center text-gray-500">Loading users…</td>
          </tr>

          <tr v-else-if="sortedUsers.length === 0">
            <td colspan="9" class="px-4 py-6 text-center text-gray-500">No users found.</td>
          </tr>

          <tr
            v-else
            v-for="u in sortedUsers"
            :key="u.id"
            class="text-sm odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <!-- User -->
            <td class="px-4 py-3">
              <div class="font-medium text-gray-900">
                {{ u.displayName || u.email }}
              </div>
              <div class="text-gray-500">{{ u.email }}</div>
            </td>

            <!-- Role (badge + dropdown via Teleport) -->
            <td class="px-4 py-3">
              <div class="inline-block">
                <button
                  v-if="authStore.user?.uid !== u.id"
                  type="button"
                  class="inline-flex items-center gap-1 focus:outline-none"
                  @click.stop="openRoleMenu($event, u)"
                >
                  <span
                    class="flex min-w-[60px] items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset"
                    :class="u.role === 'admin'
                      ? 'bg-red-50 text-red-700 ring-red-200'
                      : 'bg-slate-50 text-slate-700 ring-slate-200'"
                  >
                    {{ u.role }}
                    <svg class="h-3 w-3 opacity-70" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M10 14l5-6H5l5 6z" />
                    </svg>
                  </span>
                </button>
                <span v-else
                  class="flex min-w-[60px] items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset"
                  :class="u.role === 'admin'
                    ? 'bg-red-50 text-red-700 ring-red-200'
                    : 'bg-slate-50 text-slate-700 ring-slate-200'"
                >
                  {{ u.role }}
                </span>
              </div>

              <!-- Teleported menu -->
              <Teleport to="body">
                <div
                  v-if="openRoleFor?.id === u.id"
                  ref="roleMenuRef"
                  class="z-[1000] fixed w-28 overflow-hidden rounded-md border bg-white shadow-lg"
                  :style="roleMenuStyle"
                  @click.stop
                >
                  <button
                    class="block w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50"
                    :class="u.role === 'admin' ? 'font-medium text-gray-900' : 'text-gray-700'"
                    @click="selectRole(u, 'admin')"
                  >
                    Admin
                  </button>
                  <button
                    class="block w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50"
                    :class="u.role === 'user' ? 'font-medium text-gray-900' : 'text-gray-700'"
                    @click="selectRole(u, 'user')"
                  >
                    User
                  </button>
                </div>
              </Teleport>
            </td>

            <!-- Status -->
            <td class="px-4 py-3">
              <span
                class="flex min-w-[60px] items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset"
                :class="u.status === 'active'
                  ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                  : 'bg-rose-50 text-rose-700 ring-rose-200'"
              >
                {{ u.status }}
              </span>
            </td>

            <!-- Created -->
            <td class="px-4 py-3">
              <div class="text-gray-900">{{ formatDate(u.created_at) }}</div>
              <div v-if="u.created_by" class="text-xs text-gray-500">by {{ u.created_by }}</div>
            </td>

            <!-- Updated -->
            <td class="px-4 py-3">
              <div class="text-gray-900 w-max">{{ formatDate(u.updated?.at) }}</div>
              <div v-if="u.updated?.by" class="text-xs text-gray-500">by {{ u.updated.by }}</div>
            </td>

            <!-- Last Login -->
            <td class="px-4 py-3">
              <div class="text-gray-900 w-max">{{ formatDate(u.lastLogin) }}</div>
            </td>

            <!-- ID -->
            <td class="px-4 py-3 font-mono text-xs text-gray-600">
              {{ u.id }}
            </td>

            <!-- Actions -->
            <td class="px-4 py-3 text-right">
              <slot name="actions" :user="u">

              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination footer -->
    <div
      v-if="pagination && showPagination"
      class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t px-4 py-3 bg-white"
    >
      <div class="text-sm text-gray-600">
        <span v-if="pagination.totalCount > 0">
          {{ pageStart }}-{{ pageEnd }} of {{ pagination.totalCount }}
        </span>
        <span v-else>0 of 0</span>
      </div>

      <div class="flex items-center gap-3">
        <span class="text-sm text-gray-600">
          Page {{ pagination.currentPage }} of {{ pagination.totalPages }}
        </span>

        <div class="flex items-center gap-1">
          <button
            class="rounded-md border px-3 py-1.5 text-sm disabled:opacity-40"
            :disabled="!pagination.hasPreviousPage"
            @click="gotoPrev"
          >
            ‹ Prev
          </button>
          <button
            class="rounded-md border px-3 py-1.5 text-sm disabled:opacity-40"
            :disabled="!pagination.hasNextPage"
            @click="gotoNext"
          >
            Next ›
          </button>
        </div>

        <label class="sr-only" for="pageSelect">Jump to page</label>
        <select
          id="pageSelect"
          class="rounded-md border px-2 py-1 text-sm"
          :value="pagination.currentPage"
          @change="onPageSelect"
        >
          <option v-for="p in pagination.totalPages" :key="p" :value="p">
            Page {{ p }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AdminAddUserModal } from '#components';
import type { UserData } from '~/models/admin/user'
import type { Pagination } from '~/models/Pagination'

type UserRole = 'admin' | 'user'

type SortKey = keyof Pick<UserData,
  'email' | 'displayName' | 'role' | 'status' | 'created_at' | 'updated' | 'lastLogin' | 'id' >

/** Props & Emits */
const authStore = useAuthStore();

const props = defineProps<{
  users: UserData[]
  loading?: boolean
  pagination?: Pagination | null
}>()

const emit = defineEmits<{
  (e: 'edit', user: UserData): void
  (e: 'prev-page'): void
  (e: 'next-page'): void
  (e: 'page-change', page: number): void
  (e: 'change-role', payload: { user: UserData; role: UserRole }): void
  (e: 'add-user'): void
}>()

/** Loading */
const loading = computed(() => props.loading === true)

/** Columns & sorting */
const columns: Array<{ key: SortKey; label: string }> = [
  { key: 'displayName', label: 'User' },
  { key: 'role',        label: 'Role' },
  { key: 'status',      label: 'Status' },
  { key: 'created_at',  label: 'Created' },
  { key: 'updated',     label: 'Updated' },
  { key: 'lastLogin',   label: 'Last Login' },
  { key: 'id',          label: 'ID' },
]

const sort = reactive<{ key: SortKey; dir: 'asc' | 'desc' }>({
  key: 'created_at',
  dir: 'desc',
})

function onSort(key: SortKey) {
  if (sort.key === key) sort.dir = sort.dir === 'asc' ? 'desc' : 'asc'
  else { sort.key = key; sort.dir = 'asc' }
}

const sortedUsers = computed(() => {
  const list = [...(props.users || [])]
  const { key, dir } = sort
  const factor = dir === 'asc' ? 1 : -1

  return list.sort((a, b) => {
    const va = normalize(a[key], key, a)
    const vb = normalize(b[key], key, b)
    if (va < vb) return -1 * factor
    if (va > vb) return 1 * factor
    return 0
  })
})

function normalize(val: unknown, key: SortKey, u: UserData): string | number {
  if (key === 'displayName') return (u.displayName || u.email || '').toLowerCase()
  if (key === 'id') return String((u.id || '')).toLowerCase()
  if (key === 'updated') {
    const t = Date.parse(String(u.updated?.at ?? ''))
    return isNaN(t) ? 0 : t
  }
  if (key.endsWith('_at') || key === 'lastLogin') {
    const t = Date.parse(String(val ?? ''))
    return isNaN(t) ? 0 : t
  }
  if (typeof val === 'string') return val.toLowerCase()
  if (typeof val === 'number') return val
  if (typeof val === 'boolean') return val ? 1 : 0
  return String(val ?? '')
}

/** Role dropdown (Teleport) */
const openRoleFor = ref<UserData | null>(null)
const roleMenuRef = ref<HTMLElement | null>(null)
const roleMenuStyle = ref<Record<string, string>>({})
let roleTriggerEl: HTMLElement | null = null

function openRoleMenu(e: MouseEvent, user: UserData) {
  openRoleFor.value = user
  roleTriggerEl = e.currentTarget as HTMLElement
  nextTick(positionMenu)
}

function positionMenu() {
  if (!roleTriggerEl) return
  const rect = roleTriggerEl.getBoundingClientRect()
  const menuEl = roleMenuRef.value

  let menuW = 112 // w-28
  let menuH = 72  // approx height
  if (menuEl) {
    menuW = menuEl.offsetWidth || menuW
    menuH = menuEl.offsetHeight || menuH
  }

  const gap = 6
  let top = rect.bottom + gap
  let left = rect.left

  // flip if not enough room below
  if (top + menuH > window.innerHeight) {
    top = rect.top - menuH - gap
  }

  const pad = 8
  if (left + menuW > window.innerWidth - pad) left = window.innerWidth - menuW - pad
  if (left < pad) left = pad

  roleMenuStyle.value = { top: `${Math.max(pad, top)}px`, left: `${left}px` }
}

function selectRole(user: UserData, role: UserRole) {
  openRoleFor.value = null
  if (user.role !== role) emit('change-role', { user, role })
}

// close on outside click / Esc; reposition on resize
function closeRoleMenu() { openRoleFor.value = null }
function handleKey(e: KeyboardEvent) { if (e.key === 'Escape') closeRoleMenu() }
function handleResize() {
  if (openRoleFor.value) positionMenu()
}

onMounted(() => {
  window.addEventListener('click', closeRoleMenu, true)
  window.addEventListener('keydown', handleKey)
  window.addEventListener('resize', handleResize)
  // close on any scroll to avoid mismatch while the table scrolls
  window.addEventListener('scroll', closeRoleMenu, true)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', closeRoleMenu, true)
  window.removeEventListener('keydown', handleKey)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', closeRoleMenu, true)
})

/** Pagination helpers */
const pagination = computed(() => props.pagination || undefined)

const pageStart = computed(() => {
  const p = pagination.value
  if (!p || p.totalCount === 0) return 0
  return (p.currentPage - 1) * p.pageSize + 1
})
const pageEnd = computed(() => {
  const p = pagination.value
  if (!p) return 0
  return Math.min(p.currentPage * p.pageSize, p.totalCount)
})

function gotoPrev() { if (pagination.value?.hasPreviousPage) emit('prev-page') }
function gotoNext() { if (pagination.value?.hasNextPage) emit('next-page') }
function onPageSelect(e: Event) {
  const val = Number((e.target as HTMLSelectElement).value)
  if (!Number.isNaN(val)) emit('page-change', val)
}
const showPagination = computed(() => (props.pagination?.totalPages ?? 0) > 1)

/** Date formatting */
function formatDate(iso?: string) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (isNaN(d.getTime())) return '—'
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric', month: 'short', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  }).format(d)
}

// Add User Modal
const modalOpen = ref<boolean>(false)

const openAddAccountModal = () => {
  modalOpen.value = true;
}
</script>
