<template>
    <div v-if="authStore.authorized">
        Dashboard
    </div>
    <div v-else>
        <AdminLogin />
    </div>
</template>

<script setup lang='ts'>
const authStore = useAuthStore()

definePageMeta({
    layout: 'admin',
})

defineOptions({
    name: 'AdminDashboard'
})

</script>

<style></style>