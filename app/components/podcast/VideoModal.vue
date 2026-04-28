<template>
  <BaseInteractiveModal
    v-model="modalOpen"
    custom-modal="w-full max-w-5xl"
    :padding="4"
    @close="handleClose"
  >
    <template #default>
      
      <div v-if="activePodcast" class="w-full h-full flex flex-col">
          <!-- Video -->
        <div class="w-full flex-1">
          <iframe
            v-if="modalOpen"
            :src="iframeSrc"
            class="w-full h-full aspect-video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
        </div>

      </div>

    </template>
  </BaseInteractiveModal>
</template>

<script setup lang="ts">
const modalOpen = ref(false)

const activePodcast = ref<{
  title: string
  youtubeId: string
} | null>(null)

const iframeSrc = computed(() => {
  if (!activePodcast.value) return ''
  return `https://www.youtube-nocookie.com/embed/${activePodcast.value.youtubeId}?autoplay=1&playsinline=1`
})

function open(podcast: { title: string; youtubeId: string }) {
  activePodcast.value = podcast
  modalOpen.value = true
  document.body.classList.add('no-scroll')
}

function handleClose() {
  modalOpen.value = false
  activePodcast.value = null
  document.body.classList.remove('no-scroll')
}

defineExpose({
  open
})
</script>