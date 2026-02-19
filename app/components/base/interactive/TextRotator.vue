<template>
  <div :class="wrapperClass">
    <Transition v-if="variant === 'fade'" name="fade" mode="out-in">
      <p :key="activeItem" :class="textClass">{{ activeItem }}</p>
    </Transition>

    <Transition v-else-if="variant === 'slide-fade'" name="slideFade" mode="out-in">
      <p :key="activeItem" :class="textClass">{{ activeItem }}</p>
    </Transition>

    <p v-else-if="variant === 'type'" :class="textClass">
      <span>{{ typedText }}</span>
      <span v-if="showCursor" class="inline-block align-baseline">{{ cursorChar }}</span>
    </p>

    <Transition v-else-if="variant === 'type-reveal'" name="fade" mode="out-in">
      <p :key="typeRevealKey" :class="textClass">
        <span>{{ typeRevealText }}</span>
        <span v-if="showCursor" class="inline-block align-baseline">{{ cursorChar }}</span>
      </p>
    </Transition>

    <p v-else-if="variant === 'inline-swap'" :class="textClass">
      <span>{{ inlinePrefix }}</span>
      <span class="font-extrabold">{{ activeItem }}</span>
      <span>{{ inlineSuffix }}</span>
    </p>

    <div v-else-if="variant === 'chips'" class="flex flex-wrap justify-center gap-2">
      <span v-for="(it, i) in items" :key="`${it}-${i}`" class="px-3 py-1 rounded-full border-2 text-sm tracking-wide" :class="i === index ? 'text-brand-primary bg-white/25 shadow-hero border-brand-primary/50' : 'text-brand-primary/70 border-brand-primary/25 bg-white/10'">{{ it }}</span>
    </div>

    <div v-else-if="variant === 'stepper'" class="flex flex-col items-center gap-2">
      <p :class="textClass">{{ activeItem }}</p>
      <div class="flex gap-2">
        <span v-for="(it, i) in items" :key="`${it}-${i}`" class="h-2 w-2 rounded-full" :class="i === index ? 'bg-brand-primary' : 'bg-brand-primary/30'" />
      </div>
    </div>

    <div v-else-if="variant === 'marquee'" ref="marqueeViewportRef" class="w-full overflow-hidden">
      <div ref="marqueeTrackRef" class="marquee-track will-change-transform" :class="[marqueeDirectionClass, marqueeTrackClass]" :style="{ animationDuration: marqueeDuration }">
        <div ref="marqueeSetRef" class="marquee-set whitespace-nowrap">
          <span v-for="(it, i) in marqueeSetItems" :key="`m-0-${i}-${it}`" class="inline-flex items-center" :class="[textClass, marqueeItemClass, marqueeGapClass]">{{ it }}</span>
        </div>
        <div class="marquee-set whitespace-nowrap" aria-hidden="true">
          <span v-for="(it, i) in marqueeSetItems" :key="`m-1-${i}-${it}`" class="inline-flex items-center" :class="[textClass, marqueeItemClass, marqueeGapClass]">{{ it }}</span>
        </div>
      </div>
    </div>

    <p v-else :class="textClass">{{ activeItem }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

type Variant = 'fade' | 'slide-fade' | 'type' | 'type-reveal' | 'inline-swap' | 'chips' | 'stepper' | 'marquee'
type MarqueeDirection = 'left' | 'right'

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
  marqueeDirection?: MarqueeDirection
  marqueeItemClass?: string
  marqueeGapClass?: string
  marqueeTrackClass?: string
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
  marqueeSeconds: 18,
  marqueeDirection: 'left',
  marqueeItemClass: '',
  marqueeGapClass: 'pr-6',
  marqueeTrackClass: ''
})

const index = ref(0)
const safeIndex = computed(() => props.items.length ? (index.value % props.items.length) : 0)
const activeItem = computed(() => props.items[safeIndex.value] ?? '')

const typedText = ref('')
const showCursor = computed(() => props.cursor)

const typeRevealText = ref('')
const typeRevealKey = ref(0)

const marqueeDuration = computed(() => `${props.marqueeSeconds}s`)
const marqueeDirectionClass = computed(() => props.marqueeDirection === 'right' ? 'dir-right' : 'dir-left')

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

const marqueeViewportRef = ref<HTMLElement | null>(null)
const marqueeTrackRef = ref<HTMLElement | null>(null)
const marqueeSetRef = ref<HTMLElement | null>(null)
const marqueeRepeat = ref(1)
let marqueeRO: ResizeObserver | null = null

const marqueeSetItems = computed(() => {
  if (!props.items.length) return []
  const out: string[] = []
  for (let i = 0; i < marqueeRepeat.value; i++) out.push(...props.items)
  return out
})

async function syncMarqueeRepeat() {
  if (props.variant !== 'marquee') return
  if (!import.meta.client) return
  if (!marqueeViewportRef.value || !marqueeSetRef.value) return
  if (!props.items.length) return

  marqueeRepeat.value = 1
  await nextTick()

  const viewportW = marqueeViewportRef.value.getBoundingClientRect().width
  const setW = marqueeSetRef.value.getBoundingClientRect().width
  if (!viewportW || !setW) return

  const target = viewportW + 8
  const needed = Math.max(1, Math.ceil(target / setW))
  marqueeRepeat.value = needed
}

function startMarquee() {
  clearAllTimers()
  void syncMarqueeRepeat()
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

onMounted(async () => {
  start()

  if (import.meta.client) {
    marqueeRO = new ResizeObserver(() => {
      void syncMarqueeRepeat()
    })
    if (marqueeViewportRef.value) marqueeRO.observe(marqueeViewportRef.value)
  }
})

watch(() => [props.variant, props.items.join('|'), props.marqueeDirection], async () => {
  index.value = 0
  typedText.value = ''
  typeRevealText.value = ''
  typeRevealKey.value += 1
  start()
})

onBeforeUnmount(() => {
  clearAllTimers()
  if (marqueeRO) marqueeRO.disconnect()
  marqueeRO = null
})
</script>

<style scoped>
.fade-enter-active,.fade-leave-active{transition:opacity .35s ease}
.fade-enter-from,.fade-leave-to{opacity:0}

.slideFade-enter-active,.slideFade-leave-active{transition:opacity .35s ease, transform .35s ease}
.slideFade-enter-from{opacity:0; transform:translateY(6px)}
.slideFade-leave-to{opacity:0; transform:translateY(-6px)}

.marquee-track{display:flex; width:max-content; animation-timing-function:linear; animation-iteration-count:infinite}
.marquee-track.dir-left{animation-name:marquee-left}
.marquee-track.dir-right{animation-name:marquee-right}

@keyframes marquee-left{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(-50%,0,0)}}
@keyframes marquee-right{0%{transform:translate3d(-50%,0,0)}100%{transform:translate3d(0,0,0)}}
</style>