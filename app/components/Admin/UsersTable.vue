<!-- components/UsersTable.vue -->
<template>
  <BaseAdminTable
    title="Users"
    :rows="users"
    :columns="userCols"
    :loading="loading"
    :pagination="pagination"
    @prev-page="$emit('prev-page')"
    @next-page="$emit('next-page')"
    @page-change="(p: number) => $emit('page-change', p)"
  >
    <!-- Toolbar -->
    <template #toolbar>
      <BaseUiAction
        type="button"
        variant="secondary"
        class="py-2 px-4 group"
        :disabled="loading"
        @click="openAddAccountModal"
      >
        <span class="flex items-center gap-2">
          Add Account
          <BaseIcon
            name="material-symbols:add-circle"
            color="text-brand-primary"
            hover-color="group-hover:text-white"
            class="transition-colors duration-500 ease-in-out"
          />
        </span>
      </BaseUiAction>
    </template>

    <!-- Body: shell passes you 'rows' (already sorted) -->
    <template #tbody="{ rows }">
      <tr
        v-for="u in rows"
        :key="u.id"
        class="text-sm odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <!-- User -->
        <td class="px-4 py-3">
          <div class="font-medium text-gray-900">{{ u.displayName || u.email }}</div>
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
            <span
              v-else
              class="flex min-w-[60px] items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset"
              :class="u.role === 'admin'
                ? 'bg-red-50 text-red-700 ring-red-200'
                : 'bg-slate-50 text-slate-700 ring-slate-200'"
            >
              {{ u.role }}
            </span>
          </div>

          <!-- Teleported role menu -->
          <Teleport to="body">
            <div
              v-if="openRoleFor?.id === u.id"
              ref="roleMenuRef"
              class="z-[1000] fixed w-32 overflow-hidden rounded-md border bg-white shadow-lg"
              :style="roleMenuStyle"
              @click.stop
            >
              <button
                class="block w-full px-3 py-1.5 text-center text-sm hover:bg-gray-50"
                :class="u.role === 'admin' ? 'font-medium text-gray-900' : 'text-gray-700'"
                @click="selectRole(u, 'admin')"
              >
                Admin
              </button>
              <button
                class="block w-full px-3 py-1.5 text-center text-sm hover:bg-gray-50"
                :class="u.role === 'user' ? 'font-medium text-gray-900' : 'text-gray-700'"
                @click="selectRole(u, 'user')"
              >
                User
              </button>
              <button
                class="block w-full px-3 py-1.5 text-center text-sm hover:bg-gray-50"
                :class="u.role === 'correspondence' ? 'font-medium text-gray-900' : 'text-gray-700'"
                @click="selectRole(u, 'correspondence')"
              >
                Correspondence
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
          <div class="text-gray-900">{{ dateFormat.tableFormatDate(u.created_at) }}</div>
          <div v-if="u.created_by" class="text-xs text-gray-500">by {{ u.created_by }}</div>
        </td>

        <!-- Updated -->
        <td class="px-4 py-3">
          <div class="text-gray-900 w-max">{{ dateFormat.tableFormatDate(u.updated?.at) }}</div>
          <div v-if="u.updated?.by" class="text-xs text-gray-500">by {{ u.updated.by }}</div>
        </td>

        <!-- Last Login -->
        <td class="px-4 py-3">
          <div class="text-gray-900 w-max">{{ dateFormat.tableFormatDate(u.lastLogin) }}</div>
        </td>

        <!-- ID -->
        <td class="px-4 py-3 font-mono text-xs text-gray-600">
          {{ u.id }}
        </td>

        <!-- Actions (propagate to parent just like before) -->
        <td class="px-4 py-3 text-right">
          <slot name="actions" :user="u" />
        </td>
      </tr>
    </template>
  </BaseAdminTable>

  <!-- Add User Modal -->
  <AdminAddUserModal v-model="modalOpen" @add-user="$emit('add-user')" />
</template>

<script setup lang="ts">
import type { UserData } from '~/models/admin/user'
import type { Pagination } from '~/models/Pagination'
import { useDateFormat } from '../../composables/dates/dateFormat.js'

type UserRole = 'admin' | 'user' | 'correspondence'

/** Props & Emits */
const authStore = useAuthStore()
const dateFormat = useDateFormat()

defineProps<{
  users: UserData[]
  loading?: boolean
  pagination?: Pagination | null
}>()

const emit = defineEmits<{
  (e: 'edit', user: UserData): void
  (e: 'prev-page' | 'next-page' | 'add-user'): void
  (e: 'page-change', page: number): void
  (e: 'change-role', payload: { user: UserData; role: UserRole }): void
}>()

/** Columns: keys are strings; use accessor for nested updated.at */
const userCols = [
  { key: 'displayName', label: 'User', sortable: true },
  { key: 'role',        label: 'Role' },
  { key: 'status',      label: 'Status' },
  { key: 'created_at',  label: 'Created' },
  { key: 'updated',     label: 'Updated', accessor: (u: UserData) => u.updated?.at },
  { key: 'lastLogin',   label: 'Last Login' },
  { key: 'id',          label: 'ID' },
  { key: 'actions', label: 'Actions' }
]

/** Role dropdown (same as before) */
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

  let menuW = 112
  let menuH = 72
  if (menuEl) {
    menuW = menuEl.offsetWidth || menuW
    menuH = menuEl.offsetHeight || menuH
  }

  const gap = 6
  let top = rect.bottom + gap
  let left = rect.left

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

function closeRoleMenu() { openRoleFor.value = null }
function handleKey(e: KeyboardEvent) { if (e.key === 'Escape') closeRoleMenu() }
function handleResize() { if (openRoleFor.value) positionMenu() }

onMounted(() => {
  window.addEventListener('click', closeRoleMenu, true)
  window.addEventListener('keydown', handleKey)
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', closeRoleMenu, true)
})
onBeforeUnmount(() => {
  window.removeEventListener('click', closeRoleMenu, true)
  window.removeEventListener('keydown', handleKey)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', closeRoleMenu, true)
})

/** Modal */
const modalOpen = ref(false)
const openAddAccountModal = () => { modalOpen.value = true }
</script>
