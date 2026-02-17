<template>
  <section v-if="active" class="hidden md:block relative h-[calc(100svh-35px-75px)] overflow-hidden">
    <BaseInteractiveHeroVideo ref="heroVideo" :src="videoSrc" muted loop @ready="videoReady = true" @play="onVideoPlay" @pause="onVideoPause" />

    <div class="absolute inset-0 z-1 bg-brand-secondary transition-opacity duration-700 ease-out" :class="overlayOpacityClass" />

    <div class="absolute inset-0 z-2">
      <button
        v-if="videoReady"
        type="button"
        class="absolute top-4 left-4 z-30 px-4 py-2 rounded-lg bg-transparent bg-brand-primary transition-all duration-200"
        :disabled="buttonDisabled"
        :class="uiPlaying
          ? 'font-normal  hover:bg-brand-primary hover:opacity-100 border-2 text-white border-white opacity-20'
          : 'font-extrabold border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white'"
        @click="handleHeroButton"
      >
        {{ buttonLabel }}
      </button>

      <div class="absolute inset-0 flex items-center justify-center px-6">
        <div class="flex flex-col items-center text-center gap-6">
          <div class="transition-all duration-500 ease-out" :class="textGroupClass">
            <h1 class="text-3xl font-extrabold text-brand-primary whitespace-nowrap">
              <span class="text-4xl">One Company.</span>
              <span class="font-normal"> Many services you can depend on.</span>
            </h1>

            <div class="mt-4">
              <BaseInteractiveTextRotator :items="services" variant="chips" :interval-ms="1800" wrapper-class="min-h-[2.25rem] flex items-center justify-center" />
            </div>
          </div>

          <div ref="logoEl" class="transition-opacity duration-700 ease-out w-[200px] lg:w-[350px]" :class="logoOpacityClass">
            <NuxtImg src="/images/layout/Full company GGM Logo.png" sizes="250px" width="350" height="279" format="webp" loading="eager" class="select-none drop-shadow-hero w-full" />
          </div>

          <!-- HOME POINT marker (center) -->
          <div ref="homePointEl" class="w-px h-px pointer-events-none" />
        </div>
      </div>

      <!-- DOCK POINT: bottom-right -->
      <div ref="dockPointEl" class="absolute right-3 bottom-3 w-px h-px pointer-events-none"/>
    </div>
  </section>

  <BaseLayoutPageHeroSection :class="[{'md:hidden': active }]" src="/images/pages/home/hero.jpg" centered alt="Golden Gate Bridge heroshot image" title="Golden Gate Bridge heroshot image" loading="eager">
    <div class="w-full p-4">
        <div class="flex flex-col items-center relative bg-color before:w-3/4 before:h-[2px] before:absolute before:bottom-0 mb-4 pb-4 ">
            <p class="text-3xl">Welcome to</p>
            <h1 class="text-center flex flex-col" >
                <span class="text-6xl font-extrabold text-brand-secondary">
                    Golden Gate Manor
                </span>
                <span class="text-2xl uppercase">
                    One Company. Many services you can depend on.
                </span>
            </h1>
        </div>
        <p class="text-xl text-center">
            For over 20 years, Golden Gate Manor Inc. has delivered compassionate, community-based services throughout Southern Colorado. We provide non-emergency medical and non-medical Medicaid transportation, assisted living homes in Pueblo, durable medical equipment and supplies, and now retail convenience through Golden Gate Gas and Goods. We're committed to helping you live life with ease, comfort, and confidence.
        </p>
    </div>
    <BaseUiAction styling="py-4 px-8 uppercase text-2xl" class="mt-4 " to="/company/contact-us">Contact Us</BaseUiAction>
  </BaseLayoutPageHeroSection>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'

defineProps<{
  active: boolean;
  videoSrc: string;
}>()

const services = [
  'Non-Emergency Medical Transportation',
  'Non-Medical Transportation',
  'Assisted Living',
  'Medical Supplies',
  'Convenience Store'
]

const LOGO_SCALE = 0.4
const MOVE_MS = 1500
const INTRO_DELAY_MS = 0
const VIDEO_START_DELAY_MS = 0

const OVERLAY_IN_DELAY_MS = 0
const PAUSE_AFTER_OVERLAY_MS = 0

const videoReady = ref(false)
const phase = ref<'idle' | 'animating' | 'played'>('idle')

const uiPlaying = ref(false)
const transitionLock = ref(false)

const heroVideo = ref<{
  play: () => void
  pause: () => void
  toggle: () => void
  isPlaying: boolean
} | null>(null)

const logoEl = ref<HTMLElement | null>(null)
const homePointEl = ref<HTMLElement | null>(null)
const dockPointEl = ref<HTMLElement | null>(null)

// ✅ NEW: remember the exact dock transform from the intro
const lastDockDx = ref(0)
const lastDockDy = ref(0)

const overlayOpacityClass = computed(() => {
  if (phase.value === 'played') return 'opacity-20'
  return 'opacity-75'
})

const textGroupClass = computed(() => {
  if (phase.value === 'idle') return 'opacity-100 scale-100 translate-y-0'
  return 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
})

const logoOpacityClass = computed(() => (phase.value === 'played' ? 'opacity-70' : 'opacity-100'))

const buttonDisabled = computed(() => !videoReady.value || transitionLock.value)
const buttonLabel = computed(() => (uiPlaying.value ? 'Pause' : 'Play'))

function onVideoPlay() {
  uiPlaying.value = true
}

function onVideoPause() {
  uiPlaying.value = false
}

function measureBottomRight(el: Element) {
  const r = el.getBoundingClientRect()
  return { x: r.right, y: r.bottom }
}

function clearLogoAnim(logo: HTMLElement) {
  logo.style.transition = ''
  logo.style.transform = ''
  logo.style.transformOrigin = ''
  logo.style.willChange = ''
}

function lockTransition() {
  transitionLock.value = true
}

function unlockTransition() {
  transitionLock.value = false
}

async function runIntroSequenceThenPlay() {
  if (!videoReady.value || phase.value !== 'idle') return

  const logo = logoEl.value
  const dock = dockPointEl.value
  if (!logo || !dock) return

  uiPlaying.value = true
  lockTransition()
  phase.value = 'animating'

  const from = measureBottomRight(logo)
  const to = measureBottomRight(dock)

  const dx = to.x - from.x
  const dy = to.y - from.y

  // ✅ store the exact dock transform so reverse can be perfect + simple
  lastDockDx.value = dx
  lastDockDy.value = dy

  await new Promise((r) => setTimeout(r, INTRO_DELAY_MS))

  const k1x = dx * 0.06
  const k1y = dy * 0.55
  const k2x = dx * 0.18
  const k2y = dy * 0.85
  const k3x = dx * 0.55
  const k3y = dy * 0.97

  const s1 = 1 - (1 - LOGO_SCALE) * 0.35
  const s2 = 1 - (1 - LOGO_SCALE) * 0.65

  clearLogoAnim(logo)

  logo.style.willChange = 'transform'
  logo.style.transformOrigin = 'bottom right'
  logo.style.transition = `transform ${MOVE_MS}ms cubic-bezier(.2,.9,.2,1), opacity 700ms ease-out`
  logo.style.transform = `translate3d(${k1x}px, ${k1y}px, 0) scale(${s1})`

  requestAnimationFrame(() => {
    logo.style.transform = `translate3d(${k2x}px, ${k2y}px, 0) scale(${s2})`
    requestAnimationFrame(() => {
      logo.style.transform = `translate3d(${k3x}px, ${k3y}px, 0) scale(${LOGO_SCALE})`
      requestAnimationFrame(() => {
        // ✅ final dock state
        logo.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${LOGO_SCALE})`
      })
    })
  })

  await new Promise((r) => setTimeout(r, MOVE_MS))
  phase.value = 'played'

  await new Promise((r) => setTimeout(r, VIDEO_START_DELAY_MS))
  heroVideo.value?.play()

  unlockTransition()
}

async function reverseIntroSequenceThenPause() {
  if (!videoReady.value || phase.value !== 'played') return

  const logo = logoEl.value
  if (!logo) return

  uiPlaying.value = false
  lockTransition()

  // overlay fade-in first
  phase.value = 'animating'

  window.setTimeout(() => {
    heroVideo.value?.pause()
  }, PAUSE_AFTER_OVERLAY_MS)

  await new Promise((r) => setTimeout(r, OVERLAY_IN_DELAY_MS))

  // ✅ SIMPLE RETURN: snap to the dock transform, then transition back to center
  const dx = lastDockDx.value
  const dy = lastDockDy.value

  logo.style.willChange = 'transform'
  logo.style.transformOrigin = 'bottom right'

  // snap (no transition) to guarantee starting point is correct
  logo.style.transition = 'transform 0s'
  logo.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${LOGO_SCALE})`
  void logo.offsetWidth

  // animate straight back to center
  requestAnimationFrame(() => {
    logo.style.transition = `transform ${MOVE_MS}ms cubic-bezier(.2,.9,.2,1), opacity 700ms ease-out`
    logo.style.transform = 'translate3d(0px, 0px, 0) scale(1)'
  })

  await new Promise((r) => setTimeout(r, MOVE_MS))

  clearLogoAnim(logo)
  phase.value = 'idle'
  unlockTransition()
}

function handleHeroButton() {
  if (buttonDisabled.value) return

  if (phase.value === 'idle') {
    runIntroSequenceThenPlay()
    return
  }

  if (phase.value === 'played') {
    reverseIntroSequenceThenPause()
    return
  }
}

onBeforeUnmount(() => {
  heroVideo.value?.pause()
  const logo = logoEl.value
  if (logo) clearLogoAnim(logo)
  phase.value = 'idle'
  transitionLock.value = false
  uiPlaying.value = false
  lastDockDx.value = 0
  lastDockDy.value = 0
})
</script>