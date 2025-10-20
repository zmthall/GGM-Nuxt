<template>
  <div ref="wrapper" class="relative" :class="marginStyling">
    <!-- Legend (outside the media box so it never shifts) -->
    <div v-once class="mb-4">
      <h2 class="text-md sm:text-2xl font-bold text-zinc-800">Golden Gate Manor Inc. Service Area</h2>
      <div class="flex gap-2 items-center">
        <span class="w-8 h-4 border border-black rounded-full bg-[#DE2C35]" />
        <p class="text-md sm:text-2xl">Not Included in Service Area</p>
      </div>
      <div class="flex gap-2 items-center">
        <span class="w-8 h-4 border border-black rounded-full bg-[#09AA64]" />
        <p class="text-md sm:text-2xl">Included in Service Area</p>
      </div>
    </div>

    <!-- ONE shared media box (fixed 16:9 height; no jump) -->
    <div class="media-16x9">
      <!-- Poster (object-contain, centered) -->
      <div v-if="!activated" class="abs-fill flex items-center justify-center group">
        <img
          src="/images/service-area-map@1020.webp"
          :alt="posterAlt"
          width="1020" height="748"
          decoding="async"
          loading="eager"
          fetchpriority="high"
          class="w-full h-full object-contain"
        >
        <!-- Click-anywhere overlay CTA -->
        <button
          v-if="!activated"
          v-once
          type="button"
          class="absolute top-0 left-0 w-full h-full hidden group-hover:flex items-center justify-center bg-black/20"
          title="Click to activate the interactive map"
          aria-label="Activate interactive map"
          @click="activate"
          @pointerenter.passive="prefetch"
        >
          <span class="m-3 sm:m-4 bg-zinc-200/80 px-4 py-2 rounded-lg font-bold border border-black/70 text-brand-primary">
            Activate interactive map
          </span>
        </button>
      </div>

      <!-- Interactive map fills the same box -->
      <ClientOnly>
        <div v-if="activated" class="abs-fill">
          <component
            :is="AsyncMap"
            :loading="loading"
            :margin="0"
            :show-legend="false"
            class="abs-fill"
          />
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'BaseInteractiveServiceAreaMapFacade' })

const props = withDefaults(defineProps<{
  mode?: 'click' | 'visible' | 'eager'
  poster?: string
  margin?: number
  loading?: 'lazy' | 'eager'
}>(), {
  mode: 'click',
  loading: 'lazy',
  poster: undefined,
  margin: 8
})

const marginStyling = computed(() => {
  const map: Record<number, string> = {
    2:'mx-2 my-2 md:m-2',4:'mx-4 my-4 md:m-4',6:'mx-4 my-6 md:m-6',
    8:'mx-4 my-8 md:m-8',10:'mx-4 my-10 md:m-10',12:'mx-4 my-12 md:m-12',14:'mx-4 my-14 md:m-14',
  }
  return props.margin !== undefined ? map[props.margin] ?? '' : ''
})

const wrapper = ref<HTMLElement | null>(null)
const activated = ref(false)
const loading = toRef(props, 'loading')
const posterAlt = 'Golden Gate Manor Inc. service area map preview'

/** Async import for the real map */
const mapLoader = () => import('./ServiceAreaMap.vue')
const AsyncMap = defineAsyncComponent({
  loader: mapLoader,
  suspensible: false,
  delay: 0,
  timeout: 20000,
})

/** Prefetch the chunk politely */
let warmed = false
function prefetch() {
  if (warmed) return
  warmed = true
  const idle = (cb: () => void) =>
    'requestIdleCallback' in window
      ? window.requestIdleCallback(cb, { timeout: 1200 })
      : setTimeout(cb, 0)
  idle(() => { void mapLoader() })
}

function activate() {
  if (activated.value) return
  activated.value = true
  prefetch()
}

/** Optional: auto-activate when near viewport */
function setupVisibilityObserver() {
  if (props.mode !== 'visible' || !wrapper.value) return
  const ro = new IntersectionObserver((entries, obs) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        prefetch()
        activate()
        obs.disconnect()
        break
      }
    }
  }, { rootMargin: '200px 0px' })
  ro.observe(wrapper.value)
}

onMounted(() => {
  if (!import.meta.client) return
  if (props.mode === 'visible') setupVisibilityObserver()
  if (props.mode === 'eager') {
    const idle = (cb: () => void) =>
      'requestIdleCallback' in window
        ? window.requestIdleCallback(cb, { timeout: 1500 })
        : setTimeout(cb, 0)
    idle(() => { prefetch(); activate() })
  };
  window.requestIdleCallback?.(() => {
    useHead({ link: [{ rel: 'preconnect', href: 'https://public.flourish.studio' }] })
  })
})
</script>

<style scoped>
/* Fixed 16:9 box shared by poster + map (prevents height jump) */
.media-16x9{
  position: relative;
  aspect-ratio: 5 / 4;
  height: 100%;
  max-height: 80vh;   /* prevent towering on tall screens; adjust if you like */
  overflow: hidden;
}

/* helper: absolutely fill the media box */
.abs-fill{ position:absolute; inset:0; }

/* ensure Flourish fills the box */
.flourish-embed :deep(iframe){
  width:100% !important;
  height:100% !important;
  border:0;
  background:#f5f5f5;
}
</style>
