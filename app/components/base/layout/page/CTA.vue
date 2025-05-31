<template>
    <section class="w-full bg-brand-primary text-white py-12 px-4 sm:px-8">
      <div class="max-w-6xl mx-auto text-center space-y-4">
        <h2 class="text-2xl sm:text-4xl font-extrabold">
          {{ title }}
        </h2>
        <p v-if="description" class="text-sm sm:text-base max-w-2xl mx-auto">
          {{ description }}
        </p>
        <div class="mt-6">
            <slot />
            <BaseUiAction v-if="hasButton" variant="secondary" :to styling="py-4 px-8 mt-4">
              {{ buttonLabel }}
            </BaseUiAction>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  withDefaults(defineProps<{
    title: string
    description?: string
    buttonLabel: string
    to: string;
    hasButton?: boolean
  }>(), {
    description: undefined,
    hasButton: true
  })
  </script>  