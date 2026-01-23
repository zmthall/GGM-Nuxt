import { promises as fsp } from 'node:fs'
import { resolve } from 'node:path'
import matter from 'gray-matter'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) throw createError({ statusCode: 400, statusMessage: 'Missing slug' })

  // robust filename resolution (hyphens vs spaces)
  const base = resolve(process.cwd(), 'content', 'blog', 'post')
  const candidates = [
    `${slug}.md`, `${slug}.mdx`,
    `${slug.replace(/-/g, ' ')}.md`,
    `${slug.replace(/-/g, ' ')}.mdx`,
  ].map(n => resolve(base, n))

  let absPath: string | null = null
  for (const p of candidates) {
    try {
      await fsp.access(p)
      absPath = p
      break
    } catch {
      // ignore missing file
    }
  }
  if (!absPath) throw createError({ statusCode: 404, statusMessage: 'Post not found' })

  const markdown = await fsp.readFile(absPath, 'utf8')
  const { data, content } = matter(markdown)

  // normalize a bit so the UI is predictable
  const meta = {
    id: String(data.id ?? ''),
    title: String(data.title ?? ''),
    description: data.description ?? '',
    date: data.date ? String(data.date) : undefined,
    author: data.author ? String(data.author) : undefined,
    draft: Boolean(data.draft),
    staffPick: Boolean(data.staffPick),
    tags: Array.isArray(data.tags)
      ? data.tags.map(String)
      : data.tags ? [String(data.tags)] : [],
    thumbnail: data.thumbnail ?? '',
    thumbnailAlt: data.thumbnailAlt ?? '',
    thumbnailHeight: data.thumbnailHeight ?? '',
    thumbnailWidth: data.thumbnailWidth ?? '',
    summary: data.summary ?? '',
    published: data.published ? String(data.published) : undefined,
  }

  // if you still want to allow client to re-stringify, you can also return `markdown`
  return { meta, body: content.trim() }
})
