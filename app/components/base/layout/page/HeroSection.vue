<template>
  <section class="relative h-[800px] max-xs:h-[950px] w-full">
    <div>
      <div class="absolute z-1 size-full bg-black/50" />
      <NuxtImg :src format="webp,avif" :width="800" :height="400" densities="1" sizes="(max-width: 768px) 100vw, 800px" quality="70" class="absolute inset-0 w-full h-full object-cover z-0" :preload="{ fetchPriority: 'high' }" :alt :title loading="eager" />
    </div>
    <div :class="[{ 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2': centered }, styling, 'z-1 text-white max-sm:w-full sm:w-96 md:w-6/12 flex flex-col items-center']">
      <slot />
    </div>
  </section>
</template>

<script lang="ts" setup> 
withDefaults(defineProps<{
  src: string;
  centered?: boolean;
  styling?: string;
  alt: string;
  title?: string;
}>(), {
  styling: undefined,
  title: undefined,
})
</script>

<style>

</style>