<template>
  <div v-if="authStore.authorized">
    <BaseLayoutPageSection margin="top" bg="transparent" class="min-h-[calc(50vh-2rem)]">
      <BaseLayoutPageContainer class="space-y-4">
        <h2 class="text-2xl text-brand-primary font-bold">Community Page Images:</h2>
        <BaseUiAction type="button" class="p-2" @click="togglePreviewModal">Preview Carousel</BaseUiAction>
        <div>
          <ul class="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <li v-for="(slot, idx) in images" :key="`${slot.id}-${slot.lastUpdated || ''}`">
              <div v-if="slot.src !== ''" class="relative rounded-lg border-2 border-black overflow-hidden">
                <p class="font-bold absolute bg-black/40 top-2 left-2 p-2 rounded-lg text-white text-xs">Slot {{ idx + 1 }}</p>
                <NuxtImg :src="slot.src" class="object-contain w-full bg-black aspect-video" :alt="slot.alt" />
                <button class="absolute bottom-2 left-2 flex group" @click="toggleAddImageModal(idx, true)"><BaseIcon name="material-symbols:edit-square-outline-rounded" color="text-white/50" hover-color="group-hover:text-white"/></button>
                <button class="absolute bottom-2 right-2 flex group" @click="deleteSlot(idx)"><BaseIcon name="material-symbols:delete-rounded" color="text-white/50" hover-color="group-hover:text-white"/></button>
              </div>
              <button v-else class="group w-full h-full aspect-video" @click="toggleAddImageModal(idx)">
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
    <BaseInteractiveModal v-model="addImageModalOpen" :padding="4">
      <BaseFormImageUpload
        v-model="imageData"
        name="slot-image"
        :label="`Upload Image for Slot ${imageSlot}`"
        :slot-index="currentImage"
        :aspect-ratio="32/17"
      />
      <BaseUiAction v-if="imageData.file !== null" type="button" class="p-2" @click="uploadImageToSlot">Save</BaseUiAction>
    </BaseInteractiveModal>
  </div>
  <div v-else>
        <AdminLogin />
    </div>
</template>

<script lang="ts" setup>
import type { ImageUpdateResponse, CommunityImagesResponse, FetchImages } from '../../../models/ImagesData.js';

interface ImageData {
  file: File | null
  alt: string
}

const authStore = useAuthStore();
definePageMeta({
    layout: 'admin',
})

const images = ref<FetchImages>([]);
const imageLoading = ref<boolean>(true);

const previewModalOpen = ref<boolean>(false);
const previewImages = ref<FetchImages>([]);
const previewImageLoading = ref<boolean>(true);

const addImageModalOpen = ref<boolean>(false);
const currentImage = ref<number | null>(null)

const imageData = ref<ImageData>({
  file: null,
  alt: ''
})

const fetchImages = async () => {
  try {
    imageLoading.value = true
    previewImageLoading.value = true
    
    const response = await $fetch<CommunityImagesResponse>('/api/media/community-shown', {
      baseURL: 'https://api.goldengatemanor.com/'
    })
    
    // Handle both object format and array format
    const slots = Array.isArray(response.slots) ? response.slots : Object.values(response.slots);
    
    // Full array for admin grid (all 8 slots with empty placeholders)
    images.value = slots.map((slot, index) => {
      if (slot === null) {
        return {
          id: index.toString(),
          src: '',
          alt: '',
          lastUpdated: ''
        }
      }
      
      return {
        id: index.toString(),
        src: slot.src || '',
        alt: slot.alt || '',
        lastUpdated: slot.lastUpdated || ''
      }
    })
    
    // Filtered array for preview modal (only non-null slots)
    previewImages.value = slots
      .map((slot, index) => {
        if (slot === null) return null
        return {
          id: index.toString(),
          src: slot.src || '',
          alt: slot.alt || '',
          lastUpdated: slot.lastUpdated || ''
        }
      })
      .filter(slot => slot !== null) // Remove null entries
    
  } catch (error) {
    console.error('Failed to fetch images:', error)
    
    // Create 8 empty slots as fallback for admin
    images.value = Array.from({ length: 8 }, (_, index) => ({
      id: index.toString(),
      src: '',
      alt: '',
      lastUpdated: ''
    }))
    
    // Empty preview array on error
    previewImages.value = []
    
  } finally {
    imageLoading.value = false
    previewImageLoading.value = false
  }
}

const deleteSlot = async (slot: number) => {
  const idToken = await authStore.getIdToken();

  try {
    const response = await $fetch<ImageUpdateResponse>(`/api/media/delete-shown/${slot}`, {
      baseURL: 'https://api.goldengatemanor.com/',
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${idToken}`,
      },
    })

    if(response.success) {
      await fetchImages()
      return;
    }
  } catch (err) {
    console.error((err as Error).message)
  }
}

const uploadImageToSlot = async () => {
  if (!imageData.value?.file || currentImage.value === null) {
    console.error('No file or slot selected')
    return
  }

  const idToken = await authStore.getIdToken()
  const formData = new FormData()
  
  // Add the file and alt text to FormData
  formData.append('file', imageData.value.file)
  formData.append('alt', imageData.value.alt || '')

  try {
    const response = await $fetch<ImageUpdateResponse>(`/api/media/community-shown/${currentImage.value}`, {
      baseURL: 'https://api.goldengatemanor.com/',
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${idToken}`,
      },
      body: formData
    })

    if (response.message) {
      // Close modal and refresh images
      addImageModalOpen.value = false
      currentImage.value = null;
      imageData.value = {
        file: null,
        alt: ''
      }
      await fetchImages()
    }
  } catch (error) {
    console.error('Upload failed:', error)
  }
}

const togglePreviewModal = () => {
  previewModalOpen.value = !previewModalOpen.value
}

const imageSlot = computed(() => {
  if(currentImage.value !== null)
    return currentImage.value + 1

  return null;
})

const toggleAddImageModal = async (idx: number, isEdit = false) => {
  if(!images.value[idx]) return false
  currentImage.value = idx;
  
  if (isEdit && images.value[idx].src !== '') {
    // Populate modal with existing data for editing
    try {
      // Fetch the current image file from the URL
      const response = await fetch(images.value[idx].src);
      const blob = await response.blob();
      
      // Create a File object from the blob
      const fileName = `${idx}.jpg`; // or extract from URL
      const file = new File([blob], fileName, { type: blob.type });
      
      imageData.value = {
        file: file,
        alt: images.value[idx].alt || ''
      };
    } catch (error) {
      console.error('Failed to load current image:', error);
      // Fallback to empty state
      imageData.value = {
        file: null,
        alt: images.value[idx].alt || ''
      };
    }
  } else {
    // Adding new image - start fresh
    imageData.value = {
      file: null,
      alt: ''
    };
  }
  
  addImageModalOpen.value = true;
};

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