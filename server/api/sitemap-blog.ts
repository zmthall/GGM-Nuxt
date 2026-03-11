export default defineSitemapEventHandler(async (event) => {
  const tomorrow = (() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    d.setDate(d.getDate() + 1)
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  })()

  const all = await queryCollection(event, 'blog')
    .where('draft', '<>', true)
    .select('path', 'date', 'title', 'published')
    .order('date', 'DESC')
    .all()

  const posts = all.filter(p => !p.published || p.published < tomorrow)

  return posts.map(post => ({
    loc: `/news/blog/post/${post.path.split('/').pop()}`,
    lastmod: (post.date
      ? new Date(post.date)
      : post.published
        ? new Date(post.published)
        : new Date()
    ).toISOString(),
    priority: 0.8,
    changefreq: 'weekly'
  }))
})