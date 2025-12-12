// components/Base/Toast/Container.vue
<template>
  <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md">
    <TransitionGroup name="toast">
      <BaseToastItem
        v-for="toast in toasts"
        :key="toast.id"
        :toast="toast"
        @close="remove(toast.id)"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
const { toasts, remove } = useToast()
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>