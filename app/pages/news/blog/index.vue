<template>
    <div>
        <BaseLayoutPageSection margin="top">
            <BaseLayoutPageContainer>
                <h2 class="text-2xl text-brand-primary font-bold border-b border-b-brand-primary/20 mb-8 max-sm:hidden">Latest Post - See What is New:</h2>
                <div>
                    <div v-if="latestPost" class="flex flex-col gap-8 sm:flex-row">
                        <NuxtLink :to="`/news${latestPost.path}`" class="flex h-max sm:w-1/2 sm:hover:scale-105 transition-transform duration-500 ease-in-out">
                            <div class="flex flex-col shadow-primary rounded-xl overflow-hidden h-1/2">
                                <div class="h-1/2 relative">
                                    <div>
                                        <p class="flex items-center gap-2 absolute top-2 left-2 bg-zinc-300/50 p-1 rounded-lg">
                                            <BaseIcon name="material-symbols:award-star-outline" />
                                            <span class="text-2xl text-brand-primary font-bold">Latest</span>
                                        </p>
                                    </div>
                                    <NuxtImg 
                                        :src="latestPost.thumbnail || '/images/blog/blog-default-thumbnail.png'" 
                                        :alt="latestPost.thumbnailAlt || latestPost.title" 
                                        :title="latestPost.thumbnailAlt || latestPost.title"
                                        :width="latestPost.thumbnailWidth || ''"
                                        :height="latestPost.thumbnailHeight || ''" 
                                        loading="eager"
                                        class="object-cover h-full w-full"
                                    />        
                                </div>
                                <div class="bg-brand-primary">
                                    <div class="flex flex-col flex-wrap sm:flex-row sm:items-center gap-4 py-4 px-8 text-white">
                                        <ul class="flex gap-2 items-center max-sm:hidden">
                                            <li v-for="tag in latestPost.tags" :key="tag" class="bg-brand-secondary border-brand-primary border-2 p-2 text-brand-primary rounded-lg">
                                                {{ tag }}
                                            </li>
                                        </ul>
                                        <time :datetime="formatDates.formatDatetime(latestPost.date)">
                                            Posted on: {{ formatDates.formatShortDate(latestPost.date) }}
                                        </time>
                                    </div>
                                    <div class="flex flex-col justify-between px-8 py-4 text-white">
                                            <h3 class="text-2xl font-bold text-brand-secondary">{{ latestPost.title }}</h3>
                                            <p class="post-body">{{ truncateText(latestPost.summary, 250) }}</p>
                                    </div>
                                </div>
                            </div>
                        </NuxtLink>
                        <div v-if="staffPicks && staffPicks.length > 0" class="sm:border-l-2 sm:border-l-brand-primary/20 mx-4 sm:mx-0 sm:ml-8 sm:pl-8 sm:w-1/2">
                            <h3 class="text-4xl font-bold text-brand-primary mb-4">Staff Picks</h3>
                            <ul class="space-y-4">
                                <li v-for="staffPick in staffPicks" :key="staffPick.id" class="group">
                                    <nuxt-link :to="`/news${staffPick.path}`" class="flex flex-col">
                                        <span class="text-lg font-bold font-headings sm:group-hover:scale-105">{{ staffPick.title }}</span>
                                        <span class="text-xl group-hover:underline group-hover:text-brand-primary sm:group-hover:scale-105">{{ staffPick.description }}</span>
                                    </nuxt-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div v-else class="p-8 text-xl text-brand-main-text bg-zinc-300 rounded-xl shadow-primary mb-">
                        <p>New posts are being planned! Check back soon or <NuxtLink to="/company/contact-us" class="link">contact us</NuxtLink> to stay updated.</p>
                    </div>
                </div>
                <!-- <div>
                    Total Pages: {{ totalPages }}
        
                    Page: {{ page }}
                </div>
                <ul>
                    <li v-for="post in posts" :key="post.date">
                        {{  post }}
                    </li>
                </ul> -->
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>

        <BaseLayoutPageSection v-if="posts.length > 0" margin="default" bg="alt">
            <BaseLayoutPageContainer>
                <div>
                    <h2 class="text-2xl text-brand-primary font-bold border-b border-b-brand-primary/20 mb-8">All Blog Posts</h2>
                    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <li v-for="post in posts" :key="post.id">
                            <NuxtLink :to="`/news${post.path}`" class="flex sm:mx-auto lg:hover:scale-105 transition-transform duration-500 ease-in-out">
                                <div class="flex flex-col shadow-primary rounded-xl overflow-hidden h-full">
                                    <div class="h-1/2 relative">
                                        <div>
                                            <p class="flex items-center gap-2 absolute top-2 left-2 bg-brand-primary/50 p-1 rounded-lg">
                                                <span class="text-sm text-white">Read Time: {{ reading.getReadingTime(post.body as MarkdownRoot) }}</span>
                                            </p>
                                        </div>
                                        <NuxtImg 
                                            :src="post.thumbnail || '/images/blog/blog-default-thumbnail.png'" 
                                            :alt="post.thumbnailAlt || post.title" 
                                            :title="post.thumbnailAlt || post.title" 
                                            :width="post.thumbnailWidth || ''"
                                            :height="post.thumbnailHeight || ''"
                                            loading="eager"
                                            class="object-cover h-full w-full"
                                        />        
                                    </div>
                                    <div>
                                        <div class="flex justify-left gap-2 flex-wrap pt-4 px-2">
                                            <ul class="flex gap-2 items-center">
                                                <li v-for="tag in post.tags" :key="tag" class="bg-brand-primary border-brand-secondary border-2 p-2 text-white rounded-lg">
                                                    {{ tag }}
                                                </li>
                                            </ul>
                                            <time :datetime="formatDates.formatDatetime(post.date)" class="w-min">
                                                Posted on: {{ formatDates.formatShortDate(post.date) }}
                                            </time>
                                        </div>
                                        <div class="flex flex-col justify-between px-2 pt-2 pb-4">
                                            <h3 class="text-xl font-bold text-brand-primary">{{ post.title }}</h3>
                                            <p class="post-body">{{ post.summary ? truncateText(post.summary, 100) : '' }}</p>
                                        </div>
                                    </div>
                                </div>
                            </NuxtLink>
                        </li>
                    </ul>
                    <div v-if="hasMorePages" class="flex justify-center mt-8">
                        <BaseUiAction type="button" class="py-4 px-8" @click="loadMore">View More</BaseUiAction>
                    </div>
                </div>
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>
    </div>
</template>

<script setup lang='ts'>
import type { MarkdownRoot } from '@nuxt/content'
import { useDateFormat } from '../../../composables/dates/dateFormat.js'
import { useReading } from '../../../composables/blog/reading.js'
import type { AllPosts } from '../../../models/blog.js'

defineOptions({
    name: 'BlogPostsPage'
})

definePageMeta({
  title: 'Resources & Insights from Golden Gate Manor',
  breadcrumbLabel: 'Blog Posts'
})

useHead({
    titleTemplate: null
})

const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: 'Golden Gate Manor Blog | All resources under one umbrella',
  ogTitle: 'Golden Gate Manor Blog | All resources under one umbrella',
  description: 'Your complete resource hub for healthcare transportation, assisted living, and community services in Southern Colorado. Expert insights."',
  ogDescription: 'Your complete resource hub for healthcare transportation, assisted living, and community services in Southern Colorado. Expert insights."',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: 'Golden Gate Manor Blog | All resources under one umbrella',
  twitterDescription: 'Your complete resource hub for healthcare transportation, assisted living, and community services in Southern Colorado. Expert insights."',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

const formatDates = useDateFormat()
const reading = useReading()

const { data: latestPost } = await useAsyncData('blog-latest-post', () => {
  return queryCollection('blog')
    .where('draft', '<>', true)
    .select('path', 'date', 'title', 'thumbnail', 'thumbnailAlt', 'thumbnailWidth', 'thumbnailHeight', 'tags', 'summary')
    .order('date', 'DESC')
    .limit(1)
    .first() // Gets the first result as an object instead of array
})


const { data: staffPicks } = await useAsyncData('blog-staff-picks', () => {
  return queryCollection('blog')
    .where('staffPick', '=', true)
    .select('path', 'id', 'title', 'description')
    .order('title', 'DESC')
    .limit(4)
    .all() // Gets the first result as an object instead of array
})

const posts = ref<AllPosts[]>([])

const page = ref(1)
const limit = 8
const isLoading = ref<boolean>(false)
const hasMorePages = ref<boolean>(true)

// Load initial posts
const { data: initialPosts } = await useAsyncData('blog-posts-initial', () => {
  return queryCollection('blog')
    .where('draft', '<>', true)
    .select('path', 'id', 'date', 'title', 'thumbnail', 'thumbnailAlt', 'thumbnailWidth', 'thumbnailHeight', 'tags', 'summary', 'body')
    .order('date', 'DESC')
    .limit(limit)
    .all()
})

posts.value = initialPosts.value || []

const loadMore = async () => {
  isLoading.value = true
  page.value++
  
  const newPosts = await $fetch('/api/blog/posts', {
    query: {
      page: page.value,
      limit: limit
    }
  }) as AllPosts[]
  
  if (newPosts?.length) {
    posts.value.push(...newPosts)
  } 

  if (newPosts.length < limit) {
    // This was the last page
    hasMorePages.value = false
  }
  
  isLoading.value = false
}

const truncateText = (text: string | undefined, maxLength: number = 200): string => {
  if (text === undefined) return ''
  
  const cleanText = text.replace(/\s+/g, ' ').trim()
  
  if (cleanText.length <= maxLength) {
    return cleanText
  }
  
  return cleanText.substring(0, maxLength) + '...'
}

onMounted(() => {
    if (initialPosts.value) {
        if(initialPosts.value.length < limit)
            // This was the last page
            hasMorePages.value = false
    }
})
</script>

<style scoped>
  .post-body {
    --max-lines: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-clamp: var(--max-lines);
    -webkit-line-clamp: var(--max-lines);
    position: relative;
  }

  @media(min-width: 640px) {
    .post-body {
        display: block;
    }
  }
</style>
