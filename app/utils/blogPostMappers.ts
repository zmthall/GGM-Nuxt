import type {
  BlogPostCard,
  BlogPostCardApiRecord,
  BlogPostFull,
  BlogPostFullApiRecord,
  BlogPostPreview,
  BlogPostPreviewApiRecord,
  BlogPostSeo,
  BlogPostSeoApiRecord,
  BlogPostSlug,
  BlogPostSlugApiRecord,
  BlogPostTiny,
  BlogPostTinyApiRecord
} from '~/models/blog'

export const mapBlogPostFullRecord = (record: BlogPostFullApiRecord): BlogPostFull => {
  return {
    id: record.id,
    slug: record.slug,
    title: record.title,
    summary: record.summary,
    content: record.content,
    author: record.author,
    tags: Array.isArray(record.tags) ? record.tags : [],
    thumbnail: record.thumbnail,
    thumbnailAlt: record.thumbnail_alt,
    thumbnailWidth: record.thumbnail_width,
    thumbnailHeight: record.thumbnail_height,
    staffPick: record.staff_pick,
    featured: record.featured,
    readTime: record.read_time,
    draft: record.draft,
    published: record.published,
    publishTimestamp: record.publish_timestamp,
    seoTitle: record.seo_title,
    seoDescription: record.seo_description,
    seoImage: record.seo_image,
    canonicalUrl: record.canonical_url,
    createdAt: record.created_at,
    updatedAt: record.updated_at
  }
}

export const mapBlogPostCardRecord = (record: BlogPostCardApiRecord): BlogPostCard => {
  return {
    id: record.id,
    slug: record.slug,
    title: record.title,
    summary: record.summary,
    tags: Array.isArray(record.tags) ? record.tags : [],
    thumbnail: record.thumbnail,
    thumbnailAlt: record.thumbnail_alt,
    thumbnailWidth: record.thumbnail_width,
    thumbnailHeight: record.thumbnail_height,
    featured: record.featured,
    staffPick: record.staff_pick,
    readTime: record.read_time,
    publishTimestamp: record.publish_timestamp
  }
}

export const mapBlogPostPreviewRecord = (
  record: BlogPostPreviewApiRecord
): BlogPostPreview => {
  return {
    id: record.id,
    slug: record.slug,
    title: record.title,
    thumbnail: record.thumbnail,
    thumbnailAlt: record.thumbnail_alt,
    thumbnailWidth: record.thumbnail_width,
    thumbnailHeight: record.thumbnail_height,
    published: record.published,
    publishTimestamp: record.publish_timestamp,
    draft: record.draft,
    updatedAt: record.updated_at
  }
}

export const mapBlogPostSeoRecord = (record: BlogPostSeoApiRecord): BlogPostSeo => {
  return {
    id: record.id,
    slug: record.slug,
    title: record.title,
    summary: record.summary,
    seoTitle: record.seo_title,
    seoDescription: record.seo_description,
    seoImage: record.seo_image,
    canonicalUrl: record.canonical_url,
    publishTimestamp: record.publish_timestamp
  }
}

export const mapBlogPostTinyRecord = (record: BlogPostTinyApiRecord): BlogPostTiny => {
  return {
    id: record.id,
    slug: record.slug,
    title: record.title,
    summary: record.summary
  }
}

export const mapBlogPostSlugRecord = (record: BlogPostSlugApiRecord): BlogPostSlug => {
  return {
    slug: record.slug
  }
}

export const mapBlogPostFullRecords = (records: BlogPostFullApiRecord[]): BlogPostFull[] => {
  return records.map(mapBlogPostFullRecord)
}

export const mapBlogPostCardRecords = (records: BlogPostCardApiRecord[]): BlogPostCard[] => {
  return records.map(mapBlogPostCardRecord)
}

export const mapBlogPostPreviewRecords = (
  records: BlogPostPreviewApiRecord[]
): BlogPostPreview[] => {
  return records.map(mapBlogPostPreviewRecord)
}

export const mapBlogPostSeoRecords = (records: BlogPostSeoApiRecord[]): BlogPostSeo[] => {
  return records.map(mapBlogPostSeoRecord)
}

export const mapBlogPostTinyRecords = (records: BlogPostTinyApiRecord[]): BlogPostTiny[] => {
  return records.map(mapBlogPostTinyRecord)
}

export const mapBlogPostSlugRecords = (records: BlogPostSlugApiRecord[]): BlogPostSlug[] => {
  return records.map(mapBlogPostSlugRecord)
}

export default {
  mapBlogPostFullRecord,
  mapBlogPostCardRecord,
  mapBlogPostPreviewRecord,
  mapBlogPostSeoRecord,
  mapBlogPostTinyRecord,
  mapBlogPostSlugRecord,
  mapBlogPostFullRecords,
  mapBlogPostCardRecords,
  mapBlogPostPreviewRecords,
  mapBlogPostSeoRecords,
  mapBlogPostTinyRecords,
  mapBlogPostSlugRecords
}