<template>
  <ClientOnly>
    <BaseInteractiveModal v-model="modalOpen" normal-modal :padding="8" hide-close styling="justify-between overflow-auto">
      <div class="flex flex-col gap-5 h-full min-h-0 pb-2">
        <div class="flex flex-col gap-2">
          <h2 class="text-2xl font-semibold text-gray-900">Support Golden Gate on Pueblo CommunityVotes</h2>
          <p class="text-sm text-gray-600">Click each button to open the official nomination page. We’ll remember when you last clicked on this device (1x/day rule).</p>
          <div v-if="allDoneToday" class="mt-1 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800"><span class="font-semibold">All set!</span><span>You’ve already done all three today.</span></div>
        </div>

        <div class="flex flex-col gap-4">
          <div v-for="t in targets" :key="t.id" class="rounded-xl border border-gray-200 bg-white p-4">
            <div class="flex flex-col gap-2">
              <div class="flex flex-col">
                <div class="text-lg font-semibold text-gray-900">{{ t.businessName }}</div>
                <div class="text-sm text-gray-600">{{ t.categoryLabel }}</div>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                <button type="button" :disabled="didToday(t.id)" class="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed" :class="didToday(t.id) ? 'bg-gray-200 text-gray-700' : 'bg-brand-primary text-white hover:opacity-90'" @click="openAndMark(t)">
                  {{ didToday(t.id) ? 'Done today' : 'Nominate today' }}
                </button>

                <a :href="t.url" target="_blank" rel="noopener noreferrer" class="text-sm font-semibold text-brand-primary hover:underline">Open page</a>
              </div>

              <div class="text-xs text-gray-600">
                <span v-if="didToday(t.id)">Marked as done today ({{ formatDenverDate(getTs(t.id)!) }}).</span>
                <span v-else-if="hasTs(t.id)">Last marked: {{ formatDenverDate(getTs(t.id)!) }}.</span>
                <span v-else>Not marked yet on this device.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #attestation>
        <div class="mt-auto py-2 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 border-t border-gray-200">
          <button type="button" class="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 h-full text-sm font-semibold text-white hover:opacity-90" @click="modalOpen = false">Done</button>
        </div>
      </template>
    </BaseInteractiveModal>
  </ClientOnly>
</template>

<script setup lang="ts">
type Target = { id: 'ggms' | 'transport' | 'gas'; businessName: string; categoryLabel: string; url: string }

const modalOpen = defineModel<boolean>({ default: false })

const props = withDefaults(defineProps<{
  autoPrompt?: boolean
  openChance?: number
  promptCooldownMs?: number
  dismissCooldownMs?: number
  initialDelayMs?: number
  routeDelayMs?: number
  minPageViewsBeforePrompt?: number
  maxPromptsPerSession?: number
}>(), {
  autoPrompt: true,
  openChance: 0.55,
  promptCooldownMs: 1000 * 60 * 45,
  dismissCooldownMs: 1000 * 60 * 12,
  initialDelayMs: 1400,
  routeDelayMs: 600,
  minPageViewsBeforePrompt: 2,
  maxPromptsPerSession: 2
})

const NOM_STORAGE_KEY = 'ggm_cv_nominations_v1'
const PROMPT_TS_KEY = 'ggm_cv_prompt_last_ts_v1'
const DISMISS_TS_KEY = 'ggm_cv_prompt_dismiss_ts_v1'
const SESSION_VIEWS_KEY = 'ggm_cv_session_views_v1'
const SESSION_PROMPTS_KEY = 'ggm_cv_session_prompts_v1'

const targets: Target[] = [
  { id: 'ggms', businessName: 'Golden Gate Medical Supplies', categoryLabel: 'Healthcare → Home Medical Equipment', url: 'https://pueblo.communityvotes.com/2026/02/healthcare/home-medical-equipment' },
  { id: 'transport', businessName: 'Golden Gate Manor Transportation + Pueblo City Cab', categoryLabel: 'Services → Transportation', url: 'https://pueblo.communityvotes.com/2026/02/services/transportation' },
  { id: 'gas', businessName: 'Golden Gate Gas and Goods', categoryLabel: 'Retail Stores → Convenience Stores', url: 'https://pueblo.communityvotes.com/2026/02/retail-stores/convenience-stores' }
]

const saved = ref<Record<string, number>>({})
const route = useRoute()

onMounted(() => {
  saved.value = readNoms()
  bumpSessionViews(route.fullPath)
  if (props.autoPrompt) setTimeout(() => maybeAutoOpen(), props.initialDelayMs)
  watch(() => route.fullPath, (p) => {
    bumpSessionViews(p)
    if (props.autoPrompt) setTimeout(() => maybeAutoOpen(), props.routeDelayMs)
  })
})

watch(modalOpen, (next, prev) => {
  if (!import.meta.client) return
  if (prev === true && next === false) setNum(DISMISS_TS_KEY, Date.now())
})

function readNoms(): Record<string, number> {
  if (!import.meta.client) return {}
  try {
    const raw = localStorage.getItem(NOM_STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as Record<string, unknown>
    const cleaned: Record<string, number> = {}
    for (const [k, v] of Object.entries(parsed)) if (typeof v === 'number' && Number.isFinite(v)) cleaned[k] = v
    return cleaned
  } catch {
    return {}
  }
}

function writeNoms(next: Record<string, number>) {
  if (!import.meta.client) return
  try { localStorage.setItem(NOM_STORAGE_KEY, JSON.stringify(next)) } catch {
    //
  }
}

function denverDayKey(ts: number) {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Denver', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date(ts))
  const y = parts.find(p => p.type === 'year')?.value ?? '0000'
  const m = parts.find(p => p.type === 'month')?.value ?? '00'
  const d = parts.find(p => p.type === 'day')?.value ?? '00'
  return `${y}-${m}-${d}`
}

function formatDenverDate(ts: number) {
  return new Intl.DateTimeFormat('en-US', { timeZone: 'America/Denver', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(ts))
}

function getTs(id: Target['id']) {
  const v = saved.value[id]
  return typeof v === 'number' ? v : undefined
}

function hasTs(id: Target['id']) {
  return typeof saved.value[id] === 'number'
}

function didToday(id: Target['id']) {
  const ts = getTs(id)
  if (!ts) return false
  return denverDayKey(ts) === denverDayKey(Date.now())
}

const allDoneToday = computed(() => targets.every(t => didToday(t.id)))

function openInNewTab(url: string) {
  const a = document.createElement('a')
  a.href = url
  a.target = '_blank'
  a.rel = 'noopener noreferrer'
  a.click()
}

function openAndMark(t: Target) {
  const now = Date.now()
  const next = { ...saved.value, [t.id]: now }
  saved.value = next
  writeNoms(next)
  openInNewTab(t.url)
}

function getNum(key: string) {
  if (!import.meta.client) return 0
  try {
    const v = Number(localStorage.getItem(key))
    return Number.isFinite(v) ? v : 0
  } catch {
    return 0
  }
}

function setNum(key: string, value: number) {
  if (!import.meta.client) return
  try { localStorage.setItem(key, String(value)) } catch {
    //
  }
}

function getSessionNum(key: string) {
  if (!import.meta.client) return 0
  try {
    const v = Number(sessionStorage.getItem(key))
    return Number.isFinite(v) ? v : 0
  } catch {
    return 0
  }
}

function setSessionNum(key: string, value: number) {
  if (!import.meta.client) return
  try { sessionStorage.setItem(key, String(value)) } catch {
    //
  }
}

const SESSION_LAST_PATH_KEY = 'ggm_cv_session_last_path_v1'

function bumpSessionViews(currentPath: string) {
  if (!import.meta.client) return
  const lastPath = sessionStorage.getItem(SESSION_LAST_PATH_KEY) || ''
  if (lastPath === currentPath) return
  sessionStorage.setItem(SESSION_LAST_PATH_KEY, currentPath)
  const v = getSessionNum(SESSION_VIEWS_KEY)
  setSessionNum(SESSION_VIEWS_KEY, v + 1)
}

function bumpSessionPrompts() {
  if (!import.meta.client) return
  const v = getSessionNum(SESSION_PROMPTS_KEY)
  setSessionNum(SESSION_PROMPTS_KEY, v + 1)
}

function maybeAutoOpen() {
  if (!import.meta.client) return
  if (modalOpen.value) return
  if (allDoneToday.value) return

  const views = getSessionNum(SESSION_VIEWS_KEY)
  if (views < props.minPageViewsBeforePrompt) return

  const promptsThisSession = getSessionNum(SESSION_PROMPTS_KEY)
  if (promptsThisSession >= props.maxPromptsPerSession) return

  const now = Date.now()
  const lastPrompt = getNum(PROMPT_TS_KEY)
  const lastDismiss = getNum(DISMISS_TS_KEY)

  if (lastDismiss && now - lastDismiss < props.dismissCooldownMs) return
  if (lastPrompt && now - lastPrompt < props.promptCooldownMs) return

  const ramp = Math.min(0.3, Math.max(0, (views - props.minPageViewsBeforePrompt) * 0.06))
  const chance = Math.min(0.85, props.openChance + ramp)

  if (Math.random() > chance) return

  setNum(PROMPT_TS_KEY, now)
  bumpSessionPrompts()
  modalOpen.value = true
}
</script>