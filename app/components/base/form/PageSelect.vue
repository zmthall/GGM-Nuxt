<script setup lang="ts">
const placement = ref<'bottom' | 'top'>('bottom')

// replace computeMenuPosition with this:
function computeMenuPosition () {
  const el = trigger.value
  if (!el) return

  const r = el.getBoundingClientRect()
  const viewportH = window.innerHeight

  // Desired menu height (4 rows by default) in px
  // Account for the UL vertical padding (~8px from py-1)
  const desired = props.maxVisibleRows * props.rowHeightPx + 8

  // Space around the trigger
  const gap = 4
  const spaceBelow = Math.max(0, viewportH - r.bottom - gap)
  const spaceAbove = Math.max(0, r.top - gap)

  // Choose placement: if below space is insufficient and above is better, flip
  if (spaceBelow < desired && spaceAbove > spaceBelow) {
    placement.value = 'top'
    const usable = Math.min(desired, spaceAbove)
    menuStyle.value = {
      position: 'fixed',
      top: `${Math.round(r.top - usable - gap)}px`, // place ABOVE
      left: `${Math.round(r.left)}px`,
      width: `${Math.round(r.width)}px`,
      maxHeight: `${usable}px`,
      zIndex: '1000'
    }
  } else {
    placement.value = 'bottom'
    const usable = Math.min(desired, spaceBelow)
    menuStyle.value = {
      position: 'fixed',
      top: `${Math.round(r.bottom) + gap}px`,        // place BELOW
      left: `${Math.round(r.left)}px`,
      width: `${Math.round(r.width)}px`,
      maxHeight: `${usable}px`,
      zIndex: '1000'
    }
  }
}

const props = withDefaults(defineProps<{
  modelValue: number
  totalPages: number
  label?: string
  instanceId?: string        // 👈 optional external id override
  maxVisibleRows?: number
  rowHeightPx?: number
}>(), {
  label: 'Jump to page',
  maxVisibleRows: 4,
  rowHeightPx: 36,
  instanceId: undefined
})

const emit = defineEmits<{
  (e: 'update:modelValue' | 'change', v: number): void
}>()

// ---- unique ids per instance ----
let seq = 0
const localId = `page-select-${++seq}-${Math.random().toString(36).slice(2, 6)}`
const uid = computed(() => props.instanceId || localId)
const btnId = computed(() => `${uid.value}-btn`)
const menuId = computed(() => `${uid.value}-menu`)

// ---- state/refs ----
const open = ref(false)
const trigger = ref<HTMLElement | null>(null)
const menuEl = ref<HTMLElement | null>(null)        // 👈 use ref, not document.getElementById
const activeIndex = ref(-1)
const menuStyle = ref<Record<string, string>>({})
const pages = computed(() => Array.from({ length: props.totalPages }, (_, i) => i + 1))

function openMenu () {
  open.value = true
  computeMenuPosition()
  activeIndex.value = pages.value.indexOf(props.modelValue)
  nextTick(() => document.addEventListener('mousedown', onClickOutside, true))
  window.addEventListener('scroll', computeMenuPosition, true)
  window.addEventListener('resize', computeMenuPosition, true)
}

function closeMenu () {
  open.value = false
  document.removeEventListener('mousedown', onClickOutside, true)
  window.removeEventListener('scroll', computeMenuPosition, true)
  window.removeEventListener('resize', computeMenuPosition, true)
}

function toggleMenu () { 
  if(open.value)
    closeMenu()
  else openMenu()
}

function onClickOutside (e: MouseEvent) {
  const t = e.target as Node
  if (trigger.value?.contains(t)) return
  if (menuEl.value?.contains(t)) return               // 👈 check the actual menu for THIS instance
  closeMenu()
}

function selectPage (p: number) {
  emit('update:modelValue', p)
  emit('change', p)
  closeMenu()
  trigger.value?.focus()
}

function onButtonKeydown (e: KeyboardEvent) {
  if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    if (!open.value) openMenu()
    activeIndex.value = Math.max(0, pages.value.indexOf(props.modelValue))
  }
}

function onListKeydown (e: KeyboardEvent) {
  if (e.key === 'Escape') { e.preventDefault(); closeMenu(); return }
  if (e.key === 'ArrowDown') { e.preventDefault(); activeIndex.value = Math.min(activeIndex.value + 1, pages.value.length - 1) }
  else if (e.key === 'ArrowUp') { e.preventDefault(); activeIndex.value = Math.max(activeIndex.value - 1, 0) }
  else if (e.key === 'Enter') { e.preventDefault(); const p = pages.value[activeIndex.value]; if (p) selectPage(p) }
}

watch(() => open.value, v => { if (v) nextTick(computeMenuPosition) })
onBeforeUnmount(() => closeMenu())
</script>

<template>
  <div class="relative inline-block">
    <label :for="btnId" class="sr-only">{{ label }}</label>
    <button
      :id="btnId"
      ref="trigger"
      type="button"
      class="w-40 rounded-md border px-2 py-1 text-sm text-left bg-white"
      aria-haspopup="listbox"
      :aria-expanded="open"
      :aria-controls="menuId"
      @click="toggleMenu"
      @keydown="onButtonKeydown"
    >
      <div class="w-full h-full pointer-events-none flex justify-between">
        <span>Page {{ modelValue }}</span>
        <BaseIcon v-if="!open" name="material-symbols:arrow-drop-down" size="size-5" />
        <BaseIcon v-else name="material-symbols:arrow-drop-up" size="size-5" />
      </div>
    </button>

    <teleport to="body">
      <div
        v-show="open"
        :id="menuId"
        ref="menuEl"                                 
        :style="menuStyle"
        role="listbox"
        tabindex="-1"
        class="rounded-md border bg-white shadow-lg overflow-y-auto focus:outline-none"
        @keydown="onListKeydown"
      >
        <ul class="py-1 text-sm">
          <li
            v-for="(p, i) in pages"
            :key="p"
            role="option"
            :aria-selected="p === modelValue"
            :class="[
              'px-3 cursor-pointer select-none flex items-center',
              'h-9',
              i === activeIndex ? 'bg-zinc-100' : '',
              p === modelValue ? 'font-semibold' : ''
            ]"
            @mouseenter="activeIndex = i"
            @mousedown.prevent
            @click="selectPage(p)"
          >
            Page {{ p }}
          </li>
        </ul>
      </div>
    </teleport>
  </div>
</template>
