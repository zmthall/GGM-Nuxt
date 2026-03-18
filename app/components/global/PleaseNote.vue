<template>
  <div :class="{ 'text-[#A3150D] leading-tight': !darkMode, 'text-white leading-tight': darkMode }">
    <span class="underline font-bold">Please Note:</span> <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  darkMode?: boolean;
}>()
</script>

<style>

</style>