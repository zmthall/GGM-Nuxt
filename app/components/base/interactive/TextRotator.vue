<template>
  <div :class="wrapperClass">
    <!-- fade -->
    <Transition v-if="variant === 'fade'" name="fade" mode="out-in">
      <p :key="activeItem" :class="textClass">{{ activeItem }}</p>
    </Transition>

    <!-- slide-fade -->
    <Transition v-else-if="variant === 'slide-fade'" name="slideFade" mode="out-in">
      <p :key="activeItem" :class="textClass">{{ activeItem }}</p>
    </Transition>

    <!-- type (type + delete) -->
    <p v-else-if="variant === 'type'" :class="textClass">
      <span>{{ typedText }}</span>
      <span v-if="showCursor" class="inline-block align-baseline">{{ cursorChar }}</span>
    </p>

    <!-- type-reveal (type + fade out, no delete) -->
    <Transition v-else-if="variant === 'type-reveal'" name="fade" mode="out-in">
      <p :key="typeRevealKey" :class="textClass">
        <span>{{ typeRevealText }}</span>
        <span v-if="showCursor" class="inline-block align-baseline">{{ cursorChar }}</span>
      </p>
    </Transition>

    <!-- inline-swap -->
    <p v-else-if="variant === 'inline-swap'" :class="textClass">
      <span>{{ inlinePrefix }}</span>
      <span class="font-extrabold">{{ activeItem }}</span>
      <span>{{ inlineSuffix }}</span>
    </p>

    <!-- chips -->
    <div v-else-if="variant === 'chips'" class="flex flex-wrap justify-center gap-2">
      <span v-for="(it, i) in items" :key="`${it}-${i}`" class="px-3 py-1 rounded-full border-2 text-sm tracking-wide" :class="i === index ? 'text-brand-primary bg-white/25 shadow-hero border-brand-primary/50' : 'text-brand-primary/70 border-brand-primary/25 bg-white/10'">
        {{ it }}
      </span>
    </div>

    <!-- stepper -->
    <div v-else-if="variant === 'stepper'" class="flex flex-col items-center gap-2">
      <p :class="textClass">{{ activeItem }}</p>
      <div class="flex gap-2">
        <span v-for="(it, i) in items" :key="`${it}-${i}`" class="h-2 w-2 rounded-full" :class="i === index ? 'bg-brand-primary' : 'bg-brand-primary/30'">
          <!-- placeholder -->
        </span>
      </div>
    </div>

    <!-- marquee -->
    <div v-else-if="variant === 'marquee'" class="w-full overflow-hidden">
      <div class="marquee-track whitespace-nowrap will-change-transform" :style="{ animationDuration: marqueeDuration }">
        <span v-for="(it, i) in marqueeItems" :key="`${it}-${i}`" class="inline-block pr-10" :class="textClass">{{ it }}</span>
      </div>
    </div>

    <!-- fallback -->
    <p v-else :class="textClass">{{ activeItem }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

type Variant = 'fade' | 'slide-fade' | 'type' | 'type-reveal' | 'inline-swap' | 'chips' | 'stepper' | 'marquee'

const props = withDefaults(defineProps<{
  items: string[]
  variant?: Variant
  wrapperClass?: string
  textClass?: string
  intervalMs?: number
  typeSpeedMs?: number
  deleteSpeedMs?: number
  pauseAfterTypedMs?: number
  pauseAfterDeletedMs?: number
  pauseAfterRevealMs?: number
  cursor?: boolean
  cursorChar?: string
  inlinePrefix?: string
  inlineSuffix?: string
  marqueeSeconds?: number
}>(), {
  variant: 'fade',
  wrapperClass: 'min-h-[1.75rem]',
  textClass: 'text-lg font-semibold text-brand-primary/80 tracking-wide',
  intervalMs: 2400,
  typeSpeedMs: 45,
  deleteSpeedMs: 28,
  pauseAfterTypedMs: 900,
  pauseAfterDeletedMs: 180,
  pauseAfterRevealMs: 1200,
  cursor: true,
  cursorChar: '▍',
  inlinePrefix: 'We provide ',
  inlineSuffix: '.',
  marqueeSeconds: 18
})

const index = ref(0)
const safeIndex = computed(() => props.items.length ? (index.value % props.items.length) : 0)
const activeItem = computed(() => props.items[safeIndex.value] ?? '')

const typedText = ref('')
const showCursor = computed(() => props.cursor)

const typeRevealText = ref('')
const typeRevealKey = ref(0)

const marqueeItems = computed(() => props.items.length ? [...props.items, ...props.items] : [])
const marqueeDuration = computed(() => `${props.marqueeSeconds}s`)

let fadeTimer: number | null = null
let typeTimer: number | null = null
let pauseTimer: number | null = null

function clearAllTimers() {
  if (fadeTimer) window.clearInterval(fadeTimer)
  if (typeTimer) window.clearInterval(typeTimer)
  if (pauseTimer) window.clearTimeout(pauseTimer)
  fadeTimer = null
  typeTimer = null
  pauseTimer = null
}

function startFade() {
  clearAllTimers()
  if (!props.items.length) return
  fadeTimer = window.setInterval(() => {
    index.value = (index.value + 1) % props.items.length
  }, props.intervalMs)
}

function startSlideFade() {
  startFade()
}

function startType() {
  clearAllTimers()
  if (!props.items.length) return
  index.value = 0
  typedText.value = ''
  const current = () => props.items[safeIndex.value] ?? ''

  const typeForward = () => {
    const full = current()
    let i = 0
    typedText.value = ''
    typeTimer = window.setInterval(() => {
      typedText.value = full.slice(0, i + 1)
      i += 1
      if (i >= full.length) {
        if (typeTimer) window.clearInterval(typeTimer)
        typeTimer = null
        pauseTimer = window.setTimeout(() => {
          deleteBackward()
        }, props.pauseAfterTypedMs)
      }
    }, props.typeSpeedMs)
  }

  const deleteBackward = () => {
    const full = current()
    let i = full.length
    typeTimer = window.setInterval(() => {
      typedText.value = full.slice(0, Math.max(0, i - 1))
      i -= 1
      if (i <= 0) {
        if (typeTimer) window.clearInterval(typeTimer)
        typeTimer = null
        pauseTimer = window.setTimeout(() => {
          index.value = (index.value + 1) % props.items.length
          typeForward()
        }, props.pauseAfterDeletedMs)
      }
    }, props.deleteSpeedMs)
  }

  typeForward()
}

function startTypeReveal() {
  clearAllTimers()
  if (!props.items.length) return
  index.value = 0
  typeRevealText.value = ''
  typeRevealKey.value += 1
  const current = () => props.items[safeIndex.value] ?? ''

  const typeForward = () => {
    const full = current()
    let i = 0
    typeRevealText.value = ''
    typeTimer = window.setInterval(() => {
      typeRevealText.value = full.slice(0, i + 1)
      i += 1
      if (i >= full.length) {
        if (typeTimer) window.clearInterval(typeTimer)
        typeTimer = null
        pauseTimer = window.setTimeout(() => {
          index.value = (index.value + 1) % props.items.length
          typeRevealKey.value += 1
          typeForward()
        }, props.pauseAfterRevealMs)
      }
    }, props.typeSpeedMs)
  }

  typeForward()
}

function startInlineSwap() {
  startFade()
}

function startChips() {
  startFade()
}

function startStepper() {
  startFade()
}

function startMarquee() {
  clearAllTimers()
}

function start() {
  if (props.variant === 'type') startType()
  else if (props.variant === 'type-reveal') startTypeReveal()
  else if (props.variant === 'marquee') startMarquee()
  else if (props.variant === 'slide-fade') startSlideFade()
  else if (props.variant === 'inline-swap') startInlineSwap()
  else if (props.variant === 'chips') startChips()
  else if (props.variant === 'stepper') startStepper()
  else startFade()
}

onMounted(() => {
  start()
})

watch(() => [props.variant, props.items.join('|')], () => {
  index.value = 0
  typedText.value = ''
  typeRevealText.value = ''
  typeRevealKey.value += 1
  start()
})

onBeforeUnmount(() => {
  clearAllTimers()
})
</script>

<style scoped>
.fade-enter-active,.fade-leave-active{transition:opacity .35s ease}
.fade-enter-from,.fade-leave-to{opacity:0}

.slideFade-enter-active,.slideFade-leave-active{transition:opacity .35s ease, transform .35s ease}
.slideFade-enter-from{opacity:0; transform:translateY(6px)}
.slideFade-leave-to{opacity:0; transform:translateY(-6px)}

.marquee-track{animation-name:marquee; animation-timing-function:linear; animation-iteration-count:infinite}
@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
</style>