<template>
  <div v-if="auth.authorized">
    <BaseLayoutCard
      v-if="!loadingUserInformation"
      class="m-4 sm:w-1/2 sm:mx-auto mt-8 overflow-hidden"
      :centered="false"
      :has-padding="false"
    >
      <h2 class="bg-brand-primary p-4 text-2xl text-white font-semibold">Account Information</h2>

      <div>
        <!-- Display Name -->
        <div class="p-4 bg-slate-100 flex justify-between items-end gap-4">
          <div :class="{ 'w-3/4': editDisplayName }">
            <h3 class="text-xl font-bold">Display Name</h3>

            <div v-if="!editDisplayName" class="text-black/50 font-bold">
              {{ userInformation?.displayName?.length ? userInformation.displayName : 'Not Set'.toUpperCase() }}
            </div>

            <div v-else class="mt-2">
              <BaseFormInput v-model="displayName" type="text" />
            </div>
          </div>

          <div class="flex gap-2">
            <button v-if="!editDisplayName" aria-label="Edit display name" class="group flex" @click="openEdit">
              <BaseIcon name="material-symbols:edit-square" color="text-slate-300" hover-color="group-hover:text-brand-primary"/>
            </button>
            <div v-else class="flex gap-2">
                <button aria-label="Cancel edit" class="group flex" @click="closeEdit">
                  <BaseIcon name="material-symbols:cancel-rounded" color="text-red-200" hover-color="group-hover:text-red-600"/>
                </button>
                <button aria-label="Save display name" class="group flex" @click="saveEdit">
                  <BaseIcon name="material-symbols:check-circle-rounded" color="text-green-200" hover-color="group-hover:text-green-600"/>
                </button>
            </div>
          </div>
        </div>

        <!-- Email + actions -->
        <div class="p-4 flex justify-between items-center gap-4">
          <div>
            <h3 class="text-xl font-bold">Email</h3>
            <div class="text-black/50 font-bold break-all">{{ userInformation?.email?.toUpperCase() }}</div>
          </div>

          <div class="flex flex-col gap-2">
            <button
              class="flex p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 disabled:bg-slate-400"
              :disabled="!canRequestPasswordReset || resetting"
              @click="passwordResetRequest"
            >
              {{ resetting ? 'Sending…' : 'Password Reset' }}
            </button>

            <button
              v-if="!auth.user?.emailVerified"
              class="flex p-2 bg-green-600 text-white rounded-lg hover:bg-green-800 justify-center disabled:bg-slate-400"
              :disabled="verifying"
              @click="emailVerificationRequest"
            >
              {{ verifying ? 'Sending…' : 'Verify Email' }}
            </button>
          </div>
        </div>

        <!-- Role -->
        <div class="p-4 bg-slate-100 flex justify-between items-center gap-4">
          <div>
            <h3 class="text-xl font-bold">Role</h3>
            <div class="text-black/50 font-bold">{{ userInformation?.role?.toUpperCase() }}</div>
          </div>
        </div>

        <!-- Last login -->
        <div class="bg-brand-primary text-white flex justify-end gap-2 p-2">
          <h3>Last Logged in:</h3>
          <span>{{ dateFormat.formatLongDateTime(userInformation?.lastLogin) }}</span>
        </div>
      </div>
    </BaseLayoutCard>

    <BaseLayoutCard v-else class="m-4 sm:w-1/2 sm:mx-auto mt-8 overflow-hidden">
      <div>Loading User Information...</div>
    </BaseLayoutCard>

    <div v-if="!loadingUserInformation && canSeeDeleteButton" class="flex justify-center my-6">
      <button class="flex p-2 bg-red-600 text-white rounded-lg hover:bg-red-800" @click="deleteAccountRequest">
        Delete Account
      </button>
    </div>
  </div>

  <div v-else>
    <AdminLogin />
  </div>
</template>

<script setup lang="ts">
import { useDateFormat } from '~/composables/dates/dateFormat'
import type { FetchUser, UserData } from '~/models/admin/user'

definePageMeta({ layout: 'admin' })

const auth = useAuthStore()
const dateFormat = useDateFormat()
const API = 'https://api.goldengatemanor.com'

// --- state
const userInformation = ref<UserData | null>(null)
const loadingUserInformation = ref<boolean>(true)
const editDisplayName = ref<boolean>(false)
const displayName = ref<string>('')

const verifying = ref(false)
const resetting = ref(false)
let verifyTimer: ReturnType<typeof setTimeout> | null = null

// --- helpers
const canFetch = computed(() => auth.isFirebaseReady && auth.authorized)
const currentName = computed(() => userInformation.value?.displayName ?? '')

// Name validation + “dirty” detection
const nameTrimmed = computed(() => displayName.value.trim())
const nameValid = computed(() => nameTrimmed.value.length >= 1 && nameTrimmed.value.length <= 15)
const nameDirty = computed(() => nameTrimmed.value !== currentName.value)

// --- abort controller for profile fetch
const profileAbort = shallowRef<AbortController | null>(null)
onBeforeUnmount(() => {
  profileAbort.value?.abort()
  if (verifyTimer) { clearTimeout(verifyTimer); verifyTimer = null }
})

const getUserInformation = async (showLoading = true) => {
  if (!canFetch.value) return
  const idToken = await auth.getIdToken()
  if (!idToken) return

  profileAbort.value?.abort()
  profileAbort.value = new AbortController()

  if (showLoading) loadingUserInformation.value = true
  try {
    const response = await $fetch<FetchUser>('/api/users/profile', {
      baseURL: API,
      method: 'GET',
      headers: { Authorization: `Bearer ${idToken}` },
      signal: profileAbort.value.signal
    })
    if (response.data) {
      userInformation.value = response.data
      displayName.value = response.data.displayName ?? ''
    }
  } catch (e) {
    if (!(e instanceof DOMException && e.name === 'AbortError')) {
      console.error('getUserInformation:', (e as Error).message)
    }
  } finally {
    loadingUserInformation.value = false
  }
}

const openEdit = () => { editDisplayName.value = true }
const closeEdit = () => {
  editDisplayName.value = false
  displayName.value = currentName.value
}

const saveEdit = async () => {
  if (!nameValid.value || !nameDirty.value) { closeEdit(); return }

  const idToken = await auth.getIdToken()
  if (!idToken) return

  try {
    const res = await $fetch<FetchUser>('/api/users/profile', {
      baseURL: API,
      method: 'PUT',
      headers: { Authorization: `Bearer ${idToken}` },
      body: { displayName: nameTrimmed.value }
    })
    if (res.success) {
      await getUserInformation(false)
      setTimeout(closeEdit, 100)
    } else {
      closeEdit()
    }
  } catch (e) {
    console.error('saveEdit:', (e as Error).message)
  }
}

const canRequestPasswordReset = computed(() => {
  const last = userInformation.value?.lastPasswordReset
  if (!last) return true
  const mins = (Date.now() - new Date(last).getTime()) / (1000 * 60)
  return mins >= 30
})

const canSeeDeleteButton = computed(() => userInformation.value?.role !== 'admin')

const passwordResetRequest = async () => {
  if (resetting.value) return
  resetting.value = true
  try {
    const idToken = await auth.getIdToken()
    if (!idToken) return

    await $fetch('/api/users/update-password-reset', {
      baseURL: API,
      method: 'PUT',
      headers: { Authorization: `Bearer ${idToken}` }
    })

    const response = await $fetch<FetchUser>('/api/users/profile/change-password', {
      baseURL: API,
      method: 'POST',
      headers: { Authorization: `Bearer ${idToken}` }
    })

    if (response.success) {
      await getUserInformation(false)
    }
  } catch (e) {
    console.error('passwordResetRequest:', (e as Error).message)
  } finally {
    resetting.value = false
  }
}

const { refreshUser } =
  (typeof useAuthRefresh === 'function' ? useAuthRefresh() : { refreshUser: async () => {} })

const emailVerificationRequest = async () => {
  if (verifying.value) return
  verifying.value = true
  try {
    const idToken = await auth.getIdToken()
    if (!idToken) return

    const res = await $fetch<FetchUser>('/api/users/profile/send-verification', {
      baseURL: API,
      method: 'POST',
      headers: { Authorization: `Bearer ${idToken}` }
    })

    if (res.success) {
      if (verifyTimer) clearTimeout(verifyTimer)
      verifyTimer = setTimeout(async () => {
        try {
          await refreshUser()
          await getUserInformation(false)
        } catch { /* noop */ }
      }, 30_000)
    }
  } catch (e) {
    console.error('emailVerificationRequest:', (e as Error).message)
  } finally {
    verifying.value = false
  }
}

const deleteAccountRequest = async () => {
  const idToken = await auth.getIdToken()
  if (!idToken) return

  try {
    const res = await $fetch<FetchUser>('/api/users/profile/delete-user', {
      baseURL: API,
      method: 'DELETE',
      headers: { Authorization: `Bearer ${idToken}` }
    })
    if (res.success) {
      // optional: sign out + redirect
      // await useFirebaseAuth()?.logoutUser()
      // await navigateTo('/admin/login')
    }
  } catch (e) {
    console.error('deleteAccountRequest:', (e as Error).message)
  }
}

// Refetch when auth is ready/logged-in; refetch when the user identity changes
watch(
  () => [auth.isFirebaseReady, auth.authorized, auth.user?.uid] as const,
  async ([ready, authed, uid]) => {
    if (!ready || !authed || !uid) return
    await getUserInformation(true) // will run once per identity
  },
  { immediate: true, flush: 'post' }
)
</script>