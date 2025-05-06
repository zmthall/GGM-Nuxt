<template>
    <section 
    :class="[
        ...sectionClasses,
        styling || '',
        'px-2 sm:px-4 lg:px-8 w-full'
    ]">
        <slot />
    </section>
</template>

<script setup lang="ts">
defineOptions({ name: 'BaseLayoutPageSection' })

const props = withDefaults(defineProps<{
    bg?: 'default' | 'alt';
    class?: string;
    styling?: string;
}>(), {
    bg: 'default',
    class: '',
    styling: undefined
})

const sectionClasses = computed(() => [
    'w-full py-12 sm:py-16',
    props.bg === 'default' && 'bg-[#e8e8e8]', // cool stone
    props.bg === 'alt' && 'bg-brand-primary/5',    // soft light blue
    props.class
])
</script>