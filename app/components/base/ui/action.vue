<template>
    <template v-if="to">
        <NuxtLink 
        :class="[
            { 'primary-style': isPrimary }, 
            { 'secondary-style': isSecondary },
            { 'cta-style group': isCTA },
            'inline-block button-style']" :to="to ?? '#'">
            <div :class="[{ 'group-hover:before:animate-fill group-hover:duration-[1.5s]': isCTA }, 'content-wrapper pointer-events-none']">
                <slot />
            </div>
        </NuxtLink>
    </template>
    <template v-else-if="href">
        <a 
        :class="[
            { 'primary-style': isPrimary },
            { 'secondary-style': isSecondary },
            { 'cta-style group': isCTA },
            'inline-block button-style']" :href="href ?? '#'" :target="newPage ? '_blank' : ''" :rel="linkRel"
        >
            <div :class="[{ 'group-hover:before:animate-fill group-hover:duration-[1.5s]': isCTA }, 'content-wrapper pointer-events-none']">
                <slot />
            </div>
        </a>
    </template>
    <template v-else>
        <button 
        :class="[
            { 'primary-style': isPrimary },
            { 'secondary-style': isSecondary },
            { 'cta-style group': isCTA },
            'button-style'
            ]" :type="type ?? 'button'" @click="emit('click')"
        >
            <div 
            :class="[{ 'group-hover:before:animate-fill group-hover:duration-[1.5s]': isCTA }, 'content-wrapper pointer-events-none']">
                <slot />
            </div>
        </button>
    </template>
</template>

<script setup lang='ts'>
import type { ButtonTypes, VariantType } from '@/app/models/BaseComponents';

defineOptions({
    name: 'BaseUiAction'
})

const emit = defineEmits<{
    (e: 'click'): void
}>()

const props = withDefaults(defineProps<{
    type?: ButtonTypes | undefined; // Used for buttons to distinguish type of button for accessibility
    variant?: VariantType; // this is different special looks for the button type VariantType = 'primary' | 'cta' | 'secondary'
    size?: string;
    href?: string | undefined;
    to?: string | undefined;
    disabled?: boolean;
    fullWidth?: boolean
    iconBefore?: string | undefined;
    iconAfter?: string | undefined;
    newPage?: boolean;
    noFollow?: boolean;
    ariaLabel?: string;
    bgDark?: boolean;
}>(), {
    type: undefined,
    variant: 'primary',
    size: 'normal',
    href: undefined,
    to: undefined,
    nuxt: false,
    disabled: false,
    fullWidth: false,
    newPage: false,
    noFollow: false,
    bgDark: false,
    iconBefore: undefined,
    iconAfter: undefined,
    ariaLabel: "Button"
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
    @apply font-semibold transition-colors duration-main ease-in-out rounded-md;
}
.primary-style {
    @apply bg-brand-primary text-white border-2 border-brand-secondary hover:bg-brand-secondary hover:text-brand-primary;
}

.secondary-style {
    @apply bg-brand-secondary text-brand-primary border-brand-primary border-2 hover:bg-brand-primary hover:text-white;
}
.cta-style {
    @apply bg-transparent border-2 border-brand-primary text-brand-primary hover:text-brand-secondary overflow-hidden duration-[0.5s];
}

.content-wrapper {
    @apply p-4 relative;
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