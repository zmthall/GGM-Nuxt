<!-- components/MapLink.vue -->
<template>
  <a
    :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`"
    class="group hover:text-brand-secondary"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="`Open ${label || address} in Google Maps`"
  >
    <slot />
    <span v-if="!$slots.default">{{ label || address }}</span>
  </a>
</template>

<script setup lang="ts">
defineProps<{ address: string; label?: string }>()
</script>
