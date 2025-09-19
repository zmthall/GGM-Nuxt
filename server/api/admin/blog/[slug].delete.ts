import { promises as fsp } from 'node:fs'
import { resolve } from 'node:path'
import matter from 'gray-matter'

const CONTENT_DIR = resolve(process.cwd(), 'content', 'blog', 'post')
const PUBLIC_DIR  = resolve(process.cwd(), 'public')

const canonicalize = (s: string) =>
  s.replace(/[/\\]/g, '').trim().replace(/\s+/g, '-').toLowerCase()

const exists = async (p: string) => { try { await fsp.access(p); return true } catch { return false } }

// Support legacy files that might have spaces or .mdx
async function findPostPath(slug: string): Promise<string | null> {
  const cand = [
    resolve(CONTENT_DIR, `${slug}.md`),
    resolve(CONTENT_DIR, `${slug}.mdx`),
    resolve(CONTENT_DIR, `${slug.replace(/-/g, ' ')}.md`),
    resolve(CONTENT_DIR, `${slug.replace(/-/g, ' ')}.mdx`),
  ]
  for (const p of cand) if (await exists(p)) return p
  return null
}

export default defineEventHandler(async (event) => {
  const raw = getRouterParam(event, 'slug') ?? ''
  const slug = canonicalize(raw)

  const invalid = !slug || slug === 'null' || slug === 'undefined' || !/^[a-z0-9-]+$/.test(slug)
  if (invalid) throw createError({ statusCode: 400, statusMessage: 'Invalid slug' })

  const removeImage = String(getQuery(event).removeImage ?? 'false') === 'true'

  const postPath = await findPostPath(slug)
  if (!postPath) throw createError({ statusCode: 404, statusMessage: 'Post not found' })

  // Optionally read thumbnail before deleting the post
  let removedImage: string | undefined
  if (removeImage) {
    const markdown = await fsp.readFile(postPath, 'utf8')
    const { data } = matter(markdown)
    const thumb = typeof data?.thumbnail === 'string' ? data.thumbnail : ''
    if (thumb && thumb.startsWith('/images/blog/')) {
      // '/images/blog/foo.webp' -> '<project>/public/images/blog/foo.webp'
      const imgAbs = resolve(PUBLIC_DIR, '.' + thumb)
      if (await exists(imgAbs)) {
        await fsp.unlink(imgAbs)
        removedImage = thumb
      }
    }
  }

  await fsp.unlink(postPath)

  const relFile = postPath.slice(resolve(process.cwd(), 'content').length + 1)
  return { ok: true as const, slug, file: relFile, removedImage }
})
