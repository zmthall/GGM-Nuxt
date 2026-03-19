import type { ApiPaginatedSuccessResponse, ApiSuccessResponse, BlogPostCard, BlogPostCardApiRecord, BlogPostFull, BlogPostFullApiRecord, BlogPostPreview, BlogPostPreviewApiRecord, BlogPostTiny, BlogPostTinyApiRecord, PaginatedResult, PaginationOptions } from '~/models/blog'
import mappers from '~/utils/blogPostMappers'

export const useBlogPostsApi = () => {
  const baseURL = useRuntimeConfig().public.useLocalApi  ? 'http://127.0.0.1:4000' : 'https://api.goldengatemanor.com'

  // Admin API methods for managing blog posts (not exposed to public facing components)

  const getAllPosts = async (options: PaginationOptions): Promise<PaginatedResult<BlogPostPreview>> => {
    const response = await $fetch<ApiPaginatedSuccessResponse<BlogPostPreviewApiRecord>>(
      `${baseURL}/api/blog-posts/all`,
      { params: { ...options } }
    )

    console.log('getAllPosts response:', response)

    return {
      data: response.data.map(mappers.mapBlogPostPreviewRecord),
      pagination: response.pagination
    }
  }

  // Public API methods for fetching public facing blog posts and related data

  const getPublishedPostBySlug = async (slug: string): Promise<BlogPostFull> => {
    const response = await $fetch<ApiSuccessResponse<BlogPostFullApiRecord>>(
      `${baseURL}/api/blog-posts/slug/${slug}/published`
    )

    return mappers.mapBlogPostFullRecord(response.data)
  }

  const getPublishedPosts = async (options: PaginationOptions): Promise<PaginatedResult<BlogPostCard>> => {
    const response = await $fetch<ApiPaginatedSuccessResponse<BlogPostCardApiRecord>>(
      `${baseURL}/api/blog-posts/published`,
      { params: { ...options } }
    )

    return {
      data: response.data.map(mappers.mapBlogPostCardRecord),
      pagination: response.pagination
    }
  }

  const getPublishedSlugs = async (): Promise<string[]> => {
    const response = await $fetch<ApiSuccessResponse<string[]>>(
      `${baseURL}/api/blog-posts/published/slugs`
    )

    return response.data
  }

  const getLatestPost = async (): Promise<BlogPostCard> => {
    const response = await $fetch<ApiSuccessResponse<BlogPostCardApiRecord>>(
      `${baseURL}/api/blog-posts/latest`
    )

    return mappers.mapBlogPostCardRecord(response.data);
  }

  const getStaffPicks = async (): Promise<BlogPostTiny[]> => {
    const response = await $fetch<ApiSuccessResponse<BlogPostTinyApiRecord[]>>(
      `${baseURL}/api/blog-posts/staff-picks`
    )

    return response.data.map(mappers.mapBlogPostTinyRecord)
  }

  const getRelatedPosts = async (id: string): Promise<BlogPostCard[]> => {
      const response = await $fetch<ApiSuccessResponse<BlogPostCardApiRecord[]>>(
        `${baseURL}/api/blog-posts/related-posts/${id}`
      )

      return response.data.map(mappers.mapBlogPostCardRecord)
    }

  const getBlogPostLink = (slug: string): string => {
    return `/news/blog/post/${slug}`
  }

  const getBlogPostLinkAdmin = (slug: string): string => {
    return `/admin/blog/post/${slug}`
  }

  return {
    // Public API Methods
    getPublishedPostBySlug,
    getPublishedPosts,
    getPublishedSlugs,
    getLatestPost,
    getStaffPicks,
    getRelatedPosts,
    getBlogPostLink,
    // Admin API Methods (not exposed to public facing components)
    getAllPosts,
    getBlogPostLinkAdmin,
  }
}