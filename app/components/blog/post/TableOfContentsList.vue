<template>
  <ul class="space-y-2">
    <li v-for="link in links" :key="link.id">
      <a
        :href="`#${link.id}`"
        :class="[
          'group block rounded-xl px-3 py-2 text-sm leading-snug transition-colors duration-200',
          activeId === link.id
            ? 'bg-brand-primary text-white font-semibold shadow-primary'
            : 'text-brand-primary hover:bg-brand-primary/8 hover:text-brand-primary'
        ]"
        @click="handleNavigate"
      >
        <span class="block">{{ link.text || formatFallbackText(link.id) }}</span>
      </a>

      <BlogPostTableOfContentsList
        v-if="link.children?.length"
        :links="link.children"
        :active-id="activeId"
        class="mt-2 ml-4 border-l border-brand-primary/10 pl-3"
        @navigate="emit('navigate')"
      />
    </li>
  </ul>
</template>

<script lang="ts" setup>
interface TocLink {
  id: string
  text?: string
  depth?: number
  children?: TocLink[]
}

defineProps<{
  links: TocLink[]
  activeId?: string
}>()

const emit = defineEmits<{
  navigate: []
}>()

const formatFallbackText = (value: string): string => {
  return value
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const handleNavigate = (): void => {
  emit('navigate')
}
</script>