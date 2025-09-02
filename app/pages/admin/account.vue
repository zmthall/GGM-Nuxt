<template>
    <div v-if="authStore.authorized">
        <BaseLayoutCard v-if="!loadingUserInfmormation" class="m-4 sm:w-1/2 sm:mx-auto mt-8 overflow-hidden" :centered="false" :has-padding="false">
            <h2 class="bg-brand-primary p-4 text-2xl text-white font-semibold">Account Information</h2>
            <div>
                <div class="p-4 bg-slate-100 flex justify-between items-end gap-4">
                    <div :class="{'w-3/4': editDisplayName}">
                        <h3 class="text-xl font-bold">Display Name</h3>
                        <div v-if="userInformation?.displayName.length !== 0 && !editDisplayName" class="text-black/50 font-bold">{{ userInformation?.displayName }}</div>
                        <div v-if="userInformation?.displayName.length === 0 && !editDisplayName" class="text-black/50 font-bold uppercase">Not Set</div>
                        <div v-if="editDisplayName" class="mt-2">
                            <BaseFormInput type="text" v-model="displayName"></BaseFormInput>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <button v-if="!editDisplayName" class="group flex" @click="openEdit"><BaseIcon name="material-symbols:edit-square" color="text-slate-300" hover-color="group-hover:text-brand-primary"/></button>
                        <button v-if="editDisplayName" class="group flex" @click="closeEdit"><BaseIcon name="material-symbols:cancel-rounded" color="text-red-200" hover-color="group-hover:text-red-600" /></button>
                        <button v-if="editDisplayName" class="group flex" @click="saveEdit"><BaseIcon name="material-symbols:check-circle-rounded" color="text-green-200" hover-color="group-hover:text-green-600" /></button>
                    </div>
                </div>
                <div class="p-4 flex justify-between items-center gap-4">
                    <div>
                        <h3 class="text-xl font-bold">Email</h3>
                        <div class="text-black/50 font-bold break-all">{{ userInformation?.email.toUpperCase() }}</div>
                    </div>
                    <div class="flex flex-col gap-2">
                        <button class="flex p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 disabled:bg-slate-400" :disabled="!canRequestPasswordReset" @click="passwordResetRequest">Password Reset</button>
                        <button v-if="!authStore.user?.emailVerified" class="flex p-2 bg-green-600 text-white rounded-lg hover:bg-green-800 justify-center" @click="emailVerificationRequest">Verify Email</button>
                    </div>
                </div>
                <div class="p-4 bg-slate-100 flex justify-between items-center gap-4">
                    <div>
                        <h3 class="text-xl font-bold">Role</h3>
                        <div class="text-black/50 font-bold">{{ userInformation?.role.toUpperCase() }}</div>
                    </div>
                </div>
                <div class="bg-brand-primary text-white flex justify-end gap-2 p-2">
                    <h3>Last Logged in:</h3>
                    <span>{{ dateFormat.formatLongDateTime(userInformation?.lastLogin) }}</span>
                </div>
            </div>
                 
        </BaseLayoutCard>
        <BaseLayoutCard v-else class="m-4 sm:w-1/2 sm:mx-auto mt-8 overflow-hidden">
            <div>
                Loading User Information...
            </div>
        </BaseLayoutCard>

        <div v-if="!loadingUserInfmormation && canSeeDeleteButton" class="flex justify-center my-6">
            <button class="flex p-2 bg-red-600 text-white rounded-lg hover:bg-red-800" @click="deleteAccountRequest">Delete Account</button>
        </div>
    </div>
    <div v-else>
        <AdminLogin />
    </div>
</template>

<script setup lang='ts'>
import { useDateFormat } from '~/composables/dates/dateFormat';
import type { FetchUser, UserData } from '~/models/admin/user';

const authStore = useAuthStore()

definePageMeta({
    layout: 'admin'
})

const dateFormat = useDateFormat();
const { refreshUser } = useAuthRefresh();

const userInformation = ref<UserData | null>(null);
const loadingUserInfmormation = ref<boolean>(true);
const editDisplayName = ref<boolean>(false);
const displayName = ref<string>("");

const getUserInformation = async (showLoading: boolean = true) => {
    if(showLoading)
        loadingUserInfmormation.value = true;
    try {
        const idToken = await authStore.getIdToken()
    
        const response = await $fetch<FetchUser>(`/api/users/profile`, {
            baseURL: 'https://api.goldengatemanor.com',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${idToken}`,
            }
        })
        
        if(response.data) {
            userInformation.value = response.data
            displayName.value = response.data.displayName;
        }
    } catch (error) {
        console.error((error as Error).message);
    } finally {
        loadingUserInfmormation.value = false;
    }
}

const openEdit = () => {
    editDisplayName.value = true;
}

const closeEdit = () => {
    editDisplayName.value = false;
    if(userInformation.value)
        displayName.value = userInformation.value.displayName;
    else displayName.value = ""
}

const saveEdit = async () => {
    if(displayName.value.length === 0 || displayName.value.length > 15) {
        closeEdit();
        return;
    } else {
        try {
            const idToken = await authStore.getIdToken()

            const response = await $fetch<FetchUser>('/api/users/profile', {
                baseURL: 'https://api.goldengatemanor.com',
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                },
                body: JSON.stringify({ displayName: displayName.value })
            })

            if(response.success) {
                getUserInformation(false);
                setTimeout(() => {
                    closeEdit();
                }, 100)
            } else closeEdit();
        } catch (error) {
            console.error((error as Error).message);
        }
    }
}

const canRequestPasswordReset = computed((): boolean => {
    if(userInformation.value?.lastPasswordReset) {
        const currentTime = Date.now();
        const lastResetTime = new Date(userInformation.value?.lastPasswordReset).getTime()
        const timeBetweenReset = (currentTime - lastResetTime)/(1000 * 60);
        
        if(timeBetweenReset < 30) {
            return false;
        } else return true;
    }

    return true;
})

const canSeeDeleteButton = computed((): boolean => {
    if(userInformation.value?.role === 'admin')
        return false

    return true;
})

const passwordResetRequest = async () => {
    try {
        const idToken = await authStore.getIdToken();

        await $fetch('/api/users/update-password-reset', {
            baseURL: 'https://api.goldengatemanor.com',
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${idToken}`,
            }
        })

        const response = await $fetch<FetchUser>('/api/users/profile/change-password', {
            baseURL: 'https://api.goldengatemanor.com',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${idToken}`,
            },
        })

        getUserInformation(false);

        if(response.success) {
            console.log(response)
        }
    } catch (error) {
        console.error((error as Error).message)
    }
}

console.log(authStore.user)

const emailVerificationRequest = async () => {
    try {
        const idToken = await authStore.getIdToken();

        const response = await $fetch<FetchUser>('/api/users/profile/send-verification', {
            baseURL: 'https://api.goldengatemanor.com',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${idToken}`,
            }
        })

        if(response.success) {
            setTimeout(async () => {
                await refreshUser();
            }, 1000 * 30)
            console.log(response);
        }
    } catch (error) {
        console.error((error as Error).message)
    }
}

const deleteAccountRequest = async () => {
    try {
        const idToken = await authStore.getIdToken();

        const response = await $fetch<FetchUser>('/api/users/profile/delete-user', {
            baseURL: 'https://api.goldengatemanor.com',
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${idToken}`,
            }
        });

        if(response.success) {
            console.log(response);
        }
    } catch (error) {
        console.error((error as Error).message)
    }
}

watch(() => authStore.user?.uid, (newUid, oldUid) => {
  if (newUid && newUid !== oldUid) {
    // Reset component state when user changes
    loadingUserInfmormation.value = true;
    userInformation.value = null;
    // Reload user data
    getUserInformation();
  }
});

onMounted(() => {
    getUserInformation();
})

</script>

<style>

</style>