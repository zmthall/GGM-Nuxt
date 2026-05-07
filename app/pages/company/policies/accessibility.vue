<template>
  <div class="space-y-4">
    <BaseLayoutPageSection margin="pTop" bg="transparent">
      <BaseLayoutPageContainer>
        <h2 class="text-2xl font-bold text-brand-primary">{{ $t('company.policies.accessibility.commitment.title') }}</h2>
        <div class="space-y-2">
          <p v-for="paragraph in $tm('company.policies.accessibility.commitment.paragraphs')" :key="paragraph" class="text-xl text-brand-main-text">
              {{ $rt(paragraph) }}
          </p>
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>

    <BaseLayoutPageSection bg="transparent">
      <BaseLayoutPageContainer>
        <h2 class="text-2xl font-bold text-brand-primary">{{ $t('company.policies.accessibility.measures.title') }}</h2>
        <div class="space-y-2">
          <p class="text-xl text-brand-main-text">
              {{ $t('company.policies.accessibility.measures.intro') }}
          </p>
          <ul class="!mt-0 list-disc ml-8 text-xl text-brand-main-text">
              <li v-for="item in $tm('company.policies.accessibility.measures.items')" :key="item">
                {{ $rt(item) }}
              </li>
          </ul>
          <p class="text-xl text-brand-main-text">
              {{ $t('company.policies.accessibility.measures.paragraphs[0]') }}
          </p>
          <p class="text-xl text-brand-main-text">
              {{ $t('company.policies.accessibility.measures.paragraphs[1]') }}
              <a :href="`mailto:${emails.accessibility}`" class="link break-all">{{ emails.accessibility }}</a>. 
              {{ $t('company.policies.accessibility.measures.paragraphs[2]') }}
          </p>
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>

    <BaseLayoutPageSection bg="transparent">
    <BaseLayoutPageContainer>
      <h2 class="text-2xl font-bold text-brand-primary">{{ $t('company.policies.accessibility.language.title')}}</h2>
      <div class="space-y-2">
        <p v-for="paragraph in $tm('company.policies.accessibility.language.paragraphs')" :key="paragraph" class="text-xl text-brand-main-text">
            {{ $rt(paragraph) }}
        </p>
      </div>
    </BaseLayoutPageContainer>
  </BaseLayoutPageSection>

    <DeferRender when="visible">
      <BaseLayoutPageSection margin="pDefault" bg="transparent">
        <BaseLayoutPageContainer>
          <div>
            <h2 class="text-2xl font-bold text-brand-primary">{{ $t('company.policies.accessibility.contact.title') }}</h2>
            <div class="space-y-4">
              <p class="text-xl text-brand-main-text">
                  {{ $t('company.policies.accessibility.contact.paragraph') }}
                  <a :href="`mailto:${emails.accessibility}`" class="link break-all">
                      {{ emails.accessibility }}</a>.
              </p>
              <LazyContactUsForm class="bg-white p-4 md:p-8 rounded-lg md:w-3/4 mx-auto"/>
            </div>
          </div>
        </BaseLayoutPageContainer>
      </BaseLayoutPageSection>
    </DeferRender>
  </div>
</template>

<script lang="ts" setup>
import { emails } from '@/data/company.json'

const pageTitle = computed(() => $t('company.policies.accessibility.meta.title'))
const pageDescription = computed(() => $t('company.policies.accessibility.meta.description'))

definePageMeta({
  title: 'Accessibility Statement',
  breadcrumbLabel: 'Accessibility',
  breadcrumbOverrides: [
    undefined,
    { label: 'About Us', to: '/company/about-us' },
    undefined,
    undefined
  ]
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: pageTitle.value,
  ogTitle: pageTitle.value,
  description: pageDescription.value,
  ogDescription: pageDescription.value,
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: pageTitle.value,
  twitterDescription: pageDescription.value,
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'AccessibilityPage'
})
</script>

<style>

</style>