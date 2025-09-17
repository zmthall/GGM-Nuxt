import { promises as fsp } from 'node:fs'
import { resolve } from 'node:path'

const CONTENT_DIR = resolve(process.cwd(), 'content', 'blog', 'post')

const canonicalize = (s: string) =>
  s.replace(/[/\\]/g, '').trim().replace(/\s+/g, '-').toLowerCase()

const validSlug = (s: string) => /^[a-z0-9-]+$/.test(s)

const pathExists = async (p: string) => { try { await fsp.access(p); return true } catch { return false } }

// Check both md and mdx + a legacy “spaces instead of hyphens” variant
const candidatePaths = (slug: string) => {
  const spacey = slug.replace(/-/g, ' ')
  return [
    resolve(CONTENT_DIR, `${slug}.md`),
    resolve(CONTENT_DIR, `${slug}.mdx`),
    resolve(CONTENT_DIR, `${spacey}.md`),
    resolve(CONTENT_DIR, `${spacey}.mdx`),
  ]
}

export default defineEventHandler(async (event) => {
  const raw = getRouterParam(event, 'slug') ?? ''
  const slug = canonicalize(raw)

  if (!slug || !validSlug(slug) || slug === 'null' || slug === 'undefined') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid slug' })
  }

  for (const p of candidatePaths(slug)) {
    if (await pathExists(p)) {
      const rel = p.slice(resolve(process.cwd(), 'content').length + 1)
      return { exists: true as const, slug, file: rel }
    }
  }

  return { exists: false as const, slug }
})
