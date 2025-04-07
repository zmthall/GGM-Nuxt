<template>
    <div>
        Home Page
        <div class="flex px-8">
            <BaseFormRadios v-model="testing" name="testing" :values="['test1', 'test2']" :labels="['Test 1', 'Test 2']"/>
        </div>
    </div>
</template>

<script setup lang='ts'>
defineOptions({
    name: 'HomePage'
})

const testing = ref('test1')


watch(testing, (newValue) => {
    console.log(newValue)
})
</script>

<style>

</style>