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
            <div class="border-t border-brand-primary/5 mb-4 pt-4">
              <p class="text-lg text-brand-main-text/85 leading-relaxed">{{ post.summary }}</p>
            </div>
          </div>
          <div class="w-full my-6">
            <div class="relative overflow-hidden rounded-lg min-[1000px]:hidden shadow-primary">
              <div class="flex items-center gap-2 absolute z-1 top-3 left-3 bg-brand-primary/40 px-2 py-1 rounded-lg xs:hidden">
                <span class="text-white/75 text-xs">{{ `${post?.readTime} min read` }}</span>
              </div>
              <BlogPostImage
                format="webp,avif"
                :src="post.thumbnail" 
                :alt="post.thumbnailAlt || post.title" 
                :title="post.thumbnailAlt || post.title" 
                :width="post.thumbnailWidth || undefined"    
                :height="post.thumbnailHeight || undefined"
                loading="eager"
              />        
            </div>
          </div>
          <BlogPostContentRenderer v-if="post.content" id="blog-post-article" :content="post.content" />
          <div class="min-[1000px]:hidden">
            <BlogPostSocialShare class="mt-3"/>
          </div>
      </BaseLayoutPageSection>
      <BaseLayoutPageSection v-if="post" :padding="false" class="col-span-4 max-[1000px]:hidden my-8 px-4">
        <aside class="sticky top-20 shadow-interior p-3 rounded-md">
          <div class="w-full max-h-[400px] overflow-hidden rounded-[3px] aspect-[2/1]">
            <BlogPostImage
                format="webp,avif"
                :src="post.thumbnail" 
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
                                format="webp,avif"
                                :src="relatedPost.thumbnail" 
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
    <!-- <Teleport to="body">
        <ClientOnly>
            <button v-if="showTOC" ref="tocButtonRef" :class="['fixed top-1/2 -translate-y-1/2 left-0 w-10 h-10 transition-transform duration-500 ease-in-out group z-16 flex justify-start items-center rounded-r-full bg-brand-primary border-r-2 border-t-2 border-b-2 border-brand-secondary hover:bg-brand-secondary hover:border-brand-primary', {'translate-x-[250px] sm:translate-x-80': tocDrawerOpen, 'translate-x-0': !tocDrawerOpen}]" title="Table of Contents" @click="toggleTOCDrawer">
              <BaseIcon v-show="!tocDrawerOpen" name="line-md:chevron-double-right" color="text-white" hover-color="group-hover:text-brand-primary" />
              <BaseIcon v-show="tocDrawerOpen" name="line-md:chevron-double-left" color="text-white" hover-color="group-hover:text-brand-primary" />
            </button>
            <aside v-if="showTOC" ref="tocRef" :class="['fixed top-1/2 -translate-y-1/2 w-[250px] sm:w-80 bg-brand-primary shadow-primary border-r border-t border-b border-white p-4 overflow-y-auto rounded-r-xl z-16 transition-transform ease-in-out duration-500', {'translate-x-0': tocDrawerOpen, '-translate-x-[100%]': !tocDrawerOpen}]" aria-label="Table of Contents">
              <div class="overflow-y-auto max-h-[450px] ">
                <h2 class="text-brand-secondary text-center text-xl font-bold underline mb-2">Table of Contents</h2>
                <ul class="ml-5 text-white list-decimal">
                  <li v-for="link in TOC.links" :key="link.id" class="mb-2 mr-4">
                    <a :href="`#${link.id}`" :class="['capitalize hover:text-brand-secondary hover:underline text-md flex relative', {'text-brand-secondary after:w-1 after:h-full after:bg-brand-secondary after:absolute after:rounded-xl after:-right-2': selectedTOCItem === link.id}]" @click.prevent="scrollToHeading(link.id)">{{ link.id }}</a>
                    <ul v-if="link.children" class="ml-4 list-roman">
                      <li v-for="child in link.children" :key="child.id" class="mt-2">
                          <a :href="`#${child.id}`" :class="['capitalize hover:text-brand-secondary hover:underline text-md flex relative', {'text-brand-secondary after:w-1 after:h-full after:bg-brand-secondary after:absolute after:rounded-xl after:-right-2': selectedTOCItem === child.id}]" @click.prevent="scrollToHeading(child.id)">{{ child.id }}</a>
                          <ul v-if="link.children" class="ml-4 list-[lower-alpha]">
                            <li v-for="subchild in child.children" :key="subchild.id" class="mt-2">
                                <a :href="`#${subchild.id}`" :class="['capitalize hover:text-brand-secondary hover:underline text-md flex relative', {'text-brand-secondary after:w-1 after:h-full after:bg-brand-secondary after:absolute after:rounded-xl after:-right-2': selectedTOCItem === subchild.id}]" @click.prevent="scrollToHeading(subchild.id)">{{ subchild.id }}</a>
                            </li>
                          </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </aside>
      </ClientOnly>
    </Teleport> -->
  </div>
</template>

<script setup lang="ts">
import { useBlogPostsApi } from '~/composables/blog/blogPostsAPI';
import { useDateFormat } from '~/composables/dates/dateFormat';
import type { BlogPostFull } from '~/models/blog';

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

if (!post.value) {
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

console.log(relatedPosts.value) // Debug log to inspect the fetched related posts data --- IGNORE ---

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
    { label: 'Blog', to: '/news/blog' },
    undefined
  ]
});

// const { data: post } = await useAsyncData(`blog-post-${slug}`,
//   () =>  blogPostsAPI.getPublishedPostBySlug(slug)

// )

// console.log(post.value) // Debug log to inspect the fetched post data --- IGNORE ---

// // Build the content path
// const contentPath = `/blog/post/${slug}`;

// // Fetch the specific post
// const { data: post } = await useAsyncData(`blog-${slug}`, () =>
//   queryCollection("blog").path(contentPath).first()
// );

// // Handle 404 if post doesn't exist
// if (!post.value) {
//   throw createError({
//     statusCode: 404,
//     statusMessage: 'Blog post not found'
//   });
// }

// // Handle 404 if post is still a draft
// if(post.value.draft) {
//   throw createError({
//     statusCode: 404,
//     statusMessage: 'Blog post not found'
//   })
// }

// // Handle 404 if post publish date is not current day
// if(post.value.published) {
//   const publishedDate = new Date(post.value.published)
//   const currentDate = Date.now()
//   if(!(publishedDate.getTime() <= currentDate))
//     throw createError({
//       statusCode: 404,
//       statusMessage: 'Blog post not found'
//     })
// }

// interface TocItem {
//   depth: number
//   id: string
//   text: string
//   children?: TocItem[]
// }

// interface TocData {
//   links: TocItem[]
//   searchDepth: number
//   title: string
// }

// const TOC = post.value.body.toc as TocData
// const tocDrawerOpen = ref<boolean>(false);
// const selectedTOCItem = ref<string>('')
// const tocRef = ref<HTMLElement | null>(null)
// const tocButtonRef = ref<HTMLElement | null>(null)

// onClickOutside(tocRef, (event) => {
//   if (tocButtonRef.value && tocButtonRef.value.contains(event.target as Node)) {
//     return
//   }
//   tocDrawerOpen.value = false
// })

// const toggleTOCDrawer = () => {
//   tocDrawerOpen.value = !tocDrawerOpen.value;
// }

// // Flatten the TOC to get all items (including nested ones)
// const getAllTocItems = (tocData: TocData | undefined): TocItem[] => {
//   if (!tocData || !tocData.links) {
//     return []
//   }

//   const allItems: TocItem[] = []
  
//   const traverse = (items: TocItem[]): void => {
//     items.forEach(item => {
//       allItems.push(item)
//       if (item.children && item.children.length > 0) {
//         traverse(item.children)
//       }
//     })
//   }
  
//   traverse(tocData.links)
//   return allItems
// }

// const showTOC = computed(() => {
//   if(TOC.links.length >= 5) return true;
//   return false;
// })

// if(post) {
//   const articleSchema = blogSchema.generateBlogSchema(post.value as BlogPost)
//   useHead({
//     script: [
//             {
//         key: 'ld-json-article',
//         type: 'application/ld+json',
//         innerHTML: JSON.stringify(articleSchema),
//         'data-schema': 'article' // 
//       },
//     ]
//   })
// }

// const scrollToHeading = (id: string) => {
//   const element = document.getElementById(id)
//   if (element) {
//     element.scrollIntoView({ behavior: 'smooth' })
//   }
// }

// const { data: relatedPosts } = await useAsyncData(`blog-related-posts-${route.path}`, async () => {
//   if (!post.value || !post.value.tags || post.value.tags.length === 0) {
//     return []
//   }
  
//   // Get all posts except current one
//   const allPosts = await queryCollection('blog')
//     .where('path', '<>', post.value.path)
//     .where('draft', '<>', true)
//     .select('path', 'id', 'date', 'title', 'thumbnail', 'thumbnailAlt', 'thumbnailWidth', 'thumbnailHeight', 'tags', 'summary', 'body', 'published', 'readTime')
//     .all()
  
//   // Filter posts that have at least one matching tag
//   const relatedPosts = allPosts
//     .filter(blogPost => {
//       if (!blogPost.tags || blogPost.tags.length === 0) return false
//       return blogPost.tags.some(tag => post.value?.tags?.includes(tag))
//     })
//     .slice(0, 4)
  
//   return relatedPosts
// })


// onMounted(() => {  
//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           selectedTOCItem.value = entry.target.id
//         }
//       })
//     },
//     {
//       rootMargin: '-45px 0px -80% 0px', // Adjust based on your header height
//       threshold: 0
//     }
//   )

//   // Get all TOC items (flattened)
//   const allTOCItems = getAllTocItems(TOC)

//   // Observe all headings
//   allTOCItems.forEach(item => {
//     const element = document.getElementById(item.id)
//     if (element) {
//       observer.observe(element)
//     }
//   })

//   // Cleanup
//   onBeforeUnmount(() => {
//     observer.disconnect()
//   })
// })
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