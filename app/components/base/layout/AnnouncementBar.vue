<template>
  <div v-if="showAnnouncementBar" class="h-24 w-full bg-brand-primary hidden sm:block px-4">
    <button class="group absolute top-1 right-1" @click="closeAnnouncementBar">
      <BaseIcon name="material-symbols:cancel" color="text-white" hover-color="group-hover:text-brand-secondary" size="size-4" />
    </button>

    <div v-for="announcement in announcements" :key="announcement.id" class="flex items-center justify-center h-full gap-2 text-red-500 text-sm">
      <BaseIcon :name="announcement.icon" size="size-4" color="text-white" custom-class="shrink-0" />
      <span class="font-bold whitespace-nowrap">{{  $t(`announcements.${announcement.id}.title`) }}</span>
      <span class="max-md:text-center">{{  $t(`announcements.${announcement.id}.content`) }}</span>
      <NuxtLink :to="$localePath(announcement.cta.url)" class="group font-semibold whitespace-nowrap text-brand-secondary hover:underline hover:text-white flex items-center gap-2">
        {{ $t(`announcements.${announcement.id}.cta`) }}
        <BaseIcon v-if="announcement.cta.icon" :name="announcement.cta.icon" color="text-brand-secondary" hover-color="group-hover:text-white" size="size-4"/>
      </NuxtLink>

    </div>

  </div>
</template>

<script lang="ts" setup>
import announcements from '@/data/announcements.json'

const showAnnouncementBar = ref(true)

const closeAnnouncementBar = () => {
  showAnnouncementBar.value = false
}

</script>

<style>

</style>