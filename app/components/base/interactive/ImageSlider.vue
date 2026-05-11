<template>
  <div class="flex flex-col min-h-0 h-full mx-4">
    <div
      class="relative overflow-hidden flex-1 min-h-0 flex items-center justify-center"
      :style="viewportStyle"
      role="region"
      aria-roledescription="carousel"
      :aria-label="`Image carousel (${total} slides)`"
      @mouseenter="stopAutoplay"
      @mouseleave="startAutoplay"
      @pointerdown.passive="onPointerDown"
      @pointerup.passive="onPointerUp"
      @pointercancel.passive="cancelPointer"
      @pointerleave.passive="cancelPointer"
    >
      <!-- Loader -->
      <div
        v-if="hasSlides && !currentImageLoaded"
        class="absolute inset-0 z-20 flex items-center justify-center bg-white/70 backdrop-blur-sm"
      >
        <div class="image-loader" />
      </div>

      <template v-if="hasSlides">
        <div
          class="flex h-full w-full transition-transform duration-500"
          :style="{ transform: `translateX(-${idx * 100}%)` }"
        >
          <div
            v-for="(s, i) in slides"
            :key="s.url + i"
            class="min-w-full h-full flex items-center justify-center"
          >
            <NuxtImg
              format="webp, avif"
              class="h-full w-auto max-w-full object-contain transition-opacity duration-300"
              :class="loaded.has(i) ? 'opacity-100' : 'opacity-0'"
              :src="s.url"
              :alt="s.alt || ''"
              :loading="i === 0 ? 'eager' : 'lazy'"
              @load="onImageLoad(i)"
              @error="onImageError(i)"
            />
          </div>
        </div>

        <!-- Prev -->
        <BaseUiAction
          type="button"
          class="absolute left-2 top-1/2 -translate-y-1/2 px-3 py-2 z-30"
          aria-label="Previous slide"
          @click="prev"
        >
          ‹
        </BaseUiAction>

        <!-- Next -->
        <BaseUiAction
          type="button"
          class="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 z-30"
          aria-label="Next slide"
          @click="next"
        >
          ›
        </BaseUiAction>

        <!-- Dots -->
        <div
          v-if="showDots"
          class="absolute bottom-6 left-1/2 -translate-x-1/2 hidden gap-1 lg:flex z-30"
        >
          <span
            v-for="i in total"
            :key="`dot-${i}`"
            class="h-1.5 w-1.5 rounded-full"
            :class="(i - 1) === idx ? 'bg-brand-primary' : 'bg-white/50'"
          />
        </div>
      </template>

      <div v-else class="text-gray-500 text-sm">
        {{ $t('components.image-carousel.no-images') }}
      </div>
    </div>

    <!-- Thumbnails -->
    <div
      v-if="showThumbnails !== false && hasSlides"
      class="mt-3 shrink-0 hidden lg:block"
    >
      <ul class="flex gap-2 overflow-x-auto p-1 justify-center">
        <li
          v-for="(s, i) in slides"
          :key="s.url + 'thumb' + i"
        >
          <button
            type="button"
            class="relative block rounded-lg overflow-hidden border transition-all"
            :class="i === idx
              ? 'ring-2 ring-blue-500 border-blue-500'
              : 'border-gray-200 hover:border-brand-primary hover:scale-105'"
            :aria-label="`Go to slide ${i + 1}`"
            @click="goTo(i)"
          >
            <NuxtImg
              format="webp, avif"
              :src="s.url"
              :alt="s.alt || ''"
              class="h-14 w-20 md:h-16 md:w-24 object-cover"
              loading="lazy"
              draggable="false"
            />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'

type Slide = {
  url: string
  w?: number
  h?: number
  alt?: string
}

const slides = defineModel<Slide[]>()

const props = defineProps<{
  startIndex?: number
  autoplayMs?: number | null
  showThumbnails?: boolean
  showDots?: boolean
  aspectRatio?: number | null
  maxHeight?: string
}>()

const emit = defineEmits<{
  (e: 'change' | 'initialLoad', payload: number): void
}>()

const idx = ref(
  Math.min(
    props.startIndex ?? 0,
    Math.max(0, (slides.value?.length ?? 1) - 1)
  )
)

const total = computed(() => slides.value?.length ?? 0)
const hasSlides = computed(() => total.value > 0)

const loaded = reactive(new Set<number>())

const currentImageLoaded = computed(() => {
  return loaded.has(idx.value)
})

function clamp(i: number) {
  return total.value
    ? (i + total.value) % total.value
    : 0
}

function goTo(i: number) {
  idx.value = clamp(i)
  emit('change', idx.value)
}

function next() {
  goTo(idx.value + 1)
}

function prev() {
  goTo(idx.value - 1)
}

let timer: ReturnType<typeof setInterval> | null = null

function startAutoplay() {
  if (!props.autoplayMs || props.autoplayMs < 1000) return

  stopAutoplay()

  timer = setInterval(next, props.autoplayMs)
}

function stopAutoplay() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

watch(() => props.autoplayMs, startAutoplay)

onMounted(() => {
  startAutoplay()

  window.addEventListener('keydown', onKey)
  emit('initialLoad', total.value)
})

onBeforeUnmount(() => {
  stopAutoplay()
  window.removeEventListener('keydown', onKey)
})

function onKey(e: KeyboardEvent) {
  if (!hasSlides.value) return

  if (e.key === 'ArrowRight') next()
  else if (e.key === 'ArrowLeft') prev()
}

const currentSlide = computed(() => slides.value?.[idx.value])

const computedAR = computed(() => {
  if (props.aspectRatio && props.aspectRatio > 0) {
    return props.aspectRatio
  }

  const s = currentSlide.value

  if (s?.w && s?.h && s.w > 0 && s.h > 0) {
    return s.w / s.h
  }

  const f = slides.value?.[0]

  if (f?.w && f?.h && f.w > 0 && f.h > 0) {
    return f.w / f.h
  }

  return null
})

const viewportStyle = computed(() => {
  const style: Record<string, string> = {
    maxHeight: props.maxHeight ?? '100%',
    height: '100%',
    width: '100%',
  }

  if (computedAR.value) {
    style.aspectRatio = String(computedAR.value)
  }

  return style
})

/* Swipe support */

let pointerActive = false
let pointerStartX = 0

function onPointerDown(e: PointerEvent) {
  if (!e.isPrimary) return

  pointerActive = true
  pointerStartX = e.clientX
}

function cancelPointer() {
  pointerActive = false
}

function onPointerUp(e: PointerEvent) {
  if (!pointerActive) return

  pointerActive = false

  const dx = e.clientX - pointerStartX

  if (Math.abs(dx) > 40) {
    if (dx < 0) next()
    else prev()
  }
}

/* Image loading */

function onImageLoad(index: number) {
  loaded.add(index)
}

function onImageError(index: number) {
  loaded.add(index)
}

/* Reset loaded state when slides change */

watch(
  () => slides.value,
  () => {
    loaded.clear()
  },
  { deep: true }
)
</script>