<template>
    <div class="sticky top-0 z-10">
        <nav class="main-nav max-sm:hidden text-white border-white/25 border-b shadow-primary">
            <ul class="grid grid-cols-8 h-[35px]">
                <li 
                    v-for="navLink in staticData.navLinks" :key="navLink.name" class="relative"
                    @mouseenter="toggleSublinks(navLink.name)" @mouseleave="toggleSublinks(null)"
                    @focusin="toggleSublinks(navLink.name)" @focusout="toggleSublinks(null)">
                    <NuxtLink 
                        :to="navLink.slug"
                        class="w-full h-full text-center flex items-center justify-center font-bold responsive-text bg-brand-primary whitespace-nowrap uppercase px-2 hover:bg-brand-secondary hover:text-brand-primary transition-colors duration-500 ease-in-out">
                        {{ navLink.name }}</NuxtLink>
                    <ul 
                        v-if="navLink.sublinks"
                        :class="['absolute bg-white text-brand-primary font-bold w-full text-center rounded-b-md overflow-hidden sublink-nav', { 'active': isSublinkActive(navLink.name) }]">
                        <li v-for="sublink in navLink.sublinks" :key="sublink.id">
                            <NuxtLink
                                :to="sublink.slug"
                                class="w-full h-full block hover:bg-brand-secondary py-2 responsive-text"
                            >
                                {{ sublink.name }}
                            </NuxtLink>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
        <header
            class="sm:hidden sticky top-0 left-0 w-full bg-brand-background-header text-white flex items-center justify-between px-4 h-[50px]">
            <div class="flex justify-between items-center">
                <NuxtLink to="/">
                    <NuxtImg 
                        src="/images/layout/logo.png" sizes="xs:300px" alt="Golden Gate Manor Inc. Logo"
                        format="webp" class="max-xs:w-[225px] xs:w-[300px]" />
                </NuxtLink>
            </div>
            <button class="flex" @click="toggleDrawer">
                <BaseIcon name="charm:menu-hamburger" color="text-gray-500" hover-color="hover:text-brand-primary" />
            </button>
        </header>
        <Teleport to="body">
            <Transition name="mobile-nav">
                <div 
                    v-if="mobileNavDrawerOpen" class="fixed inset-0 bg-black/50 sm:hidden z-20"
                    @click.self="toggleDrawer" />
            </Transition>
        </Teleport>
        <Teleport to="body">
            <Transition name="mobile-nav">
                <aside 
                    v-if="mobileNavDrawerOpen"
                    class="fixed top-0 right-0 h-full w-[80%] max-w-sm flex flex-col items-center bg-white z-20 shadow-md px-4 py-8 sm:hidden">
                    <div class="mb-4 border-b-2 border-b-slate-50 pb-4">
                        <NuxtLink 
                            to="/" class="font-bold text-brand-primary text-xl"
                            @click="toggleDrawer">
                            <NuxtImg src="/images/layout/Full company GGM Logo.png" sizes="sm:250px" format="webp" />
                        </NuxtLink>
                        <button class="absolute top-3 right-3" @click="toggleDrawer">
                            <BaseIcon name="mdi:close" color="text-gray-400" hover-color="hover:text-brand-primary" />
                        </button>
                    </div>
                    <nav class="overflow-y-auto w-full">
                        <ul class="flex flex-col w-max mx-auto gap-3">
                            <li v-for="navLink in staticData.navLinks" :key="navLink.name">
                                <NuxtLink 
                                    :to="navLink.slug" class="text-brand-primary font-semibold text-center flex justify-center items-center"
                                    @click="toggleDrawer">
                                    {{ navLink.name }} 
                                    <BaseIcon  v-if="navLink.sublinks" name="material-symbols:arrow-drop-down-rounded"/>
                                </NuxtLink>
                            </li>
                        </ul>
                    </nav>
                </aside>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup lang='ts'>
defineOptions({
    name: "BaseLayoutNavigation"
})

const staticData = useStaticData();
const mobileNavDrawerOpen = ref<boolean>(false)
const activeSublink = ref<string | null>(null)

const toggleDrawer = () => {
    mobileNavDrawerOpen.value = !mobileNavDrawerOpen.value
    document.body.classList.toggle('no-scroll')
    if(document.documentElement.classList.contains('no-scroll'))
        document.documentElement.classList.toggle('no-scroll') 
}

const toggleSublinks = (name: string | null) => {
    activeSublink.value = name
}

const isSublinkActive = (name: string | null) => {
    if (name === null) return false
    return name === activeSublink.value
}

</script>

<style scoped>
.responsive-text {
    font-size: calc(.8333333vw + 2.66667px)
}

.mobile-nav-enter-active,
.mobile-nav-leave-active {
    transition: opacity 0.4s ease-in-out;
}

.mobile-nav-enter-from,
.mobile-nav-leave-to {
    opacity: 0;
}

.sublink-nav {
    border: none;
    box-shadow: 0 5px 5px 1px rgba(0, 0, 0, .1);
    position: absolute;
    left: 50%;
    translate: -50%;
    max-height: 0;
    overflow: hidden;
    -webkit-transform: perspective(400) rotate3d(1, 0, 0, -90deg);
    -webkit-transform-origin: 50% 0;
    transform: perspective(400) rotate3d(1, 0, 0, -90deg);
    transform-origin: 50% 0;
    -webkit-transition: 350ms;
    -moz-transition: 350ms;
    -o-transition: 350ms;
    transition: 350ms;
}

.sublink-nav.active {
    max-height: 1000px;
    -webkit-transform: perspective(400) rotate3d(0, 0, 0, 0);
    transform: rotate3d(0, 0, 0, 0);
}
</style>