// stores/recaptcha.ts
export const useRecaptchaStore = defineStore('recaptcha', () => {
  const config = useRuntimeConfig()
  
  // State
  const scriptElement = ref<HTMLScriptElement | null>(null)
  const refCount = ref(0)
  const isLoaded = ref(false)

  interface WindowWithRecaptcha extends Window {
    grecaptcha?: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }

  // Actions
  const loadRecaptcha = () => {
    const win = window as WindowWithRecaptcha
    
    // Increment reference count
    refCount.value++
    
    // Only load if not already loaded
    if (scriptElement.value || win.grecaptcha) {
      return
    }
    
    scriptElement.value = document.createElement('script')
    scriptElement.value.src = `https://www.google.com/recaptcha/api.js?render=${config.public.recaptchaSiteKey}`
    scriptElement.value.async = true
    scriptElement.value.defer = true
    document.head.appendChild(scriptElement.value)
    isLoaded.value = true
  }

  const unloadRecaptcha = () => {
    const win = window as WindowWithRecaptcha
    
    // Decrement reference count
    refCount.value--
    
    // Only unload if no components are using it
    if (refCount.value <= 0) {
      // Remove script element
      if (scriptElement.value) {
        document.head.removeChild(scriptElement.value)
        scriptElement.value = null
      }
      
      // Remove ReCAPTCHA from window
      if (win.grecaptcha) {
        delete win.grecaptcha
      }
      
      // Remove ReCAPTCHA badge
      const badge = document.querySelector('.grecaptcha-badge')
      if (badge) {
        badge.remove()
      }
      
      // Remove any other ReCAPTCHA elements
      const recaptchaElements = document.querySelectorAll('[id^="___grecaptcha"]')
      recaptchaElements.forEach(el => el.remove())
      
      isLoaded.value = false
      refCount.value = 0 // Reset to 0
    }
  }

  // Getters
  const getRefCount = computed(() => refCount.value)
  const getIsLoaded = computed(() => isLoaded.value)
  const getScriptElement = computed(() => scriptElement.value)

  return {   
    // Actions
    loadRecaptcha,
    unloadRecaptcha,
    
    // Getters
    getRefCount,
    getIsLoaded,
    getScriptElement
  }
})