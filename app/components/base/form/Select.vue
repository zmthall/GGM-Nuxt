<template>
    <div class="relative w-full group">
        <select
            v-model="selectValue"
            class="appearance-none mt-4 w-full px-4 py-2 pr-10 border-2 text-gray-900 bg-gray-50 hover:border-brand-primary/50 focus:border-brand-primary rounded-md focus:shadow-input text-xs font-semibold focus:outline-none">
            <option value="">Select an option</option>
            <option v-for="(value, idx) in values" :key="value" :value="value">{{ labels[idx]}}</option>
        </select>

        <!-- Custom chevron icon -->
        <div class="pointer-events-none absolute mt-4 inset-y-0 right-3 flex items-center">
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
}>()

const selectValue = defineModel<string>()

</script>

<style></style>