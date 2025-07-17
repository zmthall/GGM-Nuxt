<template>
  <div :class="['flex items-center gap-2', { 'flex-col min-[1175px]:flex-row': isAside }]">
    <button 
      title="Copy Link"
      @click="socialShare.copyLink"
    >
      <BaseIcon name="material-symbols:content-copy-outline-rounded" hover-color="hover:text-brand-link-hover" />
      <span class="sr-only">Copy Link</span>
    </button>
    <button 
      title="Share on Facebook"
      @click="socialShare.shareOnFacebook"
    >
      <BaseIcon name="mdi:facebook" hover-color="hover:text-brand-link-hover" />
      <span class="sr-only">Share on Facebook</span>
    </button>
    
    <button 
      title="Share on Twitter"
      @click="socialShare.shareOnTwitter"
    >
      <BaseIcon name="mdi:twitter" hover-color="hover:text-brand-link-hover" />
      <span class="sr-only">Share on Twitter</span>
    </button>

    <button 
      title="Share on LinkedIn"
      @click="socialShare.shareOnLinkedIn"
    >
      <BaseIcon name="mdi:linkedin" hover-color="hover:text-brand-link-hover" />
      <span class="sr-only">Share on LinkedIn</span>
    </button>
    <button 
      title="Share on Reddit"
      @click="socialShare.shareOnReddit"
    >
      <BaseIcon name="mdi:reddit" hover-color="hover:text-brand-link-hover" />
      <span class="sr-only">Share on Reddit</span>
    </button>
    <button 
      title="Share on Pinterest"
      @click="socialShare.shareOnPinterest"
    >
      <BaseIcon name="mdi:pinterest" hover-color="hover:text-brand-link-hover" />
      <span class="sr-only">Share on Pinterest</span>
    </button>
    <button 
      title="Share via Email"
      @click="socialShare.shareViaEmail"
    >
      <BaseIcon name="mdi:email" hover-color="hover:text-brand-link-hover" />
      <span class="sr-only">Share via Email</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
const socialShare = useSocialShare();

withDefaults(defineProps<{
  isAside?: boolean;
}>(), {
  isAside: false
})

</script>

<style>

</style>