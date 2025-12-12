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
  const { content } = matter(markdown)
  
  return { body: content.trim() }
})
