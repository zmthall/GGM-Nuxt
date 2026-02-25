
<template>
    <div v-if="authStore.authorized && $route.path !== '/admin/login'" class="h-16 bg-brand-primary sticky top-0 px-4 shadow-primary z-15">
      <nav class="w-full h-full flex items-center justify-between" aria-label="Main dashboard navigation toggling">
        <button>
          <BaseIcon name="charm:menu-hamburger" color="text-white" hover-color="hover:text-zinc-500" @click="toggleDashboardDrawer"/>
        </button>
        <div class="flex gap-2">
          <AdminRebuildButton v-if="authStore.role === 'admin'" />
          <BaseUiAction type="button" variant="secondary" class="text-white border-2 border-brand-secondary rounded-xl p-2 hover:text-brand-primary hover:bg-brand-secondary" @click="logoutUser">
            Logout
          </BaseUiAction>
        </div>
      </nav>
      <Teleport to="body">
        <Transition name="dashboard-backdrop">
          <div 
            v-if="dashboardDrawerOpen" class="fixed w-full h-full bg-black/50 top-0 left-0 z-15"
            @click.self="toggleDashboardDrawer" />
        </Transition>
  
        <Transition name="dashboard-drawer">
          <div v-if="dashboardDrawerOpen" class="fixed top-0 left-0 w-full xs:w-80 h-full bg-brand-primary shadow-primary z-16">
            <button class="absolute top-3 right-3 flex" @click="toggleDashboardDrawer">
                <BaseIcon name="mdi:close" color="text-white" hover-color="hover:text-brand-secondary" />
            </button>
            <NuxtLink to="/" class="flex items-center text-white hover:text-brand-secondary group absolute top-3 left-3 no-active"><BaseIcon name="mdi:arrow-top-left-bold-box-outline" color="text-white" hover-color="group-hover:text-brand-secondary"/> Main Website</NuxtLink>
  
            <NuxtLink to="/admin" class="no-active">
              <h2 class="text-4xl text-center my-14 text-brand-secondary">GGM Admin</h2>
            </NuxtLink>
            <nav class="space-y-4 overflow-y-auto h-full border-t-2 border-t-brand-secondary/20" aria-label="Dashboard navigation">
              <div class="mt-4">
                <h3 class="text-white font-bold text-xl pl-4">Overview</h3>
                <ul>
                  <li>
                    <NuxtLink to="/admin" class="text-white flex items-center gap-4 hover:bg-brand-secondary/20 py-2 px-4" @click="toggleDashboardDrawer"><BaseIcon name="mage:dashboard-4-fill" color="text-white" />Dashboard Home</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/admin/account" class="text-white flex items-center gap-4 hover:bg-brand-secondary/20 py-2 px-4" @click="toggleDashboardDrawer"><BaseIcon name="material-symbols:account-circle" color="text-white" />My Account</NuxtLink>
                  </li>
                </ul>
              </div>
              <div>
                <h3 class="text-white font-bold text-xl pl-4">Tools</h3>
                <ul>
                  <li v-for="link in adminLinks" :key="link.id">
                    <NuxtLink v-if="link.role.includes(authStore.role as string)" :to="link.slug" class="text-white flex items-center gap-4 hover:bg-brand-secondary/20 py-2 px-4" @click="toggleDashboardDrawer"><BaseIcon :name="link.icon" color="text-white" />{{ link.name }}</NuxtLink>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </Transition>
      </Teleport>
    </div>
</template>

<script lang="ts" setup>
import adminLinks from '@/data/adminLinks.json'

const dashboardDrawerOpen = ref<boolean>(false);

const firebaseAuth = useFirebaseAuth()

const logoutUser = async () => {
  await firebaseAuth?.logoutUser()
}

const toggleDashboardDrawer = () => {
  dashboardDrawerOpen.value = !dashboardDrawerOpen.value;
}

const authStore = useAuthStore();

onMounted(() => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dashboardDrawerOpen.value) {
      toggleDashboardDrawer()
    }
  })
})
</script>

<style scoped>
.dashboard-backdrop-enter-active,
.dashboard-backdrop-leave-active {
    transition: opacity 0.4s ease-in-out;
}

.dashboard-backdrop-enter-from,
.dashboard-backdrop-leave-to {
    opacity: 0;
}

.dashboard-drawer-enter-active,
.dashboard-drawer-leave-active {
    transition: transform 0.4s ease-in-out;
}

.dashboard-drawer-enter-from,
.dashboard-drawer-leave-to {
    transform: translateX(-100%);
}

.router-link-active:not(.no-active) {
  @apply bg-brand-secondary/10 relative after:absolute after:right-0 after:w-2 after:h-full after:bg-brand-secondary after:rounded-l-lg
}

</style>