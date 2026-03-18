<script setup lang="ts">
const props = defineProps<{
  post: {
    tags?: string[]
  }
}>()

const expanded = ref(false)

const allTags = computed(() => props.post.tags ?? [])

const visibleTags = computed(() => {
  if (expanded.value) return allTags.value
  return allTags.value.slice(0, 2)
})

const hiddenTagCount = computed(() => {
  return Math.max(allTags.value.length - 2, 0)
})

const toggleExpanded = () => {
  expanded.value = !expanded.value
}
</script>

<template>
  <div v-if="allTags.length" class="mt-2 mb-7 flex flex-wrap gap-2 max-[1000px]:gap-1.5 max-[700px]:gap-2 max-[500px]:gap-1.5">
    <span
      v-for="tag in visibleTags"
      :key="tag"
      class="rounded-full border border-brand-primary/10 bg-brand-secondary/10 px-4 py-2 text-[0.875rem] text-brand-primary shadow-xlight min-[1001px]:max-[1180px]:px-3 min-[1001px]:max-[1180px]:py-1.5 min-[1001px]:max-[1180px]:text-[0.8rem] max-[1000px]:px-2.5 max-[1000px]:py-1 max-[1000px]:text-[0.9rem] max-[700px]:px-4 max-[700px]:py-2 max-[700px]:text-[0.875rem] max-[500px]:px-3 max-[500px]:py-1.5 max-[500px]:text-[0.75rem]"
    >
      {{ tag }}
    </span>

    <button
      v-if="hiddenTagCount > 0 || expanded"
      type="button"
      class="rounded-full border border-brand-primary/15 bg-brand-primary/6 px-4 py-2 text-[0.875rem] text-brand-primary shadow-xlight transition hover:border-brand-primary/20 hover:bg-brand-primary/10 min-[1001px]:max-[1180px]:px-3 min-[1001px]:max-[1180px]:py-1.5 min-[1001px]:max-[1180px]:text-[0.8rem] max-[1000px]:px-2.5 max-[1000px]:py-1 max-[1000px]:text-[0.9rem] max-[700px]:px-4 max-[700px]:py-2 max-[700px]:text-[0.875rem] max-[500px]:px-3 max-[500px]:py-1.5 max-[500px]:text-[0.75rem]"
      :aria-expanded="expanded"
      :aria-label="expanded ? 'Show fewer tags' : `Show ${hiddenTagCount} more tags`"
      @click="toggleExpanded"
    >
      {{ expanded ? 'Show less' : `+${hiddenTagCount} more` }}
    </button>
  </div>
</template>