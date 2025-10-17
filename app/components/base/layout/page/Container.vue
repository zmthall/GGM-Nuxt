<template>
  <div class="mx-auto" :style="maxWidthStyle">
    <slot />
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  maxWidth?: string
}>(), {
  maxWidth: '1200px'
})

const maxWidthStyle = computed(() => `max-width: ${props.maxWidth}`)


</script>

<style>

</style>