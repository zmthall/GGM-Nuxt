<template>
    <div class="relative w-full group">
        <label v-if="label" class="font-extrabold text-xs inline-block mb-1 text-brand-primary capitalize">{{ label }}</label>
        <select
            v-model="selectValue"
            :class="['appearance-none w-full px-4 py-2 pr-10 border-2 text-gray-900 bg-gray-50 hover:border-brand-primary/50 focus:border-brand-primary rounded-md focus:shadow-input text-xs font-semibold focus:outline-none]', { 'mt-0': label, 'mt-4': !label}]">
            <option value="">Select an option</option>
            <option v-for="(value, idx) in values" :key="value" :value="value">{{ labels[idx]}}</option>
        </select>

        <!-- Custom chevron icon -->
        <div :class="['pointer-events-none absolute inset-y-0 right-3 flex items-center', { 'mt-4': !label, 'mt-5': label }]">
            <BaseIcon name="mdi:chevron-down" size="size-5" color="text-gray-200" hover-color="group-hover:text-brand-primary/50" custom-class="group-focus-within:text-brand-primary/50"/>
        </div>
    </div>
</template>

<script setup lang='ts'>

defineOptions({
    name: 'BaseFormSelect'
})

defineProps<{
    values: string[];
    labels: string[];
    label?: string;
}>()

const selectValue = defineModel<string>()

</script>

<style></style>