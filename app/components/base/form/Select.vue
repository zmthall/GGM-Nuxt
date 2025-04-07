<template>
    <div class="relative w-full max-w-xs group">
        <select
            class="appearance-none mt-4 w-full px-4 py-2 pr-10 border-2 text-gray-900 bg-gray-50 hover:border-brand-primary/50 focus:border-brand-primary rounded-md focus:shadow-input text-xs font-semibold focus:outline-none">
            <option value="">Select option</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
        </select>

        <!-- Custom chevron icon -->
        <div class="pointer-events-none absolute mt-4 inset-y-0 right-3 flex items-center">
            <BaseUiIcon name="mdi:chevron-down" size="size-5" color="text-gray-200" hover-color="group-hover:text-brand-primary/50" custom-class="group-focus-within:text-brand-primary/50"/>
        </div>
    </div>
</template>

<script setup lang='ts'>

</script>

<style></style>