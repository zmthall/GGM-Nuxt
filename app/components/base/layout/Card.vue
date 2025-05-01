<template>
    <div v-if="hydrated">
        <NuxtLink v-if="fullClickable" :to :class="['block p-6 shadow-primary rounded-lg group', width]">
            <div :class="['flex flex-col justify-center items-center']">
                <NuxtImg v-if="src" :src :class="[imgSize]"/>
                <BaseIcon v-if="iconName" :name="iconName" :size="iconSize" :color="accentColor" :hover-color="'group-hover:text-brand-primary' ?? hoverColor" custom-class="transition-colors duration-500 ease-in-out" class="block" />
                <slot />
                <BaseUiAction v-if="cta" :to :href :variant :new-page :no-follow :size="ctaSize" :styling="ctaClass" :hover-group="true">{{ cta }}</BaseUiAction>
            </div>
        </NuxtLink>
        <div v-if="!fullClickable" :class="[width, 'p-6 shadow-primary rounded-lg flex flex-col justify-center items-center', { 'group': hoverGroup}]">
            <NuxtImg v-if="src" :src :class="[imgSize]"/>
            <BaseIcon v-if="iconName" :name="iconName" :size="iconSize" :color="accentColor" :hover-color custom-class="transition-colors duration-500 ease-in-out" class="block" />
            <slot />
            <BaseUiAction v-if="cta" :to :href :variant :new-page :no-follow :size="ctaSize" :styling="ctaClass" :hover-group="hoverGroup">{{ cta }}</BaseUiAction>
        </div>
    </div>
</template>

<script setup lang='ts'>
defineOptions({
    name: "BaseLayoutCard"
})

const hydrated = ref(false)
onMounted(() => hydrated.value = true)

withDefaults(defineProps<{
    width: string;
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
    fullClickable?: boolean;
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
    fullClickable: false
})
</script>

<style>

</style>