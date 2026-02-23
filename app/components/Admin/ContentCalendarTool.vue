<template>
  <div class="bg-gray-50 p-4">
    <div class="max-w-7xl mx-auto">
      <div v-if="showToolbar" class="bg-white rounded-lg shadow-lg p-6 mb-6 print:hidden">
        <h1 class="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span class="inline-flex items-center justify-center w-8 h-8 rounded bg-gray-100">📅</span>
          {{ title }}
        </h1>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Paste your CSV data here:</label>
          <textarea v-model="inputData" class="w-full h-32 p-3 border border-gray-300 rounded-lg font-mono text-sm" placeholder="Date,Day,PostType,ServiceLine,CityFocus,WorkingTitle,PrimaryKeyword,PrimaryQuestionAnswered,Notes" />
        </div>

        <div v-if="posts.length === 0" class="flex gap-3 flex-wrap">
          <button type="button" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" @click="handleGenerate">
            Generate Calendar
          </button>

          <button v-if="posts.length === 0" type="button" class="px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-800 transition" @click="openLoadModal">
            📂 Load Calendar
          </button>
        </div>

        <div v-if="posts.length > 0" class="flex gap-3 justify-between">
          <div class="flex gap-3">
            <button type="button" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" @click="handleGenerate">
              Generate Calendar
            </button>
            
            <button type="button" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2" @click="exportToICS">
              ⬇️ Export to Google Calendar
            </button>

            <button type="button" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2" @click="handlePrint">
              🖨️ Print Calendar
            </button>

            <button v-if="authStore.role === 'admin'" type="button" class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition flex items-center gap-2" @click="saveCopyShareLink">
              💾 Save / Copy Link
            </button>
          </div>
          <div>
            <button type="button" class="px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-800 transition flex items-center gap-2" @click="handleReset">
              ♻️ Reset
            </button>
          </div>
        </div>
      </div>

      <div v-if="posts.length > 0" ref="printRef" class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4 text-center">{{ monthName }}</h2>

        <div class="grid grid-cols-7 gap-1">
          <div v-for="d in weekdayLabels" :key="d" class="text-center font-semibold text-gray-600 py-2 text-sm">
            {{ d }}
          </div>

          <div v-for="(date, index) in days" :key="index" class="min-h-24 border border-gray-200 p-1 bg-white print:min-h-20">
            <template v-if="date">
              <div class="text-sm font-semibold text-gray-600 mb-1">{{ date.getDate() }}</div>

              <template v-for="(post, postIndex) in getPostsForDate(date)" :key="postIndex">
                <div class="text-white text-xs p-1 rounded mb-1 cursor-pointer hover:opacity-80 transition print:cursor-default" :style="{ backgroundColor: getServiceColor(post.serviceFocus) }" @click="selectPost(post)">
                  <div class="font-semibold text-[10px] leading-tight">{{ post.serviceFocus }}</div>
                  <div class="text-[9px] leading-tight mt-0.5 line-clamp-2">{{ post.coreQuestion }}</div>
                </div>
              </template>
            </template>
          </div>
        </div>

        <div class="mt-6 flex gap-4 text-xs flex-wrap">
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded" :style="{ backgroundColor: serviceColors.NEMT }" />
            <span>NEMT Transportation</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded" :style="{ backgroundColor: serviceColors.DME }" />
            <span>Medical Supplies</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded" :style="{ backgroundColor: serviceColors.AL }" />
            <span>Assisted Living</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded" :style="{ backgroundColor: serviceColors.DEFAULT }" />
            <span>Other</span>
          </div>
        </div>
      </div>

      <div v-if="selectedPost" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 print:hidden" @click="selectedPost = null">
        <div class="bg-white rounded-lg p-6 max-w-2xl w-full" @click.stop>
          <h3 class="text-xl font-bold mb-4" :style="{ color: getServiceColor(selectedPost.serviceFocus) }">
            {{ selectedPost.serviceFocus }} - {{ selectedPost.cityFocus }}
          </h3>

          <div class="space-y-3">
            <div>
              <strong class="text-gray-700">Date:</strong>
              <p>{{ formatDate(selectedPost.date) }}</p>
            </div>
            <div>
              <strong class="text-gray-700">Type:</strong>
              <p>{{ selectedPost.type }}</p>
            </div>
            <div>
              <strong class="text-gray-700">Working Title:</strong>
              <p>{{ selectedPost.workingTitle }}</p>
            </div>
            <div>
              <strong class="text-gray-700">Core Question:</strong>
              <p>{{ selectedPost.coreQuestion }}</p>
            </div>
            <div>
              <strong class="text-gray-700">Primary Keyword:</strong>
              <p>{{ selectedPost.primaryKeyword }}</p>
            </div>
            <div v-if="selectedPost.notes">
              <strong class="text-gray-700">Notes:</strong>
              <p>{{ selectedPost.notes }}</p>
            </div>
          </div>

          <div class="mt-6 flex items-center justify-end gap-3">
            <button type="button" class="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition" @click="copyPostRequest(selectedPost)">
              {{ copied ? 'Copied!' : 'Copy Ruleset + Brief' }}
            </button>

            <button type="button" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition" @click="selectedPost = null">
              Close
            </button>
          </div>
        </div>
      </div>

      <BaseInteractiveModal v-model="loadModalOpen" small-modal styling="justify-between overflow-auto" :padding="3" @close="closeLoadModal">
        <div class="space-y-4">
          <div class="flex items-center justify-between gap-3">
            <h2 class="text-xl text-brand-primary font-bold">Load Calendar</h2>
            <button type="button" class="px-3 py-1 rounded bg-zinc-200 hover:bg-zinc-300 transition" :disabled="loadModalBusy" @click="refreshCalendarList">
              Refresh
            </button>
          </div>

          <p v-if="loadModalError" class="text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">
            {{ loadModalError }}
          </p>

          <div v-if="loadModalBusy" class="text-sm text-gray-600">
            Loading calendars...
          </div>

          <div v-else>
            <div class="my-3">
              <label class="block text-xs font-semibold text-zinc-600 mb-1">Filter (optional)</label>
              <input v-model="calendarFilter" type="text" class="w-full border border-zinc-300 rounded px-3 py-2 text-sm" placeholder="e.g. 2026-04">
            </div>

            <div v-if="calendarItems.length === 0" class="text-sm text-gray-600">
              No saved calendars yet.
            </div>

            <ul v-else class="divide-y divide-zinc-200 border border-zinc-200 rounded">
              <li v-for="item in filteredCalendarItems" :key="item.key" class="flex items-center justify-between gap-3 p-3 hover:bg-zinc-50">
                <div class="flex flex-col">
                  <span class="font-semibold text-zinc-800">{{ item.key }}</span>
                  <span class="text-xs text-zinc-500">
                    Updated: {{ formatIso(item.updatedAt) }}
                  </span>
                </div>

                <div class="flex items-center gap-2">
                  <button type="button" class="px-3 py-1 rounded bg-brand-primary text-white hover:opacity-90 transition" :disabled="loadModalBusy" @click="loadCalendar(item.key)">
                    Load
                  </button>

                  <button v-if="authStore.role === 'admin'" type="button" class="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition disabled:grayscale" :disabled="loadModalBusy" @click="deleteCalendar(item.key)">
                    Delete
                  </button>
                </div>
              </li>
            </ul>
          </div>

          <div class="flex justify-end gap-2 pt-2">
            <button type="button" class="px-4 py-2 rounded bg-zinc-600 text-white hover:bg-zinc-700 transition" @click="closeLoadModal">
              Close
            </button>
          </div>
        </div>
      </BaseInteractiveModal>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LocationQueryRaw } from 'vue-router'

const authStore = useAuthStore();

type CalendarPost = {
  date: Date
  day: string
  type: string
  serviceFocus: string
  cityFocus: string
  workingTitle: string
  primaryKeyword: string
  coreQuestion: string
  notes: string
}

type CalendarListItem = {
  key: string
  createdAt: string
  updatedAt: string
}

const props = withDefaults(defineProps<{
  title?: string
  showToolbar?: boolean
  syncUrl?: boolean
  queryKey?: string
  initialData?: string
}>(), {
  title: 'Content Calendar Tool',
  showToolbar: true,
  syncUrl: true,
  queryKey: 'data',
  initialData: ''
})

const emit = defineEmits<{
  (e: 'generated', posts: CalendarPost[]): void
}>()

const route = useRoute()
const router = useRouter()

const inputData = ref<string>('')
const posts = ref<CalendarPost[]>([])
const currentMonth = ref<Date>(new Date())
const selectedPost = ref<CalendarPost | null>(null)
const printRef = ref<HTMLElement | null>(null)

const serviceColors = {
  NEMT: '#121B75',
  DME: '#A3150D',
  AL: '#4A90E2',
  DEFAULT: '#666666'
}

const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const STORAGE_PREFIX = 'content-calendar:'
const STORAGE_KEY_PARAM = 'dataKey'
const CALENDAR_OPEN_PARAM = 'calendar'
const KEY_PARAM = 'key'
const MAX_URL_LEN = 7000

function pad2(n: number) {
  return String(n).padStart(2, '0')
}

function monthKeyFromDate(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`
}

async function getAuthHeaders() {
  const authStore = useAuthStore()
  const idToken = await authStore.getIdToken()
  return { Authorization: `Bearer ${idToken}` } as const
}

async function tryLoadFromKeyParam(key: string) {
  try {
    const authStore = useAuthStore()
    if (!authStore.isFirebaseReady) {
      const { $getFirebase } = useNuxtApp()
      try { await $getFirebase() } catch { /* ignore */ }
    }

    if (!authStore.isFirebaseReady) {
      await new Promise<void>((resolve) => {
        const stop = watch(
          () => authStore.isFirebaseReady,
          (ok) => {
            if (!ok) return
            stop()
            resolve()
          },
          { immediate: true }
        )
      })
    }

    const headers = await getAuthHeaders()

    const rec = await $fetch<{ key: string; csv: string }>(`/api/calendar/${encodeURIComponent(key)}`, {
      baseURL: "https://api.goldengatemanor.com",
      method: 'GET',
      headers
    })


    const csv = String(rec?.csv ?? '').trim()
    if (!csv) return false

    inputData.value = csv
    parseData(csv)
    return true
  } catch (e) {
    console.error('tryLoadFromKeyParam failed:', e)
    return false
  }
}

onMounted(async () => {
  if (!props.syncUrl) {
    if (props.initialData) {
      inputData.value = props.initialData
      parseData(props.initialData)
    }
    return
  }

  const qpKeyParam = route.query?.[KEY_PARAM]
  const qpKeyRaw = Array.isArray(qpKeyParam) ? qpKeyParam[0] : qpKeyParam
  if (qpKeyRaw && import.meta.client) {
    const ok = await tryLoadFromKeyParam(String(qpKeyRaw))
    if (ok) return
  }

  const qpKey = route.query?.[props.queryKey]
  const qpRaw = Array.isArray(qpKey) ? qpKey[0] : qpKey
  if (qpRaw) {
    try {
      const decoded = decodeURIComponent(String(qpRaw))
      inputData.value = decoded
      parseData(decoded)
      return
    } catch (e) {
      console.error('Error loading from URL data param:', e)
    }
  }

  const storageParam = route.query?.[STORAGE_KEY_PARAM]
  const storageRaw = Array.isArray(storageParam) ? storageParam[0] : storageParam
  if (storageRaw && import.meta.client) {
    try {
      const stored = sessionStorage.getItem(`${STORAGE_PREFIX}${storageRaw}`)
      if (stored) {
        inputData.value = stored
        parseData(stored)
        return
      }
    } catch (e) {
      console.error('Error loading from sessionStorage:', e)
    }
  }

  if (props.initialData) {
    inputData.value = props.initialData
    parseData(props.initialData)
  }
})

function unquoteCSVValue(value: unknown) {
  if (value == null) return ''
  let v = String(value)
  if (v.length >= 2 && v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1).replace(/""/g, '"')
  return v.trim()
}

function parseCSVLine(line: string) {
  const values: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
      continue
    }
    if (char === ',' && !inQuotes) {
      values.push(current)
      current = ''
      continue
    }
    current += char
  }

  values.push(current)
  return values.map(unquoteCSVValue)
}

function parseDate(dateStrRaw: string | undefined | null): Date | null {
  if (!dateStrRaw) return null
  const dateStr = String(dateStrRaw).trim()
  if (!dateStr) return null

  const isoMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (isoMatch) {
    const year = Number(isoMatch[1])
    const month = Number(isoMatch[2]) - 1
    const day = Number(isoMatch[3])
    const d = new Date(year, month, day)
    if (!Number.isNaN(d.getTime())) return d
  }

  const numericMatch = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (numericMatch) {
    const month = Number(numericMatch[1]) - 1
    const day = Number(numericMatch[2])
    const year = Number(numericMatch[3])
    const d = new Date(year, month, day)
    if (!Number.isNaN(d.getTime())) return d
  }

  const monthMap: Record<string, number> = {
    january: 0, jan: 0,
    february: 1, feb: 1,
    march: 2, mar: 2,
    april: 3, apr: 3,
    may: 4,
    june: 5, jun: 5,
    july: 6, jul: 6,
    august: 7, aug: 7,
    september: 8, sep: 8, sept: 8,
    october: 9, oct: 9,
    november: 10, nov: 10,
    december: 11, dec: 11
  }

  const longMatch = dateStr.replace(/,/g, '').match(/^([A-Za-z]+)\s+(\d{1,2})\s+(\d{4})$/)
  if (longMatch) {
    const monthToken = String(longMatch[1] || '').toLowerCase()
    const day = Number(longMatch[2])
    const year = Number(longMatch[3])
    const month = monthMap[monthToken]
    if (month !== undefined && !Number.isNaN(day) && !Number.isNaN(year)) {
      const d = new Date(year, month, day)
      if (!Number.isNaN(d.getTime())) return d
    }
  }

  const fallback = new Date(dateStr)
  if (!Number.isNaN(fallback.getTime())) return fallback
  return null
}

function parseData(data: string) {
  const rawLines = String(data || '').split('\n')
  const lines = rawLines.map(l => l.trim()).filter(l => l.length > 0)

  if (lines.length < 1) {
    posts.value = []
    return
  }

  const firstRowValues = parseCSVLine(lines[0] || '')
  const firstRowDate = parseDate(firstRowValues[0] ?? null)
  const startIndex = firstRowDate ? 0 : 1

  const parsed: CalendarPost[] = []

  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i]
    if (!line) continue
    const values = parseCSVLine(line)
    if (values.length < 8) continue
    const date = parseDate(values[0] ?? null)
    if (!date) continue

    parsed.push({
      date,
      day: values[1] ?? '',
      type: values[2] ?? '',
      serviceFocus: values[3] ?? '',
      cityFocus: values[4] ?? '',
      workingTitle: values[5] ?? '',
      primaryKeyword: values[6] ?? '',
      coreQuestion: values[7] ?? '',
      notes: values[8] ?? ''
    })
  }

  parsed.sort((a, b) => a.date.getTime() - b.date.getTime())
  posts.value = parsed

  const first = parsed.at(0)
  if (first) currentMonth.value = new Date(first.date.getFullYear(), first.date.getMonth(), 1)

  emit('generated', parsed)
}

function handleGenerate() {
  parseData(inputData.value)
  if (props.syncUrl) updateURL(inputData.value)
}

async function updateURL(data: string) {
  const encoded = encodeURIComponent(data)
  await router.replace({ query: { ...route.query, [props.queryKey]: encoded } })
}

function getDaysInMonth(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const out: Array<Date | null> = []
  for (let i = 0; i < startingDayOfWeek; i++) out.push(null)
  for (let i = 1; i <= daysInMonth; i++) out.push(new Date(year, month, i))
  return out
}

const days = computed(() => getDaysInMonth(currentMonth.value))

function getPostsForDate(date: Date) {
  return posts.value.filter(p => p.date.getDate() === date.getDate() && p.date.getMonth() === date.getMonth() && p.date.getFullYear() === date.getFullYear())
}

function normalizeService(raw: string) {
  const s = String(raw || '').toLowerCase()
  if (s.includes('nemt')) return 'NEMT'
  if (s.includes('dme') || s.includes('medical') || s.includes('suppl')) return 'DME'
  if (s.includes('assisted') || s.includes('living')) return 'AL'
  return 'DEFAULT'
}

function getServiceColor(serviceFocus: string) {
  const key = normalizeService(serviceFocus)
  return (serviceColors as Record<string, string>)[key] ?? serviceColors.DEFAULT
}

function selectPost(post: CalendarPost) {
  selectedPost.value = post
}

type SelectedPost = {
  date: Date // <-- matches your real data
  day: string
  type: string
  serviceFocus: string
  cityFocus: string
  workingTitle: string
  primaryKeyword: string
  coreQuestion: string
  notes?: string
}

const copied = ref(false)

function toISODate(value: Date | string) {
  if (value instanceof Date) return value.toISOString().slice(0, 10)

  // fallback if you ever pass a string later
  try {
    const d = new Date(value)
    if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10)
  } catch {
    // ignore
  }
  return String(value)
}

function buildNewPostTemplate(post: SelectedPost) {
  const additionalInfoParts = [
    `Scheduled date: ${toISODate(post.date)}`,
    `Post type: ${post.type}`,
    post.notes ? `Notes: ${post.notes}` : null
  ].filter(Boolean)

  const additionalInfo = additionalInfoParts.join(' | ')

  return [
    'New Blog Post',
    `Company/department: {{ ${post.serviceFocus} }}`,
    `Main topic: {{ ${post.workingTitle} }}`,
    `Post main keyword: {{ ${post.primaryKeyword} }}`,
    'Post additional keywords: {{ [] }}',
    `Question to answer in post: {{ ${post.coreQuestion} }}`,
    `Audience/location focus: {{ ${post.cityFocus} }}`,
    'Tone constraints: {{  }}',
    'Call-to-action destination: {{  }}',
    `Additional information: {{ ${additionalInfo} }}`
  ].join('\n')
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.setAttribute('readonly', 'true')
      ta.style.position = 'fixed'
      ta.style.top = '0'
      ta.style.left = '0'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(ta)
      return ok
    } catch {
      return false
    }
  }
}

async function copyPostRequest(post: SelectedPost) {
  const payload = buildNewPostTemplate(post)
  const ok = await copyText(payload)

  if (ok) {
    copied.value = true
    window.setTimeout(() => { copied.value = false }, 1200)
  } else {
    alert('Copy failed. Your browser may be blocking clipboard access.')
  }
}

function formatDate(d: Date) {
  try {
    return d.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' })
  } catch {
    return d.toLocaleDateString()
  }
}

const monthName = computed(() => currentMonth.value.toLocaleString('default', { month: 'long', year: 'numeric' }))

function escapeICS(text: string) {
  return String(text || '').replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;')
}

function exportToICS() {
  if (!import.meta.client) return

  const lines: string[] = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Content Calendar//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH']

  posts.value.forEach((post, idx) => {
    const y = post.date.getFullYear()
    const m = String(post.date.getMonth() + 1).padStart(2, '0')
    const d = String(post.date.getDate()).padStart(2, '0')
    const dtstart = `${y}${m}${d}`

    const summary = `${post.serviceFocus} - ${post.cityFocus}`
    const description = [post.workingTitle ? `Title: ${post.workingTitle}` : '', post.coreQuestion ? `Question: ${post.coreQuestion}` : '', post.primaryKeyword ? `Primary Keyword: ${post.primaryKeyword}` : '', post.notes ? `Notes: ${post.notes}` : ''].filter(Boolean).join('\\n\\n')
    const uid = `${Date.now()}-${idx}-${Math.random().toString(36).slice(2)}@contentcalendar`

    lines.push('BEGIN:VEVENT', `DTSTART;VALUE=DATE:${dtstart}`, `DTEND;VALUE=DATE:${dtstart}`, `SUMMARY:${escapeICS(summary)}`, `DESCRIPTION:${escapeICS(description)}`, `UID:${uid}`, 'STATUS:CONFIRMED', 'SEQUENCE:0', 'END:VEVENT')
  })

  lines.push('END:VCALENDAR')

  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'content-calendar.ics'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 100)
}

function buildLongShareUrl(): string {
  const base = window.location.origin + window.location.pathname
  const params = new URLSearchParams(window.location.search)

  params.delete(STORAGE_KEY_PARAM)
  params.delete(KEY_PARAM)
  params.set(CALENDAR_OPEN_PARAM, '1')

  const encoded = encodeURIComponent(inputData.value || '')
  params.set(props.queryKey, encoded)

  let url = `${base}?${params.toString()}`
  if (url.length <= MAX_URL_LEN) return url

  params.delete(props.queryKey)

  const key = `${Date.now()}-${Math.random().toString(36).slice(2)}`
  try {
    sessionStorage.setItem(`${STORAGE_PREFIX}${key}`, inputData.value || '')
  } catch {
    params.set(props.queryKey, encoded)
    return `${base}?${params.toString()}`
  }

  params.set(STORAGE_KEY_PARAM, key)
  url = `${base}?${params.toString()}`
  return url
}

async function saveAndBuildShortUrl(): Promise<string | null> {
  const csv = String(inputData.value || '').trim()
  if (!csv) return null

  const key = monthKeyFromDate(currentMonth.value)

  try {
    const headers = await getAuthHeaders()
    await $fetch(`/api/calendar/${encodeURIComponent(key)}`, {
      baseURL: "https://api.goldengatemanor.com",
      method: 'PUT',
      body: { csv },
      headers
    })


    const base = window.location.origin + window.location.pathname
    const params = new URLSearchParams(window.location.search)

    params.delete(STORAGE_KEY_PARAM)
    params.delete(props.queryKey)
    params.set(CALENDAR_OPEN_PARAM, '1')
    params.set(KEY_PARAM, key)

    return `${base}?${params.toString()}`
  } catch (e) {
    console.error('saveAndBuildShortUrl failed:', e)
    return null
  }
}

function clearQueryParam(query: LocationQueryRaw, key: string): LocationQueryRaw {
  const { [key]: _removed, ...rest } = query
  return rest
}

async function handleReset() {
  inputData.value = ''
  posts.value = []
  selectedPost.value = null
  currentMonth.value = new Date()

  loadModalOpen.value = false
  loadModalBusy.value = false
  loadModalError.value = null
  calendarFilter.value = ''
  calendarItems.value = []

  if (props.syncUrl) {
    const q0: LocationQueryRaw = { ...(route.query as LocationQueryRaw) }

    const q1 = clearQueryParam(q0, CALENDAR_OPEN_PARAM)
    const q2 = clearQueryParam(q1, KEY_PARAM)
    const q3 = clearQueryParam(q2, props.queryKey)
    const q4 = clearQueryParam(q3, STORAGE_KEY_PARAM)

    await router.replace({ query: q4 })
  }
}

async function saveCopyShareLink() {
  if (!import.meta.client) return

  const shortUrl = await saveAndBuildShortUrl()
  const url = shortUrl ?? buildLongShareUrl()

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url)
      window.alert(shortUrl ? 'Saved and link copied!' : 'Link copied to clipboard!')
      return
    }
  } catch {
    //
  }

  const ok = legacyCopyToClipboard(url)
  window.alert(ok ? (shortUrl ? 'Saved and link copied!' : 'Link copied to clipboard!') : `Failed to copy link. Please copy manually: ${url}`)
}

function handlePrint() {
  if (!import.meta.client) return

  const node = printRef.value
  if (!node || posts.value.length < 1) {
    window.alert('Nothing to print yet — generate the calendar first.')
    return
  }

  const html = node.outerHTML

  const origin = window.location.origin
  const baseTag = `<base href="${origin}/">`

  const styleTags = Array.from(document.querySelectorAll('style'))
    .map(el => (el as HTMLElement).outerHTML)
    .join('')

  const stylesheetLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
    .map(el => {
      const href = (el as HTMLLinkElement).getAttribute('href')
      if (!href) return ''
      const absHref = new URL(href, window.location.href).href
      return `<link rel="stylesheet" href="${absHref}">`
    })
    .join('')

  const headStyles = `${baseTag}${stylesheetLinks}${styleTags}`

  const printCss = `@page{size:landscape;margin:0.5in;}html,body{height:auto;overflow:visible;}body{margin:0;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact;color-adjust:exact;}*{overflow:visible!important;}*::-webkit-scrollbar{display:none!important;}*{-ms-overflow-style:none;scrollbar-width:none;}.shadow-lg{box-shadow:none!important;}.grid{page-break-inside:avoid;break-inside:avoid;}.bg-white{background:#fff!important;}`

  const doc = `<!doctype html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>Content Calendar</title>${headStyles}<style>${printCss}</style></head><body>${html}</body></html>`

  const blob = new Blob([doc], { type: 'text/html' })
  const url = URL.createObjectURL(blob)

  const w = window.open(url, '_blank')
  if (!w) {
    URL.revokeObjectURL(url)
    window.alert('Popup blocked. Please allow popups and try again.')
    return
  }

  let printed = false

  const cleanup = () => {
    setTimeout(() => URL.revokeObjectURL(url), 10_000)
  }

  const tryPrint = () => {
    if (printed) return
    printed = true
    try {
      w.focus()
      w.print()
    } catch {
      //
    } finally {
      cleanup()
    }
  }

  w.addEventListener('load', () => {
    setTimeout(tryPrint, 250)
  })

  setTimeout(tryPrint, 1000)
}

function legacyCopyToClipboard(text: string): boolean {
  try {
    const el = document.createElement('textarea')
    el.value = text
    el.setAttribute('readonly', 'true')
    el.style.position = 'fixed'
    el.style.top = '0'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.focus()
    el.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(el)
    return ok
  } catch {
    return false
  }
}

// ---------------- Load Calendar Modal (NEW)
const loadModalOpen = ref(false)
const loadModalBusy = ref(false)
const loadModalError = ref<string | null>(null)
const calendarItems = ref<CalendarListItem[]>([])
const calendarFilter = ref('')

const filteredCalendarItems = computed(() => {
  const q = String(calendarFilter.value || '').trim().toLowerCase()
  if (!q) return calendarItems.value
  return calendarItems.value.filter(i => String(i.key).toLowerCase().includes(q))
})

function openLoadModal() {
  loadModalOpen.value = true
  refreshCalendarList()
}

function closeLoadModal() {
  loadModalOpen.value = false
  loadModalError.value = null
}

function formatIso(iso: string) {
  const d = new Date(iso)
  const ts = d.getTime()
  if (Number.isNaN(ts)) return iso
  return d.toLocaleString()
}

async function refreshCalendarList() {
  if (!import.meta.client) return
  loadModalBusy.value = true
  loadModalError.value = null

  try {
    const headers = await getAuthHeaders()
    const res = await $fetch<{ items: CalendarListItem[] }>(`/api/calendar`, {
      baseURL: "https://api.goldengatemanor.com",
      method: 'GET',
      headers
    })

    calendarItems.value = Array.isArray(res?.items) ? res.items : []
  } catch (e) {
    console.error('refreshCalendarList failed:', e)
    loadModalError.value = (e as Error)?.message || 'Failed to load calendars.'
    calendarItems.value = []
  } finally {
    loadModalBusy.value = false
  }
}

async function loadCalendar(key: string) {
  if (!import.meta.client) return
  loadModalBusy.value = true
  loadModalError.value = null

  try {
    const headers = await getAuthHeaders()
    const rec = await $fetch<{ key: string; csv: string }>(`/api/calendar/${encodeURIComponent(key)}`, {
      baseURL: "https://api.goldengatemanor.com",
      method: 'GET',
      headers
    })


    const csv = String(rec?.csv ?? '').trim()
    if (!csv) {
      loadModalError.value = 'Calendar CSV was empty.'
      return
    }

    inputData.value = csv
    parseData(csv)
    loadModalOpen.value = false
  } catch (e) {
    console.error('loadCalendar failed:', e)
    loadModalError.value = (e as Error)?.message || 'Failed to load calendar.'
  } finally {
    loadModalBusy.value = false
  }
}

async function deleteCalendar(key: string) {
  if (!import.meta.client) return

  const ok = window.confirm(`Delete calendar "${key}"?`)
  if (!ok) return

  loadModalBusy.value = true
  loadModalError.value = null

  try {
    const headers = await getAuthHeaders()
    await $fetch(`/api/calendar/${encodeURIComponent(key)}`, {
      baseURL: "https://api.goldengatemanor.com",
      method: 'DELETE',
      headers
    })

    calendarItems.value = calendarItems.value.filter(i => i.key !== key)
  } catch (e) {
    console.error('deleteCalendar failed:', e)
    loadModalError.value = (e as Error)?.message || 'Failed to delete calendar.'
  } finally {
    loadModalBusy.value = false
  }
}
</script>

<style>
@media print {
  @page { size: landscape; margin: 0.5in; }
  body { print-color-adjust: exact !important; -webkit-print-color-adjust: exact !important; color-adjust: exact !important; }
  .print\:hidden { display: none !important; }
  .print\:min-h-20 { min-height: 5rem; }
  .grid { page-break-inside: avoid; }
  * { print-color-adjust: exact !important; -webkit-print-color-adjust: exact !important; }
}
</style>