<template>
  <BaseUiAction :to variant="blank" class="w-[225px] h-[225px] group flex items-center justify-center border-2 border-zinc-300 hover:border-brand-primary transition-colors duration-500 ease-in-out rounded-2xl">
    <div class="text-center p-2">
      <BaseIcon :name class="transition-colors ease-in-out duration-500" color="text-zinc-300" hover-color="group-hover:text-brand-primary" size="size-20"/>
      <div class="opacity-50 group-hover:opacity-100 transition-opacity ease-in-out duration-500">
        <h2 class="text-2xl font-bold group-hover:text-brand-primary transition-colors duration-500 ease-in-out">
          {{ title }}
        </h2>
        <p>{{ message }}</p>
      </div>
    </div>
  </BaseUiAction>
</template>

<script lang="ts" setup>
defineProps<{
  to: string;
  name: string;
  title: string;
  message: string;
}>()

</script>

<style>

</style>