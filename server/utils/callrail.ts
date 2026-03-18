import { getCookie, getHeader, getRequestURL, type H3Event, setCookie } from 'h3'

export interface CallRailResolvedNumber {
  target: string
  digits: string
  display: string
  tel: string
  swapped: boolean
}

interface ResolveOptions {
  targets: string[]
  landing?: string
  referrer?: string
}

interface ResolveResult {
  numbers: Record<string, CallRailResolvedNumber>
}

interface CallRailSwapResponse {
  domless?: boolean
  number_assignment?: boolean
  integration_retry?: boolean
  integration_retries?: unknown
  r?: Record<string, unknown>
  a?: Record<string, unknown>
}

interface CallRailAccountConfig {
  companyId: string
  accessKey: string
  version: string
}

const COOKIE_MAX_AGE = 60 * 60 * 24 * 180

const CALLRAIL_ACCOUNTS = {
  transportation: {
    companyId: '691517791',
    accessKey: '60c02cd08e344bb7ef3a',
    version: '12'
  },
  medicalSupply: {
    companyId: '260735573',
    accessKey: '1f1501af55b732e77b93',
    version: '12'
  }
} satisfies Record<string, CallRailAccountConfig>

const PHONE_ACCOUNT_MAP: Record<string, keyof typeof CALLRAIL_ACCOUNTS> = {
  '7195432525': 'transportation',
  '7195443231': 'transportation',
  '7195697361': 'medicalSupply'
}

function safeJsonParse<T>(value: string | undefined | null, fallback: T): T {
  if (!value) return fallback

  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

function normalizeDigits(value: string): string {
  const digits = String(value || '').replaceAll(/\D/g, '')
  return digits.length > 10 ? digits.slice(-10) : digits
}

function formatUsNumber(value: string): string {
  const digits = normalizeDigits(value)

  if (digits.length !== 10) return value

  const area = digits.slice(0, 3)
  const prefix = digits.slice(3, 6)
  const line = digits.slice(6, 10)

  return `(${area}) ${prefix}-${line}`
}

function toTel(value: string): string {
  const digits = normalizeDigits(value)
  return digits.length === 10 ? `+1${digits}` : value
}

function createSessionId(): string {
  return crypto.randomUUID()
}

function getEndpoint(account: CallRailAccountConfig): string {
  return `https://js.callrail.com/group/0/${account.accessKey}/${account.version}/swap_session.json`
}

function getAccountForTarget(target: string): CallRailAccountConfig | null {
  const normalized = normalizeDigits(target)
  const accountKey = PHONE_ACCOUNT_MAP[normalized]

  if (!accountKey) return null

  return CALLRAIL_ACCOUNTS[accountKey]
}

function getCookieMap(event: H3Event): Record<string, CallRailResolvedNumber> {
  return safeJsonParse<Record<string, CallRailResolvedNumber>>(getCookie(event, 'cr_number_map'), {})
}

function setCookieMap(event: H3Event, map: Record<string, CallRailResolvedNumber>) {
  setCookie(event, 'cr_number_map', JSON.stringify(map), {
    path: '/',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE
  })
}

function getOrCreateSessionId(event: H3Event): string {
  const existing = getCookie(event, 'calltrk_session_id')

  if (existing) return existing

  const created = createSessionId()

  setCookie(event, 'calltrk_session_id', created, {
    path: '/',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE
  })

  return created
}

function getLanding(event: H3Event, explicit?: string): string {
  const existing = getCookie(event, 'calltrk_landing')
  const landing = explicit || existing || getRequestURL(event).toString()

  setCookie(event, 'calltrk_landing', landing, {
    path: '/',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE
  })

  return landing
}

function getReferrer(event: H3Event, explicit?: string): string {
  const existing = getCookie(event, 'calltrk_referrer')
  const headerReferrer = getHeader(event, 'referer')
  const referrer = explicit || existing || headerReferrer || 'direct'

  setCookie(event, 'calltrk_referrer', referrer, {
    path: '/',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE
  })

  return referrer
}

function normalizeAssignmentKey(key: string): string {
  const firstPart = String(key).split(',')[0] || key

  try {
    return normalizeDigits(decodeURIComponent(firstPart))
  } catch {
    return normalizeDigits(firstPart)
  }
}

function pickAssignmentValue(value: unknown): string | null {
  if (!value) return null

  if (typeof value === 'string') return value

  if (Array.isArray(value)) {
    const first = value[0]
    return typeof first === 'string' ? first : null
  }

  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>

    if (typeof obj.national_string === 'string') return obj.national_string
    if (typeof obj.e164 === 'string') return obj.e164

    if (Array.isArray(obj.formats)) {
      const firstString = obj.formats.find((item): item is string => typeof item === 'string')
      if (firstString) return firstString
    }
  }

  return null
}

function findAssignmentForTarget(input: unknown, target: string, seen = new WeakSet<object>()): string | null {
  if (!input || typeof input !== 'object') return null

  if (seen.has(input)) return null
  seen.add(input)

  for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
    if (normalizeAssignmentKey(key) === target) {
      const direct = pickAssignmentValue(value)
      if (direct) return direct
    }

    if (value && typeof value === 'object') {
      const nested = findAssignmentForTarget(value, target, seen)
      if (nested) return nested
    }
  }

  return null
}

function buildResolvedNumber(target: string, assignedValue: string | null): CallRailResolvedNumber {
  const fallbackDigits = normalizeDigits(target)
  const assignedDigits = assignedValue ? normalizeDigits(assignedValue) : fallbackDigits
  const display = assignedValue ? formatUsNumber(assignedValue) : formatUsNumber(target)

  return {
    target,
    digits: assignedDigits,
    display,
    tel: toTel(assignedDigits),
    swapped: assignedDigits.length === 10 && assignedDigits !== fallbackDigits
  }
}

async function fetchAssignments(
  event: H3Event,
  account: CallRailAccountConfig,
  targets: string[],
  landing: string,
  referrer: string,
  sessionId: string
): Promise<CallRailSwapResponse> {
  const userAgent = getHeader(event, 'user-agent') || ''

  const payload = {
    cid: null,
    uuid: sessionId,
    ref: referrer,
    landing,
    user_agent: userAgent,
    record_pageview: true,
    domless: true,
    swaps: targets.map((target) => `${target}=${target}`),
    all_formats: true,
    ids: [account.companyId],
    perf: {}
  }

  return await $fetch<CallRailSwapResponse>(getEndpoint(account), {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'content-type': 'text/plain',
      'accept': 'application/json',
      'user-agent': userAgent
    }
  })
}

function extractResolvedNumbers(
  data: CallRailSwapResponse,
  targets: string[],
  companyId: string
): Record<string, CallRailResolvedNumber> {
  const result: Record<string, CallRailResolvedNumber> = {}

  for (const target of targets) {
    const assigned =
      findAssignmentForTarget(data.r, target) ||
      findAssignmentForTarget(data.a?.[companyId], target) ||
      findAssignmentForTarget(data.a?.global, target) ||
      findAssignmentForTarget(data.a, target) ||
      findAssignmentForTarget(data, target)

    result[target] = buildResolvedNumber(target, assigned)
  }

  return result
}

export async function resolveCallRailTargets(event: H3Event, options: ResolveOptions): Promise<ResolveResult> {
  const normalizedTargets = [...new Set((options.targets || []).map(normalizeDigits).filter((value) => value.length === 10))]
  const cookieMap = getCookieMap(event)

  if (!normalizedTargets.length) {
    return { numbers: {} }
  }

  const sessionId = getOrCreateSessionId(event)
  const landing = getLanding(event, options.landing)
  const referrer = getReferrer(event, options.referrer)

  const groupedTargets = new Map<string, { account: CallRailAccountConfig; targets: string[] }>()

  for (const target of normalizedTargets) {
    if (cookieMap[target]) continue

    const account = getAccountForTarget(target)

    if (!account) continue

    const key = `${account.companyId}:${account.accessKey}`

    if (!groupedTargets.has(key)) {
      groupedTargets.set(key, { account, targets: [] })
    }

    groupedTargets.get(key)?.targets.push(target)
  }

  let mergedMap: Record<string, CallRailResolvedNumber> = { ...cookieMap }

  for (const { account, targets } of groupedTargets.values()) {
    const response = await fetchAssignments(event, account, targets, landing, referrer, sessionId)
    const resolvedMissing = extractResolvedNumbers(response, targets, account.companyId)
    mergedMap = { ...mergedMap, ...resolvedMissing }
  }

  for (const target of normalizedTargets) {
    if (!mergedMap[target]) {
      mergedMap[target] = buildResolvedNumber(target, null)
    }
  }

  setCookieMap(event, mergedMap)

  return {
    numbers: normalizedTargets.reduce<Record<string, CallRailResolvedNumber>>((acc, target) => {
      acc[target] = mergedMap[target] || buildResolvedNumber(target, null)
      return acc
    }, {})
  }
}