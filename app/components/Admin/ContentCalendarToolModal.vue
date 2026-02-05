<template>
  <BaseInteractiveModal v-model="modalOpen" :normal-modal="false" :padding="3" @close="emit('close')">
    <div class="overflow-y-auto my-2 overflow-x-hidden">
      <h2 class="mb-6 text-2xl text-brand-primary font-bold">Content Calendar</h2>

      <AdminContentCalendarTool :show-toolbar="true" :sync-url="true" :initial-data="initialCsv" @generated="onGenerated" />
    </div>
  </BaseInteractiveModal>
</template>

<script setup lang="ts">
const modalOpen = defineModel<boolean>({ default: true })

useHead({
  bodyAttrs: {
    class: computed(() => (modalOpen.value) ? 'no-scroll' : '')
  }
})

const props = withDefaults(defineProps<{
  csv?: string | null
}>(), {
  csv: null
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'generated', count: number): void
}>()

const initialCsv = computed(() => props.csv ?? '');

function onGenerated(posts: unknown[]) {
  emit('generated', Array.isArray(posts) ? posts.length : 0)
}
</script>
