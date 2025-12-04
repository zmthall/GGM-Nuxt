<template>
  <div v-if="authStore.authorized">
    <BaseLayoutPageSection bg="transparent" margin="top">
      <BaseLayoutPageContainer>
          <BaseLayoutCard :centered="false">
            <div v-if="!isLoadingInitial">
              <div v-if="posts.length > 0" class="mb-4">
                <BaseUiAction type="button" class="py-1 px-2 group" styling="flex items-center gap-2" @click="openAddPostModal"><span>Add New Post</span><BaseIcon name="material-symbols:add-circle" color="text-white" hover-color="group-hover:text-brand-primary" class="transition-colors duration-500 ease-in-out" size="size-5"/></BaseUiAction>
              </div>
              <h2 class="mb-4 border-b border-b-zinc-200 text-2xl text-brand-primary font-bold">Blog Posts</h2>
              <ul v-if="posts.length > 0" class="overflow-x-auto flex flex-col">
                <li v-for="post in posts" :key="post.id" class="odd:bg-zinc-200 even:bg-zinc-100 hover:bg-zinc-300 min-w-max">
                  <button class="p-4 flex justify-between gap-10 w-full min-w-[675px]" @click="openEditPostModal(getSlug(post.path))">
                    <div class="flex gap-2 min-w-[675px] max-w-[675px]">
                      <NuxtImg format="webp,avif" :src="post.thumbnail || '/images/blog/blog-default-thumbnail.png'"  :alt="post.thumbnailAlt || ''" :title="post.thumbnailAlt || ''" :width="post.thumbnailWidth || '128'" :height="post.thumbnailHeight || '80'" class="w-32 h-20 object-cover" />
                      <div class="flex flex-col items-start justify-center">
                        <p class="text-xs">Last Updated: {{ dateFormat.formatShortDateNoLeadingZero(post.date) }}</p>
                        <h3 :title="post.title" class="text-xl text-brand-primary font-bold">{{ text.truncateText(post.title, 50) }}</h3>
                        <NuxtLink
                          v-if="post.path"
                          :to="isPublished(post) ? `/news${post.path}` : `/admin${post.path}`"
                          class="text-brand-primary/75 underline hover:text-brand-link-hover"
                          @click.stop
                        >
                          {{ getSlug(post.path) }}
                        </NuxtLink>
                      </div>
                    </div>
                    <div class="flex self-end gap-2 h-full">
                      <button title="Edit" class="group flex" @click.stop="openEditPostModal(getSlug(post.path))"><BaseIcon name="material-symbols:edit-square-outline-rounded" hover-color="group-hover:text-brand-link-hover"/></button>
                      <NuxtLink title="Preview" class="group flex" :to="`/admin${post.path}`" @click.stop><BaseIcon name="material-symbols:preview" hover-color="group-hover:text-brand-link-hover" /></NuxtLink>
                      <button title="Delete" class="group flex" @click.stop="showDeleteConfirmation(getSlug(post.path))"><BaseIcon name="material-symbols:delete-forever" hover-color="group-hover:text-brand-link-hover"/></button>
                    </div>
                    <div :class="['min-w-[100px] flex flex-col justify-center items-center self-end gap-2']">
                      <div>
                        <span v-if="post.draft" class="bg-blue-300 px-2 py-1 rounded-full text-blue-800">
                          Draft
                        </span>
                        <div v-if="post.published" class="flex flex-col items-center">
                          <span class="bg-green-300 px-2 py-1 rounded-full text-green-800">Published</span>
                          <time :datetime="post.published" class="w-max">{{ dateFormat.formatShortDateNoLeadingZero(post.published) }}</time>
                        </div>
                      </div>
                      <BaseUiAction v-if="!post.published" type="button" stop-propagation class="p-1" @click="showPublishModal(getSlug(post.path))">Publish</BaseUiAction>
                    </div>
                  </button>
                </li>
              </ul>
              <div v-else class="p-8 text-xl text-brand-main-text bg-zinc-300 rounded-xl shadow-primary mb-">
                  <p>There are no blog posts. <button class="link" @click="openAddPostModal">Add a blog post</button> to get started.</p>
              </div>
            </div>
            <div v-else class="animate-pulse">
              Loading Blog Posts...
            </div>
          </BaseLayoutCard>
        <div v-if="hasMorePages" class="flex justify-center mt-8">
            <BaseUiAction type="button" class="py-4 px-8" @click="loadMore">View More</BaseUiAction>
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
    <AdminAddBlogPostModal v-if="blogPostModalOpen" v-model="blogPostModalOpen" v-model:slug="blogPostModalSlug" @close="closePostModal" @create-post="refreshPosts" @edited-post="refreshPosts"/>
    <BaseInteractiveModal v-model="deleteConfirmationModal" hide-close tiny-modal :padding="2">
      <p>Are you sure you want to delete this blog post?</p>
      <div class="flex justify-end mt-2 gap-2">
        <BaseUiAction type="button" class="py-1 px-2" @click="confirmDelete">Yes</BaseUiAction>
        <BaseUiAction type="button" class="py-1 px-2" @click="cancelDelete">No</BaseUiAction>
      </div>
    </BaseInteractiveModal>

    <BaseInteractiveModal v-model="blogPostPublishModalOpen" :padding="3" small-modal @close="cancelPublish">
      <h2 class="mb-4 border-b border-b-zinc-200 text-2xl text-brand-primary font-bold">Publish Date Information</h2>
      <div class="h-full">
        <div class="h-full flex flex-col justify-between">
          <div class="space-y-4">
            <BaseFormToggleSwitch v-model="publishToggle" name="set-today" label="Publish Today" />
            <div v-if="!publishToggle" class="sm:w-1/2">
              <BaseFormDatePicker v-model="publishDate" name="publish-date" label="Publish Date" />
            </div>
          </div>
          <div class="flex justify-end gap-2 w-full">
            <BaseUiAction type="button" class="py-1 px-2" @click="cancelPublish">Cancel</BaseUiAction>
            <BaseUiAction type="button" class="py-1 px-2" @click="publishPost">Publish Post</BaseUiAction>
          </div>
        </div>
      </div>
    </BaseInteractiveModal>
  </div>
  <div v-else>
      <AdminLogin />
  </div>
</template>

<script lang="ts" setup>
import type { BlogPost } from '../../../models/blog'
import { useDateFormat } from '../../../composables/dates/dateFormat'

definePageMeta({ layout: 'admin' })

const authStore = useAuthStore()
const text = useText()
const dateFormat = useDateFormat()

// ---------- state
const posts = ref<BlogPost[]>([])
const isLoading = ref(false)
const hasMorePages = ref(true)
const page = ref(1)
const limit = 10

const deleteConfirmationModal = ref(false)
const deleteSlug = ref<string | null>(null)

const blogPostPublishModalOpen = ref(false)
const publishSlug = ref<string | null>(null)
const publishToggle = ref(true)
const publishDate = ref('')

const blogPostModalOpen = ref(false)
const blogPostModalSlug = ref<string | null>(null)

// ---------- helpers
const canFetch = computed(() => authStore.isFirebaseReady && authStore.authorized)

const getSlug = (path?: string): string => {
  if (!path) return ''
  const arr = path.split('/')
  return arr[arr.length - 1] || ''
}

const isPublished = (post: BlogPost): boolean => {
  if (post.draft) return false
  const s = String(post.published ?? '').trim()
  if (!s) return false
  const publishedAt = /^\d{4}-\d{2}-\d{2}$/.test(s)
    ? new Date(`${s}T23:59:59.999Z`)
    : new Date(s)
  const ts = publishedAt.getTime()
  if (Number.isNaN(ts)) return false
  return ts <= Date.now()
}

// ---------- initial list via internal Nuxt API (no token headers)
// const {
//   data: initialPosts,
//   execute,
//   refresh,
//   pending: isLoadingInitial
// } = await useAsyncData<BlogPost[]>(
//   'admin-blog-page-1',
//   () => $fetch<BlogPost[]>('/api/admin/blog/posts', {
//     method: 'GET',
//     query: { page: 1, limit }
//   }),
//   { server: false, immediate: false, default: () => [] }
// )

const isLoadingInitial = ref(true)
const initialPosts = ref<BlogPost[]>([])

const fetchInitialPosts = async () => {
  isLoadingInitial.value = true

  const idToken = await authStore.getIdToken()
  try {
    const result = await $fetch<BlogPost[]>('/api/admin/blog/posts', {
      method: 'GET',
      query: { page: 1, limit },
      headers: {
        'authorization': `Bearer ${idToken}`
      }
    })
    initialPosts.value = result
  } catch (e) {
    console.error('fetchInitialPosts:', e)
  } finally {
    isLoadingInitial.value = false
  }
}

// seed list & hasMore
watch(initialPosts, (list) => {
  posts.value = list ?? []
  hasMorePages.value = (posts.value.length === limit)
}, { immediate: true })

// fetch only when Firebase is ready + user authorized
onMounted(async () => {
  const { $getFirebase } = useNuxtApp()
  await $getFirebase()

  if (canFetch.value) {
    await fetchInitialPosts()
    return
  }

  const stop = watch(
    canFetch,
    async ok => {
      if (!ok) return
      stop()
      await fetchInitialPosts()
    },
    { immediate: false }
  )
})

// ---------- actions (all internal $fetch calls)
const loadMore = async () => {
  if (!hasMorePages.value || isLoading.value || !canFetch.value) return
  isLoading.value = true
  page.value++

  const idToken = await authStore.getIdToken();

  try {
    const newPosts = await $fetch<BlogPost[]>('/api/admin/blog/posts', {
      method: 'GET',
      query: { page: page.value, limit },
      headers: {
        "Authorization": `Bearer ${idToken}`
      }
    })
    if (newPosts?.length) posts.value.push(...newPosts)
    if ((newPosts?.length ?? 0) < limit) hasMorePages.value = false
  } catch (e) {
    console.error('loadMore:', (e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const refreshPosts = async () => {
  blogPostModalOpen.value = false
  page.value = 1
  await fetchInitialPosts();
}

const showDeleteConfirmation = (slug: string) => {
  deleteSlug.value = slug
  deleteConfirmationModal.value = true
}
const cancelDelete = () => {
  deleteConfirmationModal.value = false
  deleteSlug.value = null
}
const confirmDelete = async () => {
  if (deleteSlug.value) await deletePost(deleteSlug.value)
  deleteConfirmationModal.value = false
  deleteSlug.value = null
}

const deletePost = async (slug: string) => {
  const idToken = await authStore.getIdToken();

  try {
    await $fetch(`/api/admin/blog/${slug}`, {
      method: 'DELETE',
      query: { removeImage: true }, // omit to keep image
      headers: {
        'Authorization': `Bearer ${idToken}`
      }
    })
    await fetchInitialPosts()
  } catch (e) {
    console.error('deletePost:', (e as Error).message)
  }
}

const showPublishModal = (slug: string) => {
  publishSlug.value = slug
  blogPostPublishModalOpen.value = true
}
const cancelPublish = () => {
  publishSlug.value = null
  blogPostPublishModalOpen.value = false
  publishToggle.value = true
  publishDate.value = ''
}

const publishPost = async () => {
  if (!publishSlug.value) return

  let pDate: string
  if (publishToggle.value) {
    pDate = new Date().toISOString()
  } else {
    if (!publishDate.value) {
      console.error('Publish Date is missing')
      return
    }
    pDate = new Date(publishDate.value).toISOString()
  }

  const idToken = await authStore.getIdToken();

  try {
    await $fetch(`/api/admin/blog/${publishSlug.value}`, {
      method: 'PUT',
      body: { meta: { published: pDate, draft: false, date: new Date().toISOString() } },
      headers: {
        'Authorization': `Bearer ${idToken}`
      }
    })
    cancelPublish()
    await fetchInitialPosts()
  } catch (e) {
    console.error('publishPost:', (e as Error).message)
  }
}

const openAddPostModal = () => { blogPostModalOpen.value = true }
const openEditPostModal = (slug: string) => { blogPostModalSlug.value = slug; blogPostModalOpen.value = true }
const closePostModal = () => { blogPostModalSlug.value = null }

// optional: clamp hasMore on first mount if initial returned < limit
onMounted(() => {
  if ((initialPosts.value?.length ?? 0) < limit) hasMorePages.value = false
})
</script>


<style scoped>

</style>