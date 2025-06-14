<template>
    <div class="sticky top-0 z-15">
        <nav v-if="staticData" class="main-nav max-sm:hidden text-white border-white/25 border-b shadow-primary" aria-label="Main Navigation">
            <ul class="grid grid-cols-8 h-[35px]">
                <li 
                    v-for="navLink in staticData.navLinks" :key="navLink.id" class="relative"
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
            class="sm:hidden sticky top-0 left-0 w-full bg-brand-background-header text-white flex items-center justify-between px-4 h-[50px] z-10">
            <div class="flex justify-between items-center">
                <NuxtLink to="/">
                    <NuxtImg 
                        src="/images/layout/logo.png" sizes="xs:300px" quality="60" alt="Golden Gate Manor Inc. Logo"
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
                    <div class="mb-4 border-b-2 border-b-slate-50 pb-4 max-w-[250px] aspect-[5/4]">
                        <NuxtLink 
                            to="/" class="font-bold text-brand-primary text-xl w-full"
                            @click="toggleDrawer">
                            <NuxtImg src="/images/layout/Full company GGM Logo.png" quality="1" width="250" format="webp" class="w-full h-full object-contain" />
                        </NuxtLink>
                        <button class="absolute top-3 right-3" @click="toggleDrawer">
                            <BaseIcon name="mdi:close" color="text-gray-400" hover-color="hover:text-brand-primary" />
                        </button>
                    </div>
                    <nav v-if="staticData" class="overflow-y-auto w-full flex flex-col items-center" aria-label="Mobile Navigation">
                        <ul class="flex flex-col items-center gap-3 w-full">
                            <li v-for="navLink in staticData.navLinks" :key="navLink.id" class="w-3/4">
                                <NuxtLink 
                                    v-if="!navLink.sublinks"
                                    :to="navLink.slug" class="text-brand-primary hover:text-brand-link-hover font-semibold text-center flex justify-center items-center w-full py-1"
                                    @click="toggleDrawer">
                                    {{ navLink.name }} 
                                </NuxtLink>
                                <button 
                                    v-if="navLink.sublinks" class="text-brand-primary group hover:text-brand-link-hover font-semibold text-center flex justify-center items-center w-full py-1"
                                    @click="toggleMobileSublinks(navLink.name, $event)"
                                    >
                                    {{ navLink.name }}
                                    <BaseIcon name="material-symbols:arrow-drop-down-rounded" class="pointer-events-none group-hover:text-brand-link-hover"/>
                                </button>
                                <ul v-if="navLink.sublinks" :class="['flex flex-col gap-2 w-full sublink-mobile-nav relative bg-gray-50']">
                                    <template v-for="(sublink, idx) in navLink.sublinks" :key="sublink.id">
                                        <li v-if="idx === 0" class="before:top-0 before:absolute before:w-full before:h-[2px] before:bg-gray-200">
                                            <NuxtLink :to="navLink.slug" class="text-brand-primary hover:text-brand-link-hover font-semibold text-center flex justify-center items-center py-2" @click="toggleDrawer">{{ navLink.name }}</NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink :to="sublink.slug" class="text-brand-primary hover:text-brand-link-hover font-semibold text-center flex justify-center items-center py-2" @click="toggleDrawer">{{ sublink.name }}</NuxtLink>
                                        </li>
                                    </template>
                                </ul>
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

const toggleMobileSublinks = (name: string, event: MouseEvent) => {
    activeSublink.value = name;
    const button = event.target as HTMLElement;
    button.nextElementSibling?.classList.toggle('active')
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

.sublink-mobile-nav {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
}

.sublink-mobile-nav.active {
    max-height: 1000px;
}
</style>