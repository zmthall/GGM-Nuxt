<!-- layouts/error.vue -->
<template>
  <div class="min-h-screen flex flex-col justify-center items-center text-center p-8 bg-brand-background text-brand-primary">
    <h1 class="text-4xl font-bold mb-4">Oops!</h1>
    <p class="text-xl mb-2">An error occurred:</p>
    <p class="text-red-500 font-mono mb-6">{{ error.statusCode }} – {{ error.message }}</p>

    <NuxtLink to="/" class="text-brand-secondary underline hover:text-brand-primary">
      Go back home
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "ErrorPages"
})

defineProps<{
  error: {
    statusCode: number
    statusMessage?: string
    message: string
    stack?: string
  }
}>()
</script>