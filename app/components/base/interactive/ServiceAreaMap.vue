<template>
  <BaseLayoutPageSection :padding="false" :styling="marginStyling">
    <BaseLayoutPageContainer>
      <ClientOnly>
        <div
          ref="flourishContainer"
          class="flourish-embed flourish-map"
          data-src="visualisation/23590816"
          style="aspect-ratio:16/9; width:100%"  
        >
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
          <noscript>
            <img
              src="https://public.flourish.studio/visualisation/23590816/thumbnail"
              width="100%" height="100%"
              alt="service area map visualization"
              title="Service area map visualization"
            />
          </noscript>
        </div>
      </ClientOnly>
    </BaseLayoutPageContainer>
  </BaseLayoutPageSection>
</template>

<script setup lang="ts">
defineOptions({ name: 'BaseInteractiveServiceAreaMap' })

const props = defineProps<{ margin?: number; loading: 'lazy' | 'eager' }>()
const marginStyling = computed(() => {
  const map: Record<number, string> = {
    2:'mx-2 my-2 md:m-2',4:'mx-4 my-4 md:m-4',6:'mx-4 my-6 md:m-6',
    8:'mx-4 my-8 md:m-8',10:'mx-4 my-10 md:m-10',12:'mx-4 my-12 md:m-12',14:'mx-4 my-14 md:m-14',
  }
  return props.margin !== undefined ? map[props.margin] ?? '' : ''
})

const flourishContainer = ref<HTMLElement | null>(null)
const nuxtApp = useNuxtApp()

// ----- memoized script loader -----
let scriptReady: Promise<void> | null = null
function ensureFlourishScript(): Promise<void> {
  if (window.Flourish?.loadEmbed) return Promise.resolve()

  // ensure autoload is disabled BEFORE script executes
  window.Flourish = { ...(window.Flourish ?? {}), disable_autoload: true }

  if (scriptReady) return scriptReady
  scriptReady = new Promise<void>((resolve) => {
    let s = document.querySelector<HTMLScriptElement>('script[src*="flourish.studio/resources/embed.js"]')
    if (s) {
      if ((s as any)._loaded) return resolve()
      s.addEventListener('load', () => resolve(), { once: true })
      return
    }
    s = document.createElement('script')
    s.src = 'https://public.flourish.studio/resources/embed.js'
    s.async = true
    s.onload = () => { (s as any)._loaded = true; resolve() }
    document.head.appendChild(s)
  })
  return scriptReady
}

// ----- your original mount, with tiny safety tweaks -----
function loadFlourish() {
  const el = flourishContainer.value
  if (!el || !window.Flourish?.loadEmbed) return
  // clear any prior iframe (SPA re-entry)
  el.querySelector('iframe')?.remove()
  window.Flourish.loadEmbed(el)

  // post-inject: set attributes and nudge layout
  setTimeout(() => {
    const iframe = el.querySelector('iframe')
    if (iframe) {
      iframe.setAttribute('loading', props.loading === 'eager' ? 'eager' : 'lazy')
      iframe.setAttribute('referrerpolicy', 'no-referrer')
      iframe.setAttribute('title', 'Golden Gate Manor Inc. Service Area')
    }
    window.dispatchEvent(new Event('resize'))
  }, 180)
}

// Defer helper to keep work out of LCP/TBT
const idle = (cb: () => void) =>
  (window as any).requestIdleCallback ? (window as any).requestIdleCallback(cb, { timeout: 1200 }) : setTimeout(cb, 0)

// ----- initial mount: EXACTLY your flow, just ensure script first -----
onMounted(async () => {
  if (!import.meta.client) return
  await ensureFlourishScript()
  setTimeout(() => loadFlourish(), 200) // keep your 200ms settle
})

// ----- SPA remount after <NuxtLink> route finishes rendering (component-scoped) -----
nuxtApp.hook('page:finish', async () => {
  // only if this component is still on the page
  if (!flourishContainer.value || !document.contains(flourishContainer.value)) return
  await ensureFlourishScript()
  await nextTick()
  idle(() => requestAnimationFrame(() => {
    // mirror your reload: remove & re-embed
    const iframe = flourishContainer.value!.querySelector('iframe')
    if (iframe) iframe.remove()
    loadFlourish()
  }))
})
</script>

<style scoped>
.flourish-embed :deep(iframe) {
  background-color: #f5f5f5 !important;
  border: 0;
}
</style>
