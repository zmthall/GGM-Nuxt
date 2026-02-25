<template>
  <div v-if="authStore.authorized && authStore.role !== 'correspondence'">
    <BaseLayoutPageSection margin="top" bg="transparent" class="min-h-[calc(50vh-2rem)]">
      <BaseLayoutPageContainer class="space-y-4">
        <h2 class="text-2xl text-brand-primary font-bold">Community Page Images:</h2>

        <BaseUiAction type="button" class="p-2" @click="togglePreviewModal">
          Preview Carousel
        </BaseUiAction>

        <div>
          <ul class="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <li v-for="(slot, idx) in images" :key="`${slot.id}-${slot.lastUpdated || ''}`">
              <!-- Filled slot -->
              <div v-if="slot.src !== ''" class="relative rounded-lg border-2 border-black overflow-hidden">
                <p class="font-bold absolute bg-black/40 top-2 left-2 p-2 rounded-lg text-white text-xs">
                  Slot {{ idx + 1 }}
                </p>

                <NuxtImg
                  :key="slot.lastUpdated || slot.src"
                  densities="1"
                  format="webp,avif"
                  :src="slot.src"
                  class="object-contain w-full bg-black aspect-video"
                  :alt="slot.alt"
                  sizes="sm:50vw md:25vw lg:20vw"
                  placeholder
                />

                <button class="absolute bottom-2 left-2 flex group" @click="toggleAddImageModal(idx, true)">
                  <BaseIcon name="material-symbols:edit-square-outline-rounded" color="text-white/50" hover-color="group-hover:text-white"/>
                </button>
                <button class="absolute bottom-2 right-2 flex group" @click="deleteSlot(idx)">
                  <BaseIcon name="material-symbols:delete-rounded" color="text-white/50" hover-color="group-hover:text-white"/>
                </button>
              </div>

              <!-- Empty slot -->
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

    <!-- Preview modal -->
    <BaseInteractiveModal
      v-model="previewModalOpen"
      :normal-modal="false"
      custom-modal="w-full h-full top-0 left-0 rounded-none"
      styling="justify-center max-w-[1200px] mx-auto"
      :padding="2"
    >
      <CommunityImageCarousel :images="previewImages" image-selection />
    </BaseInteractiveModal>

    <!-- Upload/edit modal -->
    <BaseInteractiveModal v-model="addImageModalOpen" :padding="4" styling="justify-between overflow-auto p-2">
      <div class="w-full">
        <BaseFormImageUpload
          v-model="imageData"
          name="slot-image"
          :label="`Upload Image for Slot ${imageSlot}`"
          :slot-index="currentImage"
          :aspect-ratio="32/17"
        />

        <div v-if="isEditingLoading" class="mt-4 text-sm text-gray-500">
          Loading current image…
        </div>

        <div class="flex justify-end mt-8">
          <BaseUiAction v-if="imageData.file !== null" type="button" class="p-2" @click="uploadImageToSlot">
            Save
          </BaseUiAction>
        </div>
      </div>
    </BaseInteractiveModal>
  </div>

  <div v-else-if="authStore.role === 'correspondence'">
    <BaseLayoutPageSection bg="transparent" margin="top">
      <BaseLayoutPageContainer>
        <div class="p-8 text-xl text-brand-main-text bg-zinc-300 rounded-xl shadow-primary mb-">
          <p>You do not have access to the Community Management page. Please contact an administrator if you believe this is an error.</p>
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
  </div>

  <div v-else>
    <AdminLogin />
  </div>
</template>

<script lang="ts" setup>
import type {
  ImageUpdateResponse,
  CommunityImagesResponse,
  FetchImages,
  ImageDataFile
} from '../../../models/ImagesData.js'

const authStore = useAuthStore()

definePageMeta({ layout: 'admin' })

// ---- Local slot typing to avoid `any`
type SlotData = {
  src?: string
  alt?: string
  lastUpdated?: string
} | null

const images = ref<FetchImages>([])
const imageLoading = ref<boolean>(true)

const previewModalOpen = ref<boolean>(false)
const previewImages = ref<FetchImages>([])
const previewImageLoading = ref<boolean>(true)

const addImageModalOpen = ref<boolean>(false)
const isEditingLoading = ref<boolean>(false)
const currentImage = ref<number | null>(null)

const imageData = ref<ImageDataFile>({ file: null, alt: '' })

const normalizeSlots = (raw: Array<SlotData> | Record<string, SlotData>): Array<SlotData> =>
  Array.isArray(raw) ? raw : Object.values(raw)

const toFilledSlot = (slot: Exclude<SlotData, null>, index: number) => ({
  id: String(index),
  src: slot.src ?? '',
  alt: slot.alt ?? '',
  lastUpdated: slot.lastUpdated ?? ''
})

const fetchImages = async (): Promise<void> => {
  try {
    imageLoading.value = true
    previewImageLoading.value = true

    const response = await $fetch<CommunityImagesResponse>('/api/media/community-shown', {
      baseURL: 'https://api.goldengatemanor.com/'
    })

    const slots = normalizeSlots(response.slots as Array<SlotData> | Record<string, SlotData>)

    // Full list for admin grid (8 slots incl. empty)
    images.value = slots.map((slot, index) => {
      if (slot === null) {
        return { id: String(index), src: '', alt: '', lastUpdated: '' }
      }
      return toFilledSlot(slot, index)
    })

    // Only non-empty for preview
    previewImages.value = slots.reduce<FetchImages>((acc, slot, index) => {
      if (slot !== null) acc.push(toFilledSlot(slot, index))
      return acc
    }, [])
  } catch (error) {
    console.error('Failed to fetch images:', error)
    images.value = Array.from({ length: 8 }, (_, index) => ({
      id: String(index),
      src: '',
      alt: '',
      lastUpdated: ''
    }))
    previewImages.value = []
  } finally {
    imageLoading.value = false
    previewImageLoading.value = false
  }
}

const deleteSlot = async (slot: number): Promise<void> => {
  const idToken = await authStore.getIdToken()
  try {
    const response = await $fetch<ImageUpdateResponse>(`/api/media/delete-shown/${slot}`, {
      baseURL: 'https://api.goldengatemanor.com/',
      method: 'DELETE',
      headers: { Authorization: `Bearer ${idToken}` }
    })
    if (response.success) await fetchImages()
  } catch (err) {
    console.error((err as Error).message)
  }
}

const uploadImageToSlot = async (): Promise<void> => {
  if (!imageData.value?.file || currentImage.value === null) {
    console.error('No file or slot selected')
    return
  }
  const idToken = await authStore.getIdToken()
  const formData = new FormData()
  formData.append('file', imageData.value.file)
  formData.append('alt', imageData.value.alt || '')

  try {
    const response = await $fetch<ImageUpdateResponse>(`/api/media/community-shown/${currentImage.value}`, {
      baseURL: 'https://api.goldengatemanor.com',
      method: 'PUT',
      headers: { Authorization: `Bearer ${idToken}` },
      body: formData
    })

    if (response.message) {
      addImageModalOpen.value = false
      currentImage.value = null
      imageData.value = { file: null, alt: '' }
      await fetchImages()
    }
  } catch (error) {
    console.error('Upload failed:', error)
  }
}

const togglePreviewModal = (): void => {
  previewModalOpen.value = !previewModalOpen.value
}

const imageSlot = computed<number | null>(() =>
  currentImage.value !== null ? currentImage.value + 1 : null
)

const toggleAddImageModal = async (idx: number, isEdit = false): Promise<void> => {
  if (imageLoading.value || !images.value[idx]) return
  currentImage.value = idx

  // Editing an existing slot: fetch blob directly (faster than base64)
  if (isEdit && images.value[idx].src !== '') {
    isEditingLoading.value = true
    try {
      const blob = await $fetch<Blob>(`/api/media/community-shown/image/${idx}`, {
        baseURL: 'https://api.goldengatemanor.com',
        responseType: 'blob' as const,
        query: { format: 'blob' }
      })

      // map mime -> extension (keep it simple)
      const extFromMime = (mime: string): string => {
        switch (mime) {
          case 'image/jpeg': return '.jpg'   // normalize jpeg -> .jpg
          case 'image/png':  return '.png'
          case 'image/webp': return '.webp'
          case 'image/avif': return '.avif'
          case 'image/gif':  return '.gif'
          case 'image/svg+xml': return '.svg'
          default: {
            // best-effort guess: "image/heic", "image/tiff", etc.
            const guessed = mime.split('/')[1]?.split('+')[0]
            return guessed ? `.${guessed.toLowerCase()}` : '.jpg'
          }
        }
      }

      const ext = extFromMime(blob.type)
      const file = new File([blob], `slot-${idx}${ext}`, {
        type: blob.type || 'image/jpeg',
        lastModified: Date.now()
      })

      imageData.value = {
        file,
        alt: images.value[idx].alt || ''
      }
    } catch (error) {
      console.error('Failed to load current image (blob):', error)
      imageData.value = { file: null, alt: '' }
    } finally {
      isEditingLoading.value = false
    }
  } else {
    // New image
    imageData.value = { file: null, alt: '' }
  }

  addImageModalOpen.value = true
}

useHead({
  bodyAttrs: {
    class: computed(() => (previewModalOpen.value ? 'no-scroll' : ''))
  }
})

const canFetch = computed(() => authStore.isFirebaseReady && authStore.authorized)

watch(
  canFetch,
  ok => { if (ok) fetchImages() },
  { immediate: true }
)
</script>

<style>
/* optional */
</style>
