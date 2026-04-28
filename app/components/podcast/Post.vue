<template>
  <li>
    <button
      class="group flex sm:mx-auto lg:hover:scale-105 transition-transform duration-500 ease-in-out w-full text-left"
      @click="$emit('watch', podcast.youtubeId)"
    >
      <div class="flex flex-col shadow-primary rounded-xl overflow-hidden h-full w-full">
        
        <!-- Thumbnail -->
        <div class="h-1/2 relative">
          
          <!-- Duration badge -->
          <div class="flex items-center gap-2 absolute z-10 top-2 left-2 bg-black/60 p-1 rounded-lg">
            <span class="text-sm text-white">{{ podcast.duration }}</span>
          </div>

          <!-- Thumbnail image -->
          <div class="aspect-[2/1]">
            <NuxtImg
              :src="thumbnailUrl"
              :alt="podcast.title"
              :title="podcast.title"
              format="webp,avif"
              quality="60"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <!-- Play overlay -->
          <div class="absolute inset-0 flex items-center justify-center">
            <BaseIcon
              name="logos:youtube-icon"
              size="size-16"
              class="opacity-90 group-hover:scale-110 transition-transform"
            />
          </div>

        </div>

        <!-- Content -->
        <div class="flex flex-col justify-between px-2 pt-4 pb-4">
          
          <!-- Category -->
          <div v-if="podcast.category" class="mb-2">
            <span class="bg-brand-primary border-brand-secondary border-2 p-2 text-white rounded-lg text-sm">
              {{ podcast.category }}
            </span>
          </div>

          <!-- Title -->
          <h3 class="text-xl font-bold text-brand-primary post-title">
            {{ podcast.title }}
          </h3>

          <!-- Description -->
          <p class="text-muted">
            {{ truncatedDescription }}
          </p>

        </div>

      </div>
    </button>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<{
  podcast: {
    title: string
    description: string
    youtubeId: string
    duration?: string
    category?: string
  }
}>()

defineEmits<{
  (e: 'watch', id: string): void
}>()

const thumbnailUrl = computed(() => {
  return `/images/pages/podcast/G&G-thumbnail.png`
})

const truncatedDescription = computed(() => {
  if (!props.podcast.description) return ''
  return props.podcast.description.length > 100
    ? props.podcast.description.slice(0, 100) + '...'
    : props.podcast.description
})
</script>

<style scoped>
.post-title {
  --max-lines: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: var(--max-lines);
  -webkit-line-clamp: var(--max-lines);
  position: relative;
}
</style>