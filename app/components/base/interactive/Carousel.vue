<!-- components/BaseInteractiveCarousel -->
<template>
  <section
    class="relative w-full overflow-hidden"
    :style="{ height: heightPx }"
    :aria-busy="isLoading ? 'true' : 'false'"
  >
    <!-- Optional loader (customizable) -->
    <div v-if="showLoader && isLoading" class="absolute inset-0 grid place-items-center">
      <slot name="loader">
        <div class="text-sm opacity-70">{{ $t('components.infinite-carousel.loading')}}</div>
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
      @mouseenter="props.pauseOnHover && stopAutoScroll()"
      @mouseleave="props.pauseOnHover && startAutoScroll()"
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
    <!-- Hero variant controls -->
    <template v-if="isHero && showControls">
      <button
        type="button"
        class="absolute left-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white shadow-lg transition hover:bg-black/65"
        aria-label="Previous slide"
        @click="next"
      >
        <BaseIcon name="heroicons:chevron-left-20-solid" size="size-6" color="text-white" class="" />
      </button>

      <button
        type="button"
        class="absolute right-6 top-1/2 z-20 h-12 w-12 -translate-y-1/2 flex items-center justify-center rounded-full bg-black/45 text-white shadow-lg transition hover:bg-black/65"
        aria-label="Next slide"
        @click="prev"
      >
        <BaseIcon name="heroicons:chevron-right-20-solid" size="size-6" color="text-white" class="" />
      </button>

      <div class="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        <button
          v-for="(_, dotIndex) in props.items"
          :key="dotIndex"
          type="button"
          class="h-2 rounded-full transition-all"
          :class="dotIndex === activeIndex ? 'w-8 bg-[#f4c84a]' : 'w-2 bg-white/80'"
          :aria-label="`Slide ${dotIndex + 1}`"
          :aria-current="dotIndex === activeIndex ? 'true' : 'false'"
        />
      </div>
    </template>
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
  minItemWidth?: number
  showLoader?: boolean
  maxVisible?: number;
  variant?: 'default' | 'hero';
  autoScroll?: boolean
  autoScrollMs?: number
  pauseOnHover?: boolean
}>(), {
  gap: 16,
  height: 400,
  transitionMs: 300,
  // Inline default function (no hoist issues)
  itemKey: ((_item: CarouselItem, index: number) => index) as KeyFn,
  showLoader: true,
  maxVisible: 3,
  minItemWidth: 180,
  variant: 'default',
  autoScroll: false,
  autoScrollMs: 10000,
  pauseOnHover: true
})

/* ---------------- state ---------------- */
const isLoading = defineModel<boolean>('loading', { default: true })
const track = ref<HTMLElement | null>(null)
const container = ref<HTMLElement | null>(null)
const containerWidth = ref(0)

const isHero = computed(() => props.variant === 'hero')
const activeIndex = ref(0)

function setActive(delta: number) {
  const count = props.items?.length ?? 0
  if (!count) return
  activeIndex.value = (activeIndex.value + delta + count) % count
}

// Auto Scrolling
let autoScrollTimer: ReturnType<typeof setInterval> | null = null

function startAutoScroll() {
  stopAutoScroll()

  if (!props.autoScroll) return
  if (!canScroll.value) return
  if (itemsLocal.value.length <= 1) return

  autoScrollTimer = setInterval(() => {
    // Don't interrupt an animation
    if (offsetPx.value === -stepPx.value && !transitionOn.value) {
      prev()
    }
  }, props.autoScrollMs)
}

function stopAutoScroll() {
  if (autoScrollTimer) {
    clearInterval(autoScrollTimer)
    autoScrollTimer = null
  }
}

function restartAutoScroll() {
  if (props.autoScroll)
    startAutoScroll()
}

/** local mutable array for infinite rotation */
const itemsLocal = ref<CarouselItem[]>([])
watch(
  () => props.items,
  v => {
    itemsLocal.value = [...(v ?? [])]
    // if items arrive async, mark loading until we re-park
    isLoading.value = true
  },
  { immediate: true }
)

/** responsive visible count: 3 ≥1024, 2 ≥768, else 1 */
const visible = ref(1)

const showControls = computed(() => {
  const count = props.items?.length ?? 0

  return count > visible.value
})

const canScroll = computed(() => (showControls.value))

let ro: ResizeObserver | null = null
onMounted(() => {
  container.value = track.value?.parentElement as HTMLElement | null
  if (ready.value) parkAndShow()

  restartAutoScroll()

  const calc = () => {
    const w = container.value?.clientWidth ?? 0

    // If we're mounting during a route transition, width can be 0.
    // Retry next frame until layout is ready.
    if (w === 0) {
      requestAnimationFrame(calc)
      return
    }

    containerWidth.value = w

    const fit = Math.floor((w + props.gap) / (props.minItemWidth + props.gap))
    const nextVisible = Math.max(1, Math.min(props.maxVisible, fit))

    // Force to maxVisible if we are "desktop wide enough"
    visible.value = w >= 1024 ? props.maxVisible : nextVisible
  }
  ro = new ResizeObserver(calc)
  if (container.value) ro.observe(container.value)
  calc()
})

onBeforeUnmount(() => {
  ro?.disconnect()
  stopAutoScroll()
})

watch(
  [canScroll, () => props.autoScroll, () => props.autoScrollMs],
  () => {
    startAutoScroll()
  }
)

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
  if (!canScroll.value) {
    // show all items, no "buffer slot"
    transitionOn.value = false
    offsetPx.value = 0
    isLoading.value = false
    return
  }

  // normal infinite behavior
  offsetPx.value = -stepPx.value
  await nextTick()
  requestAnimationFrame(() => { isLoading.value = false })
}

watch(
  () => ready.value,
  async (r) => {
    if (!r) return
    // even if isLoading is already false/true, force a correct park once geometry is valid
    await parkAndShow()
  },
  { immediate: true }
)

onMounted(() => {
  // initial attempt once mounted
  if (ready.value) parkAndShow()
})

/** Re-park when geometry changes; only flip loading off if we were loading */
watch([stepPx, () => itemsLocal.value.length, visible, containerWidth], async () => {
  if (!ready.value) return
  if (!transitionOn.value) {
    // If we’re not mid-animation, keep the parked transform in sync
    offsetPx.value = canScroll.value ? -stepPx.value : 0
  }
  // If we were loading (first paint or items arrived), finish now
  if (isLoading.value) await parkAndShow()
})

/* ---------------- controls ---------------- */
function next(evt?: MouseEvent) {
  stopAutoScroll();

  if (!canScroll.value) return
  if (itemsLocal.value.length <= 1) return
  if (offsetPx.value !== -stepPx.value) return

  setActive(-1)
  ;(evt?.target as HTMLButtonElement | undefined)?.setAttribute?.('disabled', 'true')
  transitionOn.value = true
  offsetPx.value = 0

  restartAutoScroll()
}

function prev(evt?: MouseEvent) {
  stopAutoScroll();

  if (!canScroll.value) return
  if (itemsLocal.value.length <= 1) return
  if (offsetPx.value !== -stepPx.value) return

  setActive(1)
  ;(evt?.target as HTMLButtonElement | undefined)?.setAttribute?.('disabled', 'true')
  transitionOn.value = true
  offsetPx.value = -2 * stepPx.value

  restartAutoScroll()
}

/** rotate + snap after animation completes */
function onTransitionEnd(e: TransitionEvent) {
  if (!canScroll.value) return

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
  getLoading: () => isLoading.value,
  showControls
})
</script>
