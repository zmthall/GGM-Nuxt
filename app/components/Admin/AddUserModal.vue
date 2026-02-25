<template>
  <BaseInteractiveModal v-model="modalOpen" hide-close :padding="6">
    <h2 class="text-2xl text-brand-primary font-bold">Add a new User:</h2>
    <form class="h-full flex flex-col justify-between overflow-auto p-4" @submit.prevent="addUser">
      <div class="bg-[#d2d2ff] p-6 rounded-lg w-full relative my-2">
        <div>
          <div>
            <BaseFormInput v-model="newUser.displayName" label="Display Name" name="display-name" type="text"/>
          </div>
          <div>
            <BaseFormInput v-model="newUser.email" label="email" name="email"  type="email"/>
          </div>
          <div>
            <BaseFormInput v-model="newUser.password" label="password" name="password"  type="password"/>
          </div>
          <div>
            <BaseFormSelect v-model="newUser.role" label="Role" name="role" :labels="['Admin', 'User', 'Correspondence']" :values="['admin', 'user', 'correspondence']" />
          </div>
        </div>
      </div>
      <div class="flex justify-end gap-4 mt-8">
        <BaseUiAction type="button" class="py-4 px-8" @click="closeAddUser">Cancel</BaseUiAction>
        <BaseUiAction type="submit" class="py-4 px-8">Add User</BaseUiAction>
      </div>
    </form>
  </BaseInteractiveModal>
</template>

<script lang="ts" setup>
import type { AddUserData } from '~/models/admin/user';

const emit = defineEmits<{
  (e: 'add-user'): void  
}>()

const modalOpen = defineModel<boolean>();
const authStore = useAuthStore();

const newUser = ref<AddUserData>({
  email: '',
  password: '',
  displayName: 'User Account',
  role: 'user',
})

useHead({
  bodyAttrs: {
    class: computed(() => (modalOpen.value) ? 'no-scroll' : '')
  }
})

const closeAddUser = () => {
  modalOpen.value = false
  newUser.value = {
    email: '',
    password: '',
    displayName: 'User Account',
    role: 'user',
  }
}

const addUser = async () => {
  const addUserData = { ...newUser.value }

  try {
    const idToken = await authStore.getIdToken();
    const response = await $fetch(`/api/users/admin/create-user`, {
      baseURL: 'https://api.goldengatemanor.com',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addUserData)
    })

    if(response) {

      emit('add-user');
      closeAddUser();
    }
  } catch (err: unknown) {
    console.error('Failed to add user:', err)
  }
}
</script>

<style>

</style>