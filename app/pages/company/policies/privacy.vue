<template>
    <div class="space-y-4">
        <!-- Top Page Introduction/updated -->
        <BaseLayoutPageSection margin="pTop">
            <BaseLayoutPageContainer class="space-y-2">
                <p class="policy-updated">
                    {{ $t('company.policies.privacy.top.updated') }} June 11th, 2024
                </p>
                <p v-for="paragraph in $tm('company.policies.privacy.top.paragraph')" :key="paragraph" class="text-xl text-brand-main-text">
                    {{ $rt(paragraph) }}
                </p>
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>

        <!-- Personal Information -->
        <BaseLayoutPageSection>
            <BaseLayoutPageContainer class="space-y-2">
                <h2 class="text-2xl font-bold text-brand-primary">
                    {{ $t('company.policies.privacy.personal-information.title') }}
                </h2>
                <p v-for="paragraph in $tm('company.policies.privacy.personal-information.paragraph')" :key="paragraph" class="text-xl text-brand-main-text">Our primary goal in collecting your personal
                    {{ $rt(paragraph) }}
                </p>

                <DeferRender when="visible" root-margin="0px 0px">
                    <table class="border-collapse text-xl text-brand-main-text">
                        <tbody>
                            <tr>
                                <th v-for="th in $tm('company.policies.privacy.personal-information.table.th')" :key="th" class="border border-black p-4">
                                    {{ $rt(th) }}
                                </th>
                            </tr>
                            <tr v-for="(row, i) in tableRows" :key="`row-${i}`">
                                <td v-for="td in row.td" :key="td" class="border border-black p-4">
                                    {{ $rt(td) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </DeferRender>
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>

        <!-- Information collection -->
        <BaseLayoutPageSection class="cv-auto">
            <BaseLayoutPageContainer class="space-y-2">
                <h2 class="text-2xl font-bold text-brand-primary">
                    {{ $t('company.policies.privacy.information-collection.title') }}
                </h2>
                <p class="text-xl text-brand-main-text">
                    {{ $t('company.policies.privacy.information-collection.paragraph') }}
                </p>
                <ol class="list-decimal space-y-4 ml-8">
                    <li v-for="item in olItems" :key="item.title">
                        <h3 class="text-2xl font-bold text-brand-primary">{{ $rt(item.title) }}</h3>
                        <div class="space-y-2">
                            <p v-for="paragraph in item.information" :key="paragraph" class="text-xl text-brand-main-text">
                                {{ $rt(paragraph) }}
                            </p>
                        </div>
                    </li>
                </ol>
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>

        <!-- Use of information -->
        <BaseLayoutPageSection class="cv-auto">
            <BaseLayoutPageContainer class="space-y-2">
                <h2 class="text-2xl font-bold text-brand-primary">
                    {{ $t('company.policies.privacy.use-of-information.title') }}
                </h2>
                <p class="text-xl text-brand-main-text">
                    {{ $t('company.policies.privacy.use-of-information.intro') }}
                </p>
                <ul class="!mt-0 list-disc ml-8 text-xl text-brand-main-text space-y-2 border">
                    <li v-for="(use, i) in usesList" :key="`uses-${i}`" class="p-2 rounded-md relative shadow-list-item">
                        <div class="space-y-2">
                            <p v-for="paragraph in use.paragraph" :key="paragraph" class="text-xl text-brand-main-text">
                                {{ $rt(paragraph) }}
                            </p>
                        </div>
                    </li>
                </ul>
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>

        <!-- Use of cookies -->
        <BaseLayoutPageSection class="cv-auto">
            <BaseLayoutPageContainer class="space-y-2">
                <h2 class="text-2xl font-bold text-brand-primary">{{ $t('company.policies.privacy.use-of-cookies.title')}}</h2>
                <p v-for="paragraph in $tm('company.policies.privacy.use-of-cookies.paragraph')" :key="paragraph" class="text-xl text-brand-main-text">
                    {{ $rt(paragraph) }}
                </p>
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>

        <!-- Information sharing -->
        <BaseLayoutPageSection class="cv-auto">
            <BaseLayoutPageContainer class="space-y-2">
                <h2 class="text-2xl font-bold text-brand-primary">
                    {{ $t('company.policies.privacy.information-sharing.title') }}
                </h2>
                <div v-for="ul in informationSharingList" :key="ul.intro" class="space-y-2">
                    <p class="text-xl text-brand-main-text">
                        {{ $rt(ul.intro) }}
                    </p>
                    <ul class="!mt-0 list-disc ml-8 text-xl text-brand-main-text">
                        <li v-for="item in ul.items" :key="item">
                            {{ $rt(item) }}
                        </li>
                    </ul>
                </div>
                <p class="text-xl text-brand-main-text">
                    {{ $t('company.policies.privacy.information-sharing.paragraph') }}
                </p>
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>

        <!-- Data retention -->
        <BaseLayoutPageSection class="cv-auto">
            <BaseLayoutPageContainer class="space-y-2">
                <h2 class="text-2xl font-bold text-brand-primary">
                    {{ $t('company.policies.privacy.data-retention.title') }}
                </h2>
                <p class="text-xl text-brand-main-text">
                    {{ $t('company.policies.privacy.data-retention.paragraph') }}
                </p>
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>

        <!-- 3rd party access -->
        <BaseLayoutPageSection class="cv-auto">
            <BaseLayoutPageContainer class="space-y-2">
                <h2 class="text-2xl font-bold text-brand-primary">
                    {{ $t('company.policies.privacy.3rd-party-access.title') }}
                </h2>
                <p class="text-xl text-brand-main-text">
                    {{ $t('company.policies.privacy.3rd-party-access.paragraph') }}
                </p>
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>

        <!-- Security -->
        <BaseLayoutPageSection class="cv-auto">
            <BaseLayoutPageContainer class="space-y-2">
                <h2 class="text-2xl font-bold text-brand-primary">
                    {{ $t('company.policies.privacy.security.title') }}
                </h2>
                <p class="text-xl text-brand-main-text">
                    {{ $t('company.policies.privacy.security.paragraph') }}
                </p>
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>

        <!-- Children's Privac -->
        <BaseLayoutPageSection class="cv-auto">
            <BaseLayoutPageContainer class="space-y-2">
                <h2 class="text-2xl font-bold text-brand-primary">
                    {{ $t('company.policies.privacy.children.title') }}
                </h2>
                <p class="text-xl text-brand-main-text">
                    {{ $t('company.policies.privacy.children.paragraph') }}
                </p>
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>

        <!-- California Residents -->
        <BaseLayoutPageSection class="cv-auto">
            <BaseLayoutPageContainer class="space-y-2">
                <h2 class="text-2xl font-bold text-brand-primary">
                    {{ $t('company.policies.privacy.california-residents.title') }}
                </h2>
                <p v-for="paragraph in $tm('company.policies.privacy.california-residents.top.paragraph')" :key="paragraph" class="text-xl text-brand-main-text">
                    {{ $rt(paragraph) }}
                </p>

                <div v-for="listItem in californiaResidentList" :key="listItem.intro">
                    <p class="text-xl text-brand-main-text">
                        {{ $rt(listItem.intro) }}
                    </p>
                    <ul class="!mt-0 list-disc ml-8 text-xl text-brand-main-text">
                        <li v-for="item in listItem.items" :key="item">
                            {{ $rt(item) }}
                        </li>
                    </ul>
                </div>

                <div class="space-y-2">
                    <p v-for="paragraph in $tm('company.policies.privacy.california-residents.middle.paragraph')" :key="paragraph" class="text-xl text-brand-main-text">
                        {{ $rt(paragraph) }}
                    </p>
                </div>

                <div>
                    <p class="text-xl text-brand-main-text">
                        {{ $t('company.policies.privacy.california-residents.nested-ulist.level-1.intro') }}
                    </p>
                    <ul class="!mt-0 list-disc ml-8 text-xl text-brand-main-text">
                        <li v-for="item in nestedUlistLevel1" :key="item">
                            {{ $rt(item) }}
                        </li>
                        <ul class="list-circle ml-8">
                            <li>
                                {{ $t('company.policies.privacy.california-residents.nested-ulist.level-2.intro') }}
                            </li>
                            <ul class="list-square ml-8">
                                <li v-for="item in nestedUlistLevel2" :key="item">
                                    {{ $rt(item) }}
                                </li>
                            </ul>
                        </ul>
                    </ul>
                </div>
                
                <p class="text-xl text-brand-main-text">
                    {{ $t('company.policies.privacy.california-residents.email-paragraph[0]') }} 
                    <a href="mailto:contact@goldengatemanor.com" class="link">contact@goldengatemanor.com</a>. 
                    {{ $t('company.policies.privacy.california-residents.email-paragraph[1]') }}
                </p>
                <div class="space-y-2">
                    <p v-for="paragraph in $tm('company.policies.privacy.california-residents.bottom.paragraph')" :key="paragraph" class="text-xl text-brand-main-text">
                        {{ $rt(paragraph) }}
                    </p>
                </div>
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>
        
        <!-- Unsubscribe -->
        <BaseLayoutPageSection class="cv-auto">
            <BaseLayoutPageContainer class="space-y-2">
                <h2 class="text-2xl font-bold text-brand-primary">{{ $t('company.policies.privacy.unsubscribe.title') }}</h2>
                <p class="text-xl text-brand-main-text">
                    {{ $t('company.policies.privacy.unsubscribe.paragraph[0]') }}
                    <a 
                        href="mailto:contact@goldengatemanor.com"
                        class="link">contact@goldengatemanor.com
                    </a>. 
                    {{ $t('company.policies.privacy.unsubscribe.paragraph[1]') }}
                </p>
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>

        <BaseLayoutPageSection class="cv-auto">
            <BaseLayoutPageContainer class="space-y-2">
                <h2 class="text-2xl font-bold text-brand-primary">
                    {{ $t('company.policies.privacy.accessing-website.title') }}
                </h2>
                <p class="text-xl text-brand-main-text">
                    {{ $t('company.policies.privacy.accessing-website.paragraph') }}
                </p>
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>

        <BaseLayoutPageSection class="cv-auto">
            <BaseLayoutPageContainer class="space-y-2">
                <h2 class="text-2xl font-bold text-brand-primary">
                    {{ $t('company.policies.privacy.policy-updates.title') }}
                </h2>
                <p class="text-xl text-brand-main-text">
                    {{ $t('company.policies.privacy.policy-updates.paragraph') }}
                </p>
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>

        <BaseLayoutPageSection class="cv-auto" margin="pDefault">
            <BaseLayoutPageContainer class="space-y-2">
                <h2 class="text-2xl font-bold text-brand-primary">
                    {{ $t('company.policies.privacy.exercising-rights.title') }}
                </h2>
                <p class="text-xl text-brand-main-text">
                    {{ $t('company.policies.privacy.exercising-rights.top.paragraph') }}
                    <a 
                        href="mailto:contact@goldengatemanor.com"
                        class="link">contact@goldengatemanor.com
                    </a>.
                </p>
                <p class="text-xl text-brand-main-text policy-list-title">
                    {{ $t('company.policies.privacy.exercising-rights.list.intro') }}
                </p>
                <ul class="!mt-0 list-disc ml-8 text-xl text-brand-main-text">
                    <li v-for="item in $tm('company.policies.privacy.exercising-rights.list.items')" :key="item" class="privacy-list-item">
                        {{ $rt(item) }}
                    </li>
                </ul>
                <p class="text-xl text-brand-main-text">
                    {{ $t('company.policies.privacy.exercising-rights.bottom.paragraph[0]') }}
                    <a href="mailto:contact@goldengatemanor.com" class="link">contact@goldengatemanor.com</a>.
                </p>
                <p class="text-xl text-brand-main-text">
                    {{ $t('company.policies.privacy.exercising-rights.bottom.paragraph[1]') }}
                </p>
                <p class="text-xl text-brand-main-text">
                    {{ $t('company.policies.privacy.exercising-rights.bottom.paragraph[2]') }}
                </p>
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    title: 'Privacy Policy Golden Gate Manor Inc.',
    breadcrumbLabel: 'Privacy',
    breadcrumbOverrides: [
        undefined,
        { label: 'About Us', to: '/company/about-us' },
        undefined,
        undefined
    ]
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
    title: 'Privacy Policy',
    ogTitle: 'Privacy Policy',
    description: 'Review how Golden Gate Manor Inc. collects, uses, and protects your personal information when you use our services or visit our website.',
    ogDescription: 'Review how Golden Gate Manor Inc. collects, uses, and protects your personal information when you use our services or visit our website.',
    ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
    twitterTitle: 'Privacy Policy',
    twitterDescription: 'Review how Golden Gate Manor Inc. collects, uses, and protects your personal information when you use our services or visit our website.',
    twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
    twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'PrivacyPolicyPage'
})

type TableRows = {
    td: string[];
}

type OlItems = {
    title: string;
    information: string[];
}

type Ulist = {
    intro: string;
    items: string[];
}

const tableRows = $tm('company.policies.privacy.personal-information.table.rows') as TableRows[]
const olItems = $tm('company.policies.privacy.information-collection.ol-item') as OlItems[]
const usesList = $tm('company.policies.privacy.use-of-information.uses') as { paragraph: string[] }[]
const informationSharingList = $tm('company.policies.privacy.information-sharing.ulist') as Ulist[]
const californiaResidentList = $tm('company.policies.privacy.california-residents.list') as Ulist[]
const nestedUlistLevel1 = $tm('company.policies.privacy.california-residents.nested-ulist.level-1.items') as string[]
const nestedUlistLevel2 = $tm('company.policies.privacy.california-residents.nested-ulist.level-2.items') as string[]
</script>

<style>
.shadow-list-item {
    box-shadow: inset 0 0 4px 1px rgba(0, 0, 0, 0.2)
}
</style>