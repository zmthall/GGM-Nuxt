<template>
  <BaseLayoutPageSection margin="top">
    <BaseLayoutPageContainer>
         <ClientOnly>
           <div
             ref="flourishContainer"
             class="flourish-embed flourish-map"
             data-src="visualisation/23590816"
           >
             <noscript>
               <img
                 src="https://public.flourish.studio/visualisation/23590816/thumbnail"
                 width="100%"
                 alt="map visualization"
               />
             </noscript>
           </div>
         </ClientOnly>
    </BaseLayoutPageContainer>
  </BaseLayoutPageSection>
</template>

<script setup>
const flourishContainer = ref(null)

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
</style>