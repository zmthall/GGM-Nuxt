<script setup lang="ts">
// Styles (static import is fine with Nuxt SSR)
import '@toast-ui/editor/dist/toastui-editor.css'
// import '@toast-ui/editor/dist/theme/toastui-editor-dark.css' // if you use theme="dark"

import type Editor from '@toast-ui/editor'
import type { ToolbarItem, EditorOptions } from '@toast-ui/editor'

// Props
const props = withDefaults(defineProps<{
  modelValue?: string
  height?: string
  previewStyle?: 'vertical' | 'tab'
  initialEditType?: 'markdown' | 'wysiwyg'
  autofocus?: boolean
  theme?: 'light' | 'dark'
  hideModeSwitch?: boolean
  toolbarItems?: (ToolbarItem | ToolbarItem[])[]
}>(), {
  modelValue: '',
  height: '400px',
  previewStyle: 'vertical',
  initialEditType: 'markdown',
  autofocus: false,
  theme: 'light',
  hideModeSwitch: false,
  toolbarItems: () => [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
    ['code', 'codeblock'],
  ] as (ToolbarItem | ToolbarItem[])[],
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'ready', instance: Editor): void
}>()

const el = ref<HTMLElement | null>(null)
let editor: Editor | null = null
const isDark = computed(() => props.theme === 'dark')

onMounted(async () => {
  // Type the constructor without using `any`
  type EditorCtor = new (opts: EditorOptions) => Editor
  const { default: EditorCtor } = await import('@toast-ui/editor') as unknown as { default: EditorCtor }

  editor = new EditorCtor({
    el: el.value as HTMLElement,
    height: props.height,
    initialEditType: props.initialEditType,
    previewStyle: props.previewStyle,
    autofocus: props.autofocus,
    hideModeSwitch: props.hideModeSwitch,
    theme: isDark.value ? 'dark' : undefined,
    toolbarItems: props.toolbarItems,
    initialValue: props.modelValue ?? '',
  })

  editor.on('change', () => emit('update:modelValue', editor!.getMarkdown()))
  emit('ready', editor)
})

watch(() => props.modelValue, (val) => {
  if (!editor) return
  const current = editor.getMarkdown()
  if (val !== current) editor.setMarkdown(val || '')
})

onBeforeUnmount(() => {
  editor?.destroy()
  editor = null
})
</script>

<template>
  <ClientOnly>
    <div ref="el" />
  </ClientOnly>
</template>

<style scoped>
:deep(.toastui-editor-defaultUI) { border-radius: 0.5rem; }
</style>
