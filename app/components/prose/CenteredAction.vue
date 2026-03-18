<template>
  <div class="flex justify-center !my-6">
    <BaseUiAction :to :href :variant :styling new-page>
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