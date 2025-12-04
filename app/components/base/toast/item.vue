// components/Base/Toast/Item.vue
<template>
  <div 
    :class="[
      'p-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-md',
      'backdrop-blur-sm border',
      colorClasses
    ]"
  >
    <BaseIcon :name="iconName" :class="iconColorClass" class="flex-shrink-0 mt-0.5" />
    
    <p class="flex-1 text-sm">{{ toast.message }}</p>
    
    <button
      class="flex-shrink-0 hover:opacity-70 transition-opacity"
      title="Close"
      @click="emit('close')"
    >
      <BaseIcon name="material-symbols:close" size="size-4" />
    </button>
  </div>
</template>

<script setup lang="ts">
interface Toast {
  id: string
  message: string
  type: 'info' | 'success' | 'error' | 'warning'
  duration?: number
}

const props = defineProps<{
  toast: Toast
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const colorClasses = computed(() => {
  switch (props.toast.type) {
    case 'success':
      return 'bg-green-50 border-green-200 text-green-900'
    case 'error':
      return 'bg-red-50 border-red-200 text-red-900'
    case 'warning':
      return 'bg-yellow-50 border-yellow-200 text-yellow-900'
    default: // info
      return 'bg-blue-50 border-blue-200 text-blue-900'
  }
})

const iconName = computed(() => {
  switch (props.toast.type) {
    case 'success':
      return 'material-symbols:check-circle'
    case 'error':
      return 'material-symbols:error'
    case 'warning':
      return 'material-symbols:warning'
    default:
      return 'material-symbols:info'
  }
})

const iconColorClass = computed(() => {
  switch (props.toast.type) {
    case 'success':
      return 'text-green-600'
    case 'error':
      return 'text-red-600'
    case 'warning':
      return 'text-yellow-600'
    default:
      return 'text-blue-600'
  }
})
</script>