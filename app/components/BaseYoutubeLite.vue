<template>
  <div
    ref="root"
    class="yt-lite relative w-full overflow-hidden rounded-lg shadow-primary"
    :style="`aspect-ratio:${aspectRatio}`"
  >
    <!-- Poster -->
    <button
      v-if="!activated"
      class="absolute inset-0 w-full h-full"
      type="button"
      :aria-label="`Play video: ${title}`"
      @click="activate"
      @keydown.enter.prevent="activate"
    >
      <h2 v-if="!activated" class="absolute top-0 left-1/2 -translate-x-1/2 w-full backdrop-blur-md text-white font-bold text-xl">{{ title }}</h2>
      <NuxtImg
        :src="posterUrl"
        :alt="title"
        :title="title"
        :sizes="sizes || '(min-width:1280px) 1200px, (min-width:768px) 768px, 100vw'"
        format="avif,webp"
        quality="60"
        class="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
        :width="imageWidth"
        :height="imageHeight"
      />
      <!-- Play button -->
      <span class="pointer-events-none absolute inset-0 grid place-items-center">
        <BaseIcon name="logos:youtube-icon" size="size-20" />
      </span>
    </button>

    <!-- Real iframe only after activation -->
    <iframe
      v-else
      class="absolute inset-0 w-full h-full"
      :src="iframeSrc"
      title="YouTube video player"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      referrerpolicy="strict-origin-when-cross-origin"
    />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  videoId: string;
  title?: string;
  sizes?: string;
  imageWidth?: string;
  imageHeight?: string;
  aspectRatio?: string;           // e.g. '16/9'
  poster?: 'hq' | 'mq' | 'sd' | 'max'; // quality
  eagerOnView?: boolean;          // swap to iframe when near viewport
}>(), {
  title: 'YouTube video',
  aspectRatio: '16/9',
  poster: 'hq',
  imageWidth: undefined,
  imageHeight: undefined,
  eagerOnView: false,
  sizes: undefined
})

const root = ref<HTMLElement | null>(null)
const activated = ref(false)

const posterFile = computed(() => {
  switch (props.poster) {
    case 'max': return 'maxresdefault.jpg'
    case 'sd':  return 'sddefault.jpg'
    case 'mq':  return 'mqdefault.jpg'
    default:    return 'hqdefault.jpg'
  }
})

const posterUrl = computed(() =>
  `https://i.ytimg.com/vi/${props.videoId}/${posterFile.value}`
)

const iframeSrc = computed(() =>
  `https://www.youtube-nocookie.com/embed/${props.videoId}?autoplay=1&playsinline=1&rel=0&modestbranding=1&hl=en`
)

function activate() {
  if (activated.value) return
  activated.value = true
}

onMounted(() => {
  if (!props.eagerOnView) return
  const io = new IntersectionObserver(([e]) => {
    if (e?.isIntersecting) {
      io.disconnect()
      activate() // swap as soon as it scrolls into view (optional)
    }
  }, { rootMargin: '200px' })
  if (root.value) io.observe(root.value)
})
</script>

<style scoped>
/* Play button */
.yt-play { box-shadow: 0 2px 12px rgba(0,0,0,.4); }
.triangle { width: 0; height: 0; }
</style>
