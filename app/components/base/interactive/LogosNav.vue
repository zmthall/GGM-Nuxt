<template>
  <!-- Our Logos and pagelinking -->
  <BaseLayoutPageCTA :has-title="false" :has-button="false">
      <nav class="flex justify-center items-center gap-16">
          <BaseUiAction v-if="!isCarouselLoading && (carousel?.showControls ?? false)" type="button" variant="blank" class="w-8 h-8 bg-black/20 hover:bg-white/20 transition-colors ease-in-out duration-500 text-white rounded-full" styling="flex justify-center items-center" @click="carousel?.prev()">
              <BaseIcon name="line-md:chevron-small-left" />
          </BaseUiAction>
          <BaseInteractiveCarousel ref="carousel" v-model:loading="isCarouselLoading" :items="logos" :gap="16" :height="250" :max-visible="5" :min-item-width="135" item-key="id">
              <template #item="{ item }">
                  <BaseLayoutPageLogoLink :to="(item as logoItem).to" :image-src="(item as logoItem).imageSrc" :image-alt="(item as logoItem).alt" :label="(item as logoItem).label"/>
              </template>
          </BaseInteractiveCarousel>
          <BaseUiAction v-if="!isCarouselLoading && (carousel?.showControls ?? false)" type="button" variant="blank" class="w-8 h-8 bg-black/20 hover:bg-white/20 transition-colors ease-in-out duration-500 text-white rounded-full" styling="flex justify-center items-center" @click="carousel?.next()">
              <BaseIcon name="line-md:chevron-small-right" />
          </BaseUiAction>
      </nav>
  </BaseLayoutPageCTA>
</template>

<script lang="ts" setup>
import type { BaseInteractiveCarousel } from '../../../../.nuxt/components.js';

const isCarouselLoading = ref<boolean>(true)

const logos = [
    { to: '/assisted-living', imageSrc: '/images/logos/assisted-living.png', alt: 'Golden Gate Manor Inc. Assisted Living logo', label: 'Navigate to Assisted Living Page' },
    { to: '/non-medical', imageSrc: '/images/logos/city-cab.png', alt: 'Golden Gate Manor Inc. City Cab logo', label: 'Navigate to Non-Medical Transportation Page' },
    { to: '/nemt', imageSrc: '/images/logos/nemt.png', alt: 'Golden Gate Manor Inc. NEMT logo', label: 'Navigate to NEMT Page' },
    { to: '/medical-supplies', imageSrc: '/images/logos/medical-supply.png', alt: 'Golden Gate Manor Inc. Medical Supply logo', label: 'Navigate to Medical Supply Page' },
    { to: '/gas-and-goods', imageSrc: '/images/logos/gas-station.png', alt: 'Golden Gate Manor Inc. Gas and Goods logo', label: 'Navigate to Gas and Goods Page' },
];

type logoItem = {
    to: string;
    imageSrc: string;
    alt: string;
    label: string;
}

const carousel = ref<InstanceType<typeof BaseInteractiveCarousel> | null>(null)

</script>

<style>

</style>