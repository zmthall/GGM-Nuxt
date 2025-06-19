<template>
  <div>
    <label v-if="name" :for="name" class="font-extrabold text-xs inline-block mb-1 text-brand-primary capitalize">{{ label }}</label>
    <div :class="styling">
      <div v-for="(value, idx) in values" :key="value">
        <BaseFormRadio v-model="checkedValue" :value :name >{{ labels[idx] }}</BaseFormRadio>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'BaseFormRadios'
})

const checkedValue = defineModel<string>()

defineProps<{
  values: string[];
  labels: string[];
  label?: string;
  styling?: string;
  name: string;
}>()


</script>

<style>

</style>