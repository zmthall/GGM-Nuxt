export interface ApiSuccessResponse<T> {
  success: boolean
  data: T
}

export interface PaginationMeta {
  currentPage: number
  pageSize: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  totalPages: number
  totalItems: number
}

export interface ApiPaginatedSuccessResponse<T> {
  success: boolean
  data: T[]
  pagination: PaginationMeta
}

export interface PaginatedResult<T> {
  data: T[]
  pagination: PaginationMeta
}

export type BlogPostOrderField =
  | 'created_at'
  | 'updated_at'
  | 'publish_timestamp'
  | 'title'
  | 'read_time'

export interface PaginationOptions {
  page?: number
  pageSize?: number
  orderField?: BlogPostOrderField
  orderDirection?: 'asc' | 'desc'
}

export interface ListBlogPostsOptions extends PaginationOptions {
  publishedOnly?: boolean
  draftOnly?: boolean
  featuredOnly?: boolean
  staffPickOnly?: boolean
  tag?: string
  author?: string
  search?: string
  createdAfter?: Date
  createdBefore?: Date
  publishedAfter?: Date
  publishedBefore?: Date
  limit?: number
}

/**
 * FULL BLOG POST
 */
export interface BlogPostFullApiRecord {
  id: string
  slug: string
  title: string
  summary: string
  content: string
  author: string
  tags: string[]
  thumbnail: string
  thumbnail_alt: string
  thumbnail_width: number | null
  thumbnail_height: number | null
  staff_pick: boolean
  featured: boolean
  read_time: number
  draft: boolean
  published: boolean
  publish_timestamp: string | null
  seo_title: string
  seo_description: string
  seo_image: string
  canonical_url: string
  created_at: string
  updated_at: string
}

export interface BlogPostFull {
  id: string
  slug: string
  title: string
  summary: string
  content: string
  author: string
  tags: string[]
  thumbnail: string
  thumbnailAlt: string
  thumbnailWidth: number | null
  thumbnailHeight: number | null
  staffPick: boolean
  featured: boolean
  readTime: number
  draft: boolean
  published: boolean
  publishTimestamp: string | null
  seoTitle: string
  seoDescription: string
  seoImage: string
  canonicalUrl: string
  createdAt: string
  updatedAt: string
}

/**
 * CARD BLOG POST
 */
export interface BlogPostCardApiRecord {
  id: string
  slug: string
  title: string
  summary: string
  author: string
  tags: string[]
  thumbnail: string
  thumbnail_alt: string
  thumbnail_width: number | null
  thumbnail_height: number | null
  featured: boolean
  staff_pick: boolean
  read_time: number
  publish_timestamp: string | null
}

export interface BlogPostCard {
  id: string
  slug: string
  title: string
  summary: string
  tags: string[]
  thumbnail: string
  thumbnailAlt: string
  thumbnailWidth: number | null
  thumbnailHeight: number | null
  featured: boolean
  staffPick: boolean
  readTime: number
  publishTimestamp: string | null
}

/**
 * PREVIEW BLOG POST
 */
export interface BlogPostPreviewApiRecord {
  id: string
  slug: string
  title: string
  thumbnail: string
  thumbnail_alt: string
  thumbnail_width: number | null
  thumbnail_height: number | null
  published: boolean
  publish_timestamp: string | null
  draft: boolean
  updated_at: string
}

export interface BlogPostPreview {
  id: string
  slug: string
  title: string
  thumbnail: string
  thumbnailAlt: string
  thumbnailWidth: number | null
  thumbnailHeight: number | null
  published: boolean
  publishTimestamp: string | null
  draft: boolean
  updatedAt: string
}

/**
 * SEO BLOG POST
 */
export interface BlogPostSeoApiRecord {
  id: string
  slug: string
  title: string
  summary: string
  seo_title: string
  seo_description: string
  seo_image: string
  canonical_url: string
  publish_timestamp: string | null
}

export interface BlogPostSeo {
  id: string
  slug: string
  title: string
  summary: string
  seoTitle: string
  seoDescription: string
  seoImage: string
  canonicalUrl: string
  publishTimestamp: string | null
}

/**
 * TINY BLOG POST
 */
export interface BlogPostTinyApiRecord {
  id: string
  slug: string
  title: string
  summary: string
}

export interface BlogPostTiny {
  id: string
  slug: string
  title: string
  summary: string
}

/**
 * SLUG ONLY BLOG POST
 */
export interface BlogPostSlugApiRecord {
  slug: string
}

export interface BlogPostSlug {
  slug: string
}