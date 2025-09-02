<template>
  <div v-if="authStore.authorized">
    <BaseLayoutPageSection bg="transparent" margin="top">
      <BaseLayoutPageContainer>
        <BaseLayoutCard :centered="false" class="w-full mx-auto" :has-padding="false">
            <AdminUsersTable
              :users="usersList"                 
              :loading="loading"            
              :pagination="pagination"       
              @prev-page="fetchUsers(false, --page)"
              @next-page="fetchUsers(false, ++page)"
              @page-change="(p) => { page = p; fetchUsers(false, page)}"
              @change-role="({ user, role }) => updateUserRole(user.id, role)"
              @add-user="fetchUsers(false)"
            >
            <template #actions="{ user }">
                <div class="inline-flex items-center gap-2">
                  <button class="rounded-md border px-2.5 py-1 text-xs hover:bg-gray-100 w-max" @click="sendPasswordResetEmail(user.id)">Reset PW</button>
                  <button v-if="authStore.user?.uid !== user.id" class="rounded-md border px-2.5 py-1 text-xs hover:bg-gray-100 w-max" @click="disableAccount(user.id)">
                    {{ user.status === 'active' ? 'Disable' : 'Enable' }}
                  </button>
                  <button v-if="authStore.user?.uid !== user.id" class="rounded-md border px-2.5 py-1 text-white text-xs bg-red-600 hover:bg-red-800 w-max" @click="deleteAccount(user.id)">Delete</button>
                </div>
              </template>
          </AdminUsersTable>
        </BaseLayoutCard>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
  </div>
  <div v-else>
    <AdminLogin />
  </div>
</template>

<script lang="ts" setup>
import type { UserData } from '~/models/admin/user';
import type { Pagination } from '~/models/Pagination';

const authStore = useAuthStore()

const usersList = ref<UserData[]>([])
const pagination = ref<Pagination | null>(null)
const page = ref<number>(1)
const loading = ref<boolean>(true);

watch(page, (newValue) => {
  console.log(newValue)
})

definePageMeta({
    layout: 'admin',
    middleware: ['secure'],
    secure: {
      allowedRoles: ['admin'],
      forbiddenTo: '/admin'
    }
})

const fetchUsers = async (isLoading: boolean = true, page: number = 1) => {
  if(isLoading)
    loading.value = true;
  try {
    const idToken = await authStore.getIdToken();

    const response = await $fetch<{ success: boolean, data: UserData[], pagination: Pagination }>(`/api/users/admin/get-users?page=${page}`, {
      baseURL: 'https://api.goldengatemanor.com',
      method: 'GET',
      headers: {
              'Authorization': `Bearer ${idToken}`,
          }
    })

    if(response.success) {
      usersList.value = response.data
      pagination.value = response.pagination
    }
  } catch (error) {
    console.log((error as Error).message)
  } finally {
    loading.value = false;
  }
}

const sendPasswordResetEmail = async (uid: string) => {
  if(!uid) return;

  try {
    const idToken = await authStore.getIdToken();

    const response = await $fetch<{ success: boolean }>(`/api/users/admin/change-password/${uid}`, {
      baseURL: 'https://api.goldengatemanor.com',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken}`,
      }
    })

    return response
  } catch (error) {
    console.log((error as Error).message)
  }
}

const updateUserRole = async (uid: string, role: string) => {
  if(!uid || !role) return;

  try {
    const idToken = await authStore.getIdToken()

    const response = await $fetch<{ success: boolean}>(`/api/users/admin/edit-user/${uid}/role`, {
      baseURL: 'https://api.goldengatemanor.com',
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${idToken}`,
      },
      body: JSON.stringify({ role })
    })

    if(response.success) {
      fetchUsers(false);
    }
  } catch (error) {
    console.log((error as Error).message)
  }
}

const disableAccount = async (uid: string) => {
  if(!uid) return;

  try {
    const idToken = await authStore.getIdToken();

    const response = await $fetch<{ success: boolean }>(`/api/users/admin/disable-user/${uid}`, {
      baseURL: 'https://api.goldengatemanor.com',
      method: 'PUT',
      headers: {
              'Authorization': `Bearer ${idToken}`,
          }
    })

    if(response.success) {
      fetchUsers(false);
    }
  } catch (error) {
    console.log((error as Error).message)
  }
}

const deleteAccount = async (uid: string) => {
  if(!uid) return;
  try {
    const idToken = await authStore.getIdToken();

    const response = await $fetch<{ success: boolean }>(`/api/users/admin/delete-user/${uid}`, {
      baseURL: 'https://api.goldengatemanor.com',
      method: 'DELETE',
      headers: {
              'Authorization': `Bearer ${idToken}`,
          }
    })

    if(response.success) {
      fetchUsers(false);
    }
  } catch (error) {
    console.log((error as Error).message)
  }
}

onMounted(() => {
  fetchUsers()
})

</script>

<style>

</style>