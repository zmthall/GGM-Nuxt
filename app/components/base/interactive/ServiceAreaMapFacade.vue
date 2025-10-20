<template>
  <div ref="wrapper" class="relative" :class="marginStyling">
    <!-- Facade (shown until activated) -->
    <div v-if="!activated" class="w-full overflow-hidden flex-col mx-auto">
      <!-- Poster -->
      <div class="mb-4">
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
      <div class="relative w-full aspect-[998/732]">
        <NuxtImg :src="posterSrc" :alt="posterAlt" :title="posterAlt + ' (Click button below for interactive map)'" format="webp,avif" class="object-contain w-full h-auto" placeholder quality="50" decoding="async" loading="eager" :preload="{ fetchPriority: 'high' }" densities="x1 x2" sizes="md:1000px 100vw" height="732" width="998" />
      </div>

      <!-- CTA -->
      <div class="p-3 sm:p-4 border-t border-zinc-200 flex items-center justify-end gap-3">
        <p class="text-sm sm:text-base text-zinc-700">Click to load the interactive map (third-party content).</p>
        <BaseUiAction
          type="button"
          class="px-3 sm:px-4 py-2 text-xs sm:text-lg"
          aria-label="Activate interactive map"
          @click="activate"
          @pointerenter="prefetch"
        >
          Activate interactive map
        </BaseUiAction>
      </div>
    </div>

    <!-- Real embed (mounted only after activation) -->
    <ClientOnly>
      <component :is="AsyncMap" v-if="activated" :margin="margin" :loading="loading" />
      <template #fallback>
        <div class="h-full w-full animate-pulse bg-zinc-100 rounded-lg" />
      </template>
    </ClientOnly>

    <noscript>
      <img
        :src="posterSrc"
        width="100%" height="100%"
        :alt="posterAlt"
        title="Service area map visualization"
        class="aspect-[16/9]"
      />
    </noscript>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

defineOptions({ name: 'BaseInteractiveServiceAreaMapFacade' })

/**
 * modes:
 * - click   : user must click to activate
 * - visible : auto-activate when near viewport (still shows facade until then)
 * - eager   : activate after mount (via idle callback)
 */
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
const margin = toRef(props, 'margin')
const loading = toRef(props, 'loading')

const posterSrc = computed(() =>
  props.poster ?? 'https://public.flourish.studio/visualisation/23590816/thumbnail'
)
const posterAlt = 'Golden Gate Manor Inc. service area map preview'

/** Single source of truth for the async import (RELATIVE PATH). */
const mapLoader = () =>
  import('./ServiceAreaMap.vue')
/* If this file lives in a different folder, adjust to '../BaseInteractiveServiceAreaMap.vue' */

const AsyncMap = defineAsyncComponent({
  loader: mapLoader,
  suspensible: true,
})

// Warm the chunk without mounting it
let warmed = false
function prefetch() {
  if (warmed) return
  warmed = true
  void mapLoader()
}

function activate() {
  if (activated.value) return
  activated.value = true
  prefetch()
}

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

const idle = (cb: () => void) =>
  (window as any).requestIdleCallback
    ? (window as any).requestIdleCallback(cb, { timeout: 1500 })
    : setTimeout(cb, 0)

onMounted(() => {
  if (!import.meta.client) return
  if (props.mode === 'visible') setupVisibilityObserver()
  if (props.mode === 'eager') idle(() => { prefetch(); activate() })
})
</script>