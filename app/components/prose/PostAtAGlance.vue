<template>
  <div 
    class="at-a-glance pl-4 pr-4 md:pl-6 md:pr-6 lg:pr-16 py-4 md:py-6 border border-black/20 rounded-lg shadow-interior mt-6"
    :class="{ 'max-[1000px]:w-max-none max-[1000px]:w-full max-[1250px]:w-4/5 min-[1250px]:w-full min-[1000px]:max-w-3xl': !fullWidth, 'w-full': fullWidth }"
    >
    <h2 
      class="font-bold border-b border-b-black/10 mb-2 text-brand-main-text"
      :class="{ 'text-xl': !fullWidth, 'text-2xl': fullWidth }"
      >At a Glance</h2>
    <div :class="{ 'text-lg min-[1000px]:text-sm': !fullWidth, 'text-xl': fullWidth }">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  fullWidth?: boolean
}>(),{
  fullWidth: false
})

</script>

<style>

</style>