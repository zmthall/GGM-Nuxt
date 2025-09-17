import { promises as fsp } from 'node:fs'
import { resolve, extname } from 'node:path'
import { readFormData } from 'h3'

const BLOG_DIR = resolve(process.cwd(), 'public', 'images', 'blog')

const canonicalize = (s: string) =>
  s.replace(/[/\\]/g, '').trim().replace(/\s+/g, '-').toLowerCase()

const mimeToExt = (type?: string | null) => {
  switch (type) {
    case 'image/jpeg': return '.jpg'
    case 'image/png':  return '.png'
    case 'image/webp': return '.webp'
    case 'image/gif':  return '.gif'
    default: return ''
  }
}

export default defineEventHandler(async (event) => {
  const form = await readFormData(event) // Nitro/H3: returns a FormData-like object

  const file = form.get('file') as File | null
  const alt  = form.get('alt')?.toString() ?? ''
  const slug = form.get('slug')?.toString() ?? 'post'

  if (!file) {
    throw createError({ statusCode: 400, statusMessage: 'Missing file' })
  }

  // Basic server-side validation
  if (!file.type.startsWith('image/')) {
    throw createError({ statusCode: 415, statusMessage: 'Unsupported media type' })
  }
  // ~10 MB default cap (adjust as you like)
  if (file.size > 10 * 1024 * 1024) {
    throw createError({ statusCode: 413, statusMessage: 'File too large' })
  }

  const bytes = new Uint8Array(await file.arrayBuffer())

  const safeSlug = canonicalize(slug)
  const nameExt  = extname(file.name)
  const mimeExt  = mimeToExt(file.type)
  const ext      = (nameExt || mimeExt || '.jpg') // fallback to jpg

  const filename = `${safeSlug}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}${ext}`

  await fsp.mkdir(BLOG_DIR, { recursive: true })
  const absPath = resolve(BLOG_DIR, filename)
  await fsp.writeFile(absPath, bytes)

  // public/ is web root → served at /images/blog/<filename>
  const url = `/images/blog/${filename}`

  return { ok: true as const, url, alt }
})
