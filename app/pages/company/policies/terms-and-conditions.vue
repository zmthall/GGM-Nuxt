<template>
  <BaseLayoutPageSection margin="top">
    <BaseLayoutPageContainer class="space-y-4">
      <div>
        <h2 class="text-2xl font-bold text-brand-primary max-sm:hidden">{{ $t('company.policies.terms-and-conditions.title') }}</h2>
        <div class="mt-2">
          <p><span class="font-bold">{{ $t('company.policies.terms-and-conditions.header.title[0]') }}</span> Golden Gate Manor Inc.</p>
          <p><span class="font-bold">{{ $t('company.policies.terms-and-conditions.header.title[1]') }}</span> v1.0</p>
          <p><span class="font-bold">{{ $t('company.policies.terms-and-conditions.header.title[2]') }}</span> June 1, 2025</p>
        </div>
        <ol class="list-decimal list-outside pl-8 marker:text-2xl marker:font-bold marker:text-gray-400 cv-auto">
          <li v-for="item in policyItems" :key="item.title">
            <h2 class="text-2xl font-bold text-brand-primary">
              {{ $rt(item.title) }}
            </h2>
            <p v-if="contentHas(item.content, 'paragraph') && item.content.paragraph" class="text-xl text-brand-main-text">
              <span>
                {{ $rt(item.content.paragraph) }}
                <span v-if="item.content.email" class="whitespace-nowrap">
                  <a :href="`mailto:${contactEmail}`" class="link">{{ contactEmail }}</a>.
                </span>
              </span>
            </p>
            <ul v-else-if="contentHas(item.content, 'ulist')" class="ml-8 list-square marker-black text-xl text-brand-main-text">
              <li v-for="listItem in item.content.ulist" :key="listItem">
                {{ $rt(listItem) }}
              </li>
            </ul>
            <div v-else-if="contentHas(item.content, 'stack')">
              <ol class="list-roman marker-black ml-7">
                <li v-for="stackItem in item.content.stack" :key="stackItem.title">
                  <h3 class="text-2xl font-bold text-black">{{ $rt(stackItem.title) }}</h3>
                  <p v-if="contentHas(stackItem.content, 'intro') && stackItem.content.intro" class="text-xl text-brand-main-text">
                      {{ $rt(stackItem.content.intro) }}
                  </p>
                  <ul v-if="contentHas(stackItem.content, 'ulist')" class="ml-8 list-square marker-black text-xl text-brand-main-text">
                    <li v-for="listItem in stackItem.content.ulist" :key="listItem">
                      {{ $rt(listItem) }}
                    </li>
                  </ul>
                  <p v-if="contentHas(stackItem.content, 'text')" class="text-xl text-brand-main-text">
                    <span class="font-bold">
                      {{ $rt(stackItem.content.text.bold) }}
                    </span>
                    <span>
                      {{ $rt(stackItem.content.text.sentence) }}
                    </span>
                  </p>
                </li>
              </ol>
            </div>
          </li>
        </ol>
      </div>
    </BaseLayoutPageContainer>
  </BaseLayoutPageSection>
</template>

<script lang="ts" setup>
import company from "~/data/company.json"

const contactEmail = company.emails.contact

definePageMeta({
  title: 'Terms and Conditions',
  breadcrumbLabel: 'Terms & Conditions',
  breadcrumbOverrides: [
    undefined,
    { label: 'About Us', to: '/company/about-us' },
    undefined,
    undefined
  ]
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Terms and Conditions',
  ogTitle: 'Terms and Conditions',
  description: 'Read the Terms and Conditions governing the use of Golden Gate Manor Inc.\'s healthcare transportation, assisted living, and medical supply services.',
  ogDescription: 'Read the Terms and Conditions governing the use of Golden Gate Manor Inc.\'s healthcare transportation, assisted living, and medical supply services.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Terms and Conditions',
  twitterDescription: 'Read the Terms and Conditions governing the use of Golden Gate Manor Inc.\'s healthcare transportation, assisted living, and medical supply services.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
  name: 'TermsAndConditionsPage'
})

type TextBlock = {
  bold: string
  sentence: string
}

type PolicyContent = Partial<{
  paragraph: string
  email: boolean
  intro: string
  ulist: string[]
  stack: StackItem[]
}>

type StackContent = Partial<{
  intro: string
  paragraph: string
  ulist: string[]
  text: TextBlock
}>

type StackItem = {
  title: string
  content: StackContent
}

type PolicyItems = {
  title: string
  content: PolicyContent
}[]

const policyItems = $tm('company.policies.terms-and-conditions.policy-items') as PolicyItems

const contentHas = <T extends object, K extends keyof T>(
  content: T,
  key: K
): content is T & Required<Pick<T, K>> => {
  return key in content && content[key] !== undefined
}
</script>

<style scoped>
.marker-black li::marker {
  color: black;
}
</style>