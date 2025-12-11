<template>
  <div v-if="authStore.authorized">
    <div class="md:grid md:grid-cols-15 md:max-w-[1500px] md:mx-auto">

      <!-- MAIN BLOG COLUMN -->
      <BaseLayoutPageSection
        v-if="body"
        margin="top"
        class="col-span-11 space-y-4"
        bg="transparent"
      >
        <!-- HEADER -->
        <div>
          <h1 class="text-3xl font-bold text-brand-primary">
            {{ post.title }}
          </h1>

          <p v-if="body" clas="mb-0!">
            Reading time: {{ reading.getReadingTimeString(body) }}
          </p>

          <time
            v-if="post.published"
            :datetime="formatDates.formatDatetime(post.published)"
          >
            Published On: {{ formatDates.formatDisplayDate(post.published) || 'Not Published' }}
          </time>

          <p v-if="post.author">
            By: {{ post.author }}
          </p>
        </div>

        <!-- MOBILE IMAGE + TAGS -->
        <div class="w-3/4 mx-auto space-y-4">
          <div
            class="overflow-hidden rounded-lg md:hidden border border-black/20 p-8 shadow-interior"
          >
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

        <!-- AT A GLANCE (extracted from markdown) -->
        <BlogAtAGlance v-if="atAGlanceItems?.length" class="mb-8">
          <ul class="list-disc pl-5 space-y-1">
            <li
            v-for="item in atAGlanceItems"
              :key="item"
              v-html="sanitize(item)"
            />
          </ul>
        </BlogAtAGlance>

        <!-- MAIN BODY RENDERER (HTML PREVIEW) -->
        <div
          v-if="renderedHtml"
          id="main-body"
          class="prose prose-lg space-y-2 text-xl text-brand-main-text"
          v-html="renderedHtml"
        />

        <div class="md:hidden">
          <BlogPostSocialShare />
        </div>
      </BaseLayoutPageSection>

      <!-- ASIDE COLUMN (DESKTOP) -->
      <BaseLayoutPageSection
        v-if="post.title"
        margin="top"
        class="col-span-4 max-md:hidden"
        bg="transparent"
      >
        <aside class="space-y-4 sticky top-20">
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
                  class="bg-brand-primary border-brand-secondary border-2 p-2 text-white rounded-lg"
                >
                  {{ tag }}
                </span>
              </div>
            </span>
          </div>

          <BlogPostSocialShare is-aside />
        </aside>
      </BaseLayoutPageSection>
    </div>

    <!-- RELATED POSTS -->
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
            <div class="flex flex-col shadow-primary rounded-xl overflow-hidden h-full">
              <div class="h-1/2 relative">
                <p class="flex items-center gap-2 absolute top-2 left-2 bg-brand-primary/50 p-1 rounded-lg">
                  <span class="text-sm text-white">
                    Read Time:
                    {{ reading.getReadingTime(relatedPost.body as MarkdownRoot) }}
                  </span>
                </p>

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
                <div class="flex flex-col gap-2 pt-4 px-2">
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

                <div class="flex flex-col justify-between px-2 pt-2 pb-4">
                  <h3 class="text-xl font-bold text-brand-primary">
                    {{ relatedPost.title }}
                  </h3>
                  <p class="post-body">
                    {{ relatedPost.summary ? text.truncateText(relatedPost.summary, 100) : '' }}
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
import { nanoid } from 'nanoid'
import { useReading } from '../../../../composables/blog/reading'
import { useBlogSchema } from '../../../../composables/blog/schema'
import { useText } from '../../../../composables/text'
import { useDateFormat } from '../../../../composables/dates/dateFormat'
import type { BlogPost, BlogGetResponse } from '../../../../models/blog'

const { sanitize } = useSanitize()
/* ---------- PAGE META ---------- */
definePageMeta({
  layout: 'admin-blog-post',
  breadcrumbLabel: 'Blog Posts'
})

/* ---------- COMPOSABLES & STORES ---------- */
const route = useRoute()
const authStore = useAuthStore()
const formatDates = useDateFormat()
const reading = useReading()
const blogSchema = useBlogSchema()
const text = useText()

/* ---------- SLUG ---------- */
const slug = Array.isArray(route.params.slug)
  ? route.params.slug.join('/')
  : (route.params.slug as string)

const contentPath = `/blog/post/${slug}`

/* ---------- DEFAULT POST ---------- */
const emptyPost = (): BlogPost => ({
  id: nanoid(),
  title: '',
  description: '',
  date: '',
  author: '',
  draft: true,
  tags: [],
  thumbnail: '',
  thumbnailAlt: '',
  thumbnailHeight: '300',
  thumbnailWidth: '600',
  summary: '',
  published: undefined
})

/* ---------- MAIN POST STATE ---------- */
const post = ref<BlogPost>(emptyPost())
const body = ref<string>('')

/* ---------- FETCH POST ---------- */
const { data: apiPost, execute: execPost } = await useAsyncData<BlogGetResponse | null>(
  `admin-blog-${slug}`,
  async () => {
    const idToken = await authStore.getIdToken()
    return await $fetch<BlogGetResponse>(`/api/admin/blog/${slug}`, {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    })
  },
  { server: false, immediate: false, default: () => null }
)

/* ---------- HYDRATE POST ---------- */
watch(
  apiPost,
  (val) => {
    if (!val) {
      post.value = emptyPost()
      body.value = ''
      return
    }
    post.value = { ...emptyPost(), ...val.meta }
    body.value = val.body
  },
  { immediate: true }
)

/* ---------- AT A GLANCE EXTRACTION ---------- */
const atAGlanceItems = ref<string[] | null>(null)

function extractAtAGlance(md: string) {
  const regex = /::BlogAtAGlance\s*([\s\S]*?)\s*::/m
  const match = md.match(regex)

  if (!match || !match[1]) {
    return { cleaned: md, items: null }
  }
  const inner = match[1].trim()

  const items = inner
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith('-'))
    .map(line => line.replace(/^-+\s*/, '').trim())
    .map(line =>
      line
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
    )

  return {
    cleaned: md.replace(regex, '').trim(),
    items
  }
}

/* ---------- HTML PREVIEW RENDERING ---------- */
const renderedHtml = ref<string>('')

watch(
  () => body.value,
  async (markdown) => {
    const trimmed = markdown?.trim()
    if (!trimmed) {
      renderedHtml.value = ''
      atAGlanceItems.value = null
      return
    }

    // Extract ::BlogAtAGlance block
    const { cleaned, items } = extractAtAGlance(trimmed)
    atAGlanceItems.value = items

    try {
      const idToken = await authStore.getIdToken()
      const res = await $fetch<{ html: string }>('/api/admin/blog/render', {
        method: 'POST',
        body: { markdown: cleaned },
        headers: { Authorization: `Bearer ${idToken}` }
      })

      renderedHtml.value = res.html
    } catch (err) {
      console.error('Markdown render failed:', err)
      renderedHtml.value = ''
    }
  },
  { immediate: true }
)

/* ---------- RELATED POSTS ---------- */
const { data: relatedPosts, execute: execRelated } = await useAsyncData<BlogPost[]>(
  `admin-blog-related-${route.path}`,
  async () => {
    if (!post.value?.tags?.length) return []

    const all = await queryCollection('blog')
      .where('path', '<>', contentPath)
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

/* ---------- AUTH GATE ---------- */
const canFetch = computed(() => authStore.isFirebaseReady && authStore.authorized)

onMounted(async () => {
  const { $getFirebase } = useNuxtApp()
  await $getFirebase()

  if (canFetch.value) {
    await execPost()
    if (post.value.id) await execRelated()
    return
  }

  const stop = watch(
    canFetch,
    async ok => {
      if (!ok) return
      stop()
      await execPost()
      if (post.value.id) await execRelated()
    },
    { immediate: false }
  )
})

/* ---------- RELATED POSTS AUTO-REFRESH ---------- */
watch(
  () => post.value.id,
  async id => {
    if (id) await execRelated()
  }
)

/* ---------- SEO ---------- */
const runtimeConfig = useRuntimeConfig()

watchEffect(() => {
  if (!post.value.title) return

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
#main-body:deep(h1),
#main-body:deep(h2),
#main-body:deep(h3),
#main-body:deep(h4),
#main-body:deep(h5),
#main-body:deep(h6) {
  scroll-margin-top: 80px;
}

#main-body:deep(h1) {
  @apply text-3xl font-bold text-brand-primary mt-6 mb-4;
}

#main-body:deep(h2) {
  @apply text-2xl font-bold text-brand-primary mt-5 mb-3;
}

#main-body:deep(h3) {
  @apply text-lg font-bold text-black underline mt-4 mb-2;
}

#main-body:deep(h4) {
  @apply text-base font-bold text-brand-primary mt-3 mb-2;
}

#main-body:deep(p) {
  @apply text-brand-main-text text-lg leading-relaxed mb-4;
}

#main-body:deep(ul) {
  @apply list-disc ml-8 text-brand-main-text space-y-1 mb-4;
}

#main-body:deep(ol) {
  @apply list-decimal ml-8 text-brand-main-text space-y-1 mb-4;
}

#main-body:deep(li) {
  @apply mb-1;
}

#main-body:deep(a) {
  @apply font-semibold underline text-brand-primary hover:text-brand-link-hover
}

#main-body:deep(strong) {
  @apply font-bold text-brand-main-text;
}

#main-body:deep(blockquote) {
  @apply relative pl-2 before:h-full before:w-1 before:absolute before:top-0 before:left-0 before:bg-brand-primary before:rounded-full
}

#main-body:deep(hr) {
  @apply my-8 border-t border-zinc-300;
}
</style>
