<template>
  <label
    :for="`${name}-${value}`"
    class="inline-flex items-start gap-2 cursor-pointer"
  >
    <input
      :id="`${name}-${value}`"
      v-model="checkedValue"
      type="radio"
      :value="value"
      :name="name"
      class="sr-only peer/input"
    >

    <div
      class="shrink-0 size-6 border-2 rounded-full bg-white relative
             hover:border-brand-primary
             peer-checked/input:border-brand-primary
             peer-checked/input:before:bg-brand-primary
             radio-input"
      aria-hidden="true"
    />

    <span class="leading-snug">
      <slot />
    </span>
  </label>
</template>

<script setup lang='ts'>

defineOptions({
    name: 'BaseFormRadio'
})

const checkedValue = defineModel<string>()


withDefaults(defineProps<{
    value: string | undefined;
    name: string;
}>(), {
})
</script>

<style scoped>
    .radio-input {
        @apply before:absolute before:size-4 before:rounded-full before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2;
    }
</style>