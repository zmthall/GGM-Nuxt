<template>
  <div :class="[{'before:w-2 before:bg-brand-primary before:rounded-lg before:absolute before:h-[110%] before:left-0 before:top-1/2 before:-translate-y-1/2 pl-4 my-4': hasLeftBorder, 'relative': hasIcon || hasLeftBorder}, padding, 'my-4']">
    <BaseIcon v-if="hasIcon" :size="iconSize" :name="iconName" class="absolute left-0 top-1/2 -translate-y-1/2"/>
    <div class="text-lg">
      <h3 v-if="title" class="text-xl font-bold">{{ title }}</h3>
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  title?: string;
  hasIcon?: boolean;
  hasLeftBorder?: boolean;
  iconName?: string;
  size?: number;
}>(), {
  title: undefined,
  size: undefined,
  hasIcon: false,
  iconName: '',
  hasLeftBorder: false
})

const padding = computed(() => {
  const map: Record<number, string> = {
    2: 'pl-4',
    4: 'pl-6',
    6: 'pl-8',
    8: 'pl-10',
    10: 'pl-12',
    12: 'pl-14',
    14: 'pl-16',
  }
  return props.size !== undefined ? map[props.size] ?? '' : ''
})

const iconSize = computed(() => {
  const map: Record<number, string> = {
    2: 'size-2',
    4: 'size-4',
    6: 'size-6',
    8: 'size-8',
    10: 'size-10',
    12: 'size-12',
    14: 'size-14',
  }
  return props.size !== undefined ? map[props.size] ?? 'size-8' : 'size-8'
})
</script>

<style>

</style>