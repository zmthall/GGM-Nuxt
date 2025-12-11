// server/api/admin/blog/render.post.ts
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,        // allow inline HTML in markdown
  linkify: true,     // autolink URLs
  breaks: true       // treat line breaks as <br>
})

export default defineEventHandler(async (event) => {
  const body = await readBody<{ markdown?: string }>(event)
  const markdown = body?.markdown ?? ''

  if (!markdown.trim()) {
    return { html: '' }
  }

  const html = md.render(markdown)

  return { html }
})
