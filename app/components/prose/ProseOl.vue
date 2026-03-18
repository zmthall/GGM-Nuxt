<template>
  <ul class="blog-post-margin list-decimal text-brand-main-text">
    <slot />
  </ul>
</template>

<script lang="ts" setup>

</script>

<style scoped>
#blog-post-article .blog-post-margin {
  @apply ml-8 !mt-0.5;
}
</style>