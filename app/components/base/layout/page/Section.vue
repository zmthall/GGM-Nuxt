<template>
    <section 
    :class="[
        ...sectionClasses,
        styling || '',
        { 'px-2 sm:px-4 lg:px-8 w-full': padding }
    ]">
        <slot />
    </section>
</template>

<script setup lang="ts">
defineOptions({ name: 'BaseLayoutPageSection' })

const props = withDefaults(defineProps<{
    bg?: 'default' | 'alt' | 'transparent';
    margin?: 'default' | 'top' | undefined;
    padding?: boolean;
    class?: string;
    styling?: string;
}>(), {
    bg: 'default',
    margin: undefined,
    class: '',
    styling: undefined,
    padding: true
})

const sectionClasses = computed(() => [
    props.margin === 'default' ? 'w-full py-12 sm:py-16' : props.margin === 'top' ? 'w-full pt-4 pb-12 sm:pt-8 sm:pb-16' : '',
    props.bg === 'default' ? 'bg-[#e8e8e8]' : props.bg === 'alt' ? 'bg-brand-primary/5' : props.bg === 'transparent' && 'bg-transparent', // cool stone | soft light blue | transparent
    props.class
])
</script>