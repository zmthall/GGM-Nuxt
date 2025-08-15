<template>
  <div v-if="authStore.authorized">
    Users
    <button @click="testing">Testing</button>
  </div>
  <div v-else>
    <AdminLogin />
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()

definePageMeta({
    layout: 'admin'
})

const testing = async () => {
  const idToken = await authStore.getIdToken()

  const response = await $fetch(`/api/users/admin/get-users`, {
    baseURL: 'http://127.0.0.1:4000',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${idToken}`,
      'Content-Type': 'application/json'
    }
  })

  console.log(response)
}

</script>

<style>

</style>