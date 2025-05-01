export default defineEventHandler(() => {
  const slugs = [
    'my-first-post',
    'awesome-updates',
    'another-news-item'
  ]

  return slugs.map(slug => ({
    loc: `/news/blog/post/${slug}`,
    lastmod: new Date().toISOString() // Or actual last updated date if you have it
  }))
})