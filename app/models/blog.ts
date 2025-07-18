import type { MarkdownRoot } from "@nuxt/content";

export interface BlogPost {
  id: string;
  title: string;
  description?: string;
  date?: string;
  author?: string;
  draft?: boolean;
  tags: string[];
  thumbnail?: string;
  thumbnailAlt?: string;
  thumbnailHeight?: string;
  thumbnailWidth?: string;
  staffPick?: boolean;
  // These are added by Nuxt Content automatically
  body: MarkdownRoot;
  slug?: string;
  path?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AllPosts {
  path: string;
  id: string;
  date?: string;
  title: string;
  description?: string;
  thumbnail?: string;
  thumbnailAlt?: string;
  thumbnailHeight?: string;
  thumbnailWidth?: string;
  tags?: string[]
  summary: string;
  body?: unknown;
}