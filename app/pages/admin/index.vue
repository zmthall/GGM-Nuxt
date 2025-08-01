<template>
    <div v-if="authStore.authorized">
        Dashboard
    </div>
    <div v-else>
        <AdminLogin />
    </div>
</template>

<script setup lang='ts'>
definePageMeta({
    layout: 'admin',
})

defineOptions({
    name: 'AdminDashboard'
})

// Updated test function using auth store
const authStore = useAuthStore();


</script>

<style></style>