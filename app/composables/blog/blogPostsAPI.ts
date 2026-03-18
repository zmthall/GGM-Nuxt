import type { ApiPaginatedSuccessResponse, ApiSuccessResponse, BlogPostCard, BlogPostCardApiRecord, BlogPostFull, BlogPostFullApiRecord, BlogPostTiny, BlogPostTinyApiRecord, PaginatedResult, PaginationOptions } from '~/models/blog'
import mappers from '~/utils/blogPostMappers'

export const useBlogPostsApi = () => {
  const baseURL = useRuntimeConfig().public.useLocalApi  ? 'http://127.0.0.1:4000' : 'https://api.goldengatemanor.com'

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

  const validateSlug = async (slug: string): Promise<{ exists: boolean}> => {
    const response = await $fetch<ApiSuccessResponse<{ exists: boolean}>>(
      `${baseURL}/api/blog-posts/exists/slug/${slug}/published`
    )

    return response.data
  }

  return {
    getPublishedPostBySlug,
    getPublishedPosts,
    getPublishedSlugs,
    getLatestPost,
    getStaffPicks,
    validateSlug
  }
}