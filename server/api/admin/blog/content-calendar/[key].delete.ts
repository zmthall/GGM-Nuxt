import { deleteCalendar, isValidCalendarKey } from '../../../../utils/contentCalendarStore'

export default defineEventHandler(async (event) => {
  const key = String(getRouterParam(event, 'key') || '').trim()
  if (!isValidCalendarKey(key)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid calendar key. Use YYYY-MM.' })
  }

  const ok = await deleteCalendar(key)
  if (!ok) {
    throw createError({ statusCode: 404, statusMessage: 'Calendar not found.' })
  }

  return { ok: true }
})
