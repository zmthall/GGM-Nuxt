<template>
<div>
    <label :for="value" class="inline-flex items-center gap-2">
        <input :id="value" v-model="checkedValue" class="appearance-none peer/input" type="radio" :value="value" :name="name" >
        <div :class="['size-6 border-2 rounded-full bg-white hover:border-brand-primary cursor-pointer relative radio-input hover:before:bg-brand-primary/50 peer-checked/input:before:bg-brand-primary peer-checked/input:border-brand-primary peer-checked/input:shadow-input']" />
        <slot />
    </label>
</div>
</template>

<script setup lang='ts'>

defineOptions({
    name: 'BaseFormRadio'
})

const checkedValue = defineModel<string>()


withDefaults(defineProps<{
    value: string | undefined;
    name: string;
}>(), {
})
</script>

<style scoped>
    .radio-input {
        @apply before:absolute before:size-4 before:rounded-full before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2;
    }
</style>