<template>
  <BaseLayoutPageContainer>
    <!-- Business Location Map -->
    <BaseLayoutPageSection margin="pTop">
      <!-- <BaseInteractiveLocationMap styling="w-full h-[500px]" /> -->
       <BaseInteractiveBusinessLocator mode="click" facade-src="/images/pages/location/location-placeholder-map.png" facade-alt="Google maps view of central Pueblo and Pueblo South side showing Golden Gate Manor Inc locations as map marker icons"/>
    </BaseLayoutPageSection>

    <!-- Business Information -->
    <DeferRender when="visible">
      <BaseLayoutPageSection margin="default" class="cv-auto">
        <div>
          <BaseLayoutPageListItem has-left-border class="my-4 font-bold">
            <h2 class="text-2xl text-brand-primary mb-4">Contact Information</h2>
            <p><span>{{ company.name }}</span></p>
            <p><span>Address: </span><a href="https://maps.app.goo.gl/gdz3Pwu5c1M24grU7" rel="noopener noreferrer" target="_blank" class="link">{{ company.address }}</a></p>
            <p><span>Phone: </span><a :href="`tel:${company.phone}`" class="link">{{ company.phone }}</a></p>
          </BaseLayoutPageListItem>
          <BaseLayoutPageListItem has-left-border class="mt-12 font-bold">
            <h2 class="text-2xl font-bold text-brand-primary mb-4">Reservation Hours</h2>
            <p class="border-b border-b-black w-max">{{ company.hours }}</p>
          </BaseLayoutPageListItem>
          <BaseLayoutPageListItem class="mt-12 font-bold" has-left-border>
            <h2 class="text-2xl font-bold text-brand-primary mb-4">Get Connected</h2>
            <div>
              <ul v-if="socialHandles" class="flex gap-4">
                <li v-for="socialHandle in activeSocialHandles" :key="socialHandle.id">
                  <NuxtLink :to="socialHandle.url">
                    <BaseIcon :name="socialHandle.icon" hover-color="hover:text-brand-link-hover" />
                    <span class="sr-only">{{ socialHandle.alt }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </BaseLayoutPageListItem>
        </div>
      </BaseLayoutPageSection>
    </DeferRender>
  </BaseLayoutPageContainer>
</template>

<script setup lang='ts'>
import socialHandles from '@/data/socialHandles.json'
import company from '@/data/company.json'

const activeSocialHandles = socialHandles.filter(s => s.enabled !== false);

definePageMeta({
  title: 'Golden Gate Manor Service Locations',
  breadcrumbLabel: 'Locations'
})

useHead({
  titleTemplate: null
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Our Locations | Golden Gate Manor Inc. Serving Colorado',
  ogTitle: 'Our Locations | Golden Gate Manor Inc. Serving Colorado',
  description: 'View locations for Golden Gate Manor Inc. facilities and services. Providing reliable healthcare transportation and assisted living across Southern Colorado.',
  ogDescription: 'View locations for Golden Gate Manor Inc. facilities and services. Providing reliable healthcare transportation and assisted living across Southern Colorado.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Our Locations | Golden Gate Manor Inc. Serving Colorado',
  twitterDescription: 'View locations for Golden Gate Manor Inc. facilities and services. Providing reliable healthcare transportation and assisted living across Southern Colorado.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
  name: 'LocationPage'
})
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>