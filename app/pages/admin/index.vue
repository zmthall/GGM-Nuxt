<template>
    <div v-if="hydrated && authStore.authorized === true">
        admin
        <button @click="logoutUser">Logout</button>
    </div>
    <div v-else />
</template>

<script setup lang='ts'>
import { useFirebaseAuth } from '../../composables/firebaseAuth.js';

definePageMeta({
    layout: 'admin',
    middleware: ['restricted']
})

defineOptions({
    name: 'AdminDashboard'
})

const firebaseAuth = useFirebaseAuth()
const authStore = useAuthStoreStore()
const hydrated = ref(false)

const logoutUser = async () => {
    const loggedOut = await firebaseAuth.logoutUser()
    if (loggedOut)
        navigateTo({ path: '/' })
}

onMounted(() => {
    hydrated.value = true
    if(authStore.authorized === false)
        navigateTo({path: '/'})
})
</script>

<style></style>