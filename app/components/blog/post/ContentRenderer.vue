<script setup lang="ts">
const props = defineProps<{
  content: string
}>()

const showSkeleton = ref(true)
const mountMdc = ref(false)


watch(
  () => props.content,
  (content) => {
    if (!content) {
      showSkeleton.value = true
      mountMdc.value = false
      return
    }

    mountMdc.value = true
    showSkeleton.value = false
  },
  { immediate: true }
)
</script>

<template>
  <article class="blog-markdown prose prose-lg min-[1000px]:max-w-4xl">
    <div v-if="showSkeleton" class="space-y-8 animate-pulse">
      <div class="rounded-xl border border-zinc-300 bg-zinc-50 p-6 shadow-sm not-prose">
        <div class="h-8 w-48 rounded bg-zinc-200 mb-5" />
        <div class="space-y-4">
          <div class="h-5 w-full rounded bg-zinc-200" />
          <div class="h-5 w-11/12 rounded bg-zinc-200" />
          <div class="h-5 w-10/12 rounded bg-zinc-200" />
          <div class="h-5 w-full rounded bg-zinc-200" />
          <div class="h-5 w-9/12 rounded bg-zinc-200" />
          <div class="h-5 w-10/12 rounded bg-zinc-200" />
        </div>
      </div>

      <div class="not-prose">
        <div class="h-10 w-80 rounded bg-zinc-200 mb-4" />
        <div class="space-y-3">
          <div class="h-5 w-full rounded bg-zinc-200" />
          <div class="h-5 w-full rounded bg-zinc-200" />
          <div class="h-5 w-10/12 rounded bg-zinc-200" />
          <div class="h-5 w-full rounded bg-zinc-200" />
          <div class="h-5 w-11/12 rounded bg-zinc-200" />
          <div class="h-5 w-8/12 rounded bg-zinc-200" />
        </div>
      </div>

      <div class="not-prose">
        <div class="h-10 w-72 rounded bg-zinc-200 mb-4" />
        <div class="space-y-3">
          <div class="h-5 w-full rounded bg-zinc-200" />
          <div class="h-5 w-11/12 rounded bg-zinc-200" />
          <div class="h-5 w-full rounded bg-zinc-200" />
          <div class="h-5 w-9/12 rounded bg-zinc-200" />
          <div class="h-5 w-10/12 rounded bg-zinc-200" />
        </div>
      </div>
    </div>

    <MDC v-if="mountMdc" :value="props.content" tag="div" class="space-y-2" />
  </article>
</template>