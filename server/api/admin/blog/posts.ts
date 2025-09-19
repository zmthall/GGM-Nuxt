export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = parseInt((query.page as string) || '1')
  const limit = parseInt((query.limit as string) || '10')
  
  return queryCollection(event, 'blog')
    .select('path','id','date','title','thumbnail','thumbnailAlt',
                'thumbnailWidth','thumbnailHeight', 'draft', 'published')
    .order('date', 'DESC')
    .skip((page - 1) * limit)
    .limit(limit)
    .all()
})