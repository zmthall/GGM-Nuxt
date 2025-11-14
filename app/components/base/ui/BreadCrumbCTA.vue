<template>
  <div class="relative sm:h-[1px] max-sm:mt-4 max-sm:flex max-sm:justify-center">
    <BaseUiAction :href class="sm:absolute sm:bottom-[calc(0.3rem+1px)] right-8 px-4 sm:px-2 py-2 sm:py-[0.1rem] group text-sm" styling="flex items-center" title="Opens in new tab" :new-page="true" :class="styling" @click.passive="emit('ab-test-click')">
      <BaseIcon name="stash:new-window-page" size="size-6" color="text-brand-secondary" hover-color="group-hover:text-brand-primary" class="transition-colors ease-in-out duration-500" />
      <div>
        <slot />
      </div>
    </BaseUiAction>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  styling?: string;
  href: string;
}>()

const emit = defineEmits<{
  (e: 'ab-test-click'): void;
}>()
</script>

<style>

</style>