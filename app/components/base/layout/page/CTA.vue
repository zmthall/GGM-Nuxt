<template>
  <section class="w-full text-white py-12 px-4 sm:px-8 relative overflow-hidden" :class="sectionClass" :style="sectionStyle">
    <div v-if="hasBgOverlay" class="absolute inset-0 pointer-events-none" :style="bgOverlayStyle" />

    <div class="max-w-6xl mx-auto text-center space-y-4 relative">
      <h2 class="text-2xl sm:text-4xl font-extrabold">
        {{ title }}
      </h2>

      <p v-if="description" class="text-sm sm:text-base max-w-2xl mx-auto">
        {{ description }}
      </p>

      <div class="mt-6">
        <slot />
        <BaseUiAction v-if="hasButton" variant="secondary" :to :href styling="py-4 px-8" class="mt-4">
          {{ buttonLabel }}
        </BaseUiAction>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type BackgroundBlendMode = 'normal' | 'overlay' | 'soft-light' | 'multiply'
type CtaBackground = 'default' | 'logos-spotlight' | 'light-spotlight' | 'logos-band' | 'light-band' | 'denim' | 'light-denim' | 'top-glow' | 'light-top-glow' | 'aurora' | 'light-aurora'

const props = withDefaults(defineProps<{
  title?: string
  description?: string
  buttonLabel?: string
  to?: string
  href?: string
  hasButton?: boolean
  hasTitle?: boolean
  background?: CtaBackground
  backgroundImage?: string
  backgroundImageOpacity?: number
  backgroundImageBlendMode?: BackgroundBlendMode
  backgroundImagePosition?: string
  backgroundImageSize?: string
}>(), {
  title: undefined,
  description: undefined,
  hasButton: true,
  hasTitle: true,
  to: undefined,
  buttonLabel: undefined,
  href: undefined,
  background: 'default',
  backgroundImage: undefined,
  backgroundImageOpacity: 0.05,
  backgroundImageBlendMode: 'soft-light',
  backgroundImagePosition: 'center',
  backgroundImageSize: 'cover'
})

const sectionClass = computed(() => {
  if (props.background === 'default') return 'bg-brand-primary'
  return ''
})

const sectionStyle = computed(() => {
  switch (props.background) {
    case 'default':
      return undefined

    case 'logos-spotlight':
      return { backgroundColor: '#0b1a46', backgroundImage: 'radial-gradient(circle at 38% 42%, rgba(255,255,255,.16), rgba(255,255,255,0) 58%), radial-gradient(circle at 68% 42%, rgba(255,255,255,.14), rgba(255,255,255,0) 60%), linear-gradient(180deg, #0b1a46 0%, #081338 100%)' }

    case 'light-spotlight':
      return { backgroundColor: '#233a7a', backgroundImage: 'radial-gradient(circle at 40% 45%, rgba(255,255,255,.28), rgba(255,255,255,0) 58%), radial-gradient(circle at 70% 45%, rgba(255,255,255,.22), rgba(255,255,255,0) 60%), linear-gradient(180deg, #2a4590 0%, #1a2f66 100%)' }

    case 'logos-band':
      return { backgroundColor: '#0b1a46', backgroundImage: 'linear-gradient(180deg, #0b1a46 0%, #0b1a46 30%, rgba(255,255,255,.12) 30%, rgba(255,255,255,.12) 70%, #0b1a46 70%, #081338 100%)' }

    case 'light-band':
      return { backgroundColor: '#243b7b', backgroundImage: 'linear-gradient(180deg, #22376f 0%, #22376f 30%, rgba(255,255,255,.22) 30%, rgba(255,255,255,.22) 70%, #22376f 70%, #182a5a 100%)' }

    case 'denim':
      return { backgroundColor: '#081338', backgroundImage: 'linear-gradient(90deg, #081338 0%, #14306d 20%, #1b4aa3 50%, #14306d 80%, #081338 100%)' }

    case 'light-denim':
      return { backgroundColor: '#1e2f63', backgroundImage: 'linear-gradient(90deg, #182654 0%, #27418a 22%, #355bb8 50%, #27418a 78%, #182654 100%)' }

    case 'top-glow':
      return { backgroundColor: '#0b1a46', backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,.10) 0%, rgba(255,255,255,0) 40%), linear-gradient(180deg, #0b1a46 0%, #081338 100%)' }

    case 'light-top-glow':
      return { backgroundColor: '#27418a', backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,.22) 0%, rgba(255,255,255,0) 45%), linear-gradient(180deg, #2f4fa3 0%, #1a2f66 100%)' }

    case 'aurora':
      return { backgroundColor: '#081338', backgroundImage: 'radial-gradient(circle at 18% 35%, rgba(56,189,248,.14), rgba(56,189,248,0) 55%), radial-gradient(circle at 82% 55%, rgba(168,85,247,.10), rgba(168,85,247,0) 58%), linear-gradient(180deg, #0b1a46 0%, #081338 100%)' }

    case 'light-aurora':
      return { backgroundColor: '#1d2c5a', backgroundImage: 'radial-gradient(circle at 18% 40%, rgba(147,197,253,.22), rgba(147,197,253,0) 55%), radial-gradient(circle at 82% 55%, rgba(196,181,253,.18), rgba(196,181,253,0) 58%), linear-gradient(180deg, #2b4693 0%, #172754 100%)' }

    default:
      return undefined
  }
})

const hasBgOverlay = computed(() => !!props.backgroundImage)

const bgOverlayStyle = computed(() => {
  if (!props.backgroundImage) return undefined
  return {
    backgroundImage: `url("${props.backgroundImage}")`,
    backgroundSize: props.backgroundImageSize,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: props.backgroundImagePosition,
    opacity: String(props.backgroundImageOpacity),
    mixBlendMode: props.backgroundImageBlendMode
  }
})
</script>