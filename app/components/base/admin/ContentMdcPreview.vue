<script setup lang="ts">
const props = withDefaults(defineProps<{
  value?: string
  height?: string
}>(), {
  value: '',
  height: undefined
})

const scrollEl = ref<HTMLElement | null>(null)
const articleEl = ref<HTMLElement | null>(null)

const getScrollElement = (): HTMLElement | null => scrollEl.value
const getArticleElement = (): HTMLElement | null => articleEl.value
const getHeadingElement = (id: string): HTMLElement | null => {
  if (!articleEl.value) return null
  return articleEl.value.querySelector(`#${CSS.escape(id)}`) as HTMLElement | null
}

defineExpose({
  getScrollElement,
  getArticleElement,
  getHeadingElement
})
</script>

<template>
  <div
    class="w-full h-full min-w-0 min-h-0 rounded-xl border border-brand-primary/15 bg-white overflow-hidden"
    :style="props.height ? { height: props.height } : undefined"
  >
    <div
      ref="scrollEl"
      class="w-full h-full min-w-0 min-h-0 overflow-y-auto overflow-x-hidden p-4"
    >
      <article
        id="blog-post-article"
        ref="articleEl"
        class="blog-markdown prose prose-lg max-w-none w-full min-w-0"
      >
        <MDC v-if="props.value?.trim()" :value="props.value" tag="div" class="w-full min-w-0 space-y-2" />
        <div v-else class="text-sm text-zinc-500">
          Nothing to preview yet.
        </div>
      </article>
    </div>
  </div>
</template>