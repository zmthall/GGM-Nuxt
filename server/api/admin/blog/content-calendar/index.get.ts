import { listCalendars } from '../../../../utils/contentCalendarStore'

export default defineEventHandler(async () => {
  const items = await listCalendars()
  return { items }
})
