<template>
  <!-- Always-visible shell so page can paint immediately -->
  <div class="relative w-full h-[500px] rounded-xl overflow-hidden bg-[#e8e8e8]">
    <!-- Map layer (fades in when ready) -->
    <div v-if="!isReady" class="w-full h-full transition-opacity duration-200 bg-zinc-300 flex justify-center items-center">
      <span class="animate-pulse">Loading Map...</span>
    </div>
    <div 
      ref="mount"
      class="w-full h-full transition-opacity duration-200"
      :class="isReady ? 'opacity-100' : 'opacity-0 pointer-events-none'"/>
  </div>
</template>

<script setup lang="ts">
import { Loader } from '@googlemaps/js-api-loader'

const { public: { googleMapsKey } } = useRuntimeConfig()
const EXT_LIB_URL =
  'https://ajax.googleapis.com/ajax/libs/@googlemaps/extended-component-library/0.6.11/index.min.js'

const mount = ref<HTMLElement|null>(null)
const isReady = ref(false)
let canceled = false

function loadScript(src: string, type: 'text/javascript' | 'module' = 'module') {
  return new Promise<void>((resolve, reject) => {
    const s = document.createElement('script')
    s.type = type
    s.src = src
    s.async = true
    s.defer = true
    s.onload = () => resolve()
    s.onerror = reject
    document.head.appendChild(s)
  })
}

// ---- Lazy init when near viewport (avoids doing work off-screen) ----
function observeAndInit() {
  // If you want "init always", just call scheduleInit() and skip IO.
  const el = mount.value
  if (!el) return
  const io = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting) {
      io.disconnect()
      scheduleInit() // defer heavy work until after first paint
    }
  }, { rootMargin: '600px 0px' }) // start early as it scrolls into view
  io.observe(el)
}

// Do not block initial paint: schedule after first frame
function scheduleInit() {
  requestAnimationFrame(() => { void init() })
}

async function init() {
  try {
    if (canceled) return

    // Import libraries without using deprecated .load()
    const loader = new Loader({ apiKey: googleMapsKey as string, version: 'weekly' })
    await Promise.all([
      loader.importLibrary('maps'),
      loader.importLibrary('places'),
      loadScript(EXT_LIB_URL, 'module').then(() => customElements.whenDefined('gmpx-store-locator')),
    ])
    if (canceled) return

    const locator = document.createElement('gmpx-store-locator') as any
    // If you don't have a styled Map ID, remove this:
    locator.setAttribute('map-id', 'DEMO_MAP_ID')

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

    // Reveal the map layer on the next frame (after it attaches)
    requestAnimationFrame(() => { if (!canceled) isReady.value = true })
  } catch (err) {
    console.error('[StoreLocator] init failed', err)
    // Gray shell stays visible
  }
}

onMounted(() => {
  // Don’t await here – just schedule init. This prevents blocking paint.
  observeAndInit()
})

onBeforeUnmount(() => {
  canceled = true
  if (mount.value) mount.value.innerHTML = ''
  isReady.value = false
})
</script>
