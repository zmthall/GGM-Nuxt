<script setup lang="ts">
withDefaults(defineProps<{
  src: string
  alt?: string
  title: string
  width?: number | null
  height?: number | null
  hasInset?: boolean
  loading?: 'eager' | 'lazy'
}>(), {
  alt: undefined,
  width: null,
  height: null,
  loading: 'lazy',
  hasInset: false
})

const fallbackSrc = '/images/blog/blog-default-thumbnail.png'
const hasImageError = ref(false)

const handleImageError = () => {
  hasImageError.value = true
}
</script>

<template>
  <div class="relative aspect-[2/1] max-w-[136px] overflow-hidden">
    <div v-if="hasInset" class="absolute shadow-light-interior z-1 w-full h-full" />
    <NuxtImg
      v-if="!hasImageError"
      format="webp,avif"
      :src="src || fallbackSrc"
      :alt="alt || title"
      :title="alt || title"
      :width="width ?? undefined"
      :height="height ?? undefined"
      :loading="loading"
      class="absoluteh-full w-full object-cover"
      :placeholder="src ? '' : '/images/blog/blog-default-placeholder.webp'"
      @error="handleImageError"
    />

    <img
      v-else
      :src="fallbackSrc"
      :alt="alt || title"
      :title="alt || title"
      class="absolute inset-0 h-full w-full object-cover"
      :loading="loading"
    >
  </div>
</template>