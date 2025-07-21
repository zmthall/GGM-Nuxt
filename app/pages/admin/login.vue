<template>
    <AdminLogin v-if="!authStore.authorized"/>
    <div v-else class="relative min-h-screen bg-[#121b75] overflow-hidden flex items-center justify-center">
        <h2 class="text-4xl text-brand-secondary uppercase">Redirecting to Dashboard...</h2>
    </div>
</template>

<script setup lang='ts'>
const authStore = useAuthStore()

definePageMeta({
    layout: 'admin'
})

defineOptions({
    name: 'AdminLoginPage'
})

// Watch for auth state changes and redirect when user becomes authorized
watch(() => authStore.authorized, (newValue) => {
  if (newValue === true) {
    setTimeout(() => {
        navigateTo('/admin')
    }, 1000);
  }
}, { immediate: true });

onMounted(() => {
    if(authStore.authorized)
        navigateTo({path: '/admin'})
})

</script>