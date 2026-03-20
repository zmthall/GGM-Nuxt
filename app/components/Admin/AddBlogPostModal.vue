<template>
  <div>
    <BaseInteractiveModal v-model="modalOpen" :normal-modal="false" :padding="3" @close="emit('close')">
      <div class="overflow-y-auto my-2 overflow-x-hidden">
        <h2 class="mb-8 text-2xl text-brand-primary font-bold">
          <span v-if="post?.id === '!data'">Add New Blog Post:</span>
          <span v-else>Edit Blog Post:</span>
        </h2>

        <div v-if="meta !== undefined && meta !== null" class="space-y-8">
          <div class="sm:w-1/2 relative border-2 border-zinc-100 rounded-lg p-4 space-y-2">
            <h3 class="absolute -top-[1.25rem] left-1 bg-white p-1 font-bold">Post Information</h3>

            <div v-if="meta.seoTitle !== undefined">
              <BaseFormInput v-model="meta.seoTitle" type="text" label="SEO Title" name="seoTitle"/>
              <div :class="['text-xs flex justify-end px-4', { 'text-red-800': meta.seoTitle.length > 70 }]">{{ meta.seoTitle.length }} Characters</div>
            </div>

            <div v-if="meta.seoDescription !== undefined">
              <BaseFormInput v-model="meta.seoDescription" type="text" label="SEO Description" name="seoDescription"/>
              <div :class="['text-xs flex justify-end px-4', { 'text-red-800': meta.seoDescription.length > 155 }]">{{ meta.seoDescription.length }} Characters</div>
            </div>

            <BaseFormTextArea v-model="meta.summary" label="Summary" name="summary"/>
          </div>

          <div class="relative border-2 border-zinc-100 rounded-lg p-4 sm:w-1/2">
            <h3 class="absolute -top-[1.25rem] left-1 bg-white p-1 font-bold">Post Image</h3>

            <div v-if="meta.thumbnail && !changeImage" class="relative">
              <NuxtImg format="webp,avif" :src="meta.thumbnail" :width="meta.thumbnailWidth ?? undefined" :height="meta.thumbnailHeight ?? undefined" :alt="meta.thumbnailAlt" :title="meta.thumbnailAlt" loading="eager"/>
              <button title="Delete Image" class="absolute bottom-2 left-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors duration-200 z-10 flex" @click="setChangeImage">
                <BaseIcon name="material-symbols:delete-forever" size="size-5" color="text-white" />
              </button>
            </div>

            <BaseFormImageUpload v-else v-model="imageData" name="slot-image" :aspect-ratio="2/1"/>
          </div>

          <div class="relative border-2 border-zinc-100 rounded-lg p-4">
            <h3 class="absolute -top-[1.25rem] left-1 bg-white p-1 font-bold">Post Body</h3>

            <BlogAdminMarkdownEditor v-model="meta.content" />

            <div class="mt-3 text-sm text-zinc-700 flex flex-wrap gap-x-4 gap-y-1">
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

          <div class="sm:w-1/2 relative border-2 border-zinc-100 rounded-lg p-4 space-y-2">
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
          <BaseUiAction v-if="post?.author === '!data'" type="button" class="px-2 py-1" @click="console.log('createBlogPost')">Create Post</BaseUiAction>
          <BaseUiAction v-else type="button" class="px-2 py-1" @click="console.log('saveBlogPostEdit')">Save Post Edit</BaseUiAction>
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

const authStore = useAuthStore()
const blogPostAPI = useBlogPostsApi()

const modalOpen = defineModel<boolean>({ default: true })
const postId = defineModel<string | null>('id', { default: null })

const changeImage = ref<boolean>(false)

const imageData = ref<ImageDataFile>({
  file: null,
  alt: ''
})

// Fetch blog post using slug (if editing existing post)

const meta = ref<BlogPostFull | null>(createEmptyBlogPostFull())

const { data: post, execute: fetchPost } = await useAsyncData(
  'admin-blog-post-modal-post', 
  () => blogPostAPI.getPostById(postId.value ?? 'nonexistent-id'),
  { immediate: postId.value !== null }
)

const getUserDisplayName = async () => {
  try {
    const idToken = await authStore.getIdToken()

    const response = await $fetch<FetchUser>(`/api/users/profile`, {
      baseURL: useRuntimeConfig().public.useLocalApi  ? 'http://127.0.0.1:4000' : 'https://api.goldengatemanor.com',
      method: 'GET',
      headers: { 'Authorization': `Bearer ${idToken}` }
    })

    return response.data?.displayName
  } catch (error) {
    console.error((error as Error).message)
    return 'Unknown User'
  }
}

watch(postId, async (newId) => {
  if (newId) {
    const displayName = await getUserDisplayName()
    
    if(post.value?.author === displayName) {
      await fetchPost()
      postId.value = newId
    } else {
      postId.value = null
      emit('not-author')
    }
  }
}, { immediate: true })

watch(() => meta.value?.publishTimestamp, (newTimestamp) => {
  if(!meta.value) return

  if(newTimestamp !== '') {
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
    class: computed(() => (modalOpen.value) ? 'no-scroll' : '')
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

const uploadBlogImage = async (): Promise<{ url: string; alt: string }> => {
  const idToken = await authStore.getIdToken()

  if (!imageData.value?.file) throw new Error('No image selected')

  const form = new FormData()
  form.append('file', imageData.value.file)
  form.append('alt', imageData.value.alt ?? '')
  form.append('slug', post.value?.slug ?? 'post')

  const res = await $fetch<{ ok: true; url: string; alt: string }>('/api/admin/blog/image', {
    method: 'POST',
    body: form,
    headers: { 'Authorization': `Bearer ${idToken}` }
  })

  return { url: res.url, alt: res.alt }
}
</script>

<style>
</style>
