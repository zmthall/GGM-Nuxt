<template>
  <div class="relative min-h-[120px] mt-8 md:mt-16 md:mx-16">

    <!-- ARROW BACKGROUND -->
    <div
      :class="[
        'absolute inset-0 arrow',
        {
          'bg-green-700': color === 'green',
          'bg-red-700': color === 'red'
        }
      ]"
    ></div>

    <!-- NUMBER -->
    <div
      v-if="$slots.number"
      class="absolute h-[120px] w-[120px] shadow-primary -top-4 -left-12 max-md:top-0 max-md:left-0 bg-white flex justify-center items-center text-4xl font-bold z-10"
    >
      <slot name="number" />
    </div>

    <!-- CONTENT -->
    <div
      :class="[
        'relative z-10 px-6 py-4 pl-24',
        {
          'text-white': color === 'green' || color === 'red'
        }
      ]"
    >
      <slot name="default" />
    </div>

  </div>
</template>

<script lang="ts" setup>
defineProps<{
  color: "green" | "red"
}>()
</script>

<style scoped>
.arrow {
  height: 100%;
  clip-path: polygon(
    0 0,
    calc(100% - 60px) 0,
    100% 50%,
    calc(100% - 60px) 100%,
    0 100%
  );
}
</style>