<template>
  <div class="flex justify-center !my-8">
    <BaseUiAction :to :href :variant :styling>
      <slot mdc-unwrap="p" />
    </BaseUiAction>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  to?: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'blank'
  styling?: string;
}>()

</script>

<style>

</style>