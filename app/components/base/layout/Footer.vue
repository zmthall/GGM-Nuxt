<template>
    <footer class="flex flex-col z-6 relative">
        <!-- Top Information Header -->
        <div class="bg-brand-primary text-white px-6 py-10 grid grid-cols-1 gap-12 grid-flow-row md:grid-cols-2 2xl:grid-cols-4">
            <!-- Mission statement and social branding -->
            <div>
                <h2 class="flex flex-col text-brand-secondary font-bold capitalize text-xl">
                    <span class="border-b border-b-brand-secondary inline-block pb-1 mb-2">Golden Gate Manor Inc:</span>
                    <span>{{ $t('company.slogan') }}</span>
                </h2>
                <p>{{ $t('company.mission-statement[0]') }}</p>
                <p>{{ $t('company.mission-statement[1]') }}</p>
                <p>{{ $t('footer.social') }}</p>
                <div v-if="socialHandles" class="flex gap-2">
                    <nav aria-label="social media handle navigation">
                        <ul class="flex gap-2">
                            <li v-for="socialHandle in activeSocialHandels" :key="socialHandle.id">
                                <a :href="socialHandle.url" rel="noopener noreferrer" target="_blank">
                                    <BaseIcon :name="socialHandle.icon" color="text-brand-white" hover-color="hover:text-brand-secondary" />
                                    <span class="sr-only">{{ socialHandle.alt }}</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <!-- Location information -->
            <div>
                <h2
                    class="flex flex-col text-brand-secondary font-bold border-b border-b-brand-secondary pb-1 mb-2 text-xl">
                    {{ $t('footer.locations.title') }}
                </h2>
                <ul class="flex flex-col gap-4">
                    <li class="flex flex-col">
                        <h3 class="font-bold underline">{{ $t('footer.locations.admin') }}</h3>
                        <a href="https://www.google.com/maps/search/?api=1&query=612+S+Union+Ave,+Pueblo,+CO+81004" class="group hover:text-brand-secondary" target="_blank" rel="noopener noreferrer">
                            <BaseIcon 
                                name="material-symbols:location-on" color="text-brand-white" size="size-4"
                                hover-color="group-hover:text-brand-secondary" /> 612 S. Union Ave., Pueblo CO, 81004
                        </a>
                        <a href="tel:719-696-8032" class="group hover:text-brand-secondary">
                            <BaseIcon 
                                name="ic:round-call" color="text-brand-white" size="4"
                                hover-color="group-hover:text-brand-secondary" /> (719) 696-8032
                        </a>
                    </li>
                    <li class="flex flex-col">
                        <h3 class="font-bold underline">{{ $t('footer.locations.transportation.title') }}</h3>
                        <ul>
                            <li class="flex flex-col">
                                <h3 class="font-bold">{{ $t('footer.locations.transportation.front') }}</h3>
                                <a href="https://www.google.com/maps/search/?api=1&query=648+S+Union+Ave,+Pueblo,+CO+81004" class="group hover:text-brand-secondary" target="_blank" rel="noopener noreferrer">
                                    <BaseIcon 
                                        name="material-symbols:location-on" color="text-brand-white" size="size-4"
                                        hover-color="group-hover:text-brand-secondary" /> 648 S. Union Ave., Pueblo CO,
                                    81004
                                </a>
                                <CallRailLink
                                    tel="719-544-3231"
                                    display="(719) 544-3231"
                                    cls="group inline-flex items-center gap-2 hover:text-brand-secondary"
                                    aria-label="Call front office (719) 544-3231"
                                    >
                                    <template #default="{ display }">
                                        <BaseIcon
                                        name="ic:round-call"
                                        color="text-brand-white"
                                        size="4"
                                        hover-color="group-hover:text-brand-secondary"
                                        />
                                        <span>{{ display }}</span>
                                    </template>
                                </CallRailLink>
                            </li>
                            <li class="flex flex-col">
                                <h3 class="font-bold">{{ $t('footer.locations.transportation.dispatch') }}</h3>
                                <a href="https://www.google.com/maps/search/?api=1&query=648+S+Union+Ave,+Pueblo,+CO+81004" class="group hover:text-brand-secondary" target="_blank" rel="noopener noreferrer">
                                    <BaseIcon 
                                        name="material-symbols:location-on" color="text-brand-white" size="size-4"
                                        hover-color="group-hover:text-brand-secondary" /> 648 S. Union Ave., Pueblo CO,
                                    81004
                                </a>
                                <CallRailLink
                                    tel="719-543-2525"
                                    display="(719) 543-2525"
                                    cls="group hover:text-brand-secondary"
                                    aria-label="Call front office (719) 543-2525"
                                >
                                    <template #default="{ display }">
                                        <BaseIcon
                                            name="ic:round-call"
                                            color="text-brand-white"
                                            size="4"
                                            hover-color="group-hover:text-brand-secondary"
                                        />
                                        <span>{{ display }}</span>
                                    </template>
                                </CallRailLink>
                            </li>
                        </ul>
                    </li>
                    <li class="flex flex-col">
                        <h3 class="font-bold underline flex items-center">{{ $t('footer.locations.assisted-living') }}</h3>
                        <h4 class="font-bold">{{ $t('footer.locations.main') }}</h4>
                        <a href="https://www.google.com/maps/search/?api=1&query=612+S+Union+Ave,+Pueblo,+CO+81004" class="group hover:text-brand-secondary" target="_blank" rel="noopener noreferrer">
                            <BaseIcon 
                                name="material-symbols:location-on" color="text-brand-white" size="size-4"
                                hover-color="group-hover:text-brand-secondary" /> 612 S. Union Ave., Pueblo CO, 81004
                        </a>
                        <a href="tel:719-924-9932" class="group hover:text-brand-secondary">
                            <BaseIcon 
                                name="ic:round-call" color="text-brand-white" size="4"
                                hover-color="group-hover:text-brand-secondary" /> (719) 924-9932
                        </a>
                        <button
                            class="items-center border-2 border-brand-white flex w-max p-1 mt-1 hover:bg-brand-secondary hover:text-brand-primary transition-colors duration-300 ease-in-out rounded-md"
                            @click="toggleViewMore(0)">
                            <span v-if="!viewMore[0]">{{ $t('footer.locations.button[0]') }}</span>
                            <span v-else>{{ $t('footer.locations.button[1]') }}</span>
                            <BaseIcon v-if="!viewMore[0]" name="ic:sharp-arrow-drop-down" color="text-brand-white" size="size-4" />
                            <BaseIcon v-else name="ic:sharp-arrow-drop-up" color="text-brand-white" size="size-4" />
                        </button>
                        <ul v-if="viewMore[0]" class="mt-3 pt-1 border-t border-t-brand-secondary/50">
                            <li class="flex flex-col">
                                <h4 class="font-bold">Golden Gate Manor I</h4>
                                <a href="https://www.google.com/maps/search/?api=1&query=606+W.+Abriendo+Ave.%2C+Pueblo%2C+CO+81004" class="group hover:text-brand-secondary" target="_blank" rel="noopener noreferrer">
                                    <BaseIcon 
                                        name="material-symbols:location-on" color="text-brand-white" size="size-4"
                                        hover-color="group-hover:text-brand-secondary" /> 606 W. Abriendo Ave., Pueblo CO,
                                    81004
                                </a>
                                <a href="tel:719-583-9132" class="group hover:text-brand-secondary">
                                    <BaseIcon 
                                        name="ic:round-call" color="text-brand-white" size="4"
                                        hover-color="group-hover:text-brand-secondary" /> (719) 583-9132
                                </a>
                            </li>
                            <li class="flex flex-col">
                                <h4 class="font-bold">Golden Gate Manor II</h4>
                                <a href="https://www.google.com/maps/search/?api=1&query=1219+Lake+Ave.%2C+Pueblo%2C+CO+81004" class="group hover:text-brand-secondary" target="_blank" rel="noopener noreferrer">
                                    <BaseIcon 
                                        name="material-symbols:location-on" color="text-brand-white" size="size-4"
                                        hover-color="group-hover:text-brand-secondary" /> 1219 Lake Ave., Pueblo CO, 81004
                                </a>
                                <a href="tel:719-542-0201" class="group hover:text-brand-secondary">
                                    <BaseIcon 
                                        name="ic:round-call" color="text-brand-white" size="4"
                                        hover-color="group-hover:text-brand-secondary" /> (719) 542-0201
                                </a>
                            </li>
                            <li class="flex flex-col">
                                <h4 class="font-bold">Golden Valley</h4>
                                <a href="https://www.google.com/maps/search/?api=1&query=1033+E.+Evans+Ave.%2C+Pueblo%2C+CO+81004" class="group hover:text-brand-secondary" target="_blank" rel="noopener noreferrer">
                                    <BaseIcon 
                                        name="material-symbols:location-on" color="text-brand-white" size="size-4"
                                        hover-color="group-hover:text-brand-secondary" /> 1033 E. Evans Ave., Pueblo CO,
                                    81004
                                </a>
                                <a href="tel:719-545-0152" class="group hover:text-brand-secondary">
                                    <BaseIcon 
                                        name="ic:round-call" color="text-brand-white" size="4"
                                        hover-color="group-hover:text-brand-secondary" /> (719) 545-0152
                                </a>
                            </li>
                            <li class="flex flex-col">
                                <h4 class="font-bold">Golden Horizon</h4>
                                <a href="https://www.google.com/maps/search/?api=1&query=2109+Chautard+Dr.%2C+Pueblo%2C+CO+81005" class="group hover:text-brand-secondary" target="_blank" rel="noopener noreferrer">
                                    <BaseIcon 
                                        name="material-symbols:location-on" color="text-brand-white" size="size-4"
                                        hover-color="group-hover:text-brand-secondary" /> 2109 Chautard Dr., Pueblo CO,
                                    81005
                                </a>
                                <a href="tel:719-564-8110" class="group hover:text-brand-secondary">
                                    <BaseIcon 
                                        name="ic:round-call" color="text-brand-white" size="4"
                                        hover-color="group-hover:text-brand-secondary" /> (719) 564-8110
                                </a>
                            </li>
                            <li class="flex flex-col">
                                <h4 class="font-bold">Golden View</h4>
                                <a href="https://www.google.com/maps/search/?api=1&query=525+W.+9th+St.%2C+Pueblo%2C+CO+81003" class="group hover:text-brand-secondary" target="_blank" rel="noopener noreferrer">
                                    <BaseIcon 
                                        name="material-symbols:location-on" color="text-brand-white" size="size-4"
                                        hover-color="group-hover:text-brand-secondary" /> 525 W. 9th St., Pueblo CO, 81003
                                </a>
                                <a href="tel:719-543-7320" class="group hover:text-brand-secondary">
                                    <BaseIcon 
                                        name="ic:round-call" color="text-brand-white" size="4"
                                        hover-color="group-hover:text-brand-secondary" /> (719) 543-7320
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="flex flex-col">
                        <h3 class="font-bold underline">{{ $t('footer.locations.medical-supply') }}</h3>
                        <a href="https://www.google.com/maps/search/?api=1&query=612+S+Union+Ave,+Pueblo,+CO+81004" class="group hover:text-brand-secondary" target="_blank" rel="noopener noreferrer">
                            <BaseIcon 
                                name="material-symbols:location-on" color="text-brand-white" size="size-4"
                                hover-color="group-hover:text-brand-secondary" /> 612 S. Union Ave., Pueblo CO, 81004
                        </a>
                        <CallRailLink
                            tel="719-569-7361"
                            display="(719) 569-7361"
                            cls="group hover:text-brand-secondary"
                            aria-label="Call front office (719) 569-7361"
                        >
                            <template #default="{ display }">
                                <BaseIcon
                                    name="ic:round-call"
                                    color="text-brand-white"
                                    size="4"
                                    hover-color="group-hover:text-brand-secondary"
                                />
                                <span>{{ display }}</span>
                            </template>
                        </CallRailLink>
                    </li>
                    <li class="flex flex-col">
                        <h3 class="font-bold underline">{{ $t('footer.locations.gas-and-goods') }}</h3>
                        <h4 class="font-bold">{{ $t('footer.locations.main') }}</h4>
                        <a href="https://www.google.com/maps/search/?api=1&query=1242+S+Prairie+Ave,+Pueblo,+CO+81005" class="group hover:text-brand-secondary" target="_blank" rel="noopener noreferrer">
                            <BaseIcon 
                                name="material-symbols:location-on" color="text-brand-white" size="size-4"
                                hover-color="group-hover:text-brand-secondary" /> 1242 S. Prairie Ave., Pueblo CO, 81005
                        </a>
                        <a href="tel:719-561-0062" class="group hover:text-brand-secondary">
                            <BaseIcon 
                                name="ic:round-call" color="text-brand-white" size="4"
                                hover-color="group-hover:text-brand-secondary" /> (719) 561-0062
                        </a>
                        <button
                            class="items-center border-2 border-brand-white flex w-max p-1 mt-1 hover:bg-brand-secondary hover:text-brand-primary transition-colors duration-300 ease-in-out rounded-md"
                            @click="toggleViewMore(1)">
                            <span v-if="!viewMore[1]">{{ $t('footer.locations.button[0]') }}</span>
                            <span v-else>{{ $t('footer.locations.button[1]') }}</span>
                            <BaseIcon v-if="!viewMore[1]" name="ic:sharp-arrow-drop-down" color="text-brand-white" size="size-4" />
                            <BaseIcon v-else name="ic:sharp-arrow-drop-up" color="text-brand-white" size="size-4" />
                        </button>
                        <ul v-if="viewMore[1]" class="mt-3 pt-1 border-t border-t-brand-secondary/50">
                            <li class="flex flex-col">
                                <h4 class="font-bold">Golden Gate Gas & Goods I</h4>
                                <a href="https://www.google.com/maps/search/?api=1&query=1242+S+Prairie+Ave,+Pueblo,+CO+81005" class="group hover:text-brand-secondary" target="_blank" rel="noopener noreferrer">
                                    <BaseIcon 
                                        name="material-symbols:location-on" color="text-brand-white" size="size-4"
                                        hover-color="group-hover:text-brand-secondary" /> 1242 S. Prairie Ave., Pueblo CO,
                                    81005
                                </a>
                                <a href="tel:719-561-0062" class="group hover:text-brand-secondary">
                                    <BaseIcon 
                                        name="ic:round-call" color="text-brand-white" size="4"
                                        hover-color="group-hover:text-brand-secondary" /> (719) 561-0062
                                </a>
                            </li>
                            <li class="flex flex-col">
                                <h4 class="font-bold">Golden Gate Gas & Goods II</h4>
                                <a href="https://www.google.com/maps/search/?api=1&query=1103+N.+Elizabeth+St.%2C+Pueblo%2C+CO+81003" class="group hover:text-brand-secondary" target="_blank" rel="noopener noreferrer">
                                    <BaseIcon 
                                        name="material-symbols:location-on" color="text-brand-white" size="size-4"
                                        hover-color="group-hover:text-brand-secondary" /> 1103 N. Elizabeth St., Pueblo CO,
                                    81003
                                </a>
                                <a href="tel:719-253-9840" class="group hover:text-brand-secondary">
                                    <BaseIcon 
                                        name="ic:round-call" color="text-brand-white" size="4"
                                        hover-color="group-hover:text-brand-secondary" /> (719) 253-9840
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <!-- Quick Links -->
            <div>
                <h2
                    class="flex flex-col text-brand-secondary font-bold border-b border-b-brand-secondary pb-1 mb-2 text-xl">
                    {{ $t('footer.quick-links.title') }}
                </h2>
                <nav v-if="footer" aria-label="Footer Navigation/Business description">
                    <ul class="flex flex-col gap-4 font-semibold">
                        <li v-for="navLink in footer.navLinks" :key="navLink.id">
                            <NuxtLink 
                                v-if="!navLink.external && navLink.href" :to="navLink.href"
                                class="hover:text-brand-secondary hover:underline group flex items-center gap-2 w-max"><BaseIcon v-if="navLink.icon" :name="navLink.icon" color="text-brand-white" hover-color="group-hover:text-brand-secondary" />{{ $t(`footer.quick-links.${navLink.id}`) }}</NuxtLink>
                            <a 
                                v-if="navLink.external" :href="navLink.href" target="_blank" rel="noopener noreferrer" title="Opens in a new tab"
                                class="hover:text-brand-secondary hover:underline flex group items-center gap-2 w-max"><BaseIcon v-if="navLink.icon" :name="navLink.icon" color="text-brand-white" hover-color="group-hover:text-brand-secondary" />{{ $t(`footer.quick-links.${navLink.id}`) }}</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <!-- Office Hours -->
            <div>
                <div>
                    <h2
                        class="flex flex-col text-brand-secondary font-bold border-b border-b-brand-secondary pb-1 mb-2 text-xl">
                        {{ $t('footer.office-hours.title') }}
                    </h2>
                    <ul class="text-2xl mb-2">
                        <li class="flex justify-between">
                            <span>{{ $t('footer.office-hours.monday') }}</span><span class="font-bold">8AM-4PM</span>
                        </li>
                        <li class="flex justify-between">
                            <span>{{ $t('footer.office-hours.tuesday') }}</span><span class="font-bold">8AM-4PM</span>
                        </li>
                        <li class="flex justify-between">
                            <span>{{ $t('footer.office-hours.wednesday') }}</span><span class="font-bold">8AM-4PM</span>
                        </li>
                        <li class="flex justify-between">
                            <span>{{ $t('footer.office-hours.thursday') }}</span><span class="font-bold">8AM-4PM</span>
                        </li>
                        <li class="flex justify-between">
                            <span>{{ $t('footer.office-hours.friday') }}</span><span class="font-bold">8AM-4PM</span>
                        </li>
                        <li class="flex justify-between">
                            <span>{{ $t('footer.office-hours.saturday') }}</span><span class="font-bold">{{ $t('footer.office-hours.closed') }}</span>
                        </li>
                        <li class="flex justify-between">
                            <span>{{ $t('footer.office-hours.sunday') }}</span><span class="font-bold">{{ $t('footer.office-hours.closed') }}</span>
                        </li>
                    </ul>
                    <h3 class="font-bold text-brand-secondary">{{ $t('footer.office-hours.content.title') }}</h3>
                    <p>{{ $t('footer.office-hours.content.paragraph') }}</p>
                </div>
                <div class="text-center mt-6 border-t border-white/30 pt-4">
                    <h3 class="text-brand-secondary font-bold text-lg mb-2">{{ $t('footer.career.title') }}</h3>
                    <p class="text-sm mb-3">
                        {{ $t('footer.career.paragraph') }}
                    </p>
                    <div class="flex flex-wrap justify-center gap-3">
                        <NuxtLink
                            v-for="careerLink in footer.careerLinks" :key="careerLink.id"
                            :to="careerLink.href"
                            class="hover:text-brand-secondary underline"
                        >
                            {{ $t(`footer.career.links.${careerLink.id}`) }}
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>


        <!-- <div class="sm:flex sm:justify-between px-2 py-6 bg-brand-primary text-white border-t-2 border-t-white/50">
            <NuxtLink to="/" class="hover:text-brand-secondary hover:underline block">© 2024 Golden Gate Manor, Inc.</NuxtLink>
            <nav>
                max-md:w-max max-md:mx-auto max-md:mb-4

                max-md:grid max-md:grid-cols-2 max-md:justify-center 
                <ul class="sm:flex sm:items-center sm:flex-wrap h-full">
                    <li v-for="policyLink in footer.policyLinks" :key="policyLink.id" class="px-4 md:border-l md:first-of-type:border-l-0 hover:text-brand-secondary hover:underline h-max">
                        <NuxtLink v-if="policyLink.id !== 'site-map'" :to="policyLink.href" class="flex w-max">{{ policyLink.name }}</NuxtLink>
                        <a v-else :href="policyLink.href" class="flex w-max">{{ policyLink.name }}</a>
                    </li>
                </ul>
            </nav>
        </div> -->
        <!-- Bottom Copyright Footer -->
        <div v-if="footer" class="flex flex-col min-[875px]:flex-row md:justify-between px-2 py-6 bg-brand-primary text-white border-t-2 border-t-white/50 text-center">
            <NuxtLink to="/" class="hover:text-brand-secondary hover:underline inline-block mx-auto mb-2 min-[875px]:mb-0 md:mx-0">© 2024 Golden Gate Manor, Inc.</NuxtLink>
            <nav class="flex justify-center" aria-label="Footer Navigation">
                <ul class="flex flex-wrap justify-center sm:flex text-left gap-2 w-max">
                    <li v-for="policyLink in footer.policyLinks" :key="policyLink.id" class="w-max pl-4 sm:first-of-type:pl-0 sm:pl-2 sm:border-l sm:first-of-type:border-l-0">
                        <NuxtLink v-if="policyLink.id !== 'site-map'" :to="$localePath(policyLink.href)" class="hover:text-brand-secondary hover:underline">{{ $t(`footer.policies.${policyLink.id}`) }}</NuxtLink>
                        <a v-else :href="policyLink.href" class="hover:text-brand-secondary hover:underline">{{ $t(`footer.policies.${policyLink.id}`) }}</a>
                    </li>
                </ul>
            </nav>
        </div>
    </footer>
</template>

<script setup lang='ts'>
import raw from '@/data/footer.json'
import socialHandles from '@/data/socialHandles.json'
import type { FooterJson } from '../../../../types/footer.js';

const activeSocialHandels = socialHandles.filter(s => s.enabled !== false);

const { footer } = raw as FooterJson;

const viewMore = ref<boolean[]>([false, false])

const toggleViewMore = (idx: number) => {
    viewMore.value[idx] = !viewMore.value[idx]
}
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>