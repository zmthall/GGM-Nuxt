<template>
  <div class="h-full flex justify-center items-center">
    <div class="flex justify-center items-center h-3/4 w-3/4">
      <NuxtLink :to class="hover:scale-105 transition-transform ease-in-out duration-500" :aria-label="label">
        <NuxtImg :src="imageSrc" class="h-full w-full object-contain hover:drop-shadow-logos transition-all ease-in-out duration-500" :alt="imageAlt" loading="lazy"/>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  to: string;
  imageSrc: string;
  label: string;
  imageAlt: string;
}>()

</script>

<style>

</style>