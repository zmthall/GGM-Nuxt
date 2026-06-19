<template>
  <ClientOnly>
    <BaseInteractiveModal v-model="modalOpen" normal-modal :padding="8" hide-close styling="justify-between overflow-auto">
      <div class="flex flex-col gap-5 h-full min-h-0 pb-2">
        <div class="flex flex-col gap-2">
          <h2 class="text-2xl font-semibold text-gray-900">Support Golden Gate on Pueblo CommunityVotes</h2>
          <p class="text-sm text-gray-600">
            Voting is now open. Please sign in to your CommunityVotes account and vote once for each category.
            We'll remember which voting pages you've opened on this device.
          </p>
          <div v-if="allDone" class="mt-1 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
            <span class="font-semibold">All set!</span><span>You've opened all three voting pages.</span>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <div v-for="t in targets" :key="t.id" class="rounded-xl border border-gray-200 bg-white p-4">
            <div class="flex flex-col gap-2">
              <div class="flex flex-col">
                <div class="text-lg font-semibold text-gray-900">{{ t.businessName }}</div>
                <div class="text-sm text-gray-600">{{ t.categoryLabel }}</div>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                <button
                  type="button"
                  :disabled="isDone(t.id)"
                  class="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                  :class="isDone(t.id) ? 'bg-gray-200 text-gray-700' : 'bg-brand-primary text-white hover:opacity-90'"
                  @click="openAndMark(t)"
                >
                  {{ isDone(t.id) ? 'Completed' : 'Vote' }}
                </button>

                <a :href="t.url" target="_blank" rel="noopener noreferrer" class="text-sm font-semibold text-brand-primary hover:underline">Open page</a>
              </div>

              <div class="text-xs text-gray-600">
                <span v-if="isDone(t.id)">Opened voting page.</span>
                <span v-else>Not opened yet on this device.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <template #closeButton>
        <div class="pt-4 flex justify-end border-t border-gray-200">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-900 px-4 py-2 text-base font-semibold text-white"
            @click="modalOpen = false"
          >
            Done
          </button>
        </div>
      </template>
    </BaseInteractiveModal>
  </ClientOnly>
</template>

<script setup lang="ts">
type Target = {
  id: 'ggms' | 'transport' | 'gas'
  businessName: string
  categoryLabel: string
  url: string
}

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

const VOTE_STORAGE_KEY = 'ggm_cv_votes_completed_v1'
const PROMPT_TS_KEY = 'ggm_cv_prompt_last_ts_v1'
const DISMISS_TS_KEY = 'ggm_cv_prompt_dismiss_ts_v1'
const SESSION_VIEWS_KEY = 'ggm_cv_session_views_v1'
const SESSION_PROMPTS_KEY = 'ggm_cv_session_prompts_v1'
const SESSION_LAST_PATH_KEY = 'ggm_cv_session_last_path_v1'

const targets: Target[] = [
  {
    id: 'ggms',
    businessName: 'Golden Gate Medical Supplies',
    categoryLabel: 'Healthcare → Home Medical Equipment',
    url: 'https://pueblo.communityvotes.com/2026/02/healthcare/home-medical-equipment'
  },
  {
    id: 'transport',
    businessName: 'Golden Gate Manor Transportation + Pueblo City Cab',
    categoryLabel: 'Services → Transportation',
    url: 'https://pueblo.communityvotes.com/2026/02/services/transportation'
  },
  {
    id: 'gas',
    businessName: 'Golden Gate Gas and Goods',
    categoryLabel: 'Retail Stores → Convenience Stores',
    url: 'https://pueblo.communityvotes.com/2026/02/retail-stores/convenience-stores'
  }
]

const saved = ref<Record<string, number>>({})
const route = useRoute()

onMounted(() => {
  saved.value = readVotes()
  bumpSessionViews(route.fullPath)

  if (props.autoPrompt) {
    setTimeout(() => maybeAutoOpen(), props.initialDelayMs)
  }

  watch(() => route.fullPath, (p) => {
    bumpSessionViews(p)

    if (props.autoPrompt) {
      setTimeout(() => maybeAutoOpen(), props.routeDelayMs)
    }
  })
})

watch(modalOpen, (next, prev) => {
  if (!import.meta.client) return
  if (prev === true && next === false) setNum(DISMISS_TS_KEY, Date.now())
})

const allDone = computed(() => targets.every(t => isDone(t.id)))

function readVotes(): Record<string, number> {
  if (!import.meta.client) return {}

  try {
    const raw = localStorage.getItem(VOTE_STORAGE_KEY)
    if (!raw) return {}

    const parsed = JSON.parse(raw) as Record<string, unknown>
    const cleaned: Record<string, number> = {}

    for (const [k, v] of Object.entries(parsed)) {
      if (typeof v === 'number' && Number.isFinite(v)) cleaned[k] = v
    }

    return cleaned
  } catch {
    return {}
  }
}

function writeVotes(next: Record<string, number>) {
  if (!import.meta.client) return

  try {
    localStorage.setItem(VOTE_STORAGE_KEY, JSON.stringify(next))
  } catch {
    //
  }
}

function isDone(id: Target['id']) {
  return typeof saved.value[id] === 'number'
}

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
  writeVotes(next)
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

  try {
    localStorage.setItem(key, String(value))
  } catch {
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

  try {
    sessionStorage.setItem(key, String(value))
  } catch {
    //
  }
}

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
  if (allDone.value) return

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