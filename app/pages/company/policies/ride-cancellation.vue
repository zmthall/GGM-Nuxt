<template>
    <BaseLayoutPageSection margin="top">
      <BaseLayoutPageContainer class="space-y-4">
        <!-- Top -->
        <div>
          <h2 class="text-2xl font-bold text-brand-primary max-sm:hidden">{{ $t('company.policies.ride-cancellation.top.title') }}</h2>
          <div class="mt-2">
            <p><span class="font-bold">{{ $t('company.policies.ride-cancellation.top.version') }}</span> v1.0</p>
            <p><span class="font-bold">{{ $t('company.policies.ride-cancellation.top.updated') }}</span> June 1, 2025</p>
          </div>
        </div>

        <!-- Purpost and scope -->
        <div>
          <h2 class="text-2xl font-bold text-brand-primary mb-2">{{ $t('company.policies.ride-cancellation.purpose.title') }}</h2>
          <p class="text-xl text-brand-main-text">
            {{ $t('company.policies.ride-cancellation.purpose.paragraph') }}
          </p>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-brand-primary mb-2">{{ $t('company.policies.ride-cancellation.scope.title') }}</h2>
          <p class="text-xl text-brand-main-text">
            {{ $t('company.policies.ride-cancellation.scope.ulist.intro') }}
          </p>
          <ul class="list-disc ml-8 text-xl text-brand-main-text">
            <li v-for="item in $tm('company.policies.ride-cancellation.scope.ulist.items')" :key="item">
              {{ $rt(item) }}
            </li>
          </ul>
        </div>

        <!-- Definitions -->
        <div class="cv-auto">
          <h2 class="text-2xl font-bold text-brand-primary mb-2">{{ $t('company.policies.ride-cancellation.definitions.title') }}</h2>
          <table class="border-collapse w-full text-center text-xl text-brand-main-text">
            <thead>
              <tr>
                <th v-for="th in $tm('company.policies.ride-cancellation.definitions.table.th')" :key="th" class="border border-black p-4 font-bold">{{ $rt(th)}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in definitionTable" :key="`definitions-row-${i}`">
                <td v-for="td in row.td" :key="td" class="border border-black p-4">{{ $rt(td) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Notice Requirements -->
        <div>
          <h2 class="text-2xl font-bold text-brand-primary mb-2">{{ $t('company.policies.ride-cancellation.notice-requirements.title') }}</h2>
          <table class="border-collapse w-full text-center sm:text-xl text-brand-main-text">
            <thead>
              <tr>
                <th v-for="th in $tm('company.policies.ride-cancellation.notice-requirements.table.th')" :key="th" class="border border-black p-2 sm:p-4 font-bold">{{ $rt(th) }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in noticeRequirementsTable" :key="`notice-row-${i}`">
                <td v-for="td in row.td" :key="td" class="border border-black p-2 sm:p-4">{{ $rt(td) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- How to cancel -->
        <div>
          <h2 class="text-2xl font-bold text-brand-primary mb-2">{{ $t('company.policies.ride-cancellation.how-to-cancel') }}</h2>
          <ol class="list-decimal ml-8 text-xl text-brand-main-text">
            <li>
              <p>{{ $t('company.policies.ride-cancellation.how-to-cancel.olists[0].intro') }}</p>
              <ul class="list-disc ml-8">
                <li>
                  <p>
                    {{ $t('company.policies.ride-cancellation.how-to-cancel.olists[0].items[0]') }} 
                    <a :href="`tel:${company.trans.phone.office}`" class="link">{{ company.trans.phone.office }}</a>.
                  </p>
                  </li>
                <li>
                  <p>
                    {{ $t('company.policies.ride-cancellation.how-to-cancel.olists[0].items[1]') }}
                    <a :href="`tel:${company.trans.phone.dispatch}`" class="link">{{ company.trans.phone.dispatch }}</a>.
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <p>
                {{ $t('company.policies.ride-cancellation.how-to-cancel.olists[1].intro') }}
              </p>
              <ul class="list-disc ml-8">
                <li>
                  <p>
                    {{ $t('company.policies.ride-cancellation.how-to-cancel.olists[1].items[0]') }}
                  </p>
                </li>
              </ul>
            </li>
          </ol>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-brand-primary mb-2">{{ $t('company.policies.ride-cancellation.grace-and-driver-arrival.title') }}</h2>
          <ul class="list-disc ml-8 text-xl text-brand-main-text">
            <li v-for="item in $tm('company.policies.ride-cancellation.grace-and-driver-arrival.ulist.items')" :key="item">
              {{ $rt(item) }}
            </li>
          </ul>
        </div>

        <!-- Strike System -->
        <div>
          <h2 class="text-2xl font-bold text-brand-primary mb-2">{{ $t('company.policies.ride-cancellation.enforcement.title') }}</h2>
          <table class="border-collapse text-center text-xl text-brand-main-text mb-2">
            <thead>
              <tr>
                <th v-for="th in $tm('company.policies.ride-cancellation.enforcement.table.th')" :key="th" class="border border-black p-4 font-bold">
                  {{ $rt(th) }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in enforcementTable" :key="`enforcement-row-${i}`">
                <td v-for="td in row.td" :key="td" class="border border-black p-4">
                  {{ $rt(td) }}
                </td>
              </tr>
            </tbody>
          </table>
          <ul class="list-disc ml-8 text-xl text-brand-main-text">
            <li v-for="item in $tm('company.policies.ride-cancellation.enforcement.ulist.items')" :key="item">
              <p>
                {{ $rt(item) }}
              </p>
            </li>
          </ul>
        </div>

        <!-- Exceptions -->
        <div>
          <h2 class="text-2xl font-bold text-brand-primary mb-2">{{ $t('company.policies.ride-cancellation.exceptions.title') }}</h2>
          <p class="text-xl text-brand-main-text">
            {{ $t('company.policies.ride-cancellation.exceptions.ulist.intro') }}
          </p>
          <ul class="list-disc ml-8 text-xl text-brand-main-text">
            <li v-for="item in $tm('company.policies.ride-cancellation.exceptions.ulist.items')" :key="item">
              <p>
                {{ $rt(item) }}
              </p>
            </li>
          </ul>
          <p class="text-xl text-brand-main-text">
            {{ $t('company.policies.ride-cancellation.exceptions.paragraph') }}
          </p>
        </div>

        <!-- Rescheduling -->
        <div>
          <h2 class="text-2xl font-bold text-brand-primary mb-2">{{ $t('company.policies.ride-cancellation.rescheduling.title') }}</h2>
          <ul class="list-disc ml-8 text-xl text-brand-main-text">
            <li v-for="item in $tm('company.policies.ride-cancellation.rescheduling.ulist.items')" :key="item">
              <p>
                {{ $rt(item) }}
              </p>
            </li>
          </ul>
        </div>

        <!-- Recordkeeping -->
        <div>
          <h2 class="text-2xl font-bold text-brand-primary mb-2">{{ $t('company.policies.ride-cancellation.recordkeeping.title') }}</h2>
          <ul class="list-disc ml-8 text-xl text-brand-main-text">
            <li v-for="item in $tm('company.policies.ride-cancellation.recordkeeping.ulist.items')" :key="item">
              <p>
                {{ $rt(item) }}
              </p>
            </li>
          </ul>
        </div>
        
        <!-- Policy review and Updates -->
        <div>
          <h2 class="text-2xl font-bold text-brand-primary mb-2">{{ $t('company.policies.ride-cancellation.policy-review.title') }}</h2>
          <ul class="list-disc ml-8 text-xl text-brand-main-text">
            <li v-for="item in $tm('company.policies.ride-cancellation.policy-review.ulist.items')" :key="item">
              <p>
                {{ $rt(item) }}
              </p>
            </li>
          </ul>
        </div>

        <!-- Contact Section -->
        <DeferRender when="visible">
          <div>
            <h2 class="text-2xl font-bold text-brand-primary">{{ $t('company.policies.ride-cancellation.contact.title') }}</h2>
            <p class="text-xl text-brand-main-text">
              {{ $t('company.policies.ride-cancellation.contact.paragraph[0]') }}
              <a href="mailto:contact@goldengatemanor.com" class="link">contact@goldengatemanor.com</a>, 
              {{ $t('company.policies.ride-cancellation.contact.paragraph[1]') }}
            </p>
            <LazyContactUsForm class="bg-white mt-8 p-4 md:p-8 rounded-lg md:w-3/4 mx-auto" />
          </div>
        </DeferRender>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
</template>

<script setup lang='ts'>
import company from '@/data/company.json'

definePageMeta({
  title: 'Ride Cancellation Policy',
  breadcrumbLabel: 'Ride Cancellation',
  breadcrumbOverrides: [
    undefined,
    { label: 'About Us', to: '/company/about-us' },
    undefined,
    undefined
  ]
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Ride Cancellation Policy',
  ogTitle: 'Ride Cancellation Policy',
  description: 'Understand the ride cancellation policy at Golden Gate Manor Inc., designed to maximize service reliability for our transportation clients.',
  ogDescription: 'Understand the ride cancellation policy at Golden Gate Manor Inc., designed to maximize service reliability for our transportation clients.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Ride Cancellation Policy',
  twitterDescription: 'Understand the ride cancellation policy at Golden Gate Manor Inc., designed to maximize service reliability for our transportation clients.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'RideCancellationPolicyPage'
})

const definitionTable = $tm('company.policies.ride-cancellation.definitions.table.rows') as { td: string[] }[]
const noticeRequirementsTable = $tm('company.policies.ride-cancellation.notice-requirements.table.rows') as { td: string[] }[]
const enforcementTable = $tm('company.policies.ride-cancellation.enforcement.table.rows') as { td: string[] }[]
</script>

<style></style>