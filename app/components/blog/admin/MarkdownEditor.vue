<script setup lang="ts">
import '@toast-ui/editor/dist/toastui-editor.css'

import type Editor from '@toast-ui/editor'
import type { ToolbarItem, EditorOptions } from '@toast-ui/editor'

const props = withDefaults(defineProps<{
  height?: string
  autofocus?: boolean
  theme?: 'light' | 'dark'
  toolbarItems?: (ToolbarItem | ToolbarItem[])[]
}>(), {
  height: undefined,
  autofocus: false,
  theme: 'light',
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

const modelValue = defineModel<string>({ default: '' })

const el = ref<HTMLElement | null>(null)
let editor: Editor | null = null

const isDark = computed(() => props.theme === 'dark')

const getRootElement = (): HTMLElement | null => {
  return el.value?.querySelector('.toastui-editor-defaultUI') as HTMLElement | null
}

const getScrollElement = (): HTMLElement | null => {
  const root = getRootElement()
  if (!root) return null

  return (
    root.querySelector('.ProseMirror') as HTMLElement | null
  ) ?? (
    root.querySelector('.toastui-editor-md-container .ProseMirror') as HTMLElement | null
  ) ?? null
}

defineExpose({
  getRootElement,
  getScrollElement,
  getEditorInstance: () => editor
})

onMounted(async () => {
  type EditorCtor = new (opts: EditorOptions) => Editor
  const { default: EditorCtor } = await import('@toast-ui/editor') as unknown as { default: EditorCtor }

  editor = new EditorCtor({
    el: el.value as HTMLElement,
    height: props.height || '100%',
    initialEditType: 'markdown',
    previewStyle: 'tab',
    hideModeSwitch: true,
    autofocus: props.autofocus,
    theme: isDark.value ? 'dark' : undefined,
    toolbarItems: props.toolbarItems,
    initialValue: modelValue.value ?? '',
  })

  editor.on('change', () => {
    if (!editor) return
    emit('update:modelValue', editor.getMarkdown())
  })

  emit('ready', editor)
})

watch(() => modelValue.value, (val) => {
  if (!editor) return
  const current = editor.getMarkdown()
  if ((val || '') !== current) editor.setMarkdown(val || '', false)
})

onBeforeUnmount(() => {
  editor?.destroy()
  editor = null
})
</script>

<template>
  <ClientOnly>
    <div ref="el" class="w-full h-full min-w-0 min-h-0" />
  </ClientOnly>
</template>

<style scoped>
:deep(.toastui-editor-defaultUI) {
  border-radius: 0.75rem;
  width: 100%;
  height: 100%;
}

:deep(.toastui-editor-mode-switch) {
  display: none !important;
}

:deep(.toastui-editor-md-tab-container) {
  display: none !important;
}

:deep(.toastui-editor-md-preview) {
  display: none !important;
}

:deep(.toastui-editor-main) {
  display: block !important;
  width: 100%;
  height: 100%;
}

:deep(.toastui-editor-md-container) {
  width: 100% !important;
  height: 100% !important;
}

:deep(.toastui-editor-md-container .ProseMirror) {
  min-height: 100% !important;
}

:deep(.toastui-editor-toolbar) {
  flex-shrink: 0;
}
</style>