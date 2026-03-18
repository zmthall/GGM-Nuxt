<template>
    <div>
        <BaseUiBreadCrumbCTA v-if="authStore.authorized && authStore.role !== 'correspondence'" to="/admin/blog">Admin Blog</BaseUiBreadCrumbCTA>
        <BaseLayoutPageSection v-if="latestPost" margin="top">
            <BaseLayoutPageContainer>
                <h2 class="text-2xl text-brand-primary font-bold border-b border-b-brand-primary/20 mb-8 max-sm:hidden">Latest Post - See What is New:</h2>
                <div>
                    <div class="flex flex-col gap-8 sm:flex-row">
                        <NuxtLink :to="getBlogPostLink(latestPost.slug)" class="flex h-max sm:w-1/2 sm:hover:scale-105 transition-transform duration-500 ease-in-out">
                            <div class="flex flex-col shadow-primary rounded-xl overflow-hidden h-1/2">
                                <div class="h-1/2 relative">
                                    <div>
                                        <p class="flex items-center gap-2 absolute top-2 left-2 bg-zinc-300/50 p-1 rounded-lg">
                                            <BaseIcon name="material-symbols:award-star-outline" />
                                            <span class="text-2xl text-brand-primary font-bold">Latest</span>
                                        </p>
                                    </div>
                                    <div class="aspect-[2/1]">
                                        <BlogPostImage
                                            :src="latestPost.thumbnail || ''" 
                                            :alt="latestPost.thumbnailAlt || latestPost.title" 
                                            :title="latestPost.thumbnailAlt || latestPost.title"
                                            :width="latestPost.thumbnailWidth || undefined"
                                            :height="latestPost.thumbnailHeight || undefined" 
                                            loading="eager"
                                        />        
                                    </div>
                                </div>
                                <div class="bg-brand-primary">
                                    <div class="flex flex-col flex-wrap sm:flex-row sm:items-center gap-4 py-4 px-8 text-white">
                                        <ul class="flex gap-2 items-center max-sm:hidden">
                                            <li v-for="tag in topTags(latestPost.tags)" :key="tag" class="bg-brand-secondary border-brand-primary border-2 p-2 text-brand-primary rounded-lg">
                                                {{ tag }}
                                            </li>
                                        </ul>
                                        <time :datetime="formatDates.formatDatetime(latestPost.publishTimestamp ?? undefined)">
                                            Published on: {{ formatDates.formatShortDate(latestPost.publishTimestamp ?? undefined) }}
                                        </time>
                                    </div>
                                    <div class="flex flex-col justify-between px-8 py-4 text-white">
                                            <h3 class="text-2xl font-bold text-brand-secondary post-title">{{ latestPost.title }}</h3>
                                            <p class="post-body">{{ text.truncateText(latestPost.summary, 250) }}</p>
                                    </div>
                                </div>
                            </div>
                        </NuxtLink>
                        <div v-if="staffPicks && staffPicks.length > 0" class="sm:border-l-2 sm:border-l-brand-primary/20 mx-4 sm:mx-0 sm:ml-8 sm:pl-8 sm:w-1/2">
                            <h3 class="text-4xl font-bold text-brand-primary mb-4">Staff Picks</h3>
                            <ul class="space-y-4">
                                <li v-for="(staffPick) in staffPicks" :key="staffPick.id" class="group">
                                    <nuxt-link :to="getBlogPostLink(staffPick.slug)" class="flex flex-col">
                                        <span class="text-lg font-bold font-headings sm:group-hover:scale-105 post-title">{{ staffPick.title }}</span>
                                        <span class="text-md group-hover:underline group-hover:text-brand-primary sm:group-hover:scale-105 staffpick-body ml-2">{{ staffPick.summary }}</span>
                                    </nuxt-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>

        <BaseLayoutPageSection :margin="allPosts.length > 0 ? 'default' : 'top'" :bg="allPosts.length > 0 ? 'alt' : 'transparent'">
            <BaseLayoutPageContainer>
                <h2 class="text-2xl text-brand-primary font-bold border-b border-b-brand-primary/20 mb-8">All Blog Posts</h2>
                <div v-if="allPosts.length > 0">
                    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <li v-for="post in allPosts" :key="post.id">
                            <NuxtLink :to="getBlogPostLink(post.slug)" class="group flex sm:mx-auto lg:hover:scale-105 transition-transform duration-500 ease-in-out">
                                <div class="flex flex-col shadow-primary rounded-xl overflow-hidden h-full">
                                    <div class="h-1/2 relative">
                                        <div class="flex items-center gap-2 absolute z-1 top-2 left-2 bg-brand-primary/50 p-1 rounded-lg">
                                            <span class="text-sm text-white">Read Time: {{ post.readTime === 1 ? '1 minute' : `${post.readTime} minutes` }}</span>
                                        </div>
                                        <div class="aspect-[2/1]">
                                            <BlogPostImage
                                                :src="post.thumbnail" 
                                                :alt="post.thumbnailAlt || post.title" 
                                                :title="post.thumbnailAlt || post.title"
                                                :width="post.thumbnailWidth || undefined"
                                                :height="post.thumbnailHeight || undefined" 
                                                loading="lazy" />       
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex flex-col justify-left gap-2 pt-4 px-2">
                                            <ul v-if="post.tags != undefined && post.tags.length <= 3" class="flex gap-2 items-center">
                                                <li v-for="tag in post.tags" :key="tag" class="bg-brand-primary border-brand-secondary border-2 p-2 text-white rounded-lg">
                                                    {{ tag }}
                                                </li>
                                            </ul>
                                            <BaseInteractiveTextRotator v-if="post.tags != undefined && post.tags?.length > 3" :items="post.tags" variant="marquee" marquee-direction="right" :marquee-seconds="10" wrapper-class="w-full overflow-hidden" text-class="text-sm text-white" marquee-gap-class="pr-3" marquee-item-class="bg-brand-primary border-brand-secondary border-2 p-2 mx-1 text-white rounded-lg" marquee-track-class="[animation-play-state:paused] group-hover:[animation-play-state:running]" />

                                            <time :datetime="formatDates.formatDatetime(post.publishTimestamp ?? undefined)">
                                                Published on: {{ formatDates.formatShortDate(post.publishTimestamp ?? undefined) }}
                                            </time>
                                        </div>
                                        <div class="flex flex-col justify-between px-2 pt-2 pb-4">
                                            <h3 class="text-xl font-bold text-brand-primary post-title">{{ post.title }}</h3>
                                            <p class="post-body">{{ post.summary ? text.truncateText(post.summary, 100) : '' }}</p>
                                        </div>
                                    </div>
                                </div>
                            </NuxtLink>
                        </li>
                    </ul>
                    <div v-if="postPagination.hasNextPage" class="flex justify-center mt-8">
                        <BaseUiAction type="button" class="py-4 px-8" @click="loadMore">View More</BaseUiAction>
                    </div>
                </div>
                <div v-else-if="isLoadingPosts" class="flex justify-center items-center p-8 animate-pulse">
                    Loading posts...
                </div>
                <div v-else class="p-8 text-xl text-brand-main-text bg-zinc-300 rounded-xl shadow-primary mb-">
                    <p>New posts are being planned! Check back soon or <NuxtLink to="/company/contact-us" class="link">contact us</NuxtLink> to stay updated.</p>
                </div>
            </BaseLayoutPageContainer>
        </BaseLayoutPageSection>
    </div>
</template>

<script setup lang="ts">
import { useBlogPostsApi } from '~/composables/blog/blogPostsAPI'
import { useDateFormat } from '~/composables/dates/dateFormat'
import type { BlogPostCard, BlogPostTiny, PaginationMeta } from '~/models/blog'


const authStore = useAuthStore()

defineOptions({
  name: 'BlogPostsPage'
})

definePageMeta({
  title: 'Resources & Insights from Golden Gate Manor',
  breadcrumbLabel: 'Blog Posts',
  layout: 'blog-post'
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
  twitterCard: 'summary_large_image'
})

const blogPostsAPI = useBlogPostsApi();
const formatDates = useDateFormat();
const text = useText();

const defaultPagination: PaginationMeta = {
  currentPage: 1,
  pageSize: 1,
  hasNextPage: false,
  hasPreviousPage: false,
  totalPages: 1,
  totalItems: 0
}

const blogState = useState<{
    posts: BlogPostCard[];
    pagination: PaginationMeta;
    initialized: boolean;
  }>('blog-posts', () => ({
    posts: [],
    pagination: defaultPagination,
    initialized: false
}))

// Helpers

const topTags = (tags: string[]) => {
  return (tags ?? []).slice(0, 3)
}

const getBlogPostLink = (slug: string): string => {
  return `/testing/${slug}`
}

// Fetch Latest Post

const { data: latestPost } = await useAsyncData<BlogPostCard | null>('blog-latest-post', () => blogPostsAPI.getLatestPost())

// Fetch Staff Picks

const { data: staffPicks } = await useAsyncData<BlogPostTiny[] | null>('blog-staff-picks', () => blogPostsAPI.getStaffPicks())

// Fetch All Blog Posts

const pageSize = 8
const page = ref(1)

const { data: initialPostsReturn, pending: isLoadingPosts } = await useAsyncData(
  'blog-initial-posts',
  () => blogPostsAPI.getPublishedPosts({
      page: page.value,
      pageSize,
      orderField: 'publish_timestamp',
      orderDirection: 'desc'
    }),
    {
        default: () => ({
            data: [],
            pagination: defaultPagination
        })
    }
)

if(!blogState.value.initialized && initialPostsReturn.value) {
  blogState.value.posts = initialPostsReturn.value.data ?? []
  blogState.value.pagination = initialPostsReturn.value.pagination ?? { ...defaultPagination}
  blogState.value.initialized = true
}

const allPosts = computed(() => blogState.value.posts)
const postPagination = computed(() => blogState.value.pagination)

// Load More 

const loadMore = async () => {
    if(isLoadingPosts.value) return; // Prevent multiple simultaneous loads
    if(!postPagination.value.hasNextPage) return; // No more pages to load

    const nextPage = blogState.value.pagination.currentPage + 1;

    const response = await blogPostsAPI.getPublishedPosts({
        page: nextPage,
        pageSize,
        orderField: 'publish_timestamp',
        orderDirection: 'desc'
    })

    const existingPostIDs = new Set(blogState.value.posts.map(post => post.id))
    const newPosts = (response.data ?? []).filter(post => !existingPostIDs.has(post.id))

    blogState.value.posts = [...blogState.value.posts, ...newPosts]
    blogState.value.pagination = response.pagination ?? { ...defaultPagination }
}
</script>

<style scoped>
  .post-title {
      --max-lines: 1;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-clamp: var(--max-lines);
      -webkit-line-clamp: var(--max-lines);
  }

  .post-body {
    --max-lines: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-clamp: var(--max-lines);
    -webkit-line-clamp: var(--max-lines);
    position: relative;
  }

  .staffpick-body {
    --max-lines: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-clamp: var(--max-lines);
    -webkit-line-clamp: var(--max-lines);
    position: relative;
  }
</style>
