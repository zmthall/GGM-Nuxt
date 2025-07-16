export default defineEventHandler(async (event) => {
  // Fetch all blog posts
  const posts = await queryCollection(event, 'blog')
    .where('draft', '<>', true) // Exclude drafts
    .select('path', 'date', 'title') // Only get what we need
    .order('date', 'DESC')
    .all()

  return posts.map(post => ({
    loc: `/news/blog/post/${post.path.split('/').pop()}`, // Extract slug from path
    lastmod: post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
    // Optional: add priority and changefreq
    priority: 0.8,
    changefreq: 'weekly'
  }))
})