<script setup lang="ts">
const props = withDefaults(defineProps<{
  when?: 'visible' | 'idle'
  rootMargin?: string
  threshold?: number | number[]
  minDelayMs?: number
  eagerIfInView?: boolean
  foldRatio?: number
}>(), {
  when: 'visible',
  rootMargin: '10px 0px',
  threshold: 0,
  minDelayMs: 0,
  eagerIfInView: true,
  foldRatio: 1
})

const ready = ref(false)
const host = ref<HTMLElement | null>(null)

onMounted(() => {
  const show = () => {
    if (props.minDelayMs > 0) setTimeout(() => (ready.value = true), props.minDelayMs)
    else ready.value = true
  }

  if (props.when === 'idle') {
    const ric = window.requestIdleCallback
    if (ric) ric(show, { timeout: 2500 }); else setTimeout(show, 1500)
    return
  }

  // Eager if actually in view at mount (desktop)
  if (props.eagerIfInView && host.value) {
    const r = host.value.getBoundingClientRect()
    const fold = window.innerHeight * props.foldRatio
    const isOnScreen = r.top < fold && r.bottom > 0
    if (isOnScreen) { show(); return }
  }

  // Otherwise, wait for intersection
  const io = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting) { io.disconnect(); show() }
  }, { rootMargin: props.rootMargin, threshold: props.threshold })

  if (host.value) io.observe(host.value)
})
</script>

<template>
  <div ref="host">
    <slot v-if="ready" />
    <slot v-else name="placeholder" />
  </div>
</template>
