<template>
  <component
    :is="tag"
    :href="isLink ? href : undefined"
    :class="cls"
    :aria-label="computedAriaLabel"
    :data-swap-tel="resolvedTel"
    :data-swap-display="resolvedDisplay"
    data-calltrk-noswap
  >
    <slot :display="resolvedDisplay" :tel="resolvedTel" :href="href">
      {{ resolvedDisplay }}
    </slot>
  </component>
</template>

<script setup lang="ts">
interface Props {
  tel: string
  display?: string
  cls?: string
  ariaLabel?: string
  tag?: string
}

const props = withDefaults(defineProps<Props>(), {
  display: '',
  tag: 'a',
  cls: 'hover:text-brand-secondary',
  ariaLabel: ''
})

const isLink = computed(() => props.tag === 'a')

const { display, tel, href } = await useCallRailNumber(
  props.tel,
  props.display || undefined
)

const resolvedDisplay = computed(() => display.value)
const resolvedTel = computed(() => tel.value)

const computedAriaLabel = computed(() =>
  props.ariaLabel || `Call ${resolvedDisplay.value}`
)
</script>