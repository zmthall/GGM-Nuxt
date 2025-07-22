<template>
<div>
    <label :for="name" class="flex items-center gap-2">
        <input :id="name" v-model="toggleSwitchValue" class="appearance-none peer absolute" type="checkbox" :name="name">
        <span class="">{{ label }}</span>
        <div class="w-16 h-8 rounded-full border-2 border-gray-200 peer-checked:shadow-input relative cursor-pointer peer-checked:bg-brand-primary slider peer-checked:before:translate-x-[31px]" />
    </label>
</div>
</template>

<script setup lang='ts'>
defineOptions({
    name: 'BaseFormToggleSwitch'
})

defineProps<{
    name: string;
    label: string;
}>()

const toggleSwitchValue = defineModel<boolean>()

</script>

<style scoped>
    .slider {
        @apply before:size-7 before:bg-gray-200 before:border-2 before:border-gray-300 before:transition-transform before:duration-500 duration-500 before:absolute before:rounded-full before:top-1/2 before:left-[1px] before:-translate-y-1/2;
    }
</style>