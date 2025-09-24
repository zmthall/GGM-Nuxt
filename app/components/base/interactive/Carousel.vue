<!-- components/BaseCarouselInfinite.vue -->
<template>
  <section
    class="relative w-full overflow-hidden"
    :style="{ height: heightPx }"
    :aria-busy="isLoading ? 'true' : 'false'"
  >
    <!-- Optional loader (customizable) -->
    <div v-if="showLoader && isLoading" class="absolute inset-0 grid place-items-center">
      <slot name="loader">
        <div class="text-sm opacity-70">Loading…</div>
      </slot>
    </div>

    <!-- Track -->
    <div
      ref="track"
      class="absolute left-0 top-0 flex will-change-transform h-full"
      :style="trackStyle"
      :class="isLoading ? 'invisible' : 'visible'"
      role="list"
      aria-live="polite"
      @transitionend="onTransitionEnd"
    >
      <div
        v-for="(item, i) in itemsLocal"
        :key="itemKeyValue(item, i)"
        class="shrink-0 h-full"
        :style="{ width: itemWidth + 'px' }"
        role="listitem"
      >
        <slot name="item" :item="item" :index="i" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch, nextTick } from 'vue'

type CarouselItem = unknown;
type KeyFn = (item: CarouselItem, index: number) => string | number

const props = withDefaults(defineProps<{
  items: CarouselItem[]
  gap?: number
  height?: number | string
  transitionMs?: number
  /** Optional key selector (prop name or function) */
  itemKey?: string | KeyFn
  /** Show built-in loader overlay while measuring/parking */
  showLoader?: boolean
}>(), {
  gap: 16,
  height: 400,
  transitionMs: 300,
  // Inline default function (no hoist issues)
  itemKey: ((_item: CarouselItem, index: number) => index) as KeyFn,
  showLoader: true
})

/* ---------------- state ---------------- */
const isLoading = defineModel<boolean>('loading', { default: true })
const track = ref<HTMLElement | null>(null)
const container = ref<HTMLElement | null>(null)
const containerWidth = ref(0)

/** local mutable array for infinite rotation */
const itemsLocal = ref<CarouselItem[]>([])
watch(
  () => props.items,
  v => {
    itemsLocal.value = [...(v ?? [])]
    // if items arrive async, mark loading until we re-park
    isLoading.value = true
  },
  { immediate: true, deep: true }
)

/** responsive visible count: 3 ≥1024, 2 ≥768, else 1 */
const visible = ref(1)
let ro: ResizeObserver | null = null
onMounted(() => {
  container.value = track.value?.parentElement as HTMLElement | null
  const calc = () => {
    const w = container.value?.clientWidth ?? 0
    containerWidth.value = w
    visible.value = w >= 1024 ? 3 : w >= 768 ? 2 : 1
  }
  ro = new ResizeObserver(calc)
  if (container.value) ro.observe(container.value)
  calc()
})
onBeforeUnmount(() => ro?.disconnect())

/** per-card width so N cards exactly fill container */
const itemWidth = computed(() => {
  const v = Math.max(1, visible.value)
  const totalGap = props.gap * (v - 1)
  return Math.max(0, Math.floor((containerWidth.value - totalGap) / v))
})

/* -------- translate-by-one-card logic -------- */
const transitionOn = ref(false)
/** we keep the track parked at -stepPx; moves go to 0 or -2*stepPx */
const offsetPx = ref(0)
/** stride for one card */
const stepPx = computed(() => itemWidth.value + props.gap)

/** styles */
const heightPx = computed(() =>
  typeof props.height === 'number' ? `${props.height}px` : String(props.height)
)
const trackStyle = computed(() => ({
  transform: `translateX(${offsetPx.value}px)`,
  transition: transitionOn.value ? `transform ${props.transitionMs}ms ease-in-out` : 'none',
  gap: `${props.gap}px`
}))

/** key extractor (no `any`) */
function itemKeyValue(item: unknown, i: number) {
  const k = props.itemKey
  if (typeof k === 'function') return k(item as Record<string, unknown>, i)
  if (typeof k === 'string' && item && typeof item === 'object') {
    const val = (item as Record<string, unknown>)[k]
    if (typeof val === 'string' || typeof val === 'number') return val
  }
  return i
}
/* ---------- initial parking & loading gate ---------- */

/** We consider it 'ready' when we have a width, a step, and items are mounted */
const ready = computed(() =>
  containerWidth.value > 0 &&
  stepPx.value > 0 &&
  itemsLocal.value.length >= 0 // allow empty carousels
)

async function parkAndShow() {
  // park at -stepPx, then reveal after DOM paints
  offsetPx.value = -stepPx.value
  await nextTick()
  // small rAF to avoid flash on very fast layouts
  requestAnimationFrame(() => { isLoading.value = false })
}

onMounted(() => {
  // initial attempt once mounted
  if (ready.value) parkAndShow()
})

/** Re-park when geometry changes; only flip loading off if we were loading */
watch([stepPx, () => itemsLocal.value.length, visible, containerWidth], async () => {
  if (!ready.value) return
  if (!transitionOn.value) {
    // If we’re not mid-animation, keep the parked transform in sync
    offsetPx.value = -stepPx.value
  }
  // If we were loading (first paint or items arrived), finish now
  if (isLoading.value) await parkAndShow()
})

/* ---------------- controls ---------------- */
function next(evt?: MouseEvent) {
  if (itemsLocal.value.length <= 1) return
  if (offsetPx.value !== -stepPx.value) return
  ;(evt?.target as HTMLButtonElement | undefined)?.setAttribute?.('disabled', 'true')
  transitionOn.value = true
  // animate right by one card
  offsetPx.value = 0
}

function prev(evt?: MouseEvent) {
  if (itemsLocal.value.length <= 1) return
  if (offsetPx.value !== -stepPx.value) return
  ;(evt?.target as HTMLButtonElement | undefined)?.setAttribute?.('disabled', 'true')
  transitionOn.value = true
  // animate left by one card
  offsetPx.value = -2 * stepPx.value
}

/** rotate + snap after animation completes */
function onTransitionEnd(e: TransitionEvent) {
  if (e.propertyName !== 'transform') return
  transitionOn.value = false

  if (offsetPx.value === 0) {
    // moved right → last to front
    const moved = itemsLocal.value.splice(itemsLocal.value.length - 1, 1)
    itemsLocal.value.unshift(...moved)
    offsetPx.value = -stepPx.value
  } else if (offsetPx.value === -2 * stepPx.value) {
    // moved left → first to end
    const moved = itemsLocal.value.splice(0, 1)
    itemsLocal.value.push(...moved)
    offsetPx.value = -stepPx.value
  }

  const disabled = document.querySelector('button:disabled') as HTMLButtonElement | null
  if (disabled) disabled.disabled = false
}

/** expose controls + loading getter */
defineExpose({
  next,
  prev,
  getLoading: () => isLoading.value
})
</script>
