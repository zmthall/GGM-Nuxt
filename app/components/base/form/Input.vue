<template>
    <div class="relative w-full mt-4">
        <label v-if="name" :for="name" class="font-extrabold text-xs inline-block mb-1">{{ label }}</label>
        <input 
            :id="name"
            ref="inputRef"
            :name="name"
            :class="['border-2 w-full rounded-md p-1 text-sm font-semibold text-gray-900 hover:border-brand-primary/50 bg-gray-50 focus-visible:outline-none focus:border-brand-primary focus:shadow-input']"
            :type="type" :placeholder="placeholder">
        <button 
            v-if="isPassword"
            class="absolute top-1/2 -translate-y-1/2 flex items-center right-4 cursor-pointer"
            @click="toggleShowPassword">
            <BaseUiIcon 
                v-if="isPasswordShown" name="solar:eye-closed-bold" size="size-5" color="text-gray-200"
                hover-color="hover:text-brand-primary" />
            <BaseUiIcon 
                v-else name="solar:eye-bold" size="size-5" color="text-gray-200"
                hover-color="hover:text-brand-primary" />
        </button>
    </div>
</template>


<script setup lang='ts'>
defineOptions({
    name: 'BaseFormInput'
})

const showPassword = ref(false);
const inputRef = ref<HTMLInputElement | null>(null)

const props = withDefaults(defineProps<{
    type?: "text" | "number" | "email" | "password";
    name?: string | undefined;
    placeholder?: string | undefined;
    label?: string | undefined
}>(), {
    type: "text",
    placeholder: undefined,
    name: undefined,
    label: undefined
})

const isPassword = computed(() => {
    return props.type === 'password'
})

const isPasswordShown = computed(() => {
    if (props.type === 'password')
        return showPassword.value
    else return false;
})

const toggleShowPassword = () => {
    if (props.type === 'password' && !showPassword.value) {
        if (inputRef.value) {
            inputRef.value.setAttribute('type', 'text')
            showPassword.value = true;
        }
    } else {
        if (inputRef.value) {
            inputRef.value.setAttribute('type', 'password')
            showPassword.value = false;
        }
    }
}
</script>

<style></style>