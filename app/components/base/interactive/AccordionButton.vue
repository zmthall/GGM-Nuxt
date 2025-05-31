<template>
    <div :class="mainClass">
        <button :id :class="[buttonClass, 'text-xl']" @click="toggleActive">{{ label }}</button>
        <transition name="accordion">
            <div v-show="isActive" :class="['overflow-hidden max-h-[1000px]', contentClass]">
                <slot />
            </div>
        </transition>
    </div>
</template>

<script setup lang='ts'>
    const props = defineProps<{
        label: string;
        buttonClass?: string;
        contentClass?: string;
        mainClass?: string;
        id: string;
        activeId: string;
    }>()

    const emit = defineEmits<{
        (e: 'update:active-id', id: string): void
    }>()

    const isActive = computed(() => props.activeId === props.id)

    const toggleActive = () => {
        if(!isActive.value)
            return emit('update:active-id', props.id)
        
        emit('update:active-id', '')
    }
</script>

<style> 
.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.5s ease-in-out;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
}

</style>