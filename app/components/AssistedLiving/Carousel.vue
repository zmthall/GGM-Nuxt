<!-- components/BaseCarousel.vue -->
<template>
  <section>
    <h2 class="text-2xl text-center font-bold text-brand-primary mb-8">Assisted Living Houses</h2>
        <div class="relative">
            <div class="flex items-center gap-3">
            <button v-if="!isCarouselLoading" class="px-3 py-1 bg-black text-white rounded" @click="carousel?.prev()">‹</button>

            <BaseInteractiveCarousel ref="carousel" v-model:loading="isCarouselLoading" :items="houses" :gap="32" :height="350" item-key="id">
                <template #item="{ item }">
                    <div class="h-full bg-zinc-200/80 relative overflow-hidden rounded-lg group">
                        <div v-if="Array.isArray((item as House).mainImage)" class="flex flex-wrap w-full h-full absolute">
                          <NuxtImg v-for="image in (item as House).mainImage" :key="image" :src="image" class="object-cover w-1/2 h-1/2" height="350" width="350" :alt="(item as House).mainAlt" :title="(item as House).mainAlt" loading="eager" />
                        </div>
                        <NuxtImg v-else :src="(item as House).mainImage as string" class="w-full h-full absolute object-cover" height="350" width="350" :alt="(item as House).mainAlt" :title="(item as House).mainAlt" loading="eager" />
                        <div class="absolute left-0 top-0 flex flex-col items-center w-full bg-black/50 py-4 overflow-hidden">
                            <h2 class="text-white font-bold">{{ (item as House).name }}</h2>
                            <p class="text-white font-bold max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100 transition-all ease-in-out duration-500">{{ (item as House).address }}</p>
                            <p v-if="(item as House).additional" class="text-white font-bold max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100 transition-all ease-in-out duration-500">{{ (item as House).additional }}</p>
                        </div>
                        <div class="absolute left-0 bottom-4 flex justify-center w-full gap-4 opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500">
                          <button class="px-4 py-2 rounded-lg bg-black/50 text-white hover:bg-white/50 hover:text-black" @click.stop="openImageModal((item as House).id)" @touchstart.passive="() => {}">View More</button>
                          <a class="px-4 py-2 rounded-lg bg-black/50 text-white hover:bg-white/50 hover:text-black" :href="(item as House).mapsURL" target="_blank" rel="noreferrer nofollow noopener" title="Opens in new tab">Directions</a>
                        </div>
                    </div>
                    <!-- <div v-else class="image-loader" /> -->
                </template>
            </BaseInteractiveCarousel>

            <button v-if="!isCarouselLoading" class="px-3 py-1 bg-black text-white rounded" @click="carousel?.next()">›</button>
            </div>

            <BaseInteractiveModal v-model="imageModalOpen" :normal-modal="false" custom-modal="w-full h-full overflow-hidden" :padding="4" @close="closeImageModal">
              <template #default>
                  <div v-show="!modalImagesLoading" class="h-[90vh] mt-2">
                      <BaseInteractiveImageSlider v-model="modalImages" show-thumbnails show-dots :max-height="'90vh'" @images-loaded="imagesLoaded"/>
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

const houses: House[] = [ 
  { id: "ghorizon", mainImage: ['/images/carousel-images/front-horizon-edited_600.jpg', '/images/carousel-images/Backyard-horizon_600.jpg', '/images/carousel-images/side-horizon_600.jpg', '/images/carousel-images/backyard-seating-horizon_600.jpg', ''], mainAlt: 'House image of Golden Horizon', name: "Golden Horizon", address: "2109 Chautard Drive Pueblo, CO 81005", additional: "", mapsURL: "https://www.google.com/maps/place/2109+Chautard+Dr,+Pueblo,+CO+81005/", },
  { id: "ggmi", mainImage: '/images/carousel-images/golden-gate-manor-i-house-outside_600.jpg', mainAlt: 'House image of Golden Manor I', name: "Golden Gate Manor I", address: "606 West Abriendo Ave. Pueblo, CO 81004", additional: "", mapsURL: "https://www.google.com/maps/place/606+W+Abriendo+Ave,+Pueblo,+CO+81004/", }, 
  { id: "gview", mainImage: '/images/carousel-images/golden-view-house-outside_600.jpg', mainAlt: 'House image of Golden View', name: "Golden View", address: "525 West 9th Street Pueblo, CO 81003", additional: "*Handicap accessible facility", mapsURL: "https://www.google.com/maps/place/525+W+9th+St,+Pueblo,+CO+81003/", }, 
  { id: "gvalley", mainImage: '/images/carousel-images/golden-valley-house-outside_600.jpg', mainAlt: 'House image of Golden Valley', name: "Golden Valley", address: "1033 East Evans Pueblo, CO 81004", additional: "*Offering private bedrooms & bathrooms", mapsURL: "https://www.google.com/maps/place/1033+E+Evans+Ave,+Pueblo,+CO+81004/", }, 
  { id: "ggmii", mainImage: '/images/carousel-images/golden-gate-manor-ii-house-outside_600.jpg', mainAlt: 'House image of Golden Manor II', name: "Golden Gate Manor II", address: "1219 Lake Ave Pueblo, CO 81004", additional: "", mapsURL: "https://www.google.com/maps/place/1219+Lake+Ave,+Pueblo,+CO+81004/", }, 
]

const modalImages = ref<Slide[]>();
const modalImagesLoading = ref<boolean>(true)
const imageModalOpen = ref<boolean>(false)

const openImageModal = async (houseId: string) => { 
  modalImagesLoading.value = true
  try {
    const response = await $fetch<{ success: boolean, data: { houseId: string, items: Slide[] } }>(`/api/houses/images/${houseId}?signed=true`, {
      baseURL: 'https://api.goldengatemanor.com',
      method: 'GET',
    })

    alert('Fetch completed') // Will this show?
    alert(JSON.stringify(response))

    if(response.success) {
      modalImages.value = response.data.items;
      imageModalOpen.value = true;
    }
  } catch (error) {
    console.error((error as Error).message)
    alert((error as Error).message)
  }
}

const closeImageModal = () => {
  imageModalOpen.value = false;
  modalImages.value = []
}

const imagesLoaded = () => {
  modalImagesLoading.value = false;
}

const carousel = ref<InstanceType<typeof BaseInteractiveCarousel> | null>(null)

const isCarouselLoading = ref<boolean>(true);

useHead({
    bodyAttrs: {
        class: computed(() => (imageModalOpen.value) ? 'no-scroll' : '')
    }
})
</script>
