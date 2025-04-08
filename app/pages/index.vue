<template>
    <div>
        Home Page
        <div class="px-8">
            <BaseFormToggleSwitch v-model='testing' name="test" label="Testing"/>
        </div>
    </div>
</template>

<script setup lang='ts'>
defineOptions({
    name: 'HomePage'
})

const testing = ref<boolean>(true)

watch(testing, (newValue) => {
    console.log(newValue)
})

</script>

<style>

</style>