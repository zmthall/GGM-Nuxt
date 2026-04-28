<template>
  <section class="grid gap-6 lg:grid-cols-2 items-center mt-8">
    
    <!-- Video -->
    <BaseYoutubeLite
      :video-id="podcast.youtubeId"
      :has-title="false"
      aspect-ratio="16/9"
      class="w-2/3 justify-self-center"
      poster="podcast"
    />

    <!-- Content -->
    <div class="flex flex-col gap-4">
      <h2 class="text-xl font-bold text-text">
        {{ podcast.title }}
      </h2>

      <div>
        <p class="text-muted leading-relaxed" :class="{ 'featured-description': !featuredDescriptionShow}">
          {{ podcast.fullDescription }}
        </p>
        <button class="hover:text-brand-link-hover" @click="toggleFeaturedDescription">
          <span v-if="!featuredDescriptionShow">Show More</span>
          <span v-else>Show Less</span>
        </button>
      </div>

      <!-- Buttons -->
      <div class="flex gap-4 flex-wrap">
        
        <!-- Primary -->
        <BaseUiAction
          styling="flex justify-center items-center px-4 py-2"
          class="group"
          new-page
          no-follow
          :href="getYoutubeLink(podcast.youtubeId)"
        >
          <BaseIcon name="material-symbols:play-arrow-rounded" class="transition-colors duration-500 ease-in-out" color="text-white" hover-color="group-hover:text-brand-primary"/>
          <span>Watch on YouTube</span>
        </BaseUiAction>


      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  podcast: {
    title: string
    fullDescription: string
    description: string
    youtubeId: string
  }
  playlistUrl: string
}>()

defineEmits<{
  (e: 'watch', id: string): void
}>()

const featuredDescriptionShow = ref<boolean>(false)

const toggleFeaturedDescription = () => {
  featuredDescriptionShow.value = !featuredDescriptionShow.value
}

const getYoutubeLink = (youtubeId: string | undefined) => {
  return `https://www.youtube.com/watch?v=${youtubeId}` 
}

</script>

<style scoped>
.featured-description {
  --max-lines: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: var(--max-lines);
  -webkit-line-clamp: var(--max-lines);
  position: relative;
}
</style>