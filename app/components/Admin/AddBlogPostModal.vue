<template>
  <div>
    <BaseInteractiveModal v-model="modalOpen" :normal-modal="false" :padding="3" @close="emit('close')">
      <div class="overflow-y-auto my-2 overflow-x-hidden">
        <h2 class="mb-8 text-2xl text-brand-primary font-bold">
          <span v-if="isCreating">Add New Blog Post:</span>
          <span v-else>Edit Blog Post:</span>
        </h2>

        <div v-if="meta !== undefined && meta !== null" class="space-y-8">
          <div class="sm:w-1/2 relative border-2 border-zinc-100 rounded-lg p-4 space-y-2">
            <h3 class="absolute -top-[1.25rem] left-1 bg-white p-1 font-bold">Post Information</h3>

            <div v-if="meta.seoTitle !== undefined">
              <BaseFormInput v-model="meta.seoTitle" type="text" label="SEO Title" name="seoTitle" />
              <div :class="['text-xs flex justify-end px-4', { 'text-red-800': meta.seoTitle.length > 70 }]">{{ meta.seoTitle.length }} Characters</div>
            </div>

            <div v-if="meta.seoDescription !== undefined">
              <BaseFormInput v-model="meta.seoDescription" type="text" label="SEO Description" name="seoDescription" />
              <div :class="['text-xs flex justify-end px-4', { 'text-red-800': meta.seoDescription.length > 155 }]">{{ meta.seoDescription.length }} Characters</div>
            </div>

            <BaseFormTextArea v-model="meta.summary" label="Summary" name="summary" />
          </div>

          <div class="relative border-2 border-zinc-100 rounded-lg p-4 sm:w-1/2">
            <h3 class="absolute -top-[1.25rem] left-1 bg-white p-1 font-bold">Post Image</h3>

            <div v-if="meta.thumbnail && !changeImage" class="relative">
              <NuxtImg format="webp,avif" :src="meta.thumbnail" :width="meta.thumbnailWidth ?? undefined" :height="meta.thumbnailHeight ?? undefined" :alt="meta.thumbnailAlt" :title="meta.thumbnailAlt" loading="eager" />
              <button title="Delete Image" class="absolute bottom-2 left-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors duration-200 z-10 flex" @click="setChangeImage">
                <BaseIcon name="material-symbols:delete-forever" size="size-5" color="text-white" />
              </button>
            </div>

            <BaseFormImageUpload v-else v-model="imageData" name="slot-image" :aspect-ratio="2/1" />
          </div>

          <div class="relative border-2 border-zinc-100 rounded-lg p-4">
            <h3 class="absolute -top-[1.25rem] left-1 bg-white p-1 font-bold">Post Body</h3>

            <div class="min-h-0">
              <div class="xl:hidden">
                <div class="min-w-0 min-h-0 flex flex-col overflow-hidden">
                  <h4 class="mb-2 text-sm font-semibold text-zinc-700 shrink-0">Editor</h4>

                  <div class="flex-1 min-h-0 overflow-hidden">
                    <BlogAdminMarkdownEditor ref="editorPanelRef" v-model="meta.content" :height="editorHeight" />
                  </div>
                </div>
              </div>

              <div class="hidden xl:block h-[550px] min-h-0 overflow-hidden">
                <BaseLayoutPageSplitPane class="h-full min-h-0" :initial-split="50" :min-left-percent="28" :max-left-percent="72" mobile-breakpoint-class="xl">
                  <template #left>
                    <div class="min-w-0 h-full min-h-0 flex flex-col overflow-hidden">
                      <h4 class="mb-2 text-sm font-semibold text-zinc-700 shrink-0">Editor</h4>

                      <div class="flex-1 min-h-0 overflow-hidden pt-1 pl-1">
                        <BlogAdminMarkdownEditor ref="editorPanelRef" v-model="meta.content" :height="editorHeight" />
                      </div>
                    </div>
                  </template>

                  <template #right="{ splitPercent }">
                    <div class="min-w-0 h-full min-h-0 flex flex-col overflow-hidden pt-1 pr-1">
                      <div class="mb-2 flex items-center justify-between gap-3 shrink-0">
                        <h4 class="text-sm font-semibold text-zinc-700">Live Preview</h4>

                        <div class="flex items-center gap-3">
                          <div class="hidden xl:block text-xs text-zinc-500">
                            {{ Math.round(100 - splitPercent) }}% preview width
                          </div>

                          <div class="flex items-center gap-2 text-xs text-zinc-600">
                            <BaseFormToggleSwitch v-model="scrollSyncEnabled" label="Sync" name="scroll-sync" size="small" />
                          </div>
                        </div>
                      </div>

                      <div class="flex-1 min-h-0 overflow-hidden">
                        <BaseAdminContentMdcPreview ref="previewPanelRef" :value="meta.content" :height="editorHeight" />
                      </div>
                    </div>
                  </template>
                </BaseLayoutPageSplitPane>
              </div>
            </div>

            <div class="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-700">
              <div v-if="readingStats.minutes > 0">
                <span class="font-semibold">Estimated reading time:</span> {{ readingStats.minutes }} min
              </div>
              <div v-else>
                <span class="font-semibold">Estimated reading time:</span> —
              </div>
              <div>
                <span class="font-semibold">Words:</span> {{ readingStats.words }}
              </div>
            </div>
          </div>

          <div class="relative border-2 border-zinc-100 rounded-lg p-4 space-y-2">
            <h3 class="absolute -top-[1.25rem] left-1 bg-white p-1 font-bold">Misc Post Details</h3>
            <BaseFormInput v-model="meta.slug" name="slug" label="Post Slug" />
            <BaseFormDatePicker v-model="meta.publishTimestamp" name="publish-timestamp" label="Publish Date" date-format="Y-m-d" />
            <BaseFormToggleSwitch v-model="meta.draft" name="draft" label="Draft" heading-label="Toggle Settings" />
            <BaseFormToggleSwitch v-model="meta.staffPick" name="staff-pick" label="Staff Pick" />
            <BaseFormInlineTagsEditor v-model="meta.tags" name="tags" label="Post Tags" />
          </div>
        </div>

        <div class="mt-4 flex justify-end px-4 gap-4">
          <BaseUiAction type="button" class="px-2 py-1" @click="closeModal">Cancel</BaseUiAction>
          <BaseUiAction v-if="isCreating && isAuthor" type="button" class="px-2 py-1" @click="console.log('createBlogPost')">Create Post</BaseUiAction>
          <BaseUiAction v-else-if="isEditing && isAuthor" type="button" class="px-2 py-1" @click="console.log('saveBlogPostEdit')">Save Post Edit</BaseUiAction>
        </div>
      </div>
    </BaseInteractiveModal>
  </div>
</template>

<script lang="ts" setup>
import type { BlogPostFull } from '~/models/blog'
import type { ImageDataFile } from '../../models/ImagesData.js'
import { useBlogPostsApi } from '~/composables/blog/blogPostsAPI.js'
import type { FetchUser } from '~/models/admin/user.js'
import { useAdminMarkdownPreviewScrollSync, type AdminMarkdownEditorExpose, type AdminMdcPreviewExpose } from '../../composables/blog/AdminMarkdownPreviewScrollSync.js'

const getUserDisplayName = async (): Promise<string> => {
  try {
    const idToken = await authStore.getIdToken()

    const response = await $fetch<FetchUser>(`/api/users/profile`, {
      baseURL: useRuntimeConfig().public.useLocalApi ? 'http://127.0.0.1:4000' : 'https://api.goldengatemanor.com',
      method: 'GET',
      headers: { 'Authorization': `Bearer ${idToken}` }
    })

    return response.data?.displayName ?? 'Unknown User'
  } catch (error) {
    console.error((error as Error).message)
    return 'Unknown User'
  }
}

const authStore = useAuthStore()
const blogPostAPI = useBlogPostsApi()

const modalOpen = defineModel<boolean>({ default: true })
const postId = defineModel<string | null>('id', { default: null })

const editorHeight = '500px'

const editorPanelRef = ref<AdminMarkdownEditorExpose | null>(null)
const previewPanelRef = ref<AdminMdcPreviewExpose | null>(null)

const changeImage = ref<boolean>(false)

const imageData = ref<ImageDataFile>({
  file: null,
  alt: ''
})

const meta = ref<BlogPostFull | null>(createEmptyBlogPostFull())
const author = ref<string | undefined>(undefined)

const { data: post, execute: fetchPost } = await useAsyncData(
  'admin-blog-post-modal-post',
  () => blogPostAPI.getPostById(postId.value ?? 'nonexistent-id'),
  { immediate: postId.value !== null }
)

watch(postId, async (newId) => {
  if (newId) {
    await fetchPost()
    meta.value = post.value ?? null
    postId.value = newId
  }
}, { immediate: true })

watch(() => meta.value?.publishTimestamp, (newTimestamp) => {
  if (!meta.value) return

  if (newTimestamp !== '') {
    meta.value.published = true
    console.log(meta.value.published)
  } else {
    meta.value.published = false
    console.log(meta.value.published)
  }
}, { deep: true })

const setChangeImage = () => {
  changeImage.value = true
}

useHead({
  bodyAttrs: {
    class: computed(() => modalOpen.value ? 'no-scroll' : '')
  }
})

const emit = defineEmits<(e: 'close' | 'create-post' | 'edited-post' | 'not-author') => void>()

const closeModal = () => {
  modalOpen.value = false
  emit('close')
}

const stripFrontmatter = (md: string) => md.replace(/^---[\s\S]*?---\s*/m, '')

const removeNamedBlocks = (md: string) => {
  let out = md
  out = out.replaceAll(/::BlogAtAGlance(?:\{[^}]*\})?\s*[\s\S]*?::/g, ' ')
  out = out.replaceAll(/::BlogReferences(?:\{[^}]*\})?\s*[\s\S]*?::/g, ' ')
  return out
}

const unwrapOtherBlocks = (md: string) => md.replaceAll(/::\w+(?:\{[^}]*\})?\s*([\s\S]*?)::/g, '$1')

const removeReferencesHeadingSection = (md: string) => md.replace(/(^|\n)#{1,6}\s*References[\s\S]*$/i, '')

const stripMarkdownNoise = (md: string) => {
  let out = md
  out = out.replaceAll(/```[\s\S]*?```/g, ' ')
  out = out.replaceAll(/~~~[\s\S]*?~~~/g, ' ')
  out = out.replaceAll(/`[^`]*`/g, ' ')
  out = out.replaceAll(/!\[.*?\]\(.*?\)/g, ' ')
  out = out.replaceAll(/\[(.*?)\]\(.*?\)/g, '$1')
  out = out.replaceAll(/<[^>]+>/g, ' ')
  out = out.replaceAll(/[*_>#~=-]/g, ' ')
  out = out.replaceAll(/\s+/g, ' ').trim()
  return out
}

const getWordCountFromContent = (markdown: string | null | undefined) => {
  if (!markdown || typeof markdown !== 'string') return 0
  let cleaned = markdown
  cleaned = stripFrontmatter(cleaned)
  cleaned = removeNamedBlocks(cleaned)
  cleaned = unwrapOtherBlocks(cleaned)
  cleaned = removeReferencesHeadingSection(cleaned)
  cleaned = stripMarkdownNoise(cleaned)
  if (!cleaned) return 0
  return cleaned.split(' ').filter(Boolean).length
}

const readingStats = computed(() => {
  const words = getWordCountFromContent(meta.value?.content)
  const minutes = words > 0 ? Math.max(1, Math.ceil(words / 250)) : 0
  return { words, minutes }
})

// const uploadBlogImage = async (): Promise<{ url: string; alt: string }> => {
//   const idToken = await authStore.getIdToken()

//   if (!imageData.value?.file) throw new Error('No image selected')

//   const form = new FormData()
//   form.append('file', imageData.value.file)
//   form.append('alt', imageData.value.alt ?? '')
//   form.append('slug', post.value?.slug ?? 'post')

//   const res = await $fetch<{ ok: true; url: string; alt: string }>('/api/admin/blog/image', {
//     method: 'POST',
//     body: form,
//     headers: { 'Authorization': `Bearer ${idToken}` }
//   })

//   return { url: res.url, alt: res.alt }
// }

const isAuthor = computed(() => {
  return !!meta.value && author.value === meta.value.author
})

const isEditing = computed(() => {
  return !!postId.value
})

const isCreating = computed(() => {
  return !postId.value
})

const contentForSync = computed(() => meta.value?.content ?? '')
const scrollSyncEnabled = ref(true)

const { refreshScrollSync } = useAdminMarkdownPreviewScrollSync(
  contentForSync,
  editorPanelRef,
  previewPanelRef,
  scrollSyncEnabled
)

onMounted(async () => {
  author.value = await getUserDisplayName()

  if (meta.value && !postId.value) meta.value.author = author.value

  await nextTick()
  await refreshScrollSync()
})
</script>

<style>
</style>