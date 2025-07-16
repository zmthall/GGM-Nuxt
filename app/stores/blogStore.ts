import type { BlogCollectionItem } from '@nuxt/content';
import { defineStore } from 'pinia'

interface BlogPost {
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
  thumbnail?: string;
  draft?: boolean;
  // Add any other fields from your content schema
}

export const useBlogStore = defineStore('blog', () => {
  const currentPost = ref<BlogPost | BlogCollectionItem | null>(null)
  const isLoading = ref(false)

  const setCurrentPost = (post: BlogPost | BlogCollectionItem | null) => {
    currentPost.value = post
  }

  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const clearCurrentPost = () => {
    currentPost.value = null
  }

  return {
    currentPost: readonly(currentPost),
    isLoading: readonly(isLoading),
    setCurrentPost,
    setLoading,
    clearCurrentPost
  }
})