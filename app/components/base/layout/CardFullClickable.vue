<template>
  <div class="shadow-primary rounded-lg overflow-hidden w-max">
      <NuxtLink :to :class="['block p-6 group h-full', width]">
          <div :class="['flex flex-col justify-between h-full']">
              <div class="flex flex-col items-center">
                  <NuxtImg v-if="src" :src :class="[imgSize]"/>
                  <BaseIcon v-if="iconName" :name="iconName" :size="iconSize" :color="accentColor" :hover-color="hoverColor ? hoverColor : 'group-hover:text-brand-primary'" custom-class="transition-colors duration-500 ease-in-out block" />
                  <slot />
              </div>
              <BaseUiAction v-if="cta" :to :href :variant :new-page :no-follow :size="ctaSize" :styling="ctaClass" :hover-group="true">{{ cta }}</BaseUiAction>
          </div>
      </NuxtLink>
  </div>
</template>

<script setup lang='ts'>
defineOptions({
  name: "BaseLayoutCard"
})

withDefaults(defineProps<{
  width: string;
  src?: string;
  iconName?: string;
  iconSize?: string;
  imgSize?: string;
  accentColor?: string;
  hoverColor?: string;
  hoverGroup?: boolean;
  cta?: string;
  ctaSize?: string;
  ctaClass?: string;
  href?: string;
  to: string;
  variant?: string;
  newPage?: boolean;
  noFollow?: boolean;
}>(), {
  accentColor: 'text-gray-500',
  hoverColor: undefined,
  iconName: undefined,
  iconSize: "size-4",
  imgSize: "w-full",
  hoverGroup: false,
  src: undefined,
  cta: undefined,
  ctaClass: undefined,
  ctaSize: undefined,
  href: undefined,
  variant: undefined,
  newPage: false,
  noFollow: false,
})

</script>

<style>

</style>