import { promises as fsp } from 'node:fs'
import { resolve, dirname } from 'node:path'
import matter from 'gray-matter'

type BlogMeta = {
  id?: string;
  title?: string;
  description?: string;
  date?: string;
  author?: string;
  draft?: boolean;
  staffPick?: boolean;
  readTime?: number;
  tags?: string[];
  thumbnail?: string;
  thumbnailAlt?: string;
  thumbnailHeight?: string;
  thumbnailWidth?: string;
  summary?: string;
  published?: string;
}

type IncomingMeta = Partial<BlogMeta>

const updatable = [
  'title', 'date', 'description','author','draft', 'staffPick',
  'thumbnail','thumbnailAlt','thumbnailHeight','thumbnailWidth','summary', 'published', 'readTime',
] as const satisfies readonly (keyof BlogMeta)[]

type UpdatePayload = {
  meta?: BlogMeta
  body?: string | null
  renameTo?: string | null
  deleteOldThumbnail?: boolean
}

const CONTENT_DIR = resolve(process.cwd(), 'content', 'blog', 'post')
const PUBLIC_DIR  = resolve(process.cwd(), 'public')

const canonicalize = (s: string) =>
  s.replace(/[/\\]/g, '').trim().replace(/\s+/g, '-').toLowerCase()

const validSlug = (s: string) => /^[a-z0-9-]+$/.test(s)

const exists = async (p: string) => { try { await fsp.access(p); return true } catch { return false } }

// Try current conventions + legacy “space” names and md/mdx
async function findPostPath(slug: string): Promise<string | null> {
  const cands = [
    resolve(CONTENT_DIR, `${slug}.md`),
    resolve(CONTENT_DIR, `${slug}.mdx`),
    resolve(CONTENT_DIR, `${slug.replace(/-/g, ' ')}.md`),
    resolve(CONTENT_DIR, `${slug.replace(/-/g, ' ')}.mdx`),
  ]
  for (const p of cands) if (await exists(p)) return p
  return null
}

function normalizeTags(input: unknown): string[] | undefined {
  if (input === undefined) return undefined
  if (Array.isArray(input)) return input.map(String)
  return [String(input)]
}

function mergeMeta(
  existing: Record<string, unknown>,
  incoming?: IncomingMeta
): Record<string, unknown> {
  const out: Record<string, unknown> = { ...existing }
  if (!incoming) return out

  // handle simple fields
  for (const k of updatable) {
    const v = incoming?.[k]
    if (v === undefined) continue
    switch (k) {
      case 'draft':
        out[k] = Boolean(v)
        break
      case 'staffPick':
        out[k] = Boolean(v)
        break;
      default:
        out[k] = v === null ? '' : String(v)
        break
    }
  }

  // tags (array of strings) — explicit branch so caller can clear with []
  if ('tags' in incoming) {
    const t = normalizeTags((incoming as { tags?: unknown }).tags)
    if (t !== undefined) out.tags = t
  }

  // published: allow clearing by sending '' ; omit to keep current
  if ('published' in incoming) {
    const p = incoming.published
    if (typeof p === 'string' && p.trim() === '') {
      delete out.published
    } else if (p !== undefined) {
      out.published = String(p)
    }
  }

  // ensure id stays string if present
  if (out.id !== undefined) out.id = String(out.id)

  return out
}

export default defineEventHandler(async (event) => {
  const raw = getRouterParam(event, 'slug') ?? ''
  const current = canonicalize(raw)
  if (!current || !validSlug(current) || current === 'null' || current === 'undefined') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid slug' })
  }

  const payload = await readBody<UpdatePayload>(event)

  // locate existing file
  const postPath = await findPostPath(current)
  if (!postPath) throw createError({ statusCode: 404, statusMessage: 'Post not found' })

  const original = await fsp.readFile(postPath, 'utf8')
  const parsed = matter(original)

  // read the OLD thumbnail before merge (for possible cleanup)
  const oldThumb = typeof parsed.data?.thumbnail === 'string' ? parsed.data.thumbnail : ''

  // merge meta + body
  const mergedMeta = mergeMeta(parsed.data ?? {}, payload.meta)
  const newBody =
    payload.body === undefined || payload.body === null
      ? parsed.content // keep existing
      : String(payload.body)

  // handle optional rename
  let targetSlug = current
  if (payload.renameTo) {
    const cand = canonicalize(payload.renameTo)
    if (!cand || !validSlug(cand)) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid renameTo slug' })
    }
    targetSlug = cand
  }

  const ext = postPath.endsWith('.mdx') ? '.mdx' : '.md'
  const targetPath = resolve(CONTENT_DIR, `${targetSlug}${ext}`)

  // If renaming and target exists (and is not the same file), block
  if (targetPath !== postPath && await exists(targetPath)) {
    throw createError({ statusCode: 409, statusMessage: 'Target slug already exists' })
  }

  // Write updated content
  await fsp.mkdir(dirname(targetPath), { recursive: true })
  const newMarkdown = matter.stringify(newBody.trimEnd() + '\n', mergedMeta)
  await fsp.writeFile(targetPath, newMarkdown, 'utf8')

  // If renamed, remove the old file
  if (targetPath !== postPath) {
    try { await fsp.unlink(postPath) } catch { /* ignore */ }
  }

  // ---- OPTIONAL OLD THUMBNAIL CLEANUP ----
  let removedImage: string | undefined
  const newThumb = typeof mergedMeta.thumbnail === 'string' ? mergedMeta.thumbnail : ''
  const shouldDeleteOld =
    Boolean(payload.deleteOldThumbnail) &&
    !!oldThumb &&
    oldThumb !== newThumb &&
    oldThumb.startsWith('/images/blog/')

  if (shouldDeleteOld) {
    // '/images/blog/foo.webp' -> '<project>/public/images/blog/foo.webp'
    const imgAbs = resolve(PUBLIC_DIR, '.' + oldThumb)
    // safety: only delete if the resolved path is inside PUBLIC_DIR
    if (imgAbs.startsWith(PUBLIC_DIR) && await exists(imgAbs)) {
      try {
        await fsp.unlink(imgAbs)
        removedImage = oldThumb
      } catch {
        // ignore unlink errors; content update already succeeded
      }
    }
  }

  const relFile = targetPath.slice(resolve(process.cwd(), 'content').length + 1)
  return { ok: true as const, slug: targetSlug, file: relFile, meta: mergedMeta, removedImage }
})
