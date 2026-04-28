<template>
    <BaseLayoutPageContainer>
        <!-- Main Contact Page Info -->
        <BaseLayoutPageSection margin="pTop" class="md:grid md:grid-cols-2 md:max-w-[1200px] md:mx-auto md:gap-8">
        <!-- Left Page -->
            <div class="space-y-2">
                <h2 class="font-extrabold text-2xl max-sm:hidden">{{ $t('contact.sections.left.title') }}</h2>
                <p class="text-xl ">
                    {{ $t('contact.sections.left.description') }}
                </p>
                <PleaseNote class="text-xl">
                    <div class="space-y-2">
                        <p>
                            {{ $t('contact.sections.note.paragraphs[0]') }}
                            <NuxtLink :to="$localePath('/resources/schedule-a-ride')" class="link">{{ $t('contact.sections.note.link') }}</NuxtLink>{{ $t('contact.sections.note.paragraphs[1]') }}
                        </p>
                        <p>
                            {{ $t('contact.sections.note.paragraphs[2]') }}
                        </p>
                    </div>
                </PleaseNote>
                <div class="business-information">
                    <BaseLayoutPageListItem :title="company.name" has-icon :size="12" icon-name="material-symbols:location-on-rounded">
                        <NuxtLink to="/company/location" class="link">{{ company.address }}</NuxtLink>
                    </BaseLayoutPageListItem>
                    <BaseLayoutPageListItem  :title="$t('contact.sections.business.phone')" has-icon :size="12" icon-name="ic:round-call">
                        <a :href="`tel:${company.phone}`" class="link">{{ company.phone }}</a>
                    </BaseLayoutPageListItem>
                    <BaseLayoutPageListItem :title="$t('contact.sections.business.hours')" has-icon :size="12" icon-name="material-symbols:alarm-outline-rounded">
                        <span>{{ $t('company.hours') }}</span>
                    </BaseLayoutPageListItem>
                    <BaseLayoutPageListItem class="mt-4 mb-8 ml-2 font-bold">
                        <h2 class="text-2xl font-bold uppercase mb-4">{{ $t('contact.sections.business.connected') }}</h2>
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
            </div>
            <!-- Right Page -->
             <DeferRender when="visible" eager-if-in-view>
                 <div class="space-y-2 cv-auto">
                     <h2 class="font-extrabold text-2xl">{{ $t('contact.sections.form.title') }}</h2>
                     <ContactUsForm />
                 </div>
             </DeferRender>
        </BaseLayoutPageSection>
        <DeferRender when="visible">
            <BaseLayoutPageSection class="max-w-[1200px] mx-auto mb-16 cv-auto">
                <LazyBaseInteractiveBusinessLocator mode="click" facade-src="/images/pages/location/location-placeholder-map.png" facade-alt="Google maps view of central Pueblo and Pueblo South side showing Golden Gate Manor Inc locations as map marker icons"/>
            </BaseLayoutPageSection>
        </DeferRender>
    </BaseLayoutPageContainer>
</template>

<script setup lang='ts'>
import company from '@/data/company.json'
import socialHandles from '@/data/socialHandles.json'

const activeSocialHandles = socialHandles.filter(s => s.enabled !== false);

definePageMeta({
  title: 'Contact Golden Gate Manor Team',
  alias: ['/company/contact-us/thank-you'],
  breadcrumbLabel: 'Contact Us',
  breadcrumbOverrides: [
    undefined,
    { label: 'About Us', to: '/company/about-us' },
    undefined,
    undefined
  ]
})

useHead({
    titleTemplate: null
})

const runtimeConfig = useRuntimeConfig();
useSeoMeta({
  title: 'Contact Golden Gate Manor Inc. | Southern Colorado',
  description: 'Get in touch with Golden Gate Manor Inc. for transportation, assisted living, and medical supply services. Proudly serving Pueblo and Southern Colorado.',
  ogTitle: 'Contact Golden Gate Manor Inc. | Southern Colorado',
  ogDescription: 'Get in touch with Golden Gate Manor Inc. for transportation, assisted living, and medical supply services. Proudly serving Pueblo and Southern Colorado.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Contact Golden Gate Manor Inc. | Southern Colorado',
  twitterDescription: 'Get in touch with Golden Gate Manor Inc. for transportation, assisted living, and medical supply services. Proudly serving Pueblo and Southern Colorado',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'ContactUsPage'
})
</script>

<style></style>