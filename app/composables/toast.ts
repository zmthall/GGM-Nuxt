// composables/useToast.ts
type ToastType = 'info' | 'success' | 'error' | 'warning'

interface Toast {
  id: string
  message: string
  type: ToastType
  duration?: number
}

const toasts = ref<Toast[]>([])

export const useToast = () => {
  const add = (message: string, type: ToastType = 'info', duration: number = 10000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
    
    toasts.value.push({ id, message, type, duration })
    
    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        remove(id)
      }, duration)
    }
  }
  
  const remove = (id: string) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }
  
  const clear = () => {
    toasts.value = []
  }
  
  return {
    toasts: readonly(toasts),
    add,
    remove,
    clear,
    info: (msg: string, duration?: number) => add(msg, 'info', duration),
    success: (msg: string, duration?: number) => add(msg, 'success', duration),
    error: (msg: string, duration?: number) => add(msg, 'error', duration),
    warning: (msg: string, duration?: number) => add(msg, 'warning', duration),
  }
}