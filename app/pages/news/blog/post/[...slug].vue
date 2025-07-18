<template>
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
            <h3>Tags:</h3>
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
            <h3>Tags:</h3>
            <span v-for="tag in post.tags" :key="tag" class="bg-brand-primary border-brand-secondary border-2 p-2 text-white rounded-lg hover:bg-brand-secondary hover:text-brand-primary transition-colors ease-in-out duration-500">
              {{ tag }}
            </span>
          </span>
        </div>
        <div>
          <!-- Social icons to share page -->
          <BlogPostSocialShare is-aside/>
        </div>
      </aside>
    </BaseLayoutPageSection>
    <Teleport to="body">
        <ClientOnly>
          <button :class="['fixed top-1/2 -translate-y-1/2 w-10 h-10 transition-transform duration-500 ease-in-out group z-16 flex justify-start items-center rounded-r-full bg-brand-primary border-r-2 border-t-2 border-b-2 border-brand-secondary hover:bg-brand-secondary hover:border-brand-primary', {'translate-x-[75vw] sm:translate-x-80': tocDrawerOpen, 'translate-x-0': !tocDrawerOpen}]" title="Table of Contents" @click="toggleTOCDrawer">
            <BaseIcon v-show="!tocDrawerOpen" name="line-md:chevron-double-right" color="text-white" hover-color="group-hover:text-brand-primary" />
            <BaseIcon v-show="tocDrawerOpen" name="line-md:chevron-double-left" color="text-white" hover-color="group-hover:text-brand-primary" />
          </button>
          <aside v-if="TOC" :class="['fixed top-1/2 -translate-y-1/2 left-0 w-3/4 sm:w-80 bg-brand-primary shadow-primary border-r border-t border-b border-white p-4 overflow-y-auto rounded-r-xl z-16 transition-transform ease-in-out duration-500', {'translate-x-0': tocDrawerOpen, '-translate-x-[100%]': !tocDrawerOpen}]" aria-label="Table of Contents">
            <div class="overflow-y-auto max-h-[450px] ">
              <h2 class="text-brand-secondary text-center text-xl font-bold underline mb-2">Table of Contents</h2>
              <ul class="ml-5 text-white list-decimal">
                <li v-for="link in TOC.links" :key="link.id" class="mb-2">
                  <a :href="`#${link.id}`" :class="['capitalize hover:text-brand-secondary hover:underline text-md flex relative', {'text-brand-secondary after:w-1 after:h-full after:bg-brand-secondary after:absolute after:rounded-xl after:right-2': selectedTOCItem === link.id}]" @click="selectTOCItem(link.id)">{{ link.id }}</a>
                  <ul v-if="link.children" class="ml-4 list-roman">
                    <li v-for="child in link.children" :key="child.id" class="mt-2">
                        <a :href="`#${child.id}`" :class="['capitalize hover:text-brand-secondary hover:underline text-md flex relative', {'text-brand-secondary after:w-1 after:h-full after:bg-brand-secondary after:absolute after:rounded-xl after:right-2': selectedTOCItem === child.id}]" @click="selectTOCItem(child.id)">{{ child.id }}</a>
                        <ul v-if="link.children" class="ml-4 list-[lower-alpha]">
                          <li v-for="subchild in child.children" :key="subchild.id" class="mt-2">
                              <a :href="`#${subchild.id}`" :class="['capitalize hover:text-brand-secondary hover:underline text-md flex relative', {'text-brand-secondary after:w-1 after:h-full after:bg-brand-secondary after:absolute after:rounded-xl after:right-2': selectedTOCItem === subchild.id}]" @click="selectTOCItem(subchild.id)">{{ subchild.id }}</a>
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
import { useReading } from '../../../../composables/blog/reading';
import { useDateFormat } from '../../../../composables/dates/dateFormat';

const route = useRoute();
const formatDates = useDateFormat();
const reading = useReading();

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

const selectTOCItem = (id: string) => {
  if(id)
    selectedTOCItem.value = id;
  else selectedTOCItem.value = ''
}

const toggleTOCDrawer = () => {
  tocDrawerOpen.value = !tocDrawerOpen.value;
}

console.log(TOC)

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