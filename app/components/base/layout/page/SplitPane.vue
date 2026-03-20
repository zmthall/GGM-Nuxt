<script setup lang="ts">
const props = withDefaults(defineProps<{
  initialSplit?: number
  minLeftPercent?: number
  maxLeftPercent?: number
  mobileBreakpointClass?: string
}>(), {
  initialSplit: 50,
  minLeftPercent: 28,
  maxLeftPercent: 72,
  mobileBreakpointClass: 'xl'
})

const splitContainer = ref<HTMLElement | null>(null)
const splitPercent = ref<number>(props.initialSplit)
const isDragging = ref(false)

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}

const updateSplitFromPointer = (clientX: number): void => {
  if (!splitContainer.value) return

  const rect = splitContainer.value.getBoundingClientRect()
  if (!rect.width) return

  const relativeX = clientX - rect.left
  const nextPercent = (relativeX / rect.width) * 100

  splitPercent.value = clamp(nextPercent, props.minLeftPercent, props.maxLeftPercent)
}

const onMouseMove = (event: MouseEvent): void => {
  if (!isDragging.value) return
  updateSplitFromPointer(event.clientX)
}

const stopDragging = (): void => {
  isDragging.value = false
  document.body.classList.remove('select-none')
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', stopDragging)
}

const startDragging = (event: MouseEvent): void => {
  isDragging.value = true
  document.body.classList.add('select-none')
  updateSplitFromPointer(event.clientX)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', stopDragging)
}

const desktopWrapperClass = computed(() => {
  return props.mobileBreakpointClass === 'lg' ? 'hidden lg:grid mt-2' : props.mobileBreakpointClass === 'md' ? 'hidden md:grid' : 'hidden xl:grid'
})

const mobileWrapperClass = computed(() => {
  return props.mobileBreakpointClass === 'lg' ? 'space-y-4 lg:hidden' : props.mobileBreakpointClass === 'md' ? 'space-y-4 md:hidden' : 'space-y-4 xl:hidden'
})

const gridStyle = computed<Record<string, string>>(() => {
  return {
    gridTemplateColumns: `${splitPercent.value}% 14px calc(${100 - splitPercent.value}% - 14px)`
  }
})

onBeforeUnmount(() => {
  stopDragging()
})
</script>

<template>
  <div>
    <div :class="mobileWrapperClass">
      <div class="min-w-0">
        <slot name="left" />
      </div>

      <div class="min-w-0">
        <slot name="right" :split-percent="splitPercent" />
      </div>
    </div>

    <div ref="splitContainer" :class="desktopWrapperClass" class="items-stretch gap-0" :style="gridStyle">
      <div class="min-w-0 h-full pr-3">
        <slot name="left" />
      </div>

      <div class="relative flex items-stretch justify-center">
        <button
          type="button"
          class="group relative h-full w-full cursor-col-resize"
          aria-label="Resize left and right panels"
          @mousedown="startDragging"
        >
          <span class="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-zinc-200 transition-colors duration-200 group-hover:bg-brand-primary/40" />
          <span class="absolute left-1/2 top-1/2 flex h-10 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm transition-colors duration-200 group-hover:border-brand-primary/30 group-hover:bg-brand-primary/5">
            <span class="flex gap-[2px]">
              <span class="block h-4 w-[2px] rounded-full bg-zinc-400" />
              <span class="block h-4 w-[2px] rounded-full bg-zinc-400" />
            </span>
          </span>
        </button>
      </div>

      <div class="min-w-0 h-full pl-3">
        <slot name="right" :split-percent="splitPercent" />
      </div>
    </div>
  </div>
</template>