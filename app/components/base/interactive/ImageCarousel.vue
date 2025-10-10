<template>
    <div class="flex justify-center items-center aspect-video lg:aspect-auto h-[300px] sm:h-[400px] md:h-[500px] w-full mb-4 relative">
        <button class="absolute left-0 z-5 w-[50px] bg-gray-200/20 hover:bg-gray-200/80 h-full sm:relative sm:h-1/3 sm:bg-brand-primary sm:rounded-l-full sm:border-t-2 sm:border-l-2 sm:border-b-2 sm:border-brand-secondary group sm:hover:bg-brand-secondary sm:hover:border-brand-primary transition-colors duration-500 ease-in-out" aria-label="Previous image" @click="prevImage">
            <BaseIcon name="codicon:triangle-left" color="text-gray-200/50 sm:text-brand-secondary" hover-color="group-hover:text-brand-primary sm:group-hover:text-brand-primary" class="transition-colors duration-500 ease-in-out"/>
        </button>
        
        <div class="w-full lg:w-4/5 h-full rounded-lg overflow-hidden relative bg-black">
            <div v-if="!imageLoaded[0]" class="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">Loading Images...</div>
            <button v-if="imageLoaded[0]" class="absolute hidden sm:flex top-4 left-4 z-5 bg-gray-500/10 group hover:bg-gray-500 rounded-full transition-color duration-500 ease-in-out" :aria-label="isAutoPlaying ? 'Image pause button' : 'Image play button'" @click="toggleAutoPlay">
                <BaseIcon v-if="isAutoPlaying" name="material-symbols:pause-circle-rounded" size="size-6" color="text-gray-200/30" hover-color="group-hover:text-brand-primary" class="transition-color duration-500 ease-in-out" />
                <BaseIcon v-else name="material-symbols:play-circle-rounded" size="size-6" color="text-gray-200/30" hover-color="group-hover:text-brand-primary" class="transition-color duration-500 ease-in-out" />
            </button>
            <!-- <button v-if="imageLoaded[0]" class="absolute hidden sm:flex bg-gray-200/10 px-2 text-gray-800/40 rounded-lg top-4 right-4 z-5 hover:bg-gray-200/80 hover:text-gray-800/80">
                View More
            </button> -->
            <ul class="h-full">
                <li v-for="(image, idx) in images" :key="`${image.id}-${image.lastUpdated}`" :class="[{ 'hidden': hideImage(idx) }, 'h-full']">
                    <div class="relative w-full h-full bg-gray-800">
                        <!-- Skeleton loader background -->
                        <div 
                            v-if="!imageLoaded[idx]" 
                            class="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse"
                        ><div class="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">Loading Images...</div></div>
                        
                        <NuxtImg 
                            :src="image.src" 
                            :alt="image.alt" 
                            format="webp, avif"
                            quality="80"
                            placeholder 
                            loading="lazy" 
                            class="w-full h-full object-cover object-top transition-opacity duration-300"
                            :class="{ 'opacity-0': !imageLoaded[idx] }"
                            @load="onImageLoad(idx)"
                            @error="onImageError(idx)"
                        />
                        
                        <div v-if="imageSelection && images.length >= 4" class="absolute max-sm:hidden w-3/4 bottom-8 left-1/2 -translate-x-1/2 flex justify-around z-5">
                            <button v-for="(count, imageIdx) in images.length" :key="count" :class="['w-4 h-4 rounded-full border-2 cursor-pointer hover:bg-brand-primary', { 'bg-brand-primary border-black': imageIdx === currentIdx, 'border-zinc-300': imageIdx !== currentIdx}]" :aria-label="`Select Image ${imageIdx + 1}`" :title="`Select Image ${imageIdx + 1}`" @click="setCurrentIdx(imageIdx)"/>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        
        <button class="absolute right-0 z-5 w-[50px] bg-gray-200/20 hover:bg-gray-200/80 h-full sm:relative sm:h-1/3 sm:bg-brand-primary sm:rounded-r-full sm:border-t-2 sm:border-r-2 sm:border-b-2 sm:border-brand-secondary group sm:hover:bg-brand-secondary sm:hover:border-brand-primary transition-colors duration-500 ease-in-out" aria-label="Next image" @click="nextImage">
            <BaseIcon name="codicon:triangle-right" color="text-gray-200/50 sm:text-brand-secondary" hover-color="group-hover:text-brand-primary sm:group-hover:text-brand-primary" class="transition-colors duration-500 ease-in-out"/>
        </button>
    </div>
</template>

<script setup lang='ts'>
import type { FetchImages } from '../../../models/ImagesData';
import { useDebounce } from '../../../composables/debounce';

defineOptions({
    name: 'BaseInteractiveCarousel'
})

const props = defineProps<{
    containerClass?: string;
    slideContainerClass?: string;
    slideClass?: string;
    images: FetchImages;
    imageSelection?: boolean;
}>();

const currentIdx = ref<number>(0)
const imageLoaded = ref<Record<number, boolean>>({})

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

const isAutoPlaying = ref<boolean>(false);
const imageAutoPlay = ref<ReturnType<typeof setInterval> | null>(null);

const clearAutoPlay = () => {
    if (imageAutoPlay.value !== null) {
        clearInterval(imageAutoPlay.value);
        imageAutoPlay.value = null;
        isAutoPlaying.value = false;
    }
};

const handleResize = useDebounce(() => {
    if (window.innerWidth < 620 && isAutoPlaying.value) {
        clearAutoPlay();
    }
}, 250); // 250ms debounce delay

const toggleAutoPlay = () => {
    isAutoPlaying.value = !isAutoPlaying.value;

    if (isAutoPlaying.value) {
        // Start autoplay
        imageAutoPlay.value = setInterval(nextImage, 5000);
    } else {
        // Stop autoplay
        if (imageAutoPlay.value !== null) {
            clearInterval(imageAutoPlay.value);
            imageAutoPlay.value = null;
        }
    }
};

const hideImage = (idx: number) => {
    return currentIdx.value !== idx
}

const onImageLoad = (idx: number) => {
    imageLoaded.value[idx] = true
}

const onImageError = (idx: number) => {
    imageLoaded.value[idx] = true // Show even if error to prevent permanent loading state
}

const setCurrentIdx = (idx: number) => {
    currentIdx.value = idx;
}

// Preload the first few images
onMounted(() => {
    // Ending the autoPlay if resized before 620px
    window.addEventListener('resize', handleResize);
    // Mark first image as priority
    if (props.images.length > 0) {
        nextTick(() => {
            onImageLoad(0) // Assume first image loads quickly
        })
    }
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
    clearAutoPlay();
});
</script>

<style scoped>
    .transition-image {
        @apply transition-opacity duration-1000 ease-in-out;
    }
</style>