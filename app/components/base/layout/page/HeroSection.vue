<template>
  <section class="relative h-[800px]">
    <div>
      <div class="absolute z-1 size-full bg-black/50" />
      <NuxtImg :src format="avif" width="800" quality="40" class="absolute size-full object-cover z-0"/>
    </div>
    <div :class="[{ 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2': centered }, styling, 'z-1 text-white max-sm:w-80 flex flex-col items-center']">
      <slot />
    </div>
  </section>
</template>

<script lang="ts" setup>
defineProps<{
  src: string;
  centered?: boolean;
  styling?: string;
}>()
</script>

<style>

</style>