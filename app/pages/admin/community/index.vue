<template>
  <div v-if="authStore.authorized">
    <BaseLayoutPageSection margin="top" bg="transparent" class="min-h-[calc(50vh-2rem)]">
      <BaseLayoutPageContainer class="space-y-4">
        <h2 class="text-2xl text-brand-primary font-bold">Community Page Images:</h2>
        <BaseUiAction type="button" class="p-2" @click="togglePreviewModal">Preview Carousel</BaseUiAction>
        <div>
          <ul class="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            <li v-for="(image, idx) in images" :key="image.id">
              <div v-if="image.src !== ''" class="relative rounded-lg border-2 border-black overflow-hidden">
                <p class="font-bold absolute bg-black/40 top-2 left-2 p-2 rounded-lg text-white text-xs">Slot {{ idx + 1 }}</p>
                <NuxtImg :src="image.src" class="object-contain w-full bg-black aspect-video"/>
                <button class="absolute bottom-2 left-2 flex group"><BaseIcon name="material-symbols:edit-square-outline-rounded" color="text-white/50" hover-color="group-hover:text-white"/></button>
                <button class="absolute bottom-2 right-2 flex group"><BaseIcon name="material-symbols:delete-rounded" color="text-white/50" hover-color="group-hover:text-white"/></button>
              </div>
              <button v-else class="group w-full h-full aspect-video">
                <div class="relative rounded-lg border-2 border-black overflow-hidden bg-black/80 h-full w-full flex justify-center items-center">
                  <p class="font-bold absolute bg-black/40 top-2 left-2 p-2 rounded-lg text-white text-xs">Slot {{ idx + 1 }}</p>
                  <BaseIcon name="material-symbols:add-photo-alternate-sharp" color="text-white/50" hover-color="group-hover:text-white" size="size-12"/>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
    <BaseInteractiveModal v-model="previewModalOpen" :normal-modal="false" custom-modal="w-full h-full top-0 left-0 rounded-none" styling="justify-center max-w-[1200px] mx-auto" :padding="2">
      <BaseInteractiveImageCarousel :images="previewImages" image-selection/>
    </BaseInteractiveModal>
  </div>
  <div v-else>
        <AdminLogin />
    </div>
</template>

<script lang="ts" setup>
import type { CommunityImagesResponse, FetchImages } from '../../../models/ImagesData.js';

const authStore = useAuthStore();
definePageMeta({
    layout: 'admin',
})

const images = ref<FetchImages>([])
const imageLoading = ref<boolean>(true)
const previewModalOpen = ref<boolean>(false);

const previewImages = ref<FetchImages>([])
const previewImageLoading = ref<boolean>(true)

const fetchImages = async () => {
  try {
    imageLoading.value = true
    previewImageLoading.value = true
    
    const response = await $fetch<CommunityImagesResponse>('/api/media/community-shown', {
      baseURL: 'http://127.0.0.1:4000'
    })
    
    // Handle both object format and array format
    const slots = Array.isArray(response.slots) ? response.slots : Object.values(response.slots);
    
    // Full array for admin grid (all 8 slots with empty placeholders)
    images.value = slots.map((slot, index) => {
      if (slot === null) {
        return {
          id: index.toString(),
          src: '',
          alt: ''
        }
      }
      
      return {
        id: index.toString(),
        src: slot.src || '',
        alt: slot.alt || ''
      }
    })
    
    // Filtered array for preview modal (only non-null slots)
    previewImages.value = slots
      .map((slot, index) => {
        if (slot === null) return null
        return {
          id: index.toString(),
          src: slot.src || '',
          alt: slot.alt || ''
        }
      })
      .filter(slot => slot !== null) // Remove null entries
    
  } catch (error) {
    console.error('Failed to fetch images:', error)
    
    // Create 8 empty slots as fallback for admin
    images.value = Array.from({ length: 8 }, (_, index) => ({
      id: index.toString(),
      src: '',
      alt: ''
    }))
    
    // Empty preview array on error
    previewImages.value = []
    
  } finally {
    imageLoading.value = false
    previewImageLoading.value = false
  }
}

const togglePreviewModal = () => {
  previewModalOpen.value = !previewModalOpen.value
}

useHead({
  bodyAttrs: {
    class: computed(() => (previewModalOpen.value) ? 'no-scroll' : '')
  }
})

onMounted(() => {
  fetchImages();
})

</script>

<style>

</style>