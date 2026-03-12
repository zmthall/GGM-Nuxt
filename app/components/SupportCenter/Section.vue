<template>
  <div class="flex gap-4 items-center mt-8 flex-row flex-wrap justify-center">
    <SupportCenterTile to="/company/contact-us" name="material-symbols:android-contacts" :title="$t('home.support-section.tiles.contact.title')" :message="$t('home.support-section.tiles.contact.paragraph')" />
    <SupportCenterTile to="/resources/faq" name="emojione-monotone:question-mark" :title="$t('home.support-section.tiles.faq.title')" :message="$t('home.support-section.tiles.faq.paragraph')" />
    <SupportCenterTile to="/resources/support-center/qualify" name="lucide-clipboard-check" :title="$t('home.support-section.tiles.qualify.title')" :message="$t('home.support-section.tiles.qualify.paragraph')" />
    <SupportCenterTile to="/resources/support-center/prepare-for-first-ride" name="mdi-seatbelt" :title="$t('home.support-section.tiles.first-ride.title')" :message="$t('home.support-section.tiles.first-ride.paragraph')" />
    <SupportCenterTile to="/resources/support-center/schedule-a-ride" name="heroicons-outline:calendar-days" :title="$t('home.support-section.tiles.scheduling.title')" :message="$t('home.support-section.tiles.scheduling.paragraph')" />
    <SupportCenterTile to="/resources/support-center/requesting-accessible-van" name="mdi:van-passenger" :title="$t('home.support-section.tiles.requesting-van.title')" :message="$t('home.support-section.tiles.requesting-van.paragraph')" />
    <!-- <SupportCenterTile to="/resources/support-center/request-assisted-care" name="heroicons-solid:heart" :title="$t('home.support-section.tiles.request-assisted-care.title')" :message="$t('home.support-section.tiles.request-assisted-care.paragraph')" />
    <SupportCenterTile to="/resources/support-center/ordering-medical-supplies" name="mdi-medical-bag" :title="$t('home.support-section.tiles.ordering-medical-supplies.title')" :message="$t('home.support-section.tiles.ordering-medical-supplies.paragraph')" class="md:col-start-2" /> -->
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>