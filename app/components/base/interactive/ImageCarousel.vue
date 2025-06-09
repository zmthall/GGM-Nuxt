<template>
    <div class="flex justify-center items-center aspect-video lg:aspect-auto h-[300px] sm:h-[400px] md:h-[500px] w-full mb-4 relative">
        <button class="absolute left-0 z-5 w-[50px] bg-gray-200/20 hover:bg-gray-200/80 h-full sm:relative sm:h-1/3 sm:bg-brand-primary sm:rounded-l-full sm:border-t-2 sm:border-l-2 sm:border-b-2 sm:border-brand-secondary group sm:hover:bg-brand-secondary sm:hover:border-brand-primary transition-colors duration-500 ease-in-out" @click="prevImage">
            <BaseIcon name="codicon:triangle-left" color="text-gray-200/50 sm:text-brand-secondary" hover-color="group-hover:text-brand-primary sm:group-hover:text-brand-primary" class="transition-colors duration-500 ease-in-out"/>
        </button>
        
        <ul class="w-full lg:w-4/5 h-full rounded-lg overflow-hidden relative bg-black">
            <li v-for="(image, idx) in images" :key="image.id" :class="[{ 'hidden': hideImage(idx) }, 'h-full']">
                <div class="relative w-full h-full bg-gray-800">
                    <!-- Skeleton loader background -->
                    <div 
                        v-if="!imageLoaded[idx]" 
                        class="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse"
                    />
                    
                    <NuxtImg 
                        :src="image.src" 
                        :alt="image.alt" 
                        placeholder 
                        loading="lazy" 
                        class="w-full h-full object-cover object-top transition-opacity duration-300"
                        :class="{ 'opacity-0': !imageLoaded[idx] }"
                        @load="onImageLoad(idx)"
                        @error="onImageError(idx)"
                    />
                </div>
            </li>
        </ul>
        
        <button class="absolute right-0 z-5 w-[50px] bg-gray-200/20 hover:bg-gray-200/80 h-full sm:relative sm:h-1/3 sm:bg-brand-primary sm:rounded-r-full sm:border-t-2 sm:border-r-2 sm:border-b-2 sm:border-brand-secondary group sm:hover:bg-brand-secondary sm:hover:border-brand-primary transition-colors duration-500 ease-in-out" @click="nextImage">
            <BaseIcon name="codicon:triangle-right" color="text-gray-200/50 sm:text-brand-secondary" hover-color="group-hover:text-brand-primary sm:group-hover:text-brand-primary" class="transition-colors duration-500 ease-in-out"/>
        </button>
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

const hideImage = (idx: number) => {
    return currentIdx.value !== idx
}

const onImageLoad = (idx: number) => {
    imageLoaded.value[idx] = true
}

const onImageError = (idx: number) => {
    imageLoaded.value[idx] = true // Show even if error to prevent permanent loading state
}

// Preload the first few images
onMounted(() => {
    // Mark first image as priority
    if (props.images.length > 0) {
        nextTick(() => {
            onImageLoad(0) // Assume first image loads quickly
        })
    }
})
</script>

<style scoped>
    .transition-image {
        @apply transition-opacity duration-1000 ease-in-out;
    }
</style>