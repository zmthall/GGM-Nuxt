<template>
  <BaseInteractiveImageCarousel :images image-selection @view-more="openImageModal" />
  <BaseInteractiveModal v-model="imageModalOpen" :normal-modal="false" custom-modal="w-full h-full overflow-hidden top-0 left-0" :padding="4" @close="closeImageModal">
      <template #default>
        <div v-show="!modalImagesLoading" class="h-[90vh] mt-2">
          <h2 class="text-xl sm:text-2xl font-bold text-brand-primary absolute top-4 sm:left-1/2 sm:-translate-x-1/2 w-max">Community Images 2025</h2>
          <span class="absolute bottom-6 left-6 sm:top-2 font-bold z-10 h-max">Image {{ currentImage }} of {{ totalImages }}</span>
          <BaseInteractiveImageSlider v-model="allImages" :show-thumbnails="false" :show-dots="false" :max-height="'85vh'" @images-loaded="imagesLoaded" @change="setCurrentPage" @initial-load="setImageTotal"/>
        </div>
        <div v-show="modalImagesLoading" class="flex justify-center items-center h-full">
          <div class="image-loader" />
        </div>
      </template>
    </BaseInteractiveModal>
</template>

<script lang="ts" setup>
import type { CommunityImagesResponse, FetchImages } from '../../models/ImagesData.js';

type Slide = { url: string; w?: number; h?: number; alt?: string }

const images = ref<FetchImages>([])
const imageLoading = ref<boolean>(true)

const imageModalOpen = ref<boolean>(false);
const modalImagesLoading = ref<boolean>(true)
const allImages = ref<Slide[]>([]);
const currentImage = ref<number>(1)
const totalImages = ref<number>()

const fetchImages = async (): Promise<void> => {
  try {
    imageLoading.value = true
    const response = await $fetch<CommunityImagesResponse>('/api/media/community-shown', {
      baseURL: 'https://api.goldengatemanor.com/'
    })
    
    // Filter out null slots and create array of only filled slots
    images.value = Object.entries(response.slots)
      .filter(([_key, slot]) => slot !== null) // Remove null slots
      .map(([key, slot]) => ({
        id: key,
        src: slot.src,
        alt: slot.alt,
        lastUpdated: slot.lastUpdated
      }))
  } catch (error) {
    console.error('Failed to fetch images:', error)
    images.value = []
  } finally {
    imageLoading.value = false
  }
}

const imagesLoaded = () => {
  console.log('Images loaded event fired!')
  modalImagesLoading.value = false;
}

const openImageModal = async () => {
  modalImagesLoading.value = true
  try {
    const response = await $fetch<{ success: boolean, data: { houseId: string, items: Slide[] } }>(`/api/community/images?signed=true`, {
      baseURL: 'https://api.goldengatemanor.com',
      method: 'GET',
    })

    if(response.success) {
      allImages.value = response.data.items;
      imageModalOpen.value = true;
    }
  } catch (error) {
    console.error((error as Error).message)
  }
}

const setCurrentPage = (idx: number) => {
  currentImage.value = idx + 1;
}

const setImageTotal = (count: number) => {
  totalImages.value = count;
}


const closeImageModal = () => {
  imageModalOpen.value = false;
  totalImages.value = undefined;
  currentImage.value = 1;
  nextTick(() => {
    allImages.value = []
  })
}

onMounted(() => {
  fetchImages()
})

</script>

<style>

</style>