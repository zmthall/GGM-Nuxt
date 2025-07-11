<template>
    <footer class="flex flex-col">
        <!-- Top Information Header -->
        <div class="bg-brand-primary text-white px-6 py-10 grid grid-cols-1 gap-12 grid-flow-row md:grid-cols-2 2xl:grid-cols-4">
            <!-- Mission statement and social branding -->
            <div>
                <h2 class="flex flex-col text-brand-secondary font-bold capitalize text-xl">
                    <span class="border-b border-b-brand-secondary inline-block pb-1 mb-2">Golden Gate Manor Inc:</span>
                    <span>People who value their quality of life can depend on us</span>
                </h2>
                <p>Our Mission:</p>
                <p>To improve the quality of life, each and every day.</p>
                <p>Follow Us:</p>
                <div v-if="staticData" class="flex gap-2">
                    <nav aria-label="social media handle navigation">
                        <ul class="flex gap-2">
                            <li v-for="socialHandle in staticData.socialHandles" :key="socialHandle.id">
                                <a :href="socialHandle.url" rel="noopener noreferrer nofollow" target="_blank">
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
                    Locations</h2>
                <ul class="flex flex-col gap-4">
                    <li class="flex flex-col">
                        <h3 class="font-bold underline">Administration Office</h3>
                        <a href="https://maps.app.goo.gl/kEzjKfbBfLnWwRRTA" class="group hover:text-brand-secondary" target="_blank" rel="noopener nofollow noreferral">
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
                                <a href="https://maps.app.goo.gl/y5FKqHZx7JWvCy3J9" class="group hover:text-brand-secondary" target="_blank" rel="noopener nofollow noreferral">
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
                                <a href="https://maps.app.goo.gl/y5FKqHZx7JWvCy3J9" class="group hover:text-brand-secondary" target="_blank" rel="noopener nofollow noreferral">
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
                        <a href="https://maps.app.goo.gl/kEzjKfbBfLnWwRRTA" class="group hover:text-brand-secondary" target="_blank" rel="noopener nofollow noreferral">
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
                            @click="toggleViewMore(0)">
                            <span v-if="!viewMore[0]">View More</span>
                            <span v-else>View Less</span>
                            <BaseIcon v-if="!viewMore[0]" name="ic:sharp-arrow-drop-down" color="text-brand-white" size="size-4" />
                            <BaseIcon v-else name="ic:sharp-arrow-drop-up" color="text-brand-white" size="size-4" />
                        </button>
                        <ul v-if="viewMore[0]" class="mt-3 pt-1 border-t border-t-brand-secondary/50">
                            <li class="flex flex-col">
                                <h4 class="font-bold">Golden Gate Manor I</h4>
                                <a href="https://maps.app.goo.gl/V9tU3MKnF3q8x6WB7" class="group hover:text-brand-secondary" target="_blank" rel="noopener nofollow noreferral">
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
                                <a href="https://maps.app.goo.gl/fbGuP2aHpBaouFJ89" class="group hover:text-brand-secondary" target="_blank" rel="noopener nofollow noreferral">
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
                                <a href="https://maps.app.goo.gl/C3f7ifZNFkcbNsJ5A" class="group hover:text-brand-secondary" target="_blank" rel="noopener nofollow noreferral">
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
                                <a href="https://maps.app.goo.gl/bzkGXrcXL7oQZwVt6" class="group hover:text-brand-secondary" target="_blank" rel="noopener nofollow noreferral">
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
                                <a href="https://maps.app.goo.gl/f45Npyj9EbVKPSmbA" class="group hover:text-brand-secondary" target="_blank" rel="noopener nofollow noreferral">
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
                        <a href="https://maps.app.goo.gl/kEzjKfbBfLnWwRRTA" class="group hover:text-brand-secondary" target="_blank" rel="noopener nofollow noreferral">
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
                        <a href="https://maps.app.goo.gl/Y3XnrruoCk1zpUQn7" class="group hover:text-brand-secondary" target="_blank" rel="noopener nofollow noreferral">
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
                            <span v-if="!viewMore[1]">View More</span>
                            <span v-else>View Less</span>
                            <BaseIcon v-if="!viewMore[1]" name="ic:sharp-arrow-drop-down" color="text-brand-white" size="size-4" />
                            <BaseIcon v-else name="ic:sharp-arrow-drop-up" color="text-brand-white" size="size-4" />
                        </button>
                        <ul v-if="viewMore[1]" class="mt-3 pt-1 border-t border-t-brand-secondary/50">
                            <li class="flex flex-col">
                                <h4 class="font-bold">Golden Gate Gas & Goods I</h4>
                                <a href="https://maps.app.goo.gl/Y3XnrruoCk1zpUQn7" class="group hover:text-brand-secondary" target="_blank" rel="noopener nofollow noreferral">
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
                                <a href="https://maps.app.goo.gl/Wr9RdANcH8T9r7sf8" class="group hover:text-brand-secondary" target="_blank" rel="noopener nofollow noreferral">
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
                    Quick Links</h2>
                <nav v-if="staticData" aria-label="Footer Navigation/Business description">
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
                    class="flex flex-col text-brand-secondary font-bold border-b border-b-brand-secondary pb-1 mb-2 text-xl">
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


        <!-- <div class="sm:flex sm:justify-between px-2 py-6 bg-brand-primary text-white border-t-2 border-t-white/50">
            <NuxtLink to="/" class="hover:text-brand-secondary hover:underline block">© 2024 Golden Gate Manor, Inc.</NuxtLink>
            <nav>
                max-md:w-max max-md:mx-auto max-md:mb-4

                max-md:grid max-md:grid-cols-2 max-md:justify-center 
                <ul class="sm:flex sm:items-center sm:flex-wrap h-full">
                    <li v-for="policyLink in staticData.footerPolicyLinks" :key="policyLink.id" class="px-4 md:border-l md:first-of-type:border-l-0 hover:text-brand-secondary hover:underline h-max">
                        <NuxtLink v-if="policyLink.id !== 'site-map'" :to="policyLink.slug" class="flex w-max">{{ policyLink.name }}</NuxtLink>
                        <a v-else :href="policyLink.slug" class="flex w-max">{{ policyLink.name }}</a>
                    </li>
                </ul>
            </nav>
        </div> -->
        <!-- Bottom Copyright Footer -->
        <div v-if="staticData" class="flex flex-col min-[875px]:flex-row md:justify-between px-2 py-6 bg-brand-primary text-white border-t-2 border-t-white/50 text-center">
            <NuxtLink to="/" class="hover:text-brand-secondary hover:underline inline-block mx-auto mb-2 min-[875px]:mb-0 md:mx-0">© 2024 Golden Gate Manor, Inc.</NuxtLink>
            <nav class="flex justify-center" aria-label="Footer Navigation">
                <ul class="flex flex-wrap justify-center sm:flex text-left gap-2 w-max">
                    <li v-for="policyLink in staticData.footerPolicyLinks" :key="policyLink.id" class="w-max pl-4 sm:first-of-type:pl-0 sm:pl-2 sm:border-l sm:first-of-type:border-l-0">
                        <NuxtLink v-if="policyLink.id !== 'site-map'" :to="policyLink.slug" class="hover:text-brand-secondary hover:underline">{{ policyLink.name }}</NuxtLink>
                        <a v-else :href="policyLink.slug" class="hover:text-brand-secondary hover:underline">{{ policyLink.name }}</a>
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