<template>
  <!-- Always-visible shell -->
  <div class="relative w-full h-[500px] rounded-xl overflow-hidden">
    <!-- CLICK FACADE -->
    <button
      v-if="mode === 'click' && !isReady"
      type="button"
      class="group absolute inset-0 w-full h-full"
      :aria-label="cta || 'Click to Load interactive map'"
      @click="triggerInit"
    >
      <NuxtImg
        v-if="facadeSrc"
        :src="facadeSrc"
        :alt="facadeAlt || 'Map preview with Golden Gate locations'"
        format="avif,webp"
        quality="50"
        placeholder="/images/pages/location/location-map-placeholder.png"
        height="500" width="1136"
        sizes="lg:1136px 100vw"
        fetchpriority="high"
        decoding="async"
        loading="eager"
        class="w-full h-full object-cover"
        @load="onImgLoad"
      />
      <!-- overlay -->
      <div v-if="imageLoaded" :class="['absolute inset-0 transition bg-black/30 group-hover:bg-black/40']" />
      <div v-if="imageLoaded" class="absolute inset-0 grid place-items-center pointer-events-none">
        <div class="flex items-center gap-3 rounded-full bg-white/95 px-4 py-2 shadow">
          <!-- simple play icon -->
          <BaseIcon name="tdesign:gesture-click-filled" color="text-brand-main-text" hover-color="group-hover:text-brand-primary"/>
          <span class="text-brand-main-text font-semibold">
            {{ cta || 'Click to Load interactive map' }}
          </span>
        </div>
      </div>
    </button>

    <!-- GRAY LOADING STATE (auto mode or during init) -->
    <div
      v-else-if="!isReady"
      class="absolute inset-0 flex justify-center items-center"
      aria-hidden="true"
    >
      <span class="animate-pulse">Loading map…</span>
    </div>

    <!-- MAP LAYER (fades in when ready) -->
    <div
      ref="mount"
      class="w-full h-full transition-opacity duration-200"
      :class="isReady ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    />
  </div>
</template>

<script setup lang="ts">
// ❌ remove: import { Loader } from '@googlemaps/js-api-loader'

const props = withDefaults(defineProps<{
  mode?: 'auto' | 'click'
  facadeSrc?: string
  facadeAlt?: string
  cta?: string
}>(), {
  mode: 'auto',
  facadeSrc: '',
  facadeAlt: '',
  cta: 'Click to Load interactive map',
})

const { public: { googleMapsKey } } = useRuntimeConfig()
const EXT_LIB_URL = 'https://ajax.googleapis.com/ajax/libs/@googlemaps/extended-component-library/0.6.11/index.min.js'

const mount = ref<HTMLElement|null>(null)
const isReady = ref(false)
const imageLoaded = ref(false)
let canceled = false
let started = false

const onImgLoad = () => { imageLoaded.value = true }

function loadScript(src: string, type: 'text/javascript' | 'module' = 'module') {
  return new Promise<void>((resolve, reject) => {
    const s = document.createElement('script')
    s.type = type
    s.async = true
    s.src = src
    s.onload = () => resolve()
    s.onerror = reject
    document.head.appendChild(s)
  })
}

async function initOnce() {
  if (started || canceled) return
  started = true
  try {
    // ⬇️ import the loader ONLY now (kept out of initial bundle)
    const { Loader } = await import('@googlemaps/js-api-loader')
    const loader = new Loader({ apiKey: googleMapsKey as string, version: 'weekly' })

    await Promise.all([
      loader.importLibrary('maps'),
      loader.importLibrary('places').catch(() => {}),
      loadScript(EXT_LIB_URL, 'module').then(() => customElements.whenDefined('gmpx-store-locator')),
    ])
    if (canceled) return

    const locator = document.createElement('gmpx-store-locator') as any
    // Remove unless you have a valid styled Map ID
    locator.setAttribute('map-id', 'YOUR_MAP_ID')

    const CONFIGURATION = {
      locations: [
        { title:'Golden Gate Transportation', address1:'648 South Union Avenue', address2:'Pueblo, CO, United States', coords:{ lat:38.2595792, lng:-104.6186705 }, placeId:'ChIJc5EM03ajE4cRvDKqS-Xefys' },
        { title:'Golden Gate Medical Supplies', address1:'612 S Union Ave', address2:'Pueblo, CO 81004, USA', coords:{ lat:38.26055054660916, lng:-104.61802745033188 }, placeId:'ChIJJye5_-OiE4cRrjHeufk8WFI' },
        { title:'Golden Gate Manor I', address1:'606 W Abriendo Ave', address2:'Pueblo, CO 81004, USA', coords:{ lat:38.26457438731137, lng:-104.62812738220903 }, placeId:'ChIJL3Xy3fGiE4cRW8Zst7oDiYA' },
        { title:'Golden Gate Manor II', address1:'1219 Lake Ave', address2:'Pueblo, CO 81004, USA', coords:{ lat:38.24514169924577, lng:-104.62568304662705 }, placeId:'ChIJV_ivbMWiE4cR-Sb0b8nYkDs' },
        { title:'Golden Valley', address1:'1033 E Evans Ave', address2:'Pueblo, CO 81004, USA', coords:{ lat:38.248340469498025, lng:-104.61527072331353 }, placeId:'ChIJ9Q8bA9miE4cR0eUd0nYIk8A' },
        { title:'Golden Horizon', address1:'2109 Chautard Dr', address2:'Pueblo, CO 81005, USA', coords:{ lat:38.22825612718386, lng:-104.6684346803566 }, placeId:'ChIJU09MnAKYE4cRHHvOCf3fVas' },
        { title:'Golden View', address1:'525 W 9th St', address2:'Pueblo, CO 81003, USA', coords:{ lat:38.275449802243905, lng:-104.61438584723874 }, placeId:'ChIJNdRjmv-iE4cRZosO3m8d3oI' },
        { title:'Golden Gate Gas and Goods 1', address1:'1242 S Prairie Ave', address2:'Pueblo, CO 81005, USA', coords:{ lat:38.24434024570197, lng:-104.64337132944775 }, placeId:'ChIJZ7v2sruiE4cR-LsDwYYvuTQ' },
        { title:'Golden Gate Gas and Goods 2', address1:'1103 N Elizabeth St', address2:'Pueblo, CO 81003, USA', coords:{ lat:38.27740225330095, lng:-104.61523442944775 }, placeId:'ChIJj3Ccn1WiE4cR_XUSZLMB6NI' }
      ],
      mapOptions: {
        center: { lat: 38.2595792, lng: -104.6186705 },
        zoom: 12,
        fullscreenControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: true,
        maxZoom: 17
      },
      capabilities: { input: true, autocomplete: true, directions: false, distanceMatrix: true, details: false, actions: false }
    }

    locator.configureFromQuickBuilder(CONFIGURATION)

    mount.value?.appendChild(locator)
    requestAnimationFrame(() => { if (!canceled) isReady.value = true })
  } catch (e) {
    console.error('[StoreLocator] init failed', e)
  }
}

function triggerInit() {
  requestAnimationFrame(() => void initOnce())
}

function observeAndInit() {
  if (props.mode !== 'auto') return
  const el = mount.value
  if (!el) return
  const io = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting) {
      io.disconnect()
      requestAnimationFrame(() => void initOnce())
    }
  }, { rootMargin: '600px 0px' })
  io.observe(el)
  setTimeout(() => { if (!started) requestAnimationFrame(() => void initOnce()) }, 800)
}

onMounted(() => { observeAndInit() })
onBeforeUnmount(() => {
  canceled = true
  isReady.value = false
  if (mount.value) mount.value.innerHTML = ''
})
</script>
