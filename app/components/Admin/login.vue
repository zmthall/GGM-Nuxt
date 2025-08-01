<template>
    <div class="relative min-h-screen bg-[#121b75] overflow-hidden">
        <div class="w-full h-screen bg-brand-primary fixed flex justify-center">
            <NuxtLink to="/" class="flex items-center max-sm:text-xs text-white hover:text-brand-secondary group absolute top-3 left-3 no-active z-5"><BaseIcon name="mdi:arrow-top-left-bold-box-outline" color="text-white" hover-color="group-hover:text-brand-secondary" size="size-5 sm:size-7"/> Main Website</NuxtLink>
            <div
                class="absolute inset-0 pointer-events-none z-0 bg-[linear-gradient(to_top_right,_#eae39e10,_#121b7580_50%,_#121b7580_100%)]" />
            <div
                class="absolute inset-0 pointer-events-none z-0 bg-[linear-gradient(to_top_left,_#eae39e10,_#121b7580_50%,_#121b7580_100%)]" />
            <div class="w-full relative">
                <NuxtImg
                    class="w-[250px] mx-auto my-6 rounded-full shadow-sm shadow-gray-900 pointer-events-none select-none"
                    format="webp" quality="60"
                    height="300"
                    width="300"
                    title="Golden Gate Manor Inc logo"
                    loading="eager"
                    src="/images/GGM-Logo-Mobile_600.png" alt="Golden Gate Manor Main Logo" 
                    
                  />
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
const firebaseAuth = useFirebaseAuth()
const email = ref('');
const password = ref('');

const loginUser = async () => {
    await firebaseAuth?.loginUser(email.value, password.value)
}
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