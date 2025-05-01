<template>
    <div class="relative min-h-screen bg-[#121b75] overflow-hidden">
        <div class="w-full h-screen bg-brand-primary fixed flex justify-center">
            <div
                class="absolute inset-0 pointer-events-none z-0 bg-[linear-gradient(to_top_right,_#eae39e10,_#121b7580_50%,_#121b7580_100%)]" />
            <div
                class="absolute inset-0 pointer-events-none z-0 bg-[linear-gradient(to_top_left,_#eae39e10,_#121b7580_50%,_#121b7580_100%)]" />
            <div class="w-full relative">
                <img 
                    class="w-[250px] mx-auto my-6 rounded-full shadow-sm shadow-gray-900 pointer-events-none select-none"
                    src="/images/GGM-Logo-Mobile_600.webp" alt="Golden Gate Manor Main Logo">
                <form 
                    class="responsiveness z-2 bg-gray-300 border-y-2 border-y-brand-secondary"
                    @submit.prevent="loginUser">
                    <h1 class="text-2xl font-bold text-brand-primary text-center mb-2">Admin Login</h1>
                    <BaseFormInput 
                        v-model="email" name="email" type="email" label="Email:"
                        placeholder="email@email.com" autocomplete="email" />
                    <BaseFormInput 
                        v-model="password" name="password" type="password" label="password:"
                        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                        autocomplete="current-password" />
                    <BaseUiAction type="submit" class="w-full mt-6 p-2">Login</BaseUiAction>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
definePageMeta({
    layout: 'admin'
})

// useSeoMeta({
//   title: '',
//   ogTitle: '',
//   description: '',
//   ogDescription: '',
//   ogImage: '',
//   twitterCard: 'summary_large_image',
// })

defineOptions({
    name: 'AdminLoginPage'
})

const firebaseAuth = useFirebaseAuth()
const email = ref('');
const password = ref('');

const loginUser = async () => {
    const userCredentials = await firebaseAuth.loginUser(email.value, password.value)
    if(userCredentials)
        navigateTo({path: '/admin'})
}

onMounted(() => {
    const currentUser = firebaseAuth.getCurrentUser()
    if(currentUser)
        navigateTo({path: '/admin'})
})
</script>

<style scoped>
.responsiveness {
    @apply max-sm:w-full 2xs:pt-4 2xs:pb-6 2xs:px-4 sm:rounded-lg max-sm:rounded-none max-sm:mx-0 sm:mx-auto sm:w-3/4 md:max-w-[600px];
}

html,
body {
    background-color: #121b75;
    margin: 0;
    padding: 0;
    height: 100%;
}
</style>