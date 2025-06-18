<template>
  <div :class="['bg-black/60 p-10 sm:rounded-lg shadow-primary z-2', styling]">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  styling?: string;
}>()
</script>