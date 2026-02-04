import { upsertCalendar, isValidCalendarKey } from '../../../../utils/contentCalendarStore'

export default defineEventHandler(async (event) => {
  const key = String(getRouterParam(event, 'key') || '').trim()
  if (!isValidCalendarKey(key)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid calendar key. Use YYYY-MM.' })
  }

  const body = await readBody(event)
  const csv = String(body?.csv ?? '').trim()
  if (!csv) {
    throw createError({ statusCode: 400, statusMessage: 'Missing csv in request body.' })
  }

  const rec = await upsertCalendar(key, csv)
  return rec
})
