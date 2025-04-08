<template>
    <div>
        Home Page
        <div class="px-8">
            <BaseFormInput />
            <BaseFormSelect v-model="testing" :values="['testing', 'test1', 'test2']" :labels="['Testing', 'Test 1', 'Test 2']" />
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