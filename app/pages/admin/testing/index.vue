<template>
  <div v-if="authStore.authorized && authStore.role !== 'correspondence'">
    <BaseLayoutPageSection bg="transparent" margin="top">
      <BaseLayoutPageContainer>
        <BaseLayoutCard :centered="false">
          <div v-if="!isLoadingPosts">
            <div v-if="allPosts.length > 0" class="mb-4 flex justify-between">
              <!-- <BaseUiAction type="button" class="py-1 px-2 group" styling="flex items-center gap-2" @click="openAddPostModal">
                <span>Add New Post</span><BaseIcon name="material-symbols:add-circle" color="text-white" hover-color="group-hover:text-brand-primary" class="transition-colors duration-500 ease-in-out" size="size-5" />
              </BaseUiAction> -->

              <div class="flex gap-2">
                <div>
                  <BaseUiAction type="button" class="px-2 py-1" @click="openContentCalendar = true">Open Calendar</BaseUiAction>

                  <AdminContentCalendarToolModal v-if="openContentCalendar" v-model="openContentCalendar" :csv="calendarCsv" @close="openContentCalendar = false" />
                </div>

                <!-- <BaseUiAction to="/news/blog" class="py-1 px-2 group" styling="flex items-center gap-2" @click="openAddPostModal">
                  <BaseIcon name="mdi:arrow-top-left-bold-box-outline" color="text-white" hover-color="group-hover:text-brand-primary" class="transition-colors duration-500 ease-in-out" size="size-5" /><span>Website Blog</span>
                </BaseUiAction> -->
              </div>
            </div>

            <h2 class="mb-4 border-b border-b-zinc-200 text-2xl text-brand-primary font-bold">Blog Posts</h2>

            <ul v-if="allPosts.length > 0" class="overflow-x-auto flex flex-col">
              <li v-for="post in allPosts" :key="post.id" class="odd:bg-zinc-200 even:bg-zinc-100 hover:bg-zinc-300 min-w-max">
                <button class="p-4 flex justify-between gap-10 w-full min-w-[675px]" @click="console.log(`openEditPostModal(post.slug))`)">
                  <div class="flex gap-2 min-w-[675px] max-w-[675px]">
                    <NuxtImg format="webp,avif" :src="post.thumbnail || '/images/blog/blog-default-thumbnail.png'" :alt="post.thumbnailAlt || ''" :title="post.thumbnailAlt || ''" :width="post.thumbnailWidth || '128'" :height="post.thumbnailHeight || '80'" class="w-32 h-20 object-cover" />
                    <div class="flex flex-col items-start justify-center">
                      <p class="text-xs">Last Updated: {{ formatDates.formatShortDateNoLeadingZero(post.updatedAt) }}</p>
                      <h3 :title="post.title" class="text-xl text-brand-primary font-bold">{{ text.truncateText(post.title, 50) }}</h3>
                      <NuxtLink :to="post.published ? blogPostsAPI.getBlogPostLink(post.slug) : blogPostsAPI.getBlogPostLinkAdmin(post.slug)" class="text-brand-primary/75 underline hover:text-brand-link-hover" @click.stop>
                        {{ post.slug }}
                      </NuxtLink>
                    </div>
                  </div>

                  <!-- <div class="flex self-end gap-2 h-full">
                    <button title="Edit" class="group flex" @click.stop="openEditPostModal(getSlug(post.path))"><BaseIcon name="material-symbols:edit-square-outline-rounded" hover-color="group-hover:text-brand-link-hover" /></button>
                    <NuxtLink title="Preview" class="group flex" :to="`/admin${post.path}`" @click.stop><BaseIcon name="material-symbols:preview" hover-color="group-hover:text-brand-link-hover" /></NuxtLink>
                    <button title="Delete" class="group flex" @click.stop="showDeleteConfirmation(getSlug(post.path))"><BaseIcon name="material-symbols:delete-forever" hover-color="group-hover:text-brand-link-hover" /></button>
                  </div>

                  <div :class="['min-w-[100px] flex flex-col justify-center items-center self-end gap-2']">
                    <div class="space-y-2">
                      <span v-if="post.draft" class="bg-blue-300 px-2 py-1 rounded-full text-blue-800">Draft</span>
                      <div v-if="post.published" class="flex flex-col items-center">
                        <span class="bg-green-300 px-2 py-1 rounded-full text-green-800">Published</span>
                        <time :datetime="post.publishTimestamp ?? undefined" class="w-max">{{ formatDates.formatShortDateNoLeadingZero(post.publishTimestamp ?? '') }}</time>
                      </div>
                    </div>
                    <BaseUiAction v-if="!post.published" type="button" stop-propagation class="p-1" @click="showPublishModal(getSlug(post.path))">Publish</BaseUiAction>
                  </div> -->
                </button>
              </li>
            </ul>

            <!-- <div v-else class="p-8 text-xl text-brand-main-text bg-zinc-300 rounded-xl shadow-primary mb-">
              <p>There are no blog posts. <button class="link" @click="openAddPostModal">Add a blog post</button> to get started.</p>
            </div> -->
          </div>

          <div v-else class="animate-pulse">
            Loading Blog Posts...
          </div>
        </BaseLayoutCard>

        <!-- <div v-if="hasMorePages" class="flex justify-center mt-8">
          <BaseUiAction type="button" class="py-4 px-8" @click="loadMore">View More</BaseUiAction>
        </div> -->
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>

    <!-- <AdminAddBlogPostModal v-if="blogPostModalOpen" v-model="blogPostModalOpen" v-model:slug="blogPostModalSlug" @close="closePostModal" @create-post="refreshPosts" @edited-post="refreshPosts" /> -->

    <!-- <BaseInteractiveModal v-model="deleteConfirmationModal" hide-close tiny-modal :padding="2">
      <p>Are you sure you want to delete this blog post?</p>
      <div class="flex justify-end mt-2 gap-2">
        <BaseUiAction type="button" class="py-1 px-2" @click="confirmDelete">Yes</BaseUiAction>
        <BaseUiAction type="button" class="py-1 px-2" @click="cancelDelete">No</BaseUiAction>
      </div>
    </BaseInteractiveModal> -->

    <!-- <BaseInteractiveModal v-model="blogPostPublishModalOpen" :padding="3" small-modal @close="cancelPublish">
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
    </BaseInteractiveModal> -->
  </div>
  <div v-else-if="authStore.role === 'correspondence'">
    <BaseLayoutPageSection bg="transparent" margin="top">
      <BaseLayoutPageContainer>
        <div class="p-8 text-xl text-brand-main-text bg-zinc-300 rounded-xl shadow-primary mb-">
          <p>You do not have access to the Blog Management page. Please contact an administrator if you believe this is an error.</p>
        </div>
      </BaseLayoutPageContainer>
    </BaseLayoutPageSection>
  </div>

  <div v-else>
    <AdminLogin />
  </div>
</template>

<script lang="ts" setup>
import { useBlogPostsApi } from '../../../composables/blog/blogPostsAPI.js';
import { useDateFormat } from '../../../composables/dates/dateFormat.js';
import type { BlogPostPreview, PaginationMeta, PaginationOptions } from '../../../models/blog.js';


const authStore = useAuthStore();
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
    posts: BlogPostPreview[];
    pagination: PaginationMeta;
    initialized: boolean;
  }>('blog-posts-admin', () => ({
    posts: [],
    pagination: defaultPagination,
    initialized: false
}))


// Content Calendar

const openContentCalendar = ref(false)
const calendarCsv = ref('')

// Fetch all Admin Blog Posts

const pageSize = 10
const page = ref(1)

const postOptions = computed((): PaginationOptions => ({
  page: page.value,
  pageSize,
  orderField: 'created_at',
  orderDirection: 'desc'
}))

const { data: initialPostsReturn, pending: isLoadingPosts } = await useAsyncData(
  'blog-initial-posts',
  () => blogPostsAPI.getAllPosts(postOptions.value),
    {
        default: () => ({
            data: [],
            pagination: defaultPagination
        })
    }
)

console.log('initialPostsReturn', initialPostsReturn.value)

if(!blogState.value.initialized && initialPostsReturn.value) {
  blogState.value.posts = initialPostsReturn.value.data ?? []
  blogState.value.pagination = initialPostsReturn.value.pagination ?? { ...defaultPagination}
  blogState.value.initialized = true
}

const allPosts = computed(() => blogState.value.posts)
// const postPagination = computed(() => blogState.value.pagination)

</script>

<style scoped>
</style>