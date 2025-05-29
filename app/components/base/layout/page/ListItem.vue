<template>
  <div :class="[{'border-l-4 pl-4 border-l-brand-primary': hasLeftBorder, 'relative pl-14': hasIcon}]">
    <BaseIcon v-if="hasIcon" :size="iconSize" :name="iconName" class="absolute left-0 top-1/2 -translate-y-1/2"/>
    <div class="text-lg">
      <h3 v-if="title" class="text-xl font-bold">{{ title }}</h3>
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  title?: string;
  hasIcon?: boolean;
  hasLeftBorder?: boolean;
  iconName: string;
  iconSize?: string;
}>(), {
  title: undefined,
  iconSize: 'size-12',
  hasIcon: false,
  hasLeftBorder: false
})

</script>

<style>

</style>