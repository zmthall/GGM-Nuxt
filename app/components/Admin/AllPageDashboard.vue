<template>
  <ClientOnly>
    <div v-if="authStore.authorized" :class="['fixed bottom-0 left-0 z-15 bg-zinc-100/20 rounded-tr-lg overflow-hidden w-[150px] admin-container', { 'container-shifted': adminNavShown }]">
      <button :class="['flex group hover:bg-brand-primary fixed transition-transform duration-500 ease-in-out', { 'button-shifted rounded-bl-lg': adminNavShown, 'bg-zinc-100/20 rounded-tr-lg bottom-0 left-0': !adminNavShown }]" @click="toggleAdminNav">
        <BaseIcon name="mdi:pan-top-right" size="size-5" hover-color="group-hover:text-brand-secondary"/>
      </button>

      <Transition name="admin-nav">
        <nav v-if="adminNavShown" class="fixed bottom-0 left-0">
          <NuxtLink v-if="isAdminLayout" to="/" class="w-[150px] flex justify-center text-brand-primary hover:underline">Home Website</NuxtLink>
          <NuxtLink v-else to="/admin" class="w-[150px] flex justify-center text-brand-primary hover:underline">Admin Dashboard</NuxtLink>
        </nav>
      </Transition>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
const authStore = useAuthStore();
const route = useRoute()

const isAdminLayout = computed(() => route.meta.layout === 'admin')

const adminNavShown = ref<boolean>(false);

const toggleAdminNav = () => {
  adminNavShown.value = !adminNavShown.value
}
</script>

<style scoped>
.admin-nav-enter-active,
.admin-nav-leave-active {
  transition: all 0.3s ease-in-out;
}

.admin-nav-enter-from {
  transform: translate(-100%, 100%);
  opacity: 0;
}

.admin-nav-leave-to {
  transform: translate(-100%, 100%);
  opacity: 0;
}

.admin-nav-enter-to,
.admin-nav-leave-from {
  transform: translate(0, 0);
  opacity: 1;
}

.button-shifted {
  transform: translateX(calc(150px - 100%)) rotate(180deg);
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.admin-container {
  height: 0; /* Start completely collapsed */
  transition: height 0.25s ease-in-out;
}

.container-shifted {
  height: 44px; /* Expand to full height */
}
</style>