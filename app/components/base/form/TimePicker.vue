<template>
  <div class="flex flex-col">
    <label
      v-if="label"
      :for="id"
      class="font-extrabold text-xs inline-block mb-1 text-brand-primary capitalize"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      ref="inputRef"
      type="text"
      :name="name"
      :autocomplete
      :placeholder="placeholder"
      readonly
      class="border-2 w-full rounded-md p-1 text-base font-semibold text-gray-900 hover:border-brand-primary/50 bg-gray-50 focus-visible:outline-none focus:border-brand-primary focus:shadow-input"
    />
  </div>
</template>

<script setup lang="ts">
import flatpickr from 'flatpickr'
import { onMounted, ref, watch } from 'vue'
import 'flatpickr/dist/themes/light.css'

defineOptions({ name: 'BaseFormTimePicker' })

const modelValue = defineModel<string>()

defineProps<{
  label?: string
  name?: string
  id?: string
  placeholder?: string
  autocomplete?: string
}>()

const inputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (inputRef.value) {
    flatpickr(inputRef.value, {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'h:i K', // 12-hour format with AM/PM
      time_24hr: false,
      defaultDate: modelValue.value || undefined,
      onChange: ([selectedTime], dateStr) => {
        if (selectedTime) {
          modelValue.value = dateStr // already formatted as "hh:mm AM/PM"
        }
      }
    })

    inputRef.value.value = modelValue.value || ''
  }
})

watch(modelValue, (newVal) => {
  if (inputRef.value && inputRef.value.value !== newVal) {
    inputRef.value.value = newVal || ''
  }
})
</script>
