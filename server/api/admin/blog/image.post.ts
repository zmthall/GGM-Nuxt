import { promises as fsp } from 'node:fs'
import { resolve, extname } from 'node:path'
import { readFormData } from 'h3'

const BLOG_DIR = resolve(process.cwd(), 'public', 'images', 'blog')
const OUTPUT_DIR = resolve(process.cwd(), '.output', 'public', 'images', 'blog')

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
  const form = await readFormData(event)

  const file = form.get('file') as File | null
  const alt  = form.get('alt')?.toString() ?? ''
  const slug = form.get('slug')?.toString() ?? 'post'

  if (!file) {
    throw createError({ statusCode: 400, statusMessage: 'Missing file' })
  }

  if (!file.type.startsWith('image/')) {
    throw createError({ statusCode: 415, statusMessage: 'Unsupported media type' })
  }
  
  if (file.size > 10 * 1024 * 1024) {
    throw createError({ statusCode: 413, statusMessage: 'File too large' })
  }

  const bytes = new Uint8Array(await file.arrayBuffer())

  const safeSlug = canonicalize(slug)
  const nameExt  = extname(file.name)
  const mimeExt  = mimeToExt(file.type)
  const ext      = (nameExt || mimeExt || '.jpg')

  const filename = `${safeSlug}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}${ext}`

  // Save to public/ (for next build)
  await fsp.mkdir(BLOG_DIR, { recursive: true })
  const publicPath = resolve(BLOG_DIR, filename)
  await fsp.writeFile(publicPath, bytes)

  // ALSO save to .output/public/ (for current running app)
  try {
    await fsp.mkdir(OUTPUT_DIR, { recursive: true })
    const outputPath = resolve(OUTPUT_DIR, filename)
    await fsp.writeFile(outputPath, bytes)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_err) {
    // .output might not exist in dev, that's ok
    console.log('.output not available, image saved to public/ only')
  }

  const url = `/images/blog/${filename}`

  return { ok: true as const, url, alt }
})