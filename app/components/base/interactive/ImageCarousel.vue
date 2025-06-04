<template>
    <div class="flex aspect-video md:aspect-auto md:h-[500px] mx-2 relative items-center px-2">
        <button @click="prevImage" class="max-md:absolute max-md:left-0 max-md:top-1/2 max-md:-translate-y-1/2 z-2 max-md:w-[10%] max-md:hover:bg-white/20 max-md:h-full md:-[50px] md:rounded-l-2xl md:bg-brand-primary md:h-1/3 md:hover:bg-brand-secondary md:border-t md:border-l md:border-b md:border-brand-primary group transition-colors duration-500 ease-in-out"><BaseIcon name="codicon:triangle-left" color="max-md:text-gray-100/20 md:text-brand-secondary" hover-color="group-hover:text-brand-primary" class="transition-colors duration-500 ease-in-out"/></button>
        <ul :class="[{ slideContainerClass, 'w-full h-full': !slideContainerClass, '': !slideContainerClass }, '']">
            <li :class="[slideClass, { 'relative h-full bg-gray-400 overflow-hidden rounded-lg shadow-primary': !slideClass && images }]" ref="imageContainer">
                <template v-if="images">
                    <NuxtImg v-for="(image, idx) in images" :key="image.id" :src="image.src" :alt="image.alt" format="webp" sizes="1000px" :class="['absolute md:object-cover object-left-bottom w-full h-full top-0 left-0 transition-image', {'invisible opacity-0': idx !== currentIdx, 'opacity-100': idx === currentIdx}]"/>
                </template>
            </li>
        </ul>
        <button @click="nextImage" class="max-md:absolute max-md:right-0 max-md:top-1/2 max-md:-translate-y-1/2 z-2 max-md:w-[10%] max-md:hover:bg-white/20 max-md:h-full md:-[50px] md:rounded-r-2xl md:bg-brand-primary md:h-1/3 md:hover:bg-brand-secondary md:border-r md:border-t md:border-b md:border-brand-primary group transition-colors duration-500 ease-in-out"><BaseIcon name="codicon:triangle-right" color="max-md:text-gray-100/20 md:text-brand-secondary" hover-color="group-hover:text-brand-primary" class="transition-colors duration-500 ease-in-out"/></button>
    </div>
</template>

<script setup lang='ts'>
defineOptions({
    name: 'BaseInteractiveCarousel'
})

const props = defineProps<{
    transitionType: 'fade' | 'slide' | 'zoom' | 'flip' | 'bounce' | 'elastic' | 'rotate' | 'blur' | 'scale';
    containerClass?: string;
    slideContainerClass?: string;
    slideClass?: string;
    images: {
        id: string;
        src: string;
        alt?: string;
    }[];
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
    console.log(currentIdx.value)
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