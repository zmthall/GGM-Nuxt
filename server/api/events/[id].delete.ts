import type { EventUpdateResponse } from "~/models/EventsData"

export default defineEventHandler(async (event): Promise<EventUpdateResponse> => {
  const config = useRuntimeConfig()
  const eventId = getRouterParam(event, 'id')

  try {
    const response = await $fetch(`/api/events/${eventId}`, {
      baseURL: 'https://api.goldengatemanor.com',
      method: 'DELETE',
      headers: {
        'x-api-key': config.apiKey,
      }
    })

    return response as EventUpdateResponse
  } catch (error: unknown) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete event'
    })
  }
})