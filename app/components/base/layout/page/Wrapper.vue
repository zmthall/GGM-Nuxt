<template>
    <div :class="['w-full mx-auto', { 'max-w-7xl': margin}]">
      <slot />
    </div>
  </template>
  
  <script setup lang="ts">
  defineOptions({
    name: 'BaseLayoutPageWrapper'
  })

  withDefaults(defineProps<{
    margin?: boolean;
  }>(), {
    margin: false,
  })
  </script>