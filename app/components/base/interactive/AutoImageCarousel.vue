<template>
  <div class="h-full w-full">
    <ul class="w-full h-full relative bg-black">
      <li 
        v-for="(image, idx) in images" 
        :key="image.id" 
        class="absolute h-full w-full transition-opacity duration-500"
        :class="{ 'opacity-0': currentIdx !== idx }"
      >
        <NuxtImg 
          :src="image.src" 
          :alt="image.alt" 
          format="webp"
          :width="400"
          :height="300"
          quality="50"
          sizes="sm:300px md:400px lg:500px xl:600px"
          preload
          class="w-full h-full object-cover object-middle"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
interface ImageData {
  id: string;
  src: string;
  alt: string;
}

const props = defineProps<{
  images: ImageData[];
}>()

const currentIdx = ref<number>(0)

const nextImage = () => {
  currentIdx.value = (currentIdx.value + 1) % props.images.length
}

// Auto-play functionality
let slideInterval: NodeJS.Timeout | null = null

const startSlideshow = () => {
  slideInterval = setInterval(nextImage, 3000) // Change every 3 seconds
}

const stopSlideshow = () => {
  if (slideInterval) {
    clearInterval(slideInterval)
    slideInterval = null
  }
}

// Start slideshow when component mounts
onMounted(() => {
  startSlideshow()
})

// Clean up when component unmounts
onUnmounted(() => {
  stopSlideshow()
})

// // Optional: Pause on hover
// const pauseOnHover = () => {
//   stopSlideshow()
// }

// const resumeOnLeave = () => {
//   startSlideshow()
// }
</script>