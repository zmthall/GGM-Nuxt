<template>
  <ul class="contained-margin blog-post-margin list-disc text-brand-main-text">
    <slot />
  </ul>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.at-a-glance .contained-margin {
  @apply ml-6 lg:ml-8;
}

#blog-post-article .blog-post-margin {
  @apply ml-8 !mt-0.5;
}
</style>