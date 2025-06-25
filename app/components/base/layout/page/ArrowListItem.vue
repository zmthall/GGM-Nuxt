<template>
  <div :class="['relative min-h-[120px] !mt-8 md:!mt-16 arrow md:mx-16', {'bg-green-800 after:text-green-800': color === 'green', 'bg-red-500 after:text-red-500': color === 'red'}]">
    <div v-if="$slots.number" class="absolute h-[120px] w-[120px] shadow-primary -top-4 -left-12 max-md:top-0 max-md:left-0 bg-white flex justify-center items-center text-4xl font-bold">
      <slot name="number" />
    </div>
    <slot name="default" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  color: "green" | "red"
}>()
</script>

<style scoped>
  .arrow {
    @apply after:w-0 after:h-0 after:absolute after:right-0 after:top-0 after:translate-x-[100%] after:max-[775px]:hidden
            after:border-t-[60px] after:border-t-transparent 
            after:border-b-[60px] after:border-b-transparent 
            after:border-l-[60px] after:border-l-current 
  }
</style>