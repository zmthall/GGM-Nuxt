<template>
    <div class="flex w-full h-[300px]">
        <button class="" @click="prevImage"><BaseIcon name="codicon:triangle-left"/></button>
        <ul class="w-full h-full relative overflow-hidden">
            <li v-for="(image, idx) in images" :key="image.id" :class="['w-full h-full absolute flex items-center', {'hidden': idx !== currentIdx}]">
                <NuxtImg :src="image.src" :alt="image.alt" class="w-full h-max" />
            </li>
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