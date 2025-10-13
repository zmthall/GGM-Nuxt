<template>
    <div class="my-4 sm:my-8 mx-4 sm:mx-8 sm:rounded-lg sm:shadow-primary xl:max-w-[1200px] xl:mx-auto">
        <NuxtImg :src :alt sizes="xl:1200px md:75vw sm:100vw" format="avif,webp" quality="60" :preload="{ fetchPriority: 'high' }" placeholder class="w-full sm:rounded-lg xl:object-cover xl:object-[10%] xl:h-[500px]" :class="aspectRatio" :height="imageHeight" :width="imageWidth" :title loading="eager" />
    </div>
</template>

<script setup lang='ts'>

withDefaults(defineProps<{
    src?: string;
    alt?: string;
    title: string;
    aspectRatio?: string;
    imageHeight: string;
    imageWidth: string;
}>(), {
    src: undefined,
    alt: undefined,
    aspectRatio: '4/3'
})

</script>

<style>

</style>