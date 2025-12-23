import { promises as fsp } from 'node:fs'
import { resolve } from 'node:path'
import matter from 'gray-matter'

// Keep types local to the server – not exported to client code
type BlogMeta = {
  id?: string
  title?: string
  description?: string
  date?: string
  author?: string
  draft?: boolean
  staffPick?: boolean;
  tags?: string[]
  thumbnail?: string
  thumbnailAlt?: string
  thumbnailHeight?: string
  thumbnailWidth?: string
  summary?: string
  published?: string
}

type ServerBlogMeta = Omit<Required<BlogMeta>, 'published'> & { published?: string }

type Payload = {
  meta?: BlogMeta
  body?: string
  // allow override if you want later; here we default to preventing overwrites
  overwriteIfExists?: boolean
}

const CONTENT_DIR = ['content', 'blog', 'post'] as const


/** Strip slashes, collapse whitespace to '-', trim. (Case preserved) */
const canonicalizeSlug = (slug: string): string =>
  slug.replace(/[/\\]/g, '').trim().replace(/\s+/g, '-')

const filePathForSlug = (slug: string): string =>
  resolve(process.cwd(), ...CONTENT_DIR, `${canonicalizeSlug(slug)}.md`)

const fileExists = async (absPath: string): Promise<boolean> => {
  try { await fsp.access(absPath); return true } catch { return false }
}

const normalizeMeta = (m?: BlogMeta): ServerBlogMeta => {
  const tags = Array.isArray(m?.tags)
    ? m!.tags.map(String)
    : m?.tags ? [String(m.tags)] : []
  const out: ServerBlogMeta = {
    id: m?.id ? String(m.id) : (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}`),
    title: m?.title ? String(m.title) : '',
    description: m?.description ?? '',
    date: m?.date ? String(m.date) : '',               // optional free-form (you sort on published)
    author: m?.author ? String(m.author) : '',
    draft: Boolean(m?.draft ?? false),
    staffPick: Boolean(m?.staffPick ?? false),
    tags,
    thumbnail: m?.thumbnail ?? '',
    thumbnailAlt: m?.thumbnailAlt ?? '',
    thumbnailHeight: m?.thumbnailHeight ?? '',
    thumbnailWidth: m?.thumbnailWidth ?? '',
    summary: m?.summary ?? '',
    // Use ISO `YYYY-MM-DD` to match your DatePicker and queries
  }
  if (m?.published && String(m.published).trim()) {
    out.published = String(m.published)
  }
  return out;
}

export default defineEventHandler(async (event) => {
  const slugParam = getRouterParam(event, 'slug')
  if (!slugParam) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' })
  }

  const body = await readBody<Payload>(event)
  const meta = normalizeMeta(body?.meta)
  const markdownBody = (body?.body ?? `## New Post\n\nWrite something awesome…`).trim() + '\n'

  // Determine canonical path (hyphenated filename)
  const absPath = filePathForSlug(slugParam)

  // Prevent unintended overwrite unless explicitly allowed
  if (!body?.overwriteIfExists && await fileExists(absPath)) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Post already exists for this slug',
      data: { slug: canonicalizeSlug(slugParam), file: absPath }
    })
  }

  // Ensure directory exists
  await fsp.mkdir(resolve(process.cwd(), ...CONTENT_DIR), { recursive: true })

  // Compose front-matter + body
  const markdown = matter.stringify(markdownBody, meta)

  await fsp.writeFile(absPath, markdown, 'utf8')

  return {
    ok: true,
    slug: canonicalizeSlug(slugParam),
    file: absPath.replace(resolve(process.cwd(), 'content') + '/', ''),
    meta
  }
})
