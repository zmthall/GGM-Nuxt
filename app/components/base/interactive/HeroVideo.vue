<template>
  <div class="absolute inset-0">
    <video
      ref="videoEl"
      class="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
      :class="isReady ? 'opacity-100' : 'opacity-0'"
      :muted="muted"
      playsinline
      preload="auto"
    >
      <source :src="src" type="video/mp4">
    </video>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

withDefaults(defineProps<{
  src?: string
  muted?: boolean
}>(), {
  src: '/videos/temp.mp4',
  muted: true,
})

const emit = defineEmits<{
  (e: 'ready' | 'play' | 'pause' | 'ended' | 'buffered'): void
  (e: 'timeupdate', currentTime: number, duration: number): void
  (e: 'error', err: unknown): void
}>()

const videoEl = ref<HTMLVideoElement | null>(null)
const isReady = ref(false)
const isPlaying = ref(false)

function play() {
  const el = videoEl.value
  if (!el) return
  el.play()
    .then(() => { isPlaying.value = true; emit('play') })
    .catch((err) => { isPlaying.value = false; emit('error', err) })
}

function pause() {
  const el = videoEl.value
  if (!el) return
  el.pause()
  isPlaying.value = false
  emit('pause')
}

function rewind() {
  const el = videoEl.value
  if (!el) return
  try { el.currentTime = 0 } catch { /* noop */ }
}

function toggle() {
  if (isPlaying.value) pause()
  else play()
}

defineExpose({ play, pause, rewind, toggle, isReady, isPlaying, videoEl })

let cleanup: (() => void) | null = null

function resetVideo(el: HTMLVideoElement) {
  isReady.value = false
  isPlaying.value = false
  try {
    el.pause()
    try { el.currentTime = 0 } catch { /* noop */ }
    el.load()
  } catch { /* noop */ }
}

onMounted(async () => {
  const el = videoEl.value
  if (!el) return

  resetVideo(el)

  const onCanPlayThrough = () => {
    isReady.value = true
    emit('ready')
    emit('buffered')
  }

  const onLoadedData = () => {
    if (!isReady.value) {
      isReady.value = true
      emit('ready')
    }
  }

  const onPlay       = () => { isPlaying.value = true;  emit('play') }
  const onPause      = () => { isPlaying.value = false; emit('pause') }
  const onEnded      = () => { isPlaying.value = false; emit('ended') }
  const onTimeUpdate = () => {
    if (!el.duration) return
    emit('timeupdate', el.currentTime, el.duration)
  }
  const onError = () => {
    const err = el.error ?? new Error('Video error')
    isPlaying.value = false
    emit('error', err)
    console.error('[BaseInteractiveHeroVideo] video error:', err)
  }

  el.addEventListener('canplaythrough', onCanPlayThrough)
  el.addEventListener('loadeddata', onLoadedData, { once: true })
  el.addEventListener('play', onPlay)
  el.addEventListener('pause', onPause)
  el.addEventListener('ended', onEnded)
  el.addEventListener('timeupdate', onTimeUpdate)
  el.addEventListener('error', onError)

  cleanup = () => {
    el.removeEventListener('canplaythrough', onCanPlayThrough)
    el.removeEventListener('loadeddata', onLoadedData)
    el.removeEventListener('play', onPlay)
    el.removeEventListener('pause', onPause)
    el.removeEventListener('ended', onEnded)
    el.removeEventListener('timeupdate', onTimeUpdate)
    el.removeEventListener('error', onError)
  }

  await nextTick()
  el.load()
})

onBeforeUnmount(() => {
  if (cleanup) cleanup()
  const el = videoEl.value
  if (!el) return
  try {
    el.pause()
    el.removeAttribute('src')
    while (el.firstChild) el.removeChild(el.firstChild)
    el.load()
  } catch { /* noop */ }
})
</script>