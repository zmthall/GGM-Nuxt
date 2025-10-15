<template>
    <div class="my-4 sm:my-8 mx-4 sm:mx-8 sm:rounded-lg sm:shadow-primary xl:max-w-[800px] xl:mx-auto">
        <NuxtImg :src :sizes :alt :format="format" densities="1" quality="70" :preload="{ fetchPriority: 'high' }" placeholder class="w-full h-auto sm:rounded-lg xl:object-cover xl:object-[10%]" :class="aspectRatio" :height="imageHeight" :width="imageWidth" :title loading="eager" />
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
    sizes?: string;
    format?: string;
}>(), {
    src: undefined,
    alt: undefined,
    aspectRatio: 'aspect-[4/3]',
    sizes: undefined,
    format: 'webp,avif'
})

</script>

<style>

</style>