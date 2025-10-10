<template>
  <div class="h-full w-full">
    <ul class="w-full h-full relative bg-black">
      <li 
      v-for="(image, idx) in images" 
      :key="image.id" 
      class="absolute h-full w-full transition-opacity duration-500 "
      :class="{ 'opacity-0': currentIdx !== idx }"
      >
      <div class="absolute top-0 left-0 shadow-image w-full h-full"/>
      <button class="absolute opacity-50 bottom-0 left-0 hover:opacity-100 z-10" @click="toggleSlideShow" >
        <BaseIcon v-if="!isPlaying" name="material-symbols:play-arrow-rounded" />
        <BaseIcon v-else name="ic:outline-pause" />
      </button>

        <NuxtImg 
          :src="image.src" 
          :alt="image.alt" 
          format="webp,avif"
          :width="400"
          :height="300"
          quality="70"
          sizes="sm:300px md:400px lg:500px xl:600px"
          preload
          class="w-full h-full object-cover"
          :loading="image.loading"
          :title="image.title"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { ImageData } from '../../../models/ImagesData.js';

const isPlaying = ref<boolean>(false);

const props = defineProps<{
  images: ImageData[];
}>()

const currentIdx = ref<number>(0)

const nextImage = () => {
  currentIdx.value = (currentIdx.value + 1) % props.images.length
}

// Auto-play functionality
let slideInterval: NodeJS.Timeout | null = null

const toggleSlideShow = () => {
  if(isPlaying.value) {
    if(slideInterval) {
      clearInterval(slideInterval)
      slideInterval = null
      isPlaying.value = false;
    }
  } else {
    slideInterval = setInterval(nextImage, 3000) // Change every 3 seconds
    isPlaying.value = true;
  }
}

// Start slideshow when component mounts
onMounted(() => {
  toggleSlideShow()
})

// Clean up when component unmounts
onUnmounted(() => {
  toggleSlideShow()
})

// // Optional: Pause on hover
// const pauseOnHover = () => {
//   stopSlideshow()
// }

// const resumeOnLeave = () => {
//   startSlideshow()
// }
</script>

<style scoped>
  .shadow-image {
    box-shadow: inset 0 0 4px 3px rgba(0, 0, 0, 0.3)
  }
</style>