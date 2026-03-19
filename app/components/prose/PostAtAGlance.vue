<template>
  <div class="at-a-glance max-[1000px]:w-max-none max-[1000px]:w-full max-[1250px]:w-4/5 min-[1250px]:w-full pl-4 pr-4 md:pl-6 md:pr-6 lg:pr-16 min-[1000px]:max-w-3xl py-4 md:py-6 border border-black/20 rounded-lg shadow-interior mt-6">
    <h2 class="font-bold border-b border-b-black/10 mb-2 text-xl text-brand-main-text">At a Glance</h2>
    <div class="text-lg min-[1000px]:text-sm">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>