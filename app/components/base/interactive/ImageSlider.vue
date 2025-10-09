<template>
  <!-- Root fills whatever container it's placed in -->
  <div class="flex flex-col min-h-0 h-full w-full">
    <!-- Viewport grows; aspectRatio optional; no hardcoded aspect-[16/9] -->
    <div
      class="relative overflow-hidden rounded-2xl bg-gray-100 flex-1 min-h-0 flex items-center justify-center"
      :style="viewportStyle"
      role="region" aria-roledescription="carousel"
      :aria-label="`Image carousel (${total} slides)`"
      @mouseenter="stopAutoplay" @mouseleave="startAutoplay"
      @pointerdown.passive="onPointerDown"
      @pointerup.passive="onPointerUp"
      @pointercancel.passive="cancelPointer"
      @pointerleave.passive="cancelPointer"
    >
      <template v-if="hasSlides">
        <div 
          class="flex h-full w-full transition-transform duration-500"
          :style="{ transform: `translateX(-${idx * 100}%)` }">
          <div 
            v-for="(s, i) in slides" :key="s.url + i"
            class="min-w-full h-full flex items-center justify-center">
            <NuxtImg
              format="webp, avif"
              class="h-full w-auto max-w-full object-contain transition-opacity duration-300"
              :class="loaded.has(i) ? 'opacity-100' : 'opacity-0'"
              :src="s.url" 
              :loading="i === 0 ? 'eager' : 'lazy'" 
              @load="onImageLoad(i)"
              @error="onImageError(i)"
            />
          </div>
        </div>

        <!-- Prev/Next -->
        <BaseUiAction 
          type="button"
          class="absolute left-2 top-1/2 -translate-y-1/2 px-3 py-2"
          aria-label="Previous slide" @click="prev">‹</BaseUiAction>
        <BaseUiAction 
          type="button"
          class="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2"
          aria-label="Next slide" @click="next">›</BaseUiAction>

        <!-- Dots -->
        <div v-if="showDots" class="absolute bottom-6 left-1/2 -translate-x-1/2 hidden gap-1 lg:flex">
          <span 
            v-for="i in total" :key="`dot-${i}`"
            class="h-1.5 w-1.5 rounded-full"
            :class="(i - 1) === idx ? 'bg-brand-primary' : 'bg-white/50'"
            :aria-current="(i - 1) === idx ? 'true' : undefined" />
        </div>
      </template>

      <div v-else class="text-gray-500 text-sm">No images</div>
    </div>
    

    <!-- Thumbnails stay small; do not consume height -->
    <div v-if="showThumbnails !== false && hasSlides" class="mt-3 shrink-0 hidden lg:block">
      <ul class="flex gap-2 overflow-x-auto p-1 justify-center">
        <li v-for="(s, i) in slides" :key="s.url + 'thumb' + i">
          <button 
            type="button"
            class="relative block rounded-lg overflow-hidden border"
            :class="i === idx ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-200 hover:border-brand-primary hover:scale-105'"
            :aria-label="`Go to slide ${i+1}`"
            @click="goTo(i)">
            <NuxtImg 
              format="webp, avif"
              :src="s.url" :alt="s.alt || ''"
              class="h-14 w-20 md:h-16 md:w-24 object-cover"
              loading="lazy" decoding="async" draggable="false" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue'

type Slide = { url: string; w?: number; h?: number; alt?: string }

const slides = defineModel<Slide[]>();

const props = defineProps<{
  startIndex?: number
  autoplayMs?: number | null
  showThumbnails?: boolean
  showDots?: boolean
  /** Optional: preferred aspect ratio like 16/9, 4/3, 1 (square) */
  aspectRatio?: number | null
  /** Optional: cap the viewport height, e.g. '85vh', '600px'. Defaults to '100%' */
  maxHeight?: string
}>()

const emit = defineEmits<{ 
  (e: 'change' | 'initialLoad', payload: number): void
  (e: 'imagesLoaded'): void 
}>()

const idx = ref(Math.min(props.startIndex ?? 0, Math.max(0, (slides.value?.length ?? 1) - 1)))
const total = computed(() => slides.value?.length ?? 0)
const hasSlides = computed(() => total.value > 0)

function clamp(i: number) { return total.value ? (i + total.value) % total.value : 0 }
function goTo(i: number) { idx.value = clamp(i); emit('change', idx.value) }
function next() { goTo(idx.value + 1) }
function prev() { goTo(idx.value - 1) }

let timer: ReturnType<typeof setInterval> | null = null
function startAutoplay() {
  if (!props.autoplayMs || props.autoplayMs < 1000) return
  stopAutoplay()
  timer = setInterval(next, props.autoplayMs)
}
function stopAutoplay() { if (timer) { clearInterval(timer); timer = null } }

watch(() => props.autoplayMs, startAutoplay)
onMounted(() => { startAutoplay(); window.addEventListener('keydown', onKey) })
onBeforeUnmount(() => { stopAutoplay(); window.removeEventListener('keydown', onKey) })

function onKey(e: KeyboardEvent) {
  if (!hasSlides.value) return
  if (e.key === 'ArrowRight') next()
  else if (e.key === 'ArrowLeft') prev()
}

/** Compute aspect ratio: prop > current slide dims > first slide dims > unset */
const currentSlide = computed(() => slides.value?.[idx.value])
const computedAR = computed(() => {
  if (props.aspectRatio && props.aspectRatio > 0) return props.aspectRatio
  const s = currentSlide.value
  if (s?.w && s?.h && s.w > 0 && s.h > 0) return s.w / s.h
  const f = slides.value?.[0]
  if (f?.w && f?.h && f.w > 0 && f.h > 0) return f.w / f.h
  return null
})

/* Pointer (touch/mouse) swipe */
let pointerActive = false
let pointerStartX = 0
function onPointerDown(e: PointerEvent) {
  if (e.isPrimary === false) return
  pointerActive = true
  pointerStartX = e.clientX
}
function cancelPointer() { pointerActive = false }
function onPointerUp(e: PointerEvent) {
  if (!pointerActive) return
  pointerActive = false
  const dx = e.clientX - pointerStartX
  if (Math.abs(dx) > 40) {
    if (dx < 0) next()
    else prev()
  }
}

/* Styles */
const viewportStyle = computed(() => {
  const style: Record<string, string> = {
    maxHeight: props.maxHeight ?? '100%',       // cap height if provided
    height: '100%',                             // fill available height
    width: '100%',
  }
  if (computedAR.value) {
    // Use native aspect-ratio; container still participates in flex sizing
    style.aspectRatio = String(computedAR.value)
  }
  return style
})

// add near top of <script setup>
const firstReady = ref(false)
const loaded = reactive(new Set<number>())
const firstImageLoaded = ref(false)
const allImagesLoaded = computed(() => slides.value?.every((_, i) => loaded.has(i)) ?? false)

// helper to preload an image and wait for decode()
function loadImage(url: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = async () => {
      const maybe = img as HTMLImageElement & { decode?: () => Promise<void> }
      if (typeof maybe.decode === 'function') {
        try { await maybe.decode() } catch {
          // 
        }
      }
      resolve()
    }
    img.onerror = () => reject(new Error(`Failed to load ${url}`))
    img.src = url
  })
}

// Image loading handler functions
function onImageLoad(index: number) {
  loaded.add(index)
  
  if (!firstImageLoaded.value && (index === idx.value || index === 0)) {
    firstImageLoaded.value = true
    emit('imagesLoaded') // Emit when first image loads
  }
  
  // Optional: still emit when ALL are loaded if you want that too
  if (allImagesLoaded.value) {
    console.log('All images loaded')
  }
}

function onImageError(index: number) {
  // Still mark as "loaded" to remove loading state even on error
  loaded.add(index)
  
  if (!firstImageLoaded.value && (index === idx.value || index === 0)) {
    firstImageLoaded.value = true
  }
}

watch(() => slides.value, () => {
  loaded.clear()
  firstReady.value = false
}, { deep: true })

// when slides or index changes, ensure current slide is loaded
watch([() => slides.value, idx], async ([s]) => {
  if (!s?.length) return
  
  const i = idx.value
  if(!s[i]) return

  if (!loaded.has(i)) {
    try {
      await loadImage(s[i].url)
      loaded.add(i)
      if (!firstReady.value) firstReady.value = true
    } catch { 
      console.log(`Image ${i} failed to preload`)
    }
  }
  // prefetch neighbors for smooth next/prev
  const neighbors = [clamp(i - 1), clamp(i + 1)]
  neighbors.forEach(async j => {
    if (!loaded.has(j) && slides.value![j]) {
      try { await loadImage(slides.value![j].url); loaded.add(j) } catch {
        // 
      }
    }
  })
}, { immediate: true })

onMounted(() => {
  emit('initialLoad', total.value);
})

</script>
