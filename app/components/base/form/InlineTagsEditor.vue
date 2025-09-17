<template>
  <div class="space-y-3">
    <!-- Label -->
      <label v-if="name" :for="name" class="font-extrabold text-xs inline-block mb-1 text-brand-primary capitalize">{{
            label }}</label>
    <!-- Chips -->
    <div class="flex flex-wrap gap-2">
      <span
        v-for="(t, i) in tags"
        :key="t + i"
        class="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs"
      >
        {{ t }}
        <button
          class="rounded-full px-1 leading-none text-slate-500 hover:bg-red-50 hover:text-red-600"
          :aria-label="`Remove tag ${t}`"
          @click="removeTag(i)"
        >
          ✕
        </button>
      </span>
      <span v-if="!tags.length" class="text-xs text-slate-400">No tags yet</span>
    </div>

    <!-- Add input -->
    <div class="flex gap-2 w-1/2">
      <BaseFormInput
        ref="inputRef"
        v-model="newTag"
        type="text"
        :name
        placeholder="Add a tag…"
        @keydown.enter.prevent="commit"
        @keydown="onKeydown"
      />
      <button class="rounded-md border px-3 py-2 text-sm hover:bg-zinc-50" @click="commit()">Add</button>
    </div>
    <p class="text-xs text-slate-500">
      Tip: Paste a list separated by commas or semicolons.
    </p>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  name?: string;
  label?: string;
}>()

/** v-model for the tags array */
const tags = defineModel<string[]>({ default: [] })

const newTag = ref('')
const inputRef = ref<HTMLInputElement|null>(null)

const sanitizeTag = (s: string) =>
  s.trim().replace(/\s+/g, ' ').slice(0, 40)

const commit = () => {
  if (!newTag.value) return
  // support commas/semicolons only
  const parts = newTag.value.split(/[;,；]+/).map(sanitizeTag).filter(Boolean)

  // dedupe case-insensitively, preserve first casing
  const existingLC = new Set(tags.value.map(t => t.toLowerCase()))
  for (const p of parts) {
    const lc = p.toLowerCase()
    if (!existingLC.has(lc)) {
      tags.value.push(p)
      existingLC.add(lc)
    }
  }

  newTag.value = ''
}

const removeTag = (idx: number) => {
  tags.value.splice(idx, 1)
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.isComposing) return
  // commit on semicolon or comma
  if (
    e.key === ';' || e.key === ',' ||
    e.key === '；' ||                // full-width semicolon (some keyboards)
    e.code === 'Semicolon' || e.code === 'Comma'
  ) {
    e.preventDefault()
    commit()
  }
}
</script>
