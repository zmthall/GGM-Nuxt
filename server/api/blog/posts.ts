export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = Math.max(Number.parseInt(String(query.page ?? '1'), 10), 1)
  const limit = Math.max(Number.parseInt(String(query.limit ?? '8'), 10), 1)
  const cutoffISO = new Date(Date.now() + 60_000).toISOString()

  return await queryCollection(event, 'blog')
    .where('draft', '<>', true)
    .where('published', '<', cutoffISO)
    .select(
      'id',
      'path',
      'date',
      'title',
      'thumbnail',
      'thumbnailAlt',
      'thumbnailWidth',
      'thumbnailHeight',
      'tags',
      'summary',
      'body',
      'readTime',
      'published'
    )
    .order('published', 'DESC')
    .order('path', 'ASC')
    .skip((page - 1) * limit)
    .limit(limit)
    .all()
})