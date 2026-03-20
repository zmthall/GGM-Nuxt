import { nanoid } from "nanoid";
import type { BlogPostFull } from "~/models/blog";

export const createEmptyBlogPostFull = (): BlogPostFull => ({
  id: nanoid(),
  slug: '',
  title: '',
  summary: '',
  content: '',
  author: '',
  tags: [],
  thumbnail: '',
  thumbnailAlt: '',
  thumbnailWidth: 600,
  thumbnailHeight: 300,
  staffPick: false,
  featured: false,
  readTime: 0,
  draft: true,
  published: false,
  publishTimestamp: null,
  seoTitle: '',
  seoDescription: '',
  seoImage: '',
  canonicalUrl: '',
  createdAt: '',
  updatedAt: new Date().toISOString()
})