<template>
    <Teleport to="body">
        <div v-if="modalOpen">
            <div class="fixed w-full h-full top-0 left-0 bg-black/50 backdrop-blur-xl z-20" @click="closeModal"/>
            <div :class="['fixed flex p-4 flex-col z-30 bg-white md:w-[650px] md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:shadow-primary md:rounded-lg', { 'md:h-1/2 w-full h-full top-0 left-0': smallModal, 'md:h-4/5 w-full h-full top-0 left-0': !smallModal && !tinyModal, 'h-max top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2': tinyModal }]">
                <div v-if="!hideClose" class="flex justify-end">
                    <button class="flex justify-center items-center" @click="closeModal"><BaseIcon name="material-symbols:cancel-outline" color="text-gray-300" hover-color="hover:text-gray-800"/></button>
                </div>
                <div :class="['overflow-auto h-full w-full', styling]">
                    <slot name="default" />
                </div>
                <div v-if="$slots.attestation" :class="['mt-2', styling]">
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
    styling?: string;
}>(),{
    hideClose: false,
    smallModal: false,
    tinyModal: false,
    styling: undefined
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
</script>

<style>

</style>