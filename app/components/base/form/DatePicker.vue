<template>
  <div class="flex flex-col">
    <label v-if="label" :for="id" class="font-extrabold text-xs inline-block mb-1 text-brand-primary capitalize">{{ label }}</label>
    <input
      :id="id"
      ref="inputRef"
      type="text"
      :name="name"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      class="border-2 text-left sm:w-full rounded-md p-1 text-base font-semibold text-gray-900 hover:border-brand-primary/50 bg-gray-50 focus-visible:outline-none focus:border-brand-primary focus:shadow-input"
    >
  </div>
</template>

<script setup lang="ts">
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'

defineOptions({ name: 'BaseFormDatePicker' })

const modelValue = defineModel<string | null>()

const props = defineProps<{
  label?: string
  name?: string
  id?: string
  placeholder?: string
  autocomplete?: string
  startDate?: string
  minDate?: boolean
  dateFormat?: string
}>()

const inputRef = ref<HTMLInputElement | null>(null)
let fp: flatpickr.Instance | null = null

onMounted(() => {
  if (!inputRef.value) return

  fp = flatpickr(inputRef.value, {
    defaultDate: props.startDate || modelValue.value || undefined,
    dateFormat: props.dateFormat || 'F j, Y',
    minDate: props.minDate ? new Date(Date.now() + 24 * 60 * 60 * 1000) : undefined,
    allowInput: true,
    onChange: (selectedDates, dateStr) => {
      modelValue.value = selectedDates.length > 0 ? dateStr : null
    },
    onClose: (selectedDates, dateStr) => {
      modelValue.value = selectedDates.length > 0 ? dateStr : null
    }
  })

  inputRef.value.value = modelValue.value || ''
})

watch(modelValue, (newVal) => {
  if (!inputRef.value) return

  const normalized = newVal || ''

  if (inputRef.value.value !== normalized) {
    inputRef.value.value = normalized
  }

  if (fp) {
    if (newVal) {
      fp.setDate(newVal, false)
    } else {
      fp.clear()
    }
  }
})
</script>

<style>
input::-webkit-date-and-time-value {
  text-align: left;
}
</style>