<template>
  <div :class="['p-2 bg-zinc-300/80 rounded-lg md:max-w-none flex flex-col items-center shadow-light', { 'max-w-40': isAside }]">
    <h2 class="mb-2 font-bold text-xl text-center whitespace-nowrap text-brand-primary/65">Share This Post</h2>
    <div :class="['flex items-center justify-center gap-2 flex-wrap']">
      <button 
        title="Copy Link"
        @click="socialShare.copyLink"
      >
        <BaseIcon name="material-symbols:content-copy-outline-rounded" size="size-[26px]" color="text-brand-primary/50" hover-color="hover:text-brand-primary" />
        <span class="sr-only">Copy Link</span>
      </button>
      <button 
        title="Share on Facebook"
        @click="socialShare.shareOnFacebook"
      >
        <BaseIcon name="mdi:facebook" size="size-[26px]" color="text-brand-primary/50" hover-color="hover:text-brand-primary" />
        <span class="sr-only">Share on Facebook</span>
      </button>
      
      <button 
        title="Share on Twitter"
        @click="socialShare.shareOnTwitter"
      >
        <BaseIcon name="mdi:twitter" size="size-[26px]" color="text-brand-primary/50" hover-color="hover:text-brand-primary" />
        <span class="sr-only">Share on Twitter</span>
      </button>
  
      <button 
        title="Share on LinkedIn"
        @click="socialShare.shareOnLinkedIn"
      >
        <BaseIcon name="mdi:linkedin" size="size-[26px]" color="text-brand-primary/50" hover-color="hover:text-brand-primary" />
        <span class="sr-only">Share on LinkedIn</span>
      </button>
      <button 
        title="Share on Reddit"
        @click="socialShare.shareOnReddit"
      >
        <BaseIcon name="mdi:reddit" size="size-[26px]" color="text-brand-primary/50" hover-color="hover:text-brand-primary" />
        <span class="sr-only">Share on Reddit</span>
      </button>
      <button 
        title="Share on Pinterest"
        @click="socialShare.shareOnPinterest"
      >
        <BaseIcon name="mdi:pinterest" size="size-[26px]" color="text-brand-primary/50" hover-color="hover:text-brand-primary" />
        <span class="sr-only">Share on Pinterest</span>
      </button>
      <button 
        title="Share via Email"
        @click="socialShare.shareViaEmail"
      >
        <BaseIcon name="mdi:email" size="size-[26px]" color="text-brand-primary/50" hover-color="hover:text-brand-primary" />
        <span class="sr-only">Share via Email</span>
      </button>
    </div>
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