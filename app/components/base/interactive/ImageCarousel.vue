<template>
    <div class="flex items-center">
        <button class="" @click="prevImage"><BaseIcon name="codicon:triangle-left"/></button>
        <ul class="w-full h-[500px] overflow-hidden relative">
            <div class="w-full h-full">
                <li v-for="image in images" :key="image.id" class="w-full h-full absolute flex items-center">
                    <NuxtImg :src="image.src" :alt="image.alt" class="w-max h-full object-contain" />
                </li>
            </div>
        </ul>
        <button class="" @click="nextImage"><BaseIcon name="codicon:triangle-right"/></button>
    </div>
</template>

<script setup lang='ts'>
import type { FetchImages } from '../../../models/ImagesData';

defineOptions({
    name: 'BaseInteractiveCarousel'
})

const props = defineProps<{
    transitionType: 'fade' | 'slide' | 'zoom' | 'flip' | 'bounce' | 'elastic' | 'rotate' | 'blur' | 'scale';
    containerClass?: string;
    slideContainerClass?: string;
    slideClass?: string;
    images: FetchImages;
}>();

const imageContainer = ref<HTMLLIElement | null>(null);
// const autoScrollInterval = ref<NodeJS.Timeout | null>(null);
const currentIdx = ref<number>(0)

const nextImage = () => {
    const nextIdx = currentIdx.value + 1;
    if(nextIdx < props.images.length)
        currentIdx.value++
    else currentIdx.value = 0
}

const prevImage = () => {
    const prevIdx = currentIdx.value - 1;
    if(prevIdx !== -1)
        currentIdx.value--
    else currentIdx.value = props.images.length - 1
}
</script>

<style scoped>
    .transition-image {
        @apply transition-opacity duration-1000 ease-in-out;
    }
</style>