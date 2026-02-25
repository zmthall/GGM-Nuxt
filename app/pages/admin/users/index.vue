<template>
  <div v-if="authStore.authorized && authStore.role !== 'correspondence'">
    <BaseLayoutPageSection bg="transparent" margin="top">
      <BaseLayoutPageContainer>
        <BaseLayoutCard :centered="false" class="w-full mx-auto" :has-padding="false">
          <AdminUsersTable
            :users="usersList"
            :loading="loading"
            :pagination="pagination"
            @prev-page="prevPage"
            @next-page="nextPage"
            @page-change="setPage"
            @change-role="({ user, role }) => updateUserRole(user.id, role)"
            @add-user="refresh"
          >
            <template #actions="{ user }">
              <div class="inline-flex items-center gap-2">
                <button
                  class="rounded-md border px-2.5 py-1 text-xs hover:bg-gray-100 w-max"
                  @click="sendPasswordResetEmail(user.id)"
                >
                  Reset PW
                </button>

                <button
                  v-if="authStore.user?.uid !== user.id"
                  class="rounded-md border px-2.5 py-1 text-xs hover:bg-gray-100 w-max"
                  @click="disableAccount(user.id)"
                >
                  {{ user.status === 'active' ? 'Disable' : 'Enable' }}
                </button>

                <button
                  v-if="authStore.user?.uid !== user.id"
                  class="rounded-md border px-2.5 py-1 text-white text-xs bg-red-600 hover:bg-red-800 w-max"
                  @click="deleteAccount(user.id)"
                >
                  Delete
                </button>
              </div>
            </template>
          </AdminUsersTable>
        </BaseLayoutCard>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
  </div>
  
   <div v-else-if="authStore.role === 'correspondence'">
    <BaseLayoutPageSection bg="transparent" margin="top">
      <BaseLayoutPageContainer>
        <BaseLayoutCard :centered="false">
          <div class="p-8 text-xl text-brand-main-text bg-zinc-300 rounded-xl shadow-primary mb-">
            <p>You do not have access to the User Management page. Please contact an administrator if you believe this is an error.</p>
          </div>
        </BaseLayoutCard>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
  </div>

  <div v-else>
    <AdminLogin />
  </div>
</template>

<script lang="ts" setup>
import type { UserData } from '~/models/admin/user'
import type { Pagination } from '~/models/Pagination'

definePageMeta({
  layout: 'admin',
  middleware: ['secure'],
  secure: {
    allowedRoles: ['admin'],
    forbiddenTo: '/admin',
  },
})

const authStore = useAuthStore()

// ---- state
const usersList  = ref<UserData[]>([])
const pagination = ref<Pagination | null>(null)
const page       = ref<number>(1)
const loading    = ref<boolean>(false)

// ---- infra
const API = 'https://api.goldengatemanor.com'
const listAbort = shallowRef<AbortController | null>(null)
onBeforeUnmount(() => listAbort.value?.abort())

const canFetch = computed(() => authStore.isFirebaseReady && authStore.authorized)
const getTokenOrNull = async (): Promise<string | null> => {
  const t = await authStore.getIdToken()
  return t ?? null
}

// ---- actions
const fetchUsers = async (isLoading = true, p = page.value, pageSize = 10) => {
  if (!canFetch.value) return null
  const token = await getTokenOrNull()
  if (!token) return null

  // cancel in-flight
  listAbort.value?.abort()
  listAbort.value = new AbortController()

  if (isLoading) loading.value = true
  try {
    const res = await $fetch<{ success: boolean; data: UserData[]; pagination: Pagination }>(
      '/api/users/admin/get-users',
      {
        baseURL: API,
        method: 'GET',
        query: { page: p, pageSize },
        headers: { Authorization: `Bearer ${token}` },
        signal: listAbort.value.signal,
      }
    )

    if (res.success) {
      usersList.value  = res.data
      pagination.value = res.pagination
      page.value       = res.pagination.currentPage ?? p
    }
    return res
  } catch (e) {
    // Ignore aborts; log other errors
    if (!(e instanceof DOMException && e.name === 'AbortError')) {
      console.error('fetchUsers:', (e as Error).message)
    }
    return null
  } finally {
    loading.value = false
  }
}

const refresh = async () => fetchUsers(false, page.value)

// pagination handlers (clamped)
const nextPage = () => {
  const next = (pagination.value?.currentPage ?? page.value) + 1
  if (pagination.value?.hasNextPage) fetchUsers(false, next)
}

const prevPage = () => {
  const prev = Math.max(1, (pagination.value?.currentPage ?? page.value) - 1)
  if (pagination.value?.hasPreviousPage || prev < (pagination.value?.currentPage ?? 2)) {
    fetchUsers(false, prev)
  }
}

const setPage = (p: number) => {
  const target = Math.max(1, p)
  fetchUsers(false, target)
}

const sendPasswordResetEmail = async (uid: string) => {
  if (!uid || !canFetch.value) return
  const token = await getTokenOrNull()
  if (!token) return

  try {
    return await $fetch<{ success: boolean }>(`/api/users/admin/change-password/${uid}`, {
      baseURL: API,
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (e) {
    console.error('sendPasswordResetEmail:', (e as Error).message)
  }
}

const updateUserRole = async (uid: string, role: string) => {
  if (!uid || !role || !canFetch.value) return
  const token = await getTokenOrNull()
  if (!token) return

  try {
    const res = await $fetch<{ success: boolean }>(`/api/users/admin/edit-user/${uid}/role`, {
      baseURL: API,
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: { role }, // $fetch will JSON.stringify for you
    })
    if (res.success) await refresh()
  } catch (e) {
    console.error('updateUserRole:', (e as Error).message)
  }
}

const disableAccount = async (uid: string) => {
  if (!uid || !canFetch.value) return
  const token = await getTokenOrNull()
  if (!token) return

  try {
    const res = await $fetch<{ success: boolean }>(`/api/users/admin/disable-user/${uid}`, {
      baseURL: API,
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (res.success) await refresh()
  } catch (e) {
    console.error('disableAccount:', (e as Error).message)
  }
}

const deleteAccount = async (uid: string) => {
  if (!uid || !canFetch.value) return
  const token = await getTokenOrNull()
  if (!token) return

  try {
    const res = await $fetch<{ success: boolean }>(`/api/users/admin/delete-user/${uid}`, {
      baseURL: API,
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (res.success) await refresh()
  } catch (e) {
    console.error('deleteAccount:', (e as Error).message)
  }
}

// 🔐 Only fetch when auth is ready + authorized; runs on reload & client nav
watch(
  () => authStore.isFirebaseReady && authStore.authorized,
  async ok => {
    if (ok) await fetchUsers(true, 1)
  },
  { immediate: true }
)
</script>