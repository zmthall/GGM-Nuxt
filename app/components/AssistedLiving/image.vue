<template>
  <div class="mx-auto">
    <div class="relative mx-12 mt-6 mb-16 sm:my-20 xs:mt-16 xs:mb-20">
      <div v-if="imageLoaded" class="absolute h-[calc(90vw-88.5px)] acfsign:h-[375px] w-[calc(8vw-9.2px)] acfsign:w-8 bg-brand-primary z-1 left-0 -translate-x-full -top-[5%] top-ball shadow-primary rounded-md" />
      <NuxtImg src="/images/pages/assisted-living/Golden Gate Manor Sign.jpg" width="400px" height="300px" alt="Golden Gate Manor Assisted Living Sign" title="Golden Gate Manor Assisted Living Sign" loading="eager" placeholder class="h-auto aspect-[4/3] object-cover" @load="loadedImage" />
      <div v-if="imageLoaded" class="absolute h-[calc(90vw-88.5px)] acfsign:h-[375px] w-[calc(8vw-9.2px)] acfsign:w-8 bg-brand-primary z-1 right-0 translate-x-full -top-[5%] top-ball shadow-primary rounded-md" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const imageLoaded = ref<boolean>(false)

const loadedImage = () => {
  imageLoaded.value = !imageLoaded.value;
}

</script>

<style scoped>
.top-ball {
  @apply before:h-[calc(10vw-11.5px)] before:w-[calc(10vw-11.5px)] before:acfsign:h-10 before:acfsign:w-10  before:bg-brand-primary before:absolute before:top-[2px] before:left-1/2 before:rounded-full before:-translate-y-full before:-translate-x-1/2;
}
</style>