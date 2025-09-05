<template>
  <BaseAdminTable
    title="Contact Submissions"
    :rows="contactMessages"
    :columns="contactMessagesCols"
    :loading="loading"
    :pagination="pagination"
    :initial-sort="{ key: 'created_at', dir: 'desc'}"
    @prev-page="$emit('prev-page')"
    @next-page="$emit('next-page')"
    @page-change="(p: number) => $emit('page-change', p)"
  >
    <template #tbody="{ rows }">
      <tr
        v-for="u in rows"
        :key="u.id"
        class="text-sm odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors"
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
                {{ u.status }}
                <svg class="h-3 w-3 opacity-70" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M10 14l5-6H5l5 6z" />
                </svg>
              </span>
            </button>
          </div>


          <!-- Teleported role menu -->
          <Teleport to="body">
            <div
              v-if="openStatusFor?.id === u.id"
              ref="statusMenuRef"
              class="z-[1000] fixed w-28 overflow-hidden rounded-md border bg-white shadow-lg"
              :style="statusMenuStyle"
              @click.stop
            >
              <button
                class="block w-full px-3 py-1.5 text-left text-sm"
                :class="u.status === 'new' ? 'font-medium text-white bg-brand-primary' : 'text-brand-main-text hover:bg-gray-100'"
                @click="selectStatus(u, 'new')"
              >
                New
              </button>
              <button
                class="block w-full px-3 py-1.5 text-left text-sm"
                :class="u.status === 'reviewing' ? 'font-medium text-white bg-brand-primary' : 'text-brand-main-text hover:bg-gray-100'"
                @click="selectStatus(u, 'reviewing')"
              >
                Reviewing
              </button>
              <button
                class="block w-full px-3 py-1.5 text-left text-sm"
                :class="u.status === 'contacted' ? 'font-medium text-white bg-brand-primary' : 'text-brand-main-text hover:bg-gray-100'"
                @click="selectStatus(u, 'contacted')"
              >
                Contacted
              </button>
              <button
                class="block w-full px-3 py-1.5 text-left text-sm"
                :class="u.status === 'spam' ? 'font-medium text-white bg-brand-primary' : 'text-brand-main-text hover:bg-gray-100'"
                @click="selectStatus(u, 'spam')"
              >
                Spam
              </button>
              <button
                class="block w-full px-3 py-1.5 text-left text-sm"
                :class="u.status === 'closed' ? 'font-medium text-white bg-brand-primary' : 'text-brand-main-text hover:bg-gray-100'"
                @click="selectStatus(u, 'closed')"
              >
                Closed
              </button>
            </div>
          </Teleport>
        </td>

        <!-- Name -->
        <td class="px-4 py-3">
          <div class="w-max">{{ u.first_name }} {{ u.last_name }}</div>
        </td>

        <!-- Message -->
        <td class="px-4 py-3">
          <div class="w-72">
            <div>
              {{ text.truncateText(u.message, 100)}}
            </div>
            <button
                v-if="u.message.length > 100"
                type="button"
                class="mt-2 text-xs text-brand-primary underline-offset-2 hover:underline"
                @click="openMessageModal(u)"
              >
                View Full message
              </button>
          </div>
        </td>

        <BaseInteractiveModal v-model="messageModalOpen" :padding="3" @close="closeMessageModal">
          <div v-if="messageModalData" class="h-full overflow-hidden flex flex-col">
            <button class="absolute top-2 left-2 bg-blue-600 p-1 text-white rounded-md border border-black hover:bg-blue-700 group flex items-center gap-2" @click="emit('export-pdf', { id: messageModalData.id })">Export<BaseIcon name="fa6-solid:file-pdf" size="size-4" color="text-white" /></button>
            <!-- Header -->
            <div class="flex flex-col items-center border-b-2 pb-6 space-y-2">
              <h2 class="border-zinc-100 flex flex-col items-center underline mb-2">
                <BaseIcon name="ic:baseline-chat" />
                <span class="font-bold text-brand-primary">{{ messageModalData.first_name }} {{ messageModalData.last_name }}</span>
              </h2>
              <span 
                class="flex min-w-[80px] items-center justify-center rounded-full px-2 py-0.5 text-xs font-bold ring-1 ring-inset"
                :class="getStatusColor(messageModalData.status)">
                {{ messageModalData.status }}
              </span>
            </div>
            
            <div class="flex flex-col items-center py-2">
              <span class="font-bold text-sm">{{ getReason(messageModalData.reason) }}</span>
              <div>
                <time class="text-zinc-400 text-xs" :datetime="messageModalData.created_at">Sent: {{ dateFormat.formatLongDateTime(messageModalData.created_at) }}</time>
              </div>
            </div>

            <!-- Message content -->
            <div class="flex flex-col overflow-y-auto space-y-2">
              <PleaseNote class="text-xs">These contact messages are from external sources so do not trust links unless you know who they come from.</PleaseNote>
              <div>
                <h3 class="font-bold">Name</h3>
                <p>
                  {{ messageModalData.first_name }} {{ messageModalData.last_name }}
                </p>
              </div>
              <div>
                <h3 class="font-bold">Email</h3>
                <p>
                  <a :href="`mailto:${messageModalData.email}`" class="link">{{ messageModalData.email }}</a>
                </p>
              </div>
              <div v-if="messageModalData.phone !== ''">
                <h3 class="font-bold">Phone</h3>
                <p>
                  <a :href="`tel:messageModalData.phone`" class="link">{{ messageModalData.phone }}</a>
                </p>
              </div>
              <div>
                <h3 class="font-bold">Submitted From</h3>
                <p>{{ messageModalData.contact_type }}</p>
              </div>
              <div>
                <h3 class="font-bold">Message</h3>
                <p>{{ messageModalData.message }}</p>
              </div>
            </div>
          </div>
          <div v-else>
            Content not loaded properly...
          </div>
        </BaseInteractiveModal>

        <!-- Email -->
        <td class="px-4 py-3">
          <div><a :href="`mailto:${u.email}`" class="link">{{ u.email }}</a></div>
        </td>

        <!-- Phone Number -->
        <td class="px-4 py-3">
          <div v-if="u.phone !== ''" class="w-max"><a :href="`tel:${u.phone}`" class="link">{{ u.phone }}</a></div>
          <div v-else><p>Not Provided</p></div>
        </td>

        <!-- Contact Reason -->
        <td class="px-4 py-3">
          <div class="w-max">{{ getReason(u.reason) }}</div>
        </td>

        <!-- Tags -->
        <td class="px-4 py-3">
          <div
            :class="['group relative rounded-lg border border-transparent hover:bg-slate-50/60 transition hover:border-slate-300 focus-within:border-slate-400', {'py-2 px-6': u.tags.length > 0, 'p-3': u.tags.length === 0}]"
          >
            <!-- Edit (pencil) top-right -->
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

            <!-- Add (+) top-left -->
            <button
              v-else
              type="button"
              class="hidden transition group-hover:flex group-focus-within:flex w-full h-full items-center justify-center"
              @click.stop="openTagModal(u, { focusInput: true })"
            >
              <BaseIcon name="mdi:plus-circle" size="size-5" class="text-brand-primary" />
              <span class="w-max">Add tags</span>
            </button>

            <!-- Shown tags (max 3) -->
            <ul v-if="u.tags.length > 0" class="space-y-1">
              <li
                v-for="(tag, idx) in (showAllTags ? u.tags : u.tags.slice(0, 3))"
                :key="`${u.id}-${tag}-${idx}`"
                class="grid grid-cols-[1fr_auto] items-center gap-2"
              >
                <span
                  class="inline-flex min-w-[80px] items-center justify-center rounded-full px-2 py-0.5 text-xs font-bold
                        ring-1 ring-inset bg-brand-primary text-white truncate"
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
                :aria-expanded="showAllTags ? 'true' : 'false'"
                @click.stop="showAllTags = !showAllTags"
              >
                {{ showAllTags ? 'Show less' : `Show all (${u.tags.length})` }}
              </button>
            </div>
          </div>

          <!-- Tag Modal (teleported) -->
          <Teleport to="body">
            <div
              v-if="tagModalFor?.id === u.id"
              class="fixed inset-0 z-[1000] grid place-items-center bg-black/40 p-4"
              @click="closeTagModal"
            >
              <div
                class="w-full max-w-md rounded-xl bg-white p-4 shadow-xl"
                @click.stop
              >
                <h3 class="mb-3 text-base font-semibold">Manage tags</h3>

                <!-- Current chips with remove -->
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

                <!-- Add input -->
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

                <!-- Hints -->
                <p class="mt-2 text-xs text-slate-500">
                  Tip: Press Enter to add. Paste a list separated by commas or spaces.
                </p>

                <!-- Actions -->
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
          <div class="w-max">{{ dateFormat.tableFormatDate(u.created_at) }}</div>
        </td>

        <!-- ID -->
        <td class="px-4 py-3">
          <div class="w-max">{{ u.id }}</div>
        </td>

        <!-- Actions (propagate to parent just like before) -->
        <td class="px-4 py-3 text-right">
          <slot name="actions" :contact-message="u" />
        </td>
      </tr>
    </template>
  </BaseAdminTable>
</template>

<script lang="ts" setup>
import { useDateFormat } from '../../composables/dates/dateFormat.js';
import type { ContactFormData, ContactFormStatus } from '../../models/admin/ContactForm.js';
import type { Pagination } from '../../models/Pagination.js';

const dateFormat = useDateFormat();
const text = useText();

defineProps<{
  contactMessages: ContactFormData[]
  loading?: boolean
  pagination?: Pagination | null
}>()

const emit = defineEmits<{
  (e: 'prev-page' | 'next-page' | 'add-user'): void;
  (e: 'page-change', page: number): void;
  (e: 'change-status', payload: { id: string, status:  ContactFormStatus }): void;
  (e: 'change-tags', payload: { id: string, tags: string[] }): void;
  (e: 'export-pdf', payload: { id: string }): void;
}>()

const contactMessagesCols = [
  { key: 'status', label: 'Status' },
  { key: 'first_name', label: 'Name' },
  { key: 'message', label: 'Message' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone Number' },
  { key: 'reason', label: 'Reason' },
  { key: 'tags', label: 'Tags' },
  { key: 'created_at', label: 'Email Sent', sortable: true },
  { key: 'id', label: 'ID' },
  { key: 'actions', label: 'Actions'}
]

/** Status dropdown */
const openStatusFor = ref<ContactFormData | null>(null)
const statusMenuRef = ref<HTMLElement | null>(null)
const statusMenuStyle = ref<Record<string, string>>({})

const getStatusColor = (status: ContactFormStatus) => {
  const sMap: Record<ContactFormStatus, string> = {
    new: 'bg-green-100 text-green-800 ring-green-600/20',
    reviewing: 'bg-yellow-100 text-yellow-800 ring-yellow-600/20',
    contacted: 'bg-blue-100 text-blue-800 ring-blue-600/20',
    spam: 'bg-red-100 text-red-800 ring-red-600/20',
    closed: 'bg-gray-100 text-gray-800 ring-gray-600/20'
  }
  return sMap[status] ?? ''
}

const getReason = (reason: string) => {
  const reasonMap: Record<string, string> = {
    general: 'General Contact',
    complaint: 'File a Complaint', 
    question: 'Question or Inquiry', 
    transportation: 'Transportation Services', 
    assisted_living: 'Assisted Living', 
    medical_supply: 'Medical Supplies',
    accessibility: 'Accessibility'         
  }

  return reasonMap[reason];
}

let statusTriggerEl: HTMLElement | null = null

const openStatusMenu = (e: MouseEvent, contactMessage: ContactFormData) => {
  openStatusFor.value = contactMessage
  statusTriggerEl = e.currentTarget as HTMLElement
  nextTick(positionMenu)
}

const positionMenu = () => {
  if (!statusTriggerEl) return
  const rect = statusTriggerEl.getBoundingClientRect()
  const menuEl = statusMenuRef.value

  let menuW = 112
  let menuH = 72
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
  if (left + menuW > window.innerWidth - pad) left = window.innerWidth - menuW - pad
  if (left < pad) left = pad

  statusMenuStyle.value = { top: `${Math.max(pad, top)}px`, left: `${left}px` }
}

const selectStatus = (contactMessage: ContactFormData, status: ContactFormStatus) => {
  openStatusFor.value = null
  if (contactMessage.status !== status) emit('change-status', { id: contactMessage.id, status })
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

const messageModalOpen = ref<boolean>(false);
const messageModalData = ref<ContactFormData | null>(null)

const openMessageModal = (row: ContactFormData) => {
  messageModalData.value = row;
  messageModalOpen.value = true;
}

const closeMessageModal = () => {
  messageModalData.value = null;
}

const showAllTags = ref(false)

const tagModalFor = ref<ContactFormData | null>(null)
const tagsDraft = ref<string[]>([])
const newTag = ref('')
const newTagInputRef = ref<HTMLInputElement | null>(null)

const openTagModal = (row: ContactFormData, opts?: { focusInput?: boolean }) => {
  tagModalFor.value = row
  tagsDraft.value = [...(row.tags || [])]
  newTag.value = ''
  nextTick(() => {
    if (opts?.focusInput) newTagInputRef.value?.focus()
  })
}

const closeTagModal = () => {
  tagModalFor.value = null
  newTag.value = ''
}

const sanitizeTag = (t: string) => {
  return t.trim().replace(/\s+/g, ' ')
}

const addDraftTag = () => {
  if (!newTag.value) return
  // support comma/space-separated paste
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
  // emit up to parent; parent persists and refreshes row
  emit('change-tags', { id, tags: [...tagsDraft.value] })
  closeTagModal()
}

useHead({
  bodyAttrs: {
    class: computed(() => (messageModalOpen.value) ? 'no-scroll' : '')
  }
})
</script>

<style>

</style>