<template>
  <div>
    <div v-if="hasToolbar" class="mb-3 flex items-center justify-end p-2 bg-brand-primary">
      <slot name="toolbar" />
    </div>

    <div class="w-full overflow-x-auto p-2">
      <table class="min-w-[900px] w-full border-collapse">
        <thead>
          <tr class="bg-gray-50 text-left text-sm font-semibold text-gray-700">
            <th
              v-for="col in columns"
              :key="String(col.key)"
              :aria-sort="String(sort.key) === String(col.key) ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'"
              scope="col"
              class="px-4 py-3 border-b border-gray-200 select-none"
              :class="col.sortable === false ? '' : 'cursor-pointer'"
              @click="col.sortable === false ? null : onSort(String(col.key))"
            >
              <div class="flex items-center gap-1">
                <span class="w-max">{{ col.label }}</span>
                <span v-if="String(sort.key) === String(col.key)" aria-hidden="true">
                  <svg v-if="sort.dir === 'asc'" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path d="M10 6l-5 6h10L10 6z"/></svg>
                  <svg v-else class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path d="M10 14l5-6H5l5 6z"/></svg>
                </span>
              </div>
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-100">
          <tr v-if="loading" class="animate-pulse">
            <td :colspan="columns.length" class="px-4 py-6 text-center text-gray-500">
              Loading {{ title }}...
            </td>
          </tr>

          <slot name="tbody" :rows="sortedRows" :value="valueFor" />

          <tr v-if="!loading && sortedRows.length === 0">
            <td :colspan="columns.length" class="px-4 py-6 text-center text-gray-500">
              No {{ title.toLowerCase() }} found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="pagination && showPagination"
      class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t px-4 py-3 bg-white"
    >
      <div class="text-sm text-gray-600">
        <span v-if="pagination.totalItems > 0">
          {{ pageStart }}-{{ pageEnd }} of {{ pagination.totalItems }}
        </span>
        <span v-else>0 of 0</span>
      </div>

      <div class="flex items-center gap-3">
        <span class="text-sm text-gray-600">
          Page {{ pagination.currentPage }} of {{ pagination.totalPages }}
        </span>

        <div class="flex items-center gap-1">
          <button
            class="rounded-md border px-3 py-1.5 text-sm disabled:opacity-40"
            :disabled="!pagination.hasPreviousPage"
            @click="gotoPrev"
          >‹ Prev</button>
          <button
            class="rounded-md border px-3 py-1.5 text-sm disabled:opacity-40"
            :disabled="!pagination.hasNextPage"
            @click="gotoNext"
          >Next ›</button>
        </div>

        <label class="sr-only" for="pageSelect">Jump to page</label>
        <BaseFormPageSelect
          :model-value="pagination?.currentPage ?? 1"
          :total-pages="pagination?.totalPages ?? 1"
          label="Jump to page"
          class="w-40"
          :max-visible-rows="4"
          @change="onPageSelect"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import type { Pagination } from '~/models/Pagination'
import type { Column, SortDir } from '../../../models/admin/tables.js'

const props = withDefaults(defineProps<{
  rows: T[]
  loading?: boolean
  pagination?: Pagination | null
  columns: Array<Column<T>>
  title: string
  hasToolbar?: boolean
  initialSort?: { key: string | undefined; dir: SortDir }
  pinNewToTop?: boolean
}>(), {
  pagination: null,
  hasToolbar: true,
  initialSort: () => ({ key: undefined, dir: 'asc' as SortDir }),
  pinNewToTop: true
})

const emit = defineEmits<{
  (e: 'prev-page' | 'next-page'): void
  (e: 'page-change', page: number): void
  (e: 'sort-change', payload: { key: string, dir: SortDir }): void
}>()

const loading = computed(() => props.loading === true)

const sort = reactive<{ key: string; dir: SortDir }>({ key: '', dir: 'asc' })

function normalizeDir(dir?: SortDir): SortDir {
  return dir === 'desc' ? 'desc' : 'asc'
}

function firstSortableKey(cols: Array<Column<T>>): string {
  const c = cols.find(c => c.sortable !== false)
  return c ? String(c.key) : ''
}

function resolveInitialSort() {
  const cols = props.columns ?? []
  if (!cols.length) {
    sort.key = ''
    sort.dir = 'asc'
    return
  }

  const wantedKey = props.initialSort?.key
  const wantedDir = normalizeDir(props.initialSort?.dir)

  const wantedIsValid = !!wantedKey && cols.some(c =>
    String(c.key) === String(wantedKey) && c.sortable !== false
  )

  if (wantedIsValid) {
    sort.key = String(wantedKey)
    sort.dir = wantedDir
    return
  }

  sort.key = firstSortableKey(cols)
  sort.dir = 'asc'
}

watch(
  () => [props.columns, props.initialSort?.key, props.initialSort?.dir] as const,
  resolveInitialSort,
  { immediate: true }
)

function onSort(key: string) {
  if (!key) return
  if (sort.key === key) sort.dir = sort.dir === 'asc' ? 'desc' : 'asc'
  else {
    sort.key = key
    sort.dir = 'asc'
  }
  emit('sort-change', { key: sort.key, dir: sort.dir })
}

function getPath(obj: unknown, path: string): unknown {
  if (!path) return undefined

  let cur: unknown = obj
  const parts = path.split('.')

  for (const part of parts) {
    if (cur == null) return undefined

    if (Array.isArray(cur)) {
      const idx = Number(part)
      if (!Number.isInteger(idx)) return undefined
      cur = cur[idx]
    } else if (typeof cur === 'object') {
      const rec = cur as Record<string, unknown>
      cur = rec[part]
    } else {
      return undefined
    }
  }

  return cur
}

function valueFor(row: T, col: Column<T>) {
  let raw: unknown

  if (col.accessor) raw = col.accessor(row)
  else if (typeof col.key === 'string') raw = getPath(row, col.key)
  else raw = row[col.key]

  return col.format ? col.format(raw, row) : raw
}

function norm(v: unknown): string | number {
  if (v == null) return ''
  if (v instanceof Date) return v.getTime()
  if (typeof v === 'string') {
    const t = Date.parse(v)
    if (!Number.isNaN(t)) return t
    return v.toLowerCase()
  }
  if (typeof v === 'number') return v
  if (typeof v === 'boolean') return v ? 1 : 0
  return String(v)
}

function newPriority(row: T): number {
  const status = getPath(row, 'status')
  return typeof status === 'string' && status.toLowerCase() === 'new' ? 0 : 1
}

const sortedRows = computed(() => {
  const factor = sort.dir === 'asc' ? 1 : -1
  const col = props.columns.find(c => String(c.key) === sort.key)

  return props.rows
    .map((r, i) => ({ r, i }))
    .sort((a, b) => {
      if (props.pinNewToTop) {
        const pa = newPriority(a.r)
        const pb = newPriority(b.r)
        if (pa !== pb) return pa - pb
      }

      if (!sort.key) {
        return a.i - b.i
      }

      const va = norm(col ? valueFor(a.r, col) : getPath(a.r, sort.key))
      const vb = norm(col ? valueFor(b.r, col) : getPath(b.r, sort.key))

      let cmp = 0
      if (va < vb) cmp = -1
      else if (va > vb) cmp = 1

      if (cmp !== 0) return cmp * factor
      return a.i - b.i
    })
    .map(x => x.r)
})

const pagination = computed(() => props.pagination || undefined)

const pageStart = computed(() => {
  const p = pagination.value
  if (!p || p.totalItems === 0) return 0
  return (p.currentPage - 1) * p.pageSize + 1
})

const pageEnd = computed(() => {
  const p = pagination.value
  if (!p) return 0
  return Math.min(p.currentPage * p.pageSize, p.totalItems)
})

function gotoPrev() {
  if (pagination.value?.hasPreviousPage) emit('prev-page')
}

function gotoNext() {
  if (pagination.value?.hasNextPage) emit('next-page')
}

function onPageSelect(v: number | Event) {
  const val = typeof v === 'number'
    ? v
    : Number((v.target as HTMLSelectElement).value)

  if (!Number.isNaN(val)) emit('page-change', val)
}

const showPagination = computed(() => (props.pagination?.totalPages ?? 0) > 1)
</script>