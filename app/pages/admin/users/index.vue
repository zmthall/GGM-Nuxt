<template>
  <div v-if="authStore.authorized">
    users
  </div>
  <div v-else>
    <AdminLogin />
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()

definePageMeta({
    layout: 'admin',
    middleware: ['restricted']
})

</script>

<style>

</style>