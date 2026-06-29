<template>
  <BaseAdminTable
    title="Consultation Requests"
    :rows="consultationRequests"
    :columns="consultationRequestCols"
    :loading="loading"
    :pagination="pagination"
    :initial-sort="{ key: 'created_at', dir: 'desc' }"
    @prev-page="$emit('prev-page')"
    @next-page="$emit('next-page')"
    @page-change="(p: number) => $emit('page-change', p)"
  >
    <template #tbody="{ rows }">
      <tr
        v-for="u in rows"
        :key="u.id"
        class="text-sm odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
        @click="openConsultationModal(u)"
      >
        <!-- Status -->
        <td class="px-4 py-3">
          <div class="inline-block">
            <button
              type="button"
              class="inline-flex items-center gap-1 focus:outline-none"
              @click.stop="openStatusMenu($event, u)"
            >
              <span
                class="flex min-w-[80px] items-center justify-center rounded-full px-2 py-0.5 text-xs font-bold ring-1 ring-inset"
                :class="getStatusColor(u.status)"
              >
                {{ formatStatus(u.status) }}
                <svg class="h-3 w-3 opacity-70" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M10 14l5-6H5l5 6z" />
                </svg>
              </span>
            </button>
          </div>

          <Teleport to="body">
            <div
              v-if="openStatusFor?.id === u.id"
              ref="statusMenuRef"
              class="z-[1000] fixed w-32 overflow-hidden rounded-md border bg-white shadow-lg"
              :style="statusMenuStyle"
              @click.stop
            >
              <button
                v-for="status in consultationStatuses"
                :key="status"
                class="block w-full px-3 py-1.5 text-left text-sm"
                :class="u.status === status ? 'font-medium text-white bg-brand-primary' : 'text-brand-main-text hover:bg-gray-100'"
                @click="selectStatus(u, status)"
              >
                {{ formatStatus(status) }}
              </button>
            </div>
          </Teleport>
        </td>

        <!-- Name -->
        <td class="px-4 py-3">
          <div class="w-max">{{ u.first_name }} {{ u.last_name }}</div>
        </td>

        <!-- Email -->
        <td class="px-4 py-3">
          <a v-if="u.email" :href="`mailto:${u.email}`" class="link" @click.stop>{{ u.email }}</a>
          <p v-else>Not Provided</p>
        </td>

        <!-- Phone -->
        <td class="px-4 py-3">
          <a v-if="u.phone" :href="`tel:${u.phone}`" class="link" @click.stop>{{ u.phone }}</a>
          <p v-else>Not Provided</p>
        </td>

        <!-- Contact Method -->
        <td class="px-4 py-3">
          <div class="w-max">{{ formatValue(u.contact_method) }}</div>
        </td>

        <!-- Person Seeking Care -->
        <td class="px-4 py-3">
          <div class="w-max">{{ getPersonSeekingCareLabel(u.person_seeking_care) }}</div>
        </td>

        <!-- Age Range -->
        <td class="px-4 py-3">
          <div class="w-max">{{ formatValue(u.age_range) }}</div>
        </td>

        <!-- Insurance -->
        <td class="px-4 py-3">
          <div class="w-max">{{ getInsuranceLabel(u.insurance_type) }}</div>
        </td>

        <!-- Placement -->
        <td class="px-4 py-3">
          <div class="w-max">{{ formatValue(u.placement) }}</div>
        </td>

        <!-- Message -->
        <td class="px-4 py-3">
          <div v-if="u.message" class="w-72">
            <div>{{ text.truncateText(u.message, 100) }}</div>
            <button
              v-if="u.message.length > 100"
              type="button"
              class="mt-2 text-xs text-brand-primary underline-offset-2 hover:underline"
              @click.stop="openConsultationModal(u)"
            >
              View Full Request
            </button>
          </div>
          <div v-else class="w-max">No message</div>
        </td>

        <!-- Tags -->
        <td class="px-4 py-3">
          <div
            :class="[
              'group relative rounded-lg border border-transparent hover:bg-slate-50/60 transition hover:border-slate-300 focus-within:border-slate-400',
              { 'py-2 px-6': u.tags.length > 0, 'p-3': u.tags.length === 0 }
            ]"
          >
            <button
              v-if="u.tags.length > 0"
              type="button"
              class="absolute right-2 top-2 hidden transition group-hover:block group-focus-within:block"
              title="Manage tags"
              @click.stop="openTagModal(u)"
            >
              <BaseIcon name="material-symbols:edit-square-outline-rounded" size="size-5" class="text-brand-primary" />
              <span class="sr-only">Manage tags</span>
            </button>

            <button
              v-else
              type="button"
              class="hidden transition group-hover:flex group-focus-within:flex w-full h-full items-center justify-center"
              @click.stop="openTagModal(u, { focusInput: true })"
            >
              <BaseIcon name="mdi:plus-circle" size="size-5" class="text-brand-primary" />
              <span class="w-max">Add tags</span>
            </button>

            <ul v-if="u.tags.length > 0" class="space-y-1">
              <li
                v-for="(tag, idx) in (showAllTagsFor === u.id ? u.tags : u.tags.slice(0, 3))"
                :key="`${u.id}-${tag}-${idx}`"
                class="grid grid-cols-[1fr_auto] items-center gap-2"
              >
                <span
                  class="inline-flex min-w-[80px] items-center justify-center rounded-full px-2 py-0.5 text-xs font-bold ring-1 ring-inset bg-brand-primary text-white truncate"
                  :title="tag"
                >
                  {{ text.truncateText(tag, 10) }}
                </span>
              </li>
            </ul>

            <div v-if="u.tags.length === 0" class="flex justify-center items-center group-hover:hidden group-focus-within:hidden h-full">
              <p class="w-max px-4">No Tags</p>
            </div>

            <div class="flex justify-center pr-2">
              <button
                v-if="u.tags.length > 3"
                type="button"
                class="mt-2 text-xs text-brand-primary underline-offset-2 hover:underline"
                :aria-expanded="showAllTagsFor === u.id ? 'true' : 'false'"
                @click.stop="toggleShowAllTags(u.id)"
              >
                {{ showAllTagsFor === u.id ? 'Show less' : `Show all (${u.tags.length})` }}
              </button>
            </div>
          </div>

          <Teleport to="body">
            <div
              v-if="tagModalFor?.id === u.id"
              class="fixed inset-0 z-[1000] grid place-items-center bg-black/40 p-4"
              @click="closeTagModal"
            >
              <div class="w-full max-w-md rounded-xl bg-white p-4 shadow-xl" @click.stop>
                <h3 class="mb-3 text-base font-semibold">Manage tags</h3>

                <div class="mb-3 flex flex-wrap gap-2">
                  <span
                    v-for="(t, i) in tagsDraft"
                    :key="`${u.id}-draft-${t}-${i}`"
                    :title="t"
                    class="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs"
                  >
                    {{ text.truncateText(t, 10) }}
                    <button
                      class="rounded-full px-1 leading-none text-slate-500 hover:bg-red-50 hover:text-red-600"
                      :aria-label="`Remove tag ${t}`"
                      @click="removeDraftTag(i)"
                    >
                      ✕
                    </button>
                  </span>
                </div>

                <div class="flex gap-2">
                  <BaseFormInput
                    ref="newTagInputRef"
                    v-model="newTag"
                    type="text"
                    placeholder="Add a tag…"
                    @keydown.enter.prevent="addDraftTag()"
                  />
                  <button class="rounded-md border px-3 py-2 text-sm" @click="addDraftTag()">Add</button>
                </div>

                <p class="mt-2 text-xs text-slate-500">
                  Tip: Press Enter to add. Paste a list separated by commas or semi-colons.
                </p>

                <div class="mt-4 flex justify-end gap-2">
                  <button class="rounded-md border px-3 py-2 text-sm" @click="closeTagModal">Cancel</button>
                  <button
                    class="rounded-md bg-brand-primary px-3 py-2 text-sm font-medium text-white hover:brightness-110"
                    @click="saveTags(u.id)"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </Teleport>
        </td>

        <!-- Sent -->
        <td class="px-4 py-3">
          <div class="w-max">{{ dateFormat.tableFormatDateWithTime(u.created_at) }}</div>
        </td>

        <!-- ID -->
        <td class="px-4 py-3">
          <div class="w-max">{{ u.id }}</div>
        </td>

        <!-- Actions -->
        <td class="px-4 py-3 text-right">
          <slot name="actions" :consultation-request="u" />
        </td>
      </tr>
    </template>
  </BaseAdminTable>

  <BaseInteractiveModal v-model="consultationModalOpen" :padding="3" @close="closeConsultationModal">
    <div v-if="consultationModalData" class="h-full overflow-hidden flex flex-col">
      <button class="absolute top-2 left-2 bg-blue-600 p-1 text-white rounded-md border border-black hover:bg-blue-700 group flex items-center gap-2" @click="emit('export-pdf', { id: consultationModalData.id })">Export<BaseIcon name="fa6-solid:file-pdf" size="size-4" color="text-white" /></button>

      <!-- header -->
      <div class="flex flex-col items-center border-b-2 pb-6 space-y-2">
        <h2 class="border-zinc-100 flex flex-col items-center underline mb-2">
          <BaseIcon name="material-symbols:clinical-notes-rounded" />
          <span class="font-bold text-brand-primary">
            {{ consultationModalData.first_name }} {{ consultationModalData.last_name }}
          </span>
        </h2>

        <span
          class="flex min-w-[80px] items-center justify-center rounded-full px-2 py-0.5 text-xs font-bold ring-1 ring-inset"
          :class="getStatusColor(consultationModalData.status)"
        >
          {{ formatStatus(consultationModalData.status) }}
        </span>
      </div>

      <div class="flex flex-col items-center py-2">
        <time class="text-zinc-400 text-xs" :datetime="consultationModalData.created_at">
          Sent: {{ dateFormat.formatLongDateTime(consultationModalData.created_at) }}
        </time>
      </div>

      <div class="flex flex-col overflow-y-auto space-y-2">
        <PleaseNote class="text-xs">
          These consultation requests are from external sources. Do not trust links unless you know who they come from.
        </PleaseNote>

        <div>
          <h3 class="font-bold">Name</h3>
          <p>{{ consultationModalData.first_name }} {{ consultationModalData.last_name }}</p>
        </div>

        <div>
          <h3 class="font-bold">Preferred Contact Method</h3>
          <p>{{ formatValue(consultationModalData.contact_method) }}</p>
        </div>

        <div v-if="consultationModalData.email">
          <h3 class="font-bold">Email</h3>
          <p><a :href="`mailto:${consultationModalData.email}`" class="link">{{ consultationModalData.email }}</a></p>
        </div>

        <div v-if="consultationModalData.phone">
          <h3 class="font-bold">Phone Number</h3>
          <p><a :href="`tel:${consultationModalData.phone}`" class="link">{{ consultationModalData.phone }}</a></p>
        </div>

        <div>
          <h3 class="font-bold">Person Seeking Care</h3>
          <p>{{ getPersonSeekingCareLabel(consultationModalData.person_seeking_care) }}</p>
        </div>

        <div>
          <h3 class="font-bold">Age Range</h3>
          <p>{{ formatValue(consultationModalData.age_range) }}</p>
        </div>

        <div>
          <h3 class="font-bold">Insurance Type</h3>
          <p>{{ getInsuranceLabel(consultationModalData.insurance_type) }}</p>
        </div>

        <div>
          <h3 class="font-bold">Placement Timeline</h3>
          <p>{{ formatValue(consultationModalData.placement) }}</p>
        </div>

        <div>
          <h3 class="font-bold">Care Assessment</h3>
          <ul class="space-y-1">
            <li v-for="question in consultationModalData.questions" :key="question.name">
              <span class="font-semibold">{{ getQuestionLabel(question.name) }}:</span>
              {{ formatValue(question.value) }}
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold">Message / Additional Information</h3>
          <p>{{ consultationModalData.message }}</p>
        </div>
      </div>
    </div>

    <div v-else>
      Content not loaded properly...
    </div>
  </BaseInteractiveModal>
</template>

<script lang="ts" setup>
import { useDateFormat } from '../../composables/dates/dateFormat'
import type {
  ConsultationFormStatus,
  ConsultationRequestFormData
} from '../../models/admin/ConsultationForm'
import type { Pagination } from '../../models/Pagination'

const dateFormat = useDateFormat()
const text = useText()

defineProps<{
  consultationRequests: ConsultationRequestFormData[]
  loading?: boolean
  pagination?: Pagination | null
  consultationRequestModalData?: ConsultationRequestFormData | null
}>()

const emit = defineEmits<{
  (e: 'prev-page' | 'next-page' | 'add-user'): void
  (e: 'page-change', page: number): void
  (e: 'change-status', payload: { id: string; status: ConsultationFormStatus }): void
  (e: 'change-tags', payload: { id: string; tags: string[] }): void
  (e: 'export-pdf', payload: { id: string }): void;
}>()

const consultationRequestCols = [
  { key: 'status', label: 'Status', sortable: true },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone Number' },
  { key: 'contact_method', label: 'Preferred Contact' },
  { key: 'person_seeking_care', label: 'Consultation For' },
  { key: 'age_range', label: 'Age Range' },
  { key: 'insurance_type', label: 'Insurance' },
  { key: 'placement', label: 'Placement Timeline' },
  { key: 'message', label: 'Message' },
  { key: 'tags', label: 'Tags' },
  { key: 'created_at', label: 'Request Sent', sortable: true },
  { key: 'id', label: 'ID' },
  { key: 'actions', label: 'Actions' }
]

const consultationStatuses: ConsultationFormStatus[] = [
  'new',
  'reviewing',
  'contacted',
  'spam',
  'closed'
]

const formatValue = (value: string) => {
  const ageRanges = ['18-40', '40-55', '55-65', '65-75', '75+']

  if (ageRanges.includes(value)) {
    return value
  }

  return value
    .replaceAll('_', ' ')
    .replaceAll('-', ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
}

const formatStatus = (status: ConsultationFormStatus) => {
  return formatValue(status)
}

const getQuestionLabel = (name: string) => {
  const labels: Record<string, string> = {
    income_assistance: 'Income Assistance',
    ada_accommodations: 'ADA Accommodations',
    daily_living_assistance: 'Daily Living Assistance'
  }

  return labels[name] ?? formatValue(name)
}

const getInsuranceLabel = (
  insurance: ConsultationRequestFormData['insurance_type']
) => {
  if (insurance.value === 'other') return `Other: ${insurance.other}`
  return formatValue(insurance.value)
}

const getPersonSeekingCareLabel = (
  person: ConsultationRequestFormData['person_seeking_care']
) => {
  if (person.value === 'other') return `Other: ${person.other}`
  return formatValue(person.value)
}

const openStatusFor = ref<ConsultationRequestFormData | null>(null)
const statusMenuRef = ref<HTMLElement | null>(null)
const statusMenuStyle = ref<Record<string, string>>({})

const getStatusColor = (status: ConsultationFormStatus) => {
  const sMap: Record<ConsultationFormStatus, string> = {
    new: 'bg-green-100 text-green-800 ring-green-600/20',
    reviewing: 'bg-yellow-100 text-yellow-800 ring-yellow-600/20',
    contacted: 'bg-blue-100 text-blue-800 ring-blue-600/20',
    spam: 'bg-red-100 text-red-800 ring-red-600/20',
    closed: 'bg-gray-100 text-gray-800 ring-gray-600/20'
  }

  return sMap[status] ?? ''
}

let statusTriggerEl: HTMLElement | null = null

const openStatusMenu = (e: MouseEvent, consultationRequest: ConsultationRequestFormData) => {
  openStatusFor.value = consultationRequest
  statusTriggerEl = e.currentTarget as HTMLElement
  nextTick(positionMenu)
}

const positionMenu = () => {
  if (!statusTriggerEl) return

  const rect = statusTriggerEl.getBoundingClientRect()
  const menuEl = statusMenuRef.value

  let menuW = 128
  let menuH = 120

  if (menuEl) {
    menuW = menuEl.offsetWidth || menuW
    menuH = menuEl.offsetHeight || menuH
  }

  const gap = 6
  let top = rect.bottom + gap
  let left = rect.left

  if (top + menuH > window.innerHeight) {
    top = rect.top - menuH - gap
  }

  const pad = 8

  if (left + menuW > window.innerWidth - pad) {
    left = window.innerWidth - menuW - pad
  }

  if (left < pad) {
    left = pad
  }

  statusMenuStyle.value = {
    top: `${Math.max(pad, top)}px`,
    left: `${left}px`
  }
}

const selectStatus = (
  consultationRequest: ConsultationRequestFormData,
  status: ConsultationFormStatus
) => {
  openStatusFor.value = null

  if (consultationRequest.status !== status) {
    emit('change-status', {
      id: consultationRequest.id,
      status
    })
  }
}

const closeStatusMenu = () => {
  openStatusFor.value = null
}

const handleKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeStatusMenu()
}

const handleResize = () => {
  if (openStatusFor.value) positionMenu()
}

onMounted(() => {
  globalThis.addEventListener('click', closeStatusMenu, true)
  globalThis.addEventListener('keydown', handleKey)
  globalThis.addEventListener('resize', handleResize)
  globalThis.addEventListener('scroll', closeStatusMenu, true)
})

onBeforeUnmount(() => {
  globalThis.removeEventListener('click', closeStatusMenu, true)
  globalThis.removeEventListener('keydown', handleKey)
  globalThis.removeEventListener('resize', handleResize)
  globalThis.removeEventListener('scroll', closeStatusMenu, true)
})

const consultationModalOpen = defineModel<boolean>({ default: false })
const consultationModalData = defineModel<ConsultationRequestFormData | null>('data', { default: null })

const openConsultationModal = (row: ConsultationRequestFormData) => {
  consultationModalData.value = row
  consultationModalOpen.value = true
}

const closeConsultationModal = () => {
  consultationModalData.value = null
}

const showAllTagsFor = ref<string | null>(null)

const toggleShowAllTags = (id: string) => {
  showAllTagsFor.value = showAllTagsFor.value === id ? null : id
}

const tagModalFor = ref<ConsultationRequestFormData | null>(null)
const tagsDraft = ref<string[]>([])
const newTag = ref('')
const newTagInputRef = ref<Array<{ focus?: () => void }> | null>(null)

const openTagModal = (row: ConsultationRequestFormData, opts?: { focusInput?: boolean }) => {
  tagModalFor.value = row
  tagsDraft.value = [...(row.tags || [])]
  newTag.value = ''

  nextTick(() => {
    if (!opts?.focusInput) return
    newTagInputRef.value?.[0]?.focus?.()
  })
}

const closeTagModal = () => {
  tagModalFor.value = null
  newTag.value = ''
}

const sanitizeTag = (t: string) => {
  return t.trim().replaceAll(/\s+/g, ' ')
}

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

const removeDraftTag = (idx: number) => {
  tagsDraft.value.splice(idx, 1)
}

const saveTags = (id: string) => {
  emit('change-tags', {
    id,
    tags: [...tagsDraft.value]
  })

  closeTagModal()
}

useHead({
  bodyAttrs: {
    class: computed(() => (consultationModalOpen.value ? 'no-scroll' : ''))
  }
})
</script>