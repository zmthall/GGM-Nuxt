<template>
  <div :class="[darkMode ? 'text-white leading-tight' : 'text-[#A3150D] leading-tight blog-post']">
    <div class="font-bold underline">
      Please Note:
    </div>
    <div class="[&>p]:m-0">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  darkMode?: boolean;
}>()
</script>

<style scoped>
#blog-post-article .blog-post-margin {
  @apply !my-4;
}
</style>