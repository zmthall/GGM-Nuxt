export default defineEventHandler(async (event) => {
  // Build a local YYYY-MM-DD string for **tomorrow** (avoids TZ off-by-one)
  const tomorrow = (() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    d.setDate(d.getDate() + 1)
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  })()

  // Grab posts (no <= operator), then filter in JS
  const all = await queryCollection(event, 'blog')
    .where('draft', '<>', true)
    .select('path', 'date', 'title', 'published')
    .order('date', 'DESC')
    .all()

  // Keep posts with no `published` (legacy) OR published < tomorrow (i.e., published up to today)
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
