<template>
  <a v-if="phone" :href="`tel:${phone.number}`" class="link">
    {{ phone.label }}
  </a>
  <span v-else class="text-zinc-500">
    —
  </span>
</template>

<script lang="ts" setup>
type Department = 'dispatch' | 'csr' | 'admin' | 'dme' | 'other'

const props = defineProps<{
  number?: string
  department: Department
}>()

type PhoneInfo = { number: string; label: string }

const deptPhones: Record<Exclude<Department, 'other'>, PhoneInfo> = {
  dispatch: { number: '+17195432525', label: '(719) 543-2525' },
  csr: { number: '+17195443231', label: '(719) 544-3231' },
  admin: { number: '+17196968032', label: '(719) 696-8032' },
  dme: { number: '+17195697361', label: '(719) 569-7361' }
}

function formatUsPhone(input: string): PhoneInfo | null {
  const digits = input.replace(/\D/g, '')

  // allow 10 digits, or 11 digits starting with 1
  const ten = digits.length === 10 ? digits
    : (digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : null)

  if (!ten) return null

  const area = ten.slice(0, 3)
  const mid = ten.slice(3, 6)
  const last = ten.slice(6)

  return {
    number: `+1${ten}`,                 // tel href
    label: `(${area}) ${mid}-${last}`   // display
  }
}

const phone = computed<PhoneInfo | null>(() => {
  if (props.department !== 'other') return deptPhones[props.department]
  if (!props.number) return null
  return formatUsPhone(props.number)
})
</script>

<style>
</style>