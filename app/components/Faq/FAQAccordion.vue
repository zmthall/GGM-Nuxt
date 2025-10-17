<template>
  <Transition name="fade" mode="out-in">
    <KeepAlive :max="4">
      <LazyFaqGGMTAccordion v-if="activeNavId==='ggmt'" key="ggmt" />
      <LazyFaqGGMSAccordion v-else-if="activeNavId==='ggms'" key="ggms" />
      <LazyFaqGGALAccordion v-else-if="activeNavId==='ggal'" key="ggal" />
      <LazyFaqGGMCAccordion v-else key="ggmc" />
    </KeepAlive>
  </Transition>
</template>

<script lang="ts" setup>
const activeNavId = defineModel<string>();

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