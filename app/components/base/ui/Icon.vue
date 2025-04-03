<template>
    <Icon 
    :class="[customClass, color, size, { 'animate-spin': spin }]"
    :name="name" 
    :aria-label="ariaLabel ?? title ?? ''"
    :role="role ?? ''"
    :title="title ?? undefined"
    />
</template>

<script setup lang='ts'>
    defineOptions({
        name: 'BaseUiIcon'
    })

    withDefaults(defineProps<{
        name: string;
        size?: string;
        color?: string | undefined;
        customClass?: string;
        ariaLabel?: string | undefined;
        role?: string | undefined;
        title?: string | undefined;
        spin?: boolean;
    }>(),
    {
        size: 'size-8',
        color: 'text-brand-primary',
        customClass: undefined,
        ariaLabel: undefined,
        role: undefined,
        title: undefined,
        spin: false,
    })
</script>

<style scoped>
.rotate {
    transform: rotate(90deg)
}

</style>