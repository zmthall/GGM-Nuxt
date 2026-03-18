<template>
  <div
    :class="[
      darkMode ? 'text-white' : 'text-[#A3150D]',
      'rounded-lg leading-snug blog-post-margin'
    ]"
  >
    <p class="m-0">
      <span class="underline font-bold">Please Note:</span>
      <slot />
    </p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  darkMode?: boolean
}>()
</script>

<style scoped>
#blog-post-article .blog-post-margin {
  @apply !my-4;
}
</style>