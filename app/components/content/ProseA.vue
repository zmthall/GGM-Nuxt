<template>
  <a v-bind="attrsWithoutRel" class="link" :rel="finalRel">
    <slot />
  </a>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const attrsWithoutRel = computed(() => {
  const { rel, ...rest } = attrs as Record<string, unknown>
  return rest
})

const finalRel = computed(() => {
  const incoming = String(attrs.rel ?? '')
  const tokens = new Set(incoming.split(/\s+/).filter(Boolean))

  // always enforce security for target="_blank"
  tokens.add('noopener')
  tokens.add('noreferrer')

  // if you NEVER want nofollow, uncomment:
  tokens.delete('nofollow')

  return Array.from(tokens).join(' ')
})
</script>
