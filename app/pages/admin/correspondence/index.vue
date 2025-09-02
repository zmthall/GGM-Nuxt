<template>
    <div v-if="authStore.authorized">
        Correspondence
    </div>
    <div v-else>
        <AdminLogin />
    </div>
</template>

<script setup lang='ts'>
const authStore = useAuthStore()
defineOptions({
    name: 'AdminMessagesPage'
})

definePageMeta({
    layout: 'admin',
})
</script>

<style></style>