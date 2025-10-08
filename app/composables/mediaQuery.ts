// composables/useMedia.ts
export function useMediaQuery(query: string) {
  const matches = ref(false)

  let mql: MediaQueryList | null = null
  let cleanup: (() => void) | null = null

  const set = () => { if (mql) matches.value = mql.matches }

  onMounted(() => {
    if (typeof window === 'undefined') return

    mql = window.matchMedia(query)
    set()

    // Listener that works for both modern and legacy APIs
    const onChange = (e: MediaQueryListEvent) => { matches.value = e.matches }

    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', onChange)
      cleanup = () => mql?.removeEventListener('change', onChange)
    } else {
      // Safari/old Chrome fallback (typed via safe casts)
      const legacy = mql as unknown as {
        addListener?: (cb: (e: MediaQueryListEvent) => void) => void
        removeListener?: (cb: (e: MediaQueryListEvent) => void) => void
      }
      legacy.addListener?.(onChange)
      cleanup = () => legacy.removeListener?.(onChange)
    }
  })

  onBeforeUnmount(() => {
    cleanup?.()
    cleanup = null
    mql = null
  })

  return matches
}

export const usePrefersReducedMotion = () =>
  useMediaQuery('(prefers-reduced-motion: reduce)')
