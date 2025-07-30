<template>
    <div v-if="authStore.authorized">
        Account
    </div>
    <div v-else>
        <AdminLogin />
    </div>
</template>

<script setup lang='ts'>
const authStore = useAuthStore()

definePageMeta({
    layout: 'admin'
})

</script>

<style>

</style>