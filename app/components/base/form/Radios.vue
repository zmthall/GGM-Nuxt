<template>
  <div v-for="(value, idx) in values" :key="value">
    <BaseFormRadio v-model="checkedValue" :value :name >{{ labels[idx] }}</BaseFormRadio>
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
  name: string;
}>()


</script>

<style>

</style>