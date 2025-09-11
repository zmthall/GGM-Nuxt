<template>
  <div v-if="authStore.authorized">
    <BaseLayoutPageSection bg="transparent" margin="top">
      <BaseLayoutPageContainer>
          <BaseLayoutCard :centered="false">
            <div v-if="posts.length > 0" class="mb-4">
              <BaseUiAction type="button" class="py-1 px-2 group" styling="flex items-center gap-2"><span>Add New Post</span><BaseIcon name="material-symbols:add-circle" color="text-white" hover-color="group-hover:text-brand-primary" class="transition-colors duration-500 ease-in-out" size="size-5"/></BaseUiAction>
            </div>
            <h2 class="mb-4 border-b border-b-zinc-200 text-2xl text-brand-primary font-bold">Blog Posts</h2>
            <ul v-if="posts.length > 0">
              <li v-for="post in posts" :key="post.id" class="odd:bg-zinc-200 even:bg-zinc-100 hover:bg-zinc-300">
                <button class="p-4 flex justify-between w-full" @click="console.log('test-full-button')">
                  <div class="flex gap-2 min-w-[650px]">
                    <NuxtImg :src="post.thumbnail" :alt="post.thumbnailAlt" :title="post.thumbnailAlt" :width="post.thumbnailWidth" :height="post.thumbnailHeight" class="w-32 h-20 object-cover" />
                    <div class="flex flex-col items-start justify-center">
                      <p class="text-xs">Created: {{ post.date }}</p>
                      <h3 :title="post.title" class="text-xl text-brand-primary font-bold">{{ text.truncateText(post.title, 50) }}</h3>
                      <NuxtLink v-if="post.path && post.draft" :to="`/admin${post.path}`" class="text-brand-primary/75 underline hover:text-brand-link-hover">{{ getSlug(post.path) }}</NuxtLink>
                      <NuxtLink v-if="post.path && post.published" :to="`/news${post.path}`" class="text-brand-primary/75 underline hover:text-brand-link-hover">{{ getSlug(post.path) }}</NuxtLink>
                    </div>
                  </div>
                  <div class="flex items-end gap-2">
                    <button title="Edit" class="group flex" @click.stop="console.log('test-edit')"><BaseIcon name="material-symbols:edit-square-outline-rounded" hover-color="group-hover:text-brand-link-hover"/></button>
                    <NuxtLink title="Preview" class="group flex" :to="`/admin${post.path}`"><BaseIcon name="material-symbols:preview" hover-color="group-hover:text-brand-link-hover" /></NuxtLink>
                    <button title="Delete" class="group flex" @click.stop="console.log('test-delete')"><BaseIcon name="material-symbols:delete" hover-color="group-hover:text-brand-link-hover"/></button>
                  </div>
                  <div :class="['min-w-[75px] flex flex-col', { 'justify-between items-center': post.draft, 'justify-center items-center': post.published}]">
                    <div>
                      <span v-if="post.draft" class="bg-blue-300 px-2 py-1 rounded-full text-blue-800">
                        Draft
                      </span>
                      <div v-if="post.published" class="flex flex-col items-center">
                        <span class="bg-green-300 px-2 py-1 rounded-full text-green-800">Published</span>
                        <time :datetime="post.published">{{ post.published }}</time>
                      </div>
                    </div>
                    <BaseUiAction v-if="!post.published" type="button" stop-propagation class="p-1" @click="console.log('test-publish')">Publish</BaseUiAction>
                  </div>
                </button>
              </li>
            </ul>
            <div v-else class="p-8 text-xl text-brand-main-text bg-zinc-300 rounded-xl shadow-primary mb-">
                <p>There are no blog posts. <button class="link">Add a blog post</button> to get started.</p>
            </div>
          </BaseLayoutCard>
        <div v-if="hasMorePages" class="flex justify-center mt-8">
            <BaseUiAction type="button" class="py-4 px-8" @click="loadMore">View More</BaseUiAction>
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
  </div>
  <div v-else>
      <AdminLogin />
  </div>
</template>

<script lang="ts" setup>
import type { BlogPost } from '../../../models/blog.js';

definePageMeta({
    layout: 'admin',
})

const authStore = useAuthStore();
const text = useText();

const posts = ref<BlogPost[]>([])
const isLoading = ref<boolean>(false)
const hasMorePages = ref<boolean>(true)
const page = ref(1)
const limit = 10

const { data: initialPosts, execute } = await useAsyncData<BlogPost[]>(
  'blog-posts-initial',
  () => queryCollection('blog')
        .select('path','id','date','title','thumbnail','thumbnailAlt',
                'thumbnailWidth','thumbnailHeight', 'draft', 'published')
        .order('date','DESC')
        .limit(limit)
        .all(),
  { server: false, immediate: false, default: () => [] }
)

const getSlug = (path: string) => {
  const pathArr = path.split('/')
  
  return pathArr[pathArr.length - 1]
}

watch(
  () => authStore.authorized,
  async (ok) => {
    if (!ok) return
    await execute()                     // runs the fetcher
    posts.value = initialPosts.value ?? []
    hasMorePages.value = (posts.value.length === limit)
  },
  { immediate: true }
)

const loadMore = async () => {
  if (!hasMorePages.value || isLoading.value) return
  isLoading.value = true
  page.value++

  const newPosts = await $fetch<BlogPost[]>('/api/blog/posts', {
    query: { page: page.value, limit }
  })

  if (newPosts?.length) posts.value.push(...newPosts)
  if ((newPosts?.length ?? 0) < limit) hasMorePages.value = false
  isLoading.value = false
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

</style>