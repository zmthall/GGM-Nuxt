<template>
    <Teleport to="body">
        <div v-if="modalOpen">
            <div class="fixed w-full h-full top-0 left-0 bg-black/50 backdrop-blur-xl z-20" @click="closeModal"/>
            <div :class="['fixed flex flex-col z-30 bg-white md:shadow-primary', { 'md:h-1/2 w-full h-full top-0 left-0': smallModal, 'md:h-4/5 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2': !smallModal && !tinyModal && !customModal, 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2': tinyModal, 'md:w-[650px] md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-lg': normalModal }, modalPadding, customModal]">
                <div v-if="!hideClose" class="flex justify-end">
                    <button class="flex justify-center items-center" @click="closeModal"><BaseIcon name="material-symbols:cancel-outline" color="text-gray-300" hover-color="hover:text-gray-800"/></button>
                </div>
                <div :class="['h-full w-full flex flex-col min-h-0', styling]">
                    <slot name="default" />
                </div>
                <div v-if="$slots.attestation" :class="['mt-2 min-h-[40px]', styling]">
                    <slot name="attestation" />
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang='ts'>
const props = withDefaults(defineProps<{
    hideClose?: boolean;
    smallModal?: boolean;
    tinyModal?: boolean;
    normalModal?: boolean;
    customModal?: string;
    styling?: string;
    padding?: number;
}>(),{
    hideClose: false,
    smallModal: false,
    tinyModal: false,
    normalModal: true,
    customModal: undefined,
    styling: undefined,
    padding: 0
})

const modalOpen = defineModel<boolean>();

const emit = defineEmits<{
  close: []
}>();

const closeModal = () => {
    if(!props.hideClose) {
        modalOpen.value = false;
        document.body.classList.remove('no-scroll');
        emit('close');
    }
}

const modalPadding = computed(() => {
    const pMap: Record<number, string> = {
        0: 'p-0',
        2: 'p-2',
        3: 'p-3', 
        4: 'p-4',
        6: 'p-6',
        8: 'p-8',
        10: 'p-10',
        12: 'p-12',
        14: 'p-14',
        16: 'p-16'
    }
    return props.padding !== undefined ? pMap[props.padding] ?? '' : 'p-0'
})
</script>

<style>

</style>