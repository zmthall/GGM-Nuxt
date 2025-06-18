<template>
        <Teleport to="body">
            <div v-if="modalOpen">
                <div class="fixed w-full h-full top-0 left-0 bg-black/50 backdrop-blur-xl z-20" @click="closeModal"/>
                <div class="fixed flex p-4 flex-col z-30 top-0 left-0 w-full h-full bg-white md:w-[650px] md:h-4/5 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:shadow-primary md:rounded-lg">
                    <div class="flex justify-end">
                        <button class="flex justify-center items-center" @click="closeModal"><BaseIcon name="material-symbols:cancel-outline" color="text-gray-300" hover-color="hover:text-gray-800"/></button>
                    </div>
                    <div class="overflow-auto h-full w-full">
                        <slot />
                    </div>
                </div>
            </div>
        </Teleport>
</template>

<script setup lang='ts'>
const modalOpen = defineModel<boolean>();

const emit = defineEmits<{
  close: []
}>();

const closeModal = () => {
    modalOpen.value = false;
    document.body.classList.remove('no-scroll');
    emit('close');
}
</script>

<style>
</style>