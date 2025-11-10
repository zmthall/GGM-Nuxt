<template>
    <header class="max-md:hidden flex items-center justify-between p-3 bg-brand-background-header h-header">
        <!-- Left Header -->
        <div class="flex justify-between items-center">
            <NuxtLink to="/">
                <NuxtImg 
                    src="/images/layout/logo.png" width="450" height="43" sizes="md:300px lg:450px 2xl:500px"
                    alt="Golden Gate Manor Inc. Logo" format="webp, avif" quality="60" loading="eager" title="Golden Gate Manor Inc. Logo" />
            </NuxtLink>
        </div>
        <!-- /Left Header -->
        <!-- Right Header -->
        <div class="flex items-center gap-2">
            <BaseUiAction to="/resources/schedule-a-ride" variant="cta" class="z-10 p-2">Schedule a Ride</BaseUiAction>
            <div class="relative">
                <button 
                    ref="contactButton"
                    data-button="contacts"
                    aria-label="business contact numbers"
                    class="flex items-center p-2 border-2 border-transparent rounded-xl bg-brand-background-header hover:bg-brand-primary hover:border-brand-secondary group transition-colors duration-300 ease-in-out"
                    @click="toggleContactServices">
                    <BaseIcon name="ic:round-call" hover-color="group-hover:text-brand-light-gray" />
                    <span class="font-bold text-brand-primary group-hover:text-brand-light-gray">Contacts</span>
                    <BaseIcon name="ic:sharp-arrow-drop-down" hover-color="group-hover:text-brand-light-gray" />
                </button>
                <div 
                    v-if="contactOpen && contactServices"
                    ref="contactPopup"
                    class="absolute right-0 translate-y-4 flex bg-brand-background-header drop-shadow-[0px_0px_4px_rgba(0,0,0,0.2)] rounded-lg p-2 arrow-top z-20"
                    >
                    <ul class="flex flex-col">
                        <li 
                            v-for="contactService in contactServices" :key="contactService.id"
                            class="flex gap-10 w-full justify-between p-2 border-b-2 border-b-brand-light-gray/35 last:border-b-0"
                        >
                            <span class="font-semibold whitespace-nowrap">{{ contactService.name }}</span>
                            <CallRailLink
                                    v-if="contactService.id === 'Non-Medical' || contactService.id === 'NEMT'"
                                    :tel="contactService.number"
                                    :display="contactService.number"
                                    cls="link"
                                    :aria-label="`Call us at ${contactService.number}`"
                            >
                                    {{ contactService.number }}
                            </CallRailLink>
                            <a
                                v-else
                                :href="`tel:${contactService.number}`"
                                class="link whitespace-nowrap"
                                >
                                {{ contactService.number }}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- /Right Header -->
    </header>
</template>

<script setup lang='ts'>
import contactServices from '@/data/contactServices.json'

defineOptions({
    name: "BaseLayoutHeader"
})

const contactOpen = ref(false)
const contactPopup = ref<HTMLElement | null>(null)
const contactButton = ref<HTMLElement | null>(null)

const toggleContactServices = () => {
    contactOpen.value = !contactOpen.value;
}


function handleClickOutside(event: MouseEvent) {
  const target = event.target as Node

  if (
    contactPopup.value &&
    !contactPopup.value.contains(target) &&
    contactButton.value &&
    !contactButton.value.contains(target)
  ) {
    contactOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.arrow-top {
    @apply before:border-solid before:border-b-brand-background-header before:border-b-[1rem] before:border-x-transparent before:border-x-[1rem] before:border-t-0 before:absolute before:top-[1px] before:right-[20%] before:translate-y-[-100%]
}
</style>