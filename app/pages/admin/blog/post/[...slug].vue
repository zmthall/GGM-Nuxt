<template>
  <div v-if="authStore.authorized">
    <div class="md:grid md:grid-cols-15 md:max-w-[1500px] md:mx-auto">
      <BaseLayoutPageSection
        v-if="post"
        margin="top"
        class="col-span-11 space-y-4"
        bg="transparent"
      >
        <div>
          <h1 class="text-3xl font-bold text-brand-primary">
            {{ post?.title }}
          </h1>
          <p v-if="post.body">
            Reading time: {{ reading.getReadingTime(post.body as MarkdownRoot) }}
          </p>
          <time v-if="post.published" :datetime="formatDates.formatDatetime(post.published)">
            Published On: {{ formatDates.formatDisplayDate(post.published) || 'Not Published' }}
          </time>
          <p v-if="post.author">By: {{ post.author }}</p>
        </div>
        <div class="w-3/4 mx-auto space-y-4">
          <div class="overflow-hidden rounded-lg md:hidden border border-black/20 p-8 shadow-interior">
            <NuxtImg
              format="webp,avif"
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
          <div v-if="post.tags" class="md:hidden">
            <span v-if="post.tags.length" class="flex gap-2 items-center">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="bg-brand-primary border-brand-secondary border-2 p-2 text-white rounded-lg hover:bg-brand-secondary hover:text-brand-primary transition-colors ease-in-out duration-500"
              >
                {{ tag }}
              </span>
            </span>
          </div>
        </div>
        <ContentRenderer
          v-if="post"
          :value="post"
          class="prose prose-lg space-y-2 text-xl text-brand-main-text"
        />
        <div class="md:hidden">
          <BlogPostSocialShare />
        </div>
      </BaseLayoutPageSection>

      <BaseLayoutPageSection
        v-if="post"
        margin="top"
        class="col-span-4 max-md:hidden"
        bg="transparent"
      >
        <aside class="space-y-4">
          <div class="w-full max-h-[400px] h-max overflow-hidden rounded-lg">
            <NuxtImg
              format="webp,avif"
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
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  class="bg-brand-primary border-brand-secondary border-2 p-2 text-white rounded-lg hover:bg-brand-secondary hover:text-brand-primary transition-colors ease-in-out duration-500"
                >
                  {{ tag }}
                </span>
              </div>
            </span>
          </div>
          <div>
            <BlogPostSocialShare is-aside />
          </div>
        </aside>
      </BaseLayoutPageSection>
    </div>

    <BaseLayoutPageSection
      v-if="relatedPosts && relatedPosts.length > 0"
      bg="alt"
      margin="default"
    >
      <h2 class="text-2xl font-bold text-brand-primary mb-4">Related Posts</h2>
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <li v-for="relatedPost in relatedPosts" :key="relatedPost.id">
          <NuxtLink
            :to="`/admin${relatedPost.path}`"
            class="flex sm:mx-auto lg:hover:scale-105 transition-transform duration-500 ease-in-out"
          >
            <div
              class="flex flex-col shadow-primary rounded-xl overflow-hidden h-full"
            >
              <div class="h-1/2 relative">
                <div>
                  <p
                    class="flex items-center gap-2 absolute top-2 left-2 bg-brand-primary/50 p-1 rounded-lg"
                  >
                    <span class="text-sm text-white">
                      Read Time:
                      {{ reading.getReadingTime(relatedPost.body as MarkdownRoot) }}
                    </span>
                  </p>
                </div>
                <NuxtImg
                  format="webp,avif"
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
                    <li
                      v-for="tag in relatedPost.tags"
                      :key="tag"
                      class="bg-brand-primary border-brand-secondary border-2 p-2 text-white rounded-lg"
                    >
                      {{ tag }}
                    </li>
                  </ul>
                  <time :datetime="formatDates.formatShortDate(relatedPost.date)">
                    Posted on: {{ formatDates.formatShortDate(relatedPost.date) }}
                  </time>
                </div>
                <div
                  class="flex flex-col justify-between px-2 pt-2 pb-4"
                >
                  <h3 class="text-xl font-bold text-brand-primary">
                    {{ relatedPost.title }}
                  </h3>
                  <p class="post-body">
                    {{
                      relatedPost.summary
                        ? text.truncateText(relatedPost.summary, 100)
                        : ''
                    }}
                  </p>
                </div>
              </div>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </BaseLayoutPageSection>
  </div>

  <div v-else>
    <AdminLogin />
  </div>
</template>

<script setup lang="ts">
import type { MarkdownRoot } from '@nuxt/content'
import { useReading } from '../../../../composables/blog/reading'
import { useBlogSchema } from '../../../../composables/blog/schema'
import { useText } from '../../../../composables/text'
import { useDateFormat } from '../../../../composables/dates/dateFormat'
import type { BlogPost } from '../../../../models/blog'

definePageMeta({
  layout: 'admin-blog-post',
  breadcrumbLabel: 'Blog Posts'
})

/* --- composables & stores --- */
const route = useRoute()
const authStore = useAuthStore()
const formatDates = useDateFormat()
const reading = useReading()
const blogSchema = useBlogSchema()
const text = useText()

/* --- slug & content path --- */
const slug = Array.isArray(route.params.slug)
  ? route.params.slug.join('/')
  : (route.params.slug as string)
const contentPath = `/blog/post/${slug}`

/* --- main post: fetched only after auth is ready + authorized --- */
const { data: post, execute: execPost } = await useAsyncData<BlogPost | null>(
  `admin-blog-${slug}`,
  () => queryCollection('blog').path(contentPath).first(),
  { server: false, immediate: false, default: () => null }
)

/* --- related posts: fetched after post is available --- */
const { data: relatedPosts, execute: execRelated } = await useAsyncData<BlogPost[]>(
  `admin-blog-related-${route.path}`,
  async () => {
    if (!post.value?.tags?.length) return []
    const all = await queryCollection('blog')
      .where('path', '<>', post.value.path)
      .select(
        'path',
        'id',
        'date',
        'title',
        'thumbnail',
        'thumbnailAlt',
        'thumbnailWidth',
        'thumbnailHeight',
        'tags',
        'summary',
        'body'
      )
      .all()

    return all
      .filter(p => Array.isArray(p.tags) && p.tags.some(t => post.value!.tags!.includes(t)))
      .slice(0, 4)
  },
  { server: false, immediate: false, default: () => [] }
)

/* --- gate fetching on Firebase ready + authorized --- */
const canFetch = computed(() => authStore.isFirebaseReady && authStore.authorized)

onMounted(async () => {
  // ensure lazy Firebase init finished (matches your other pages)
  const { $getFirebase } = useNuxtApp()
  await $getFirebase()

  if (canFetch.value) {
    await execPost()
    if (post.value) await execRelated()
    return
  }

  const stop = watch(
    canFetch,
    async ok => {
      if (!ok) return
      stop()
      await execPost()
      if (post.value) await execRelated()
    },
    { immediate: false }
  )
})

/* --- once post is loaded (or changes), fetch related once --- */
watch(
  () => post.value?.id,
  async id => {
    if (id) await execRelated()
  }
)

/* --- SEO & schema after post is available --- */
const runtimeConfig = useRuntimeConfig()

watchEffect(() => {
  if (!post.value) return

  const articleSchema = blogSchema.generateBlogSchema(post.value as BlogPost)
  useHead({
    script: [
      {
        key: 'ld-json-article',
        type: 'application/ld+json',
        innerHTML: JSON.stringify(articleSchema),
        'data-schema': 'article'
      }
    ]
  })

  useSeoMeta({
    title: `${post.value.title} | Golden Gate Manor Blog`,
    ogTitle: `${post.value.title} | Golden Gate Manor Blog`,
    description: post.value.description,
    ogDescription: post.value.description,
    ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
    twitterTitle: `${post.value.title} | Golden Gate Manor Blog`,
    twitterDescription: post.value.description,
    twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
    twitterCard: 'summary_large_image'
  })
})
</script>


<style scoped>
:deep(h1),
:deep(h2),
:deep(h3),
:deep(h4),
:deep(h5),
:deep(h6) {
  scroll-margin-top: 80px;
}

/* .blog-headings {
  @apply prose-h1:
} */
</style>