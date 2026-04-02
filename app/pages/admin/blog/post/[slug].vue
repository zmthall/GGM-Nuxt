<template>
  <div v-if="isLoadingPage">
    <div class="min-[1000px]:grid min-[1000px]:grid-cols-16 min-[1000px]:max-w-[1500px] min-[1000px]:mx-auto">
      <BaseLayoutPageSection margin="top" class="col-span-12">
        <div class="mb-2 animate-pulse">
          <div class="h-12 w-4/5 rounded bg-zinc-200" />

          <div class="mt-3 flex items-center gap-3">
            <div class="h-4 w-28 rounded bg-zinc-200" />
            <div class="size-2 rounded-full bg-zinc-200" />
            <div class="h-4 w-32 rounded bg-zinc-200" />
            <div class="size-2 rounded-full bg-zinc-200" />
            <div class="h-4 w-20 rounded bg-zinc-200" />
          </div>

          <div class="border-t border-brand-primary/5 mb-4 pt-4 mt-4 space-y-3">
            <div class="h-6 w-full rounded bg-zinc-200" />
            <div class="h-6 w-11/12 rounded bg-zinc-200" />
          </div>
        </div>

        <div class="w-full my-6 animate-pulse">
          <div class="aspect-[2/1] rounded-lg bg-zinc-200 shadow-primary" />
        </div>

        <div class="animate-pulse space-y-8">
          <div class="rounded-xl border border-zinc-300 bg-zinc-50 p-6 shadow-sm">
            <div class="h-8 w-48 rounded bg-zinc-200 mb-4" />
            <div class="space-y-4">
              <div class="h-5 w-full rounded bg-zinc-200" />
              <div class="h-5 w-11/12 rounded bg-zinc-200" />
              <div class="h-5 w-10/12 rounded bg-zinc-200" />
              <div class="h-5 w-full rounded bg-zinc-200" />
              <div class="h-5 w-9/12 rounded bg-zinc-200" />
            </div>
          </div>

          <div>
            <div class="h-10 w-80 rounded bg-zinc-200 mb-4" />
            <div class="space-y-3">
              <div class="h-5 w-full rounded bg-zinc-200" />
              <div class="h-5 w-full rounded bg-zinc-200" />
              <div class="h-5 w-10/12 rounded bg-zinc-200" />
              <div class="h-5 w-full rounded bg-zinc-200" />
              <div class="h-5 w-11/12 rounded bg-zinc-200" />
              <div class="h-5 w-8/12 rounded bg-zinc-200" />
            </div>
          </div>

          <div>
            <div class="h-10 w-72 rounded bg-zinc-200 mb-4" />
            <div class="space-y-3">
              <div class="h-5 w-full rounded bg-zinc-200" />
              <div class="h-5 w-11/12 rounded bg-zinc-200" />
              <div class="h-5 w-full rounded bg-zinc-200" />
              <div class="h-5 w-9/12 rounded bg-zinc-200" />
            </div>
          </div>
        </div>
      </BaseLayoutPageSection>

      <BaseLayoutPageSection :padding="false" class="col-span-4 max-[1000px]:hidden my-8 px-4">
        <aside class="sticky top-20 shadow-interior p-3 rounded-md animate-pulse">
          <div class="w-full max-h-[400px] overflow-hidden rounded-[3px] aspect-[2/1] bg-zinc-200" />
          <div class="mt-4 space-y-2">
            <div class="h-6 w-24 rounded bg-zinc-200" />
            <div class="h-6 w-20 rounded bg-zinc-200" />
            <div class="h-6 w-28 rounded bg-zinc-200" />
          </div>
          <div class="mt-6 space-y-3">
            <div class="h-5 w-32 rounded bg-zinc-200" />
            <div class="h-10 w-full rounded bg-zinc-200" />
          </div>
        </aside>
      </BaseLayoutPageSection>
    </div>
  </div>

  <div v-else-if="canAccessAdminBlogPost && post">
    <div class="min-[1000px]:grid min-[1000px]:grid-cols-16 min-[1000px]:max-w-[1500px] min-[1000px]:mx-auto">
      <BaseLayoutPageSection margin="top" class="col-span-12">
        <div class="mb-2">
          <h1 class="text-3xl font-bold text-brand-primary">
            {{ post.title }}
          </h1>

          <div class="flex items-center gap-2 font-main text-sm mt-1">
            <p v-if="post.author">By {{ post.author }}</p>
            <BaseIcon name="ph:diamond-fill" size="size-[8px]" color="text-brand-primary/15" />
            <time v-if="post.publishTimestamp" :datetime="formatDates.formatDatetime(post.publishTimestamp ?? undefined)">
              {{ formatDates.formatDisplayDate(post.publishTimestamp ?? undefined) }}
            </time>
            <BaseIcon name="ph:diamond-fill" size="size-[8px]" color="text-brand-primary/15" class="max-xs:hidden" />
            <span class="max-xs:hidden">{{ `${post.readTime} min read` }}</span>
          </div>

          <BlogPostTags :post="post" class="min-[1000px]:hidden mt-2 mb-3" />

          <div class="border-t border-brand-primary/5 mb-4 pt-4 mt-2">
            <p class="text-lg text-brand-main-text/85 leading-relaxed">{{ post.summary }}</p>
          </div>
        </div>

        <div class="w-full my-6">
          <div class="relative overflow-hidden rounded-lg min-[1000px]:hidden shadow-primary">
            <div class="flex items-center gap-2 absolute z-1 top-3 left-3 bg-brand-primary/40 px-2 py-1 rounded-lg xs:hidden">
              <span class="text-white/75 text-xs">{{ `${post.readTime} min read` }}</span>
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

        <BlogPostContentRenderer v-if="post.content" id="blog-post-article" :content="post.content" />

        <div class="min-[1000px]:hidden">
          <BlogPostSocialShare class="mt-3" />
        </div>
      </BaseLayoutPageSection>

      <BaseLayoutPageSection :padding="false" class="col-span-4 max-[1000px]:hidden my-8 px-4">
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
  </div>

  <div v-else-if="isCorrespondenceBlocked">
    <BaseLayoutPageSection bg="transparent" margin="top">
      <BaseLayoutPageContainer>
        <BaseLayoutCard :centered="false">
          <div class="p-8 text-xl text-brand-main-text bg-zinc-300 rounded-xl shadow-primary">
            <p>You do not have access to this Blog Preview page. Please contact an administrator if you believe this is an error.</p>
          </div>
        </BaseLayoutCard>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
  </div>

  <div v-else>
    <AdminLogin />
  </div>
</template>

<script setup lang="ts">
import { useBlogPostsApi } from '~/composables/blog/blogPostsAPI'
import { useDateFormat } from '~/composables/dates/dateFormat'
import type { BlogPostFull } from '~/models/blog'

definePageMeta({
  layout: 'admin-blog-post',
  breadcrumbOverrides: [
    { label: 'Dashboard', to: '/admin' },
    { label: 'Blog', to: '/admin/blog' },
    false,
    false,
    undefined
  ]
})

const route = useRoute()
const authStore = useAuthStore()
const formatDates = useDateFormat()
const blogPostsAPI = useBlogPostsApi()
const runtimeConfig = useRuntimeConfig()

const resolvedSlug = computed(() => {
  const raw = route.params.slug

  if (!raw) return null
  if (Array.isArray(raw)) return raw.join('/')

  return String(raw)
})

const canAccessAdminBlogPost = computed(() => {
  return authStore.isFirebaseReady && authStore.authorized && authStore.role === 'admin'
})

const isCorrespondenceBlocked = computed(() => {
  return authStore.isFirebaseReady && authStore.authorized && authStore.role === 'correspondence'
})

const shouldLoadPost = computed(() => {
  return canAccessAdminBlogPost.value && !!resolvedSlug.value
})

const {
  data: post,
  pending: postPending
} = await useAsyncData<BlogPostFull | null>(
  () => resolvedSlug.value ? `admin-blog-post-${resolvedSlug.value}` : 'admin-blog-post-null',
  async () => {
    if (!shouldLoadPost.value || !resolvedSlug.value) return null

    const result = await blogPostsAPI.getPostBySlug(resolvedSlug.value)

    if (!result) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Blog post not found'
      })
    }

    return result
  },
  {
    default: () => null,
    watch: [shouldLoadPost, resolvedSlug]
  }
)

const isLoadingPage = computed(() => {
  if (!authStore.isFirebaseReady) return true
  if (authStore.authorized && authStore.role === null) return true
  if (shouldLoadPost.value && postPending.value) return true
  return false
})

watchEffect(() => {
  if (post.value?.title) {
    route.meta.breadcrumbLabel = post.value.title
  }
})

useSeoMeta({
  title: () => post.value?.title ? `${post.value.title} | Golden Gate Manor Blog` : 'Golden Gate Manor Blog',
  ogTitle: () => post.value?.title ? `${post.value.title} | Golden Gate Manor Blog` : 'Golden Gate Manor Blog',
  description: () => post.value?.seoDescription || '',
  ogDescription: () => post.value?.seoDescription || '',
  ogImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterTitle: () => post.value?.title ? `${post.value.title} | Golden Gate Manor Blog` : 'Golden Gate Manor Blog',
  twitterDescription: () => post.value?.seoDescription || '',
  twitterImage: `${runtimeConfig.public.siteUrl}/images/seo/ogImage-golden-gate-manor.png`,
  twitterCard: 'summary_large_image'
})
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