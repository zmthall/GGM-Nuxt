<template>
  <div>
    <div class="min-[1000px]:grid min-[1000px]:grid-cols-16 min-[1000px]:max-w-[1500px] min-[1000px]:mx-auto">
      <BaseLayoutPageSection v-if="post" margin="top" class="col-span-12">
          <div class="mb-2">
            <h1 class="text-3xl font-bold text-brand-primary">
              {{ post?.title }}
            </h1>
            <div class="flex items-center gap-2 font-main text-sm mt-1">
              <p v-if="post.author">By {{ post.author }}</p>
              <BaseIcon name="ph:diamond-fill" size="size-[8px]" color="text-brand-primary/15"  />
              <time v-if="post.publishTimestamp" :datetime="formatDates.formatDatetime(post.publishTimestamp ?? undefined)">
                {{ formatDates.formatDisplayDate(post.publishTimestamp ?? undefined) }}
              </time>
              <BaseIcon name="ph:diamond-fill" size="size-[8px]" color="text-brand-primary/15" class="max-xs:hidden"/>
              <span class="max-xs:hidden">{{ `${post?.readTime} min read` }}</span>
            </div>
            <BlogPostTags :post="post" class="min-[1000px]:hidden mt-2 mb-3" />
            <div class="border-t border-brand-primary/5 mb-4 pt-4 mt-2">
              <p class="text-lg text-brand-main-text/85 leading-relaxed">{{ post.summary }}</p>
            </div>
          </div>
          <div class="w-full my-6">
            <div class="relative overflow-hidden rounded-lg min-[1000px]:hidden shadow-primary">
              <div class="flex items-center gap-2 absolute z-1 top-3 left-3 bg-brand-primary/40 px-2 py-1 rounded-lg xs:hidden">
                <span class="text-white/75 text-xs">{{ `${post?.readTime} min read` }}</span>
              </div>
              <BlogPostImage
                :key="post.thumbnail"
                format="webp,avif"
                :src="blogPostsAPI.getMediaUrl(post.thumbnail)" 
                :alt="post.thumbnailAlt || post.title" 
                :title="post.thumbnailAlt || post.title" 
                :width="post.thumbnailWidth || undefined"    
                :height="post.thumbnailHeight || undefined"
                loading="eager"
              />        
            </div>
          </div>
          <BlogPostTableOfContents v-if="TOC.links.length" :toc="TOC" />
          <BlogPostContentRenderer v-if="post.content" id="blog-post-article" :content="post.content" />
          <div class="min-[1000px]:hidden">
            <BlogPostSocialShare class="mt-3"/>
          </div>
      </BaseLayoutPageSection>
      <BaseLayoutPageSection v-if="post" :padding="false" class="col-span-4 max-[1000px]:hidden my-8 px-4">
        <aside class="sticky top-20 shadow-interior p-3 rounded-md">
          <div class="w-full max-h-[400px] overflow-hidden rounded-[3px] aspect-[2/1]">
            <BlogPostImage
                :key="post.thumbnail"
                format="webp,avif"
                :src="blogPostsAPI.getMediaUrl(post.thumbnail)" 
                :alt="post.thumbnailAlt || post.title" 
                :title="post.thumbnailAlt || post.title" 
                :width="post.thumbnailWidth || undefined"    
                :height="post.thumbnailHeight || undefined"
                loading="eager" 
                has-inset
              />         
          </div>
          <BlogPostTags :post="post" is-aside />
          <div>
            <BlogPostSocialShare is-aside />
          </div>
        </aside>
      </BaseLayoutPageSection>
    </div> 
   <BaseLayoutPageSection v-if="relatedPosts && relatedPosts.length > 0" bg="alt" margin="default">
      <h2 class="text-2xl font-bold text-brand-primary mb-4">
        Related Posts
      </h2>
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <li v-for="(relatedPost) in relatedPosts" :key="relatedPost.id">
            <NuxtLink :to="blogPostsAPI.getBlogPostLink(relatedPost.slug)" class="group flex sm:mx-auto lg:hover:scale-105 transition-transform duration-500 ease-in-out">
                <div class="flex flex-col shadow-primary rounded-xl overflow-hidden h-full">
                    <div class="h-1/2 relative">
                        <div>
                            <p class="flex items-center gap-2 absolute top-2 left-2 bg-brand-primary/50 p-1 rounded-lg">
                                <span class="text-sm text-white">Read Time: {{ relatedPost.readTime === 1 ? '1 minute' : `${relatedPost.readTime} minutes` }}</span>
                            </p>
                        </div>
                        <div class="aspect-[2/1]">
                            <BlogPostImage
                                :key="relatedPost.thumbnail"
                                format="webp,avif"
                                :src="blogPostsAPI.getMediaUrl(relatedPost.thumbnail)" 
                                :alt="relatedPost.thumbnailAlt || relatedPost.title" 
                                :title="relatedPost.thumbnailAlt || relatedPost.title" 
                                :width="relatedPost.thumbnailWidth || undefined"
                                :height="relatedPost.thumbnailHeight || undefined"
                                loading="lazy"
                            />        
                        </div>
                    </div>
                    <div>
                        <div class="flex flex-col justify-left gap-2 pt-4 px-2">
                            <ul v-if="relatedPost.tags != undefined && relatedPost.tags.length <= 3" class="flex gap-2 items-center">
                                <li v-for="tag in relatedPost.tags" :key="tag" class="bg-brand-primary border-brand-secondary border-2 p-2 text-white rounded-lg">
                                    {{ tag }}
                                </li>
                            </ul>
                            <BaseInteractiveTextRotator v-if="relatedPost.tags != undefined && relatedPost.tags?.length > 3" :items="relatedPost.tags" variant="marquee" marquee-direction="right" :marquee-seconds="10" wrapper-class="w-full overflow-hidden" text-class="text-sm text-white" marquee-gap-class="pr-3" marquee-item-class="bg-brand-primary border-brand-secondary border-2 p-2 mx-1 text-white rounded-lg" marquee-track-class="[animation-play-state:paused] group-hover:[animation-play-state:running]" />

                            <time :datetime="formatDates.formatDatetime(relatedPost.publishTimestamp ?? undefined)" class="text-xs text-brand-main-text/80">
                                Published on: {{ formatDates.formatShortDate(relatedPost.publishTimestamp ?? undefined) }}
                            </time>
                        </div>
                        <div class="flex flex-col justify-between px-2 pt-2 pb-4">
                            <h3 class="text-xl font-bold text-brand-primary post-title">{{ relatedPost.title }}</h3>
                            <p class="post-body">{{ relatedPost.summary ? text.truncateText(relatedPost.summary, 100) : '' }}</p>
                        </div>
                    </div>
                </div>
            </NuxtLink>
        </li>
    </ul>
    </BaseLayoutPageSection>
  </div>
</template>

<script setup lang="ts">
import { useBlogPostsApi } from '~/composables/blog/blogPostsAPI';
import { useDateFormat } from '~/composables/dates/dateFormat';
import type { BlogPostFull } from '~/models/blog';

const TOC = computed(() => buildTocFromMdc(post.value?.content ?? ''))

const route = useRoute();
const formatDates = useDateFormat();
const text = useText()
const blogPostsAPI = useBlogPostsApi();

// Get the slug from the URL
const slug = Array.isArray(route.params.slug) 
  ? route.params.slug.join("/") 
  : route.params.slug;

// get the post data using the slug
const { data: post } = await useAsyncData<BlogPostFull>(
  `blog-post-${slug}`,
  () => blogPostsAPI.getPublishedPostBySlug(slug ?? "")
)

if (post.value  === null || post.value === undefined) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Blog post not found'
  })
} else {
  route.meta.breadcrumblabel = post.value.title
}

const { data: relatedPosts } = await useAsyncData(`blog-related-posts-${slug}`,
  () => blogPostsAPI.getRelatedPosts(post.value?.id ?? ""),
)

// SEO
const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: `${post.value.title} | Golden Gate Manor Blog`,
  ogTitle: `${post.value.title} | Golden Gate Manor Blog`,
  description: post.value.seoDescription,
  ogDescription: post.value.seoDescription,
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: `${post.value.title} | Golden Gate Manor Blog`,
  twitterDescription: post.value.seoDescription,
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})

// Use the blog-post layout
definePageMeta({
  layout: 'blog-post',
  breadcrumbOverrides: [
    undefined,
    { label: 'Community', to: '/news/community' },
    { label: 'Blog', to: '/news/blog' },
    false,
    undefined
  ]
});
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
</style>