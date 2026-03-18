<template>
  <CallRailLink
    v-if="phone && shouldUseCallRail"
    :tel="phone.number"
    :display="phone.label"
    cls="link"
    :aria-label="`Call ${phone.label}`"
  />

  <a v-else-if="phone" :href="`tel:${phone.number}`" class="link">
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
  const digits = input.replaceAll(/\D/g, '')

  let ten;

  if(digits.length === 10) {
    ten = digits
  } else if (digits.length === 11 && digits.startsWith('1')) {
    ten = digits.slice(1)
  } else {
    return null
  }

  if (!ten) return null

  const area = ten.slice(0, 3)
  const mid = ten.slice(3, 6)
  const last = ten.slice(6)

  return {
    number: `+1${ten}`,
    label: `(${area}) ${mid}-${last}`
  }
}

const phone = computed<PhoneInfo | null>(() => {
  if (props.department !== 'other') return deptPhones[props.department]
  if (!props.number) return null
  return formatUsPhone(props.number)
})

const shouldUseCallRail = computed(() => {
  if (!phone.value) return false

  if (props.department === 'dispatch') return true
  if (props.department === 'csr') return true
  if (props.department === 'dme') return true

  if (props.department === 'other') {
    const digits = phone.value.number.replaceAll(/\D/g, '')
    return ['17195432525', '17195443231', '17195697361'].includes(digits)
  }

  return false
})
</script>

<style>
</style>