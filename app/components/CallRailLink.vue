<template>
  <component
    :is="tag"
    :href="isLink ? `tel:${tel}` : undefined"
    :class="cls"
    :aria-label="computedAriaLabel"
    :data-swap-tel="tel"
    :data-swap-display="display"
  >
    <slot>{{ display }}</slot>
  </component>
</template>

<script setup lang="ts">
interface Props {
  tel: string;          // e.g. "719-544-3231"
  display: string;      // e.g. "(719) 544-3231"
  cls?: string;         // classes for styling
  ariaLabel?: string;   // e.g. "Call front office (719) 544-3231"
  tag?: string;         // 'a' or 'span', defaults to 'a'
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'a',
  cls: 'hover:text-brand-secondary',
  ariaLabel: ''  // We'll compute this below
});

const isLink = computed(() => props.tag === 'a');

// Computed property for aria-label with fallback
const computedAriaLabel = computed(() => 
  props.ariaLabel || `Call ${props.display}`
);
</script>