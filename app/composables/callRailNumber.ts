interface CallRailResolvedNumber {
  target: string
  digits: string
  display: string
  tel: string
  swapped: boolean
}

interface CallRailResolveResponse {
  numbers: Record<string, CallRailResolvedNumber>
}

function normalizeCallRailDigits(value: string): string {
  const digits = String(value || '').replaceAll(/\D/g, '')
  return digits.length > 10 ? digits.slice(-10) : digits
}

function formatFallbackNumber(value: string): string {
  const digits = normalizeCallRailDigits(value)

  if (digits.length !== 10) return value

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
}

function telFromDigits(value: string): string {
  const digits = normalizeCallRailDigits(value)
  return digits.length === 10 ? `+1${digits}` : value
}

export async function useCallRailNumber(defaultNumber: string, defaultDisplay?: string) {
  const target = normalizeCallRailDigits(defaultNumber)

  const cookie = useCookie<Record<string, CallRailResolvedNumber> | null>('cr_number_map', {
    default: () => null
  })

  const state = useState<Record<string, CallRailResolvedNumber>>(
    'callrail-number-map',
    () => cookie.value || {}
  )

  const fallback: CallRailResolvedNumber = {
    target,
    digits: target,
    display: defaultDisplay || formatFallbackNumber(defaultNumber),
    tel: telFromDigits(defaultNumber),
    swapped: false
  }

  if (!state.value[target]) {
    const headers = import.meta.server
      ? useRequestHeaders(['cookie', 'user-agent', 'referer', 'host', 'x-forwarded-host', 'x-forwarded-proto'])
      : undefined

    const { data } = await useAsyncData<CallRailResolvedNumber | null>(
      `callrail-number-${target}`,
      async () => {
        const response = await $fetch<CallRailResolveResponse>('/api/callrail/resolve', {
          method: 'POST',
          body: {
            targets: [target],
            landing: import.meta.client ? globalThis.location.href : undefined,
            referrer: import.meta.client ? (document.referrer || 'direct') : undefined
          },
          headers
        })

        return response.numbers[target] || null
      },
      {
        server: true,
        lazy: false,
        default: () => null
      }
    )

    if (data.value) {
      state.value[target] = data.value
      cookie.value = state.value
    }
  }

  const resolved = computed(() => state.value[target] || fallback)

  return {
    resolved,
    display: computed(() => resolved.value.display),
    tel: computed(() => resolved.value.tel),
    href: computed(() => `tel:${resolved.value.tel}`),
    swapped: computed(() => resolved.value.swapped),
    digits: computed(() => resolved.value.digits)
  }
}