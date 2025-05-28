<template>
        <h1 v-if="!isHomePage && title" class="mx-4 pb-2 pt-8 border-b-2 border-b-brand-light-gray text-brand-primary text-2xl font-bold tracking-tight leading-snug">{{ title }}</h1>
</template>

<script setup lang='ts'>
defineProps<{
    title: string | undefined;
}>()

const route = useRoute()

const isHomePage = computed(() => {
    return route.path === '/'
})

</script>

<style>

</style>