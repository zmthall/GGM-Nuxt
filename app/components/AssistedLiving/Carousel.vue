<!-- components/BaseCarousel.vue -->
<template>
  <section>
    <h2 class="text-2xl text-center font-bold text-brand-primary mb-8">Assisted Living Houses</h2>
        <div class="relative">
            <div class="flex items-center gap-3">
            <BaseUiAction v-if="!isCarouselLoading" type="button" class="px-3 py-6 bg-black text-white rounded flex justify-center items-center" @click="carousel?.prev()">‹</BaseUiAction>

            <BaseInteractiveCarousel ref="carousel" v-model:loading="isCarouselLoading" :items="houses" :gap="32" :height="350" item-key="id">
                <template #item="{ item }">
                    <div class="h-full bg-zinc-200/80 relative overflow-hidden rounded-lg group">
                      <button v-if="Array.isArray((item as House).mainImage)" class="w-full h-full absolute" @click.stop="openImageModal((item as House).id)" @touchstart.passive="() => {}">
                        <div class="flex flex-wrap w-full h-full">
                            <NuxtImg v-for="image in (item as House).mainImage" :key="image" format="webp, avif" :src="image" class="object-cover w-1/2 h-1/2" height="350" width="350" :alt="(item as House).mainAlt" :title="(item as House).mainAlt" loading="eager" />
                        </div>
                      </button>
                      <button v-else class="w-full h-full absolute" @click.stop="openImageModal((item as House).id)" @touchstart.passive="() => {}">
                        <NuxtImg format="webp, avif" :src="(item as House).mainImage as string" class="w-full h-full object-cover" height="350" width="350" :alt="(item as House).mainAlt" :title="(item as House).mainAlt" loading="eager" />
                      </button>
                        <div class="absolute left-0 top-0 flex flex-col items-center w-full bg-black/50 py-4 overflow-hidden">
                            <h2 class="text-white font-bold">{{ (item as House).name }}</h2>
                            <p class="text-white font-bold sm:max-h-0 sm:opacity-0 sm:group-hover:max-h-16 sm:group-hover:opacity-100 transition-all ease-in-out duration-500">{{ (item as House).address }}</p>
                            <p v-if="(item as House).additional" class="text-white font-bold max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100 transition-all ease-in-out duration-500">{{ (item as House).additional }}</p>
                        </div>
                        <div class="absolute left-0 bottom-4 flex justify-center w-full gap-4 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity ease-in-out duration-500">
                          <button class="text-xs font-bold uppercase px-4 py-2 rounded-lg bg-black/50 text-white hover:bg-white/50 hover:text-black" @click.stop="openImageModal((item as House).id)" @touchstart.passive="() => {}">View More</button>
                          <a class="text-xs font-bold uppercase px-4 py-2 rounded-lg bg-black/50 text-white hover:bg-white/50 hover:text-black" :href="(item as House).mapsURL" target="_blank" rel="noreferrer noopener" title="Opens in new tab">Directions</a>
                        </div>
                    </div>
                    <!-- <div v-else class="image-loader" /> -->
                </template>
            </BaseInteractiveCarousel>

            <BaseUiAction v-if="!isCarouselLoading" type="button" class="px-3 py-6 bg-black text-white rounded flex justify-center items-center" @click="carousel?.next()">›</BaseUiAction>
            </div>

            <BaseInteractiveModal v-model="imageModalOpen" :normal-modal="false" custom-modal="w-full h-full overflow-hidden top-0 left-0" :padding="4" @close="closeImageModal">
              <template #default>
                <div v-show="!modalImagesLoading" class="h-[90vh] mt-2">
                  <h2 class="text-xl sm:text-2xl font-bold text-brand-primary absolute top-4 sm:left-1/2 sm:-translate-x-1/2 w-max">{{ modalHouseName }}</h2>
                  <span class="absolute bottom-6 left-6 sm:top-2 font-bold z-10 h-max">Image {{ currentImage }} of {{ totalImages }}</span>
                  <BaseInteractiveImageSlider v-model="modalImages" show-thumbnails show-dots :max-height="'90vh'" @images-loaded="imagesLoaded" @change="setCurrentPage" @initial-load="setImageTotal"/>
                </div>
                <div v-show="modalImagesLoading" class="flex justify-center items-center h-full">
                  <div class="image-loader" />
                </div>
              </template>
          </BaseInteractiveModal>
        </div>
  </section>
</template>

<script setup lang="ts">
import type { BaseInteractiveCarousel } from '../../../.nuxt/components.js';
import rawHouses from '@/data/houses.json'

type Slide = { url: string; w?: number; h?: number; alt?: string }

type House = {
  id: string
  mainImage: string | string[];
  mainAlt: string;
  name: string
  address: string
  additional?: string
  mapsURL: string
}

const originalHouses: House[] = rawHouses

const modalImages = ref<Slide[]>([]);
const modalHouseName = ref<string>('');
const currentImage = ref<number>(1)
const totalImages = ref<number>()
const modalImagesLoading = ref<boolean>(false);
const imageModalOpen = ref<boolean>(false);

const openImageModal = async (houseId: string) => { 
  modalImagesLoading.value = true
  const currentHouse = houses.value.find((house) => house.id === houseId);
  try {
    const response = await $fetch<{ success: boolean, data: { houseId: string, items: Slide[] } }>(`/api/houses/images/${houseId}?signed=true`, {
      baseURL: 'https://api.goldengatemanor.com',
      method: 'GET',
    })

    if(response.success) {
      modalImages.value = response.data.items;
      imageModalOpen.value = true;
      modalHouseName.value = currentHouse?.name || '';   
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
  modalHouseName.value = ''
  totalImages.value = undefined;
  currentImage.value = 1;
  nextTick(() => {
    modalImages.value = []
  })
}

const imagesLoaded = () => {
  console.log('Images loaded event fired!')
  modalImagesLoading.value = false;
}

const carousel = ref<InstanceType<typeof BaseInteractiveCarousel> | null>(null)

const isCarouselLoading = ref<boolean>(true);

useHead({
    bodyAttrs: {
        class: computed(() => (imageModalOpen.value) ? 'no-scroll' : '')
    }
})

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!]
  }
  return shuffled
}

const houses = ref<House[]>([])

onMounted(() => {
  houses.value = shuffleArray(originalHouses)
})
</script>
