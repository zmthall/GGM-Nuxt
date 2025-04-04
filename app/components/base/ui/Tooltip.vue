<template>
    <div class="inline-flex relative pb-4">
        <button 
            class="rounded-full p-[1px] border-2 border-brand-primary inline-flex justify-center items-center hover: ml-8"
            @click="clickToggle"
            @mouseenter="hoverToggle"
            @mouseleave="hoverToggle"
        >
            <BaseUiIcon name="garden:question-mark-fill-12" color="text-brand-primary" hover-color="hover:text-brand-secondary" size="size-2" />
        </button>
        <div v-if="isShown" class="absolute bottom-0 left-0 translate-y-[100%] translate-x-[25%] border p-3 ">
            <button v-if="clickVariant" class="absolute top-0 right-0 flex m-[2px]" @click="closeTooltip">
                <BaseUiIcon name="mdi:close-circle-outline" size="size-4" color="text-gray-300" hover-color="hover:text-gray-600"/>
            </button>
            <slot />
        </div>
    </div>
</template>

<script setup lang='ts'>
defineOptions({
    name: 'BaseUiTooltip'
})

const props = withDefaults(defineProps<{
    variant?: 'hover' | 'click';
    size?: 'sm' | 'lg';
    placement?: 'top' | 'bottom'
}>(), {
    variant: 'hover',
    size: 'lg',
    placement: 'top'
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

<style></style>