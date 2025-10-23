<template>
  <div class="w-full h-[500px]">
    <!-- <iframe :class="styling" title="LocationMap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6265.717372007759!2d-104.62124542357637!3d38.25958338408484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8713a2e6affcecd5%3A0x4813ffececbc5e40!2s648%20S%20Union%20Ave%2C%20Pueblo%2C%20CO%2081004!5e0!3m2!1sen!2sus!4v1749863658977!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> -->
    <iframe 
      src="https://storage.googleapis.com/maps-solutions-tpixa5fk0l/locator-plus/znr2/locator-plus.html"
      width="100%" height="100%"
      style="border:0;"
      referrerpolicy="no-referrer-when-downgrade"
      :class="styling" title="LocationMap"
      loading="lazy" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  styling?: string;
}>()

</script>

<style>

</style>