<template>
  <section class="relative h-[800px]">
    <div>
      <div class="absolute z-1 size-full bg-black/50" />
      <NuxtImg src="/images/pages/home/hero.jpg" class="absolute size-full object-cover z-0"/>
    </div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white max-sm:w-80">
      <slot />
    </div>
  </section>
</template>

<script lang="ts" setup>

</script>

<style>

</style>