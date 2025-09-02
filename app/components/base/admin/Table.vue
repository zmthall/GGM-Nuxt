<!-- components/AdminTableShell.vue -->
<template>
  <div>
    <!-- Toolbar -->
    <div class="mb-3 flex items-center justify-end p-2 bg-brand-primary">
      <slot name="toolbar" />
    </div>

    <!-- Table -->
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
                <span>{{ col.label }}</span>
                <span v-if="String(sort.key) === String(col.key)" aria-hidden="true">
                  <svg v-if="sort.dir === 'asc'" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path d="M10 6l-5 6h10L10 6z"/></svg>
                  <svg v-else class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path d="M10 14l5-6H5l5 6z"/></svg>
                </span>
              </div>
            </th>
            <th v-if="$slots.actions" class="px-4 py-3 border-b border-gray-200 text-left">Actions</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-100">
          <tr v-if="loading" class="animate-pulse">
            <td :colspan="columns.length + ($slots.actions ? 1 : 0)" class="px-4 py-6 text-center text-gray-500">
              Loading {{ title }}...
            </td>
          </tr>

          <!-- Your rows go here; we pass you the already-sorted array -->
          <slot name="tbody" :rows="sortedRows" :value="valueFor" />

          <!-- Optional: empty state if consumer didn’t render anything -->
          <tr v-if="!loading && sortedRows.length === 0">
            <td :colspan="columns.length + ($slots.actions ? 1 : 0)" class="px-4 py-6 text-center text-gray-500">
              No {{ title.toLowerCase() }} found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination footer -->
    <div
      v-if="pagination && showPagination"
      class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t px-4 py-3 bg-white"
    >
      <div class="text-sm text-gray-600">
        <span v-if="pagination.totalCount > 0">
          {{ pageStart }}-{{ pageEnd }} of {{ pagination.totalCount }}
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
        <select
          id="pageSelect"
          class="rounded-md border px-2 py-1 text-sm"
          :value="pagination.currentPage"
          @change="onPageSelect"
        >
          <option v-for="p in pagination.totalPages" :key="p" :value="p">Page {{ p }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import type { Pagination } from '~/models/Pagination'

/** Column config: dynamic keys OR custom accessor */
type Column<R> = {
  key: keyof R | string
  label: string
  sortable?: boolean
  accessor?: (row: R) => unknown
  format?: (value: unknown, row: R) => unknown
}

const props = defineProps<{
  rows: T[]
  loading?: boolean
  pagination?: Pagination | null
  columns: Array<Column<T>>
  title: string
}>()

const emit = defineEmits<{
  (e: 'prev-page' | 'next-page'): void
  (e: 'page-change', page: number): void
  (e: 'sort-change', payload: { key: string, dir: 'asc' | 'desc' }): void
}>()

/** Loading */
const loading = computed(() => props.loading === true)

/** Sorting */
type SortDir = 'asc' | 'desc'

const sort = reactive<{ key: string; dir: SortDir }>({
  key: props.columns?.length ? String(props.columns[0]?.key) : '',
  dir: 'asc',
})

// if columns can change at runtime, keep sort.key in sync:
watch(
  () => props.columns,
  (cols) => {
    if ((!sort.key || !cols.some(c => String(c.key) === sort.key)) && cols?.length) {
      sort.key = String(cols[0]?.key)
      sort.dir = 'asc'
    }
  },
  { immediate: true }
)

function onSort(key: string) {
  if (!key) return
  if (sort.key === key) sort.dir = sort.dir === 'asc' ? 'desc' : 'asc'
  else { sort.key = key; sort.dir = 'asc' }
  emit('sort-change', { key: sort.key, dir: sort.dir })
}

function getPath(obj: unknown, path: string): unknown {
  if (!path) return undefined;

  let cur: unknown = obj;
  const parts = path.split('.');

  for (const part of parts) {
    if (cur == null) return undefined; // null/undefined guard

    if (Array.isArray(cur)) {
      // array: part must be a valid integer index
      const idx = Number(part);
      if (!Number.isInteger(idx)) return undefined;
      cur = cur[idx];
    } else if (typeof cur === 'object') {
      // plain object: safe string indexing
      const rec = cur as Record<string, unknown>;
      cur = rec[part];
    } else {
      // primitive reached before path ended
      return undefined;
    }
  }

  return cur;
}



function valueFor(row: T, col: Column<T>) {
  let raw: unknown;

  if (col.accessor) {
    raw = col.accessor(row);
  } else if (typeof col.key === 'string') {
    raw = getPath(row, col.key);
  } else {
    raw = row[col.key];
  }

  return col.format ? col.format(raw, row) : raw;
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

const sortedRows = computed(() => {
  if (!sort.key) return props.rows;
  const factor = sort.dir === 'asc' ? 1 : -1;
  const col = props.columns.find(c => String(c.key) === sort.key);

  return props.rows
    .map((r, i) => ({ r, i }))
    .sort((a, b) => {
  const va = norm(col ? valueFor(a.r, col) : getPath(a.r, sort.key));
  const vb = norm(col ? valueFor(b.r, col) : getPath(b.r, sort.key));

  let cmp: number;
  if (va < vb) {
    cmp = -1;
  } else if (va > vb) {
    cmp = 1;
  } else {
    cmp = 0;
  }

  if (cmp !== 0) {
    return cmp * factor;
  }
  return a.i - b.i; // stable
})
    .map(x => x.r);
});



/** Pagination helpers */
const pagination = computed(() => props.pagination || undefined)

const pageStart = computed(() => {
  const p = pagination.value
  if (!p || p.totalCount === 0) return 0
  return (p.currentPage - 1) * p.pageSize + 1
})
const pageEnd = computed(() => {
  const p = pagination.value
  if (!p) return 0
  return Math.min(p.currentPage * p.pageSize, p.totalCount)
})

function gotoPrev() { if (pagination.value?.hasPreviousPage) emit('prev-page') }
function gotoNext() { if (pagination.value?.hasNextPage) emit('next-page') }
function onPageSelect(e: Event) {
  const val = Number((e.target as HTMLSelectElement).value)
  if (!Number.isNaN(val)) emit('page-change', val)
}
const showPagination = computed(() => (props.pagination?.totalPages ?? 0) > 1)
</script>
