<template>
  <div
    class="
      prose-table
      not-prose
      my-8
      overflow-hidden
      rounded-xl
      border
      border-zinc-200
      bg-zinc-50
      shadow-interior
    "
  >
    <div class="overflow-x-auto">
      <table
        class="
          w-full
          min-w-[760px]
          border-separate
          border-spacing-0
          text-left
          text-sm
          text-brand-main-text
          md:text-base
        "
      >
        <slot />
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.prose-table :deep(thead) {
  @apply bg-brand-primary text-white;
}

.prose-table :deep(th) {
  @apply px-5 py-4 align-middle font-bold leading-snug;
  @apply border-b-2 border-brand-secondary;
}

.prose-table :deep(th:not(:last-child)) {
  @apply border-r border-r-white/20;
}

.prose-table :deep(tbody td) {
  @apply bg-white px-5 py-4 align-top leading-relaxed;
}

.prose-table :deep(tbody td:not(:last-child)) {
  @apply border-r border-zinc-200;
}

.prose-table :deep(tbody tr:not(:last-child) td) {
  @apply border-b border-zinc-200;
}

.prose-table :deep(tbody tr:nth-child(even) td) {
  @apply bg-zinc-50;
}

.prose-table :deep(tbody tr:hover td) {
  @apply bg-brand-secondary/10;
}

.prose-table :deep(tbody td:first-child) {
  @apply font-semibold text-brand-primary;
}

.prose-table :deep(strong) {
  @apply font-bold text-brand-primary;
}

.prose-table :deep(a) {
  @apply font-semibold text-brand-primary underline;
  @apply decoration-brand-secondary decoration-2 underline-offset-2;
}

.prose-table :deep(a:hover) {
  @apply text-brand-primary/75;
}

.prose-table :deep(caption) {
  @apply bg-zinc-100 px-5 py-3 text-left text-sm;
  @apply font-medium text-brand-main-text/75;
  caption-side: bottom;
}
</style>