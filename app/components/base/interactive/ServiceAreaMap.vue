<template>
  <BaseLayoutPageSection :padding="false" :styling="marginStyling">
    <BaseLayoutPageContainer>
         <ClientOnly>
           <div
             ref="flourishContainer"
             class="flourish-embed flourish-map"
             data-src="visualisation/23590816"
           >
            <div class="mb-4">
              <h2 class="text-md sm:text-2xl font-bold text-zinc-800">Golden Gate Manor Inc. Service Area</h2>
              <div class="flex gap-2 items-center">
                <span class="w-8 h-4 border border-black rounded-full bg-[#DE2C35]" /> 
                <p class="text-md sm:text-2xl">
                  Not Included in Service Area
                </p>
              </div>
              <div class="flex gap-2 items-center">
                <span class="w-8 h-4 border border-black rounded-full bg-[#09AA64]" /> 
                <p class="text-md sm:text-2xl">
                  Included in Service Area
                </p>
              </div>
            </div>
            <noscript>
              <img
                src="https://public.flourish.studio/visualisation/23590816/thumbnail"
                width="100%"
                height="100%"
                alt="service area map visualization"
                title="Service area map visualization"
                :loading
              />
            </noscript>
           </div>
         </ClientOnly>
    </BaseLayoutPageContainer>
  </BaseLayoutPageSection>
</template>

<script setup lang="ts">
defineOptions({
    name: 'BaseInteractiveServiceAreaMap'
})

const props = defineProps<{
  margin?: number;
  loading: "lazy" | "eager"
}>()

const marginStyling = computed(() => {
  const map: Record<number, string> = {
    2: 'mx-2 my-2 md:m-2',
    4: 'mx-4 my-4 md:m-4',
    6: 'mx-4 my-6 md:m-6',
    8: 'mx-4 my-8 md:m-8',
    10: 'mx-4 my-10 md:m-10',
    12: 'mx-4 my-12 md:m-12',
    14: 'mx-4 my-14 md:m-14',
  }
  return props.margin !== undefined ? map[props.margin] ?? '' : ''
})

const flourishContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  if (import.meta.client) {
    initializeFlourish()
  }
})

const initializeFlourish = () => {
  // Set up Flourish config BEFORE loading the script
  if (!window.Flourish) {
    window.Flourish = { 
      disable_autoload: true // This is the key!
    }
  }

  // Load the script if not already loaded
  if (!document.querySelector('script[src*="flourish.studio/resources/embed.js"]')) {
    const script = document.createElement('script')
    script.src = 'https://public.flourish.studio/resources/embed.js'
    script.async = true
    script.onload = () => {
      // Wait for layout to be fully settled, then manually load
      setTimeout(() => {
        loadFlourish()
      }, 200)
    }
    document.body.appendChild(script)
  } else {
    // Script already exists, just load the embed
    setTimeout(() => {
      loadFlourish()
    }, 200)
  }
}

const loadFlourish = () => {
  if (flourishContainer.value && window.Flourish?.loadEmbed) {
    // Use Flourish's manual loading function
    window.Flourish.loadEmbed(flourishContainer.value)
    
    // Force a resize after loading to ensure proper alignment
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 300)
  }
}

// Watch for route changes and reload
watch(() => useRouter().currentRoute.value.path, () => {
  if (import.meta.client) {
    nextTick(() => {
      setTimeout(() => {
        if (flourishContainer.value) {
          // Clear existing content first
          const iframe = flourishContainer.value.querySelector('iframe')
          if (iframe) {
            iframe.remove()
          }
          
          // Reload the embed
          loadFlourish()
        }
      }, 100)
    })
  }
})
</script>

<style scoped>
.flourish-embed :deep(iframe) {
  background-color: #f5f5f5 !important;
}

.flourish-embed :deep(iframe) #fl-legend-discrete-color-1 > p.fl-legend-title {
  font-family: '"Noto Serif"', 'serif' !important;
}



</style>