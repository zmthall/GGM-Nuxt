<template>
    <div class="relative w-full mt-4">
        <label v-if="name" :for="name" class="font-extrabold text-xs inline-block mb-1 text-brand-primary capitalize">{{
            label }}</label>
        <input 
            :id="name" ref="inputRef" v-model="textValue" :name="name"
            :class="['border-2 w-full rounded-md p-1 text-base font-semibold text-gray-900 hover:border-brand-primary/50 bg-gray-50 focus-visible:outline-none focus:border-brand-primary focus:shadow-input']"
            :type :placeholder :autocomplete>
        <button 
            v-if="isPassword" :class="['absolute flex items-center right-4 cursor-pointer', {'top-1/2 -translate-y-1/2': !hasLabel, 'top-[57%]': hasLabel}]"
            type="button"
            @click="toggleShowPassword">
            <BaseIcon 
                v-if="isPasswordShown" name="solar:eye-closed-bold" size="size-5" color="text-gray-200"
                hover-color="hover:text-brand-primary" />
            <BaseIcon 
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
    autocomplete?: string;
}>(), {
    type: "text",
    placeholder: undefined,
    name: undefined,
    label: undefined,
    autocomplete: 'off'
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

const hasLabel = computed(() => {
    if (props.label)
        return props.label.length > 0
    else return false
})

const textValue = defineModel<string>();
</script>

<style></style>