<template>
  <NuxtLink :to="to" class="link">
    <slot />
  </NuxtLink>
</template>

<script lang="ts" setup>
defineProps<{
  to: string
}>()

</script>

<style>

</style>