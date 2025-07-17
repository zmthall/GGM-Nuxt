export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = parseInt((query.page as string) || '1')
  const limit = parseInt((query.limit as string) || '8')
  
  return queryCollection(event, 'blog')
    .where('draft', '<>', true)
    .select('path', 'date', 'title', 'thumbnail', 'thumbnailAlt', 'thumbnailWidth', 'thumbnailHeight', 'tags', 'body')
    .order('date', 'DESC')
    .skip((page - 1) * limit)
    .limit(limit)
    .all()
})