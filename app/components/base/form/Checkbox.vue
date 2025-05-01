<template>
    <div class="flex items-center">
        <input :id="name" v-model="isChecked" class="appearance-none" type="checkbox" :name="name">
        <label :for="name" class="inline-flex items-center gap-2">
            <div 
            :class="['checkbox inline-flex items-center border-2 size-5  rounded-md cursor-pointer transition-colors duration-300', {'bg-brand-primary border-brand-primary hover:border-brand-primary/0 hover:bg-brand-primary/80': isChecked, 'border-brand-primary/50 hover:border-brand-primary': !isChecked}]">
                    <BaseIcon v-if="isChecked" name="ic:round-check" color="text-white" size="size-5" />
            </div>
            <slot />
        </label>
    </div>
</template>

<script setup lang='ts'>
defineOptions({
    name: 'BaseFormCheckbox'
})

withDefaults(defineProps<{
    name: string | undefined;
}>(), {
    
})

const isChecked = defineModel<boolean>()
</script>

<style></style>