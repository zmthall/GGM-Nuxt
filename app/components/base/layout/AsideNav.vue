<template>
  <aside class="mx-2 mb-4 xs:mx-auto md:mx-0 md:mb-0">
    <ul class="shadow-primary border border-black rounded-md overflow-hidden">
      <li v-for="navItem in navigationItems" :key="navItem.id" class="">
        <button :class="[{'bg-brand-primary text-white': navItem.active, 'hover:bg-brand-secondary': !navItem.active}, 'w-full h-full py-2']" @click="updateNav(navItem.id)">
          {{ navItem.name }}
        </button>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import type { NavigationItems } from '../../../models/AsideNav.js';

defineProps<{
  navigationItems: NavigationItems;
}>()

const updateNav = (id: string) => {
  emit('update-nav', id);
}

const emit = defineEmits({
  'update-nav': (id: string) => typeof id === 'string'
})
</script>

<style>

</style>