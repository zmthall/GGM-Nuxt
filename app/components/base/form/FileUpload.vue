<template>
    <div class="mx-4 mt-4 max-w-[400px]">
        <label
            class="relative border-2 hover:border-brand-primary border-brand-primary/50 bg-white hover:bg-zinc-200 rounded-lg flex flex-col p-16 cursor-pointer group hover:shadow-input transition-color duration-500 ease-in-out"
            :for="name" @dragenter.prevent @dragleave.prevent @dragover.prevent @drop.prevent="handleDrop">
            <input :id="name" ref="fileUploadInput" type="file" :name class="hidden" :multiple @input.prevent="handleInput">
            <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center font-bold text-brand-primary/50 group-hover:text-brand-primary transition-color duration-500 ease-in-out">
                <span>Click to add files</span><span>or</span><span>Drop files within</span>
            </div>
        </label>
        <div>
            <transition-group
                v-if="fileData"
                name="fade-file"
                tag="ul"
                class="flex flex-col gap-2 my-2"
            >
                <li v-for="(fileWrapper, idx) in fileData" :key="fileWrapper.id">
                    <div class="flex justify-between items-center">
                        <span>{{ fileName(fileWrapper.file.name, 15) }}</span>
                        <span>{{ fileSizeMB(fileWrapper.file.size) }}</span>
                        <button class="cursor-pointer flex" @click="deleteFile(idx)">
                            <BaseIcon name="material-symbols:delete-forever" color="text-brand-primary/50" hover-color="hover:text-brand-primary" />
                        </button>
                    </div>
                </li>
            </transition-group>
        </div>
    </div>
</template>

<script setup lang='ts'>
import type { FileWrapper } from '../../../models/BaseComponents.js';
import { nanoid } from 'nanoid';

defineOptions({
    name: 'BaseFormFileUpload'
})

const props = withDefaults(defineProps<{
    name: string;
    multiple?: boolean
    maxSize?: number;
}>(), {
    multiple: false,
    maxSize: 10485760
})

const fileData = defineModel<FileWrapper[] >()

const fileUploadInput = ref<HTMLInputElement | null>(null)

const toFileWrapper = (file: File): FileWrapper => ({
  id: nanoid(10),
  file
})

const handleDrop = (event: DragEvent) => { // event.dataTransfer?.files typing Files[]
    const files = event.dataTransfer?.files as FileList;
    const wrappedFiles = Array.from(files).map(toFileWrapper)
    if (wrappedFiles.length > 0 && props.multiple) fileData.value?.push(...wrappedFiles)
    else if(wrappedFiles.length > 0 && !props.multiple) fileData.value = [...wrappedFiles]

    if(fileUploadInput.value)
        fileUploadInput.value.value = ''
}

const handleInput = (event: Event) => {
    const files = (event.target as HTMLInputElement).files as FileList;
    const wrappedFiles = Array.from(files).map(toFileWrapper)
    if (wrappedFiles.length > 0 && props.multiple) fileData.value?.push(...wrappedFiles)
    else if(wrappedFiles.length > 0 && !props.multiple) fileData.value = [...wrappedFiles]

    if(fileUploadInput.value)
        fileUploadInput.value.value = ''
}

const fileSizeMB = (size: number) => {
    return `${(size / 1024 / 1024).toFixed(2)} MB`;
}

const fileName = (name: string, maxLength: number) => {
    if(name.length > maxLength)
        return `${name.slice(0, maxLength).trimEnd()}...`
    else return name
}

const deleteFile = (idx: number) => {
    if(fileData.value && fileData.value.length > 0)
        fileData.value.splice(idx, 1)
}
</script>

<style>
.fade-file-enter-active,
.fade-file-leave-active {
  transition: opacity 0.3s ease;
}

.fade-file-enter-from,
.fade-file-leave-to {
  opacity: 0;
}


</style>

<style scoped>
.fade-file-enter-active {
  transition-delay: 0.3s;
}
</style>