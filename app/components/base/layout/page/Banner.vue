<template>
    <div class="my-4 sm:my-8 mx-4 sm:mx-8 sm:rounded-lg sm:shadow-primary xl:max-w-[1200px] xl:mx-auto">
        <NuxtImg :src :alt sizes="xl:1200px md:75vw sm:100vw" format="webp,avif" quality="60" preload placeholder class="w-full sm:rounded-lg xl:object-cover xl:object-[10%] xl:h-[500px]" :height="imageHeight" :width="imageWidth" :title :loading />
    </div>
</template>

<script setup lang='ts'>

defineProps<{
    src?: string;
    alt?: string;
    title: string;
    loading: "lazy" | "eager"
    imageHeight: string;
    imageWidth: string;
}>()

</script>

<style>

</style>