<template>
  <BaseAdminTable
    title="Job Applications"
    :rows="applications"
    :columns="applicationCols"
    :loading="loading"
    :pagination="pagination"
    :has-toolbar="hasToolbar"
    :initial-sort="{ key: 'created_at', dir: 'desc' }"
    @prev-page="$emit('prev-page')"
    @next-page="$emit('next-page')"
    @page-change="(p: number) => $emit('page-change', p)"
  >
    <template #toolbar>
      <slot name="toolbar" />
    </template>

    <template #tbody="{ rows }">
      <tr
        v-for="a in rows"
        :key="a.id"
        class="text-sm odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
        @click="openApplicationModal(a)"
      >
        <!-- Status -->
        <td class="px-4 py-3">
          <div class="inline-block">
            <button type="button" class="inline-flex items-center gap-1 focus:outline-none" @click.stop="openStatusMenu($event, a)">
              <span class="flex min-w-[110px] items-center justify-center rounded-full px-2 py-0.5 text-xs font-bold ring-1 ring-inset" :class="getStatusColor(a.status)">
                {{ a.status }}
                <svg class="h-3 w-3 opacity-70" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 14l5-6H5l5 6z" /></svg>
              </span>
            </button>
          </div>

          <Teleport to="body">
            <div v-if="openStatusFor?.id === a.id" ref="statusMenuRef" class="z-[1000] fixed w-36 overflow-hidden rounded-md border bg-white shadow-lg" :style="statusMenuStyle" @click.stop>
              <button class="block w-full px-3 py-1.5 text-left text-sm" :class="a.status === 'new' ? 'font-medium text-white bg-brand-primary' : 'text-brand-main-text hover:bg-gray-100'" @click="selectStatus(a, 'new')">New</button>
              <button class="block w-full px-3 py-1.5 text-left text-sm" :class="a.status === 'reviewing' ? 'font-medium text-white bg-brand-primary' : 'text-brand-main-text hover:bg-gray-100'" @click="selectStatus(a, 'reviewing')">Reviewing</button>
              <button class="block w-full px-3 py-1.5 text-left text-sm" :class="a.status === 'interviewed' ? 'font-medium text-white bg-brand-primary' : 'text-brand-main-text hover:bg-gray-100'" @click="selectStatus(a, 'interviewed')">Interviewed</button>
              <button class="block w-full px-3 py-1.5 text-left text-sm" :class="a.status === 'do_not_hire' ? 'font-medium text-white bg-brand-primary' : 'text-brand-main-text hover:bg-gray-100'" @click="selectStatus(a, 'do_not_hire')">Do Not Hire</button>
              <button class="block w-full px-3 py-1.5 text-left text-sm" :class="a.status === 'spam' ? 'font-medium text-white bg-brand-primary' : 'text-brand-main-text hover:bg-gray-100'" @click="selectStatus(a, 'spam')">Spam</button>
              <button class="block w-full px-3 py-1.5 text-left text-sm" :class="a.status === 'closed' ? 'font-medium text-white bg-brand-primary' : 'text-brand-main-text hover:bg-gray-100'" @click="selectStatus(a, 'closed')">Closed</button>
            </div>
          </Teleport>
        </td>

        <!-- Applicant -->
        <td class="px-4 py-3">
          <div class="w-max font-medium text-brand-main-text">{{ fullName(a) }}</div>
        </td>

        <!-- Phone -->
        <td class="px-4 py-3">
          <div v-if="a.personal?.phoneNumber" class="w-max"><a :href="`tel:${a.personal.phoneNumber}`" class="link" @click.stop>{{ a.personal.phoneNumber }}</a></div>
          <div v-else class="text-gray-500">Not provided</div>
        </td>

        <!-- Department -->
        <td class="px-4 py-3">
          <div class="w-max">{{ deriveDepartment(a.position) }}</div>
        </td>

        <!-- Position -->
        <td class="px-4 py-3">
          <div class="w-max">{{ derivePositionName(a.position) }}</div>
        </td>

        <!-- Start date -->
        <td class="px-4 py-3">
          <div class="w-max">{{ a.work?.dateAvailableToStart || '—' }}</div>
        </td>

        <!-- Tags -->
        <td class="px-4 py-3">
          <div :class="['group relative rounded-lg border border-transparent hover:bg-slate-50/60 transition hover:border-slate-300 focus-within:border-slate-400', { 'py-2 px-6': (a.tags?.length ?? 0) > 0, 'p-3': (a.tags?.length ?? 0) === 0 }]">
            <button v-if="(a.tags?.length ?? 0) > 0" type="button" class="absolute right-2 top-2 hidden transition group-hover:block group-focus-within:block" title="Manage tags" @click.stop="openTagModal(a)">
              <BaseIcon name="material-symbols:edit-square-outline-rounded" size="size-5" class="text-brand-primary" />
              <span class="sr-only">Manage tags</span>
            </button>

            <button v-else type="button" class="hidden transition group-hover:flex group-focus-within:flex w-full h-full items-center justify-center" @click.stop="openTagModal(a, { focusInput: true })">
              <BaseIcon name="mdi:plus-circle" size="size-5" class="text-brand-primary" />
              <span class="w-max">Add tags</span>
            </button>

            <ul v-if="(a.tags?.length ?? 0) > 0" class="space-y-1">
              <li v-for="(tag, idx) in (showAllTags ? a.tags : a.tags.slice(0, 3))" :key="`${a.id}-${tag}-${idx}`" class="grid grid-cols-[1fr_auto] items-center gap-2">
                <span class="inline-flex min-w-[80px] items-center justify-center rounded-full px-2 py-0.5 text-xs font-bold ring-1 ring-inset bg-brand-primary text-white truncate" :title="tag">{{ text.truncateText(tag, 14) }}</span>
              </li>
            </ul>

            <div v-if="(a.tags?.length ?? 0) === 0" class="flex justify-center items-center group-hover:hidden group-focus-within:hidden h-full">
              <p class="w-max px-4">No Tags</p>
            </div>

            <div class="flex justify-center pr-2">
              <button v-if="(a.tags?.length ?? 0) > 3" type="button" class="mt-2 text-xs text-brand-primary underline-offset-2 hover:underline" :aria-expanded="showAllTags ? 'true' : 'false'" @click.stop="showAllTags = !showAllTags">
                {{ showAllTags ? 'Show less' : `Show all (${a.tags.length})` }}
              </button>
            </div>
          </div>

          <Teleport to="body">
            <div v-if="tagModalFor?.id === a.id" class="fixed inset-0 z-[1000] grid place-items-center bg-black/40 p-4" @click="closeTagModal">
              <div class="w-full max-w-md rounded-xl bg-white p-4 shadow-xl" @click.stop>
                <h3 class="mb-3 text-base font-semibold">Manage tags</h3>

                <div class="mb-3 flex flex-wrap gap-2">
                  <span v-for="(t, i) in tagsDraft" :key="`${a.id}-draft-${t}-${i}`" :title="t" class="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs">
                    {{ text.truncateText(t, 18) }}
                    <button class="rounded-full px-1 leading-none text-slate-500 hover:bg-red-50 hover:text-red-600" :aria-label="`Remove tag ${t}`" @click="removeDraftTag(i)">✕</button>
                  </span>
                </div>

                <div class="flex gap-2">
                  <BaseFormInput ref="newTagInputRef" v-model="newTag" type="text" placeholder="Add a tag…" @keydown.enter.prevent="addDraftTag()" />
                  <button class="rounded-md border px-3 py-2 text-sm" @click="addDraftTag()">Add</button>
                </div>

                <p class="mt-2 text-xs text-slate-500">Tip: Press Enter to add. Paste a list separated by commas or semi-colons.</p>

                <div class="mt-4 flex justify-end gap-2">
                  <button class="rounded-md border px-3 py-2 text-sm" @click="closeTagModal">Cancel</button>
                  <button class="rounded-md bg-brand-primary px-3 py-2 text-sm font-medium text-white hover:brightness-110" @click="saveTags(a.id)">Save</button>
                </div>
              </div>
            </div>
          </Teleport>
        </td>

        <!-- Created -->
        <td class="px-4 py-3">
          <div class="w-max">{{ a.created_at }}</div>
        </td>

        <!-- ID -->
        <td class="px-4 py-3">
          <div class="w-max">{{ a.id }}</div>
        </td>

        <!-- Actions -->
        <td class="px-4 py-3 text-right">
          <slot name="actions" :application="a" />
        </td>
      </tr>
    </template>
  </BaseAdminTable>

  <BaseInteractiveModal v-model="applicationModalOpen" :padding="3" @close="closeApplicationModal">
    <div v-if="applicationModalData" class="h-full overflow-hidden flex flex-col">
      <div class="flex flex-col items-center border-b-2 pb-6 space-y-2">
        <h2 class="flex flex-col items-center underline mb-2">
          <BaseIcon name="material-symbols:badge-rounded" />
          <span class="font-bold text-brand-primary">{{ fullName(applicationModalData) }}</span>
        </h2>
        <span class="flex min-w-[110px] items-center justify-center rounded-full px-2 py-0.5 text-xs font-bold ring-1 ring-inset" :class="getStatusColor(applicationModalData.status)">{{ applicationModalData.status }}</span>
        <p class="text-xs text-gray-500">{{ deriveDepartment(applicationModalData.position) }} / {{ derivePositionName(applicationModalData.position) }}</p>
      </div>

      <BaseUiAction type="button" class="absolute top-3 left-3 text-gray-400 hover:text-gray-600 p-1" @click="emit('export-pdf', applicationModalData.id)">Export</BaseUiAction>

      <div class="flex flex-col items-center py-2">
        <time class="text-zinc-400 text-xs" :datetime="applicationModalData.created_at">Submitted: {{ applicationModalData.created_at }}</time>
      </div>

      <div class="flex flex-col overflow-y-auto space-y-3">
        <PleaseNote class="text-xs">Applications are submitted from external sources. Treat uploaded files/links cautiously unless expected.</PleaseNote>

        <div class="space-y-1">
          <h3 class="font-bold">Personal</h3>
          <p><span class="font-semibold">Address:</span> {{ applicationModalData.personal.address }}</p>
          <p><span class="font-semibold">Phone:</span> {{ applicationModalData.personal.phoneNumber }}</p>
          <p><span class="font-semibold">Over 18:</span> {{ applicationModalData.personal.over18 }}</p>
          <p><span class="font-semibold">Citizen/Authorized:</span> {{ applicationModalData.personal.citizen }}</p>
          <p><span class="font-semibold">Felony:</span> {{ applicationModalData.personal.felony }}</p>
        </div>

        <div class="space-y-1">
          <h3 class="font-bold">Work</h3>
          <p><span class="font-semibold">Learned about us:</span> {{ applicationModalData.work.learnedAboutUs }}</p>
          <p v-if="applicationModalData.work.otherExplain"><span class="font-semibold">Other:</span> {{ applicationModalData.work.otherExplain }}</p>
          <p><span class="font-semibold">Worked here before:</span> {{ applicationModalData.work.hasWorkedAtGoldenGate }}</p>
          <p><span class="font-semibold">Employment type:</span> {{ applicationModalData.work.employmentType }}</p>
          <p v-if="applicationModalData.work.availability"><span class="font-semibold">Availability:</span> {{ applicationModalData.work.availability }}</p>
          <p><span class="font-semibold">Overtime:</span> {{ applicationModalData.work.willingToWorkOvertime }}</p>
          <p><span class="font-semibold">Pay rate:</span> {{ applicationModalData.work.preferablePayRate }}</p>
          <p><span class="font-semibold">Start date:</span> {{ applicationModalData.work.dateAvailableToStart }}</p>
          <p><span class="font-semibold">Resume:</span> <a v-if="applicationModalData.work.resume?.url" :href="applicationModalData.work.resume.url" class="link" target="_blank" rel="noopener noreferrer">Open</a><span v-else> Not provided</span></p>
        </div>

        <div class="space-y-1">
          <h3 class="font-bold">Driving</h3>
          <p><span class="font-semibold">Endorsements:</span> {{ applicationModalData.driving.hasEndorsements }} <span v-if="applicationModalData.driving.endorsements">({{ applicationModalData.driving.endorsements }})</span></p>
          <p><span class="font-semibold">Accidents:</span> {{ applicationModalData.driving.hasAccidents }} <span v-if="applicationModalData.driving.accidents">({{ applicationModalData.driving.accidents }})</span></p>
          <p><span class="font-semibold">Traffic convictions:</span> {{ applicationModalData.driving.hasTrafficConvictions }} <span v-if="applicationModalData.driving.trafficConvictions">({{ applicationModalData.driving.trafficConvictions }})</span></p>
          <p><span class="font-semibold">MVR:</span> <a v-if="applicationModalData.driving.MVR?.url" :href="applicationModalData.driving.MVR.url" class="link" target="_blank" rel="noopener noreferrer">Open</a><span v-else> Not provided</span></p>
          <p><span class="font-semibold">Driver's License:</span> <a v-if="applicationModalData.driving.driversLicense?.url" :href="applicationModalData.driving.driversLicense.url" class="link" target="_blank" rel="noopener noreferrer">Open</a><span v-else> Not provided</span></p>
        </div>
      </div>
    </div>

    <div v-else>
      Content not loaded properly...
    </div>
  </BaseInteractiveModal>
</template>

<script lang="ts" setup>
import type { Pagination } from '~/models/Pagination'
import type { ApplicationFormData, ApplicationRequestStatus } from '../../models/Application.js';

const text = useText()

defineProps<{
  applications: ApplicationFormData[]
  loading?: boolean
  pagination?: Pagination | null
  hasToolbar?: boolean
}>()

const emit = defineEmits<{
  (e: 'prev-page' | 'next-page'): void
  (e: 'page-change', page: number): void
  (e: 'change-status', payload: { id: string, status: ApplicationRequestStatus }): void
  (e: 'change-tags', payload: { id: string, tags: string[] }): void
  (e: 'export-pdf', id: string): void
}>()

const fullName = (a: ApplicationFormData) => `${a.personal?.firstName ?? ''} ${a.personal?.lastName ?? ''}`.trim()

const DEPT_LABELS: Record<string, string> = {
  city_cab: 'City Cab',
  ggmt: 'GGMT',
  transportation: 'Transportation',
  acf: 'Assisted Living',
  medical_supply: 'Medical Supply',
  gas_station: 'Gas Station',
  gs: 'Gas Station',
  general: 'General',
  al: 'Assisted Living',
  ms: 'Medical Supply'
}

const POSITION_LABELS: Record<string, string> = {
  driver: 'Driver',
  dispatch: 'Dispatcher',
  dispatcher: 'Dispatcher',
  csr: 'Customer Service Rep',
  admin_assistant: 'Administrative Assistant',
  qmap: 'QMAP',
  pcp: 'PCP',
  inventory_tech: 'Inventory Technician',
  deliver_tech: 'Delivery Technician',
  dme_specialist: 'DME Specialist',
  manager: 'Manager',
  assistant_manager: 'Assistant Manager',
  attendant: 'Attendant',
  general: 'General'
}

const ACRONYMS = new Set(['ggmt', 'qmap', 'pcp', 'dme', 'csr', 'mvr', 'nemt'])

function titleize(raw: string): string {
  if (!raw) return ''
  return raw
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => {
      const lw = w.toLowerCase()
      if (ACRONYMS.has(lw)) return lw.toUpperCase()
      return lw.charAt(0).toUpperCase() + lw.slice(1)
    })
    .join(' ')
}

function splitPosition(position?: string): { departmentKey: string; positionKey: string } {
  const v = String(position ?? '').trim()
  if (!v) return { departmentKey: '', positionKey: '' }

  // Prefer dash format: dept-role
  if (v.includes('-')) {
    const [dept, ...rest] = v.split('-')
    if(dept !== undefined)
    return { departmentKey: dept, positionKey: rest.join('-') }
  }

  // Underscore format: dept_role (ggmt_driver, acf_qmap)
  if (v.includes('_')) {
    const [dept, ...rest] = v.split('_')
    if(dept !== undefined)
    return { departmentKey: dept, positionKey: rest.join('_') }
  }

  return { departmentKey: v, positionKey: '' }
}

const prettyDepartment = (position?: string) => {
  const { departmentKey } = splitPosition(position)
  if (!departmentKey) return ''
  return DEPT_LABELS[departmentKey] ?? titleize(departmentKey)
}

const prettyPositionName = (position?: string) => {
  const { positionKey } = splitPosition(position)
  if (!positionKey) return ''
  return POSITION_LABELS[positionKey] ?? titleize(positionKey)
}

const deriveDepartment = (position?: string) => prettyDepartment(position)
const derivePositionName = (position?: string) => prettyPositionName(position)

const applicationCols = [
  { key: 'status', label: 'Status' },
  { key: 'personal.firstName', label: 'Applicant' },
  { key: 'personal.phoneNumber', label: 'Phone' },
  { key: 'department', label: 'Department' },
  { key: 'position_name', label: 'Position' },
  { key: 'work.dateAvailableToStart', label: 'Start Date' },
  { key: 'tags', label: 'Tags' },
  { key: 'created_at', label: 'Submitted', sortable: true },
  { key: 'id', label: 'ID' },
  { key: 'actions', label: 'Actions' }
]

/** Status dropdown */
const openStatusFor = ref<ApplicationFormData | null>(null)
const statusMenuRef = ref<HTMLElement | null>(null)
const statusMenuStyle = ref<Record<string, string>>({})
let statusTriggerEl: HTMLElement | null = null

const getStatusColor = (status: ApplicationRequestStatus) => {
  const map: Record<ApplicationRequestStatus, string> = {
    new: 'bg-green-100 text-green-800 ring-green-600/20',
    reviewing: 'bg-yellow-100 text-yellow-800 ring-yellow-600/20',
    interviewed: 'bg-blue-100 text-blue-800 ring-blue-600/20',
    do_not_hire: 'bg-gray-100 text-gray-800 ring-gray-600/20',
    spam: 'bg-red-100 text-red-800 ring-red-600/20',
    closed: 'bg-zinc-100 text-zinc-800 ring-zinc-600/20'
  }
  return map[status] ?? ''
}

const openStatusMenu = (e: MouseEvent, row: ApplicationFormData) => {
  openStatusFor.value = row
  statusTriggerEl = e.currentTarget as HTMLElement
  nextTick(positionMenu)
}

const positionMenu = () => {
  if (!statusTriggerEl) return
  const rect = statusTriggerEl.getBoundingClientRect()
  const menuEl = statusMenuRef.value
  let menuW = 144
  let menuH = 180
  if (menuEl) {
    menuW = menuEl.offsetWidth || menuW
    menuH = menuEl.offsetHeight || menuH
  }
  const gap = 6
  let top = rect.bottom + gap
  let left = rect.left
  if (top + menuH > window.innerHeight) top = rect.top - menuH - gap
  const pad = 8
  if (left + menuW > window.innerWidth - pad) left = window.innerWidth - menuW - pad
  if (left < pad) left = pad
  statusMenuStyle.value = { top: `${Math.max(pad, top)}px`, left: `${left}px` }
}

const selectStatus = (row: ApplicationFormData, status: ApplicationRequestStatus) => {
  openStatusFor.value = null
  if (row.status !== status) emit('change-status', { id: row.id, status })
}

const closeStatusMenu = () => { openStatusFor.value = null }
const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeStatusMenu() }
const handleResize = () => { if (openStatusFor.value) positionMenu() }

onMounted(() => {
  window.addEventListener('click', closeStatusMenu, true)
  window.addEventListener('keydown', handleKey)
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', closeStatusMenu, true)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', closeStatusMenu, true)
  window.removeEventListener('keydown', handleKey)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', closeStatusMenu, true)
})

/** Modal */
const applicationModalOpen = ref(false)
const applicationModalData = ref<ApplicationFormData | null>(null)

const openApplicationModal = (row: ApplicationFormData) => {
  applicationModalData.value = row
  applicationModalOpen.value = true
}

const closeApplicationModal = () => {
  applicationModalData.value = null
}

/** Tags */
const showAllTags = ref(false)
const tagModalFor = ref<ApplicationFormData | null>(null)
const tagsDraft = ref<string[]>([])
const newTag = ref('')
const newTagInputRef = ref<HTMLInputElement | null>(null)

const openTagModal = (row: ApplicationFormData, opts?: { focusInput?: boolean }) => {
  tagModalFor.value = row
  tagsDraft.value = [...(row.tags || [])]
  newTag.value = ''
  nextTick(() => { if (opts?.focusInput) newTagInputRef.value?.focus() })
}

const closeTagModal = () => {
  tagModalFor.value = null
  newTag.value = ''
}

const sanitizeTag = (t: string) => t.trim().replace(/\s+/g, ' ')
const addDraftTag = () => {
  if (!newTag.value) return
  const parts = newTag.value.split(/[;,；]+/).map(sanitizeTag).filter(Boolean)
  const existingLC = new Set(tagsDraft.value.map(t => t.toLowerCase()))
  for (const p of parts) {
    if (!existingLC.has(p.toLowerCase())) {
      tagsDraft.value.push(p)
      existingLC.add(p.toLowerCase())
    }
  }
  newTag.value = ''
}

const removeDraftTag = (idx: number) => { tagsDraft.value.splice(idx, 1) }
const saveTags = (id: string) => {
  emit('change-tags', { id, tags: [...tagsDraft.value] })
  closeTagModal()
}

useHead({
  bodyAttrs: {
    class: computed(() => (applicationModalOpen.value) ? 'no-scroll' : '')
  }
})
</script>