<template>
    <div v-if="authStore.authorized">
        Messages
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
    middleware: ['restricted']
})
</script>

<style></style>