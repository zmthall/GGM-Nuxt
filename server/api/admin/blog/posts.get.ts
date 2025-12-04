// server/api/admin/blog/posts.get.ts
import { promises as fsp } from 'node:fs'
import { resolve, join } from 'node:path'
import matter from 'gray-matter'

const CONTENT_DIR = resolve(process.cwd(), 'content', 'blog', 'post')

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = parseInt((query.page as string) || '1')
  const limit = parseInt((query.limit as string) || '10')
  
  try {
    // Read all .md and .mdx files from directory
    const files = await fsp.readdir(CONTENT_DIR)
    const mdFiles = files.filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
    
    // Parse each file
    const posts = await Promise.all(
      mdFiles.map(async (filename) => {
        const filepath = join(CONTENT_DIR, filename)
        const content = await fsp.readFile(filepath, 'utf-8')
        const { data } = matter(content)
        
        // Extract slug from filename (remove extension)
        const slug = filename.replace(/\.(md|mdx)$/, '')
        
        return {
          path: `/blog/post/${slug}`,
          id: data.id || slug,
          date: data.date || '',
          title: data.title || '',
          thumbnail: data.thumbnail || '',
          thumbnailAlt: data.thumbnailAlt || '',
          thumbnailWidth: data.thumbnailWidth || '',
          thumbnailHeight: data.thumbnailHeight || '',
          draft: data.draft || false,
          published: data.published || null,
        }
      })
    )
    
    // Sort by date (newest first)
    posts.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return dateB - dateA
    })
    
    // Paginate
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedPosts = posts.slice(start, end)
    
    return paginatedPosts
  } catch (error) {
    console.error('Error reading blog posts:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to read blog posts'
    })
  }
})