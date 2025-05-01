<template>
    <div>
        <BaseLayoutPageHeroSection>
            <h1 class="flex flex-col relative items-center text-center mb-4 pb-4 bg-color before:w-3/4 before:h-[2px] before:absolute before:bottom-0" >
                <span class="text-3xl sm:text-4xl">
                    Welcome to
                </span>
                <span class="text-6xl sm:text-7xl font-extrabold font-headings text-brand-secondary">
                    Golden Gate Manor
                </span>
                <span class="text-2xl sm:text-3xl">
                    PEOPLE WHO VALUE THEIR QUALITY OF LIFE CAN DEPEND ON US
                </span>
            </h1>
            <p class="text-xl text-center">
                Our mission is simple here at Golden Gate Manor: to improve the quality of life each and every day. We proudly offer transportation services to not only our residents, but to Medicaid approved members of our community. Search our website for additional information or contact us with any questions.
            </p>
        </BaseLayoutPageHeroSection>
    </div>
</template>

<script setup lang='ts'>
useHead({
    titleTemplate: null,
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
    title: 'Golden Gate Manor Inc. | Reliable Transportation & Assisted Living',
    ogTitle: 'Golden Gate Manor Inc. | Reliable Transportation & Assisted Living',
    description: 'Golden Gate Manor Inc. offers dependable Non-Emergency Medical Transportation (NEMT), assisted living services, and medical supplies throughout Southern Colorado.',
    ogDescription: 'Golden Gate Manor Inc. offers dependable Non-Emergency Medical Transportation (NEMT), assisted living services, and medical supplies throughout Southern Colorado.',
    ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
    twitterTitle: 'Golden Gate Manor Inc. | Reliable Transportation & Assisted Living',
    twitterDescription: 'Golden Gate Manor Inc. offers dependable Non-Emergency Medical Transportation (NEMT), assisted living services, and medical supplies throughout Southern Colorado.',
    twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
    twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'HomePage'
})
</script>

<style scoped>
    .bg-color::before {
        background: linear-gradient(to right, transparent, #121f75 50%, transparent);
    }
</style>