<script setup lang="ts">
const props = defineProps<{
  content: string
}>()
</script>

<template>
  <article class="blog-markdown prose prose-lg min-[1000px]:max-w-4xl">
    <MDC :value="props.content" tag="div" class="space-y-2"/>
  </article>
</template>