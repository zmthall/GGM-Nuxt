<template>
  <div class="w-full max-w-2xl">
    <h2 v-if="label" class="font-extrabold text-lg inline-block mb-1 text-brand-primary capitalize">{{ label }}</h2>
    
    <!-- File Upload Area (shown when no image) -->
    <label
      v-if="!uploadedImage"
      class="relative border-2 hover:border-brand-primary border-brand-primary/50 bg-white hover:bg-zinc-200 rounded-lg flex flex-col p-16 cursor-pointer group hover:shadow-input transition-color duration-500 ease-in-out"
      :for="name" 
      @dragenter.prevent 
      @dragleave.prevent 
      @dragover.prevent 
      @drop.prevent="handleDrop"
    >
      <input 
        :id="name" 
        ref="fileUploadInput" 
        type="file" 
        :name 
        class="hidden" 
        accept="image/*"
        @input.prevent="handleInput"
      >
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center font-bold text-brand-primary/50 group-hover:text-brand-primary transition-color duration-500 ease-in-out">
        <span>Click to add image</span>
        <span>or</span>
        <span>Drop image within</span>
      </div>
    </label>

    <!-- Cropper Area (shown when image is uploaded) -->
    <div v-if="uploadedImage" class="relative">
      <div class="border-2 border-brand-primary/50 rounded-lg overflow-hidden bg-gray-100">
        <Cropper
          ref="cropperRef"
          :src="uploadedImage"
          class="cropper"
          :stencil-props="computedStencilProps"
          @change="onCropChange"
        />
      </div>
      
      <!-- Delete button in bottom left -->
      <button
        title="Delete Image"
        class="absolute bottom-2 left-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors duration-200 z-10 flex"
        @click="deleteImage"
      >
        <BaseIcon name="material-symbols:delete-forever" size="size-5" color="text-white" />
      </button>
    </div>

    <!-- Alt Text Input (shown when image exists) -->
    <div v-if="uploadedImage" class="mt-4">
      <BaseFormInput v-model="altText" type="text" name="alt-text-input" label="Alt Text" placeholder="Describe this image..."/>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import type { ImageDataFile } from '../../../models/ImagesData.js'

defineOptions({
  name: 'BaseImageUploadCropper'
})

interface CropResult {
  coordinates: {
    width: number
    height: number
    left: number
    top: number
  }
  canvas: HTMLCanvasElement
}

interface StencilProps {
  aspectRatio?: number
  [key: string]: unknown
}

const props = withDefaults(defineProps<{
  name: string
  label?: string
  aspectRatio?: number
  maxSize?: number
  stencilProps?: StencilProps
  slotIndex?: number | null
}>(), {
  label: undefined,
  aspectRatio: undefined,
  maxSize: 10485760,
  stencilProps: () => ({}),
  slotIndex: 0
})

const imageData = defineModel<ImageDataFile>()

const fileUploadInput = ref<HTMLInputElement | null>(null)
const cropperRef = ref<InstanceType<typeof Cropper> | null>(null)
const uploadedImage = ref<string>('')
const altText = ref<string>('')
const currentFile = ref<File | null>(null)
const cropResult = ref<CropResult | null>(null)

// Add aspect ratio to stencil props if provided
const computedStencilProps = computed(() => {
  const baseProps = { ...props.stencilProps }
  if (props.aspectRatio) {
    baseProps.aspectRatio = props.aspectRatio
  }
  return baseProps
})

const handleDrop = (event: DragEvent) => {
  const files = event.dataTransfer?.files as FileList
  if (files && files[0]) {
    processFile(files[0])
  }
}

const handleInput = (event: Event) => {
  const files = (event.target as HTMLInputElement).files as FileList
  if (files && files[0]) {
    processFile(files[0])
  }
}

const processFile = (file: File) => {
  // Validate file type
  if (!file.type.startsWith('image/')) {
    alert('Please select an image file')
    return
  }

  // Validate file size
  if (file.size > props.maxSize) {
    alert(`File size must be less than ${(props.maxSize / 1024 / 1024).toFixed(1)}MB`)
    return
  }

  currentFile.value = file
  
  // Create object URL for the cropper
  const reader = new FileReader()
  reader.onload = (e) => {
    uploadedImage.value = e.target?.result as string
  }
  reader.readAsDataURL(file)

  // Reset file input
  if (fileUploadInput.value) {
    fileUploadInput.value.value = ''
  }
}

const onCropChange = (result: CropResult) => {
  cropResult.value = result
  updateCroppedFile()
}

const updateImageData = () => {
  if (currentFile.value) {
    imageData.value = {
      file: currentFile.value,
      alt: altText.value
    }
  }
}

const updateCroppedFile = async () => {
  if (cropResult.value && currentFile.value) {
    try {
      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve) => {
        cropResult.value!.canvas.toBlob((blob) => {
          resolve(blob!)
        }, currentFile.value!.type, 0.9) // Use original file type, 90% quality
      })
      
      // Create new File from blob
      const fileName = `${props.slotIndex}.${currentFile.value.name.split('.').pop()}`
      const croppedFile = new File([blob], fileName, { 
        type: currentFile.value.type,
        lastModified: Date.now()
      })
      
      // Update imageData with cropped file
      imageData.value = {
        file: croppedFile,
        alt: altText.value
      }
    } catch (error) {
      console.error('Failed to create cropped file:', error)
    }
  }
}

const deleteImage = () => {
  uploadedImage.value = ''
  altText.value = ''
  currentFile.value = null
  cropResult.value = null
  
  // Set to proper empty state instead of undefined
  imageData.value = {
    file: null,
    alt: ''
  }
  
  // Revoke object URL to prevent memory leaks
  if (uploadedImage.value.startsWith('blob:')) {
    URL.revokeObjectURL(uploadedImage.value)
  }
}

// Watch for external imageData changes (when editing existing images)
watch(() => imageData.value, (newData) => {
  if (newData?.file && !currentFile.value) {
    // External file was set, display it in the cropper
    currentFile.value = newData.file
    altText.value = newData.alt || ''
    
    // Create display URL for the cropper
    const reader = new FileReader()
    reader.onload = (e) => {
      uploadedImage.value = e.target?.result as string
    }
    reader.readAsDataURL(newData.file)
  }
}, { deep: true, immediate: true })

// Watch alt text changes
watch(altText, () => {
  if (cropResult.value) {
    updateCroppedFile() // Update with cropped file when alt text changes
  } else if (currentFile.value) {
    updateImageData() // Update with original file if no crop yet
  }
})

// Update v-model when file is uploaded
watch(currentFile, () => {
  if (currentFile.value) {
    updateImageData() // Start with original file, will be replaced when cropped
  }
})

// Cleanup on unmount
onUnmounted(() => {
  if (uploadedImage.value.startsWith('blob:')) {
    URL.revokeObjectURL(uploadedImage.value)
  }
})
</script>

<style scoped>
.cropper {
  height: 400px;
  background: #DDD;
}
</style>