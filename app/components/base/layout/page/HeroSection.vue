<template>
  <section class="relative h-[800px] w-full">
    <div>
      <div class="absolute z-1 size-full bg-black/50" />
      <NuxtImg :src format="avif" width="800" height="301" quality="40" class="absolute size-full object-cover z-0" :alt :title :loading/>
    </div>
    <div :class="[{ 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2': centered }, styling, 'z-1 text-white max-sm:w-80 flex flex-col items-center']">
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
}>(), {
  styling: undefined,
  title: undefined,
  loading: "lazy"
})
</script>

<style>

</style>