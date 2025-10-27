<script setup lang="ts">
/**
 * SSR-First DeferRender component
 * - Keeps slot content in server HTML for SEO and crawlers
 * - Delays client-side hydration until "when" condition is met
 * - Supports `when="visible"` or `when="idle"`
 */

const props = withDefaults(defineProps<{
  when?: 'visible' | 'idle'
  rootMargin?: string
  threshold?: number | number[]
  minDelayMs?: number
  eagerIfInView?: boolean
  foldRatio?: number
  ssr?: boolean  // 👈 added: controls SSR render
}>(), {
  when: 'visible',
  rootMargin: '10px 0px',
  threshold: 0,
  minDelayMs: 0,
  eagerIfInView: true,
  foldRatio: 1,
  ssr: true
})

const host = ref<HTMLElement | null>(null)
/**
 * show determines whether hydration should happen
 * if props.ssr === true, we render HTML immediately (on SSR),
 * but interactivity only attaches client-side when ready === true
 */
const ready = ref(props.ssr)

/**
 * Delays client-side hydration only — HTML always exists in SSR output.
 */
onMounted(() => {
  const activate = () => {
    if (props.minDelayMs > 0) {
      setTimeout(() => (ready.value = true), props.minDelayMs)
    } else {
      ready.value = true
    }
  }

  if (props.when === 'idle') {
    const ric = window.requestIdleCallback
    if (ric) ric(activate, { timeout: 2500 })
    else setTimeout(activate, 1500)
    return
  }

  // Eager hydrate if already in view on mount
  if (props.eagerIfInView && host.value) {
    const r = host.value.getBoundingClientRect()
    const fold = window.innerHeight * props.foldRatio
    const isOnScreen = r.top < fold && r.bottom > 0
    if (isOnScreen) {
      activate()
      return
    }
  }

  // Otherwise wait for intersection
  const io = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting) {
      io.disconnect()
      activate()
    }
  }, { rootMargin: props.rootMargin, threshold: props.threshold })

  if (host.value) io.observe(host.value)
})
</script>

<template>
  <div ref="host">
    <!-- Always output children in SSR for crawlers -->
    <slot v-if="ready" name="default" />
    <!-- Optional placeholder for client render delay -->
    <slot v-else name="placeholder" />
  </div>
</template>
