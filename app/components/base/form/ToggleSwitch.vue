<template>
    <div>
        <label v-if="headingLabel" :for="name" class="font-extrabold text-xs inline-block mb-1 text-brand-primary capitalize">
            {{ headingLabel }}
        </label>
        <label :for="name" class="flex items-center gap-2 w-fit">
            <input :id="name" v-model="toggleSwitchValue" class="appearance-none peer absolute" type="checkbox" :name="name">
            <span>{{ label }}</span>
            <div
                :class="[
                    'rounded-full border-2 border-gray-200 peer-checked:shadow-input relative cursor-pointer peer-checked:bg-brand-primary slider',
                    sliderSizeClasses.track,
                    sliderSizeClasses.checkedTranslate
                ]"
            />
        </label>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
    name: 'BaseFormToggleSwitch'
})

const props = withDefaults(defineProps<{
    name: string;
    label: string;
    headingLabel?: string;
    size?: 'large' | 'medium' | 'small';
}>(), {
    headingLabel: undefined,
    size: 'large'
})

const toggleSwitchValue = defineModel<boolean | undefined>()

const sliderSizeClasses = computed(() => {
    switch (props.size) {
        case 'small':
            return {
                track: 'w-10 h-5',
                checkedTranslate: 'peer-checked:before:translate-x-5'
            }
        case 'medium':
            return {
                track: 'w-12 h-6',
                checkedTranslate: 'peer-checked:before:translate-x-6'
            }
        case 'large':
        default:
            return {
                track: 'w-16 h-8',
                checkedTranslate: 'peer-checked:before:translate-x-[31px]'
            }
    }
})
</script>

<style scoped>
.slider {
    @apply before:absolute before:rounded-full before:top-1/2 before:-translate-y-1/2 before:transition-transform before:duration-500 duration-500;
}

.slider.w-16.h-8 {
    @apply before:size-7 before:left-[1px] before:bg-gray-200 before:border-2 before:border-gray-300;
}

.slider.w-12.h-6 {
    @apply before:size-5 before:left-[1px] before:bg-gray-200 before:border-2 before:border-gray-300;
}

.slider.w-10.h-5 {
    @apply before:size-4 before:left-[1px] before:bg-gray-200 before:border-2 before:border-gray-300;
}
</style>