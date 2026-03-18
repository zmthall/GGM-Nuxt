<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="my-6 rounded-xl border border-brand-primary/20 bg-brand-primary/5 p-5">
    <h3 v-if="title" class="mb-2 text-lg font-semibold text-brand-primary">
      {{ title }}
    </h3>

    <div>
      <slot />
    </div>
  </div>
</template>