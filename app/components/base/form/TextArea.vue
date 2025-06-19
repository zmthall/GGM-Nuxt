<template>
<div class="w-full">
    <label v-if="name" :for="name" class="font-extrabold text-xs inline-block mb-1 text-brand-primary">{{ smartCapitalize(label) }}</label>
    <textarea
        :id="name"
        v-model="textValue"
        :name="name"
        rows="5"
        :class="['resize-none border-2 w-full rounded-md p-1 text-sm font-semibold text-gray-900 hover:border-brand-primary/50 bg-gray-50 focus-visible:outline-none focus:border-brand-primary focus:shadow-input']" :placeholder="placeholder" />
</div>
</template>

<script setup lang='ts'>
defineOptions({
    name: 'BaseFormTextarea'
})

defineProps<{
    name?: string | undefined;
    placeholder?: string | undefined;
    label?: string | undefined
}>()

const smartCapitalize = (text: string | undefined) => {
  if (!text) return ''
  return text
    .split(' ')
    .map(word => {
      // Don't capitalize words in parentheses
      if (word.startsWith('(') && word.endsWith(')')) {
        return word.charAt(0) + word.charAt(1).toUpperCase() + word.slice(2)
      }
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

const textValue = defineModel<string>();
</script>

<style>

</style>