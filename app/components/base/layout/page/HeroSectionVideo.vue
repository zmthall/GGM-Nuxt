<template>
  <section v-if="active" class="hidden md:block relative h-[calc(100svh-35px-75px)] overflow-hidden z-6">

    <!-- Poster: NuxtImg for optimization + preload. Fades out once video is ready. -->
    <Transition
      leave-active-class="transition-opacity duration-700"
      leave-to-class="opacity-0"
    >
      <NuxtImg
        v-if="!videoReady"
        src="/images/home-images/Web_video_placeholder.png"
        alt=""
        aria-hidden="true"
        width="1920"
        height="1080"
        format="webp"
        loading="eager"
        preload
        sizes="100vw"
        class="absolute inset-0 h-full w-full object-cover"
      />
    </Transition>

    <BaseInteractiveHeroVideo
      ref="heroVideo"
      :src="videoSrc"
      muted
      @ready="videoReady = true"
      @buffered="onBuffered"
      @play="onVideoPlay"
      @pause="onVideoPause"
      @ended="onVideoEnded"
      @timeupdate="onTimeUpdate"
      @error="onVideoError"
    />

    <!-- Overlay -->
    <div class="absolute inset-0 bg-brand-secondary transition-opacity duration-700 ease-out" :class="overlayOpacityClass" />

    <!-- UI layer -->
    <div class="absolute inset-0 pointer-events-none">

      <!-- Controls: Play/Pause button + Autoplay toggle -->
      <div v-if="videoReady" class="pointer-events-auto absolute top-4 left-4 flex items-center gap-3">
        <button
          type="button"
          class="px-4 py-2 rounded-lg bg-transparent transition-all duration-200"
          :disabled="buttonDisabled"
          :class="buttonClass"
          @click="handleHeroButton"
        >
          {{ buttonLabel }}
        </button>

        <label class="flex items-center gap-1.5 cursor-pointer select-none text-sm">
          <input
            type="checkbox"
            class="w-3.5 h-3.5 cursor-pointer accent-brand-primary"
            :checked="autoplayEnabled"
            @change="toggleAutoplay"
          >
          <span :class="playing ? 'text-white opacity-40' : 'text-brand-primary font-semibold'">
            Autoplay
          </span>
        </label>
      </div>

      <!-- Centered column: logo + text in normal flow when idle -->
      <div class="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6">

        <!-- LOGO: in-flow when idle, absolute docked to bottom-right when playing -->
        <div
          class="w-[200px] lg:w-[350px] shrink-0 transition-all duration-700 ease-[cubic-bezier(.2,.9,.2,1)]"
          :class="playing ? 'absolute opacity-70' : 'opacity-100'"
          :style="playing ? logoPlayedStyle : {}"
        >
          <NuxtImg
            src="/images/layout/Full company GGM Logo.png"
            sizes="350px"
            width="350"
            height="279"
            format="webp"
            loading="eager"
            class="select-none drop-shadow-hero w-full"
          />
        </div>

        <!-- TEXT: in-flow when idle, absolute + fade out when playing -->
        <div
          class="flex flex-col items-center text-center transition-all duration-500 ease-out"
          :class="playing
            ? 'absolute inset-0 flex items-center justify-center opacity-0 scale-95 -translate-y-2 pointer-events-none'
            : 'opacity-100 scale-100 translate-y-0'"
        >
          <h1 class="text-3xl font-extrabold text-brand-primary whitespace-nowrap">
            <span class="text-4xl">One Company.</span>
            <span class="font-normal"> Many services you can depend on.</span>
          </h1>
          <div class="mt-4">
            <BaseInteractiveTextRotator
              :items="services"
              variant="chips"
              :interval-ms="1800"
              wrapper-class="min-h-[2.25rem] flex items-center justify-center"
            />
          </div>
        </div>

      </div>
    </div>
  </section>

  <BaseLayoutPageHeroSection
    :class="[{ 'md:hidden': active }]"
    src="/images/pages/home/hero.jpg"
    centered
    alt="Golden Gate Bridge heroshot image"
    title="Golden Gate Bridge heroshot image"
    loading="eager"
  >
    <div class="w-full p-4">
      <div class="flex flex-col items-center relative bg-color before:w-3/4 before:h-[2px] before:absolute before:bottom-0 mb-4 pb-4">
        <p class="text-3xl">Welcome to</p>
        <h1 class="text-center flex flex-col">
          <span class="text-6xl font-extrabold text-brand-secondary">Golden Gate Manor</span>
          <span class="text-2xl uppercase">One Company. Many services you can depend on.</span>
        </h1>
      </div>
      <p class="text-xl text-center">
        For over 20 years, Golden Gate Manor Inc. has delivered compassionate, community-based services throughout Southern Colorado. We provide non-emergency medical and non-medical Medicaid transportation, assisted living homes in Pueblo, durable medical equipment and supplies, and now retail convenience through Golden Gate Gas and Goods. We're committed to helping you live life with ease, comfort, and confidence.
      </p>
    </div>
    <BaseUiAction styling="py-4 px-8 uppercase text-2xl" class="mt-4" to="/company/contact-us">Contact Us</BaseUiAction>
  </BaseLayoutPageHeroSection>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps<{
  active: boolean
  videoSrc: string
}>()

type HeroVideoExpose = {
  play: () => void
  pause: () => void
  rewind: () => void
  toggle: () => void
}

const services = [
  'Non-Emergency Medical Transportation',
  'Non-Medical Transportation',
  'Assisted Living',
  'Medical Supplies',
  'Convenience Store'
]

const LOCK_MS = 750
const PAUSE_DELAY_MS = 150
const AUTOPLAY_INITIAL_DELAY_MS = 5000
const REPLAY_DELAY_MS = 12500
// How many seconds before the video ends to start returning the logo/text
const OUTRO_SECONDS = 2.5
const AUTOPLAY_STORAGE_KEY = 'ggm-hero-autoplay'

const logoPlayedStyle = {
  bottom: '12px',
  right: '12px',
  top: 'auto',
  left: 'auto',
  width: '100px',
}

// ── State ──────────────────────────────────────────────────────────────────────
const videoReady = ref(false)
const uiPlaying = ref(false)
const playing = ref(false)
const outroTriggered = ref(false)  // ensures we only trigger the outro once per play
const transitionLock = ref(false)
const heroVideo = ref<HeroVideoExpose | null>(null)

// ── Autoplay preference ────────────────────────────────────────────────────────
const autoplayEnabled = ref<boolean>(
  typeof window !== 'undefined'
    ? (localStorage.getItem(AUTOPLAY_STORAGE_KEY) ?? 'true') === 'true'
    : true
)

function toggleAutoplay(e: Event) {
  const checked = (e.target as HTMLInputElement).checked
  autoplayEnabled.value = checked
  localStorage.setItem(AUTOPLAY_STORAGE_KEY, String(checked))
  if (!checked) clearReplayTimer()
}

// ── Timer helpers ──────────────────────────────────────────────────────────────
let replayTimer: ReturnType<typeof setTimeout> | null = null

function clearReplayTimer() {
  if (replayTimer !== null) {
    clearTimeout(replayTimer)
    replayTimer = null
  }
}

function schedulePlay(delayMs: number) {
  clearReplayTimer()
  if (!autoplayEnabled.value) return
  replayTimer = setTimeout(() => {
    if (autoplayEnabled.value && !playing.value) {
      startPlaying()
    }
  }, delayMs)
}

// ── Video event handlers ───────────────────────────────────────────────────────
function onBuffered() {
  schedulePlay(AUTOPLAY_INITIAL_DELAY_MS)
}

function onVideoPlay() {
  uiPlaying.value = true
  outroTriggered.value = false  // reset for each new play
}

function onVideoPause() { uiPlaying.value = false }

function onTimeUpdate(currentTime: number, duration: number) {
  // When within OUTRO_SECONDS of the end, flip playing to false so the logo
  // and text animate back to center — video keeps playing underneath
  if (!outroTriggered.value && duration > 0 && (duration - currentTime) <= OUTRO_SECONDS) {
    outroTriggered.value = true
    playing.value = false
  }
}

function onVideoEnded() {
  // Video has fully finished — pause, rewind, and schedule the next autoplay
  heroVideo.value?.pause()
  heroVideo.value?.rewind()
  uiPlaying.value = false
  playing.value = false
  outroTriggered.value = false
  schedulePlay(REPLAY_DELAY_MS)
}

function onVideoError() {
  uiPlaying.value = false
  playing.value = false
  outroTriggered.value = false
}

// ── Play/pause helpers ─────────────────────────────────────────────────────────
function startPlaying() {
  outroTriggered.value = false
  playing.value = true
  heroVideo.value?.play()
}

function stopPlaying() {
  playing.value = false
  outroTriggered.value = false
  window.setTimeout(() => { heroVideo.value?.pause() }, PAUSE_DELAY_MS)
}

function lockFor(ms: number) {
  transitionLock.value = true
  window.setTimeout(() => { transitionLock.value = false }, ms)
}

// ── Manual button ──────────────────────────────────────────────────────────────
function handleHeroButton() {
  if (buttonDisabled.value) return
  lockFor(LOCK_MS)
  clearReplayTimer()
  if (!playing.value && !uiPlaying.value) {
    startPlaying()
  } else {
    stopPlaying()
  }
}

// ── Computed ───────────────────────────────────────────────────────────────────
const overlayOpacityClass = computed(() =>
  playing.value ? 'opacity-20' : 'opacity-75'
)

const buttonDisabled = computed(() => !videoReady.value || transitionLock.value)
const buttonLabel = computed(() => (uiPlaying.value ? 'Pause' : 'Play'))
const buttonClass = computed(() =>
  uiPlaying.value
    ? 'font-normal hover:bg-brand-primary hover:opacity-100 border-2 text-white border-white opacity-20'
    : 'font-extrabold border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white'
)

// ── Lifecycle ──────────────────────────────────────────────────────────────────
function reset() {
  clearReplayTimer()
  heroVideo.value?.pause()
  uiPlaying.value = false
  playing.value = false
  outroTriggered.value = false
  transitionLock.value = false
}

watch(() => props.active, (v) => { if (!v) reset() })
onBeforeUnmount(reset)
</script>