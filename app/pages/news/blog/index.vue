<template>
    <div>
        <BaseLayoutPageSection margin="top">
            <BaseLayoutPageContainer class="space-y-16">
                <h2 class="text-2xl text-brand-primary font-bold border-b border-b-brand-primary/20 mb-8 max-sm:hidden">Latest Post - See What is New:</h2>
                <div>
                    <div v-if="latestPost" class="flex gap-16">
                        <NuxtLink :to="`/news${latestPost.path}`" class="flex h-max sm:w-1/2 sm:hover:scale-105 transition-transform duration-500 ease-in-out">
                            <div class="flex flex-col shadow-primary rounded-xl overflow-hidden h-1/2">
                                <div class="h-1/2">
                                    <NuxtImg 
                                        :src="latestPost.thumbnail || '/images/blog/blog-default-thumbnail.png'" 
                                        :alt="latestPost.thumbnailAlt || latestPost.title" 
                                        :title="latestPost.thumbnailAlt || latestPost.title" 
                                        loading="eager"
                                        class="object-cover h-full w-full"
                                    />        
                                </div>
                                <div class="flex flex-col sm:flex-row sm:items-center gap-4 py-4 px-8">
                                    <ul class="flex gap-2 items-center max-sm:hidden">
                                        <li v-for="tag in latestPost.tags" :key="tag" class="bg-brand-primary border-brand-secondary border-2 p-2 text-white rounded-lg">
                                            {{ tag }}
                                        </li>
                                    </ul>
                                    <time :datetime="formatDates.formatDatetime(latestPost.date)">
                                        Posted on: {{ formatDates.formatShortDate(latestPost.date) }}
                                    </time>
                                </div>
                                <div class="flex flex-col justify-between px-8 py-4">
                                        <h3 class="text-2xl font-bold text-brand-primary">{{ latestPost.title }}</h3>
                                        <p class="post-body">{{ truncateBodyText(latestPost.body) }}</p>
                                </div>
                            </div>
                        </NuxtLink>
                        <div>
                            <h3>Staff Picks</h3>
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

        <BaseLayoutPageSection margin="default" bg="alt">
            <BaseLayoutPageContainer>
                <div>
                    <h2 class="text-2xl text-brand-primary font-bold border-b border-b-brand-primary/20 mb-8">All Blog Posts</h2>
                    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <li v-for="post in posts" :key="post.id">
                            <NuxtLink :to="`/news${post.path}`" class="flex sm:mx-auto lg:hover:scale-105 transition-transform duration-500 ease-in-out">
                                <div class="flex flex-col shadow-primary rounded-xl overflow-hidden h-full">
                                    <div class="h-1/2">
                                        <NuxtImg 
                                            :src="post.thumbnail || '/images/blog/blog-default-thumbnail.png'" 
                                            :alt="post.thumbnailAlt || post.title" 
                                            :title="post.thumbnailAlt || post.title" 
                                            loading="eager"
                                            class="object-cover h-full w-full"
                                        />        
                                    </div>
                                    <div class="flex justify-left gap-4 pt-4 px-2">
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
                                        <p class="post-body">{{ truncateBodyText(post.body, ) }}</p>
                                    </div>
                                </div>
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>
    </div>
</template>

<script setup lang='ts'>
import type { MarkdownRoot } from '@nuxt/content'
import { useDateFormat } from '../../../composables/dates/dateFormat.js'

const formatDates = useDateFormat()

definePageMeta({
  title: 'Golden Gate Manor Blog Posts',
  breadcrumbLabel: 'Blog Posts'
})

const route = useRoute()
const page = computed(() => {
  const pageParam = route.query.page
  if (typeof pageParam === 'string') {
    return parseInt(pageParam) || 1
  }
  return 1
})
const limit = 8 // Posts per page
const totalPages = ref<number>(0)

const { data: latestPost } = await useAsyncData('blog-latest-post', () => {
  return queryCollection('blog')
    .where('draft', '<>', true)
    .select('path', 'date', 'title', 'description', 'thumbnail', 'thumbnailAlt', 'tags', 'body')
    .order('date', 'DESC')
    .limit(1)
    .first() // Gets the first result as an object instead of array
})

const { data: posts } = await useAsyncData(route.path, () => {
  return queryCollection('blog')
    .where('draft', '<>', true)
    .select('path', 'id', 'date', 'title', 'description', 'thumbnail', 'thumbnailAlt', 'tags', 'body') // Add whatever fields you need
    .order('date', 'DESC')
    .limit(limit)
    .skip((page.value - 1) * limit)
    .all()
})

const getFirstParagraph = (body: MarkdownRoot | undefined) => {
    if(body) {
        const firstParagraph = body.value[0]
        if(firstParagraph)
            return firstParagraph[2]?.toString()
    }
    return undefined
}

const truncateText = (text: string | undefined, maxLength: number = 200): string => {
  if (text === undefined) return ''
  
  const cleanText = text.replace(/\s+/g, ' ').trim()
  
  if (cleanText.length <= maxLength) {
    return cleanText
  }
  
  return cleanText.substring(0, maxLength) + '...'
}

const truncateBodyText = (body: MarkdownRoot | undefined, maxLength: number = 100) => {
    if(body === undefined) return undefined

    return truncateText(getFirstParagraph(body), maxLength)
}

useHead({
    titleTemplate: null
})

// useSeoMeta({
//   title: '',
//   ogTitle: '',
//   description: '',
//   ogDescription: '',
//   ogImage: '',
//   twitterCard: 'summary_large_image',
// })


defineOptions({
    name: 'BlogPostsPage'
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
