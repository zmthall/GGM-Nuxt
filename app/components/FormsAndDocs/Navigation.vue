<template>
  <div>
    <Transition name="fade" mode="out-in">
    <KeepAlive :max="4">
      <LazyFormsAndDocsGGMTAccordion v-if="activeNavId==='ggmt'" key="ggmt" />
      <LazyFormsAndDocsGGMSAccordion v-else-if="activeNavId==='ggms'" key="ggms" />
    </KeepAlive>
  </Transition>
  </div>
</template>

<script lang="ts" setup>

const activeNavId = defineModel<string>()

</script>

<style scoped>
  /* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>