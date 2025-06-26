<script setup lang='ts'>
definePageMeta({
  redirect: '/news/community',
  breadcrumb: false
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Latest News & Updates',
  ogTitle: 'Latest News & Updates',
  description: 'Stay informed on the latest news, updates, and announcements from Golden Gate Manor Inc. about healthcare transportation and community involvement.',
  ogDescription: 'Stay informed on the latest news, updates, and announcements from Golden Gate Manor Inc. about healthcare transportation and community involvement.',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Latest News & Updates',
  twitterDescription: 'Stay informed on the latest news, updates, and announcements from Golden Gate Manor Inc. about healthcare transportation and community involvement.',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

defineOptions({
    name: 'NewsPage'
})
</script>

<style></style>