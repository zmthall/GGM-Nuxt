import { getCalendar, isValidCalendarKey } from '../../../../utils/contentCalendarStore'

export default defineEventHandler(async (event) => {
  const key = String(getRouterParam(event, 'key') || '').trim()
  if (!isValidCalendarKey(key)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid calendar key. Use YYYY-MM.' })
  }

  const rec = await getCalendar(key)
  if (!rec) {
    throw createError({ statusCode: 404, statusMessage: 'Calendar not found.' })
  }

  return rec
})
