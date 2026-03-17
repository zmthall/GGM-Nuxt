<script setup lang="ts">
type LocaleEntry = string | { code: string; name?: string }

const { locale, locales, setLocale } = useI18n()

const rootEl = ref<HTMLElement | null>(null)
const isOpen = ref(false)

const ROW_HEIGHT = 64

const localeMeta = {
  en: {
    shortLabel: 'EN',
    longLabel: 'English',
    icon: 'emojione:flag-for-united-states'
  },
  es: {
    shortLabel: 'ES',
    longLabel: 'Español',
    icon: 'emojione:flag-for-spain'
  }
} as const

const normalizedLocales = computed(() => {
  return (locales.value as LocaleEntry[]).map((entry) => {
    if (typeof entry === 'string') {
      return {
        code: entry,
        name: entry.toUpperCase()
      }
    }

    return {
      code: entry.code,
      name: entry.name ?? entry.code.toUpperCase()
    }
  })
})

const currentLocale = computed(() => {
  return normalizedLocales.value.find(item => item.code === locale.value) ?? { code: 'en', name: 'English' }
})

const availableLocales = computed(() => {
  return normalizedLocales.value.filter(item => item.code !== locale.value)
})

const getLocaleDisplay = (code: string) => {
  return localeMeta[code as keyof typeof localeMeta] ?? {
    shortLabel: code.toUpperCase(),
    longLabel: code.toUpperCase(),
    icon: 'material-symbols:language'
  }
}

const containerStyle = computed(() => {
  const openRows = availableLocales.value.length + 1
  return {
    maxHeight: `${isOpen.value ? ROW_HEIGHT * openRows : ROW_HEIGHT}px`
  }
})

const openMenu = () => {
  if (!availableLocales.value.length) return
  isOpen.value = true
}

const closeMenu = () => {
  isOpen.value = false
}

const switchLanguage = async (code: string) => {
  if (code === locale.value) {
    closeMenu()
    return
  }

  if(code === 'en' || code === 'es') {
    await setLocale(code)
  }
  closeMenu()
  return
}

const handleDocumentClick = (event: MouseEvent | TouchEvent) => {
  const target = event.target as Node | null
  if (!rootEl.value || !target) return
  if (!rootEl.value.contains(target)) closeMenu()
}

const handleFocusOut = (event: FocusEvent) => {
  const relatedTarget = event.relatedTarget as Node | null
  if (!rootEl.value) return
  if (relatedTarget && rootEl.value.contains(relatedTarget)) return
  closeMenu()
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') closeMenu()
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
  document.addEventListener('touchstart', handleDocumentClick)
  document.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
  document.removeEventListener('touchstart', handleDocumentClick)
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <div ref="rootEl" class="fixed bottom-4 left-4 z-50 sm:bottom-6 sm:left-6" @mouseenter="openMenu" @mouseleave="closeMenu" @focusout="handleFocusOut">
    <div class="group/lang-btn flex flex-col justify-end overflow-hidden rounded-[1.15rem] opacity-30 border border-[#b79b55] bg-white shadow-[0_14px_32px_rgba(15,31,92,0.18)] transition-[max-height] duration-250 ease-out hover:opacity-100" :style="containerStyle">
      <button v-for="item in availableLocales" :key="item.code" type="button" class="flex h-0 w-[125px] items-center gap-3 border-b border-[#e9dfc1] px-5 text-left text-[#10225c] transition duration-150 overflow-hidden hover:bg-[#f8f4ea] group-hover/lang-btn:h-10 focus:bg-[#f8f4ea] focus:outline-none" @click="switchLanguage(item.code)">
        <BaseIcon :name="getLocaleDisplay(item.code).icon" class="h-7 w-7 shrink-0" />
        <span class="text-md font-semibold leading-none">{{ getLocaleDisplay(item.code).shortLabel }}</span>
      </button>

      <button type="button" class="flex h-10 w-[125px] items-center justify-between gap-4 px-5 text-[#10225c] transition duration-250 hover:bg-[#fcfbf7] focus:bg-[#fcfbf7] focus:outline-none" :aria-expanded="isOpen ? 'true' : 'false'" aria-haspopup="menu" aria-label="Select language">
        <span class="inline-flex items-center gap-3">
          <BaseIcon :name="getLocaleDisplay(currentLocale.code).icon" class="h-7 w-7 shrink-0" />
          <span class="text-md font-semibold leading-none">{{ getLocaleDisplay(currentLocale.code).shortLabel }}</span>
        </span>

        <BaseIcon name="heroicons:chevron-up-20-solid" class="h-5 w-5 shrink-0 transition duration-200" :class="isOpen ? '' : 'rotate-180'" />
      </button>
    </div>
  </div>
</template>