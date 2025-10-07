<script setup lang="ts">
const props = withDefaults(defineProps<{
  when?: 'visible' | 'idle';
  rootMargin?: string;
  minDelayMs?: number;   // optional: avoid flash
}>(), { when: 'visible', rootMargin: '250px 0px', minDelayMs: 0 })

const ready = ref(false)
const host = ref<HTMLElement | null>(null)

onMounted(() => {
  const show = () => setTimeout(() => (ready.value = true), props.minDelayMs)

  if (props.when === 'idle') {
    const ric = (window).requestIdleCallback as ((cb: () => void, o?: { timeout?: number }) => number) | undefined
    if (ric) ric(show, { timeout: 2500 }); else setTimeout(show, 1500)
    return
  }

  const io = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting) { io.disconnect(); show() }
  }, { rootMargin: props.rootMargin })
  if (host.value) io.observe(host.value)
})
</script>

<template>
  <div ref="host">
    <slot v-if="ready" />
    <slot v-else name="placeholder" />
  </div>
</template>
