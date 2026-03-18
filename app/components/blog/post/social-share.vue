<template>
  <div :class="['relative w-full rounded-[4px] bg-brand-metallic-soft shadow-xlight', isAside ? 'max-w-none' : 'md:max-w-none']">
    <div class="pointer-events-none absolute inset-0 z-1 rounded-[4px] bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.10)_18%,rgba(255,255,255,0.24)_30%,rgba(255,255,255,0.08)_42%,transparent_58%),linear-gradient(180deg,rgba(255,255,255,0.10)_0%,transparent_36%)]" />
    <div class="pointer-events-none absolute -left-10 top-0 z-1 h-24 w-2/3 rotate-[-8deg] bg-white/12 opacity-70 blur-2xl" />
    <div :class="['relative z-2 w-full', isAside ? 'px-1.5 py-2 max-[1000px]:px-1 max-[1000px]:py-1.5' : 'px-3 py-3']">
      <h2 :class="['font-bold text-center whitespace-nowrap text-brand-primary/60', isAside ? 'mb-1.5 text-[clamp(0.8rem,0.45rem+0.9vw,1.35rem)] leading-none max-[1000px]:mb-1' : 'mb-2 text-xl']">
        Share This Post
      </h2>

      <div :class="['mx-auto flex w-full flex-wrap items-center justify-center', isAside ? 'gap-1.5 max-[1000px]:gap-1' : 'gap-2']">
        <button title="Copy Link" @click="socialShare.copyLink">
          <BaseIcon name="material-symbols:content-copy-outline-rounded" :size="isAside ? 'size-[clamp(20px,10px+1vw,35px)]' : 'size-[26px]'" color="text-brand-primary/50" hover-color="hover:text-brand-primary" />
          <span class="sr-only">Copy Link</span>
        </button>

        <button title="Share on Facebook" @click="socialShare.shareOnFacebook">
          <BaseIcon name="mdi:facebook" :size="isAside ? 'size-[clamp(20px,10px+1vw,35px)]' : 'size-[26px]'" color="text-brand-primary/50" hover-color="hover:text-brand-primary" />
          <span class="sr-only">Share on Facebook</span>
        </button>

        <button title="Share on Twitter" @click="socialShare.shareOnTwitter">
          <BaseIcon name="mdi:twitter" :size="isAside ? 'size-[clamp(20px,10px+1vw,35px)]' : 'size-[26px]'" color="text-brand-primary/50" hover-color="hover:text-brand-primary" />
          <span class="sr-only">Share on Twitter</span>
        </button>

        <button title="Share on LinkedIn" @click="socialShare.shareOnLinkedIn">
          <BaseIcon name="mdi:linkedin" :size="isAside ? 'size-[clamp(20px,10px+1vw,35px)]' : 'size-[26px]'" color="text-brand-primary/50" hover-color="hover:text-brand-primary" />
          <span class="sr-only">Share on LinkedIn</span>
        </button>

        <button title="Share on Reddit" @click="socialShare.shareOnReddit">
          <BaseIcon name="mdi:reddit" :size="isAside ? 'size-[clamp(20px,10px+1vw,35px)]' : 'size-[26px]'" color="text-brand-primary/50" hover-color="hover:text-brand-primary" />
          <span class="sr-only">Share on Reddit</span>
        </button>

        <button title="Share on Pinterest" @click="socialShare.shareOnPinterest">
          <BaseIcon name="mdi:pinterest" :size="isAside ? 'size-[clamp(20px,10px+1vw,35px)]' : 'size-[26px]'" color="text-brand-primary/50" hover-color="hover:text-brand-primary" />
          <span class="sr-only">Share on Pinterest</span>
        </button>

        <button title="Share via Email" @click="socialShare.shareViaEmail">
          <BaseIcon name="mdi:email" :size="isAside ? 'size-[clamp(20px,10px+1vw,35px)]' : 'size-[26px]'" color="text-brand-primary/50" hover-color="hover:text-brand-primary" />
          <span class="sr-only">Share via Email</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const socialShare = useSocialShare()

withDefaults(defineProps<{
  isAside?: boolean
}>(), {
  isAside: false
})
</script>

<style>
</style>