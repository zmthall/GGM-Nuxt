<template>
    <div :class="['p-6 items-center rounded-lg overflow-hidden h-full flex flex-col justify-between', { 'group': hoverGroup, 'shadow-primary': shadow}]">
        <div class="flex flex-col items-center">
            <NuxtImg v-if="src" :src :class="[imgSize]"/>
            <BaseIcon v-if="iconName" :name="iconName" :size="iconSize" :color="accentColor" :hover-color="hoveringColor" custom-class="transition-colors duration-500 ease-in-out" class="block" />
            <slot />
        </div>
        <BaseUiAction v-if="cta" :to :href :variant :new-page :no-follow :size="ctaSize" :styling="ctaClass" :hover-group="hoverGroup">{{ cta }}</BaseUiAction>
    </div>
</template>

<script setup lang='ts'>
defineOptions({
    name: "BaseLayoutCard"
});

const props = withDefaults(defineProps<{
    src?: string;
    iconName?: string;
    iconSize?: string;
    imgSize?: string;
    accentColor?: string;
    hoverColor?: string;
    hoverGroup?: boolean;
    cta?: string;
    ctaSize?: string;
    ctaClass?: string;
    href?: string;
    to?: string;
    variant?: string;
    newPage?: boolean;
    noFollow?: boolean;
    shadow?: boolean;
}>(), {
    accentColor: 'text-gray-500',
    hoverColor: undefined,
    iconName: undefined,
    iconSize: "size-4",
    imgSize: "w-full",
    hoverGroup: false,
    src: undefined,
    cta: undefined,
    ctaClass: undefined,
    ctaSize: undefined,
    href: undefined,
    to: undefined,
    variant: undefined,
    newPage: false,
    noFollow: false,
    shadow: true
});

const hoveringColor = computed(() => {
    if(props.hoverGroup) return props.hoverColor ? props.hoverColor : 'group-hover:text-brand-primary'
    else return props.hoverColor ? props.hoverColor : 'group-hover:text-brand-primary'
});
</script>

<style>

</style>