<template>
  <div>
    <BaseInteractiveModal v-model="modalOpen" :normal-modal="false" :padding="3" @close="emit('close')">
      <div class="overflow-y-auto my-2 overflow-x-hidden">
        <h2 class="mb-8 text-2xl text-brand-primary font-bold">
          <span v-if="!data">Add New Blog Post:</span>
          <span v-else>Edit Blog Post:</span>
        </h2>
        <div v-if="meta && body !== undefined" class="space-y-8">
          <div class="sm:w-1/2 relative border-2 border-zinc-100 rounded-lg p-4 space-y-2">
            <h3 class="absolute -top-[1.25rem] left-1 bg-white p-1 font-bold">Post Information</h3>
            <BaseFormInput v-model="meta.title" type="text" label="Title" name="title"/>
            <BaseFormInput v-model="meta.description" type="text" label="Description" name="description"/>
            <BaseFormTextArea v-model="meta.summary" label="Summary" name="summary"/>
          </div>
          <div class="relative border-2 border-zinc-100 rounded-lg p-4 sm:w-1/2">
            <h3 class="absolute -top-[1.25rem] left-1 bg-white p-1 font-bold">Post Image</h3>
            <div v-if="meta.thumbnail && !changeImage" class="relative">
              <NuxtImg format="webp,avif" :src="meta.thumbnail" :width="meta.thumbnailWidth" :height="meta.thumbnailHeight" :alt="meta.thumbnailAlt" :title="meta.thumbnailAlt" loading="eager"/>
              <button
                title="Delete Image"
                class="absolute bottom-2 left-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors duration-200 z-10 flex"
                @click="setChangeImage"
              >
                <BaseIcon name="material-symbols:delete-forever" size="size-5" color="text-white" />
              </button>
            </div>
            <BaseFormImageUpload 
              v-else
              v-model="imageData"
              name="slot-image"
              :aspect-ratio="2/1"/>
          </div>
          <div class="relative border-2 border-zinc-100 rounded-lg p-4">
            <h3 class="absolute -top-[1.25rem] left-1 bg-white p-1 font-bold">Post Body</h3>
            <BlogAdminMarkdownEditor v-model="body" />
          </div>
          <div class="sm:w-1/2 relative border-2 border-zinc-100 rounded-lg p-4 space-y-2">
            <h3 class="absolute -top-[1.25rem] left-1 bg-white p-1 font-bold">Misc Post Details</h3>
            <BaseFormInput v-model="slug" name="slug" label="Post Link" />
            <BaseFormDatePicker v-model="meta.published" name="slug" label="Publish Date" date-format="Y-m-d" />
            <BaseFormToggleSwitch v-model="meta.draft" name="draft" label="Draft" heading-label="Toggle Draft" />
            <BaseFormInlineTagsEditor v-model="meta.tags" name="tags" label="Post Tags" />
          </div>
        </div>
        <div class="mt-4 flex justify-end px-4 gap-4">
          <BaseUiAction type="button" class="px-2 py-1" @click="closeModal">Cancel</BaseUiAction>
          <BaseUiAction v-if="!data" type="button" class="px-2 py-1" @click="createBlogPost">Create Post</BaseUiAction>
          <BaseUiAction v-else type="button" class="px-2 py-1" @click="saveBlogPostEdit">Save Post Edit</BaseUiAction>
        </div>
      </div>
    </BaseInteractiveModal>
  </div>
</template>

<script lang="ts" setup>
import type { BlogGetResponse, BlogPost } from '~/models/blog'
import type { ImageDataFile } from '../../models/ImagesData.js';
import { nanoid } from 'nanoid';
import type { FetchUser } from '../../models/admin/user.js';

const authStore = useAuthStore()

const modalOpen = defineModel<boolean>({ default: true });
const modalSlug = defineModel<string | null>('slug', { default: null })

const changeImage = ref<boolean>(false);

const slug = ref<string>('')

const imageData = ref<ImageDataFile>({
  file: null,
  alt: ''
})

const data = ref<BlogGetResponse | null>(null)

const fetchPost = async () => {
  const idToken = await authStore.getIdToken();

  try {
    const result = await $fetch<BlogGetResponse>(`/api/admin/blog/${modalSlug.value}`, {
      headers: {
        'authorization': `Bearer ${idToken}`
      }
    })
    data.value = result
  } catch (e) {
    console.error('fetchPost:', e)
  }
}

// run only when slug becomes non-null
watch(modalSlug, (newSlug) => {
  if (newSlug) {
    fetchPost()
    slug.value = newSlug;
  } 
}, { immediate: true })

const setChangeImage = () => {
  changeImage.value = true;
}

const emptyMeta = (): BlogPost => ({
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
})

const meta = ref<BlogPost | null>(emptyMeta())
const body = ref<string>('')

watchEffect(() => {
  if (!data.value) return
  meta.value = data.value.meta
  body.value = data.value.body
})

useHead({
  bodyAttrs: {
    class: computed(() => (modalOpen.value) ? 'no-scroll' : '')
  }
})

const emit = defineEmits<{
  (e: 'close' | 'create-post' | 'edited-post'): void
}>()

const closeModal = () => {
  modalOpen.value = false;
  emit('close');
}

function isConflict409(e: unknown): e is { data: { statusCode: number } } {
  return typeof e === 'object' && e !== null &&
         'data' in e && typeof (e as { data?: unknown }).data === 'object' &&
         (e as { data: { statusCode?: unknown } }).data?.statusCode === 409
}

const uploadBlogImage = async (): Promise<{ url: string; alt: string }> => {
  const idToken = await authStore.getIdToken();

  if (!imageData.value?.file) {
    throw new Error('No image selected')
  }

  const form = new FormData()
  form.append('file', imageData.value.file)
  form.append('alt', imageData.value.alt ?? '')
  form.append('slug', modalSlug.value ?? 'post')

  const res = await $fetch<{ ok: true; url: string; alt: string }>(
    '/api/admin/blog/image',
    { 
      method: 'POST', 
      body: form,
      headers: {
        'Authorization': `Bearer ${idToken}`
      }
    }
  )

  return { url: res.url, alt: res.alt }
}


const getUserDisplayName = async () => {
    try {
        const idToken = await authStore.getIdToken()
    
        const response = await $fetch<FetchUser>(`/api/users/profile`, {
            baseURL: 'https://api.goldengatemanor.com',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${idToken}`,
            }
        })
        
        return response.data?.displayName
    } catch (error) {
        console.error((error as Error).message);
        return 'Unknown User'
    }
}


type CreateResp = { ok: boolean; slug: string; file: string; meta: BlogPost }

const createBlogPost = async () => {
  const idToken = await authStore.getIdToken();
  
  // ----- basic validation -----
  const raw = slug.value?.trim()
  if (!raw) throw new Error('Please enter a post link (slug) first.')

  const safeSlug = canonicalize(raw)
  if (!isValidSlug(safeSlug)) {
    throw new Error('Slug may contain only letters, numbers, and hyphens.')
  }

  if (!meta.value?.title?.trim()) {
    throw new Error('Please enter a title.')
  }
  if (!body.value?.trim()) {
    throw new Error('Please write the post body.')
  }
  if (!imageData.value?.file) {
    throw new Error('Please upload a post image before creating.')
  }

  // ----- optional: preflight existence check (cheap) -----
  try {
    const exists = await $fetch<{ exists: boolean }>(`/api/admin/blog/exists/${safeSlug}`, {
      headers: {
        'Authorization': `Bearer ${idToken}`
      }
    })
    if (exists?.exists) {
      throw new Error('A post with this slug already exists.')
    }
  } catch {
    // ignore if the exists endpoint isn’t available
  }

  // ----- upload image (must succeed) -----
  let uploaded: { url: string; alt: string }
  try {
    uploaded = await uploadBlogImage()
  } catch (e) {
    throw new Error((e as Error).message || 'Image upload failed.')
  }

  // ----- build payload -----
  const payload = {
    meta: {
      ...meta.value!,
      tags: Array.isArray(meta.value?.tags) ? meta.value!.tags : [],
      date: (new Date()).toISOString(),
      thumbnail: uploaded.url,
      thumbnailAlt: uploaded.alt || imageData.value.alt || '',
      author: await getUserDisplayName(),
    },
    body: body.value,
  }

  // ----- create -----
  try {
    const res = await $fetch<CreateResp>(`/api/admin/blog/${safeSlug}`, {
      method: 'POST',
      body: payload,
      headers: {
        'Authorization': `Bearer ${idToken}`
      }
    })

    modalSlug.value = res.slug
    emit('create-post')
    return res
  } catch (err: unknown) {
    if (isConflict409(err)) {
      // surface a friendly message or toast
      throw new Error('Post already exists for this slug.')
    }
    throw err
  }
}

type PutResp = {
  ok: boolean
  slug: string
  file: string
  meta: BlogPost
  removedImage?: string
}

const canonicalize = (s: string) =>
  s.replace(/[/\\]/g, '').trim().replace(/\s+/g, '-').toLowerCase()

const isValidSlug = (s: string) => /^[a-z0-9-]+$/.test(s)

const saveBlogPostEdit = async () => {
  const idToken = await authStore.getIdToken();

  const currentSlugRaw = modalSlug.value ?? slug.value
  if (!currentSlugRaw) throw new Error('Missing current slug.')
  if (!meta.value) throw new Error('Missing post meta.')

  const currentSlug = canonicalize(currentSlugRaw)
  const oldThumb = meta.value.thumbnail ?? ''

  let nextThumb = oldThumb
  let nextAlt   = meta.value.thumbnailAlt ?? ''

  // Upload new image if user selected one (check imageData.file, not just changeImage)
  if (imageData.value?.file) {  // <- CHANGED: check if there's actually a new file
    try {
      const { url, alt } = await uploadBlogImage()
      nextThumb = url
      nextAlt   = alt || nextAlt
    } catch (e) {
      console.error((e as Error).message)
      throw new Error('Image upload failed; post not saved.')
    }
  }

  // Rest of your code stays the same...
  let renameTo: string | undefined
  let renamed = false
  if (slug.value) {
    const desired = canonicalize(slug.value)
    if (desired !== currentSlug) {
      if (!isValidSlug(desired)) throw new Error('Invalid slug format.')
      renameTo = desired
      renamed = true
    }
  }

  const payload: {
    meta: Partial<BlogPost>
    body?: string
    renameTo?: string
    deleteOldThumbnail?: boolean
  } = {
    meta: {
      ...meta.value,
      tags: Array.isArray(meta.value.tags) ? meta.value.tags : [],
      thumbnail: nextThumb,
      thumbnailAlt: nextAlt,
      date: (new Date()).toISOString(),
    },
    body: body.value,
  }

  if (renameTo) payload.renameTo = renameTo

  // Delete old thumbnail if a new one was uploaded
  if (
    imageData.value?.file &&  // <- CHANGED: new image was uploaded
    oldThumb &&
    oldThumb !== nextThumb &&
    oldThumb.startsWith('/images/blog/')
  ) {
    payload.deleteOldThumbnail = true
  }

  const res = await $fetch<PutResp>(`/api/admin/blog/${currentSlug}`, {
    method: 'PUT',
    body: payload,
    headers: {
      'Authorization': `Bearer ${idToken}`
    }
  })

  modalSlug.value = res.slug
  if (renamed) slug.value = res.slug
  changeImage.value = false
  imageData.value = { file: null, alt: '' } // <- ADDED: reset image data after save

  emit('edited-post')

  return { ...res, renamed }
}

</script>

<style>

</style>