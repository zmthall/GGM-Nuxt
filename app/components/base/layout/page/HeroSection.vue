<template>
  <section class="relative h-[800px] max-xs:h-[950px] w-full">
    <div>
      <div class="absolute z-1 size-full bg-black/50" />
      <NuxtImg :src format="avif" width="1280" height="720" :sizes="sizes" quality="40" class="absolute size-full object-cover z-0" fetchpriority="high" :preload="true" :alt :title :loading placeholder/>
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
  loading?: "lazy" | "eager";
  sizes?: string
}>(), {
  styling: undefined,
  title: undefined,
  loading: "lazy",
  sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1280px'
})
</script>

<style>

</style>