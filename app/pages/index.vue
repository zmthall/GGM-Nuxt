<template>
    <div>
        Home Page
        <div class="px-8">
            <BaseFormInput />
            <BaseFormSelect v-model="testing"/>
        </div>
    </div>
</template>

<script setup lang='ts'>
defineOptions({
    name: 'HomePage'
})

const testing = ref<string>('testing')

watch(testing, (newValue) => {
    console.log(newValue)
})

</script>

<style>

</style>