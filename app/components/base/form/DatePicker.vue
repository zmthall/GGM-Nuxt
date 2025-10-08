<template>
  <div class="flex flex-col">
    <label v-if="label" :for="id" class="font-extrabold text-xs inline-block mb-1 text-brand-primary capitalize">{{ label }}</label>
      <input
        :id="id"
        ref="inputRef"
        type="text"
        :name="name"
        :autocomplete
        :placeholder="placeholder"
        readonly
        class='border-2 text-left sm:w-full rounded-md p-1 text-base font-semibold text-gray-900 hover:border-brand-primary/50 bg-gray-50 focus-visible:outline-none focus:border-brand-primary focus:shadow-input'
      >
  </div>
</template> 

<script setup lang="ts">
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import { onMounted, ref, watch } from 'vue'

// Component options
defineOptions({ name: 'BaseFormDatePicker' })

// v-model support
const modelValue = defineModel<string>()

// Props
const props = defineProps<{
  label?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  autocomplete?: string;
  startDate?: string;
  minDate?: boolean;
  dateFormat?: string
}>()

const inputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (inputRef.value) {
    flatpickr(inputRef.value, {
      defaultDate: props.startDate || modelValue.value,
      dateFormat: props.dateFormat || 'F j, Y',
      minDate: props.minDate ? new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) : undefined,
      onChange: ([selectedDate], dateStr) => {
        if (selectedDate) {
          modelValue.value = dateStr
        }
      }
    })

    // sync initial value
    inputRef.value.value = modelValue.value || ''
  }
})

watch(modelValue, (newVal) => {
  if (inputRef.value && inputRef.value.value !== newVal) {
    inputRef.value.value = newVal || ''
  }
})
</script>

<style>
input::-webkit-date-and-time-value {
    text-align: left;
}
</style>
