<template>
    <div class="inline-flex ml-8">
        <div class="inline-flex relative">
            <button 
                class="rounded-full p-[1px] border-2 border-brand-primary hover:bg-brand-primary group inline-flex justify-center items-center"
                @click="clickToggle"
                @mouseenter="hoverToggle"
                @mouseleave="hoverToggle"
            >
                <BaseUiIcon name="garden:question-mark-fill-12" color="text-brand-primary" hover-color="group-hover:bg-brand-secondary" size="size-3" />
            </button>
            <div v-if="isShown" class="absolute bottom-[-0.75rem] left:0 translate-y-[100%] p-3 triangle-top bg-white drop-filter min-w-[300px]">
                <button v-if="clickVariant" class="absolute top-0 right-0 flex m-[2px]" @click="closeTooltip">
                    <BaseIcon name="mdi:close-circle-outline" size="size-4" color="text-gray-300" hover-color="hover:text-gray-400"/>
                </button>
                <div class="text-xs font-semibold">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
defineOptions({
    name: 'BaseUiTooltip'
})

const props = withDefaults(defineProps<{
    variant?: 'hover' | 'click';
    // size?: 'sm' | 'lg';
    // placement?: 'top' | 'bottom'
}>(), {
    variant: 'hover',
    // size: 'lg',
    // placement: 'top'
})

const isShown = ref(false);

const clickVariant = computed(() => {
    return props.variant === 'click';
})

const clickToggle = () => {
    if(props.variant === 'click')
    isShown.value = !isShown.value
}

const hoverToggle = () => {
    if(props.variant === 'hover')
    isShown.value = !isShown.value
}

const closeTooltip = () => {
    isShown.value = false;
}
</script>

<style>
    .triangle-top {
        @apply before:size-0 before:border-l-[10px] before:border-transparent before:border-r-[10px] before:border-b-[10px] before:border-b-white before:absolute before:z-1 before:top-0 before:left-0 before:translate-y-[-100%];
    }
    .drop-filter {
        filter: drop-shadow(1px 2px 5px rgba(0,0,0,.2));
    }
</style>