<template>
    <template v-if="to">
        <NuxtLink 
        :class="[
            { 'primary-style': (isPrimary && !hoverGroup) },
            { 'primary-style-group': (isPrimary && hoverGroup) },
            { 'secondary-style': (isSecondary && !hoverGroup) },
            { 'secondary-style-group': (isSecondary && hoverGroup) },
            { 'cta-style group/cta': (isCTA && !hoverGroup) },
            { 'cta-style-group group/cta': (isCTA && hoverGroup) },
            'inline-block button-style', size, styling]" :to="to ?? '#'">
            <div :class="[{ 'group-hover/cta:before:animate-fill group-hover/cta:duration-[1.5s] content-wrapper': isCTA }, 'relative pointer-events-none']">
                <slot />
            </div>
        </NuxtLink>
    </template>
    <template v-else-if="href">
        <a 
        :class="[
            { 'primary-style': (isPrimary && !hoverGroup) },
            { 'primary-style-group': (isPrimary && hoverGroup) },
            { 'secondary-style': (isSecondary && !hoverGroup) },
            { 'secondary-style-group': (isSecondary && hoverGroup) },
            { 'cta-style group/cta': (isCTA && !hoverGroup) },
            { 'cta-style-group group/cta': (isCTA && hoverGroup) },
            'inline-block button-style', size, styling]" :href="href ?? '#'" :target="newPage ? '_blank' : ''" :rel="linkRel"
        >
            <div :class="[{ 'group-hover/cta:before:animate-fill group-hover/cta:duration-[1.5s] content-wrapper': isCTA }, 'relative pointer-events-none']">
                <slot />
            </div>
        </a>
    </template>
    <template v-else>
        <button 
        :class="[
            { 'primary-style': (isPrimary && !hoverGroup) },
            { 'primary-style-group': (isPrimary && hoverGroup) },
            { 'secondary-style': (isSecondary && !hoverGroup) },
            { 'secondary-style-group': (isSecondary && hoverGroup) },
            { 'cta-style group/cta': (isCTA && !hoverGroup) },
            { 'cta-style-group group/cta': (isCTA && hoverGroup) },
            'button-style', size, styling
            ]" :type="type ?? 'button'" @click="emit('click')"
        >
            <div 
            :class="[{ 'group-hover/cta:before:animate-fill group-hover/cta:duration-[1.5s] content-wrapper': isCTA }, 'relative pointer-events-none']">
                <slot />
            </div>
        </button>
    </template>
</template>

<script setup lang='ts'>
defineOptions({
    name: 'BaseUiAction'
})

const emit = defineEmits<{
    (e: 'click'): void
}>()

const props = withDefaults(defineProps<{
    type?: "button" | "submit" | "reset"; // Used for buttons to distinguish type of button for accessibility
    variant?: 'primary' | 'cta' | 'secondary'; // this is different special looks for the button type VariantType = 'primary' | 'cta' | 'secondary'
    size?: string;
    styling?: string;
    href?: string;
    to?: string;
    disabled?: boolean;
    fullWidth?: boolean
    newPage?: boolean;
    noFollow?: boolean;
    bgDark?: boolean;
    hoverGroup?: boolean;
    iconBefore?: string;
    iconAfter?: string;
    ariaLabel?: string;
}>(), {
    type: undefined,
    variant: 'primary',
    size: undefined,
    href: undefined,
    styling: undefined,
    to: undefined,
    nuxt: false,
    disabled: false,
    fullWidth: false,
    newPage: false,
    noFollow: false,
    bgDark: false,
    hoverGroup:false,
    iconBefore: undefined,
    iconAfter: undefined,
    ariaLabel: "Button",
})

const linkRel = computed(() => {
    if (props.newPage && props.noFollow) {
        return "noopener noreferrer nofollow"
    } else if (props.newPage && !props.noFollow) {
        return "noopener"
    } else return ''
})

const isPrimary = computed(() => {
    return props.variant === 'primary'
})

const isSecondary = computed(() => {
    return props.variant === 'secondary'
})

const isCTA = computed(() => {
    return props.variant === 'cta'
})
</script>

<style>
.button-style {
    @apply font-semibold rounded-md text-center;
}

.primary-style {
    @apply bg-brand-primary transition-colors ease-in-out text-white border-2 duration-main border-brand-secondary hover:bg-brand-secondary hover:text-brand-primary;
}

.primary-style-group {
    @apply bg-brand-primary transition-colors ease-in-out text-white border-2 duration-main border-brand-secondary group-hover:bg-brand-secondary group-hover:text-brand-primary;
}

.secondary-style {
    @apply bg-brand-secondary transition-colors ease-in-out text-brand-primary duration-main border-brand-primary border-2 hover:border-brand-secondary hover:bg-brand-primary hover:text-brand-secondary;
}

.secondary-style-group {
    @apply bg-brand-secondary transition-colors ease-in-out text-brand-primary duration-main border-brand-primary border-2 group-hover:bg-brand-primary group-hover:text-white;
}

.cta-style {
    @apply bg-transparent border-2 border-brand-primary text-brand-primary hover:text-brand-secondary overflow-hidden;
}

.content-wrapper::before {
    content: '';
    @apply absolute w-[180px] h-[180px] bg-brand-primary left-1/2 top-[4rem] -translate-x-1/2 rounded-[40%] -z-1;
}

@keyframes fill {
    from {
        top: 100px;
        transform: translateX(-50%) rotate(0deg);
    }

    to {
        top: -50px;
        transform: translateX(-50%) rotate(360deg)
    }
}

</style>