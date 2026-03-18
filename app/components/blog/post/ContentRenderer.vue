<script setup lang="ts">
const props = defineProps<{
  content: string
}>()
</script>

<template>
  <article class="blog-markdown prose prose-lg max-w-none">
    <MDC :value="props.content" tag="div" />
  </article>
</template>