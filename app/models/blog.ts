export interface BlogPost {
  id?: string;
  title?: string;
  description?: string;
  date?: string;
  author?: string;
  draft?: boolean;
  tags?: string[];
  thumbnail?: string;
  thumbnailAlt?: string;
  thumbnailHeight?: string;
  thumbnailWidth?: string;
  staffPick?: boolean;
  readTime: number;
  published?: string;
  // These are added by Nuxt Content automatically
  body?: unknown;
  slug?: string;
  path?: string;
  createdAt?: string;
  updatedAt?: string;
  summary?: string;
}

export interface AllPosts {
  path: string;
  id: string;
  date?: string;
  title: string;
  description?: string;
  readTime: number;
  thumbnail?: string;
  thumbnailAlt?: string;
  thumbnailHeight?: string;
  thumbnailWidth?: string;
  tags?: string[]
  summary: string;
  body?: unknown;
  published?: string;
}

export type BlogGetResponse = { meta: BlogPost; body: string }

export type BlogEditable = BlogPost & { body: string }