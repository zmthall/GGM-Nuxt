export default defineSitemapEventHandler(async () => {
  const runtimeConfig = useRuntimeConfig()

  const apiBase = runtimeConfig.public.useLocalApi
    ? 'http://127.0.0.1:4000'
    : 'https://api.goldengatemanor.com'

  type BlogPostSitemapRecord = {
    slug: string
    canonical_url: string
    publish_timestamp: string | null
    updated_at: string
  }

  type ApiSuccessResponse<T> = {
    success: boolean
    data: T
  }

  const response = await $fetch<ApiSuccessResponse<BlogPostSitemapRecord[]>>(
    `${apiBase}/api/blog-posts/sitemap`
  )

  return response.data
    .filter(post => post.slug)
    .map(post => ({
      loc: post.canonical_url || `/news/blog/post/${post.slug}`,
      lastmod: (post.updated_at
        ? new Date(post.updated_at)
        : post.publish_timestamp
          ? new Date(post.publish_timestamp)
          : new Date()
      ).toISOString(),
      priority: 0.8,
      changefreq: 'weekly'
    }))
})