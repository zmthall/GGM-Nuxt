import { useStaticData } from '../../../composables/staticData';
<template>
    <footer class="flex flex-col">
        <!-- Top Information Header -->
        <div class="bg-brand-primary text-white px-6 py-10 grid grid-cols-1 gap-12 grid-flow-row md:grid-cols-2 2xl:grid-cols-4">
            <!-- Mission statement and social branding -->
            <div>
                <h2 class="flex flex-col text-brand-secondary font-bold font-headings capitalize text-xl">
                    <span class="border-b border-b-brand-secondary inline-block pb-1 mb-2">Golden Gate Manor Inc:</span>
                    <span>People who value their quality of life can depend on us</span>
                </h2>
                <p>Our Mission:</p>
                <p>To improve the quality of life, each and every day.</p>
                <p>Follow Us:</p>
                <div class="flex gap-2">
                    <nav>
                        <ul class="flex gap-2">
                            <li v-for="socialHandle in staticData.socialHandles" :key="socialHandle.id">
                                <a :href="socialHandle.url" rel="noopener noreferrer nofollow" target="_blank">
                                    <BaseIcon :name="socialHandle.icon" color="text-brand-white" hover-color="hover:text-brand-secondary" />
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <!-- Location information -->
            <div>
                <h2
                    class="flex flex-col text-brand-secondary font-bold font-headings border-b border-b-brand-secondary pb-1 mb-2 text-xl">
                    Locations</h2>
                <ul class="flex flex-col gap-4">
                    <li class="flex flex-col">
                        <h3 class="font-bold underline">Administration Office</h3>
                        <a href="https://g.co/kgs/SuDpTRN" class="group hover:text-brand-secondary">
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
                        <h3 class="font-bold underline">Transportation Hub</h3>
                        <ul>
                            <li class="flex flex-col">
                                <h3 class="font-bold">Front Office</h3>
                                <a href="https://g.co/kgs/UPJP2ZE" class="group hover:text-brand-secondary">
                                    <BaseIcon 
                                        name="material-symbols:location-on" color="text-brand-white" size="size-4"
                                        hover-color="group-hover:text-brand-secondary" /> 648 S. Union Ave., Pueblo CO,
                                    81004
                                </a>
                                <a href="tel:719-544-3231" class="group hover:text-brand-secondary">
                                    <BaseIcon 
                                        name="ic:round-call" color="text-brand-white" size="4"
                                        hover-color="group-hover:text-brand-secondary" /> (719) 544-3231
                                </a>
                            </li>
                            <li class="flex flex-col">
                                <h3 class="font-bold">Dispatch Office</h3>
                                <a href="https://g.co/kgs/UPJP2ZE" class="group hover:text-brand-secondary">
                                    <BaseIcon 
                                        name="material-symbols:location-on" color="text-brand-white" size="size-4"
                                        hover-color="group-hover:text-brand-secondary" /> 648 S. Union Ave., Pueblo CO,
                                    81004
                                </a>
                                <a href="tel:719-543-2525" class="group hover:text-brand-secondary">
                                    <BaseIcon 
                                        name="ic:round-call" color="text-brand-white" size="4"
                                        hover-color="group-hover:text-brand-secondary" /> (719) 543-2525
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="flex flex-col">
                        <h3 class="font-bold underline flex items-center">Assisted Living</h3>
                        <h4 class="font-bold">Main office</h4>
                        <a href="https://g.co/kgs/SuDpTRN" class="group hover:text-brand-secondary">
                            <BaseIcon 
                                name="material-symbols:location-on" color="text-brand-white" size="size-4"
                                hover-color="group-hover:text-brand-secondary" /> 612 S. Union Ave., Pueblo CO, 81004
                        </a>
                        <a href="tel:719-544-3231" class="group hover:text-brand-secondary">
                            <BaseIcon 
                                name="ic:round-call" color="text-brand-white" size="4"
                                hover-color="group-hover:text-brand-secondary" /> (719) 544-3231
                        </a>
                        <button
                            class="items-center border-2 border-brand-white flex w-max p-1 mt-1 hover:bg-brand-secondary hover:text-brand-primary transition-colors duration-300 ease-in-out rounded-md"
                            @click="toggleViewMore(0)">View More
                            <BaseIcon name="ic:sharp-arrow-drop-down" color="text-brand-white" size="size-4" />
                        </button>
                        <ul v-if="viewMore[0]" class="mt-3 pt-1 border-t border-t-brand-secondary/50">
                            <li class="flex flex-col">
                                <h4 class="font-bold">Golden Gate Manor I</h4>
                                <a href="https://g.co/kgs/vytGqxv" class="group hover:text-brand-secondary">
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
                                <a href="https://g.co/kgs/4GGv9Mw" class="group hover:text-brand-secondary">
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
                                <a href="https://g.co/kgs/3U5EFBt" class="group hover:text-brand-secondary">
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
                                <a href="https://g.co/kgs/aTVSTVb" class="group hover:text-brand-secondary">
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
                                <a href="https://g.co/kgs/pGyphRj" class="group hover:text-brand-secondary">
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
                        <h3 class="font-bold underline">Medical Supply</h3>
                        <a href="https://g.co/kgs/SuDpTRN" class="group hover:text-brand-secondary">
                            <BaseIcon 
                                name="material-symbols:location-on" color="text-brand-white" size="size-4"
                                hover-color="group-hover:text-brand-secondary" /> 612 S. Union Ave., Pueblo CO, 81004
                        </a>
                        <a href="tel:719-569-7361" class="group hover:text-brand-secondary">
                            <BaseIcon 
                                name="ic:round-call" color="text-brand-white" size="4"
                                hover-color="group-hover:text-brand-secondary" /> (719) 569-7361
                        </a>
                    </li>
                    <li class="flex flex-col">
                        <h3 class="font-bold underline">Gas Stations</h3>
                        <h4 class="font-bold">Main office</h4>
                        <a href="https://g.co/kgs/aKuuDvE" class="group hover:text-brand-secondary">
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
                            @click="toggleViewMore(1)">View More
                            <BaseIcon name="ic:sharp-arrow-drop-down" color="text-brand-white" size="size-4" />
                        </button>
                        <ul v-if="viewMore[1]" class="mt-3 pt-1 border-t border-t-brand-secondary/50">
                            <li class="flex flex-col">
                                <h4 class="font-bold">Golden Gate Gas & Goods I</h4>
                                <a href="https://g.co/kgs/aKuuDvE" class="group hover:text-brand-secondary">
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
                                <a href="https://g.co/kgs/aKuuDvE" class="group hover:text-brand-secondary">
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
                    class="flex flex-col text-brand-secondary font-bold font-headings border-b border-b-brand-secondary pb-1 mb-2 text-xl">
                    Quick Links</h2>
                <nav>
                    <ul class="flex flex-col gap-4 font-semibold">
                        <li v-for="navLink in staticData.footerNavLinks" :key="navLink.id">
                            <NuxtLink 
                                v-if="navLink.slug" :to="navLink.slug"
                                class="hover:text-brand-secondary hover:underline group flex items-center gap-2 w-max"><BaseIcon :name="navLink.icon" color="text-brand-white" hover-color="group-hover:text-brand-secondary" /> {{ navLink.name }}</NuxtLink>
                            <a 
                                v-if="navLink.url" :href="navLink.url" rel="noopener noreferrer nofollow"
                                class="hover:text-brand-secondary hover:underline flex group items-center gap-2 w-max"><BaseIcon :name="navLink.icon" color="text-brand-white" hover-color="group-hover:text-brand-secondary" /> {{ navLink.name }}</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <!-- Office Hours -->
            <div>
                <h2
                    class="flex flex-col text-brand-secondary font-bold font-headings border-b border-b-brand-secondary pb-1 mb-2 text-xl">
                    Office Hours</h2>
                <ul class="text-2xl mb-2">
                    <li class="flex justify-between">
                        <span>Monday</span><span class="font-bold">8AM-4PM</span>
                    </li>
                    <li class="flex justify-between">
                        <span>Tuesday</span><span class="font-bold">8AM-4PM</span>
                    </li>
                    <li class="flex justify-between">
                        <span>Wednesday</span><span class="font-bold">8AM-4PM</span>
                    </li>
                    <li class="flex justify-between">
                        <span>Thursday</span><span class="font-bold">8AM-4PM</span>
                    </li>
                    <li class="flex justify-between">
                        <span>Friday</span><span class="font-bold">8AM-4PM</span>
                    </li>
                    <li class="flex justify-between">
                        <span>Saturday</span><span class="font-bold">Office Closed</span>
                    </li>
                    <li class="flex justify-between">
                        <span>Sunday</span><span class="font-bold">Office Closed</span>
                    </li>
                </ul>
                <h3 class="font-bold text-brand-secondary">24/7 Transportation You Can Depend On</h3>
                <p>Even though our office hours are set, our commitment never stops. Golden Gate Manor’s transportation services and assisted living homes are available 24/7, ensuring reliable care and rides throughout Colorado. We work hard to make our services accessible whenever you need it most.</p>
            </div>
        </div>

        <!-- Bottom Copyright Footer -->
        <div class="sm:flex sm:justify-between items-center px-2 py-3 bg-brand-primary text-white border-t-2 border-t-white/50">
            <NuxtLink to="/" class="hover:text-brand-secondary hover:underline">© 2024 Golden Gate Manor, Inc.</NuxtLink>
            <nav>
                <ul class="sm:flex items-center h-full">
                    <li v-for="policyLink in staticData.footerPolicyLinks" :key="policyLink.id" class="px-4 border-l first-of-type:border-l-0 hover:text-brand-secondary hover:underline h-full">
                        <NuxtLink :to="policyLink.slug">{{ policyLink.name }}</NuxtLink>
                    </li>
                </ul>
            </nav>
        </div>
    </footer>
</template>

<script setup lang='ts'>
const staticData = useStaticData()
const viewMore = ref<boolean[]>([false, false])

const toggleViewMore = (idx: number) => {
    viewMore.value[idx] = !viewMore.value[idx]
}
</script>

<style></style>