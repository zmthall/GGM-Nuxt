<template>
  <div>
    <div class="md:grid md:grid-cols-15 md:max-w-[1500px] md:mx-auto">
      <BaseLayoutPageSection v-if="post" margin="top" class="col-span-11 space-y-4">
          <div>
            <h2 class="text-2xl font-bold text-brand-primary">
              {{ post?.title }}
            </h2>
            <p>Reading time: {{ reading.getReadingTime(post.body) }}</p>
            <time v-if="post.date" :datetime="formatDates.formatDatetime(post.date)">
              Posted On: {{ formatDates.formatDisplayDate(post.date) }}
            </time>
            <p v-if="post.author">By: {{ post.author }}</p>
            <div v-if="post.tags" class="md:hidden">
              <span v-if="post.tags.length" class="flex gap-2 items-center">
                <span v-for="tag in post.tags" :key="tag" class="bg-brand-primary border-brand-secondary border-2 p-2 text-white rounded-lg hover:bg-brand-secondary hover:text-brand-primary transition-colors ease-in-out duration-500">
                  {{ tag }}
                </span>
              </span>
            </div>
          </div>
          <div class="w-full overflow-hidden rounded-lg md:hidden">
            <NuxtImg 
              :src="post.thumbnail || '/images/blog/blog-default-thumbnail.png'" 
              :alt="post.thumbnailAlt || post.title" 
              :title="post.thumbnailAlt || post.title" 
              :width="post.thumbnailWidth || ''"    
              :height="post.thumbnailHeight || ''"
              loading="eager" 
              sizes="sm:100vw md:50vw lg:400px"
              class="object-cover w-full h-full" 
            />        
          </div>
          <ContentRenderer v-if="post" :value="post" class="prose prose-lg space-y-2 text-xl text-brand-main-text" />
          <div class="md:hidden">
            <!-- Social icons to share page -->
            <BlogPostSocialShare />
          </div>
      </BaseLayoutPageSection>
      <BaseLayoutPageSection v-if="post" margin="top" class="col-span-4 max-md:hidden">
        <aside class="space-y-4">
          <div class="w-full max-h-[400px] h-max overflow-hidden rounded-lg">
            <NuxtImg 
              :src="post.thumbnail || '/images/blog/blog-default-thumbnail.png'" 
              :alt="post.thumbnailAlt || post.title" 
              :title="post.thumbnailAlt || post.title" 
              :width="post.thumbnailWidth || ''"    
              :height="post.thumbnailHeight || ''"
              loading="eager" 
              sizes="sm:100vw md:50vw lg:400px"
              class="border-4 border-zinc-200 p-4 object-cover w-full h-full" 
            />        
          </div>
          <div v-if="post.tags">
            <span v-if="post.tags.length" class="flex gap-2 items-center">
              <div class="flex gap-2 flex-wrap">
                <span v-for="tag in post.tags" :key="tag" class="bg-brand-primary border-brand-secondary border-2 p-2 text-white rounded-lg hover:bg-brand-secondary hover:text-brand-primary transition-colors ease-in-out duration-500">
                  {{ tag }}
                </span>
              </div>
            </span>
          </div>
          <div>
            <!-- Social icons to share page -->
            <BlogPostSocialShare is-aside/>
          </div>
        </aside>
      </BaseLayoutPageSection>
    </div>
    <BaseLayoutPageSection v-if="relatedPosts && relatedPosts.length > 0" bg="alt" margin="default">
      <h2 class="text-2xl font-bold text-brand-primary mb-4">
        Related Posts
      </h2>
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <li v-for="relatedPost in relatedPosts" :key="relatedPost.id">
            <NuxtLink :to="`/news${relatedPost.path}`" class="flex sm:mx-auto lg:hover:scale-105 transition-transform duration-500 ease-in-out">
                <div class="flex flex-col shadow-primary rounded-xl overflow-hidden h-full">
                    <div class="h-1/2 relative">
                        <div>
                            <p class="flex items-center gap-2 absolute top-2 left-2 bg-brand-primary/50 p-1 rounded-lg">
                                <span class="text-sm text-white">Read Time: {{ reading.getReadingTime(relatedPost.body as MarkdownRoot) }}</span>
                            </p>
                        </div>
                        <NuxtImg 
                            :src="relatedPost.thumbnail || '/images/blog/blog-default-thumbnail.png'" 
                            :alt="relatedPost.thumbnailAlt || relatedPost.title" 
                            :title="relatedPost.thumbnailAlt || relatedPost.title" 
                            :width="relatedPost.thumbnailWidth || ''"
                            :height="relatedPost.thumbnailHeight || ''"
                            loading="eager"
                            class="object-cover h-full w-full"
                        />        
                    </div>
                    <div>
                        <div class="flex justify-left flex-col gap-2 pt-4 px-2">
                            <ul class="flex gap-2 items-center">
                                <li v-for="tag in relatedPost.tags" :key="tag" class="bg-brand-primary border-brand-secondary border-2 p-2 text-white rounded-lg">
                                    {{ tag }}
                                </li>
                            </ul>
                            <time :datetime="formatDates.formatDatetime(relatedPost.date)">
                                Posted on: {{ formatDates.formatShortDate(relatedPost.date) }}
                            </time>
                        </div>
                        <div class="flex flex-col justify-between px-2 pt-2 pb-4">
                            <h3 class="text-xl font-bold text-brand-primary">{{ relatedPost.title }}</h3>
                            <p class="post-body">{{ relatedPost.summary ? text.truncateText(relatedPost.summary, 100) : '' }}</p>
                        </div>
                    </div>
                </div>
            </NuxtLink>
        </li>
    </ul>
    </BaseLayoutPageSection>
    <Teleport to="body">
        <ClientOnly>
          <button v-if="showTOC" ref="tocButtonRef" :class="['fixed top-1/2 -translate-y-1/2 w-10 h-10 transition-transform duration-500 ease-in-out group z-16 flex justify-start items-center rounded-r-full bg-brand-primary border-r-2 border-t-2 border-b-2 border-brand-secondary hover:bg-brand-secondary hover:border-brand-primary', {'translate-x-[75vw] sm:translate-x-80': tocDrawerOpen, 'translate-x-0': !tocDrawerOpen}]" title="Table of Contents" @click="toggleTOCDrawer">
            <BaseIcon v-show="!tocDrawerOpen" name="line-md:chevron-double-right" color="text-white" hover-color="group-hover:text-brand-primary" />
            <BaseIcon v-show="tocDrawerOpen" name="line-md:chevron-double-left" color="text-white" hover-color="group-hover:text-brand-primary" />
          </button>
          <aside v-if="showTOC" ref="tocRef" :class="['fixed top-1/2 -translate-y-1/2 left-0 w-3/4 sm:w-80 bg-brand-primary shadow-primary border-r border-t border-b border-white p-4 overflow-y-auto rounded-r-xl z-16 transition-transform ease-in-out duration-500', {'translate-x-0': tocDrawerOpen, '-translate-x-[100%]': !tocDrawerOpen}]" aria-label="Table of Contents">
            <div class="overflow-y-auto max-h-[450px] ">
              <h2 class="text-brand-secondary text-center text-xl font-bold underline mb-2">Table of Contents</h2>
              <ul class="ml-5 text-white list-decimal">
                <li v-for="link in TOC.links" :key="link.id" class="mb-2">
                  <a :href="`#${link.id}`" :class="['capitalize hover:text-brand-secondary hover:underline text-md flex relative', {'text-brand-secondary after:w-1 after:h-full after:bg-brand-secondary after:absolute after:rounded-xl after:right-2': selectedTOCItem === link.id}]" @click.prevent="scrollToHeading(link.id)">{{ link.id }}</a>
                  <ul v-if="link.children" class="ml-4 list-roman">
                    <li v-for="child in link.children" :key="child.id" class="mt-2">
                        <a :href="`#${child.id}`" :class="['capitalize hover:text-brand-secondary hover:underline text-md flex relative', {'text-brand-secondary after:w-1 after:h-full after:bg-brand-secondary after:absolute after:rounded-xl after:right-2': selectedTOCItem === child.id}]" @click.prevent="scrollToHeading(child.id)">{{ child.id }}</a>
                        <ul v-if="link.children" class="ml-4 list-[lower-alpha]">
                          <li v-for="subchild in child.children" :key="subchild.id" class="mt-2">
                              <a :href="`#${subchild.id}`" :class="['capitalize hover:text-brand-secondary hover:underline text-md flex relative', {'text-brand-secondary after:w-1 after:h-full after:bg-brand-secondary after:absolute after:rounded-xl after:right-2': selectedTOCItem === subchild.id}]" @click.prevent="scrollToHeading(subchild.id)">{{ subchild.id }}</a>
                          </li>
                        </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </aside>
      </ClientOnly>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { MarkdownRoot } from '@nuxt/content';
import { useReading } from '../../../../composables/blog/reading';
import { useBlogSchema } from '../../../../composables/blog/schema';
import { useText } from '../../../../composables/blog/text';
import { useDateFormat } from '../../../../composables/dates/dateFormat';
import type { BlogPost } from '../../../../models/blog';
import { onClickOutside } from '../../../../composables/onClickOutside';

const route = useRoute();
const formatDates = useDateFormat();
const reading = useReading();
const blogSchema = useBlogSchema();
const text = useText();

// Get the slug from the URL
const slug = Array.isArray(route.params.slug) 
  ? route.params.slug.join("/") 
  : route.params.slug;

// Build the content path
const contentPath = `/blog/post/${slug}`;

// Fetch the specific post
const { data: post } = await useAsyncData(`blog-${slug}`, () =>
  queryCollection("blog").path(contentPath).first()
);

// Handle 404 if post doesn't exist
if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Blog post not found'
  });
}

// Handle 404 if post is still a draft
if(post.value.draft) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Blog post not found'
  })
}

// Use the blog-post layout
definePageMeta({
  layout: 'blog-post',
  breadcrumbLabel: 'Blog Posts'
});

interface TocItem {
  depth: number
  id: string
  text: string
  children?: TocItem[]
}

interface TocData {
  links: TocItem[]
  searchDepth: number
  title: string
}

const TOC = post.value.body.toc as TocData
const tocDrawerOpen = ref<boolean>(false);
const selectedTOCItem = ref<string>('')
const tocRef = ref<HTMLElement | null>(null)
const tocButtonRef = ref<HTMLElement | null>(null)

onClickOutside(tocRef, (event) => {
  if (tocButtonRef.value && tocButtonRef.value.contains(event.target as Node)) {
    return
  }
  tocDrawerOpen.value = false
})

const toggleTOCDrawer = () => {
  tocDrawerOpen.value = !tocDrawerOpen.value;
}

// Flatten the TOC to get all items (including nested ones)
const getAllTocItems = (tocData: TocData | undefined): TocItem[] => {
  if (!tocData || !tocData.links) {
    return []
  }

  const allItems: TocItem[] = []
  
  const traverse = (items: TocItem[]): void => {
    items.forEach(item => {
      allItems.push(item)
      if (item.children && item.children.length > 0) {
        traverse(item.children)
      }
    })
  }
  
  traverse(tocData.links)
  return allItems
}


const showTOC = computed(() => {
  if(TOC.links.length >= 5) return true;
  return false;
})

if(post) {
  const articleSchema = blogSchema.generateBlogSchema(post.value as BlogPost)
  useHead({
    script: [
            {
        key: 'ld-json-article',
        type: 'application/ld+json',
        innerHTML: JSON.stringify(articleSchema),
        'data-schema': 'article' // 
      },
    ]
  })
}

const scrollToHeading = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const { data: relatedPosts } = await useAsyncData(`blog-related-posts-${route.path}`, async () => {
  if (!post.value || !post.value.tags || post.value.tags.length === 0) {
    return []
  }
  
  // Get all posts except current one
  const allPosts = await queryCollection('blog')
    .where('path', '<>', post.value.path)
    .select('path', 'id', 'date', 'title', 'thumbnail', 'thumbnailAlt', 'thumbnailWidth', 'thumbnailHeight', 'tags', 'summary', 'body')
    .all()
  
  // Filter posts that have at least one matching tag
  const relatedPosts = allPosts
    .filter(blogPost => {
      if (!blogPost.tags || blogPost.tags.length === 0) return false
      return blogPost.tags.some(tag => post.value?.tags?.includes(tag))
    })
    .slice(0, 4)
  
  return relatedPosts
})

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          selectedTOCItem.value = entry.target.id
        }
      })
    },
    {
      rootMargin: '-45px 0px -80% 0px', // Adjust based on your header height
      threshold: 0
    }
  )

  // Get all TOC items (flattened)
  const allTOCItems = getAllTocItems(TOC)

  // Observe all headings
  allTOCItems.forEach(item => {
    const element = document.getElementById(item.id)
    if (element) {
      observer.observe(element)
    }
  })

  // Cleanup
  onBeforeUnmount(() => {
    observer.disconnect()
  })
})

// SEO
const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title: `${post.value.title} | Golden Gate Manor Blog`,
  ogTitle: `${post.value.title} | Golden Gate Manor Blog`,
  description: post.value.description,
  ogDescription: post.value.description,
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: `${post.value.title} | Golden Gate Manor Blog`,
  twitterDescription: post.value.description,
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image',
})
</script>

<style></style>